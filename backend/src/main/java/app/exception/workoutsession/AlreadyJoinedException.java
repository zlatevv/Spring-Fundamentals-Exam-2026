package app.exception.workoutsession;

public class AlreadyJoinedException extends RuntimeException {
    public AlreadyJoinedException(String message) {
        super(message);
    }
}
