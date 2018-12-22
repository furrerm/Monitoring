package dtos;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.sql.Timestamp;
import java.util.Set;

public class Incoming {
    private long incoming;
    private Timestamp timestamp;
    private Set<String> uids;

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
            jsonObject = jsonObjectBuilder.add("time", this.timestamp.toString()).add("in", this.incoming).build();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}
