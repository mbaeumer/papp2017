package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.squeed.secu.models.Inspection;
import se.squeed.secu.models.RequestData;
import se.squeed.secu.models.User;
import se.squeed.secu.repositories.InspectionRepository;

import javax.persistence.NoResultException;
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

    @RequestMapping(value="my", method=RequestMethod.POST)
    public List<Inspection> getMy(@RequestBody RequestData requestData){
        List<Inspection> inspections = null;
        User user = new User();
        user.setId(requestData.getUserid());
        inspections = inspectionRepository.findInspectionsByUser(user);
        System.out.println("getting my inspections for: " + requestData.getUserid());
        System.out.println("getting my inspections for date: " + requestData.getDate());
        System.out.println("no of inspections: " + inspections.size());
        return inspections;
    }

    @RequestMapping(value="latest", method= RequestMethod.POST)
    public Inspection findLatest(@RequestBody RequestData requestData)  {
        Inspection latestInspection = null;
        try{
            latestInspection = inspectionRepository.findLatestByUserIdAndInspectionDateOrderByEndTime(requestData.getUserid(), requestData.getDate());
            System.out.println("getting latest inspections for: " + requestData.getUserid());
        }catch(NoResultException e){

        }
        return latestInspection;
    }



}
