package dtos;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class Outgoing implements GeneralDTO {
    private long outgoing;
    private Timestamp timestamp;
    private Map<String, Timestamp> uids;

    public Outgoing(sender.MessageData message){
        this.outgoing = message.getOut();
        this.timestamp = message.getTime();
        this.uids = new HashMap<>();
        uids.put(message.getUuid(),message.getTime());
    }
    public Outgoing(long outgoing, Timestamp timestamp) {
        this.outgoing = outgoing;
        this.timestamp = timestamp;
    }

    public long getOutgoing() {
        return outgoing;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    @Override
    public Map<String, Timestamp> getUids() {
        return uids;
    }

    @Override
    public void correctAmount(int amountToSubtract) {
        outgoing-= amountToSubtract;
    }

    public void setUids(Map<String, Timestamp> uids) {
        this.uids = uids;
    }

    @Override
    public JsonObject toJsonString() {
        JsonObject jsonObject = null;
        try {

            JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
            jsonObject = jsonObjectBuilder.add("time", this.timestamp.toString()).add("out", this.outgoing).build();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}
