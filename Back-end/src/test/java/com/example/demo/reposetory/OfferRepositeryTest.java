package com.example.demo.reposetory;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.demo.entity.Offer;
import com.example.demo.repository.OfferRepositery;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
 class OfferRepositeryTest {
	 @Autowired
	    private OfferRepositery offerRepositery;
	 @Test
	    void OfferRepositery_SaveAll_ReturnSavedOffer() {
		//Arrange
		 Offer offer = Offer.builder()
				
		            .nom("exampleoffer")
		            .prix(150)
		            .classe("Example classes")
		            .month("Example month")
		            .message(1)
		            .entrepr(1)
		          
		            .build();
		        //Act
		 Offer SavedOffer = offerRepositery.save(offer);
		  //Assert
		 Assertions.assertThat(SavedOffer).isNotNull();
		 Assertions.assertThat(SavedOffer.getId()).isPositive();
	 }
	 @Test
	 void offerRepositery_UpdateOffer_ReturnOfferNotNull() {
	    
	     Offer offer = Offer.builder()
	             .nom("exampleoffer")
	             .prix(150)
	             .classe("Example classes")
	             .month("Example month")
	             .message(1)
	             .entrepr(1)
	             .build();


	     Offer savedOffer = offerRepositery.saveAndFlush(offer);


	     savedOffer.setNom("exampleoffer");
	     savedOffer.setPrix(140);
	     savedOffer.setClasse("exempale");

	
	     Offer retrievedOffer = offerRepositery.findById(savedOffer.getId()).orElseThrow();

	     
	     Assertions.assertThat(retrievedOffer).isNotNull();
	 }
	    @Test
	     void offerRepositery_FindById_ReturnOfferNotNull() {
	    	Offer offer = Offer.builder()
		             .nom("exampleoffer")
		             .prix(150)
		             .classe("Example classes")
		             .month("Example month")
		             .message(1)
		             .entrepr(1)
		             .build();

	    	offerRepositery.save(offer);

	    	Offer OfferList = offerRepositery.findById(offer.getId()).get();

	        Assertions.assertThat(OfferList).isNotNull();
	    } 
	    @Test
	     void offerRepositery_OfferDelete_ReturnOfferIsEmpty() {
	    	Offer offer = Offer.builder()
		             .nom("exampleoffer")
		             .prix(150)
		             .classe("Example classes")
		             .month("Example month")
		             .message(1)
		             .entrepr(1)
		             .build();

	    	offerRepositery.save(offer);

	    	offerRepositery.deleteById(offer.getId());
	        Optional<Offer> OfferReturn = offerRepositery.findById(offer.getId());

	        Assertions.assertThat(OfferReturn).isEmpty();
	    }
	    
	    
}
