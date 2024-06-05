package com.example.demo.security.service;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepositery;



@Service
public class EmailService {
	private final UserRepositery userRepository;
	private final JavaMailSender emailSender;
	private final PasswordEncoder passwordEncoder;

	
	public EmailService(UserRepositery userRepository, JavaMailSender emailSender, PasswordEncoder passwordEncoder) {
	    this.userRepository = userRepository;
	    this.emailSender = emailSender;
	    this.passwordEncoder = passwordEncoder;
	}

    private static final String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHAR_UPPER = CHAR_LOWER.toUpperCase();
    private static final String NUMBER = "0123456789";
   
    private static final String PASSWORD_ALLOW_BASE = CHAR_LOWER + CHAR_UPPER + NUMBER ;
    public void resetPassword(String email) {
    
        String newPassword = generateNewPassword(10); 

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé avec cet e-mail"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

       
        sendPasswordByEmail(email, newPassword);
    }

    private String generateNewPassword(int length) {
        return RandomStringUtils.random(length, PASSWORD_ALLOW_BASE);
    }

    private void sendPasswordByEmail(String email, String newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Réinitialisation de mot de passe");
        message.setText("Votre nouveau mot de passe est : " + newPassword);
        emailSender.send(message);
    }
}
