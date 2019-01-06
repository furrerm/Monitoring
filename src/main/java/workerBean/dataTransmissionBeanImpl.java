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
        Timestamp lastMinute = new Timestamp(filter.getBis().getTime() - 60000);

        String guis = filter.getGuis().stream().map(a -> a.toString()).collect(Collectors.joining(","));
        String koerbe =  filter.getKoerbe().stream().map(a -> a.toString()).collect(Collectors.joining(","));

        Query query =
                entityManager.createNativeQuery("SELECT * FROM " +
                        "((SELECT Count(*) " +
                        "FROM data d " +
                        "WHERE d.incoming = 1 " +
                        "AND d.time >= '" + new Timestamp(startOfPeriod) + "' " +
                        "AND d.time < '" + new Timestamp(endOfPeriod) + "' " +
                        "AND d.gui in ( " + guis + " )" +
                        "AND d.korb in ( " + koerbe + " )" +
                        ") AS A " +
                        "LEFT OUTER JOIN (SELECT c.uuid, c.time FROM data c " +
                        "WHERE c.incoming = 1 " +
                        "AND c.time >= '" + lastMinute + "' " +
                        "AND c.gui in ( " + guis + " )" +
                        "AND c.korb in ( " + koerbe + " )" +
                        ") AS B on 1=1)");

        List<Object[]> results = query.getResultList();
        Incoming incoming = new Incoming(((Long) results.get(0)[0]), filter.getVon());

        Map<String, Timestamp> uuids = new HashMap<>();


        for (Object[] result : results) {
            uuids.put((String) result[1], (Timestamp) result[2]);
        }
        incoming.setUids(uuids);

        return incoming;
    }

    @Override
    public List<Outgoing> getOutgoings(Filter filter) {

        List<Long> periods = filter.getSubPeriods();

        long startOfPeriod;
        long endOfPeriod;
        Timestamp lastMinute = new Timestamp(filter.getBis().getTime() - 60000);

        List<Outgoing> outgoings = new ArrayList<>();

        for (int i = 0; i < periods.size(); ++i) {

            startOfPeriod = periods.get(i);

            if (i + 1 == periods.size()) {
                endOfPeriod = filter.getBis().getTime();


                String guis = filter.getGuis().stream().map(a -> a.toString()).collect(Collectors.joining(","));
                String koerbe =  filter.getKoerbe().stream().map(a -> a.toString()).collect(Collectors.joining(","));
                System.out.println("timestamps in worker bean");
                System.out.println(new Timestamp(startOfPeriod));
                System.out.println(new Timestamp(endOfPeriod));
                Query query =
                        entityManager.createNativeQuery("SELECT * FROM " +
                                "((SELECT Count(*) " +
                                "FROM data d " +
                                "WHERE d.outgoing = 1 " +
                                "AND d.time >= '" + new Timestamp(startOfPeriod) + "' " +
                                "AND d.time < '" + new Timestamp(endOfPeriod) + "' " +
                                "AND d.gui in ( " + guis + " )" +
                                "AND d.korb in ( " + koerbe + " )" +
                                ") AS A " +
                                "LEFT OUTER JOIN (SELECT c.uuid, c.time FROM data c " +
                                "WHERE c.outgoing = 1 " +
                                "AND c.time >= '" + new Timestamp(startOfPeriod) + "' " +
                                "AND c.gui in ( " + guis + " )" +
                                "AND c.korb in ( " + koerbe + " )" +
                                ") AS B on 1=1)");

                System.out.println(query.toString());


                List<Object[]> results = query.getResultList();
                System.out.println((results.get(0)[0]));
                Outgoing outgoing = new Outgoing(((Long) results.get(0)[0]), new Timestamp(startOfPeriod));
                Map<String, Timestamp> uuids = new HashMap();
                for (Object[] result : results) {
                    if (result[1] != null) {
                        uuids.put(result[1].toString(), (Timestamp) result[2]);
                    }
                }
                outgoing.setUids(uuids);
                outgoings.add(outgoing);

            } else {
                endOfPeriod = periods.get(i + 1);

                TypedQuery<Long> query =
                        entityManager.createQuery("SELECT Count(c) FROM DataEntity c " +
                                "WHERE c.outgoing = 1 " +
                                "AND c.time >= '" + new Timestamp(startOfPeriod) + "' " +
                                "AND c.time < '" + new Timestamp(endOfPeriod) + "' " +
                                " AND c.gui in :guis " +
                                "AND c.korb in :koerbe ", Long.class);

                long result = query.setParameter("guis", filter.getGuis()).setParameter("koerbe", filter.getKoerbe()).getSingleResult();




                String koerbe = "1,2,3,4,5";
                Outgoing outgoing = new Outgoing(result, new Timestamp(startOfPeriod));
                outgoings.add(outgoing);
            }
        }
        return outgoings;
    }

    @Override
    public List<KoerbeEntity> getKoerbe() {

        TypedQuery<KoerbeEntity> query = entityManager.createQuery("Select k from KoerbeEntity k", KoerbeEntity.class);

        List<KoerbeEntity> koerbe = query.getResultList();

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