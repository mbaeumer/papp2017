package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.squeed.secu.models.*;
import se.squeed.secu.repositories.InspectionRepository;
import se.squeed.secu.util.ValidationResult;
import se.squeed.secu.util.ValidationUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by martinbaumer on 27/09/17.
 */
@RestController
@RequestMapping("/inspections")
public class InspectionController {

    private InspectionRepository inspectionRepository;

    @Autowired
    public InspectionController(InspectionRepository inspectionRepository){
        this.inspectionRepository = inspectionRepository;
    }

    @RequestMapping(method=RequestMethod.GET)
    public List<Inspection> getAll(){
        return inspectionRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST)
    public StatusMessage create(@RequestBody Inspection inspection){
        StatusMessage statusMessage = null;
        String message = "";
        String status = "";
        String area = (inspection.getArea() == null) ? "Area null" : "Area ok";
        String cat = (inspection.getCategory() == null) ? "Cat null" : "Cat ok";
        String user = (inspection.getUser() == null) ? "User null" : "User ok";
        String activity = (inspection.getActivityType() == null) ? "Activity null" : "Activity ok";
        ValidationResult validationResult = ValidationUtils.validate(inspection);
        status += area + cat +  user + activity;
        System.out.println(status);
        if (validationResult == ValidationResult.OK) {
            Inspection result = inspectionRepository.save(inspection);
            if (result == null) {
                message = "An unknown error occurred!";
            }
        }else{
            message = ValidationUtils.getMessage(validationResult);
        }
        if (message.length() > 0){
            statusMessage = new StatusMessage();
            statusMessage.setText(message);
        }
        return statusMessage;
    }

    @RequestMapping(method=RequestMethod.PUT)
    public  StatusMessage update(@RequestBody Inspection inspection){
        StatusMessage statusMessage = null;
        String message = "";
        String status = "";
        String area = (inspection.getArea() == null) ? "Area null" : "Area ok";
        String cat = (inspection.getCategory() == null) ? "Cat null" : "Cat ok";
        String user = (inspection.getUser() == null) ? "User null" : "User ok";
        String activity = (inspection.getActivityType() == null) ? "Activity null" : "Activity ok";
        status += area + cat +  user + activity;
        System.out.println(status);
        ValidationResult validationResult = ValidationUtils.validate(inspection);
        if (validationResult == ValidationResult.OK) {
            Inspection result = inspectionRepository.save(inspection);
            if (result == null) {
                message = "An unknown error occurred!";
            }
        }else{
            message = ValidationUtils.getMessage(validationResult);

        }
        if (message.length() > 0){
            statusMessage = new StatusMessage();
            statusMessage.setText(message);
        }
        return statusMessage;

    }

    @RequestMapping(value="my", method=RequestMethod.POST)
    public List<Inspection> getMy(@RequestBody RequestData requestData){
        List<Inspection> inspections = null;
        User user = new User();
        user.setId(requestData.getUserid());
        inspections = inspectionRepository.findInspectionsByUserAndInspectionDateOrderByEndTimeDesc(user, requestData.getDate());
        System.out.println("getting my inspections for: " + requestData.getUserid());
        System.out.println("getting my inspections for date: " + requestData.getDate());
        System.out.println("no of inspections: " + inspections.size());
        return inspections;
    }

    @RequestMapping(value="latest", method= RequestMethod.POST)
    public Inspection findLatest(@RequestBody RequestData requestData)  {
        Inspection latestInspection = null;
        User user = new User();
        user.setId(requestData.getUserid());
        List<Inspection> inspections = inspectionRepository.findInspectionsByUserAndInspectionDateOrderByEndTimeDesc(user, requestData.getDate());
        if (inspections.size() > 0){
            latestInspection = inspections.get(0);
            System.out.println("getting latest inspections for: " + requestData.getUserid());
        }
        return latestInspection;
    }

    @RequestMapping(value="/get/{id}", method= RequestMethod.GET)
    public Inspection getSingleInspection(@PathVariable int id){
        Inspection inspection = inspectionRepository.findById(id);
        if (inspection != null){
            System.out.println("...in getSingleGlucoseMeasurementByUser");
        }
        return inspection;
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){
        Inspection inspection = new Inspection();
        inspection.setId(id);
        inspectionRepository.delete(inspection);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /*
    @RequestMapping(value="summary", method= RequestMethod.POST)
    public MetaSummary getSummaryBetweenDates(@RequestBody SummaryParam summaryParam)  {
        MetaSummary metaSummary = new MetaSummary();
        long totalDuration = 0;
        int totalFined = 0;
        List<Inspection> inspections = inspectionRepository.findAllByInspectionDateBetweenOrderByUserAscInspectionDateDescStartTimeAsc(summaryParam.getFromDate(), summaryParam.getToDate());
        List<Summary> summaries = new ArrayList<>();
        for (Inspection inspection : inspections){
            Summary summary = new Summary();
            summary.setInspection(inspection);
            totalDuration += summary.getDuration();
            totalFined += summary.getFined();
            summaries.add(summary);
        }
        metaSummary.setSummaries(summaries);
        metaSummary.setTotalFined(totalFined);
        metaSummary.setTotalTimInMinutes(totalDuration / 60);
        metaSummary.setTotalDecimalTime();
        metaSummary.setTotalTimeValue();
        metaSummary.setAverage(metaSummary.getTotalFined() / metaSummary.getTotalDecimalTime());
        return metaSummary;
    }
    */

    @RequestMapping(value="summary", method= RequestMethod.GET)
    public MetaSummary getSummaryBetweenDates(@RequestParam String from, @RequestParam String to)  {
        MetaSummary metaSummary = new MetaSummary();

        SimpleDateFormat formatter = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss z");
        Date fromDate = null;
        Date toDate = null;

        try {
            fromDate = formatter.parse(from);
            toDate = formatter.parse(to);

        } catch (ParseException e) {
            e.printStackTrace();
        }

        long totalDuration = 0;
        int totalFined = 0;
        List<Inspection> inspections = inspectionRepository.findAllByInspectionDateBetweenOrderByUserAscInspectionDateDescStartTimeAsc(fromDate, toDate);
        List<Summary> summaries = new ArrayList<>();
        for (Inspection inspection : inspections){
            Summary summary = new Summary();
            summary.setInspection(inspection);
            totalDuration += summary.getDuration();
            totalFined += summary.getFined();
            summaries.add(summary);
        }
        metaSummary.setSummaries(summaries);
        metaSummary.setTotalFined(totalFined);
        metaSummary.setTotalTimInMinutes(totalDuration / 60);
        metaSummary.setTotalDecimalTime();
        metaSummary.setTotalTimeValue();
        metaSummary.setAverage(metaSummary.getTotalFined() / metaSummary.getTotalDecimalTime());
        return metaSummary;
    }
}
