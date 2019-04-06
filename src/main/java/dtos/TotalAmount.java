package dtos;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;


public class TotalAmount implements GeneralDTO {
    private long aggregiertesTotal;

    private Map<String, UuidInformation> uids;

    public TotalAmount(long outgoing, Map<String, UuidInformation> uids) {
        this.aggregiertesTotal = outgoing;
        this.uids = uids;
    }

    @Override
    public Map<String, UuidInformation> getUids() {
        return uids;
    }

    @Override
    public void correctAmount(int amountToSubtract) {
        aggregiertesTotal += amountToSubtract;
    }

    @Override
    public JsonObject toJsonString() {
        JsonObject jsonObject = null;
        try {
            JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
            jsonObject = jsonObjectBuilder.add("identifier", "TotalAmount").add("korbstand", this.aggregiertesTotal).build();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}

