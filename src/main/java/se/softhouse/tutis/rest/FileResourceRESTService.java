package se.softhouse.tutis.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.TimeZone;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.Produces;

import se.softhouse.tutis.data.InspectionRepository;
import se.softhouse.tutis.model.Inspection;



@Path("/files")
@RequestScoped
public class FileResourceRESTService {
	
	@Inject
    private InspectionRepository repository;
	
	@GET
	@Path("/download")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getFile(@Context UriInfo info) throws Exception {		
		FileOutputStream fop = null;
		File file;
		String content = "";
		ResponseBuilder response = null;
		
		String strFrom = info.getQueryParameters().getFirst("from");
		String strEnd = info.getQueryParameters().getFirst("to");
		
		Date start = null;
		Date end = null;
		
		if (strFrom != null || strEnd != null){
			SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
			start = formatter.parse(strFrom);
			end =  formatter.parse(strEnd);
		}
 
		try {
			Date d = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			String strDate = sdf.format(d);
			strDate = strDate.replace(":", ".");
			String filename = "summary_" + strDate + ".txt";// + new Date().toString(); 
			file = new File(filename);
			fop = new FileOutputStream(file);
 
			// if file doesnt exists, then create it
			if (!file.exists()) {
				file.createNewFile();
			}
 
			//get the summaries
			List<Inspection> inspections = new ArrayList<Inspection>();
			if (start != null && end != null){
				inspections = repository.findAllByDate(start, end);
			}else{
				inspections = repository.findAll();
			}
			
			for (Inspection inspection : inspections){
				content = getFormattedContent(inspection);
				byte[] contentInBytes = content.getBytes();
				fop.write(contentInBytes);
				fop.flush();
			}
			
			fop.close();
			
			  response = Response.ok((Object) file);
			    response.header("Content-Disposition",
			        "attachment; filename=" + filename);
 
			return response.build();
 
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (fop != null) {
					fop.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}        
		  
		return response.build();
	}

	@GET
	@Path("/downloadtimezone")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getFileWithTimezone(@Context UriInfo info) throws Exception {		
		FileOutputStream fop = null;
		File file;
		String content = "";
		ResponseBuilder response = null;
		
		String strFrom = info.getQueryParameters().getFirst("from");
		String strEnd = info.getQueryParameters().getFirst("to");
		
		Date start = null;
		Date end = null;
		
		if (strFrom != null || strEnd != null){
			SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
			start = formatter.parse(strFrom);
			end =  formatter.parse(strEnd);
		}
 
		try {
			Date d = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			String strDate = sdf.format(d);
			strDate = strDate.replace(":", ".");
			String filename = "summary_" + strDate + ".txt";// + new Date().toString(); 
			file = new File(filename);
			fop = new FileOutputStream(file);
 
			// if file doesnt exists, then create it
			if (!file.exists()) {
				file.createNewFile();
			}
 
			//get the summaries
			List<Inspection> inspections = new ArrayList<Inspection>();
			if (start != null && end != null){
				inspections = repository.findAllByDate(start, end);
			}else{
				inspections = repository.findAll();
			}
			
			for (Inspection inspection : inspections){
				content = getFormattedContentWithTimezone(inspection);
				byte[] contentInBytes = content.getBytes();
				fop.write(contentInBytes);
				fop.flush();
			}
			
			fop.close();
			
			  response = Response.ok((Object) file);
			    response.header("Content-Disposition",
			        "attachment; filename=" + filename);
 
			return response.build();
 
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (fop != null) {
					fop.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}        
		  
		return response.build();
	}

	private String getFormattedContent(Inspection inspection){
		int activityCode = inspection.getActivityType().getCode();
		String content = "";
		content += inspection.getCompanyCode();
		content = writeSeparator(content);
		content += getFormattedDate(inspection.getInspectionDate());
		content = writeSeparator(content);
		content += inspection.getGuard().getUsercode();
		content = writeSeparator(content);
		if (activityCode == 0){
			content += inspection.getArea().getCode();
		}
		content = writeSeparator(content);
		content += getFormattedTime(inspection.getStartTime());
		content = writeSeparator(content);
		content += getFormattedTime(inspection.getEndTime());
		content = writeSeparator(content);
		if (activityCode == 0){
			content += inspection.getFined();
		}
		content = writeSeparator(content);
		content += inspection.getActivityType().getCode();
		content += "\r\n";
		
		return content;
	}
	
	private String getFormattedContentWithTimezone(Inspection inspection){
		int activityCode = inspection.getActivityType().getCode();
		String content = "";
		content += inspection.getCompanyCode();
		content = writeSeparator(content);
		content += getFormattedDate(inspection.getInspectionDate());
		content = writeSeparator(content);
		content += inspection.getGuard().getUsercode();
		content = writeSeparator(content);
		if (activityCode == 0){
			content += inspection.getArea().getCode();
		}
		content = writeSeparator(content);
		content += getFormattedTimeWithTimezone(inspection.getStartTime());
		content = writeSeparator(content);
		content += getFormattedTimeWithTimezone(inspection.getEndTime());
		content = writeSeparator(content);
		if (activityCode == 0){
			content += inspection.getFined();
		}
		content = writeSeparator(content);
		content += inspection.getActivityType().getCode();
		content += "\r\n";
		
		return content;
	}
	
	private String writeSeparator(String content){
		return content += ";";
	}
	
	private String getFormattedDate(Date date){
		String result="";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		result = sdf.format(date);
		return result;
	}
	
	private String getFormattedTime(Date date){
		/*Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.HOUR, 5);
		date = cal.getTime();
		String result = "";
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
		result = sdf.format(date);
		return result;
		*/
		
		String result = "";
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.get
		TimeZone tzLocal = TimeZone.getTimeZone("Europe/Copenhagen");
		cal.setTimeZone(tzLocal);
		date = cal.getTime();
		result += getFormattedTimeStamp(cal);	
		return result;
		
	}
	
	private String getFormattedTimeWithTimezone(Date date){
		String result = "";
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		TimeZone tzLocal = TimeZone.getTimeZone("Europe/Copenhagen");
		cal.setTimeZone(tzLocal);
		date = cal.getTime();
		result += getFormattedTimeStamp(cal);	
		return result;
	}
	
	private String getFormattedTimeStamp(Calendar calendar){
		String result = getFormattedNumber(calendar.get(Calendar.HOUR_OF_DAY)) + ":" + getFormattedNumber(calendar.get(Calendar.MINUTE));
		return result;
		
	}
	
	private String getFormattedNumber(int number){
		String result = "";
		if (number < 10){
			result += "0" + number;
		}else{
			result += number;
		}
		
		return result;
	}

}
