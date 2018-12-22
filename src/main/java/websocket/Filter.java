package websocket;

import javax.json.*;
import java.io.StringReader;
import java.sql.Timestamp;
import java.util.*;

public class Filter {
    private Timestamp von;
    private Timestamp bis;
    private Set<String> koerbe;
    private Set<Integer> guis;
    private List<Long> subPeriods;

    public Filter(String message) {
        System.out.println("message = " + message);
        System.out.println("here 1");
        JsonReader jsonReader = Json.createReader(new StringReader(message));
        System.out.println("here 2");
        //JsonArray array = jsonReader.readArray();
        JsonObject obj = jsonReader.readObject();
        System.out.println("here 3");

        System.out.println("message = " + message);
        System.out.println("koerbe = " + obj.getJsonArray("koerbe"));

        //System.out.println("guis = "+obj.getJsonArray("guis"));

        JsonArray arr = obj.getJsonArray("koerbe");


        koerbe = toStringSet(obj.getJsonArray("koerbe"));
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
        System.out.println("timestamp = " + this.von);
        System.out.println("timestamp bis = " + this.bis);

        jsonReader.close();

/*
        JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();
        Json json = new Json(message);
        message
        */
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
        System.out.println(stringValue);
    }

    public Timestamp getVon() {
        return von;
    }

    public Set<String> getKoerbe() {
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
