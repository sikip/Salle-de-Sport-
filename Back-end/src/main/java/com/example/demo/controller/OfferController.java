package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Offer;
import com.example.demo.entitydto.OfferDto;
import com.example.demo.service.OfferService;









@CrossOrigin(origins = "*")
@RestController
public class OfferController {
  
    private final OfferService offerService;

    public OfferController( OfferService offerService) {
        this.offerService = offerService;
    }
    @PostMapping(value ="/add")

    	  public OfferDto addOffer(@RequestBody OfferDto offerDto) {
    	        return offerService.addOffer(offerDto);
    }
    @GetMapping(value = "/getAllOffre")
    public List<Offer> getVoitures() {
    	return offerService.getOffre();
    }
    @Transactional
    @PostMapping("/update/{id}")
    public Offer updateOffreController(@PathVariable long id,
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) Double prix,
            @RequestParam(required = false) String classe,
            @RequestParam(required = false) String month,
            @RequestParam(required = false) Double message,
            @RequestParam(required = false) Double entrepr) {
    	  return offerService.updateOffre(id, nom, prix != null ? prix : 0, classe, month,
                  message != null ? message : 0, entrepr != null ? entrepr : 0);
    }
    @GetMapping("/offres/{id}")
    public ResponseEntity<Offer> getOffreById(@PathVariable long id) {
        Optional<Offer> optionalOffre = offerService.getOffreById(id);
        if (optionalOffre.isPresent()) {
            return ResponseEntity.ok(optionalOffre.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    }
    
    
    
