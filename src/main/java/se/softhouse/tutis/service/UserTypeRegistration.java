package se.softhouse.tutis.service;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import se.softhouse.tutis.model.User;
import se.softhouse.tutis.model.UserType;

@Stateless
public class UserTypeRegistration {
	@Inject
    private Logger log;

    @Inject
    private EntityManager em;

    @Inject
    private Event<UserType> userEventSrc;

    public void register(UserType user) throws Exception {
        em.persist(user);
        userEventSrc.fire(user);
    }

}
