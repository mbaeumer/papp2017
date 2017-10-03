package se.squeed.secu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.squeed.secu.models.Area;

import java.util.List;

/**
 * Created by martinbaumer on 28/09/17.
 */
public interface AreaRepository extends JpaRepository<Area, String> {
    Area findById(int id);
    List<Area> findAll();
    List<Area> findByIsActive(boolean isActive);
    Area findByCode(int code);
    List<Area> findByCodeGreaterThan(int code);

}
