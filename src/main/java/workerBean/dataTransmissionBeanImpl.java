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
import dtos.TotalAmount;
import dtos.UuidInformation;
import entities.DataEntity;
import entities.KoerbeEntity;
import entities.KorbstaendeEntity;
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
        String koerbe = filter.getKoerbe().stream().map(a -> a.toString()).collect(Collectors.joining(","));

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

        Map<String, UuidInformation> uuids = new HashMap<>();


        for (Object[] result : results) {
            uuids.put((String) result[1], new UuidInformation(false, (Timestamp) result[2]));
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
                String koerbe = filter.getKoerbe().stream().map(a -> a.toString()).collect(Collectors.joining(","));

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
                                "AND c.time >= '" + lastMinute + "' " +
                                "AND c.gui in ( " + guis + " )" +
                                "AND c.korb in ( " + koerbe + " )" +
                                ") AS B on 1=1)");

                List<Object[]> results = query.getResultList();
                Outgoing outgoing = new Outgoing(((Long) results.get(0)[0]), new Timestamp(startOfPeriod));
                Map<String, UuidInformation> uuids = new HashMap();
                for (Object[] result : results) {
                    if (result[1] != null) {
                        uuids.put(result[1].toString(), new UuidInformation(false, (Timestamp) result[2]));
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

                Outgoing outgoing = new Outgoing(result, new Timestamp(startOfPeriod));
                outgoings.add(outgoing);
            }
        }
        return outgoings;
    }

    @Override
    public TotalAmount getTotalAmount(Filter filter) {

        TypedQuery<KorbstaendeEntity> query =
                entityManager.createQuery("SELECT k FROM KorbstaendeEntity k " +
                        "WHERE k.gui in :guis " +
                        "AND k.korb in :koerbe ", KorbstaendeEntity.class);

        List<KorbstaendeEntity> resultList = query.setParameter("guis", filter.getGuis()).setParameter("koerbe", filter.getKoerbe()).getResultList();
        List<KorbstaendeEntity> completedList = getAllKorbstaendeEvenNotInDBAvailable(resultList, filter);
        long totalAmount = 0;
        Map<String, UuidInformation> uuids = new HashMap();
        Incoming incoming;
        Outgoing outgoing;
        for (KorbstaendeEntity korbstaendeEntity : completedList) {
            incoming = this.getIncoming(korbstaendeEntity.getUpdateTime(), korbstaendeEntity.getGui(), korbstaendeEntity.getKorb());
            outgoing = this.getOutgoing(korbstaendeEntity.getUpdateTime(), korbstaendeEntity.getGui(), korbstaendeEntity.getKorb());
            uuids.putAll(incoming.getUids());
            uuids.putAll(outgoing.getUids());
            totalAmount += incoming.getIncoming();
            totalAmount += korbstaendeEntity.getInhalt();
            totalAmount -= outgoing.getOutgoing();
            System.out.println("total amoutn temp = " + totalAmount);
            System.out.println("gui = " + korbstaendeEntity.getGui() + "  korb = " + korbstaendeEntity.getKorb() + " time = " + korbstaendeEntity.getUpdateTime());

        }
        return new TotalAmount(totalAmount, uuids);
    }

    private List<KorbstaendeEntity> getAllKorbstaendeEvenNotInDBAvailable(List<KorbstaendeEntity> korbstaendeEntities, Filter filter) {
        Set<Integer> guis = filter.getGuis();
        Set<Integer> koerbe = filter.getKoerbe();
        Timestamp timeOfInterset = filter.getVon();

        System.out.println("filter von = "+filter.getVon());

        List<KorbstaendeEntity> korbstaendeEntityList = new ArrayList<>();
        for (Integer gui : guis) {
            for (Integer korb : koerbe) {
                KorbstaendeEntity korbstaendeEntityToReturn = new KorbstaendeEntity();
                korbstaendeEntityToReturn.setUpdateTime(timeOfInterset);
                korbstaendeEntityToReturn.setKorb(korb);
                korbstaendeEntityToReturn.setGui(gui);
                korbstaendeEntityToReturn.setInhalt(0);
                for (KorbstaendeEntity korbstaendeEntity : korbstaendeEntities) {
                    if (korbstaendeEntity.getGui() == gui && korbstaendeEntity.getKorb() == korb) {
                        korbstaendeEntityToReturn.setUpdateTime(korbstaendeEntity.getUpdateTime());
                        korbstaendeEntityToReturn.setInhalt(korbstaendeEntity.getInhalt());
                    }
                }
                korbstaendeEntityList.add(korbstaendeEntityToReturn);
            }
        }
        return korbstaendeEntityList;
    }

    public Outgoing getOutgoing(Timestamp from, int gui, int korb) {

        Timestamp lastMinute = new Timestamp(System.currentTimeMillis() - 60000);

        Query query =
                entityManager.createNativeQuery("SELECT * FROM " +
                        "((SELECT Count(*) " +
                        "FROM data d " +
                        "WHERE d.outgoing = 1 " +
                        "AND d.time >= '" + from + "' " +
                        "AND d.gui = " + gui + " " +
                        "AND d.korb = " + korb + " " +
                        ") AS A " +
                        "LEFT OUTER JOIN (SELECT c.uuid, c.time FROM data c " +
                        "WHERE c.outgoing = 1 " +
                        "AND c.time >= '" + lastMinute + "' " +
                        "AND c.gui = " + gui + " " +
                        "AND c.korb = " + korb + " " +
                        ") AS B on 1=1)");

        List<Object[]> results = query.getResultList();
        Outgoing outgoing = new Outgoing(((Long) results.get(0)[0]), from);
        Map<String, UuidInformation> uuids = new HashMap();
        for (Object[] result : results) {
            if (result[1] != null) {
                uuids.put(result[1].toString(), new UuidInformation(false, (Timestamp) result[2]));

            }
        }

        System.out.println("outgoing = "+outgoing.getOutgoing()+ " for korb = "+korb+" gui = "+gui+ " from = "+from);
        outgoing.setUids(uuids);

        return outgoing;
    }

    public Incoming getIncoming(Timestamp from, int gui, int korb) {

        Timestamp lastMinute = new Timestamp(System.currentTimeMillis() - 60000);

        Query query =
                entityManager.createNativeQuery("SELECT * FROM " +
                        "((SELECT Count(*) " +
                        "FROM data d " +
                        "WHERE d.incoming = 1 " +
                        "AND d.time >= '" + from + "' " +
                        "AND d.gui = " + gui + " " +
                        "AND d.korb = " + korb + " " +
                        ") AS A " +
                        "LEFT OUTER JOIN (SELECT c.uuid, c.time FROM data c " +
                        "WHERE c.incoming = 1 " +
                        "AND c.time >= '" + lastMinute + "' " +
                        "AND c.gui = " + gui + " " +
                        "AND c.korb = " + korb + " " +
                        ") AS B on 1=1)");

        List<Object[]> results = query.getResultList();
        Incoming incoming = new Incoming(((Long) results.get(0)[0]), from);
        Map<String, UuidInformation> uuids = new HashMap();
        for (Object[] result : results) {
            if (result[1] != null) {
                uuids.put(result[1].toString(), new UuidInformation(true, (Timestamp) result[2]));
            }
        }
        incoming.setUids(uuids);

        return incoming;
    }

    @Override
    public List<KoerbeEntity> getKoerbe() {

        TypedQuery<KoerbeEntity> query = entityManager.createQuery("Select k from KoerbeEntity k", KoerbeEntity.class);

        List<KoerbeEntity> koerbe = query.getResultList();

        return koerbe;
    }
}