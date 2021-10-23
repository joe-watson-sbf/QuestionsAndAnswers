package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class AddAnswerUseCaseTest {

    AddAnswerUseCase addAnswerUseCase;
    QuestionRepository questionRepository;
    AnswerRepository answerRepository;
    GetUseCase getUseCase;
    MapperUtils mapperUtils;

    @BeforeEach
    public void setup() {
        MapperUtils mapperUtils = new MapperUtils();
        questionRepository = mock(QuestionRepository.class);
        answerRepository = mock(AnswerRepository.class);
        getUseCase = mock(GetUseCase.class);
        mapperUtils = mock(MapperUtils.class);

        addAnswerUseCase = new AddAnswerUseCase(mapperUtils, getUseCase, answerRepository);
    }

    @Test
    void testAddAnswer() {

        var questionDTO = new QuestionDTO("1","12","¿QUE ES DDD?","CUALQUIERA", "TECH");

        var question = new Question();
        question.setId("1");
        question.setUserId("12");
        question.setQuestion("¿QUE ES DDD?");
        question.setType("CUALQUIERA");
        question.setCategory("TECH");

        var answer = new Answer();
        answer.setId("1");
        answer.setUserId("12");
        answer.setQuestionId("0000");
        answer.setPosition(1);
        answer.setAnswer("bla bla bla");

        var answerDTO = new AnswerDTO();
        answerDTO.setUserId("12");
        answerDTO.setQuestionId("0000");
        answerDTO.setPosition(1);
        answerDTO.setAnswer("bla bla bla");


        when(getUseCase.apply(question.getId())).thenReturn(Mono.just(questionDTO));

        when(answerRepository.save(answer)).thenReturn(Mono.just(answer));

        StepVerifier.create(addAnswerUseCase.apply(answerDTO))
                .expectNextMatches(answer1 ->  {
                    assert answer1.getId().equals("0000");
                    assert answer1.getUserId().equals("12");
                    assert answer1.getCategory().equals("TECH");
                    assert answer1.getQuestion().equals("¿QUE ES DDD?");
                    assert answer1.getType().equals("CUALQUIERA");
                    return true;
                }).verifyComplete();

        verify(getUseCase).apply(questionDTO.getId());
        verify(answerRepository).save(answer);
    }
}