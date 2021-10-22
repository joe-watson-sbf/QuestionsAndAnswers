package co.com.sofka.questions.model;

import javax.validation.constraints.NotBlank;

public class CommentDTO {
    @NotBlank
    private String userId;
    @NotBlank
    private String questionId;
    @NotBlank
    private String comment;
}
