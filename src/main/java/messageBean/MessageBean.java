package messageBean;

import entities.DataEntity;
import jmsConnector.Dispatcher;

import javax.annotation.Resource;
import javax.ejb.*;
import javax.jms.*;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.TypedQuery;
import java.sql.Timestamp;
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
                System.out.println("MESSAGE BEAN: on bean Message received: " +
                        msg.getGui());
                Dispatcher dispatcher = Dispatcher.getInstance();
                dispatcher.sendMessage(msg);

                for(int i = 0; i < 1; ++i) {

                    UUID uuid = UUID.randomUUID();
                    String randomUUIDString = uuid.toString();
                    Timestamp t = new Timestamp(msg.getTime().getTime()+1000*i);

                    entities.DataEntity entity = new entities.DataEntity();
                    entity.setUuid(randomUUIDString);
                    entity.setKorb(msg.getKorb());
                    entity.setTime(t);
                    entity.setGui(msg.getGui());
                    entity.setStationaer(msg.getStationaer());
                    entity.setAmbulant(msg.getAmbulant());
                    entity.setPlz(msg.getPlz());
                    entity.setPartnerartObergruppe(msg.getPartnerartObergruppe());
                    entity.setKorbStand(msg.getKorbStand());
                    entity.setOutgoing(msg.getOut());
                    entity.setIncoming(msg.getIn());

                    entityManager.persist(entity);
                }
            } else if(objectMessage.getObject() instanceof sender.Korbstand){
                TypedQuery<entities.KoerbeEntity> query = entityManager.createQuery("select k from KoerbeEntity k ",entities.KoerbeEntity.class);
                String korbname = query.getSingleResult().getKorbName();
                System.out.println("mdb gives = "+korbname);
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
