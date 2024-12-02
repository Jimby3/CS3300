package CS3300.repository;

import CS3300.schema.Class;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassRepository extends JpaRepository<Class, Long> {
    List<Class> findByOwnerId(String ownerId);
}