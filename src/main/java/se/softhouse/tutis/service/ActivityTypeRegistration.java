package se.softhouse.tutis.service;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import se.softhouse.tutis.model.ActivityType;
import se.softhouse.tutis.model.Category;

@Stateless
public class ActivityTypeRegistration {
	@Inject
    private Logger log;

    @Inject
    private EntityManager em;

    @Inject
    private Event<ActivityType> activityTypeEventSrc;

    public void register(ActivityType activityType) throws Exception {
        em.persist(activityType);
        activityTypeEventSrc.fire(activityType);
    }
    
    public void update(ActivityType activityType) throws Exception {
        em.merge(activityType);
        activityTypeEventSrc.fire(activityType);
    }
}
