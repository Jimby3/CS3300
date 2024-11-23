package CS3300.repository;

import CS3300.schema.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(String userId);
    List<Task> findByClassId(Long classId);
}