package com.example.demo.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.engine.jdbc.StreamUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Vedeo;
import com.example.demo.entitydto.FileModel;
import com.example.demo.repository.VedeoRepositery;
import com.example.demo.service.FileService;
import com.example.demo.service.VedeoService;









@CrossOrigin(origins = "*")
@RestController
public class VedeoController {
	 @Value("${project.video}")
	    private String path;
	    private final FileService fileService;
	    private final VedeoService vedeoService;
	    private final VedeoRepositery vedeoRepositery;
	    


	    public VedeoController(FileService fileService, VedeoService vedeoService, VedeoRepositery vedeoRepositery) {
	        this.fileService = fileService;
	        this.vedeoService = vedeoService;
	        this.vedeoRepositery = vedeoRepositery;
	    }
	    

	    @PostMapping("/save")
	    public ResponseEntity<Object> saveVideo(@RequestBody Vedeo vedeoentity) {
	        return new ResponseEntity<>(vedeoService.createPost(vedeoentity), HttpStatus.OK);
	    }

	    @GetMapping("/allvideo")
	    public ResponseEntity<List<Vedeo>> getAllVideo() {
	        return new ResponseEntity<>(vedeoService.getallpost(), HttpStatus.OK);
	    }

	    @GetMapping("/videos/{id}")
	    public Vedeo getVedeoById(@PathVariable long id) {
	        return vedeoService.getbyID(id);
	    }

	    @PostMapping("/post/{id}")
	    public Vedeo uploadVideo(@RequestParam("video") MultipartFile video, @PathVariable long id) throws IOException {
	    	Vedeo v = vedeoService.getbyID(id);
	        FileModel fileModel = fileService.uploadvideo(path, video);
	        v.setVideoName(fileModel.getVideoFileName());
	        return vedeoService.updatepost(v, id);
	    }

	    @GetMapping(value = "/play/{id}")
	    public void playVideo(@PathVariable long id, HttpServletResponse response) throws IOException {
	        Optional<Vedeo> video = vedeoRepositery.findById(id);
	        if (video.isPresent()) {
	            InputStream resource = fileService.getVideoFile(path, video.get().getVideoName(), id);
	            response.setContentType(org.springframework.http.MediaType.ALL_VALUE);
	            StreamUtils.copy(resource, response.getOutputStream());
	        }
	    }
	    
	    @PostMapping("/vedeo/{id}")
	    public ResponseEntity<Vedeo> createPost(@PathVariable Long id, @RequestBody Vedeo vedeoentity) {
	    	Vedeo savedVedeoentity = vedeoService.createPost(id, vedeoentity);
	        return new ResponseEntity<>(savedVedeoentity, HttpStatus.CREATED);
	    }
	    @PostMapping("/update2/{id}")
	    public ResponseEntity<Vedeo> updatePost(@PathVariable Long id, @RequestBody Vedeo vedeoentity) {
	    	Vedeo updatedVedeo = vedeoService.updatepost2(id, vedeoentity);
	        return new ResponseEntity<>(updatedVedeo, HttpStatus.OK);
	    }
	    @GetMapping(value = "/playVideoByEventId/{eventId}")
	    public void playVideo2(@PathVariable long eventId, HttpServletResponse response) throws IOException {
	        Optional<Vedeo> video = vedeoRepositery.findByEventId(eventId);
	        if (video.isPresent()) {
	            InputStream resource = fileService.getVideoFile(path, video.get().getVideoName(), eventId);
	            response.setContentType(org.springframework.http.MediaType.ALL_VALUE);
	            StreamUtils.copy(resource, response.getOutputStream());
	        }
	    }
	    @PostMapping("/vedeo2/{classeID}")
	    public ResponseEntity<Vedeo> createPost2(@PathVariable Long classeID, @RequestBody Vedeo vedeoentity) {
	    	Vedeo savedVedeoentity = vedeoService.createPost2(classeID, vedeoentity);
	        return new ResponseEntity<>(savedVedeoentity, HttpStatus.CREATED);
	    }
	    @GetMapping(value = "/playVideoByClasseId/{classeId}")
	    public void playVideo3(@PathVariable long classeId, HttpServletResponse response) throws IOException {
	        Optional<Vedeo> video = vedeoRepositery.findByClasseId(classeId);
	        if (video.isPresent()) {
	            InputStream resource = fileService.getVideoFile(path, video.get().getVideoName(), classeId);
	            response.setContentType(org.springframework.http.MediaType.ALL_VALUE);
	            StreamUtils.copy(resource, response.getOutputStream());
	        }
	    }
	}
