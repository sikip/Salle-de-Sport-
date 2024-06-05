package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Classes;
import com.example.demo.entity.ClassesRevieux;
import com.example.demo.entity.User;
import com.example.demo.repository.ClassesRepoitery;
import com.example.demo.repository.ClassesRevieuxRepositery;
import com.example.demo.repository.UserRepositery;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ClassesRevieuxService {

	 @Autowired
	    private UserRepositery userRepositery;

	    @Autowired
	    private ClassesRepoitery classesRepository;

	    @Autowired
	    private ClassesRevieuxRepositery  ClassesRevieuxRepositery;


	    
	    public String addReview(long userId, long classesId, String jsonInput) {
	        try {
	            ObjectMapper objectMapper = new ObjectMapper();
	            Map<String, String> jsonMap = objectMapper.readValue(jsonInput, new TypeReference<Map<String, String>>() {});
	            String comment = jsonMap.get("comment");

	            User user = userRepositery.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
	            Classes classes = classesRepository.findById(classesId).orElseThrow(() -> new IllegalArgumentException("Classes not found with ID: " + classesId));

	            ClassesRevieux review = new ClassesRevieux();
	            review.setComment(comment);
	            review.setUser(user);
	            review.setClasses(classes);

	            ClassesRevieux savedReview = ClassesRevieuxRepositery.save(review);

	            return "Review added successfully";
	        } catch (JsonProcessingException e) {
	            return "Error processing JSON: " + e.getMessage();
	        } catch (IllegalArgumentException e) {
	            return e.getMessage();
	        } catch (Exception e) {
	            return "An error occurred while adding the review: " + e.getMessage();
	        }
	    }
	    public List<ClassesRevieux> getAllrevieuxclasses() {
	        return ClassesRevieuxRepositery.findAll();
	    }
}