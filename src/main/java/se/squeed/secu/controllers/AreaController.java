package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import se.squeed.secu.models.Area;
import se.squeed.secu.models.ComposedArea;
import se.squeed.secu.repositories.AreaRepository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by martinbaumer on 28/09/17.
 */
@RestController
@RequestMapping("/areas")
public class AreaController {
    private AreaRepository areaRepository;

    @Autowired
    public AreaController(AreaRepository inspectionRepository){
        this.areaRepository = inspectionRepository;
    }

    @RequestMapping(method= RequestMethod.GET)
    public List<Area> getAreas(Model model) {
        List<Area> users = areaRepository.findAll();
        return users;
    }

    @RequestMapping(value="/composed", method= RequestMethod.GET)
    public List<ComposedArea> findComposed(Model model){
        List<ComposedArea> composedAreas = new ArrayList<ComposedArea>();
        List<Area> areas = areaRepository.findByIsActive(true);
        for (Area a : areas){
            ComposedArea ca = new ComposedArea();
            ca.setId(a.getId());
            ca.setCode(new Integer(a.getCode()).toString());
            ca.setName(a.getName());
            ca.setIsActive(a.getIsActive());
            composedAreas.add(ca);
        }
        return composedAreas;
    }

    @RequestMapping(value="/pseudo", method= RequestMethod.GET)
    public Area findPseudoArea(){
        return areaRepository.findByCode(0);
    }
}
