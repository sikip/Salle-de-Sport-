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

import com.example.demo.entity.Comment;
import com.example.demo.service.CommentService;



@CrossOrigin(origins = "*")
@RestController
public class CommentController {
	@Autowired
  CommentService commentService;
	@GetMapping("/commantaire-count")
	public long getNumberClients() {
		return commentService.getNumberCommantaire();
	}


	@GetMapping(value = "/getcommentaire")
	public List<Comment> getcommentaire() {
		return commentService.getcommentaire();
	}
	@PostMapping("/{eventId}/comments")
	public ResponseEntity<Comment> addComment(@PathVariable Long eventId, @RequestBody Comment commentaire) {
	    Comment savedCommentaire = commentService.addComment(eventId, commentaire);
	    return new ResponseEntity<>(savedCommentaire, HttpStatus.CREATED);
	}
	@GetMapping("/commentaires/{eventId}")
	public List<Comment> getCommentairesByEventId(@PathVariable Long eventId) {
	    return commentService.getCommentairesByEventId(eventId);
	}
	@GetMapping("/withEventName")
	public List<Comment> getAllCommentaires() {
	    return commentService.getAllCommentaire();
	}

	}
