package com.example.demo.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.payment.AppConfig;
import com.example.demo.payment.PaymentRequest;
import com.example.demo.repository.UserRepositery;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


@CrossOrigin(origins = "*")
@RestController
public class PaymentController {

    private final AppConfig appConfig;
    private final UserRepositery userRepositery;
 

 
    public PaymentController(AppConfig appConfig, UserRepositery userRepositery) {
        this.appConfig = appConfig;
        this.userRepositery = userRepositery;
      
    }

	@PostMapping("/generatepayment/{userId}")
	public ResponseEntity<String> generatePayment(@PathVariable long userId, @RequestBody PaymentRequest paymentRequest) {
	    try {
	        OkHttpClient client = new OkHttpClient();
	        paymentRequest.setUserId(userId);
	        
	        String appToken = appConfig.getAppToken();
	        String appSecret = appConfig.getAppSecret();
	        String developerTrackingId = appConfig.getDeveloperTrackingId();

	        String jsonBody = "{\"app_token\":\"" + appToken + "\",\"app_secret\":\"" + appSecret + "\",\"accept_card\":true,\"amount\":" + paymentRequest.getAmount() + ",\"session_timeout_secs\":1200,\"success_link\":\"http://localhost:4200/succes/" + userId + "\",\"fail_link\":\"http://localhost:4200/failed/" + userId + "\",\"developer_tracking_id\":\"" + developerTrackingId + "\"}";
	        
	        okhttp3.RequestBody body = okhttp3.RequestBody.create(MediaType.parse("application/json"), jsonBody);
	        Request request = new Request.Builder()
	                .url("https://developers.flouci.com/api/generate_payment")
	                .post(body)
	                .addHeader("Content-Type", "application/json")
	                .build();

	        Response response = client.newCall(request).execute();

	        if (response.isSuccessful()) {
	            User user = userRepositery.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	            user.setUserPay("true");
	            user.setRegistrationDate(new java.util.Date());
	            userRepositery.save(user);
	            
	            return ResponseEntity.ok(response.body().string());
	        } else {
	            return ResponseEntity.status(response.code()).body(response.body().string());
	        }
	    } catch (IOException e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'envoi de la demande de paiement.");
	    }
	}

    @GetMapping("/verify/{paymentId}")
    public ResponseEntity<String> verifyPayment(@PathVariable String paymentId) {
        try {
            OkHttpClient client = new OkHttpClient();

            String appToken = appConfig.getAppToken();
            String appSecret = appConfig.getAppSecret();

            Request request = new Request.Builder()
                    .url("https://developers.flouci.com/api/verify_payment/" + paymentId)
                    .method("GET", null)
                    .addHeader("Content-Type", "application/json")
                    .addHeader("apppublic", appToken)
                    .addHeader("appsecret", appSecret)
                    .build();

            Response response = client.newCall(request).execute();

            if (response.isSuccessful()) {
                return ResponseEntity.ok(response.body().string());
            } else {
                return ResponseEntity.status(response.code()).body(response.body().string());
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la vérification du paiement.");
        }
    }
    
    



	@PostMapping("/generatepayment2/{userId}/{id}")
	public ResponseEntity<String> generatePayment2(@PathVariable long userId, @PathVariable long id, @RequestBody PaymentRequest paymentRequest) {
	    try {
	        OkHttpClient client = new OkHttpClient();
	        paymentRequest.setUserId(userId);
	        paymentRequest.setId(id);
	        String appToken = appConfig.getAppToken();
	        String appSecret = appConfig.getAppSecret();
	        String developerTrackingId = appConfig.getDeveloperTrackingId();

	        String jsonBody = "{\"app_token\":\"" + appToken + "\",\"app_secret\":\"" + appSecret + "\",\"accept_card\":true,\"amount\":" + paymentRequest.getAmount() + ",\"session_timeout_secs\":1200,\"success_link\":\"http://localhost:4200/facteure/" + userId + "/" + id + "\",\"fail_link\":\"http://localhost:4200/failed/" + userId + "\",\"developer_tracking_id\":\"" + developerTrackingId + "\"}";
	        
	       
	        okhttp3.RequestBody body = okhttp3.RequestBody.create(MediaType.parse("application/json"), jsonBody);
	        Request request = new Request.Builder()
	                .url("https://developers.flouci.com/api/generate_payment")
	                .post(body)
	                .addHeader("Content-Type", "application/json")
	                .build();

	        // Exécuter la requête
	        Response response = client.newCall(request).execute();

	        // Vérifier le code de statut de la réponse
	        if (response.isSuccessful()) {
	            // Mettre à jour userPay à true
	            User user = userRepositery.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	            user.setUserPay("true");
	            user.setRegistrationDate(new java.util.Date());
	            userRepositery.save(user);
	            
	            return ResponseEntity.ok(response.body().string());
	        } else {
	            return ResponseEntity.status(response.code()).body(response.body().string());
	        }
	    } catch (IOException e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'envoi de la demande de paiement.");
	    }
	}
    
    
    
    
    
    
    
}