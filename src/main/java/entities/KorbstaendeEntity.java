package entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "korbstaende", schema = "cssdashboard", catalog = "")
public class KorbstaendeEntity {
    private int idkorbstaende;
    private int inhalt;
    private Integer gui;
    private Timestamp updateTime;
    private KoerbeEntity koerbeByKorb;

    @Id
    @Column(name = "idkorbstaende", nullable = false)
    public int getIdkorbstaende() {
        return idkorbstaende;
    }

    public void setIdkorbstaende(int idkorbstaende) {
        this.idkorbstaende = idkorbstaende;
    }

    @Basic
    @Column(name = "inhalt", nullable = false)
    public int getInhalt() {
        return inhalt;
    }

    public void setInhalt(int inhalt) {
        this.inhalt = inhalt;
    }

    @Basic
    @Column(name = "gui", nullable = true)
    public Integer getGui() {
        return gui;
    }

    public void setGui(Integer gui) {
        this.gui = gui;
    }

    @Basic
    @Column(name = "updateTime", nullable = false)
    public Timestamp getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        KorbstaendeEntity that = (KorbstaendeEntity) o;
        return idkorbstaende == that.idkorbstaende &&
                inhalt == that.inhalt &&
                Objects.equals(gui, that.gui) &&
                Objects.equals(updateTime, that.updateTime);
    }

    @Override
    public int hashCode() {

        return Objects.hash(idkorbstaende, inhalt, gui, updateTime);
    }

    @ManyToOne
    @JoinColumn(name = "korb", referencedColumnName = "idkoerbe")
    public KoerbeEntity getKoerbeByKorb() {
        return koerbeByKorb;
    }

    public void setKoerbeByKorb(KoerbeEntity koerbeByKorb) {
        this.koerbeByKorb = koerbeByKorb;
    }
}
