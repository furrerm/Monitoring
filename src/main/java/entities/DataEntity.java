package entities;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "data", schema = "cssdashboard", catalog = "")
public class DataEntity {
    private long id;
    private Timestamp time;
    private String korb;
    private int gui;
    private Byte ambulant;
    private Byte stationaer;
    private Integer partnerartObergruppe;
    private String plz;
    private Integer korbStand;
    private Byte outgoing;
    private Byte incoming;

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
    @Column(name = "korb", nullable = false, length = 45)
    public String getKorb() {
        return korb;
    }

    public void setKorb(String korb) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DataEntity that = (DataEntity) o;

        if (id != that.id) return false;
        if (gui != that.gui) return false;
        if (time != null ? !time.equals(that.time) : that.time != null) return false;
        if (korb != null ? !korb.equals(that.korb) : that.korb != null) return false;
        if (ambulant != null ? !ambulant.equals(that.ambulant) : that.ambulant != null) return false;
        if (stationaer != null ? !stationaer.equals(that.stationaer) : that.stationaer != null) return false;
        if (partnerartObergruppe != null ? !partnerartObergruppe.equals(that.partnerartObergruppe) : that.partnerartObergruppe != null)
            return false;
        if (plz != null ? !plz.equals(that.plz) : that.plz != null) return false;
        if (korbStand != null ? !korbStand.equals(that.korbStand) : that.korbStand != null) return false;
        if (outgoing != null ? !outgoing.equals(that.outgoing) : that.outgoing != null) return false;
        if (incoming != null ? !incoming.equals(that.incoming) : that.incoming != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + (korb != null ? korb.hashCode() : 0);
        result = 31 * result + gui;
        result = 31 * result + (ambulant != null ? ambulant.hashCode() : 0);
        result = 31 * result + (stationaer != null ? stationaer.hashCode() : 0);
        result = 31 * result + (partnerartObergruppe != null ? partnerartObergruppe.hashCode() : 0);
        result = 31 * result + (plz != null ? plz.hashCode() : 0);
        result = 31 * result + (korbStand != null ? korbStand.hashCode() : 0);
        result = 31 * result + (outgoing != null ? outgoing.hashCode() : 0);
        result = 31 * result + (incoming != null ? incoming.hashCode() : 0);
        return result;
    }
}
