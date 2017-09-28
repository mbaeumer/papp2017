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

    @RequestMapping(value="my", method= RequestMethod.POST)
    public List<Inspection> getMy(@RequestBody RequestData requestData){
        List<Inspection> inspections = null;
        User user = new User();
        user.setId(requestData.getUserid());
        System.out.println("getting inspections for: " + user.getId());
        inspections = inspectionRepository.findInspectionsByUserAndInspectionDate(user, requestData.getDate());
        return inspections;
    }

    @RequestMapping(value="latest", method= RequestMethod.POST)
    public Inspection findLatest(@RequestBody RequestData requestData)  {
        User user = new User();
        user.setId(requestData.getUserid());
        Date inspectionDate = requestData.getDate();
        Inspection latestInspection = null;

        try{
            latestInspection = inspectionRepository.findLatestByUserAndInspectionDateOrderByEndTime(user, inspectionDate);
        }catch(NoResultException e){

        }
        return latestInspection;
    }



}
