package entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "korbstaende", schema = "cssdashboard", catalog = "")
public class KorbstaendeEntity {
    private int idkorbstaende;
    private int inhalt;
    private int gui;
    private int korb;
    private Timestamp updateTime;
    private DataEntity dataByKorb;
    private DataEntity dataByGui;
    private GuisEntity guisByGui;
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
    @Column(name = "gui", nullable = false)
    public int getGui() {
        return gui;
    }

    public void setGui(int gui) {
        this.gui = gui;
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
                gui == that.gui &&
                korb == that.korb &&
                Objects.equals(updateTime, that.updateTime);
    }

    @Override
    public int hashCode() {

        return Objects.hash(idkorbstaende, inhalt, gui, korb, updateTime);
    }

    @ManyToOne
    @PrimaryKeyJoinColumn(name = "gui", referencedColumnName = "idGuis")
    public GuisEntity getGuisByGui() {
        return guisByGui;
    }

    public void setGuisByGui(GuisEntity guisByGui) {
        this.guisByGui = guisByGui;
    }

    @ManyToOne
    @PrimaryKeyJoinColumn(name = "korb", referencedColumnName = "idkoerbe")
    public KoerbeEntity getKoerbeByKorb() {
        return koerbeByKorb;
    }

    public void setKoerbeByKorb(KoerbeEntity koerbeByKorb) {
        this.koerbeByKorb = koerbeByKorb;
    }
}
