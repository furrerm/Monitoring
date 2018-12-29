package websocket;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class UuidController {
    private Map<String, Timestamp> savedUuids = new HashMap<>();

    public Map<String, Timestamp> getSavedUuids() {
        return savedUuids;
    }

    public void setSavedUuids(Map<String, Timestamp> savedUuids) {
        this.savedUuids = savedUuids;
    }
/*
    public int saveAndGetAmountOfDoubleEntries(String uuidToCheck) {
        if (uuidToCheck == null) {
            return 0;
        }
        int amountOfDoubleEntries = 0;

        if (savedUuids.keySet().contains(uuidToCheck)) {
            amountOfDoubleEntries = 1;
        }
        savedUuids.put(uuidToCheck);

        return amountOfDoubleEntries;
    }
*/
    public int saveAndGetAmountOfDoubleEntries(Map<String,Timestamp> uuidsToCheck) {
        if (uuidsToCheck == null) {
            return 0;
        }
        System.out.println("in get amount and save");
        int amountOfDoubleEntries = 0;
        for (String uuidToCheck : uuidsToCheck.keySet()) {
            if (savedUuids.keySet().contains(uuidToCheck)) {
                ++amountOfDoubleEntries;
            }
            savedUuids.put(uuidToCheck, uuidsToCheck.get(uuidToCheck));
        }
        clearOldEntries();
        return amountOfDoubleEntries;
    }

    private void clearOldEntries() {
        Timestamp latMinute = new Timestamp(System.currentTimeMillis()-60000);
        Set<String> uuidsToRemove = new HashSet<>();
        for(String uuid : savedUuids.keySet()){
            if(uuid != null && savedUuids.get(uuid).before(latMinute)){

                uuidsToRemove.add(uuid);
            }
        }
        for(String uuidToRemve : uuidsToRemove){

            savedUuids.remove(uuidToRemve);
        }
    }
}
