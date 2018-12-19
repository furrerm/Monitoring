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

    public void sendMessage(sender.MessageData message) {
        try {
            System.out.println("pre sending");
            objMessage.setObject(message);
            System.out.println("middle sending");
            sender.send(objMessage);
            System.out.println("post sending");
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }

    public void initialize() {


        try {
            InitialContext ctx = new InitialContext();
            TopicConnectionFactory f = (TopicConnectionFactory) ctx.lookup("jms/topicFactory");

            con = f.createTopicConnection();

            con.start();

            TopicSession ses = con.createTopicSession(false, Session.AUTO_ACKNOWLEDGE);

            Topic t = (Topic) ctx.lookup("Topic2");

            sender = ses.createPublisher(t);

            sender.setDeliveryMode(DeliveryMode.NON_PERSISTENT);

            objMessage = ses.createObjectMessage();
            System.out.println("initialized succesfully");

        } catch (Exception e) {
            System.out.println("something wrong");
            System.out.println(e);
        }
        System.out.println("initialize done");
    }


}
