package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.reposioties.AnswerRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.assertNull;
@SpringBootTest
public class DeleteAnswerByIdUserCaseTest {

    @SpyBean
    private DeleteAnswerByIdUseCase useCase;

    @MockBean
    private AnswerRepository repository;

    @Test
    void testDeleteAnswer(){
        var answer = new Answer();
        answer.setId("1");
        answer.setUserId("12");
        answer.setQuestionId("0000");
        answer.setPosition(1);
        answer.setAnswer("bla bla bla");
        Mockito.when( repository.deleteById("1")).thenReturn(Mono.empty());

        var result = useCase.apply("1").block();
        assertNull(result);
    }
}

