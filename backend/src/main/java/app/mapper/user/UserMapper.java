package app.mapper.user;

import app.model.dto.user.RegisterRequest;
import app.model.dto.user.UserDto;
import app.model.dto.user.UserResponse;
import app.model.entity.user.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UserMapper {
    public static User toUserEntity(RegisterRequest registerRequest) {
        if  (registerRequest == null) {
            return null;
        }
        return User.builder()
                .username(registerRequest.getUsername())
                .password(registerRequest.getPassword())
                .email(registerRequest.getEmail())
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .updatedOn(LocalDateTime.now())
                .build();
    }

    public static UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }

        return UserDto.builder()
                .id(user.getId())
                .profilePictureUrl(user.getProfilePictureUrl())
                .lastName(user.getLastName())
                .firstName(user.getFirstName())
                .username(user.getUsername())
                .build();
    }

    public static UserResponse toUserResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getProfilePictureUrl(),
                user.getCreatedOn()
        );
    }
}
