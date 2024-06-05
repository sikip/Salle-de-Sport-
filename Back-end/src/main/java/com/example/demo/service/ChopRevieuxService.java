package com.example.demo.service;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Chop;
import com.example.demo.entity.ChopRevieux;
import com.example.demo.entity.User;
import com.example.demo.repository.ChopRepositery;
import com.example.demo.repository.ChopRevieuxrepositery;
import com.example.demo.repository.UserRepositery;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;



@Service
public class ChopRevieuxService {
	@Autowired
	ChopRevieuxrepositery chopRevieuxrepositery;
	@Autowired
	ChopRepositery chopRepositery;
	@Autowired
	UserRepositery userRepositery;
	
	public String ajouterRevieux(long userId, long id, String commentaire) {
	    try {
	        // Utilisez un ObjectMapper pour mapper le JSON à un objet Java
	        ObjectMapper objectMapper = new ObjectMapper();

	        // Mapper le JSON à un objet Map
	        Map<String, String> commentaireMap = objectMapper.readValue(commentaire, new TypeReference<Map<String, String>>() {});

	        // Récupérer la valeur de la clé "commentaire"
	        String commentaireString = commentaireMap.get("commentaire");

	        // Recherche de l'utilisateur et du chop dans la base de données
	        User user = userRepositery.findById(userId).orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé avec ID: " + userId));
	        Chop chop = chopRepositery.findById(id).orElseThrow(() -> new IllegalArgumentException("Chop non trouvé avec ID: " + id));
	    
	        // Création de l'avis (revieux)
	       ChopRevieux chopRevieux = new ChopRevieux();
	        chopRevieux.setCommentaire(commentaireString);
	        chopRevieux.setUser(user);
	        chopRevieux.setChop(chop);
	        chopRevieux.setAddedDate(new Timestamp(System.currentTimeMillis()));
	        // Enregistrement de l'avis dans la base de données
	       ChopRevieux savedRevieux = chopRevieuxrepositery.save(chopRevieux);
	    
	        // Renvoyer le contenu du commentaire sauvegardé
	        return savedRevieux.getCommentaire();
	    } catch (Exception e) {
	        // Gérer les erreurs
	        return "Une erreur s'est produite lors de l'extraction du commentaire : " + e.getMessage();
	    }
	}
	public int getReviewsCountByChopId(long chopId) {
	    return chopRevieuxrepositery.countByChopId(chopId);
	}
	public List<ChopRevieux> getChopRevieuxByChopId(long chopId) {
	    try {
	        return chopRevieuxrepositery.findByChopId(chopId);
	    } catch (Exception e) {
	        // Log the exception or handle it accordingly
	        e.printStackTrace();
	        return Collections.emptyList(); // or throw a custom exception
	    }
	}
	    }





