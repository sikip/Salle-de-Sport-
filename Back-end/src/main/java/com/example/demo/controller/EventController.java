package com.example.demo.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Event;
import com.example.demo.errore.EventError;
import com.example.demo.service.EventService;





@CrossOrigin(origins = "*")
@RestController
public class EventController {

    private final EventService eventService;



    public EventController(EventService eventService) {
        this.eventService = eventService;
  
    }
    
    @Value("${project.video}")
    private String path;
    
    @GetMapping(value = "/getevent")
    public List<Event> getAllEvent(){
    	return eventService.getAllEvent();
    }
    @GetMapping(value = "/getallevent")
    public List<Event> getAllEvent2(){
    	return eventService.getAllEvent2();
    }
    @PostMapping(value ="/addevent")
    public ResponseEntity<Event> addsalle (@ModelAttribute Event eventtes ,
            @RequestParam("imageFile1") MultipartFile imageFile1) throws EventError{

    	Event  savedevent = eventService.addEvente(eventtes,imageFile1);
    return ResponseEntity.ok(savedevent);
    }
    @GetMapping("/findByidEvente/{id}")
    public ResponseEntity<Event> getVoitureById(@PathVariable Long id) {
    	Event eventtes = eventService.getEventtesById(id);
        if (eventtes != null) {
            return ResponseEntity.ok(eventtes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/eventsimage2/{id}")
    public ResponseEntity<String> updateImage2ById(
            @PathVariable Long id,
            @RequestParam("image") MultipartFile image) {
        
        try {
        	eventService.updateImage2ById(id, image);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Image2 updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to read image file");
        }
    }
    @PostMapping("/eventsimagetitle/{id}")
    public ResponseEntity<String> updateImageTitleById(
            @PathVariable Long id,
            @RequestParam("image2") MultipartFile image2) {
        
        try {
        	eventService.updateImageTitleById(id, image2);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Image2 updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to read image file");
        }
    }
    @PostMapping("/{id}/images34")
    public ResponseEntity<String> updateImagesById(@PathVariable Long id,
                                                   @RequestParam("imageFile3") MultipartFile imageFile3,
                                                   @RequestParam("imageFile4") MultipartFile imageFile4) {
        try {
        	eventService.updateImagesById(id, imageFile3, imageFile4);
            return ResponseEntity.ok("Images updated successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update images");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @GetMapping("/passed")
    public List<Event> getEventsWithPassedDate() {
        return eventService.findEventsByAddedDatePassed();
    }
    
    @PostMapping("/evcotch/{userId}")
    public ResponseEntity<Event> addEvent(@RequestBody Event event, @PathVariable Long userId) {
        Event savedEvent = eventService.createEvent(event, userId);
        return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
    }
    @GetMapping("/{eventId}/cautch-details")
    public ResponseEntity<Map<String, Object>> getCautchDetailsByEventId(@PathVariable Long eventId) {
    	 Map<String, Object> userDetails = eventService.getCautchDetailsByEventId(eventId);
         if (!userDetails.isEmpty()) {
             return ResponseEntity.ok(userDetails);
         } else {
             return ResponseEntity.notFound().build();
         }
     }
    @GetMapping("/event-count")
    public long getNumberEvent() {
    	return eventService.getNumberEvent();
    }
    @PutMapping("/eventtes/{eventId}")
    public ResponseEntity<String> updateAcceptationById(@PathVariable Long eventId, @RequestBody String acceptation) {
        try {
        	eventService.insererAcceptationParId(eventId, acceptation);
            return new ResponseEntity<>("Acceptation mise à jour avec succès.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Une erreur s'est produite lors de la mise à jour de l'acceptation.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/eventmois/{userId}")
    public ResponseEntity<Map<String, Integer>> countEventsByUserAndMonth(@PathVariable Long userId) {
        Map<String, Integer> eventCounts = eventService.countEventsByUserAndMonth(userId);
        return ResponseEntity.ok(eventCounts);
    }
    @GetMapping("/count/{userId}")
    public long countTotalEventsByUser(@PathVariable Long userId) {
        return eventService.countTotalEventsByUser(userId);
    }
    @GetMapping("/calculate/{userId}")
    public Long calculateUserEarnings(@PathVariable Long userId) {
        return eventService.calculateUserEarnings(userId);
    }
    @GetMapping("/eventsacepted/{userId}")
    public ResponseEntity<Long> countAcceptedEventsByUser(@PathVariable Long userId) {
        long acceptedCount = eventService.countAcceptedEventsByUser(userId);
        return new ResponseEntity<>(acceptedCount, HttpStatus.OK);
    }
    @GetMapping("/eventsMoi/{userId}")
    public ResponseEntity<Long> countEventsForUserInCurrentMonth(@PathVariable Long userId) {
        long eventCount = eventService.countEventsForUserInCurrentMonth(userId);
        return new ResponseEntity<>(eventCount, HttpStatus.OK);
    }
    @GetMapping("/eventsaceptedsalaire/{userId}")
    public ResponseEntity<Long> calculateAcceptedRevenueForUserInCurrentMonth(@PathVariable Long userId) {
        long acceptedRevenue = eventService.calculateAcceptedRevenueForUserInCurrentMonth(userId);
        return new ResponseEntity<>(acceptedRevenue, HttpStatus.OK);
    }
    @GetMapping("/eventsper/{userId}")
    public ResponseEntity<Double> calculateAcceptedRevenueChangePercentage(@PathVariable Long userId) {
        double percentageChange = eventService.calculateAcceptedRevenuePercentageChangeForUser(userId);
        return new ResponseEntity<>(percentageChange, HttpStatus.OK);
    }
    @GetMapping("/eventsindice/{userId}")
    public ResponseEntity<Map<String, String>> calculateAcceptedRevenueChangeForUser(@PathVariable Long userId) {
        String revenueChange = eventService.calculateAcceptedRevenueChangeForUser(userId);
        Map<String, String> response = new HashMap<>();
        response.put("revenueChange", revenueChange);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/nomeventaccept/{userId}")
    public List<Object[]> getAcceptedEventsByUserId(@PathVariable Long userId) {
        List<Object[]> events = eventService.findAcceptedEventsByUserId(userId);
        
        // Formater la date pour chaque événement
        for (Object[] event : events) {
            String formattedDate = eventService.formatEventDate(event);
            event[1] = formattedDate; // Remplacer la date originale par la date formatée
        }
        
        return events;
    }
    @GetMapping("/userevents/{userId}")
    public List<Event> getEventsByUserId(@PathVariable Long userId) {
        return eventService.getEventsByUserId(userId);
    }

    @GetMapping("/totalaccepted")
    public long countAcceptedEvents() {
        return eventService.countAcceptedEvents();
    }
    @GetMapping("/eventfalse")
    public long countAcceptedEvents2() {
        return eventService.countAcceptedEvents2();
    }
    @GetMapping("/getall")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }
    @GetMapping("/false")
    public List<Event> getEventsWithAcceptationFalse() {
        return eventService.getAllEventsWithAcceptationFalse();
    }
    @GetMapping("/lastAccepted")
    public List<Event> getLastTenEvents() {
        return eventService.getLastTenEvents();
    }
    @PostMapping("/inscriptionevent/{userId}/{eventeId}")
    public ResponseEntity<String> inscrireUtilisateurAClasse(@PathVariable long userId, @PathVariable long eventeId) {
    	eventService.inscrireUtilisateurEvente(userId, eventeId);
        return new ResponseEntity<>("User successfully registered for evente", HttpStatus.OK);
    }
    @GetMapping("/events/countAfterDate")
    public int countAcceptedEventsAfterCurrentDate() {
        return eventService.countAcceptedEventsAfterCurrentDate();
    }
    @GetMapping("/eventsuser/{eventId}")
    public Long countUsersByEventId(@PathVariable Long eventId) {
        return eventService.countUsersByEventId(eventId);
    }
    @GetMapping("/eventuser2/{eventId}")
    public ResponseEntity<List<com.example.demo.entity.User>> getUsersByEventId(@PathVariable Long eventId) {
        List<com.example.demo.entity.User> users = eventService.findUsersByEventId(eventId);
        return ResponseEntity.ok(users);
    }
    @GetMapping("/userevv/{userId}")
    public ResponseEntity<Integer> getNumberOfEventsByUserId(@PathVariable Long userId) {
        int eventsCount = eventService.getNumberOfEventsByUserId(userId);
        return new ResponseEntity<>(eventsCount, HttpStatus.OK);
    }
    @PostMapping("/{userId}/{eventId}/like")
    public ResponseEntity<String> likeEvent(@PathVariable Long eventId, @PathVariable Long userId) {
    	eventService.addLikeToEvent(userId, eventId);
        return ResponseEntity.ok("Like ajouté avec succès à l'événement.");
    }
    @PostMapping("/inscriptioniv/{userId}/{eventId}")
    public ResponseEntity<String> addliketoev(@PathVariable long userId, @PathVariable long eventId) {
    	eventService.addliketoev(userId, eventId);
        return new ResponseEntity<>("User successfully registered for class", HttpStatus.OK);
    }
    @GetMapping("/checkIfLiked/{userId}/{eventId}")
    public ResponseEntity<Boolean> checkIfLiked(@PathVariable Long userId, @PathVariable Long eventId) {
        boolean isLiked = eventService.isLiked(userId, eventId);
        return ResponseEntity.ok(isLiked);
    }
    @GetMapping("/userlikeev/{userId}")
    public List<Object[]> getEventsWithLikesByUserId(@PathVariable Long userId) {
        return eventService.findEventsByUserIdWithLikes(userId);
    }
    @GetMapping("/likesnumber/{eventId}")
    public int countLikesByEventId(@PathVariable Long eventId) {
        return eventService.countLikesByEventId(eventId);
    }
    }


