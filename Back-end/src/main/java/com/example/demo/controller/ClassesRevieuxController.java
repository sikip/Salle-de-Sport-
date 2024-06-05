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

import com.example.demo.entity.ClassesRevieux;
import com.example.demo.service.ClassesRevieuxService;

@CrossOrigin(origins = "*")
@RestController
public class ClassesRevieuxController {
	@Autowired
    private ClassesRevieuxService ClassesRevieuxService;

    @PostMapping("/classesRevieux/{classesId}/{userId}")
    public ResponseEntity<String> ajouterRevieux(
            @PathVariable("userId") long userId,
            @PathVariable("classesId") long classesId,
            @RequestBody String comment) {

        try {
            String savedCommentaire = ClassesRevieuxService.addReview(userId, classesId, comment);
            return ResponseEntity.ok(savedCommentaire);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }
    @GetMapping("/getclassesRevieux")
    public List<ClassesRevieux> getAllrevieuxclasses() {
        return ClassesRevieuxService.getAllrevieuxclasses();
    }
}
