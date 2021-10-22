package co.com.sofka.questions.routers;

import co.com.sofka.questions.usecases.DeleteAnswerByIdUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.DELETE;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class AnswerRouter {
    @Bean
    public RouterFunction<ServerResponse> deleteUserAnswer(DeleteAnswerByIdUseCase deleteAnswerByIdUseCase){
        return route(
                DELETE("/delete/answer/{id}").and(accept(MediaType.APPLICATION_JSON)),
                request -> ServerResponse.accepted()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(BodyInserters.fromPublisher(deleteAnswerByIdUseCase.apply(request.pathVariable("id")), Void.class))
        );
    }
}
