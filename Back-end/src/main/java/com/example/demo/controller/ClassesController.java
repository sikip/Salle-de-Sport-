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

import com.example.demo.entity.Classes;
import com.example.demo.entity.User;
import com.example.demo.service.ClassesService;



@CrossOrigin(origins = "*")
@RestController
public class ClassesController {
	@Autowired
	ClassesService classesService;
	
	@PostMapping("/addclass")
	public Classes addclasses(@RequestBody Classes classes) {
		classes.setDate(new java.util.Date());
		return classesService.addclasses(classes);
	}

	@GetMapping("/classes")
	public List<Classes> getAllClasses() {
	    return classesService.getAllClasses();
	}
	@PostMapping("/inscription/{userId}/{classeId}")
	public ResponseEntity<String> inscrireUtilisateurAClasse(@PathVariable long userId, @PathVariable long classeId) {
		classesService.inscrireUtilisateurAClasse(userId, classeId);
	    return new ResponseEntity<>("User successfully registered for class", HttpStatus.OK);
	}

	@GetMapping("/userclasse/{userId}")
	public ResponseEntity<List<Classes>> getClassesByUserId(@PathVariable long userId) {
	    List<Classes> classes = classesService.findClassesByUserId(userId);
	    if (!classes.isEmpty()) {
	        return new ResponseEntity<>(classes, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}

	@GetMapping("/countclasse/{userId}")
	public int countClassesByUserId(@PathVariable long userId) {
	    return classesService.countClassesByUserId(userId);
	}
	@GetMapping("/classe/{id}")
	public ResponseEntity<Object> getClasseById(@PathVariable Long id) {
	    Classes classe = classesService.getClasseByID(id);
	    if (classe != null) {
	        return new ResponseEntity<>(classe, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>("Classe avec l'ID " + id + " non trouvé.", HttpStatus.NOT_FOUND);
	    }
	}
	@GetMapping("/countuserclasse/{classeId}")
	public ResponseEntity<Long> countUsersByClasseId(@PathVariable Long classeId) {
	    long userCount = classesService.countUsersByClasseId(classeId);
	    return ResponseEntity.ok(userCount);
	}
	@GetMapping("/usersclasseassocier/{classeId}")
	public ResponseEntity<List<User>> getUsersByClasseId(@PathVariable Long classeId) {
	    List<User> users = classesService.getUsersByClasseId(classeId);
	    return new ResponseEntity<>(users, HttpStatus.OK);
	}
	
	
	
	}
