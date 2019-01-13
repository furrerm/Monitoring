package websocket;

import dtos.Incoming;
import dtos.Outgoing;
import dtos.TotalAmount;
import entities.DataEntity;
import entities.EntityRefiner;
import entities.EntityRefinerImpl;
import entities.KoerbeEntity;
import jmsConnector.Dispatcher;
import workerBean.dataTransmissionBean;

import javax.jms.*;
import javax.json.JsonArray;
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

        try {
            InitialContext ctx = new InitialContext();

            dataTransmissionBean libraryBean1 =
                    (dataTransmissionBean) ctx.lookup("java:global/messageBean1/dataTransmissionEJB!workerBean.dataTransmissionBean");
            List<KoerbeEntity> list = libraryBean1.getKoerbe();
            topicListener.getSender().send(list, sessionInformation.getSession());

        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session userSession) {

    }

    @OnMessage
    public void onMessage(String message, Session userSession) {

        sessionInformation.getUuidController().deleteSavedUuids();
        Filter filter = new Filter(message);
        sessionInformation.setFilter(filter);
        Incoming incoming = getEntitiesFromBegin(filter);

        topicListener.getSender().send(incoming, sessionInformation.getSession());

        List<Outgoing> outgoings = getOutgoings(filter);
        for(Outgoing outgoing: outgoings){
            topicListener.getSender().send(outgoing, sessionInformation.getSession());
        }

        TotalAmount totalAmount = getTotalAmount(filter);
        topicListener.getSender().send(totalAmount, sessionInformation.getSession());

    }
    private Incoming getEntitiesFromBegin(Filter filter){

        Incoming incoming = null;
        try {
            InitialContext ctx = new InitialContext();

            dataTransmissionBean libraryBean1 =
                    (dataTransmissionBean) ctx.lookup("java:global/messageBean1/dataTransmissionEJB!workerBean.dataTransmissionBean");
            incoming = libraryBean1.saveIt(filter);
        } catch (NamingException e) {
            e.printStackTrace();
        }
        //Set<DataEntity> entities = new HashSet<>(list);

        return incoming;
    }

    private List<Outgoing> getOutgoings(Filter filter){

        List<Outgoing> outgoings = null;
        try {
            InitialContext ctx = new InitialContext();

            dataTransmissionBean libraryBean1 =
                    (dataTransmissionBean) ctx.lookup("java:global/messageBean1/dataTransmissionEJB!workerBean.dataTransmissionBean");
            outgoings = libraryBean1.getOutgoings(filter);
        } catch (NamingException e) {
            e.printStackTrace();
        }
        return outgoings;
    }
    private TotalAmount getTotalAmount(Filter filter){

        TotalAmount totalAmount = null;
        try {
            InitialContext ctx = new InitialContext();

            dataTransmissionBean libraryBean1 =
                    (dataTransmissionBean) ctx.lookup("java:global/messageBean1/dataTransmissionEJB!workerBean.dataTransmissionBean");
            totalAmount = libraryBean1.getTotalAmount(filter);
        } catch (NamingException e) {
            e.printStackTrace();
        }
        return totalAmount;
    }
}