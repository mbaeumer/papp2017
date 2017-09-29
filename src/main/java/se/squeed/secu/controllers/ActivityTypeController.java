package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import se.squeed.secu.models.ActivityType;
import se.squeed.secu.repositories.ActivityTypeRepository;

import java.util.List;

/**
 * Created by martinbaumer on 29/09/17.
 */
@RestController
@RequestMapping("/activitytypes")
public class ActivityTypeController {
    private ActivityTypeRepository activityTypeRepository;

    @Autowired
    public ActivityTypeController(ActivityTypeRepository activityTypeRepository){
        this.activityTypeRepository = activityTypeRepository;
    }

    @RequestMapping(method= RequestMethod.GET)
    public List<ActivityType> getActivityTypes() {
        List<ActivityType> activityTypes = activityTypeRepository.findAll();
        return activityTypes;
    }
}
