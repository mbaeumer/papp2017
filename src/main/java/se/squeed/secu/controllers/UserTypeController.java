package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import se.squeed.secu.models.UserType;
import se.squeed.secu.repositories.UserTypeRepository;

import java.util.List;

/**
 * Created by martinbaumer on 03/10/17.
 */
@RestController
@RequestMapping("/usertypes")
public class UserTypeController {
    private UserTypeRepository userTypeRepository;

    @Autowired
    public UserTypeController(UserTypeRepository userTypeRepository) {
        this.userTypeRepository = userTypeRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<UserType> getAreas() {
        return userTypeRepository.findAll();
    }
}
