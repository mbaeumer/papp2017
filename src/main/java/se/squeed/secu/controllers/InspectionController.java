package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import se.squeed.secu.models.Credentials;
import se.squeed.secu.models.Inspection;
import se.squeed.secu.models.RequestData;
import se.squeed.secu.models.User;
import se.squeed.secu.repositories.InspectionRepository;

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
}
