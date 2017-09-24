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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import se.softhouse.tutis.data.InspectionRepository;
import se.softhouse.tutis.data.UserRepository;
import se.softhouse.tutis.model.Inspection;
import se.softhouse.tutis.model.User;
import se.softhouse.tutis.service.InspectionRegistration;
import se.softhouse.tutis.service.UserRegistration;

@Path("/users")
@RequestScoped
public class UserResourceRESTService {
	@Inject
    private Logger log;

    @Inject
    private Validator validator;

    @Inject
    private UserRepository repository;

    @Inject
    UserRegistration registration;

    
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> listAllUsers() {
        return repository.findAll();
    }
	
	@GET
    @Path("/{userId:[0-9][0-9]*}")
    @Produces(MediaType.APPLICATION_JSON)
    public User findUserByUserId(@PathParam("userId") long id) {
        User user = null;
        try{
        	user = repository.findById(id);
        }catch (NoResultException e){
        	
        }        
        return user;
    }
    
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login")
	public User findUserByCredentials(@Context UriInfo info) {
 
		Response.ResponseBuilder builder = null;
		
		String username = info.getQueryParameters().getFirst("username");
		String password = info.getQueryParameters().getFirst("password");
		
		User u = null;
		try{
			u = repository.findUserByCredentials(username, password);
			builder = Response.ok();
		}catch(NoResultException e){
			//Map<String, String> responseObj = new HashMap<String, String>();
            //responseObj.put("email", "Email taken");
            //builder = Response.status(Response.Status.CONFLICT).entity(responseObj);
		}
		return u;//builder.build();
		
	}
	
	@POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User createUser(User user) {

        Response.ResponseBuilder builder = null;
        User newUser = null;
        try {
            registration.register(user);
            newUser = user;
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

        return newUser;
    }
	
	@PUT	
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User updateUser(User user) {

        Response.ResponseBuilder builder = null;
        
        User updateUser = null;
        try {
            registration.update(user);

            // Create an "ok" response
            updateUser = user;
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

        return updateUser;
    }




}
