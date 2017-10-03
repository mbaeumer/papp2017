package se.squeed.secu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.squeed.secu.models.UserType;

import java.util.List;

/**
 * Created by martinbaumer on 31/07/16.
 */
public interface UserTypeRepository extends JpaRepository<UserType, String> {
    List<UserType> findAll();
}
