package workerBean;

import dtos.Incoming;
import dtos.Outgoing;
import entities.DataEntity;
import websocket.Filter;

import java.util.List;

public interface dataTransmissionBean {
    Incoming saveIt(Filter filter);
    List<Outgoing> getOutgoings(Filter filter);
}
