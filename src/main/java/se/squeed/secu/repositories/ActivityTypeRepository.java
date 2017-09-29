package se.squeed.secu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.squeed.secu.models.ActivityType;

import java.util.List;

/**
 * Created by martinbaumer on 29/09/17.
 */
public interface ActivityTypeRepository extends JpaRepository<ActivityType, String> {
    List<ActivityType> findAll();
}
