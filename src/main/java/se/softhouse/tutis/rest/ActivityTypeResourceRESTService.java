package se.softhouse.tutis.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.NoResultException;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import se.softhouse.tutis.data.ActivityTypeRepository;
import se.softhouse.tutis.model.ActivityType;
import se.softhouse.tutis.service.ActivityTypeRegistration;

@Path("/activitytypes")
@RequestScoped
public class ActivityTypeResourceRESTService {
    @Inject
    private ActivityTypeRepository repository;

    @Inject
    ActivityTypeRegistration registration;

    
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ActivityType> listAllCategoryTypes() {
        List<ActivityType> types = repository.findAll(); 
		return types;
    }
	
	@GET
    @Path("/{typeId:[0-9][0-9]*}")
    @Produces(MediaType.APPLICATION_JSON)
    public ActivityType findActivityTypeById(@PathParam("typeId") long id) {
		ActivityType activityType = null;
        try{
        	activityType = repository.findById(id);
        }catch (NoResultException e){
        	
        }        
        return activityType;
    }
	
	@POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> createActivity(ActivityType activityType) {

        Response.ResponseBuilder builder = null;
        List<String> errorList = new ArrayList<String>();

        try {
        	errorList = validateActivityType(activityType);
        	
        	if (errorList.size() == 0){
        		registration.register(activityType);	
        	}

            // Create an "ok" response
            builder = Response.ok();
        } catch (ConstraintViolationException ce) {
            // Handle bean validation issues
        } catch (ValidationException e) {
            // Handle the unique constrain violation
            Map<String, String> responseObj = new HashMap<String, String>();
            responseObj.put("email", "Email taken");
            builder = Response.status(Response.Status.CONFLICT).entity(responseObj);
        }catch (Exception e) {
            // Handle generic exceptions
            //Map<String, String> responseObj = new HashMap<String, String>();
            //responseObj.put("error", e.getMessage());
            //builder = Response.status(Response.Status.BAD_REQUEST).entity(responseObj);
        }

        return errorList;
    }
	
	@PUT	
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> updateActivity(ActivityType activityType) {

        Response.ResponseBuilder builder = null;
        List<String> errorList = new ArrayList<String>();
        
        try {
        	errorList = validateActivityType(activityType);
        	
        	if (errorList.size() == 0){
        		registration.update(activityType);	
        	}
            

            // Create an "ok" response
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

        return errorList;
    }

	private List<String> validateActivityType(ActivityType category){
		List<String> errorList = new ArrayList<String>();
		
		if (category.getCode() < 0){
			errorList.add("Fel kod");
		}
		
		if (activityExists(category)){
			errorList.add("Kod eller beskrivning ej unik");
		}
		
		return errorList;
		
	}
	private boolean activityExists(ActivityType cat){
		ActivityType category = null;//new Category();
		try{
			category = repository.findDuplicate(cat.getId(), cat.getCode(), cat.getDescription());
		}catch (NoResultException e){
			
		}
		return category != null;
	}
}
