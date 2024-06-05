package com.example.demo.payment;

public class PaymentRequest {
	private String appToken;
    private String appSecret;
    private boolean acceptCard;
    private long amount;
    private int sessionTimeoutSecs;

    private String developerTrackingId;
    private long id;
    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	private long userId; 


    public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getAppToken() {
        return appToken;
    }

    public void setAppToken(String appToken) {
        this.appToken = appToken;
    }

    public String getAppSecret() {
        return appSecret;
    }

    public void setAppSecret(String appSecret) {
        this.appSecret = appSecret;
    }

    public boolean isAcceptCard() {
        return acceptCard;
    }

    public void setAcceptCard(boolean acceptCard) {
        this.acceptCard = acceptCard;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public int getSessionTimeoutSecs() {
        return sessionTimeoutSecs;
    }

    public void setSessionTimeoutSecs(int sessionTimeoutSecs) {
        this.sessionTimeoutSecs = sessionTimeoutSecs;
    }



    public String getDeveloperTrackingId() {
        return developerTrackingId;
    }

    public void setDeveloperTrackingId(String developerTrackingId) {
        this.developerTrackingId = developerTrackingId;
    }
}