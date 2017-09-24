package se.softhouse.tutis.data;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import se.softhouse.tutis.model.UserType;

@ApplicationScoped
public class UserTypeRepository {
	@Inject
    private EntityManager em;
	
	public List<UserType> findAll() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<UserType> criteria = cb.createQuery(UserType.class);
        Root<UserType> user = criteria.from(UserType.class);
        return em.createQuery(criteria).getResultList();
    }
	
	public UserType findById(Long id) {
        return em.find(UserType.class, ((Long)id).intValue());
    }

}
