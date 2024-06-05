package com.example.demo.payment;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Value("${app.token}")
    private String appToken;

    @Value("${app.secret}")
    private String appSecret;

    @Value("${developer.tracking.id}")
    private String developerTrackingId;

    // Getters
    public String getAppToken() {
        return appToken;
    }

    public String getAppSecret() {
        return appSecret;
    }

    public String getDeveloperTrackingId() {
        return developerTrackingId;
    }
}
