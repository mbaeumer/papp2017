package se.squeed.secu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.squeed.secu.models.Inspection;
import se.squeed.secu.models.User;

import java.util.Date;
import java.util.List;

/**
 * Created by martinbaumer on 27/09/17.
 */
public interface InspectionRepository extends JpaRepository<Inspection, String> {
    List<Inspection> findInspectionsByUser(User user);
    Inspection findLatestByUserIdAndInspectionDateOrderByEndTime(int userid, Date date);
}
