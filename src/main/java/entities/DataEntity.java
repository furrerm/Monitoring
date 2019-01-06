package entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "data", schema = "cssdashboard", catalog = "")
public class DataEntity {
    private long id;
    private Timestamp time;
    private int korb;
    private int gui;
    private Byte ambulant;
    private Byte stationaer;
    private Integer partnerartObergruppe;
    private String plz;
    private Integer korbStand;
    private Byte outgoing;
    private Byte incoming;
    private String uuid;

    @Id
    @Column(name = "id", nullable = false)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "time", nullable = false)
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    @Basic
    @Column(name = "korb", nullable = false)
    public int getKorb() {
        return korb;
    }

    public void setKorb(int korb) {
        this.korb = korb;
    }

    @Basic
    @Column(name = "gui", nullable = false)
    public int getGui() {
        return gui;
    }

    public void setGui(int gui) {
        this.gui = gui;
    }

    @Basic
    @Column(name = "ambulant", nullable = true)
    public Byte getAmbulant() {
        return ambulant;
    }

    public void setAmbulant(Byte ambulant) {
        this.ambulant = ambulant;
    }

    @Basic
    @Column(name = "stationaer", nullable = true)
    public Byte getStationaer() {
        return stationaer;
    }

    public void setStationaer(Byte stationaer) {
        this.stationaer = stationaer;
    }

    @Basic
    @Column(name = "partnerartObergruppe", nullable = true)
    public Integer getPartnerartObergruppe() {
        return partnerartObergruppe;
    }

    public void setPartnerartObergruppe(Integer partnerartObergruppe) {
        this.partnerartObergruppe = partnerartObergruppe;
    }

    @Basic
    @Column(name = "plz", nullable = true, length = 45)
    public String getPlz() {
        return plz;
    }

    public void setPlz(String plz) {
        this.plz = plz;
    }

    @Basic
    @Column(name = "korbStand", nullable = true)
    public Integer getKorbStand() {
        return korbStand;
    }

    public void setKorbStand(Integer korbStand) {
        this.korbStand = korbStand;
    }

    @Basic
    @Column(name = "outgoing", nullable = true)
    public Byte getOutgoing() {
        return outgoing;
    }

    public void setOutgoing(Byte outgoing) {
        this.outgoing = outgoing;
    }

    @Basic
    @Column(name = "incoming", nullable = true)
    public Byte getIncoming() {
        return incoming;
    }

    public void setIncoming(Byte incoming) {
        this.incoming = incoming;
    }

    @Basic
    @Column(name = "uuid", nullable = false, length = 45)
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DataEntity that = (DataEntity) o;
        return id == that.id &&
                korb == that.korb &&
                gui == that.gui &&
                Objects.equals(time, that.time) &&
                Objects.equals(ambulant, that.ambulant) &&
                Objects.equals(stationaer, that.stationaer) &&
                Objects.equals(partnerartObergruppe, that.partnerartObergruppe) &&
                Objects.equals(plz, that.plz) &&
                Objects.equals(korbStand, that.korbStand) &&
                Objects.equals(outgoing, that.outgoing) &&
                Objects.equals(incoming, that.incoming) &&
                Objects.equals(uuid, that.uuid);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, time, korb, gui, ambulant, stationaer, partnerartObergruppe, plz, korbStand, outgoing, incoming, uuid);
    }
}
