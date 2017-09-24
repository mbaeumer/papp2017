package se.softhouse.tutis.data;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import se.softhouse.tutis.model.Category;

@ApplicationScoped
public class CategoryTypeRepository {
	@Inject
    private EntityManager em;
	
	public List<Category> findAll() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Category> criteria = cb.createQuery(Category.class);
        Root<Category> user = criteria.from(Category.class);
        return em.createQuery(criteria).getResultList();
    }
	
	public Category findById(Long id) {
        return em.find(Category.class, ((Long)id).intValue());
    }
	
	
	public Category findDuplicate(int id, int code, String description) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Category> criteria = cb.createQuery(Category.class);
        Root<Category> category = criteria.from(Category.class);

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
	
    public Category findByDescription(String description) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Category> criteria = cb.createQuery(Category.class);
        Root<Category> category = criteria.from(Category.class);

        criteria.select(category).where(cb.equal(category.get("description"), description));
        return em.createQuery(criteria).getSingleResult();
    }
    
    public Category findByCode(int description) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Category> criteria = cb.createQuery(Category.class);
        Root<Category> category = criteria.from(Category.class);

        criteria.select(category).where(cb.equal(category.get("code"), description));
        return em.createQuery(criteria).getSingleResult();
    }
    
    


}
