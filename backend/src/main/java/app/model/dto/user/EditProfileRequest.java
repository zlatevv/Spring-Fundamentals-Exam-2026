package app.model.dto.user;

import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data
public class EditProfileRequest {

    @Size(max = 50, message = "First name must be under 50 characters")
    private String firstName;

    @Size(max = 50, message = "Last name must be under 50 characters")
    private String lastName;

    @URL(message = "Profile picture must be a valid URL")
    private String profilePictureUrl;

    @Size(min = 6, message = "New password must be at least 6 characters")
    private String newPassword;

    private String currentPassword; // to verify identity before changing
}
