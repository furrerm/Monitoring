package workerBean;
import javax.ejb.Stateless;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import entities.DataEntity;

@Stateless(name = "dataTransmissionEJB")
public class dataTransmissionBeanImpl implements dataTransmissionBean{

    @PersistenceContext(unitName = "cssDashboardUnit", type = PersistenceContextType.TRANSACTION)
    private EntityManager entityManager;

    public dataTransmissionBeanImpl() {
    }

    @Override
    public List<DataEntity> saveIt() {

        DataEntity ent = new DataEntity();

        Timestamp t = new Timestamp(System.currentTimeMillis());

        ent.setTime(t);
        ent.setGui(4);
        ent.setKorb("korb4");

        TypedQuery<DataEntity> query =
                entityManager.createQuery("SELECT c FROM DataEntity c", DataEntity.class);
        List<DataEntity> results = query.getResultList();




        return results;
    }
}