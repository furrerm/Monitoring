package entities;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "guis", schema = "cssdashboard", catalog = "")
public class GuisEntity {
    private int idGuis;
    private String guiName;
    private Collection<KorbstaendeEntity> korbstaendesByIdGuis;

    @Id
    @Column(name = "idGuis", nullable = false)
    public int getIdGuis() {
        return idGuis;
    }

    public void setIdGuis(int idGuis) {
        this.idGuis = idGuis;
    }

    @Basic
    @Column(name = "guiName", nullable = false, length = 45)
    public String getGuiName() {
        return guiName;
    }

    public void setGuiName(String guiName) {
        this.guiName = guiName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GuisEntity that = (GuisEntity) o;
        return idGuis == that.idGuis &&
                Objects.equals(guiName, that.guiName);
    }

    @Override
    public int hashCode() {

        return Objects.hash(idGuis, guiName);
    }

    @OneToMany(mappedBy = "guisByGui")
    public Collection<KorbstaendeEntity> getKorbstaendesByIdGuis() {
        return korbstaendesByIdGuis;
    }

    public void setKorbstaendesByIdGuis(Collection<KorbstaendeEntity> korbstaendesByIdGuis) {
        this.korbstaendesByIdGuis = korbstaendesByIdGuis;
    }
}
