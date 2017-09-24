package se.softhouse.tutis.service;

import java.util.logging.Logger;

import javax.ejb.EJBException;
import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.validation.ConstraintViolationException;

import se.softhouse.tutis.model.Area;
import se.softhouse.tutis.model.User;

@Stateless
public class AreaRegistration {
	@Inject
    private Logger log;

    @Inject
    private EntityManager em;

    @Inject
    private Event<Area> areaEventSrc;

    public void register(Area area) throws Exception {
        em.persist(area);
        areaEventSrc.fire(area);
    }
    
    public void update(Area area) throws Exception {
        em.merge(area);
        areaEventSrc.fire(area);
    }
}
