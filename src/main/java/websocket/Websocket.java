package websocket;

import entities.DataEntity;
import entities.EntityRefiner;
import entities.EntityRefinerImpl;
import jmsConnector.Dispatcher;
import workerBean.dataTransmissionBean;

import javax.jms.*;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;

import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.*;


@ServerEndpoint(value = "/echo")
public class Websocket {

    //private static Map<Session, SessionInformation> sessions = new ConcurrentHashMap<>();

    private TopicListener topicListener;
    private SessionInformation sessionInformation;

    @OnOpen
    public void onOpen(Session userSession) {

        sessionInformation = new SessionInformation(userSession);

        topicListener = new TopicListener(sessionInformation);


    }

    @OnClose
    public void onClose(Session userSession) {
        System.out.println("Verbindung getrennt...");

    }

    @OnMessage
    public void onMessage(String message, Session userSession) {
        EntityRefiner refiner = new EntityRefinerImpl();
        Set<sender.MessageData> messages = refiner.entitiesToMessageData(getEntitiesFromBegin());
        topicListener.getSender().send(messages, sessionInformation.getSession());

    }

    private Set<DataEntity> getEntitiesFromBegin(){

        List<DataEntity> list = null;
        try {
            InitialContext ctx = new InitialContext();

            dataTransmissionBean libraryBean1 =
                    (dataTransmissionBean) ctx.lookup("java:global/messageBean1/dataTransmissionEJB!workerBean.dataTransmissionBean");
            list = libraryBean1.saveIt();
        } catch (NamingException e) {
            e.printStackTrace();
        }
        Set<DataEntity> entities = new HashSet<>(list);

        //SortedSet<DataEntity> sortedEntities = new TreeSet<>(new EntityComparatorByTime());
        //sortedEntities.addAll(entities);
        return entities;
    }


}