package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import se.squeed.secu.models.Area;
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

    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    public User getSingleUser(@PathVariable int id) {
        return userRepository.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public User create(@RequestBody User user) {
        User result = null;
        try {
            user.setPassword("4220");
            result = userRepository.save(user);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public User update(@RequestBody User user) {
        User result = null;
        try {
            result = userRepository.save(user);
        } catch (Exception ex) {

        }
        return result;
    }


    @RequestMapping(value="login", method=RequestMethod.POST)
    public User authenticate(@RequestBody Credentials credentials){
        User user = null;
        System.out.println("user code" + credentials.getUsercode());
        System.out.println("user pwd" + credentials.getPassword());

        user = userRepository.findByCodeAndPassword(credentials.getUsercode(), credentials.getPassword());
        if (user != null){
            System.out.println("user found");
        }else{
            System.out.println("no user found");
        }
        return user;
    }
}
