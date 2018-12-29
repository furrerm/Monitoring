package workerBean;

import javax.ejb.Stateless;
import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.ParameterExpression;
import javax.persistence.criteria.Root;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

import dtos.Incoming;
import dtos.Outgoing;
import entities.DataEntity;
import entities.KoerbeEntity;
import websocket.Filter;

@Stateless(name = "dataTransmissionEJB")
public class dataTransmissionBeanImpl implements dataTransmissionBean {

    @PersistenceContext(unitName = "cssDashboardUnit", type = PersistenceContextType.TRANSACTION)
    private EntityManager entityManager;

    public dataTransmissionBeanImpl() {
    }

    @Override
    public Incoming saveIt(Filter filter) {

        Long startOfPeriod = filter.getVon().getTime();
        Long endOfPeriod = filter.getBis().getTime();
        Timestamp lastMinute = new Timestamp(filter.getBis().getTime()- 60000);

        Query query =
                entityManager.createNativeQuery("SELECT * FROM " +
                        "((SELECT Count(*) " +
                        "FROM data d " +
                        "WHERE d.incoming = 1 " +
                        "AND d.time >= '" + new Timestamp(startOfPeriod) + "' " +
                        "AND d.time < '" + new Timestamp(endOfPeriod) + "' " +
                        "AND d.gui in (0,1,2,3,4,5) " +
                        "AND d.korb in ('Korb0', 'Korb1', 'Korb2', 'Korb3', 'Korb4', 'Korb5', 'Korb6', 'Korb7')) AS A " +
                        "LEFT OUTER JOIN (SELECT c.uuid FROM data c " +
                        "WHERE c.incoming = 1 " +
                        "AND c.time >= '" + lastMinute + "' " +
                        "AND c.gui in (0,1,2,3,4,5) " +
                        "AND c.korb in ('Korb0', 'Korb1', 'Korb2', 'Korb3', 'Korb4', 'Korb5', 'Korb6', 'Korb7')) AS B on 1=1)");

        List<Object[]> results = query.getResultList();
        Incoming incoming = new Incoming(((Long) results.get(0)[0]), filter.getVon());

        Set<String> uuids = new HashSet<>();


        for (Object[] result : results) {
            uuids.add((String) result[1]);
        }
        incoming.setUids(uuids);

        return incoming;
    }

    @Override
    public List<Outgoing> getOutgoings(Filter filter) {

        List<Long> periods =filter.getSubPeriods();

        long startOfPeriod;
        long endOfPeriod;
        Timestamp lastMinute = new Timestamp(filter.getBis().getTime()- 60000);

        List<Outgoing> outgoings = new ArrayList<>();

        for (int i = 0; i < periods.size(); ++i) {

            startOfPeriod = periods.get(i);

            if (i + 1 == periods.size()) {
                endOfPeriod = filter.getBis().getTime();

                Query query =
                        entityManager.createNativeQuery("SELECT * FROM " +
                                "((SELECT Count(*) " +
                                "FROM data d " +
                                "WHERE d.outgoing = 1 " +
                                "AND d.time >= '" + new Timestamp(startOfPeriod) + "' " +
                                "AND d.time < '" + new Timestamp(endOfPeriod) + "' " +
                                "AND d.gui in (0,1,2,3,4,5) " +
                                "AND d.korb in ('Korb0', 'Korb1', 'Korb2', 'Korb3', 'Korb4', 'Korb5', 'Korb6', 'Korb7')) AS A " +
                                "LEFT OUTER JOIN (SELECT c.uuid FROM data c " +
                                "WHERE c.outgoing = 1 " +
                                "AND c.time >= '" + lastMinute + "' " +
                                "AND c.gui in (0,1,2,3,4,5) " +
                                "AND c.korb in ('Korb0', 'Korb1', 'Korb2', 'Korb3', 'Korb4', 'Korb5', 'Korb6', 'Korb7')) AS B on 1=1)");

                List<Object[]> results = query.getResultList();
                Outgoing outgoing = new Outgoing(((Long) results.get(0)[0]), new Timestamp(startOfPeriod));
                Set<String> uuids = new HashSet<>();
                for (Object[] result : results) {
                    uuids.add((String) result[1]);
                }
                outgoing.setUids(uuids);
                outgoings.add(outgoing);

            } else {
                endOfPeriod = periods.get(i+1);

                TypedQuery<Long> query =
                        entityManager.createQuery("SELECT Count(c) FROM DataEntity c " +
                                "WHERE c.outgoing = 1 " +
                                "AND c.time >= '" + new Timestamp(startOfPeriod) + "' " +
                                "AND c.time < '" + new Timestamp(endOfPeriod) + "' " +
                                " AND c.gui in :guis " +
                                "AND c.korb in :koerbe ", Long.class);

                long result = query.setParameter("guis", filter.getGuis()).setParameter("koerbe", filter.getKoerbe()).getSingleResult();
                Outgoing outgoing = new Outgoing(result, new Timestamp(startOfPeriod));
                outgoings.add(outgoing);
            }
        }
        return outgoings;
    }
    @Override
    public List<String> getKoerbe() {

       TypedQuery<String> query = entityManager.createQuery("Select k.korbName from KoerbeEntity k", String.class);

        List<String> koerbe = query.getResultList();
        return koerbe;
    }

    public long count() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        CriteriaQuery<Long> countCriteriaQuery = criteriaBuilder.createQuery(Long.class);
        countCriteriaQuery.select(criteriaBuilder.count(countCriteriaQuery.from(DataEntity.class)));

        ParameterExpression<String> nameParamExp2 = criteriaBuilder.parameter(String.class);
        countCriteriaQuery.where(criteriaBuilder.equal(countCriteriaQuery.from(DataEntity.class).get("korb"), nameParamExp2));

        //countCriteriaQuery.where(predicates.toArray(new Predicate[predicates.size()]));
        TypedQuery<Long> typedQuery = entityManager.createQuery(countCriteriaQuery);
        typedQuery.setParameter(nameParamExp2, "Korb2");
        return typedQuery.getSingleResult();
    }
}