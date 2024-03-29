package workerBean;

import dtos.Incoming;
import dtos.Outgoing;
import dtos.TotalAmount;
import entities.DataEntity;
import entities.KoerbeEntity;
import websocket.Filter;

import java.util.List;

public interface dataTransmissionBean {
    Incoming saveIt(Filter filter);
    List<Outgoing> getOutgoings(Filter filter);
    List<KoerbeEntity> getKoerbe();
    TotalAmount getTotalAmount(Filter filter);
}
