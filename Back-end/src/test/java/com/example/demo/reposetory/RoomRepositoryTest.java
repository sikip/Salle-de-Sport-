package com.example.demo.reposetory;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.demo.entity.Room;
import com.example.demo.repository.RoomRepositery;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
class RoomRepositoryTest {
	 @Autowired
	    private RoomRepositery RoomRepositery;
	 @Test
	    void RoomRepositery_SaveAll_ReturnSavedRoom() {
		//Arrange
		 Room room = Room.builder()
				
		            .numero("0123456789")
		            .time("10:00")
		            .email("example@example.com")
		            .localisation("Example Location")
		            .locationexact("Exact Location")
		            .latitude(50.34)
		            .longitude(140.78)
		            .slogon1("Slogan 1")
		            .slogon2("Slogan 2")
		            .name("Room Name")
		            .prix(100)
		            .image(new byte[]{})
		            .imageslid1(new byte[]{})
		            .imagessignateure(new byte[]{})
		            .build();
		             //Act
		             Room SavedRoom = RoomRepositery.save(room);
		             //Assert
		             Assertions.assertThat(SavedRoom).isNotNull();
		             Assertions.assertThat(SavedRoom.getId()).isPositive();
	 }
	 @Test
	 void RoomRepository_UpdateRoom_ReturnRoomNotNull() {
	     
	     Room room = Room.builder()
	             .numero("0123456789")
	             .time("10:00")
	             .email("example@example.com")
	             .localisation("Example Location")
	             .locationexact("Exact Location")
	             .latitude(50.34)
	             .longitude(140.78)
	             .slogon1("Slogan 1")
	             .slogon2("Slogan 2")
	             .name("Kanza")
	             .prix(100)
	             .image(new byte[]{})
	             .imageslid1(new byte[]{})
	             .imagessignateure(new byte[]{})
	             .build();

	   
	     Room savedRoom = RoomRepositery.save(room);

	     Room fetchedRoom = RoomRepositery.findById(savedRoom.getId()).orElseThrow();

	     
	     fetchedRoom.setTime("10:30");
	     fetchedRoom.setNumero("9876543210");
	     fetchedRoom.setEmail("updated@example.com");
	     fetchedRoom.setLocalisation("Updated Location");
	     fetchedRoom.setLocationexact("Updated Exact Location");
	     fetchedRoom.setLatitude(60.12);
	     fetchedRoom.setLongitude(150.45);
	     fetchedRoom.setPrix(150);
	     fetchedRoom.setImage(new byte[]{10, 11, 12});
	     fetchedRoom.setImageslid1(new byte[]{13, 14, 15});
	     fetchedRoom.setImagessignateure(new byte[]{16, 17, 18});
	     fetchedRoom.setName("sikipon");
	     Room updatedRoom = RoomRepositery.findByName(fetchedRoom.getName()).get();
	     Assertions.assertThat(updatedRoom).isNotNull();    
	 }
	    @Test
	     void RoomRepository_FindByType_ReturnRoomNotNull() {
	    	Room room = Room.builder()
		             .numero("0123456789")
		             .time("10:00")
		             .email("example@example.com")
		             .localisation("Example Location")
		             .locationexact("Exact Location")
		             .latitude(50.34)
		             .longitude(140.78)
		             .slogon1("Slogan 1")
		             .slogon2("Slogan 2")
		             .name("Kanza")
		             .prix(100)
		             .image(new byte[]{})
		             .imageslid1(new byte[]{})
		             .imagessignateure(new byte[]{})
		             .build();
	
		             RoomRepositery.save(room);

		             Room RoomList = RoomRepositery.findById(room.getId()).get();

	        Assertions.assertThat(RoomList).isNotNull();
	    }
	    @Test
	     void RoomRepository_PokemonDelete_ReturnRoomIsEmpty() {
	    	Room room = Room.builder()
		             .numero("0123456789")
		             .time("10:00")
		             .email("example@example.com")
		             .localisation("Example Location")
		             .locationexact("Exact Location")
		             .latitude(50.34)
		             .longitude(140.78)
		             .slogon1("Slogan 1")
		             .slogon2("Slogan 2")
		             .name("Kanza")
		             .prix(100)
		             .image(new byte[]{})
		             .imageslid1(new byte[]{})
		             .imagessignateure(new byte[]{})
		             .build();

	    	RoomRepositery.save(room);

	    	RoomRepositery.deleteById(room.getId());
	        Optional<Room> RoomReturn = RoomRepositery.findById(room.getId());

	        Assertions.assertThat(RoomReturn).isEmpty();
	    }
}
