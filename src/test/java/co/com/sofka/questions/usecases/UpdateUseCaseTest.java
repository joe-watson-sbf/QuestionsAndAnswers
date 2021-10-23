package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;


import static org.mockito.Mockito.*;
@RunWith(MockitoJUnitRunner.class)
class UpdateUseCaseTest {
    UpdateUseCase updateUseCase;
    QuestionRepository questionRepository;

    @BeforeEach
    public void setup() {
        MapperUtils mapperUtils = new MapperUtils();
        questionRepository = mock(QuestionRepository.class);
        updateUseCase = new UpdateUseCase(mapperUtils,questionRepository);
    }



    @Test
    void testUpdateQuestion(){
        var questionDTO = new QuestionDTO(
                "1","12",
                "¿QUE ES DDD?",
                "CUALQUIERA", "TECH");

        var question = new Question();
        question.setId("1");
        question.setUserId("12");
        question.setQuestion("¿QUE ES DDD?");
        question.setType("CUALQUIERA");
        question.setCategory("TECH");

        when(questionRepository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));
        StepVerifier.create(updateUseCase.apply(questionDTO)).expectNextMatches(
                id ->{
                    assert id.equals(questionDTO.getId());
                    return true;
                }).verifyComplete();
        verify(questionRepository).save(Mockito.any(Question.class));
    }

}