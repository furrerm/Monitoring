package websocket;

import javax.jms.*;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.websocket.RemoteEndpoint;

import java.util.HashSet;
import java.util.Set;

public class TopicListener  {

    private SessionInformation session;
    private RemoteEndpoint.Async async;
    private static TopicListener instance = null;
    private Sender sender;

    public Sender getSender() {
        return sender;
    }

    public TopicListener(SessionInformation session) {
        this.session = session;
        sender = new Sender(session);

        this.initialize();



    }
/*
    public static TopicListener getInstance(SessionInformation session) {
        if (instance == null) {
            return new TopicListener(session);
        }
        return instance;
    }

*/


    public void initialize() {
        // get the initial context
        InitialContext ctx = null;
        try {
            System.out.println("pre connected successsssfulllly");
            ctx = new InitialContext();


            // lookup the topic object
            Topic topic = (Topic) ctx.lookup("Topic2");

            // lookup the topic connection factory
            TopicConnectionFactory connFactory = (TopicConnectionFactory) ctx.lookup("jms/topicFactory");

            // create a topic connection
            TopicConnection topicConn = connFactory.createTopicConnection();

            // create a topic session
            TopicSession topicSession = topicConn.createTopicSession(false, Session.AUTO_ACKNOWLEDGE);


            // create a topic subscriber
            TopicSubscriber topicSubscriber = topicSession.createSubscriber(topic);


            topicSubscriber.setMessageListener(sender);

            // start the connection
            topicConn.start();

            System.out.println("connected successsssfulllly");


        } catch (NamingException e) {
            e.printStackTrace();
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}