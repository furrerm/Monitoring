package jmsConnector;

import entities.DataEntity;
import websocket.SessionInformation;

import javax.jms.*;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.naming.InitialContext;
import javax.persistence.*;
import java.net.URL;
import java.util.Collections;
import java.util.HashSet;
import java.util.ResourceBundle;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class Dispatcher {


    private static Dispatcher instance = null;

    private ObjectMessage objMessage;
    private TopicPublisher sender;
    private TopicConnection con;


    private Dispatcher() {
        this.initialize();
    }

    public static Dispatcher getInstance() {
        if (instance == null) {
            instance = new Dispatcher();
        }
        return instance;
    }

    public synchronized void sendMessage(sender.MessageData message) {
        int numberOfRetries = 0;
        do {
            try {
                objMessage.setObject(message);
                sender.publish(objMessage);
                break;
            } catch (JMSException e) {
                e.printStackTrace();
            }
            try {
                ++numberOfRetries;
                Thread.sleep(10);
            } catch (InterruptedException ex) {
                ex.printStackTrace();
            }
        } while (numberOfRetries < 10);
    }

    public synchronized void initialize() {

        try {
            InitialContext ctx = new InitialContext();
            TopicConnectionFactory f = (TopicConnectionFactory) ctx.lookup("jms/topicFactory");

            con = f.createTopicConnection();

            con.start();

            TopicSession ses = con.createTopicSession(false, Session.AUTO_ACKNOWLEDGE);

            Topic t = (Topic) ctx.lookup("DispatcherTopic");

            sender = ses.createPublisher(t);

            sender.setDeliveryMode(DeliveryMode.NON_PERSISTENT);

            objMessage = ses.createObjectMessage();

        } catch (Exception e) {
            System.out.println(e);
        }
    }


}
