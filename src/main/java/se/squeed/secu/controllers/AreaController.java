package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import se.squeed.secu.models.Area;
import se.squeed.secu.models.ComposedArea;
import se.squeed.secu.models.Inspection;
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
    public AreaController(AreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Area> getAreas() {
        return areaRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Area create(@RequestBody Area area) {
        Area result = null;
        try {
            System.out.println("ID:" + area.getId());

            result = areaRepository.save(area);
        } catch (Exception ex) {

        }
        return result;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Area update(@RequestBody Area area) {
        Area result = null;
        try {
            result = areaRepository.save(area);
        } catch (Exception ex) {

        }
        return result;
    }

    @RequestMapping(value = "/active", method = RequestMethod.GET)
    public List<Area> getActiveAreas() {
        return areaRepository.findByIsActive(true);
    }

    @RequestMapping(value = "/notstart", method = RequestMethod.GET)
    public List<Area> getAreasExceptStart() {
        return areaRepository.findByCodeGreaterThan(0);
    }

    @RequestMapping(value = "/composed", method = RequestMethod.GET)
    public List<ComposedArea> findComposed(Model model) {
        List<ComposedArea> composedAreas = new ArrayList<ComposedArea>();
        List<Area> areas = areaRepository.findByIsActive(true);
        for (Area a : areas) {
            ComposedArea ca = new ComposedArea();
            ca.setId(a.getId());
            ca.setCode(new Integer(a.getCode()).toString());
            ca.setName(a.getName());
            ca.setIsActive(a.getIsActive());
            composedAreas.add(ca);
        }
        return composedAreas;
    }

    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    public Area getSingleArea(@PathVariable int id) {
        return areaRepository.findById(id);
    }

    @RequestMapping(value = "/pseudo", method = RequestMethod.GET)
    public Area findPseudoArea() {
        return areaRepository.findByCode(0);
    }
}
