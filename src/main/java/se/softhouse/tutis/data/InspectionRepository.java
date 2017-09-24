package se.softhouse.tutis.data;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.TimeZone;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import se.softhouse.tutis.model.ActivityType;
import se.softhouse.tutis.model.Area;
import se.softhouse.tutis.model.Category;
import se.softhouse.tutis.model.Inspection;
import se.softhouse.tutis.model.Summary;
import se.softhouse.tutis.model.User;
import se.softhouse.tutis.util.TimeDifference;
import se.softhouse.tutis.util.TimeZoneUtils;

@ApplicationScoped
public class InspectionRepository {

	@Inject
	private EntityManager em;

	public Inspection findById(Long id) {
		return em.find(Inspection.class, ((Long) id).intValue());
	}

	public List<Inspection> findByUserId(int userId, String strDate) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Inspection> criteria = cb.createQuery(Inspection.class);
		Root<Inspection> user = criteria.from(Inspection.class);
		
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		Date inspectionDate = null;
		try {
			inspectionDate = formatter.parse(strDate);
		} catch (ParseException e1) {
			return null;
		}
		
		criteria.select(user).where(
				cb.and(cb.equal(user.<Date> get("inspectionDate"), inspectionDate),
					   cb.equal(user.get("guard").get("id"), userId))
				).orderBy(cb.desc(user.get("inspectionDate")),
						cb.desc(user.get("startTime")));
		return em.createQuery(criteria).setMaxResults(20).getResultList();
	}

	public List<Inspection> findByUserIdTest(int userId, String strDate) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Inspection> criteria = cb.createQuery(Inspection.class);
		Root<Inspection> user = criteria.from(Inspection.class);
		
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		
		Inspection inspection = new Inspection();
		inspection.setArea(new Area());

		Date inspectionDate = null;
		
		try {
			inspectionDate = formatter.parse(strDate);
			inspection.getArea().setName(inspectionDate.toString());
			inspectionDate = TimeZoneUtils.convertToTimeZone(inspectionDate, TimeZone.getTimeZone("Europe/Copenhagen"));
		} catch (ParseException e1) {
			return null;
		}

		criteria.select(user).where(
				cb.and(cb.equal(user.<Date> get("inspectionDate"), inspectionDate), cb.equal(user.get("guard").get("id"), userId))
				).orderBy(cb.desc(user.get("inspectionDate")),
						cb.desc(user.get("startTime")));
		List<Inspection> list = em.createQuery(criteria).setMaxResults(20).getResultList();
		inspection.setInspectionDate(inspectionDate);
		inspection.setGuard(new User());
		
		if (inspectionDate == null){
			inspection.getGuard().setName("null");
		}else{
			inspection.getGuard().setName(inspectionDate.toString());		
		}
		
		list.add(inspection);
		return list;
	}

	public Inspection findLatestByUserIdAndDate(int userId, String strDate) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Inspection> criteria = cb.createQuery(Inspection.class);
		Root<Inspection> inspectionCriteria = criteria.from(Inspection.class);
		
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		Date inspectionDate = null;
		try {
			inspectionDate = formatter.parse(strDate);
		} catch (ParseException e1) {
			return null;
		}
		
		criteria.select(inspectionCriteria).where(
				cb.and(cb.equal(inspectionCriteria.<Date> get("inspectionDate"), inspectionDate), cb.equal(inspectionCriteria.get("guard").get("id"), userId))
				).orderBy(cb.desc(inspectionCriteria.get("endTime")));
		List<Inspection> inspections = em.createQuery(criteria).getResultList();
		
		Inspection inspection = null;
		if (inspections.size() > 0){
			inspection = inspections.get(0);
		}
		return inspection;

		
	}

	public boolean findDuplicate(Inspection inspection, String strInspectionDate, String strStart, String strEnd) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Inspection> criteria = cb.createQuery(Inspection.class);
		Root<Inspection> user = criteria.from(Inspection.class);
		
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		Date inspectionDate = null;
		Date start = null;
		Date end = null;
		try {
			inspectionDate = formatter.parse(strInspectionDate);
			start = formatter.parse(strStart);
			end = formatter.parse(strEnd);
		} catch (ParseException e1) {
			return true;
		}
		
		criteria.select(user).where(
				cb.and(cb.equal(user.<Date> get("inspectionDate"), inspectionDate), 
						cb.equal(user.get("guard").get("id"), inspection.getGuard().getId()),
						cb.equal(user.get("area").get("id"), inspection.getArea().getId()),
						cb.equal(user.<Date> get("startTime"), start),
						cb.equal(user.<Date> get("endTime"), end),
						cb.equal(user.get("activityType").get("id"), inspection.getActivityType().getId())
				)).orderBy(cb.desc(user.get("inspectionDate")),
						cb.desc(user.get("startTime")));
		
		List<Inspection> inspections = em.createQuery(criteria).getResultList();
		Inspection retInspection = null;
		if (inspections.size() > 0){
			retInspection = inspections.get(0);
		}
		return retInspection != null;
	}

	public boolean findDuplicateTest(Inspection inspection, String strMinDate, String strMinStart, String strMinEnd) {
		List results = null;
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		Date minInspectionDate = null;
		Date maxInspectionDate = null;
		
		Date minStart = null;
		Date maxStart = null;
		
		Date minEnd = null;
		Date maxEnd = null;
		
		try {
			minInspectionDate = formatter.parse(strMinDate);
			Calendar calDate = Calendar.getInstance();
			calDate.setTime(minInspectionDate);
			calDate.add(Calendar.HOUR_OF_DAY, -6);
			minInspectionDate = calDate.getTime();
			calDate.add(Calendar.MINUTE, 4);
			maxInspectionDate = calDate.getTime();
		
			minStart = formatter.parse(strMinStart);
			Calendar calStart = Calendar.getInstance();
			calStart.setTime(minStart);
			calStart.add(Calendar.HOUR_OF_DAY, -6);
			minStart = calStart.getTime();
			calStart.add(Calendar.MINUTE, 1);
			maxStart = calStart.getTime();
			
			minEnd = formatter.parse(strMinEnd);
			Calendar calEnd = Calendar.getInstance();
			calEnd.setTime(minEnd);
			calEnd.add(Calendar.HOUR_OF_DAY, -6);
			minEnd = calEnd.getTime();
			calEnd.add(Calendar.MINUTE, 1);
			maxEnd = calEnd.getTime();
			
		} catch (ParseException e1) {
			//return true;
		}
		
		String query = "select i.id, i.companyCode, i.travel, i.startTime, i.endTime, "
				+ "i.activityTypeID, i.areaID, "
				+ "i.categoryID, i.userID, i.inspectionDate "
				+ "from inspection i "
				+ "where i.inspectionDate>=? && i.inspectionDate<? && "
				+ "i.userID=? && "
				+ "i.areaID=? && "
				+ "i.startTime>=? && i.startTime<? && "
				+ "i.endTime>=? && i.endTime<? && "
				+ "i.activityTypeID=?";
			
		inspection.setStartTime(maxStart);
		inspection.setInspectionDate(maxInspectionDate);
		inspection.setEndTime(maxEnd);
		results = em.createNativeQuery(query)
				.setParameter(1, new java.sql.Date(minInspectionDate.getTime()))
				.setParameter(2, new java.sql.Date(maxInspectionDate.getTime()))
				.setParameter(3, inspection.getGuard().getId())
				.setParameter(4, inspection.getArea().getId())
				.setParameter(5, new java.sql.Date(minStart.getTime()))
				.setParameter(6, new java.sql.Date(maxStart.getTime()))
				.setParameter(7, new java.sql.Date(minEnd.getTime()))
				.setParameter(8, new java.sql.Date(maxEnd.getTime()))
				.setParameter(9, inspection.getActivityType().getId())				
				.getResultList();			


		Iterator iter = results.iterator(); 
		return iter.hasNext();
		
		/*CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Inspection> criteria = cb.createQuery(Inspection.class);
		Root<Inspection> user = criteria.from(Inspection.class);
		
		criteria.select(user).where(
				cb.and(cb.equal(user.<Date> get("inspectionDate"), inspection.getInspectionDate()), 
						cb.equal(user.get("guard").get("id"), inspection.getGuard().getId()),
						cb.equal(user.get("area").get("id"), inspection.getArea().getId()),
						cb.equal(user.<Date> get("startTime"), inspection.getStartTime()),
						cb.equal(user.<Date> get("endTime"), inspection.getEndTime()),
						cb.equal(user.get("activityType").get("id"), inspection.getActivityType().getId())
				));
		List<Inspection> inspections = em.createQuery(criteria).getResultList();
		
		return inspections.size() > 0;
		*/
	}
	
	public static String getFormattedDateString(Date date){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return formatter.format(date);
	}

	public List<Summary> getSummary(Date start, Date end) {
		List results = null;

		String query = "select i.id, i.companyCode, i.travel, i.startTime, i.endTime,  concat('', timediff(endTime,startTime)) as duration, "
				+ "i.fined, i.warnings, i.obliterated, i.activityTypeID, at.description as activity, at.code as activityCode, i.areaID, a.name as area, a.code as areaCode, "
				+ "i.categoryID, c.description as category, c.code as categoryCode, i.userID, u.name as employee, u.usercode as usercode, i.inspectionDate "
				+ "from inspection i "
				+ "left join area a on a.id=i.areaID "
				+ "left join user u on u.id=i.userID "
				+ "left join category c on c.id = i.categoryID "
				+ "left join activitytype at on at.id = i.activityTypeID ";
		if (start != null) {
			query += "where i.inspectionDate >= ? && i.inspectionDate < ? ";
			query += "order by i.inspectionDate desc, employee desc, i.startTime asc";
			
			results = em.createNativeQuery(query).setParameter(1, start)
					.setParameter(2, end).setMaxResults(7500).getResultList();			
			
		} else {
			query += "order by i.inspectionDate desc, employee desc, i.startTime asc";
			results = em.createNativeQuery(query).setMaxResults(7500).getResultList();
		}
		List<Summary> users = new ArrayList<Summary>();
		for (Iterator iter = results.iterator(); iter.hasNext();) {
			Object[] objects = (Object[]) iter.next();
			Summary summary = new Summary();
			summary.setId((Integer) objects[0]);
			summary.setCompanyCode((Integer) objects[1]);
			summary.setTravel((Date) objects[2]);
			summary.setStartTime((Date) objects[3]);
			summary.setEndTime((Date) objects[4]);
			summary.setDuration(getDuration(objects[5].toString()));
			summary.setFined((Integer) objects[6]);
			summary.setWarnings((Integer) objects[7]);
			summary.setObliterated((Integer) objects[8]);
			ActivityType at = new ActivityType();
			at.setId((Integer) objects[9]);
			at.setCode((Integer) objects[11]);
			at.setDescription(objects[10].toString());
			summary.setActivityType(at);
			Area area = new Area();
			area.setId((Integer) objects[12]);
			area.setCode((Integer) objects[14]);
			area.setName(objects[13].toString());
			summary.setArea(area);
			Category category = new Category();
			category.setId((Integer) objects[15]);
			category.setCode((Integer) objects[17]);
			category.setDescription(objects[16].toString());
			summary.setCategory(category);

			User user = new User();
			user.setId((Integer) objects[18]);
			user.setName(objects[19].toString());
			user.setUsercode((Integer) objects[20]);
			summary.setGuard(user);
			summary.setInspectionDate((Date) objects[21]);
			users.add(summary);
		}

		return users;
	}

	public int getFinedCount(Date start, Date end) {
		int result = 0;

		String query = "select sum(fined) as totalFined "
				+ "from inspection i ";

		Object results = null;
		if (start != null) {
			query += "where i.inspectionDate >= ? && i.inspectionDate < ? ";
			results = em.createNativeQuery(query).setParameter(1, start).setParameter(2, end).getSingleResult();
		} else {
			results = em.createNativeQuery(query).getSingleResult();
		}

		if (results != null) {
			result = Integer.parseInt(results.toString());
		}

		return result;
	}

	public List<Inspection> getMetaSummary(int userId) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Inspection> criteria = cb.createQuery(Inspection.class);
		Root<Inspection> user = criteria.from(Inspection.class);

		criteria.select(user)
				.where(cb.equal(user.get("guard").get("id"), userId))
				.orderBy(cb.desc(user.get("inspectionDate")),
						cb.desc(user.get("startTime")));
		return em.createQuery(criteria).getResultList();
	}

	public List<Inspection> findAll() {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Inspection> criteria = cb.createQuery(Inspection.class);
		Root<Inspection> user = criteria.from(Inspection.class);

		criteria.select(user).orderBy(cb.desc(user.get("inspectionDate")),
				cb.desc(user.get("guard").get("name")),
				cb.desc(user.get("startTime")));
		return em.createQuery(criteria).getResultList();
	}

	public List<Inspection> findAllByDate(Date from, Date to) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Inspection> criteria = cb.createQuery(Inspection.class);
		Root<Inspection> inspection = criteria.from(Inspection.class);

		if (!isSameDay(from, to)){
			criteria.select(inspection).where(
					cb.between(inspection.<Date> get("inspectionDate"), from, to)).orderBy(cb.desc(inspection.get("inspectionDate")),
							cb.desc(inspection.get("guard").get("name")),
							cb.asc(inspection.get("startTime")));
		}else{
			criteria.select(inspection).where(
					cb.equal(inspection.get("inspectionDate"), from)).orderBy(cb.desc(inspection.get("inspectionDate")),
							cb.desc(inspection.get("guard").get("name")),
							cb.asc(inspection.get("startTime")));
		}

		return em.createQuery(criteria).getResultList();
	}

	private TimeDifference getDuration(String duration) {
		TimeDifference diff = new TimeDifference();
		String[] timeParts = duration.split(":");
		diff.setHours(Integer.parseInt(timeParts[0]));
		diff.setMinutes(Integer.parseInt(timeParts[1]));
		diff.setSeconds(Integer.parseInt(timeParts[2]));

		return diff;
	}
	
	private boolean isSameDay(Date from, Date to){
		SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		return fmt.format(from).equals(fmt.format(to));
	}
}
