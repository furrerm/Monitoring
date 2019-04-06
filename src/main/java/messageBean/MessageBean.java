package messageBean;

import entities.DataEntity;
import entities.KoerbeEntity;
import entities.KorbstaendeEntity;
import jmsConnector.Dispatcher;

import javax.annotation.Resource;
import javax.ejb.*;
import javax.jms.*;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.TypedQuery;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@MessageDriven(mappedName = "MonitoringQueue", activationConfig = {

        @ActivationConfigProperty(propertyName = "acknowledgeMode",
                propertyValue = "Auto-acknowledge"),
        @ActivationConfigProperty(propertyName = "destinationType",
                propertyValue = "javax.jms.Queue")

})

public class MessageBean implements MessageListener, MessageDrivenBean {

    @Resource
    private MessageDrivenContext mdc;

    @PersistenceContext(unitName = "cssDashboardUnit", type = PersistenceContextType.TRANSACTION)
    private EntityManager entityManager;

    public void onMessage(Message inMessage) {
        ObjectMessage objectMessage = (ObjectMessage) inMessage;

        try {
            if (objectMessage.getObject() instanceof sender.MessageData) {

                sender.MessageData msg = (sender.MessageData) objectMessage.getObject();

                List<entities.KoerbeEntity> koerbeEntities = this.getKoerbeEntities(msg.getKorb());
                KoerbeEntity korbEntity = this.createKorbEntityIfNotExist(koerbeEntities, msg.getKorb());
                int korbId = korbEntity.getIdkoerbe();

                List<entities.KorbstaendeEntity> korbstaendMitGuiUndKorbUebereinstimmung = this.getKorbstaendMitGuiUndKorbUebereinstimmung(korbId, msg.getGui());

                if (korbstaendMitGuiUndKorbUebereinstimmung.isEmpty()) {

                    KorbstaendeEntity korbstaendeEntity = this.getEmptyKorbstandEntity(korbId, msg);

                    entityManager.persist(korbstaendeEntity);
                    entityManager.flush();
                }
                entities.DataEntity entity = this.getDataEntity(korbId, msg);
                entityManager.persist(entity);

                Dispatcher dispatcher = Dispatcher.getInstance();
                msg.setKorbId(korbId);
                dispatcher.sendMessage(msg);

            } else if (objectMessage.getObject() instanceof sender.Korbstand) {
                sender.Korbstand korbstandObject = (sender.Korbstand) objectMessage.getObject();
                KorbstaendeEntity korbstaendeEntity = this.getKorbstandEntity(korbstandObject);
                entityManager.persist(korbstaendeEntity);
            }
        } catch (JMSException e) {
            e.printStackTrace();
            mdc.setRollbackOnly();
        } catch (Throwable te) {
            te.printStackTrace();
        }
    }

    public void setMessageDrivenContext(MessageDrivenContext messageDrivenContext) throws EJBException {

    }

    public void ejbRemove() throws EJBException {

    }
    private entities.DataEntity getDataEntity(final int korbId, final sender.MessageData msg){

        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString();


        entities.DataEntity entity = new DataEntity();

        entity.setUuid(randomUUIDString);
        entity.setKorb(korbId);
        entity.setTime(msg.getTime());
        entity.setGui(msg.getGui());
        entity.setStationaer(msg.getStationaer());
        entity.setAmbulant(msg.getAmbulant());
        entity.setPlz(msg.getPlz());
        entity.setPartnerartObergruppe(msg.getPartnerartObergruppe());
        entity.setKorbStand(msg.getKorbStand());
        entity.setOutgoing(msg.getOut());
        entity.setIncoming(msg.getIn());
        return entity;
    }
    private KorbstaendeEntity getKorbstandEntity(final sender.Korbstand korbstandObject){
        TypedQuery<entities.KoerbeEntity> query = entityManager.createQuery("select k from KoerbeEntity k where k.korbName = :korbName", entities.KoerbeEntity.class);
        query.setParameter("korbName", korbstandObject.getKorb());
        entities.KoerbeEntity korbEntity = query.getSingleResult();

        TypedQuery<entities.KorbstaendeEntity> query2 = entityManager.createQuery("select k from KorbstaendeEntity k where k.korb = :korb AND k.gui = :gui", entities.KorbstaendeEntity.class);
        query2.setParameter("korb", korbEntity.getIdkoerbe());
        query2.setParameter("gui", korbstandObject.getGui());
        List<KorbstaendeEntity> korbstaendeEntities = query2.getResultList();
        KorbstaendeEntity korbstaendeEntity;
        if (korbstaendeEntities.isEmpty()) {
            korbstaendeEntity = new KorbstaendeEntity();
            korbstaendeEntity.setGui(korbstandObject.getGui());
            korbstaendeEntity.setInhalt(korbstandObject.getKorbstand());
            korbstaendeEntity.setKoerbeByKorb(korbEntity);
            korbstaendeEntity.setUpdateTime(korbstandObject.getTime());
        } else {
            korbstaendeEntity = korbstaendeEntities.get(0);
            korbstaendeEntity.setInhalt(korbstandObject.getKorbstand());
            korbstaendeEntity.setUpdateTime(korbstandObject.getTime());
        }
        return korbstaendeEntity;
    }
    private KorbstaendeEntity getEmptyKorbstandEntity(final int korbId, final sender.MessageData msg){
        KorbstaendeEntity korbstaendeEntity = new KorbstaendeEntity();
        korbstaendeEntity.setGui(msg.getGui());
        korbstaendeEntity.setKorb(korbId);
        korbstaendeEntity.setInhalt(0);
        korbstaendeEntity.setUpdateTime(new Timestamp(System.currentTimeMillis()-366 * 24 * 3600000l));
        return korbstaendeEntity;
    }
    private List<entities.KorbstaendeEntity> getKorbstaendMitGuiUndKorbUebereinstimmung(final int korbId, final int guiId){
        TypedQuery<entities.KorbstaendeEntity> query2 = entityManager.createQuery("select k from KorbstaendeEntity k where k.korb = :korbId and k.gui = :guiId", entities.KorbstaendeEntity.class);
        query2.setParameter("korbId", korbId);
        query2.setParameter("guiId", guiId);
        return query2.getResultList();
    }
    private List<entities.KoerbeEntity> getKoerbeEntities(final String korbName){
        TypedQuery<entities.KoerbeEntity> query = entityManager.createQuery("select k from KoerbeEntity k where k.korbName = :korbName", entities.KoerbeEntity.class);
        query.setParameter("korbName", korbName);
        return query.getResultList();
    }
    private KoerbeEntity createKorbEntityIfNotExist(final List<entities.KoerbeEntity> koerbeEntities, final String korbName){
        if (koerbeEntities.isEmpty()) {

            KoerbeEntity koerbeEntity = new KoerbeEntity();
            koerbeEntity.setKorbName(korbName);
            entityManager.persist(koerbeEntity);
            entityManager.flush();
            return koerbeEntity;

        } else {
            return koerbeEntities.get(0);
        }
    }

}
