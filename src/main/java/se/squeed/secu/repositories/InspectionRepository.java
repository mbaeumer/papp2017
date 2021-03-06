package se.squeed.secu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;
import se.squeed.secu.models.Inspection;
import se.squeed.secu.models.User;

import javax.persistence.TemporalType;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

/**
 * Created by martinbaumer on 27/09/17.
 */
@Transactional
public interface InspectionRepository extends JpaRepository<Inspection, String> {
    List<Inspection> findInspectionsByUserAndInspectionDateOrderByEndTimeDesc(User user, @Temporal(TemporalType.DATE)  Date date);
    Inspection findById(int id);
    List<Inspection> findAllByOrderByUserAscInspectionDateDescStartTimeAsc();
    List<Inspection> findAllByInspectionDateBetweenOrderByUserAscInspectionDateDescStartTimeAsc(@Temporal(TemporalType.DATE) Date start, @Temporal(TemporalType.DATE) Date end);


}
