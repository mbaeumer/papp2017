package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import se.squeed.secu.models.Category;
import se.squeed.secu.repositories.CategoryTypeRepository;

import java.util.List;

/**
 * Created by martinbaumer on 01/10/17.
 */

@RestController
@RequestMapping("/categorytypes")
public class CategoryTypeController {
    private CategoryTypeRepository categoryTypeRepository;

    @Autowired
    public CategoryTypeController(CategoryTypeRepository activityTypeRepository){
        this.categoryTypeRepository = activityTypeRepository;
    }

    @RequestMapping(method= RequestMethod.GET)
    public List<Category> getActivityTypes() {
        return categoryTypeRepository.findAll();
    }
}