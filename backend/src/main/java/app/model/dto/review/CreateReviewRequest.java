package app.model.dto.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateReviewRequest {
    @NotBlank
    private String content;

    @Min(1) @Max(5)
    private Integer rating;

    private UUID sessionId;
    private UUID authorId;
}
