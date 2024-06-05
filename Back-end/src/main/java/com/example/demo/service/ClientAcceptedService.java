package com.example.demo.service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;

import com.example.demo.entity.ClientAccept;
import com.example.demo.entity.User;
import com.example.demo.repository.ClientAcceptedRepositery;
import com.example.demo.repository.UserRepositery;





@Service
public class ClientAcceptedService {

	
	
    private final ClientAcceptedRepositery ClientAcceptedRepositery;
    private final UserRepositery userRepositery;

   
    public ClientAcceptedService(ClientAcceptedRepositery acceptedRepositery, UserRepositery userRepositery) {
        this.ClientAcceptedRepositery = acceptedRepositery;
        this.userRepositery = userRepositery;
    }
	
	
	
	public long countAcceptedClientsByUserId(Long userId) {
	    return ClientAcceptedRepositery.countAcceptedClientsByUserId(userId);
	}
	public ClientAccept addComment(Long userId, ClientAccept clientaccept) {
	    // Recherche de l'événement par son ID
	User user = userRepositery.findById(userId)
	        .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + userId));
	clientaccept.setAddedDate(new java.sql.Date(System.currentTimeMillis()));
	    
	    // Association de l'événement au commentaire
	clientaccept.setUser(user);
	    
	    // Enregistrement du commentaire
	    return ClientAcceptedRepositery.save(clientaccept);
	}

	public List<ClientAccept> getClientAcceptsByUserId(Long userId) {
	    return ClientAcceptedRepositery.findByUserId(userId);
	}


	}
