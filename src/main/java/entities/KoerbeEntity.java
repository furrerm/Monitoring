package entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "koerbe", schema = "cssdashboard", catalog = "")
public class KoerbeEntity {
    private int idkoerbe;
    private String korbName;

    @Id
    @Column(name = "idkoerbe", nullable = false)
    public int getIdkoerbe() {
        return idkoerbe;
    }

    public void setIdkoerbe(int idkoerbe) {
        this.idkoerbe = idkoerbe;
    }

    @Basic
    @Column(name = "korbName", nullable = false, length = 45)
    public String getKorbName() {
        return korbName;
    }

    public void setKorbName(String korbName) {
        this.korbName = korbName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        KoerbeEntity that = (KoerbeEntity) o;
        return idkoerbe == that.idkoerbe &&
                Objects.equals(korbName, that.korbName);
    }

    @Override
    public int hashCode() {

        return Objects.hash(idkoerbe, korbName);
    }
}
