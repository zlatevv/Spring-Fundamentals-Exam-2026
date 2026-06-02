package app.mapper.user;

import app.model.dto.user.RegisterRequest;
import app.model.dto.user.UserDto;
import app.model.entity.user.User;

import java.time.LocalDateTime;

public class UserMapper {
    public static User toUserEntity(RegisterRequest registerRequest) {
        if  (registerRequest == null) {
            return null;
        }
        return User.builder()
                .username(registerRequest.getUsername())
                .password(registerRequest.getPassword())
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
}
