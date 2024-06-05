package com.example.demo.reposetory;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.demo.entity.Event;
import com.example.demo.repository.EventRepositery;

@DataJpaTest
@RunWith(SpringRunner.class)
 class EventRepositeryTest {
	 @Autowired
	    private EventRepositery eventRepositery ;

	    @Test
	     void testSaveEvent() {
	        
	        Event event = new Event();
	        event.setNom("Test Event");	     
	        Event savedEvent = eventRepositery.save(event);	        
	   	 Assertions.assertThat(savedEvent).isNotNull();
		 Assertions.assertThat(savedEvent.getId()).isPositive();
	    }
	    
		 @Test
		 void EventRepositery_UpdateEvent_ReturnEventNotNull() {
		    
			  Event event = new Event();
			  Event savedEvent = eventRepositery.saveAndFlush(event);
			  savedEvent.setNom("exampleoffer");
			  savedEvent.setPrix(140);		
			  Event retrievedOffer = eventRepositery.findById(savedEvent.getId()).orElseThrow();
				     Assertions.assertThat(retrievedOffer).isNotNull();
		 }
		 
		    @Test
		     void eventRepositery_FindById_ReturnOfferNotNull() {
		  	  Event event = new Event();
			             eventRepositery.save(event);

			             Event OfferList = eventRepositery.findById(event.getId()).get();

		        Assertions.assertThat(OfferList).isNotNull();
		    } 
		    @Test
		     void eventRepositery_EventDelete_ReturnEventIsEmpty() {
		  	  Event event = new Event();


		  	eventRepositery.save(event);

		  	eventRepositery.deleteById(event.getId());
		        Optional<Event> EventReturn = eventRepositery.findById(event.getId());
		        Assertions.assertThat(EventReturn).isEmpty();
		    }
		 
}
