package websocket;

import dtos.DTOFactory;
import dtos.GeneralDTO;
import entities.KoerbeEntity;
import sender.MessageData;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.json.*;
import javax.websocket.EncodeException;
import javax.websocket.RemoteEndpoint;
import javax.websocket.Session;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Future;
import javax.jms.*;

public class Sender implements MessageListener {
    private SessionInformation sessionInformation;
    private int cou = 0;


    public Sender(SessionInformation sessionInformation) {
        this.sessionInformation = sessionInformation;
    }

    public void onMessage(Message message) {
        ObjectMessage objectMessage = (ObjectMessage) message;
        try {
            if (objectMessage.getObject() instanceof sender.MessageData) {
                sender.MessageData msg = (sender.MessageData) objectMessage.getObject();

                if (this.messageIsValid(msg, sessionInformation.getFilter())) {

                    DTOFactory dtoFactory = new DTOFactory();

                    this.send(dtoFactory.createGeneralDTOFromMessage(msg), sessionInformation.getSession());
                }
            }
        } catch (JMSException e) {
            try {
                objectMessage.clearProperties();
                objectMessage.clearBody();
            } catch (JMSException e1) {
                e1.printStackTrace();
            }
            e.printStackTrace();
        }
    }

    public void send(GeneralDTO dto, Session session) {

        dto.correctAmount(sessionInformation.getUuidController().saveAndGetAmountOfDoubleEntries(dto.getUids()));
        JsonObject objectToSend = dto.toJsonString();
        if (session.isOpen()) {
            try {
                RemoteEndpoint.Async async = session.getAsyncRemote();
                async.sendBinary(ByteBuffer.wrap(objectToSend.toString().getBytes()));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void send(List<KoerbeEntity> messages, Session session) {

        if (session.isOpen()) {

            try {
                session.getBasicRemote().sendBinary(ByteBuffer.wrap(createJsonArrayFromString(messages).toString().getBytes()));

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
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

    private JsonArray createJsonArrayFromString(List<KoerbeEntity> messages) {


        try {
            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

            for (KoerbeEntity message : messages) {
                JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
                JsonObject jsonObject = jsonObjectBuilder.add("id", message.getIdkoerbe()).add("korbName", message.getKorbName()).build();
                arrayBuilder.add(jsonObject);
            }

            return arrayBuilder.build();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private boolean messageIsValid(sender.MessageData messageData, Filter filter) {
        if (filter.getKoerbe().contains(messageData.getKorbId()) &&
                filter.getGuis().contains(messageData.getGui()) &&
                (filter.getBis().after(messageData.getTime()) || filter.getBis().equals(messageData.getTime())) &&
                (filter.getVon().before(messageData.getTime()))) {
            return true;
        }
        return false;
    }
}
