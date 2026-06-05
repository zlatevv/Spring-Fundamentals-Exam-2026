package app.repository.user;

import app.model.entity.user.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(
            @NotBlank @Size(min = 6, message = "Username must be at least 6 characters long!") String username);

    Optional<User> findByEmail(@NotBlank(message = "Email is required!") @Email(message = "Please provide a valid email!") @Pattern(
            regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
            message = "Email must have a valid domain extension (e.g., .com, .org)"
    ) String email);
}
