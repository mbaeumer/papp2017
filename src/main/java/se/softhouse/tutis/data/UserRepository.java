package se.softhouse.tutis.data;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import se.softhouse.tutis.model.User;
import se.softhouse.tutis.model.UserType;

@ApplicationScoped
public class UserRepository {
	@Inject
    private EntityManager em;
	
	/*
	 * @SuppressWarnings("rawtypes")
	public List<User> findUsersInterestedInTopicByTopicId(Long topicId) {
    	
    	
    	String query = "select ut.id usertopic_id, ut.topicId, ut.userId usertopic_userId, u.id userId, u.name username, t.name " +
    			"from usertopic ut left join user u on ut.userId=u.id " + 
    			"left join topic t on t.id=ut.topicId where ut.topicId=?";

    	List results = em.createNativeQuery(query).setParameter(1, topicId).getResultList();
    	List<User> users = new ArrayList<User>();
    	for (Iterator iter = results.iterator(); iter.hasNext();) {
    	     Object[] objects = (Object[]) iter.next();
    	     Long id = ((BigInteger) objects[3]).longValue();
    	     String name = (String) objects[4];
    	     User u = new User();
    	     u.setId(id);
    	     u.setName(name);
    	     users.add(u);
    	  }
    	return users;

    }

	 */

	public List<User> findAll() {
		List results = null;
		String query = "select u.id as userId, u.name as username, ut.id as userTypeId, u.usercode, ut.name as userType " 
				+ "from user u left join usertype ut on u.userTypeID = ut.id";

		results = em.createNativeQuery(query).getResultList();
		
		List<User> users = new ArrayList<User>();
		for (Iterator iter = results.iterator(); iter.hasNext();) {
			Object[] objects = (Object[]) iter.next();
			
			User user = new User();
			user.setId((Integer) objects[0]);
			user.setName(objects[1].toString());
			user.setUsercode((Integer) objects[3]);
			UserType ut = new UserType();
			ut.setId((Integer) objects[2]);
			ut.setName(objects[4].toString());
			user.setUserType(ut);
			users.add(user);
		}

		return users;
    }
	
	public User findUserByCredentials(String username, String password) throws NoResultException {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> criteria = cb.createQuery(User.class);
        Root<User> user = criteria.from(User.class);      
        int code = 0;
        try{
        	code = Integer.parseInt(username);
        }catch (NumberFormatException e){
        	
        }        
        
        criteria.select(user).where(cb.and(cb.equal(user.get("usercode"), code),cb.equal(user.get("password"), password)));
        
        return em.createQuery(criteria).getSingleResult();
    }
	
	public User findById(Long id) {
        return em.find(User.class, ((Long)id).intValue());
    }


}
