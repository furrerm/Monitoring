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

                    UUID uuid = UUID.randomUUID();
                    String randomUUIDString = uuid.toString();


                    entities.DataEntity entity = new entities.DataEntity();
                    entity.setUuid(randomUUIDString);
                    entity.setKorb(msg.getKorb());
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

                    TypedQuery<entities.KoerbeEntity> query = entityManager.createQuery("select k from KoerbeEntity k where k.korbName = :korbName",entities.KoerbeEntity.class);
                    query.setParameter("korbName", msg.getKorb());
                    List<entities.KoerbeEntity> results = query.getResultList();
                    if(results.isEmpty()){
                        KoerbeEntity koerbeEntity = new KoerbeEntity();
                        koerbeEntity.setKorbName(msg.getKorb());
                        entityManager.persist(koerbeEntity);
                    }


                Dispatcher dispatcher = Dispatcher.getInstance();
                dispatcher.sendMessage(msg);

                System.out.println("after db save "+System.currentTimeMillis());

            } else if(objectMessage.getObject() instanceof sender.Korbstand){
                sender.Korbstand korbstandObject = (sender.Korbstand) objectMessage.getObject();
                TypedQuery<entities.KoerbeEntity> query = entityManager.createQuery("select k from KoerbeEntity k where k.korbName = :korbName",entities.KoerbeEntity.class);
                query.setParameter("korbName", korbstandObject.getKorb());
                entities.KoerbeEntity korbEntity = query.getSingleResult();

                KorbstaendeEntity korbstaendeEntity = new KorbstaendeEntity();
                korbstaendeEntity.setGui(korbstandObject.getGui());
                korbstaendeEntity.setInhalt(korbstandObject.getKorbstand());
                korbstaendeEntity.setKoerbeByKorb(korbEntity);
                korbstaendeEntity.setUpdateTime(korbstandObject.getTime());
                entityManager.persist(korbstaendeEntity);
            } else {
                System.out.println("wrong type in Bean: ");
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
