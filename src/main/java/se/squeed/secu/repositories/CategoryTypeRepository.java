package se.squeed.secu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import se.squeed.secu.models.Category;

import java.util.List;

/**
 * Created by martinbaumer on 01/10/17.
 */
public interface CategoryTypeRepository extends JpaRepository<Category, String> {
    List<Category> findAll();
}
