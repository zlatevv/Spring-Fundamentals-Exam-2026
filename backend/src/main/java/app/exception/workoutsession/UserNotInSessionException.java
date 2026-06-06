package app.exception.workoutsession;

public class UserNotInSessionException extends RuntimeException {
    public UserNotInSessionException(String message) {
        super(message);
    }
}
