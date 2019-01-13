package dtos;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class Incoming implements GeneralDTO {
    private long incoming;
    private Timestamp timestamp;
    private Map<String, UuidInformation> uids;

    public Incoming(sender.MessageData message){
        this.incoming = message.getIn();
        this.timestamp = message.getTime();
        this.uids = new HashMap<>();
        UuidInformation uuidInformation = new UuidInformation(true, message.getTime());
        uids.put(message.getUuid(),uuidInformation);
    }

    public Incoming(long incoming, Timestamp timestamp) {
        this.incoming = incoming;
        this.timestamp = timestamp;
    }

    public long getIncoming() {
        return incoming;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    @Override
    public Map<String, UuidInformation> getUids() {
        return uids;
    }

    @Override
    public void correctAmount(int amountToSubtract) {
        incoming+=amountToSubtract;
    }

    public void setUids(Map<String, UuidInformation> uids) {
        this.uids = uids;
    }

    @Override
    public JsonObject toJsonString() {
        JsonObject jsonObject = null;
        try {

            JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
            jsonObject = jsonObjectBuilder.add("time", this.timestamp.toString()).add("in", this.incoming).build();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}
