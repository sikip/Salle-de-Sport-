package com.example.demo.errore;

public class EventError extends Exception {
    
    private static final long serialVersionUID = 1L;
    private final boolean status;
    private final String message;

    public EventError(boolean status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }

    public boolean isStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public static class CautchNotFoundException extends RuntimeException {
        
        private static final long serialVersionUID = 1L;

        public CautchNotFoundException(Long cautchId) {
            super("Cautch with ID " + cautchId + " not found");
        }
    }
}