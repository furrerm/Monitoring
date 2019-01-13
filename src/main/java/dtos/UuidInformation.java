package dtos;

import java.sql.Timestamp;
import java.util.Objects;

public class UuidInformation {
    private boolean incoming;
    private Timestamp timestamp;

    public UuidInformation(boolean incoming, Timestamp timestamp) {
        this.incoming = incoming;
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UuidInformation that = (UuidInformation) o;
        return incoming == that.incoming &&
                Objects.equals(timestamp, that.timestamp);
    }

    @Override
    public int hashCode() {

        return Objects.hash(incoming, timestamp);
    }

    public boolean isIncoming() {
        return incoming;
    }

    public void setIncoming(boolean incoming) {
        this.incoming = incoming;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
