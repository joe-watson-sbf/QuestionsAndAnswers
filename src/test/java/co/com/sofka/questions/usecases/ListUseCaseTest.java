package co.com.sofka.questions.usecases;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;


import java.util.Optional;

import static org.mockito.Mockito.*;

class ListUseCaseTest {

    QuestionRepository repository;
    ListUseCase listUseCase;


    @BeforeEach
    public void setup(){
        MapperUtils mapperUtils = new MapperUtils();
        repository = mock(QuestionRepository.class);
        listUseCase = new ListUseCase(mapperUtils, repository);
    }

    @Test
    void testGetAll(){
        var question = new Question();
        question.setId("1");
        question.setUserId("12");
        question.setQuestion("¿QUE ES DDD?");
        question.setType("CUALQUIERA");
        question.setCategory("TECH");
        when(repository.findAll()).thenReturn(Flux.just(question));

        StepVerifier.create(listUseCase.get()).expectNextMatches(
                questionDTO -> {
                    assert questionDTO.getId().equals("1");
                    assert questionDTO.getUserId().equals("12");
                    assert questionDTO.getCategory().equals("TECH");
                    assert questionDTO.getQuestion().equals("¿QUE ES DDD?");
                    assert questionDTO.getType().equals("CUALQUIERA");
                    return true;
                }
        ).verifyComplete();

        verify(repository).findAll();
    }

}