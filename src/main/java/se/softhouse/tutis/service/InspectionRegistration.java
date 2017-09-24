package se.softhouse.tutis.service;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import java.util.Calendar;
import java.util.TimeZone;
import javax.persistence.EntityManager;

import se.softhouse.tutis.model.Inspection;

@Stateless
public class InspectionRegistration {
	@Inject
    private Logger log;

    @Inject
    private EntityManager em;

    @Inject
    private Event<Inspection> inspectionEventSrc;

    public void register(Inspection inspection) throws Exception {
        Calendar c = Calendar.getInstance();
		c.setTime(inspection.getInspectionDate());
		c.set(Calendar.HOUR_OF_DAY, 7);
		inspection.setInspectionDate(c.getTime());
		//inspection.setInspectionDate(c.getTime());
		em.persist(inspection);
        inspectionEventSrc.fire(inspection);
    }
    
    public void update(Inspection inspection) throws Exception {
    	Calendar c = Calendar.getInstance();
		c.setTime(inspection.getInspectionDate());
		c.set(Calendar.HOUR_OF_DAY, 7);
		inspection.setInspectionDate(c.getTime());
        em.merge(inspection);
        inspectionEventSrc.fire(inspection);
    }
    
    public void delete(int id) throws Exception {
    	Inspection usertopic = em.find(Inspection.class, id);
        em.remove(usertopic);
        inspectionEventSrc.fire(usertopic);
    }

}
