package messageBean;

import jmsConnector.Dispatcher;

import javax.annotation.Resource;
import javax.ejb.*;
import javax.jms.*;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import java.sql.Timestamp;

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

                entities.DataEntity entity = new entities.DataEntity();
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
