package websocket;

import jmsConnector.Dispatcher;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;

import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * simpler echo - web socket service
 *
 * @author Dominik Mathmann
 */
@ServerEndpoint(value = "/echo")
public class Websocket {

    //private static Map<Session, SessionInformation> sessions = new ConcurrentHashMap<>();



    @OnOpen
    public void onOpen(Session userSession) {

        SessionInformation sessionInformation = new SessionInformation(userSession);

        Dispatcher.getInstance().getSessions().add(sessionInformation);

        //@todo async data loading
    }

    @OnClose
    public void onClose(Session userSession) {
        System.out.println("Verbindung getrennt...");
        Dispatcher.getInstance().getSessions().remove(userSession);

    }

    @OnMessage
    public void onMessage(String message, Session userSession) {


    }


}