package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Message;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepositery;
import com.example.demo.service.MessageService;





@CrossOrigin(origins = "*")
@RestController
public class MessageController {

	
	
	private final MessageService messageService;
	private final UserRepositery userRepositery;


	public MessageController(MessageService messageService, UserRepositery userRepositery) {
	    this.messageService = messageService;
	    this.userRepositery = userRepositery;
	}
	 @PostMapping("/send-message/{userId}/{recipientId}")
	    public ResponseEntity<String> sendMessage(
	            @PathVariable Long userId,
	            @PathVariable Long recipientId,
	            @RequestBody String messageContent) {

	        // Utilisez findById pour obtenir les utilisateurs expéditeur et destinataire
	        User sender = userRepositery.findById(userId).orElse(null);
	        User recipient = userRepositery.findById(recipientId).orElse(null);

	        if (sender != null && recipient != null) {
	            Message message = new Message();
	            message.setSender(sender);
	            message.setRecipient(recipient);
	            messageService.sendMessage(sender, recipient, messageContent);
	            
	            return ResponseEntity.ok("Message sent successfully.");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
	        }
	    }
	    @GetMapping("/message/{userId}/{recipientId}")
	    public List<Message> getMessagesBySenderIdAndRecipientId(@PathVariable Long userId, @PathVariable Long recipientId) {
	        return messageService.getMessagesBySenderIdAndRecipientId(userId, recipientId);
	    }
	    @GetMapping("/message2/{recipientId}/{userId}")
	    public List<Message> getMessagesByRecipientIdAndSenderId(@PathVariable Long recipientId, @PathVariable Long userId) {
	        return messageService.getMessagesBySenderIdAndRecipientId(recipientId, userId);
	    }
	}


