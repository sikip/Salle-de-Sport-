package com.example.demo.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.swing.text.Document;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.ClientExperienc;
import com.example.demo.entity.Room;
import com.example.demo.repository.ClientExperiencerepositery;
import com.example.demo.repository.RoomRepositery;

@Service
public class ClientExperienceService {
@Autowired
ClientExperiencerepositery clientExperiencerepositery;
@Autowired
RoomRepositery roomRepositery;

public void addAcceptedClientExperience(ClientExperienc clientExperience) {
	 Room room = roomRepositery.findById(1L).orElse(null); 
     if (room != null) {
         clientExperience.setUserRoom(room);
         clientExperiencerepositery.save(clientExperience);
     } 
	
}
public void updateImagesById(Long id, MultipartFile image, MultipartFile image2) throws IOException {
	
	
	ClientExperienc clientExperience = clientExperiencerepositery.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Event with ID " + id + " not found"));

    if (image != null && !image.isEmpty()) {
    	clientExperience.setImage(image.getBytes());
    } else {
        throw new IllegalArgumentException("Image file  is empty");
    }

    if (image2 != null && !image2.isEmpty()) {
    	clientExperience.setImage2(image2.getBytes());
    } else {
        throw new IllegalArgumentException("Image file 2 is empty");
    }

    clientExperiencerepositery.save(clientExperience);
}
public List<ClientExperienc> getAllClientExperiences() {
    return clientExperiencerepositery.findAll();
}

}
