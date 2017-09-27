package se.squeed.secu.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by martinbaumer on 29/07/16.
 */
@Controller
public class RootController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String homepage() {
        System.out.print("in RootController");
        return "index";
    }

    @RequestMapping(value = "/glucometriq", method = RequestMethod.GET)
    public String mainpage() {
        System.out.print("in RootController");
        return "redirect:/index.html";
    }
}
