package com.example.demo.service;

import java.io.IOException;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.ERole;
import com.example.demo.entity.Offer;
import com.example.demo.entity.User;
import com.example.demo.errore.UserError;
import com.example.demo.payment.Emailrequest;
import com.example.demo.repository.OfferRepositery;
import com.example.demo.repository.UserRepositery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
@Service
public class UserService {
	 @Autowired
	    private JavaMailSender emailSender;
	 
	 
	 @Value("${spring.mail.username}")
	    private String emailUsername;
	 
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepositery userRepository;
   
    private final OfferRepositery offerRepository;

    
    public UserService(UserRepositery userRepository, OfferRepositery offerRepository) {
        this.userRepository = userRepository;
      
        this.offerRepository = offerRepository;
    }
    
	public long getNumberClients() {
		
		return userRepository.count();
	}
	public User getUserById(Long id) {
		return userRepository.findById(id).orElse(null);
	}
    
	public void ajouterrevieuxclien(long clientId, String revieux, MultipartFile image1) {
		User user = userRepository.findById(clientId)
				.orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé avec l'ID : " + clientId));
		try {
			if (image1 != null && !image1.isEmpty()) {
				user.setImage(image1.getBytes());
			}

			user.setRevieux(revieux); 
			userRepository.save(user);
		 } catch (IOException e) {
		        throw new UserError(false, "Erreur lors de la lecture des données de a l'image",e);
		    }
	}
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	public void updateUserImage(Long userId, MultipartFile newImage) {
		try {
			User user = userRepository.findById(userId)
					.orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé avec l'ID : " + userId));

			user.setImage(newImage.getBytes()); 

			userRepository.save(user);
		} catch (IOException e) {
			
			  throw new UserError(false, "Erreur lors de la lecture des données de l'image", e);
		} catch (Exception e) {
			  throw new UserError(false, "Erreur lors de la mise à jour de l'image de l'utilisateur : " + e.getMessage(), e);
		}
	}
	public Map<String, Integer> countUsersByMonth() {
		List<User> users = userRepository.findAll();
		Map<String, Integer> countByMonth = initializeMonthMap();

		for (User user : users) {
			if (user.getRegistrationDate() != null) {
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(user.getRegistrationDate());
				int month = calendar.get(Calendar.MONTH); // Mois en commençant par 0 (janvier)
				String monthName = getMonthName(month);

				countByMonth.put(monthName, countByMonth.getOrDefault(monthName, 0) + 1);
			}
		}

		return countByMonth;
	}
	private Map<String, Integer> initializeMonthMap() {
		Map<String, Integer> monthMap = new LinkedHashMap<>();
		monthMap.put("Janvier", 0);
		monthMap.put("Février", 0);
		monthMap.put("Mars", 0);
		monthMap.put("Avril", 0);
		monthMap.put("Mai", 0);
		monthMap.put("Juin", 0);
		monthMap.put("Juillet", 0);
		monthMap.put("Août", 0);
		monthMap.put("Septembre", 0);
		monthMap.put("Octobre", 0);
		monthMap.put("Novembre", 0);
		monthMap.put("Décembre", 0);
		return monthMap;
	}

	private String getMonthName(int month) {
		String[] monthNames = { "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre",
				"Octobre", "Novembre", "Décembre" };
		return monthNames[month];
	}
	public void displayUserCountsByMonth() {
		Map<String, Integer> countByMonth = countUsersByMonth();

		for (Map.Entry<String, Integer> entry : countByMonth.entrySet()) {
			String monthName = entry.getKey();
			int count = entry.getValue();
			logger.info("Mois : {}, Nombre de clients : {}", monthName, count);

		}
	}
	
	public long countUsersWithCautchRole() {
		return userRepository.countUsersByRoles_Name(ERole.ROLE_COACH);
	}

	public List<User> findUsersByRoleCoach() {
		return userRepository.findByRoles_Name(ERole.ROLE_COACH);
	}

	public List<User> findUsersByRoleUser() {
		return userRepository.findByRoles_Name(ERole.ROLE_USER);
	}
	 public String afficherAttributsSelonId(Long userId) {
	        Optional<User> optionalUser = userRepository.findById(userId);
	        if (optionalUser.isPresent()) {
	            User user = optionalUser.get();
	            ObjectMapper objectMapper = new ObjectMapper();
	            Map<String, Long> userAttributes = new LinkedHashMap<>(); // Utilisation de LinkedHashMap pour maintenir l'ordre d'insertion
	            userAttributes.put("janfi", (long) user.getJanfi());
	            userAttributes.put("fivri", (long) user.getFivri());
	            userAttributes.put("mars", (long) user.getMars());
	            userAttributes.put("avrile", (long) user.getAvrile());
	            userAttributes.put("mais", (long) user.getMais());
	            userAttributes.put("juin", (long) user.getJuin());
             userAttributes.put("juilliat", (long) user.getJuilliat());
             userAttributes.put("aute", (long) user.getAute());
	            userAttributes.put("septembre", (long) user.getSeptembre());
	            userAttributes.put("octobre", (long) user.getOctobre());
	            userAttributes.put("decembre", (long) user.getDecembre());
	            userAttributes.put("nauvembre", (long) user.getNauvembre());
	           
	       
	            try {
	                return objectMapper.writeValueAsString(userAttributes);
	            } catch (JsonProcessingException e) {
	                e.printStackTrace();
	                return "Erreur lors de la conversion en JSON";
	            }
	        } else {
	            return "Utilisateur avec l'ID " + userId + " non trouvé.";
	        }
	    }
		public User updateUser(long userId, double telephone,
				double janfi, double fivri, double mars, double avrile, double mais, double juin , double juilliat , double aute ,
				double octobre , double decembre , double nauvembre, long septembre ) {
	
			Optional<User> optionalUser = userRepository.findById(userId);
			if (optionalUser.isPresent()) {

				User existingUser  = optionalUser.get();

				existingUser.setTelephone(telephone);
				existingUser.setJanfi( janfi);
				existingUser.setFivri( fivri);
				existingUser.setMars( mars);
				existingUser.setAvrile( avrile);
				existingUser.setMais( mais);
				existingUser.setJuin( juin);
				existingUser.setJuilliat( juilliat);
				existingUser.setAute( aute);
				existingUser.setOctobre( octobre);
				existingUser.setDecembre(decembre);
				existingUser.setNauvembre(nauvembre);
				existingUser.setSeptembre(septembre);
				

	
				return userRepository.save(existingUser);
			} else {

				return null;
			}
		}
		public User updateuserinf(long userId, String username, String email,double telephone) {
			
					Optional<User> optionalUser2 = userRepository.findById(userId);
					if (optionalUser2.isPresent()) {
			
						User existingUser2 = optionalUser2.get();
						if (username != null && !username.isEmpty()) {
							existingUser2.setUsername(username);
						}
						if (email != null && !email.isEmpty()) {
							existingUser2.setEmail(email);
						}
				
						existingUser2.setTelephone(telephone);
			
						return userRepository.save(existingUser2);
					} else {
	
						return null;
					}
				}
		public User updateUser3(long userId, double confibm, double poid ) {
			
					Optional<User> optionalUser = userRepository.findById(userId);
					if (optionalUser.isPresent()) {
			
						User existingUser  = optionalUser.get();
						existingUser.setConfibm(confibm);
						existingUser.setPoid(poid);
		
						return userRepository.save(existingUser);
					} else {
			
						return null;
					}
				}
		public void UpdateUserImage(long userId, MultipartFile image) {
			User user = userRepository.findById(userId)
					.orElseThrow(() -> new IllegalArgumentException("Salle non trouvée avec l'ID : " + userId));
			try {
				if (image != null && !image.isEmpty()) {
					user.setImage(image.getBytes());
				}

				userRepository.save(user);
			} catch (IOException e) {
				 throw new UserError(false, "Erreur lors de la lecture des données de l'image", e);
				 
			}
		}
	    public List<User> findAllUsersAndCoaches() {
	
	        return userRepository.findAll();
	    }
	    public void addToCart(long userId, long offreID) {
	        Optional<User> optionalUser = userRepository.findById(userId);
	        Optional<Offer> optionalChop = offerRepository.findById(offreID);

	        if (optionalUser.isPresent() && optionalChop.isPresent()) {
	            User user = optionalUser.get();
	            Offer offre = optionalChop.get();
	            user.getOffre().add(offre); 
	            userRepository.save(user); 
	        }
	    }
	    public User getUserByEmail(String email) {
	        Optional<User> userOptional = userRepository.findByEmail(email);
	        return userOptional.orElse(null); 
	    }
	    
	    public User saveUser(User user) {
	        return userRepository.save(user);
	    }
	    public void sendEmail(Emailrequest request) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(emailUsername); // Utiliser l'adresse de destination configurée
	        message.setSubject("Nouveau message de " + request.getName());
	        message.setText("Nom: " + request.getName() + "\nEmail: " + request.getEmail() + "\nMessage: " + request.getMessage());
	        emailSender.send(message);
	    }
}
