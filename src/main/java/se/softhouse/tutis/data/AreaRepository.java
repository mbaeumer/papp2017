package se.softhouse.tutis.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import se.softhouse.tutis.model.ActivityType;
import se.softhouse.tutis.model.Area;
import se.softhouse.tutis.model.Category;
import se.softhouse.tutis.model.ComposedArea;
import se.softhouse.tutis.model.Summary;
import se.softhouse.tutis.model.User;

public class AreaRepository {
	
	@Inject
    private EntityManager em;
	
	public List<Area> findAll() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Area> criteria = cb.createQuery(Area.class);
        Root<Area> area = criteria.from(Area.class);
        
        criteria.select(area);
        return em.createQuery(criteria).getResultList();
    }
	
	public Area findById(Long id) {
        return em.find(Area.class, ((Long)id).intValue());
    }
	
	public List<ComposedArea> getComposedAreas(){
		List<ComposedArea> areas = new ArrayList<ComposedArea>();
		
		String query = "select a.id, a.code, a.name, a.isActive as composed from area a where a.isActive=1";

		List results = em.createNativeQuery(query).getResultList();
		
		for (Iterator iter = results.iterator(); iter.hasNext();) {
			Object[] objects = (Object[]) iter.next();
			ComposedArea composedArea = new ComposedArea();
			composedArea.setId((Integer) objects[0]);
			composedArea.setCode(objects[1].toString());
			composedArea.setName(objects[2].toString());
			composedArea.setIsActive((Byte) objects[3]);
			
			areas.add(composedArea);
		}
		
		return areas;
	}
	
	public Area getPseudoArea(){
		List<Area> areas = new ArrayList<Area>();
		
		String query = "select a.id, a.code from area a where a.code = 0";

		List results = em.createNativeQuery(query).getResultList();
		
		for (Iterator iter = results.iterator(); iter.hasNext();) {
			Object[] objects = (Object[]) iter.next();
			Area summary = new Area();
			summary.setId((Integer) objects[0]);
			summary.setCode((Integer) objects[1]);
			areas.add(summary);
		}
		
		if (areas.size() > 0){
			return areas.get(0);
		}
		
		return null;
	}



}
