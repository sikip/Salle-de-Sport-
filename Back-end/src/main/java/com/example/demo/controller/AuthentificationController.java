package com.example.demo.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ERole;
import com.example.demo.entity.Role;
import com.example.demo.entity.Room;
import com.example.demo.entity.User;
import com.example.demo.errore.MessageResponse;
import com.example.demo.payload.JwtResponse;
import com.example.demo.payload.LoginRequest;
import com.example.demo.payload.SignupRequest;
import com.example.demo.repository.RoleRepositery;
import com.example.demo.repository.RoomRepositery;
import com.example.demo.repository.UserRepositery;
import com.example.demo.security.JwtUtils;
import com.example.demo.security.service.UserDetailsImpl;
import com.example.demo.security.service.EmailService;



@CrossOrigin(origins = "*")
@RestController
public class AuthentificationController {
	private static final String ROLE_NOT_FOUND_ERROR = "Error: Role is not found.";
    private final AuthenticationManager authenticationManager;
    private final RoomRepositery cordonner;
    private final UserRepositery userRepositery;
    private final RoleRepositery roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final JavaMailSender emailSender;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
 
    public AuthentificationController(AuthenticationManager authenticationManager,
                                      RoomRepositery cordonner,
                                      UserRepositery userRepositery,
                                      RoleRepositery roleRepository,
                                      PasswordEncoder encoder,
                                      JwtUtils jwtUtils,
                                      JavaMailSender emailSender,
                                      EmailService emailService,PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.cordonner = cordonner;
        this.userRepositery = userRepositery;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.emailSender = emailSender;
        this.emailService = emailService;
       this.passwordEncoder=passwordEncoder;
    }
    
    
    
    
  
	   @PostMapping("/signin")
	   public ResponseEntity<Object> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
	       Authentication authentication = authenticationManager.authenticate(
	               new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
	       SecurityContextHolder.getContext().setAuthentication(authentication);
	       String jwt = jwtUtils.generateJwtToken(authentication);
	       
	       UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();        
	       List<String> roles = userDetails.getAuthorities().stream()
	               .map(item -> item.getAuthority())
	               .collect(Collectors.toList());
	       return ResponseEntity.ok(new JwtResponse(userDetails.getId(), 
	               userDetails.getUsername(), 
	               userDetails.getEmail(), 
	               roles, jwt, userDetails.getUserPay(), userDetails.getConfuser()));
	   }

	
	
	 @PostMapping("/signup")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (Boolean.TRUE.equals(userRepositery.existsByUsername(signUpRequest.getUsername()))) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }
        
        if (Boolean.TRUE.equals(userRepositery.existsByEmail(signUpRequest.getEmail()))) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }
        
        
        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(), signUpRequest.getPassword());
        user.setRegistrationDate(new java.util.Date());
        Room room = cordonner.findById(1L)
                .orElseThrow(() -> new RuntimeException("Error: Salle with id 1 not found."));
        user.setUserRoom(room);
        Set<Role> roles = new HashSet<>();
        List<String> strRoles = signUpRequest.getRoles();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
            		 .orElseThrow(() -> new RuntimeException(ROLE_NOT_FOUND_ERROR));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                        		  .orElseThrow(() -> new RuntimeException(ROLE_NOT_FOUND_ERROR));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_COACH)
                        		  .orElseThrow(() -> new RuntimeException(ROLE_NOT_FOUND_ERROR));
                        roles.add(modRole);
                        passwordEncoder.encode(signUpRequest.getPassword());

                        envoyerEmailBienvenueAvecMotDePasse(signUpRequest.getEmail(), signUpRequest.getUsername(), room, signUpRequest.getPassword());
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                       		  .orElseThrow(() -> new RuntimeException(ROLE_NOT_FOUND_ERROR));
                        roles.add(userRole);
                }
            });
        }
        
        user.setRoles(roles);
        user.setPassword(encoder.encode(signUpRequest.getPassword())); 
        userRepositery.save(user);

        sendWelcomeEmailWithConfirmationButton(signUpRequest.getEmail(), signUpRequest.getUsername() , room );

     
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

	 private String baseUrl = "http://localhost:4200/";

	 private void sendWelcomeEmailWithConfirmationButton(String userEmail, String userName, Room salleObj) {
		  
		    String confirmationUrl = baseUrl + "/confirm-registration/" + userEmail;
		    
		
		    String emailContent = "<html><head>" +
		            "<style>" +
		            "a.confirmation-button {" +
		            "    display: inline-block;" +
		            "    padding: 12px 24px;" +
		            "    background-color: #007bff;" +
		            "    color: #fff;" +
		            "    font-size: 16px;" +
		            "    font-weight: bold;" +
		            "    text-decoration: none;" +
		            "    border-radius: 4px;" +
		            "    border: none;" +
		            "    cursor: pointer;" +
		            "    transition: background-color 0.3s;" +
		            "}" +
		            "a.confirmation-button:hover {" +
		            "    background-color: #0056b3;" +
		            "}" +
		            "</style>" +
		            "</head><body>" +
		            "Bonjour " + userName + ",<br/><br/>" +
		            "Nous vous souhaitons la bienvenue sur notre plateforme.<br/><br/>" +
		            "<a href=\"" + confirmationUrl + "\" class=\"confirmation-button\">Confirmer l'inscription</a>" +
		            "<br/><br/>Cordialement,<br/>" + salleObj.getName() +
		            "</body></html>";

		
		    MimeMessage message = emailSender.createMimeMessage();
		    try {
		      
		        MimeMessageHelper helper = new MimeMessageHelper(message, true);
		        helper.setTo(userEmail);
		        helper.setSubject("Bienvenue !");
		        helper.setText(emailContent, true); 

		        // Envoyer l'e-mail
		        emailSender.send(message);
		    } catch (MessagingException | MailException e) {
		       
		        e.printStackTrace();
		    } 
		}



	    @PostMapping("/reset-password")
	    public ResponseEntity<Object> resetPassword(@RequestParam String email) {
	    	emailService.resetPassword(email);
	        return ResponseEntity.ok("Un nouveau mot de passe a été envoyé à votre adresse e-mail.");
	    }
	    private void envoyerEmailBienvenueAvecMotDePasse(String userEmail, String username, Room salle, String password) {
	     
	        String subject = "Bienvenue sur notre plateforme";
	        String content = "Bonjour " + username + ",\n\n" +
	                         "Votre compte a été créé avec succès. Voici vos informations de connexion :\n" +
	                         "Nom d'utilisateur : " + username + "\n" +
	                         "Mot de passe : " + password + "\n\n" +
	                         "Cordialement,\n" +
	                         salle.getName();

	        // Envoyer l'email
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(userEmail);
	        message.setSubject(subject);
	        message.setText(content);
	        emailSender.send(message);
	    }

	}