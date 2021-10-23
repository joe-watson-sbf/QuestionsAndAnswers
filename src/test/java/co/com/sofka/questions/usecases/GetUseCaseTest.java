package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class GetUseCaseTest {

    GetUseCase getUseCase;
    QuestionRepository questionRepository;
    AnswerRepository answerRepository;
    MapperUtils mapperUtils;

    @BeforeEach
    public void setup(){
        mapperUtils = new MapperUtils();
        questionRepository = mock(QuestionRepository.class);
        answerRepository = mock(AnswerRepository.class);
        getUseCase = new GetUseCase(mapperUtils,questionRepository,answerRepository);
    }

    @Test
    void getQuestionSuccessTest() {

        var answer = new Answer();
        answer.setId("1");
        answer.setUserId("12");
        answer.setQuestionId("0000");
        answer.setPosition(1);
        answer.setAnswer("bla bla bla");

        var question = new Question();
        question.setId("1");
        question.setUserId("12");
        question.setQuestion("¿QUE ES DDD?");
        question.setType("CUALQUIERA");
        question.setCategory("TECH");


        when(questionRepository.findById(question.getId())).thenReturn(Mono.just(question));
        when(answerRepository.findAllByQuestionId(question.getId())).thenReturn(Flux.just(answer));

        StepVerifier.create(getUseCase.apply(question.getId())).expectNextMatches(
                questionDTO1 -> {
                    assert questionDTO1.getId().equals("1");
                    assert questionDTO1.getUserId().equals("12");
                    assert questionDTO1.getCategory().equals("TECH");
                    assert questionDTO1.getQuestion().equals("¿QUE ES DDD?");
                    assert questionDTO1.getType().equals("CUALQUIERA");
                    return true;
                }
        ).verifyComplete();

        verify(questionRepository).findById(question.getId());
        verify(answerRepository).findAllByQuestionId(question.getId());
    }
}