package websocket;

import dtos.UuidInformation;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class UuidController {
    private Map<String, UuidInformation> savedUuids = new HashMap<>();

    public Map<String, UuidInformation> getSavedUuids() {
        return savedUuids;
    }

    public void setSavedUuids(Map<String, UuidInformation> savedUuids) {
        this.savedUuids = savedUuids;
    }

    public int saveAndGetAmountOfDoubleEntries(Map<String, UuidInformation> uuidsToCheck) {
        if (uuidsToCheck == null) {
            return 0;
        }
        System.out.println("saved uuids");
        int amountOfDoubleEntries = 0;
        savedUuids.keySet().forEach(a -> System.out.println(a));
        System.out.println("uuids to check");

        for (String uuidToCheck : uuidsToCheck.keySet()) {
            System.out.println(uuidToCheck);
            if (savedUuids.keySet().contains(uuidToCheck)) {
                if(uuidsToCheck.get(uuidToCheck).isIncoming()){
                    --amountOfDoubleEntries;
                } else{
                    ++amountOfDoubleEntries;
                }
            }
            if(uuidToCheck != null){
                savedUuids.put(uuidToCheck, uuidsToCheck.get(uuidToCheck));
            }
        }
        System.out.println("amount of double entries = "+amountOfDoubleEntries);
        clearOldEntries();

        return amountOfDoubleEntries;
    }

    public void deleteSavedUuids(){
        savedUuids = new HashMap<>();
    }

    private void clearOldEntries() {
        Timestamp latMinute = new Timestamp(System.currentTimeMillis()-60000);
        Set<String> uuidsToRemove = new HashSet<>();
        for(String uuid : savedUuids.keySet()){
            if(uuid != null && savedUuids.get(uuid).getTimestamp().before(latMinute)){

                uuidsToRemove.add(uuid);
            }
        }
        for(String uuidToRemve : uuidsToRemove){

            savedUuids.remove(uuidToRemve);
        }
    }
}
