package app.model.dto.user;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserDto {
    private UUID id;
    private String username;
    private String profilePictureUrl;
    private String firstName;
    private String lastName;
}
