package co.com.sofka.questions.reposioties;

import co.com.sofka.questions.collections.Comment;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends ReactiveCrudRepository<Comment, String> {

}
