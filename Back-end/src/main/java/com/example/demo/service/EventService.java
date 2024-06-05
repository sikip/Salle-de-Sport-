package com.example.demo.service;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Month;
import java.time.YearMonth;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Event;
import com.example.demo.entity.User;
import com.example.demo.errore.EventError;
import com.example.demo.repository.EventRepositery;
import com.example.demo.repository.UserRepositery;
@Service
public class EventService {
    private final EventRepositery eventRepository;
    private final UserRepositery userRepository;

    
    public EventService(EventRepositery eventRepository, UserRepositery userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }
    
	 public List<Event> getAllEvent() {
	  return eventRepository.findByAcceptation("true");
		 }
	 public List<Event> getAllEvent2() {
		  return eventRepository.findAll();
			 }
	 
		public Event addEvente(Event eventtes, MultipartFile imageFile1) throws EventError {
			 try {
				 eventtes.setImage(imageFile1.getBytes());
		
				  return eventRepository.save(eventtes);
			 } catch (IOException e) {
		            throw new EventError(false, "Erreur lors de la lecture des données de l'image");
		        } catch (Exception e) {
		            throw new EventError(false, "Erreur lors de l'enregistrement de l'événement avec image : " + e.getMessage());
		        }
		    
		}
		
		public Event getEventtesById(Long id) {		
		     return eventRepository.findById(id).orElse(null);
		}
		
		public void updateImage2ById(Long id, MultipartFile image) throws IOException {
			Event event = eventRepository.findById(id)
		                .orElseThrow(() -> new IllegalArgumentException("Event with ID " + id + " not found"));

		        if (image != null && !image.isEmpty()) {
		            event.setImage(image.getBytes());

		        } else {
		            throw new IllegalArgumentException("Image file is empty");
		        }

		        eventRepository.save(event);
		    }
		public void updateImageTitleById(Long id, MultipartFile image2) throws IOException {
			Event event = eventRepository.findById(id)
		                .orElseThrow(() -> new IllegalArgumentException("Event with ID " + id + " not found"));

		        if (image2 != null && !image2.isEmpty()) {
		            event.setImage2(image2.getBytes());

		        } else {
		            throw new IllegalArgumentException("Image file is empty");
		        }

		        eventRepository.save(event);
		    }
		
		public void updateImagesById(Long id, MultipartFile imageFile3, MultipartFile imageFile4) throws IOException {
			
			
			Event event = eventRepository.findById(id)
		            .orElseThrow(() -> new IllegalArgumentException("Event with ID " + id + " not found"));

		    if (imageFile3 != null && !imageFile3.isEmpty()) {
		        event.setImage3(imageFile3.getBytes());
		    } else {
		        throw new IllegalArgumentException("Image file 3 is empty");
		    }

		    if (imageFile4 != null && !imageFile4.isEmpty()) {
		        event.setImage4(imageFile4.getBytes());
		    } else {
		        throw new IllegalArgumentException("Image file 4 is empty");
		    }

		    eventRepository.save(event);
		}
		   public List<Event> findEventsByAddedDatePassed() {
		        return eventRepository.findEventsByAddedDatePassed();
		    }
		  public long getNumberEvent() {
		        return eventRepository.count();
		    }
		  
		   public Event createEvent(Event event, Long cautchId) {
		        // Vérifiez si l'identifiant de Cautch existe
		        Optional<User> cautchOptional = userRepository.findById(cautchId);
		        User cautch = cautchOptional.orElseThrow(() -> new EventError.CautchNotFoundException(cautchId));

		        // Assurez-vous que l'événement est associé à ce Cautch
		        event.setAddedDate(new Timestamp(System.currentTimeMillis()));
		        event.setUser(cautch);
		        event.setAcceptation("false");

		        // Enregistrez l'événement
		        return eventRepository.save(event);
		    }
			  public Map<String, Object> getCautchDetailsByEventId(Long eventId) {
			        Event event = eventRepository.findById(eventId).orElse(null);
			        if (event != null && event.getUser() != null) {
			            Map<String, Object> userDetails = new HashMap<>();
			            userDetails.put("image", event.getUser().getImage()); 
			            userDetails.put("username", event.getUser().getUsername()); 
			            userDetails.put("commentaire",event.getUser().getCommentaire());
			            return userDetails;
			        } else {
			            return Collections.emptyMap(); 
			        }
			    }
			   public void insererAcceptationParId(Long eventId, String acceptation) {
			        if (eventRepository.existsById(eventId)) {
			            // Récupère l'événement par son ID
			            Event event = eventRepository.findById(eventId).orElse(null);
			            if (event != null) {
			                event.setAcceptation(acceptation);
			                eventRepository.save(event);
			            } else {
			                throw new IllegalArgumentException("L'événement avec l'ID spécifié n'existe pas.");
			            }
			        } else {
			            throw new IllegalArgumentException("L'événement avec l'ID spécifié n'existe pas.");
			        }
			    }
			   public Map<String, Integer> countEventsByUserAndMonth(Long userId) {
			        List<Object[]> eventCounts = eventRepository.countEventsByUserAndMonth(userId);
			        Map<String, Integer> formattedEventCounts = new HashMap<>();

			        for (Object[] result : eventCounts) {
			            int month = (int) result[0];
			            long count = (long) result[1];

			            formattedEventCounts.put(Month.of(month).toString(), (int) count);
			        }

			        return formattedEventCounts;
			    }
			   
			   public long countTotalEventsByUser(Long userId) {
			        return eventRepository.countTotalEventsByUser(userId);
			    }
			    public Long calculateUserEarnings(Long userId) {
			        return eventRepository.calculateUserEarnings(userId);
			    }
			    public long countAcceptedEventsByUser(Long userId) {
			        return eventRepository.countTotalEventsByUserAndAcceptation(userId, "true");
			    }
			    public long countEventsForUserInCurrentMonth(Long userId) {
			        YearMonth currentYearMonth = YearMonth.now();
			        int year = currentYearMonth.getYear();
			        int month = currentYearMonth.getMonthValue();
			        
			        return eventRepository.countEventsByUserAndMonth(userId, year, month);
			    }
			    public long calculateAcceptedRevenueForUserInCurrentMonth(Long userId) {
			        YearMonth currentYearMonth = YearMonth.now();
			        int year = currentYearMonth.getYear();
			        int month = currentYearMonth.getMonthValue();
			        
			        return eventRepository.calculateAcceptedRevenueForUserAndMonth(userId, year, month);
			    }
			    public double calculateAcceptedRevenuePercentageChangeForUser(Long userId) {
			        // Obtenez l'année et le mois actuels
			    	 YearMonth currentYearMonth = YearMonth.now();
			    	    int currentYear = currentYearMonth.getYear();
			    	    int currentMonth = currentYearMonth.getMonthValue();

			    	    // Obtenez le mois précédent
			    	    int previousMonth = currentMonth - 1;
			    	    int previousYear = currentYear;
			    	    if (previousMonth == 0) {
			    	        previousMonth = 12;
			    	        previousYear--;
			    	    }

			    	    // Calculez le revenu pour le mois actuel et le mois précédent
			    	    long currentMonthRevenue = eventRepository.calculateAcceptedRevenueForUserAndMonth(userId, currentYear, currentMonth);
			    	    long previousMonthRevenue = eventRepository.calculateAcceptedRevenueForUserAndPreviousMonth(userId, previousYear, previousMonth);

			    	    // Calculez le pourcentage de changement
			    	    if (previousMonthRevenue == 0) {
			    	        return 0; // Pour éviter la division par zéro
			    	    } else {
			    	        double percentageChange = ((double) currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100;
			    	        return Math.round(percentageChange); // Arrondir et convertir en long
			    	    }
			    }
			    public String calculateAcceptedRevenueChangeForUser(Long userId) {
			        // Obtenez le pourcentage de changement
			        double percentageChange = calculateAcceptedRevenuePercentageChangeForUser(userId);
			        
			        // Déterminez si le revenu a augmenté, diminué ou est resté inchangé
			        if (percentageChange > 0) {
			            return "Augmentation";
			        } else if (percentageChange < 0) {
			            return "Diminution";
			        } else {
			            return "Aucun changement";
			        }
		}
			    public List<Object[]> findAcceptedEventsByUserId(Long userId) {
			        return eventRepository.findAcceptedEventsByUserId(userId);
			    }
			    public String formatEventDate(Object[] event) {
			      
			        int day = (int) event[2];
			        int month = (int) event[1];
			        
			      
			        String[] monthNames = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
			        String monthName = monthNames[month - 1];
			        
			     
			        return day + " " + monthName;
			    }
			    public List<Event> getEventsByUserId(Long userId) {
			        return eventRepository.findByUserId(userId);
			    }
			    
			    public long countAcceptedEvents() {
			        List<Event> acceptedEvents = eventRepository.findAllByAcceptation("true");
			        return acceptedEvents.size();
			    }
			    public long countAcceptedEvents2() {
			        List<Event> acceptedEvents = eventRepository.findAllByAcceptation("false");
			        return acceptedEvents.size();
			    }
			    public List<Event> getAllEvents() {
			        List<Event> events = eventRepository.findAll();
			        events.forEach(event -> 
			            // Chargez le nom de l'utilisateur pour chaque événement
			            event.getUser().getUsername() // Supposons que getUsername() est une méthode dans votre modèle User qui renvoie le nom de l'utilisateur
			        );
			        return events;
			    }
			    public List<Event> getAllEventsWithAcceptationFalse() {
			        return eventRepository.findAllByAcceptation("false");
			    }
			    public List<Event> getLastTenEvents() {
			        return eventRepository.findTop10ByAcceptationOrderByAddedDateDesc();
			        
			    }
			    public void inscrireUtilisateurEvente(long userId, long eventeId) {
			        Optional<Event> optionalEvent = eventRepository.findById(eventeId);
			        if (optionalEvent.isPresent()) {
			            Event event = optionalEvent.get();
			            if (event.getUserevente().size() < event.getNbplace()) {
			                Optional<User> optionalUser = userRepository.findById(userId);
			                if (optionalUser.isPresent()) {
			                    User user = optionalUser.get();
			                    if (!event.getUserevente().contains(user)) {
			                        event.getUserevente().add(user);
			                        eventRepository.save(event);
			                    } else {
			                        throw new IllegalArgumentException("L'utilisateur avec l'ID : " + userId + " est déjà inscrit à cet événement");
			                    }
			                } else {
			                    throw new IllegalArgumentException("Utilisateur non trouvé avec l'ID : " + userId);
			                }
			            } else {
			                throw new IllegalArgumentException("Le nombre maximum d'utilisateurs est atteint pour cet événement");
			            }
			        } else {
			            throw new IllegalArgumentException("Événement non trouvé avec l'ID : " + eventeId);
			        }
			    }
			    public int countAcceptedEventsAfterCurrentDate() {
			        return eventRepository.countEventsAfterCurrentDateAndAccepted();
			    }
			    public Long countUsersByEventId(Long eventId) {
			        return eventRepository.countUsersByEventId(eventId);
			    }
			    public List<User> findUsersByEventId(Long eventId) {
			        return eventRepository.findUsersByEventId(eventId);
			    }
			    public int getNumberOfEventsByUserId(Long userId) {
			        return eventRepository.countByUsereventeId(userId);
			    }
			    
			    
			    public ResponseEntity<String> addLikeToEvent(Long userId, Long eventId) {
			        Optional<User> optionalUser = userRepository.findById(userId);
			        Optional<Event> optionalEvent = eventRepository.findById(eventId);
			        
			        if (optionalUser.isPresent() && optionalEvent.isPresent()) {
			            User user = optionalUser.get();
			            Event event = optionalEvent.get();

			            if (!event.getLikeEvente().contains(user)) {
			                event.getLikeEvente().add(user);
			                eventRepository.save(event);
			                return ResponseEntity.ok("Like ajouté avec succès à l'événement.");
			            } else {
			                return ResponseEntity.ok("L'utilisateur a déjà aimé cet événement.");
			            }
			        } else {
			            return ResponseEntity.notFound().build();
			        }
			    }
			    public void addliketoev(long userId, long eventId) {
			    	 Optional<Event> optionalEventte = eventRepository.findById(eventId);
			         if (optionalEventte.isPresent()) {
			        	 Event eventte = optionalEventte.get();
			        	  Optional<User> optionalUser = userRepository.findById(userId);
			              if (optionalUser.isPresent()) {
				                User user = optionalUser.get();
				                eventte.getLikeEvente().add(user);
				                eventRepository.save(eventte);
				            }else {
				                throw new IllegalArgumentException("Utilisateur non trouvé avec l'ID : " + userId);
				            }
				        } else {
				            throw new IllegalArgumentException("Classe non trouvée avec l'ID : " + eventId);
				        }
				    } 
			    public boolean isLiked(Long userId, Long eventId) {
			        Optional<Event> optionalEvent = eventRepository.findById(eventId);

			        if (optionalEvent.isPresent()) {
			            Event event = optionalEvent.get();
			            return event.getLikeEvente().stream().anyMatch(user -> user.getId().equals(userId));
			        }
			        return false;
			    }
			    public List<Object[]> findEventsByUserIdWithLikes(Long userId) {
			        return eventRepository.findEventsByUserIdWithLikes(userId);
			    }
			    public int countLikesByEventId(Long eventId) {
			        return eventRepository.countLikesByEventId(eventId);
			    }
}
