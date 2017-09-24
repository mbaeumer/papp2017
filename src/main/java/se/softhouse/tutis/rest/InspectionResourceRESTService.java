package se.softhouse.tutis.rest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.NoResultException;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import se.softhouse.tutis.data.InspectionRepository;
import se.softhouse.tutis.model.Area;
import se.softhouse.tutis.model.Inspection;
import se.softhouse.tutis.model.MetaSummary;
import se.softhouse.tutis.model.Summary;
import se.softhouse.tutis.model.User;
import se.softhouse.tutis.service.InspectionRegistration;
import se.softhouse.tutis.util.TimeDifference;
import se.softhouse.tutis.util.TimeUtils;

@Path("/inspections")
@RequestScoped
public class InspectionResourceRESTService {
	
    @Inject
    private InspectionRepository repository;

    @Inject
    InspectionRegistration registration;

    
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Inspection> listAllInspections() {
        return repository.findAll();
    }
	
	@POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> createInspection(Inspection inspection) {

        Response.ResponseBuilder builder = null;
        List<String> errorList = new ArrayList<String>();

        try {
            // Validates topic using bean validation
            errorList = validateInspection(inspection);

            if (errorList.size() == 0){
            	registration.register(inspection);
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

	@PUT	
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> updateInspection(Inspection inspection) {

        Response.ResponseBuilder builder = null;
        List<String> errorList = new ArrayList<String>();

        try {
            // Validates topic using bean validation
            //validateTopic(inspection);
        	errorList = validateInspection(inspection);

        	if (errorList.size() == 0){
        		registration.update(inspection);
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

        return errorList;//builder.build();
    }

	@GET
    @Path("/{inspectionId:[0-9][0-9]*}")
    @Produces(MediaType.APPLICATION_JSON)
    public Inspection findInspectionByInspectionId(@PathParam("inspectionId") long id) {
        Inspection inspection = null;
        try{
        	inspection = repository.findById(id);
        }catch (NoResultException e){
        	
        }        
        return inspection;
    }
	
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/my")
	public List<Inspection> findInspectionsByUser(@Context UriInfo info) {
 
		Response.ResponseBuilder builder = null;
		
		String strUserId = info.getQueryParameters().getFirst("userId");
		String strFrom = info.getQueryParameters().getFirst("date");
		
		int userId= Integer.parseInt(strUserId);
		List<Inspection> inspections = new ArrayList<Inspection>();
		try{
			inspections = repository.findByUserId(userId, strFrom);//findUserByCredentials(username, password);
			builder = Response.ok();
		}catch(NoResultException e){
			//Map<String, String> responseObj = new HashMap<String, String>();
            //responseObj.put("email", "Email taken");
            //builder = Response.status(Response.Status.CONFLICT).entity(responseObj);
		}
		return inspections;//builder.build();
		
	}

	@GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/myTest")
	public List<Inspection> findInspectionsByUserTest(@Context UriInfo info) {
 
		Response.ResponseBuilder builder = null;
		
		String strUserId = info.getQueryParameters().getFirst("userId");
		String strFrom = info.getQueryParameters().getFirst("date");
		
		int userId= Integer.parseInt(strUserId);
		List<Inspection> inspections = new ArrayList<Inspection>();
		try{
			inspections = repository.findByUserIdTest(userId, strFrom);//findUserByCredentials(username, password);
			builder = Response.ok();
		}catch(NoResultException e){
			//Map<String, String> responseObj = new HashMap<String, String>();
            //responseObj.put("email", "Email taken");
            //builder = Response.status(Response.Status.CONFLICT).entity(responseObj);
		}
		return inspections;//builder.build();
		
	}

	@GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/latest")
	public Inspection findLatest(@Context UriInfo info)  {
 
		Response.ResponseBuilder builder = null;
		
		String strUserId = info.getQueryParameters().getFirst("userId");
		String strDate = info.getQueryParameters().getFirst("date");
		
		int userId= Integer.parseInt(strUserId);
		/*SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		Date inspectionDate = null;
		try {
			inspectionDate = formatter.parse(strDate);
		} catch (ParseException e1) {
			return null;
		}*/

		Inspection latestInspection = null;
		try{
			 latestInspection= repository.findLatestByUserIdAndDate(userId, strDate);
			builder = Response.ok();
		}catch(NoResultException e){
		}
		return latestInspection;
	}

	@GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/summary")
	public List<Summary> getSummary() {
 
		Response.ResponseBuilder builder = null;
		
		List<Summary> inspections = new ArrayList<Summary>();
		try{
			inspections = repository.getSummary(null, null);
			builder = Response.ok();
		}catch(NoResultException e){
			//Map<String, String> responseObj = new HashMap<String, String>();
            //responseObj.put("email", "Email taken");
            //builder = Response.status(Response.Status.CONFLICT).entity(responseObj);
		}
		return inspections;//builder.build();
		
	}

	@GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/metasummary")
	public MetaSummary getMetaSummary(@Context UriInfo info) throws Exception {
 
		Response.ResponseBuilder builder = null;
		
		String strFrom = info.getQueryParameters().getFirst("from");
		String strEnd = info.getQueryParameters().getFirst("to");
		
		Date start = null;
		Date end = null;
		
		if (strFrom != null || strEnd != null){
			SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
			start = formatter.parse(strFrom);
			end =  formatter.parse(strEnd);
		}
 
		
		MetaSummary metaSummary = new MetaSummary();
		List<Summary> inspections = new ArrayList<Summary>();
		try{
			inspections = repository.getSummary(start, end);
			metaSummary.setTotalFined(repository.getFinedCount(start, end));
			metaSummary.setTotalTime(getTotalTime(inspections));
			metaSummary.setTotalDecimalTime(getTotalDecimalTime(metaSummary.getTotalTime()));
			metaSummary.setAverage(metaSummary.getTotalFined() / metaSummary.getTotalDecimalTime());
		}catch(NoResultException e){
			//Map<String, String> responseObj = new HashMap<String, String>();
            //responseObj.put("email", "Email taken");
            //builder = Response.status(Response.Status.CONFLICT).entity(responseObj);
		}
		
		return metaSummary;
	}
	
	private TimeDifference getTotalTime(List<Summary> inspections){
		TimeDifference result = null;
		
		int totalMinutes = getTotalTimeInMinutes(inspections);
		int hours = totalMinutes / 60;
		int minutes = totalMinutes % 60;
		
		result = new TimeDifference();
		result.setHours(hours);
		result.setMinutes(minutes);
		return result;
	}
	
	private int getTotalTimeInMinutes(List<Summary> inspections){
		int minutes = 0;
		int hours = 0;
		
		for (Summary s : inspections){
			minutes += s.getDuration().getMinutes();
			hours += s.getDuration().getHours();
		}
		
		minutes += 60*hours;
		return minutes;
	}
	
	private double getTotalDecimalTime(TimeDifference diff){
		double result = diff.getHours();
		double minutes = diff.getMinutes() / 60;
		result += ((Integer)diff.getMinutes()).doubleValue() / 60;
		return result;
	}
	

	@Path("/")
    @DELETE   
    //@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    //@Produces("text/plain")
    public void deleteUserTopic(@QueryParam("id") Integer id) {

    	try {
			registration.delete(id);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@GET
    @Path("/duplicTest")
    @Produces(MediaType.APPLICATION_JSON)
	public Inspection duplicateTest(){
		return null;
	}

	
	private List<String> validateInspection(Inspection inspection){
		List<String> errorList = new ArrayList<String>();
		Calendar endtime = Calendar.getInstance(TimeZone.getTimeZone("CET"));
		endtime.setTime(inspection.getEndTime());
		
		Calendar traveltime = Calendar.getInstance(TimeZone.getTimeZone("CET"));
		traveltime.setTime(inspection.getTravel());
		
		Calendar startTime = Calendar.getInstance(TimeZone.getTimeZone("CET"));
		startTime.setTime(inspection.getStartTime());
		
		if (inspection.getTravel().after(inspection.getStartTime())){
			errorList.add("Restid efter starttid");
		}
		
		if (endtime.get(Calendar.MINUTE)  == 0 && endtime.get(Calendar.HOUR)  == 0 && endtime.get(Calendar.AM_PM)  == Calendar.AM){
			errorList.add("Fel stoptid");
		}
		
		if (startTime.after(endtime)){
			String message = "Starttid efter stoptid \r\n";
			message += "Date: " + getFormattedDateString(inspection.getStartTime()) + "\r\n";
			message += "Start: " + getFormattedDateString(inspection.getStartTime()) + "\r\n";
			message += "End: " + getFormattedDateString(inspection.getEndTime()) + "\r\n";
			message += "Area: " + inspection.getArea().getId() + "\r\n";
			message += "Activity: " + inspection.getActivityType().getId() + "\r\n";
			message += "User: " + inspection.getGuard().getId() + "\r\n";
			
			
			errorList.add(message);
			//getFormattedDateString(inspection.getStartTime())
		}
		
		if (inspection.getObliterated() < 0 || inspection.getFined() < 0 || inspection.getWarnings() < 0 ){
			errorList.add("Fel värde för K/V/M");
		}
		
		Calendar c = Calendar.getInstance();
		c.setTime(inspection.getInspectionDate());
		c.set(Calendar.HOUR_OF_DAY, 7);
		inspection.setInspectionDate(c.getTime());
		
		if (repository.findDuplicate(inspection, getFormattedDateString(inspection.getInspectionDate()), getFormattedDateString(inspection.getStartTime()), getFormattedDateString(inspection.getEndTime()))){
			errorList.add("Det finns redan en liknande rapport! " + inspection.getActivityType().getId() + getFormattedDateString(inspection.getInspectionDate()) + getFormattedDateString(inspection.getStartTime()) + getFormattedDateString(inspection.getEndTime()) );
		}
		
		/*if (repository.findDuplicateTest(inspection, inspection.getGuard().getName(), inspection.getActivityType().getDescription(),
				inspection.getCategory().getDescription())){
			errorList.add("Det finns redan en liknande rapport!");
		}
		*/
		return errorList;
	}
	
	public static String getFormattedDateString(Date date){
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		String test=null;
		return formatter.format(date);
	}
	
	private Inspection getTestInspection(){
		/*Inspection inspection = new Inspection();
		Area area = new Area();
		area.setId(id);
		
		inspection.setArea(new Area());
		return inspection;
		*/
		Inspection inspection = null;
        try{
        	inspection = repository.findById(new Long(20152));
        	User user = new User();
        	user.setId(47);
        	Calendar cal = Calendar.getInstance();
        	cal.setTime(inspection.getInspectionDate());
        	cal.add(Calendar.HOUR_OF_DAY, 1);
        	inspection.setGuard(user);
        	inspection.setInspectionDate(cal.getTime());
        	
        }catch (NoResultException e){
        	
        }        
        return inspection;
		
		
	}
}
