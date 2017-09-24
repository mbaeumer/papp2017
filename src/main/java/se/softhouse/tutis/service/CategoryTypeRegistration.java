package se.softhouse.tutis.service;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import se.softhouse.tutis.model.Category;

@Stateless
public class CategoryTypeRegistration {
	@Inject
    private Logger log;

    @Inject
    private EntityManager em;

    @Inject
    private Event<Category> categoryEventSrc;

    public void register(Category category) throws Exception {
        em.persist(category);
        categoryEventSrc.fire(category);
    }
    
    public void update(Category category) throws Exception {
        em.merge(category);
        categoryEventSrc.fire(category);
    }
}
