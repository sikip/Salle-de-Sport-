package com.example.demo.service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Event;
import com.example.demo.repository.CommentRepositery;
import com.example.demo.repository.EventRepositery;





@Service
public class CommentService {
	   private final CommentRepositery commentRepositery;
	    private final EventRepositery eventRepositery;

	    
	    public CommentService(CommentRepositery commentRepositery, EventRepositery eventRepositery) {
	        this.commentRepositery = commentRepositery;
	        this.eventRepositery = eventRepositery;
	    }
	
		public long getNumberCommantaire() {
		
			return commentRepositery.count();
		}


		public List<Comment> getcommentaire() {
	
			return commentRepositery.findAll();
		}
	
		 public Comment addComment(Long eventId, Comment commentaire) {
		        // Recherche de l'événement par son ID
	        Event event = eventRepositery.findById(eventId)
	                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));
		        commentaire.setAddedDate(new java.sql.Date(System.currentTimeMillis()));
		        
		        // Association de l'événement au commentaire
		        commentaire.setEvent(event);
		        
		        // Enregistrement du commentaire
		        return commentRepositery.save(commentaire);
		    }
		   public List<Comment> getCommentairesByEventId(Long eventId) {
		        return commentRepositery.findByEventId(eventId);
		    }
		    public List<Comment> getAllCommentaire() {
		        List<Comment> commentaire = commentRepositery.findAll();
		        commentaire.forEach(comme -> {
		            // Chargez le nom de l'utilisateur pour chaque événement
		        	comme.getEvent().getNom(); // Supposons que getUsername() est une méthode dans votre modèle User qui renvoie le nom de l'utilisateur
		        });
		        return commentaire;
		    }
		
	}
