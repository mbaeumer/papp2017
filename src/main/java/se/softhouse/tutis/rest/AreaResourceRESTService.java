package se.softhouse.tutis.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.NoResultException;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;
import javax.validation.Validator;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import se.softhouse.tutis.data.AreaRepository;
import se.softhouse.tutis.model.Area;
import se.softhouse.tutis.model.ComposedArea;
import se.softhouse.tutis.service.AreaRegistration;

@Path("/areas")
@RequestScoped
public class AreaResourceRESTService {
	@Inject
    private Logger log;

    @Inject
    private Validator validator;

    @Inject
    private AreaRepository repository;

    @Inject
    AreaRegistration registration;

    
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Area> listAllInspections() {
        return repository.findAll();
    }
	
	@GET
    @Path("/{areaId:[0-9][0-9]*}")
    @Produces(MediaType.APPLICATION_JSON)
    public Area findAreaById(@PathParam("areaId") long id) {
        Area area = null;
        try{
        	area = repository.findById(id);
        }catch (NoResultException e){
        	
        }        
        return area;
    }
	
	@GET
    @Path("/composed")
    @Produces(MediaType.APPLICATION_JSON)
    public List<ComposedArea> findComposedAreas() {
        List<ComposedArea> areas = null;
        try{
        	areas = repository.getComposedAreas();
        }catch (NoResultException e){
        	
        }        
        return areas;
    }
	
	@GET
    @Path("/pseudo")
    @Produces(MediaType.APPLICATION_JSON)
    public Area findPseudoArea() {
        Area areas = null;
        try{
        	areas = repository.getPseudoArea();
        }catch (NoResultException e){
        	
        }        
        return areas;
    }
	
	
	
	@POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Area createArea(Area area) {

        Response.ResponseBuilder builder = null;
        Area newArea = null;

        try {
            registration.register(area);

            // Create an "ok" response
            builder = Response.ok();
            newArea = area;
        } catch (ConstraintViolationException ce) {
            // Handle bean validation issues
        } catch (ValidationException e) {
            // Handle the unique constrain violation
            Map<String, String> responseObj = new HashMap<String, String>();
            responseObj.put("email", "Email taken");
            builder = Response.status(Response.Status.CONFLICT).entity(responseObj);
        }catch (Exception e) {
        }

        return newArea;
    }
	
	@PUT	
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Area updateArea(Area area) {

        Response.ResponseBuilder builder = null;
        Area updateArea = null;
        try {
            registration.update(area);

            // Create an "ok" response
            updateArea = area;
            builder = Response.ok();
        } catch (ConstraintViolationException ce) {
            // Handle bean validation issues
            //builder = createViolationResponse(ce.getConstraintViolations());
        } catch (ValidationException e) {
            // Handle the unique constrain violation
            Map<String, String> responseObj = new HashMap<String, String>();
            responseObj.put("email", "Email taken");
            builder = Response.status(Response.Status.CONFLICT).entity(responseObj);
        } catch (Exception e) {
            // Handle generic exceptions
            Map<String, String> responseObj = new HashMap<String, String>();
            responseObj.put("error", e.getMessage());
            builder = Response.status(Response.Status.BAD_REQUEST).entity(responseObj);
        }

        return updateArea;
    }



}
