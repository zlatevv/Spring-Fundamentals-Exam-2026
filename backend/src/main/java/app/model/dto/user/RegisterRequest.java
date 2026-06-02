package app.model.dto.user;

import app.validation.ValidPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Email is required!")
    @Email(message = "Please provide a valid email!")
    @Pattern(
            regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
            message = "Email must have a valid domain extension (e.g., .com, .org)"
    )
    private String email;

    @NotBlank
    @Size(min = 6, message = "Username must be at least 6 characters long!")
    private String username;

    @ValidPassword
    private String password;
}
