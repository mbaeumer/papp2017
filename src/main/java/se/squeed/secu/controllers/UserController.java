package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import se.squeed.secu.models.Credentials;
import se.squeed.secu.models.User;
import se.squeed.secu.repositories.UserRepository;

import java.util.List;

/**
 * Created by martinbaumer on 27/07/16.
 */
@RestController
@RequestMapping("/users")
public class UserController {
    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @RequestMapping(method= RequestMethod.GET)
    public List<User> getUsers(Model model) {
        List<User> users = userRepository.findAll();
        if (users != null){
            System.out.println("...in UserController - found some users");
            System.out.println("Number of users: " + users.size());

            model.addAttribute("entries", users);
        }
        return users;
    }

    @RequestMapping(value="login", method=RequestMethod.POST)
    public User authenticate(@RequestBody Credentials credentials){
        User user = null;
        System.out.println("user code" + credentials.getUsercode());
        System.out.println("user pwd" + credentials.getPassword());

        user = userRepository.findByUserCodeAndPassword(credentials.getUsercode(), credentials.getPassword());
        if (user != null){
            System.out.println("user found");
        }else{
            System.out.println("no user found");
        }
        return user;
    }
}
