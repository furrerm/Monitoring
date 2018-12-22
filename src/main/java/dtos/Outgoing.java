package dtos;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.sql.Timestamp;
import java.util.Set;

public class Outgoing {
    private long outgoing;
    private Timestamp timestamp;
    private Set<String> uids;

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

    public Set<String> getUids() {
        return uids;
    }

    public void setUids(Set<String> uids) {
        this.uids = uids;
    }

    public JsonObject toJsonString(){
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
