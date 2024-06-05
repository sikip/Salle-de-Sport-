package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Classes;
import com.example.demo.entity.Event;
import com.example.demo.entity.Vedeo;
import com.example.demo.errore.Resourcenotfounexecption;
import com.example.demo.repository.ClassesRepoitery;
import com.example.demo.repository.EventRepositery;
import com.example.demo.repository.VedeoRepositery;



@Service
public class VedeoService {
    private final VedeoRepositery vedeoRepositery;
    private final EventRepositery eventRepositery;
    private final ClassesRepoitery classesRepoitery;
   
    public VedeoService(VedeoRepositery vedeoRepositery, EventRepositery eventRepositery,ClassesRepoitery classesRepoitery) {
        this.vedeoRepositery = vedeoRepositery;
        this.eventRepositery = eventRepositery;
        this.classesRepoitery = classesRepoitery;
    }

 
    public Vedeo createPost(Vedeo video) {
        if (video.getTitle() == null || video.getTitle().isEmpty()) {
            throw new com.example.demo.errore.Resourcenotfounexecption(false, "Video title cannot be empty");
        }
        try {
        	video.setAddedDate(new java.sql.Date(System.currentTimeMillis()));
            return vedeoRepositery.save(video);
        } catch (Exception e) {
            throw new Resourcenotfounexecption(false, "Something  wrong");
        }
    }

  
    	public Vedeo getbyID(Long id) {

    		return vedeoRepositery.findById(id).orElseThrow(()-> new Resourcenotfounexecption(false,"vedeo id not found"));
    	}

    	
    	public Vedeo updatepost(Vedeo vedeoentity, Long id) {

    		Vedeo video = vedeoRepositery.findById(id).orElseThrow(()-> new Resourcenotfounexecption(false,"vedeo id not found"));
    		video.setDescrption(vedeoentity.getDescrption());
    		video.setTitle(vedeoentity.getTitle());
    		video.setTags(vedeoentity.getTags());
    		return vedeoRepositery.save(video);
    	}

    


    	
    	public List<Vedeo> getallpost() {

    		return vedeoRepositery.findAll();
    	}
    	
    	
    	 public Vedeo createPost( Long id,Vedeo vedeoentity) {
    	        if (vedeoentity.getTitle() == null || vedeoentity.getTitle().isEmpty()) {
    	            throw new Resourcenotfounexecption(false, "Video title cannot be null or empty");
    	        }
    	        try {
    	            // Récupérer l'événement par son ID
    	            Optional<Event> eventOptional = eventRepositery.findById(id);
    	            if (!eventOptional.isPresent()) {
    	                throw new Resourcenotfounexecption(false, "Event not found with id: " + id);
    	            }
    	            
    	            // Associer l'événement à la vidéo
    	            Event event = eventOptional.get();
    	            vedeoentity.setEvent(event);
    	            
    	            // Enregistrer la vidéo
    	            vedeoentity.setAddedDate(new java.sql.Date(System.currentTimeMillis()));
    	            return vedeoRepositery.save(vedeoentity);
    	        } catch (Exception e) {
    	            throw new Resourcenotfounexecption(false, "Something went wrong");
    	        }
    	    }
    	
    	 
    	 
    	 public Vedeo updatepost2( Long id,  Vedeo vedeoentity ) {
    		    // Rechercher la vidéo par son ID
    		 Vedeo existingVideo = vedeoRepositery.findById(id)
    		            .orElseThrow(() -> new Resourcenotfounexecption(false, "Video not found with id: " + id));

    		    // Mettre à jour les champs de la vidéo avec les nouvelles valeurs
    		    existingVideo.setDescrption(vedeoentity.getDescrption());
    		    existingVideo.setTitle(vedeoentity.getTitle());
    		    existingVideo.setTags(vedeoentity.getTags());
    		    // Ajouter d'autres champs à mettre à jour si nécessaire

    		    // Enregistrer les modifications dans la base de données
    		    return vedeoRepositery.save(existingVideo);
    		} 
    	 public Vedeo createPost2( Long classeID,Vedeo vedeoentity) {
    	        if (vedeoentity.getTitle() == null || vedeoentity.getTitle().isEmpty()) {
    	            throw new Resourcenotfounexecption(false, "Video title cannot be null or empty");
    	        }
    	        try {
    	            // Récupérer l'événement par son ID
    	            Optional<Classes> eventOptional = classesRepoitery.findById(classeID);
    	            if (!eventOptional.isPresent()) {
    	                throw new Resourcenotfounexecption(false, "Event not found with id: " + classeID);
    	            }
    	            
    	            // Associer l'événement à la vidéo
    	            Classes classe = eventOptional.get();
    	            vedeoentity.setClasse(classe);
    	            
    	            // Enregistrer la vidéo
    	            vedeoentity.setAddedDate(new java.sql.Date(System.currentTimeMillis()));
    	            return vedeoRepositery.save(vedeoentity);
    	        } catch (Exception e) {
    	            throw new Resourcenotfounexecption(false, "Something went wrong");
    	        }
    	    }
    	 
    	 
    }

    
    
    
    

