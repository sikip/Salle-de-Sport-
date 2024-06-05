package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.ChopRepositery;
import com.example.demo.repository.ClassesRepoitery;
import com.example.demo.repository.EventRepositery;
import com.example.demo.repository.UserRepositery;



@Service
public class SearchService {
	@Autowired
	EventRepositery eventRepositery;
	@Autowired
	UserRepositery userRepositery;
	@Autowired
	ClassesRepoitery classesRepoitery;
	@Autowired
	ChopRepositery chopRepositery;
	 public List<Object> search(String query) {
	        List<Object> results = new ArrayList<>();
	        results.addAll(eventRepositery.findByNomStartingWith(query));
	        results.addAll(userRepositery.findByUsernameStartingWith(query));
	        results.addAll(classesRepoitery.findByNameStartingWith(query));
	        return results;
	    }
	 public List<Object> searchuser(String query){
		 List<Object> results = new ArrayList<>();
	        results.addAll(userRepositery.findByUsernameStartingWith(query));    
	        return results;
	    }
	 public List<Object> searchop(String query){
		 List<Object> results = new ArrayList<>();
	        results.addAll(chopRepositery.findByNameStartingWith(query));    
	        return results;
	    }
}


