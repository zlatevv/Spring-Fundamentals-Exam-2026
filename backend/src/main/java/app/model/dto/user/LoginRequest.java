package app.model.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    @Size(min = 6, message = "Username must be at least 6 characters long!")
    private String username;

    private String password;
}
