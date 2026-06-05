package app.service.user;

import app.exception.user.PasswordDoesNotMatchException;
import app.exception.user.UserAlreadyExistsException;
import app.exception.user.UserDoesNotExistException;
import app.mapper.user.UserMapper;
import app.model.dto.user.*;
import app.model.entity.user.User;
import app.repository.user.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserDto register(RegisterRequest registerRequest) {
        userRepository.findByUsername(registerRequest.getUsername()).ifPresent(user -> {
            throw new UserAlreadyExistsException("User already exists!");
        });

        userRepository.findByEmail(registerRequest.getEmail()).ifPresent(user -> {
            throw new UserAlreadyExistsException("Email in use by other user!");
        });

        User user = UserMapper.toUserEntity(registerRequest);

        String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
        user.setPassword(hashedPassword);

        userRepository.save(user);
        return UserMapper.toUserDto(user);
    }

    public UserDto login(LoginRequest loginRequest) {
        Optional<User> userToGet = userRepository.findByUsername(loginRequest.getUsername());

        if (userToGet.isEmpty()) {
            throw new UserDoesNotExistException("Invalid username!");
        }

        User loggedUser = userToGet.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), loggedUser.getPassword())) {
            throw new PasswordDoesNotMatchException("Wrong password!");
        }

        return UserMapper.toUserDto(loggedUser);
    }

    public void editProfile(UUID userId, EditProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserDoesNotExistException("User not found!"));

        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getProfilePictureUrl() != null) {
            user.setProfilePictureUrl(request.getProfilePictureUrl());
        }

        if (request.getNewPassword() != null) {
            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                throw new PasswordDoesNotMatchException("Current password is incorrect!");
            }
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }

        userRepository.save(user);
    }

    public UserResponse getProfile(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserDoesNotExistException("User not found!"));

        return UserMapper.toUserResponse(user);
    }

    public void logout(HttpSession session) {
        session.invalidate();
    }
}
