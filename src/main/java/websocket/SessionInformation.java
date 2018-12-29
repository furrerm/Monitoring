package websocket;

import entities.DataEntity;

import java.util.HashSet;
import java.util.Set;
import javax.websocket.Session;

public class SessionInformation {

    private Session session;
    private UuidController uuidController;

    public SessionInformation(Session session) {

        this.session = session;
        this.uuidController = new UuidController();
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public UuidController getUuidController() {
        return uuidController;
    }
}

