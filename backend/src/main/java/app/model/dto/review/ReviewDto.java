package app.model.dto.review;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ReviewDto {
    private UUID id;
    private String content;
    private Integer rating;
    private LocalDateTime createdOn;
    private UUID authorId;
    private String authorUsername;
    private UUID sessionId;
    private String sessionTitle;
}
