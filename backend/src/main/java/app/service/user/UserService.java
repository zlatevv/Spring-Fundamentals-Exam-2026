package app.service.user;

import app.exception.user.UserAlreadyExistsException;
import app.mapper.user.UserMapper;
import app.model.dto.user.RegisterRequest;
import app.model.dto.user.UserDto;
import app.model.entity.user.User;
import app.repository.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDto register(RegisterRequest registerRequest) {
        userRepository.findByUsername(registerRequest.getUsername()).ifPresent(user -> {
            throw new UserAlreadyExistsException("User already exists!");
        });

        User user = UserMapper.toUserEntity(registerRequest);

        String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
        user.setPassword(hashedPassword);

        userRepository.save(user);
        return UserMapper.toUserDto(user);
    }
}
