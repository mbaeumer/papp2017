package se.squeed.secu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.squeed.secu.models.UserType;

/**
 * Created by martinbaumer on 31/07/16.
 */
public interface UserTypeRepository extends JpaRepository<UserType, String> {
}
