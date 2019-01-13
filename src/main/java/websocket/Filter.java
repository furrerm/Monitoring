package websocket;

import javax.json.*;
import java.io.StringReader;
import java.sql.Timestamp;
import java.util.*;

public class Filter {
    private Timestamp von;
    private Timestamp bis;
    private Set<Integer> koerbe;
    private Set<Integer> guis;
    private List<Long> subPeriods;

    public Filter(String message) {

        JsonReader jsonReader = Json.createReader(new StringReader(message));


        JsonObject obj = jsonReader.readObject();

        koerbe = toIntSet(obj.getJsonArray("koerbe"));
        guis = toIntSet(obj.getJsonArray("guis"));
        subPeriods = new ArrayList(toLongSet(obj.getJsonArray("subTimeList")));
        subPeriods.sort((a,b) -> {
            if(a - b > 0){
                return 1;
            } else if (a - b < 0){
                return -1;
            }
            return 0;
        });

        this.von = new Timestamp(obj.getJsonNumber("timeOfInterest").longValue());
        this.bis = new Timestamp(obj.getJsonNumber("timeOfInterestEnd").longValue());

        jsonReader.close();
    }

    private Set<String> toStringSet(JsonArray array) {

        Set<String> hashSet = new HashSet<>();

        for (int i = 0; i < array.size(); i++) {
            hashSet.add(array.getString(i));
        }
        return hashSet;
    }

    private Set<Integer> toIntSet(JsonArray array) {

        Set<Integer> hashSet = new HashSet<>();

        for (int i = 0; i < array.size(); i++) {
            hashSet.add(array.getInt(i));
        }
        return hashSet;
    }

    private Set<Long> toLongSet(JsonArray array) {

        Set<Long> hashSet = new HashSet<>();

        for (int i = 0; i < array.size(); i++) {
            hashSet.add(array.getJsonNumber(i).longValue());
        }
        return hashSet;
    }

    private void toDate(JsonValue value) {
        String stringValue = value.toString();
    }

    public Timestamp getVon() {
        return von;
    }

    public Set<Integer> getKoerbe() {
        return koerbe;
    }

    public Set<Integer> getGuis() {
        return guis;
    }


    public List<Long> getSubPeriods() {
        return subPeriods;
    }


    public Timestamp getBis() {
        return bis;
    }


}
