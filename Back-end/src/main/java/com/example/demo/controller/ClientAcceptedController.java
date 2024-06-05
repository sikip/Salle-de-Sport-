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

import com.example.demo.entity.ClientAccept;
import com.example.demo.service.ClientAcceptedService;




@CrossOrigin(origins = "*")
@RestController
public class ClientAcceptedController {
	@Autowired
	ClientAcceptedService clientacceptservice;

	@GetMapping("/acceptedclient/{userId}")
	public long countAcceptedClientsByUserId(@PathVariable Long userId) {
	    return clientacceptservice.countAcceptedClientsByUserId(userId);
	}
	@PostMapping("/{userId}/vlient")
	public ResponseEntity<ClientAccept> addComment(@PathVariable Long userId, @RequestBody ClientAccept clientaccept) {
		ClientAccept clientaccept2 = clientacceptservice.addComment(userId, clientaccept);
	    return new ResponseEntity<>(clientaccept2, HttpStatus.CREATED);
	}
	@GetMapping("/useracept/{userId}")
	public List<ClientAccept> getClientAcceptsByUserId(@PathVariable Long userId) {
	    return clientacceptservice.getClientAcceptsByUserId(userId);
	}

	 }
