package dtos;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.sql.Timestamp;
import java.util.Map;
import java.util.Set;

public class TotalAmount implements GeneralDTO{
    @Override
    public JsonObject toJsonString(){
        JsonObject jsonObject = null;
        try {

            JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
            //jsonObject = jsonObjectBuilder.add("time", this.timestamp.toString()).add("in", this.incoming).build();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }

    @Override
    public Map<String, Timestamp> getUids() {
        return null;
    }

    @Override
    public void correctAmount(int amountToSubtract) {

    }
}
