package websocket;

import entities.DataEntity;

import java.util.HashSet;
import java.util.Set;
import javax.websocket.Session;

public class SessionInformation {

    private Session session;

    public SessionInformation(Session session) {

        this.session = session;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}

