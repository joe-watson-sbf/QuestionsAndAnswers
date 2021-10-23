package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class DeleteUseCaseTest {

    @SpyBean
    private DeleteUseCase deleteUseCase;

    @MockBean
    private QuestionRepository questionRepository;

    @Test
    void testDeleteQuestion(){
        var questionDTO = new QuestionDTO();
        questionDTO.setId("00098");
        questionDTO.setUserId("8967897897");
        questionDTO.setType("CUALQUIERA");
        questionDTO.setCategory("TECH");
        questionDTO.setQuestion("¿QUE ES DDD?");
        Mockito.when( questionRepository.deleteById("00098")).thenReturn(Mono.empty());

        var result = deleteUseCase.apply("00098").block();
        assertNull(result);
    }
}