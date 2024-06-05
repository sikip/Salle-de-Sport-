package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;



import com.example.demo.entity.Room;
import com.example.demo.entity.Offer;
import com.example.demo.entitydto.OfferDto;
import com.example.demo.repository.OfferRepositery;
import com.example.demo.repository.RoomRepositery;
@Service
public class OfferService {
	 private final OfferRepositery offerRepository;
	    private final RoomRepositery roomRepository;

	    
	    public OfferService(OfferRepositery offerRepository, RoomRepositery roomRepository) {
	        this.offerRepository = offerRepository;
	        this.roomRepository = roomRepository;
	    }
	   public OfferDto addOffer(OfferDto offerDto) {
	        Offer offer = new Offer();
	        offer.setNom(offerDto.getNom());
	        offer.setPrix(offerDto.getPrix());
	        offer.setClasse(offerDto.getClasse());
	        offer.setMonth(offerDto.getMonth());
	        offer.setMessage(offerDto.getMessage());
	        offer.setEntrepr(offerDto.getEntrepr());

	        Room salle = roomRepository.findById(1L)
	                    .orElseThrow(() -> new RuntimeException("Error: Salle with id 1 not found."));
	        offer.setSalle(salle);
	        Offer savedOffer = offerRepository.save(offer);
	        return OfferDto.fromEntity(savedOffer);
	    }

	public List<Offer > getOffre() {

		return offerRepository.findAll();
	}

	public Offer updateOffre(long id, String nom, double prix, String classe, String month, double message,double entrepr) {

		Optional<Offer> optionalOffre = offerRepository.findById(id);
		if (optionalOffre.isPresent()) {

			Offer existingOffre = optionalOffre.get();
			if (nom != null && !nom.isEmpty()) {
				existingOffre.setNom(nom);
			}
			existingOffre.setPrix(prix);
			if (classe != null && !classe.isEmpty()) {
				existingOffre.setClasse(classe);
			}
			if (month != null && !month.isEmpty()) {
				existingOffre.setMonth(month);
			}
			existingOffre.setMessage(message);
			existingOffre.setEntrepr(entrepr);
			
			return offerRepository.save(existingOffre);
		} else {
			return null;
		}
	}
    public Optional<Offer> getOffreById(long id) {
        return offerRepository.findById(id);
    }
}