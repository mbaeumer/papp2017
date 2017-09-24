package se.softhouse.tutis.data;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import se.softhouse.tutis.model.ActivityType;

@ApplicationScoped
public class ActivityTypeRepository {
	@Inject
    private EntityManager em;
	
	public List<ActivityType> findAll() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<ActivityType> criteria = cb.createQuery(ActivityType.class);
        Root<ActivityType> user = criteria.from(ActivityType.class);
        criteria.select(user).orderBy(cb.asc(user.get("code")));
        return em.createQuery(criteria).getResultList();
    }
	
	public ActivityType findById(Long id) {
        return em.find(ActivityType.class, ((Long)id).intValue());
    }
	
	public ActivityType findDuplicate(int id, int code, String description) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<ActivityType> criteria = cb.createQuery(ActivityType.class);
        Root<ActivityType> category = criteria.from(ActivityType.class);

        if (id <= 0){
            criteria.select(category).where(
            		cb.or(cb.equal(category.get("description"), description), cb.equal(category.get("code"), code)));
       
        }else{
            criteria.select(category).where(
            		cb.and(cb.notEqual(category.get("id"), id), 
            				cb.or(cb.equal(category.get("description"), description), cb.equal(category.get("code"), code))));
       
        }
        return em.createQuery(criteria).getSingleResult();
    }


}
