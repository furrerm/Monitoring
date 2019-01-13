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

@MessageDriven(mappedName = "Topic1", activationConfig = {

        @ActivationConfigProperty(propertyName = "acknowledgeMode",
                propertyValue = "Auto-acknowledge"),
        @ActivationConfigProperty(propertyName = "destinationType",
                propertyValue = "javax.jms.Topic")

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

                TypedQuery<entities.KoerbeEntity> query = entityManager.createQuery("select k from KoerbeEntity k where k.korbName = :korbName",entities.KoerbeEntity.class);
                query.setParameter("korbName", msg.getKorb());
                List<entities.KoerbeEntity> results = query.getResultList();
                int korbId;
                if(results.isEmpty()){
                    KoerbeEntity koerbeEntity = new KoerbeEntity();
                    koerbeEntity.setKorbName(msg.getKorb());
                    entityManager.persist(koerbeEntity);
                    entityManager.flush();
                    korbId = koerbeEntity.getIdkoerbe();
                } else{
                    korbId = results.get(0).getIdkoerbe();
                }
                //falls kobstand nicht existiert speichern
                TypedQuery<entities.KorbstaendeEntity> query2 = entityManager.createQuery("select k from KorbstaendeEntity k where k.korb = :korbId and k.gui = :guiId",entities.KorbstaendeEntity.class);
                query2.setParameter("korbId", korbId);
                query2.setParameter("guiId", msg.getGui());
                List<entities.KorbstaendeEntity> korbstaendMitGuiUndKorbUebereinstimmung = query2.getResultList();

                if(korbstaendMitGuiUndKorbUebereinstimmung.isEmpty()){
                    KorbstaendeEntity korbstaendeEntity = new KorbstaendeEntity();
                    korbstaendeEntity.setGui(msg.getGui());
                    korbstaendeEntity.setKorb(korbId);
                    korbstaendeEntity.setInhalt(0);
                    korbstaendeEntity.setUpdateTime(new Timestamp(System.currentTimeMillis()));

                    entityManager.persist(korbstaendeEntity);
                    entityManager.flush();
                }
//Speichern der Message
                    UUID uuid = UUID.randomUUID();
                    String randomUUIDString = uuid.toString();


                    entities.DataEntity entity = new entities.DataEntity();
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

                    entityManager.persist(entity);




                Dispatcher dispatcher = Dispatcher.getInstance();
                msg.setKorbId(korbId);
                dispatcher.sendMessage(msg);

            } else if(objectMessage.getObject() instanceof sender.Korbstand){
                sender.Korbstand korbstandObject = (sender.Korbstand) objectMessage.getObject();
                TypedQuery<entities.KoerbeEntity> query = entityManager.createQuery("select k from KoerbeEntity k where k.korbName = :korbName",entities.KoerbeEntity.class);
                query.setParameter("korbName", korbstandObject.getKorb());
                entities.KoerbeEntity korbEntity = query.getSingleResult();

                TypedQuery<entities.KorbstaendeEntity> query2 = entityManager.createQuery("select k from KorbstaendeEntity k where k.korb = :korb AND k.gui = :gui",entities.KorbstaendeEntity.class);
                query2.setParameter("korb", korbEntity.getIdkoerbe());
                query2.setParameter("gui", korbstandObject.getGui());
                List<KorbstaendeEntity> korbstaendeEntities = query2.getResultList();
                KorbstaendeEntity korbstaendeEntity;
                if(korbstaendeEntities.isEmpty()){
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

}
