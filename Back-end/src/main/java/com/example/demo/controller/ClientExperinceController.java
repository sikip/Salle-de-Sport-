package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.ClientExperienc;
import com.example.demo.service.ClientExperienceService;

@CrossOrigin(origins = "*")
@RestController
public class ClientExperinceController {
@Autowired
ClientExperienceService clientExperienceService;

@PostMapping("/clientexperiences")
public void addClientExperience(@RequestBody com.example.demo.entity.ClientExperienc ClientExperienc) {
    clientExperienceService.addAcceptedClientExperience(ClientExperienc);
}
@PostMapping("/clientexperiences/{id}")
public void updateImagesById(
        @RequestParam("image") MultipartFile image,
        @RequestParam("image2") MultipartFile image2,
        @PathVariable("id") Long id) throws IOException {
    
    clientExperienceService.updateImagesById(id, image, image2);
}
@GetMapping("/allexperience")
public List<ClientExperienc> getAllClientExperiences() {
    return clientExperienceService.getAllClientExperiences();
}
}
