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
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import se.softhouse.tutis.data.AreaRepository;
import se.softhouse.tutis.data.UserTypeRepository;
import se.softhouse.tutis.model.Area;
import se.softhouse.tutis.model.User;
import se.softhouse.tutis.model.UserType;
import se.softhouse.tutis.service.AreaRegistration;
import se.softhouse.tutis.service.UserTypeRegistration;

@Path("/usertypes")
@RequestScoped
public class UserTypeResourceRESTService {
	@Inject
    private Logger log;

    @Inject
    private Validator validator;

    @Inject
    private UserTypeRepository repository;

    @Inject
    UserTypeRegistration registration;

    
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserType> listAllIUserTypes() {
        List<UserType> types = repository.findAll(); 
		return types;
    }
	
	@GET
    @Path("/{typeId:[0-9][0-9]*}")
    @Produces(MediaType.APPLICATION_JSON)
    public UserType findUserTypeById(@PathParam("typeId") long id) {
        UserType user = null;
        try{
        	user = repository.findById(id);
        }catch (NoResultException e){
        	
        }        
        return user;
    }
	
	@POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUserType(UserType area) {

        Response.ResponseBuilder builder = null;

        try {
            // Validates topic using bean validation
            //validateTopic(inspection);

            registration.register(area);

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

        return builder.build();
    }


}
