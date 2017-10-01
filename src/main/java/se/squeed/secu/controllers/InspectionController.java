package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.squeed.secu.models.*;
import se.squeed.secu.repositories.InspectionRepository;

import java.util.ArrayList;
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
    public Inspection create(@RequestBody Inspection inspection){
        String status = "";
        String area = (inspection.getArea() == null) ? "Area null" : "Area ok";
        String cat = (inspection.getCategory() == null) ? "Cat null" : "Cat ok";
        String user = (inspection.getUser() == null) ? "User null" : "User ok";
        String activity = (inspection.getActivityType() == null) ? "Activity null" : "Activity ok";
        status += area + cat +  user + activity;
        System.out.println(status);
        return inspectionRepository.save(inspection);
    }

    @RequestMapping(method=RequestMethod.PUT)
    public  Inspection update(@RequestBody Inspection inspection){
        String status = "";
        String area = (inspection.getArea() == null) ? "Area null" : "Area ok";
        String cat = (inspection.getCategory() == null) ? "Cat null" : "Cat ok";
        String user = (inspection.getUser() == null) ? "User null" : "User ok";
        String activity = (inspection.getActivityType() == null) ? "Activity null" : "Activity ok";
        status += area + cat +  user + activity;
        System.out.println(status);
        inspectionRepository.save(inspection);
        return inspection;
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

    @RequestMapping(value="summary", method= RequestMethod.POST)
    public List<Summary> getSummaryBetweenDates(@RequestBody SummaryParam summaryParam)  {
        List<Inspection> inspections = inspectionRepository.findAllByInspectionDateBetweenOrderByUserAscInspectionDateDescStartTimeAsc(summaryParam.getFromDate(), summaryParam.getToDate());
        List<Summary> summaries = new ArrayList<>();
        for (Inspection inspection : inspections){
            Summary summary = new Summary();
            summary.setInspection(inspection);
            summaries.add(summary);
        }
        return summaries;
    }
}
