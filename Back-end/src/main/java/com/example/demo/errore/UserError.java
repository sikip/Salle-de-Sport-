package com.example.demo.errore;

import java.io.Serializable;

public class UserError extends RuntimeException implements Serializable{
	 private static final long serialVersionUID = 1L;
	    private final boolean status;
	    private final String message;

	    public UserError(boolean status, String message,Exception e) {
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
}
