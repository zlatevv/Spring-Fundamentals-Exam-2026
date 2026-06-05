package app.exception.workoutsession;

public class SessionFullException extends RuntimeException {
    public SessionFullException(String message) {
        super(message);
    }
}
