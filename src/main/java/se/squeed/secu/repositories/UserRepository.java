package se.squeed.secu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.squeed.secu.models.User;

/**
 * Created by martinbaumer on 28/07/16.
 */
public interface UserRepository extends JpaRepository<User, String> {
    User findByUserCodeAndPassword(int userCode, String password);
}
