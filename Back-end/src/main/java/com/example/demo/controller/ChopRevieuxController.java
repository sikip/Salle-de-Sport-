package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ChopRevieux;
import com.example.demo.service.ChopRevieuxService;



@CrossOrigin(origins = "*")
@RestController
public class ChopRevieuxController {

	  @Autowired
	  ChopRevieuxService choprevieuxservice;
	  
	  @Autowired
	  ChopRevieuxService choprevieux;

	  
	  
	    @PostMapping("/revieuxchop/{userId}/{id}")
	    public ResponseEntity<String> ajouterRevieux(
	            @PathVariable("userId") long userId,
	            @PathVariable("id") long id,
	            @RequestBody String commentaire) {

	        try {
	            String savedCommentaire = choprevieuxservice.ajouterRevieux(userId, id, commentaire);
	            return ResponseEntity.ok(savedCommentaire);
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
	        }
	    }
	    @GetMapping("/choprevcount/{id}")
	    public ResponseEntity<Integer> getReviewsCountByChopId(@PathVariable("id") long chopId) {
	        int reviewsCount = choprevieuxservice.getReviewsCountByChopId(chopId);
	        return ResponseEntity.ok(reviewsCount);
	    }
	    
	    @GetMapping("/findrevieuxByChopId/{id}")
	    public ResponseEntity<List<ChopRevieux>> getChopRevieuxByChopId(@PathVariable long id) {
	        try {
	            List<ChopRevieux> chopRevieuxList = choprevieuxservice.getChopRevieuxByChopId(id);
	            return ResponseEntity.ok(chopRevieuxList);
	        } catch (Exception e) {
	            // Log the exception or handle it accordingly
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	    }
	}


