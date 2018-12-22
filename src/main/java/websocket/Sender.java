package websocket;

import sender.MessageData;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.json.*;
import javax.websocket.EncodeException;
import javax.websocket.Session;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.util.Set;

public class Sender implements MessageListener {
    private SessionInformation session;


    public Sender(SessionInformation session) {
        this.session = session;

    }


    public synchronized void onMessage(Message message) {
        ObjectMessage objectMessage = (ObjectMessage) message;
        try {
            if (objectMessage.getObject() instanceof sender.MessageData) {
                sender.MessageData msg = (sender.MessageData) objectMessage.getObject();

                this.send(msg, session.getSession());

            }
        } catch (JMSException e) {
            e.printStackTrace();
        }

    }

    private void send(sender.MessageData message, Session session) {

        System.out.println("called tl is instance");
        System.out.println("session info = " + session.isOpen());
        if (session.isOpen()) {
            //session.getAsyncRemote().sendObject(createJsonString(message));
            //session.getBasicRemote().sendObject(createJsonString(message));
            session.setMaxBinaryMessageBufferSize(10);
            ByteBuffer bites = ByteBuffer.wrap(message.getKorb().getBytes(Charset.defaultCharset()));
            try {
                session.getBasicRemote().sendBinary(ByteBuffer.wrap(createJsonString(message).toString().getBytes()));

            } catch (IOException e) {
                e.printStackTrace();
            }
            // Thread.sleep(150);
            //session.getBasicRemote().sendBinary(message.getKorb().getBytes());
        }
        System.out.println("session info = after is open");
    }
    public void send(JsonObject jsonObject, Session session){
        if (session.isOpen()) {
            try {
                session.getBasicRemote().sendBinary(ByteBuffer.wrap(jsonObject.toString().getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void send(Set<sender.MessageData> messages, Session session) {

        System.out.println("called tl is instance");
        System.out.println("session info = " + session.isOpen());
        if (session.isOpen()) {
            //session.getAsyncRemote().sendObject(createJsonString(message));
            //session.getBasicRemote().sendObject(createJsonString(message));
            session.setMaxBinaryMessageBufferSize(10);

            try {
                session.getBasicRemote().sendBinary(ByteBuffer.wrap(createJsonString(messages).toString().getBytes()));

            } catch (IOException e) {
                e.printStackTrace();
            }
            // Thread.sleep(150);
            //session.getBasicRemote().sendBinary(message.getKorb().getBytes());
        }
        System.out.println("session info = after is open");
    }

    private JsonObject createJsonString(sender.MessageData msg) {

        try {

            JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();

            jsonObjectBuilder.add("time", msg.getTime().toString());
            jsonObjectBuilder.add("gui", msg.getGui());
            jsonObjectBuilder.add("korb", msg.getKorb().toString());
            jsonObjectBuilder.add("ambulant", msg.getAmbulant().toString());
            jsonObjectBuilder.add("stationaer", msg.getStationaer().toString());
            jsonObjectBuilder.add("partnerartObergruppe", msg.getPartnerartObergruppe().toString());
            jsonObjectBuilder.add("plz", msg.getPlz().toString());
            jsonObjectBuilder.add("korbstand", msg.getKorbStand());
            jsonObjectBuilder.add("in", msg.getIn());
            jsonObjectBuilder.add("out", msg.getOut());

            jsonObjectBuilder.add("sizeOfSessionsEntitiesSet", 200);

            JsonObject jsonObject = jsonObjectBuilder.build();


            return jsonObject;

            //return jsonObject;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private JsonArray createJsonString(Set<sender.MessageData> messages) {

        try {
            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

            for (sender.MessageData message : messages) {
                arrayBuilder.add(createJsonString(message));
            }

            return arrayBuilder.build();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}