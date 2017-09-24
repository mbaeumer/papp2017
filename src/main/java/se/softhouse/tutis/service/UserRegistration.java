package se.softhouse.tutis.service;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import se.softhouse.tutis.model.Inspection;
import se.softhouse.tutis.model.User;

@Stateless
public class UserRegistration {
	@Inject
    private Logger log;

    @Inject
    private EntityManager em;

    @Inject
    private Event<User> userEventSrc;

    public void register(User user) throws Exception {
    	user.setPassword("4220");
        em.persist(user);
        userEventSrc.fire(user);
    }
    
    public void update(User user) throws Exception {
        em.merge(user);
        userEventSrc.fire(user);
    }

}
