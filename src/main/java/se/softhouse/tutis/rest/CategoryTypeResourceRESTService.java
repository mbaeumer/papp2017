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

import se.softhouse.tutis.data.CategoryTypeRepository;
import se.softhouse.tutis.model.Category;
import se.softhouse.tutis.service.CategoryTypeRegistration;


@Path("/categories")
@RequestScoped
public class CategoryTypeResourceRESTService {
    @Inject
    private CategoryTypeRepository repository;

    @Inject
    private CategoryTypeRegistration registration;

    
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Category> listAllCategoryTypes() {
        List<Category> types = repository.findAll(); 
		return types;
    }
	
	@GET
    @Path("/{typeId:[0-9][0-9]*}")
    @Produces(MediaType.APPLICATION_JSON)
    public Category findCategoryTypeById(@PathParam("typeId") long id) {
		Category category = null;
        try{
        	category = repository.findById(id);
        }catch (NoResultException e){
        	
        }        
        return category;
    }	
	
	@POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> createCategory(Category category) {

        Response.ResponseBuilder builder = null;
        Category newCategory = null;
        List<String> errorList = new ArrayList<String>();

        try {
        	// validate the entry
        	errorList = validateCategoryType(category);
        	
        	if (errorList.size() == 0){
        		registration.register(category);
        	}
        	
            // Create an "ok" response
            builder = Response.ok();
            newCategory = category;
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
    public List<String> updateCategory(Category category) {

        Response.ResponseBuilder builder = null;
        Category updateCategory = null;
        List<String> errorList = new ArrayList<String>();
        
        try {
        	
        	// validate
        	errorList = validateCategoryType(category);
        	
        	if (errorList.size() == 0){
        		registration.update(category);
        	}
            // Create an "ok" response
            updateCategory = category;
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

	private List<String> validateCategoryType(Category category){
		List<String> errorList = new ArrayList<String>();
		
		if (category.getCode() < 0){
			errorList.add("Fel kod");
		}
		
		if (categoryExists(category)){
			errorList.add("Kod eller beskrivning ej unik");
		}
		
		return errorList;
		
	}
	
	private boolean categoryExists(Category cat){
		se.softhouse.tutis.model.Category category = null;//new Category();
		try{
			category = repository.findDuplicate(cat.getId(), cat.getCode(), cat.getDescription());
		}catch (NoResultException e){
			
		}
		return category != null;
	}
	
	private boolean descriptionExists(String description){
		se.softhouse.tutis.model.Category category = null;//new Category();
		try{
			category = repository.findByDescription(description);
		}catch (NoResultException e){
			
		}
		return category != null;
	}
	
	private boolean codeExists(int code){
		se.softhouse.tutis.model.Category category = null;//new Category();
		try{
			category = repository.findByCode(code);
		}catch (NoResultException e){
			
		}
		return category != null;
	}
}
