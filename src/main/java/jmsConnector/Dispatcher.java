package jmsConnector;

import entities.DataEntity;
import websocket.SessionInformation;

import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.persistence.*;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class Dispatcher {

    private AtomicLong messageId;
    private static Dispatcher instance = null;
    private Set<SessionInformation> sessions = Collections.synchronizedSet(new HashSet<SessionInformation>());


    private Dispatcher() {

        DataEntity dataEntity = new DataEntity();
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("cssDashboardUnit");
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        Query query = entityManager.createQuery("SELECT max(c.id) FROM DataEntity c");
        final long maxId;
        if (query == null) {
            maxId = 1;
        } else {
            maxId = (Long) query.getSingleResult();
        }

        messageId = new AtomicLong(maxId);
    }

    public static synchronized Dispatcher getInstance() {
        if (instance == null) {
            instance = new Dispatcher();

        }
        return instance;
    }

    private long getMessageId() {

        return messageId.incrementAndGet();
    }

    public long sendMessage(sender.MessageData message) {
        final long messageId = getMessageId();

        for (SessionInformation sessionInformation : sessions) {

            if(sessionInformation.getSession().isOpen()){
                sessionInformation.getSession().getAsyncRemote().sendObject(createJsonString(message, messageId));
            }
        }
        return messageId;
    }

    public Set<SessionInformation> getSessions() {
        return sessions;
    }

    public void setSessions(Set<SessionInformation> sessions) {
        this.sessions = sessions;
    }

    private JsonObject createJsonString(sender.MessageData msg, long id) {




                try {

                    Thread.sleep(100);

                    JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
                    jsonObjectBuilder.add("id", id);
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

                } catch (Exception e) {
                    e.printStackTrace();
                }


        return null;
    }
}
