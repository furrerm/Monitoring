package dtos;

import javax.json.JsonObject;
import java.sql.Timestamp;
import java.util.Map;
import java.util.Set;

public interface GeneralDTO {
    JsonObject toJsonString();
    Map<String, Timestamp> getUids();
    void correctAmount(int amountToSubtract);
}
