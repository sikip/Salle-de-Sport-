package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Room;
import com.example.demo.entitydto.RoomDto;
import com.example.demo.service.RoomService;

@CrossOrigin(origins = "*")
@RestController
public class RoomController {
	private final RoomService roomService;

	public RoomController(RoomService roomService) {
		this.roomService = roomService;
	}

	@GetMapping(value = "/getsall")
	public List<Room> getsalle() {
		return roomService.getsalle();
	}

	@PostMapping(value = "/addsalle")
	public ResponseEntity<Object> addROOM(@Valid @ModelAttribute RoomDto roomDTO, BindingResult bindingResult,
            @RequestParam("imageFile1") MultipartFile imageFile1,
            @RequestParam("imageFile2") MultipartFile imageFile2) {
if (bindingResult.hasErrors()) {
Map<String, String> errorMap = new HashMap<>();
for (FieldError error : bindingResult.getFieldErrors()) {
errorMap.put(error.getField(), error.getDefaultMessage());
}
return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
}

RoomDto savedRoomDTO = roomService.addsalle(roomDTO, imageFile1, imageFile2);
return ResponseEntity.ok(savedRoomDTO);
}

	@PostMapping("/{salleId}/images")
	public ResponseEntity<String> addImageToRoom(@PathVariable long salleId,
			@RequestParam("image1") MultipartFile image1, @RequestParam("image2") MultipartFile image2) {
		roomService.ajouterImagesALaSalle(salleId, image1, image2);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body("Images ajoutées avec succès à la salle avec l'ID : " + salleId);
	}

	@GetMapping("/s1/{id}")
	public ResponseEntity<Room> getROOMById(@PathVariable("id") long id) {
		Optional<Room> salleOptional = roomService.getSalleById(id);
		return salleOptional.map(salle -> new ResponseEntity<>(salle, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@Transactional
	@PostMapping("/sall/{id}")
	public Room updateSalle(@PathVariable long id, @RequestParam(required = false) String numero,
			@RequestParam(required = false) String time,
			@RequestParam(required = false) String email,
			@RequestParam(required = false) String localaisation,
			@RequestParam(required = false) String locationexact,
			@RequestParam(required = false) Double latitude,
			@RequestParam(required = false) Double longitude,
			@RequestParam(required = false) String slogon1, @RequestParam(required = false) String slogon2,
			@RequestParam(required = false) String name) {
		return roomService.updateRoomById(id, numero, time, email, localaisation, locationexact,
				latitude != null ? latitude : 0, longitude != null ? longitude : 0, slogon1, slogon2, name);
	}

	@PostMapping("/insererAttributs/{id}")
	public ResponseEntity<Object> insertAttributes(@PathVariable("id") long id,
			@RequestParam String numero,
			@RequestParam String heure,
			@RequestParam String email,
			@RequestParam String localisation,
			@RequestParam String localisationExacte,
			@RequestParam String latitudeStr,
			@RequestParam String longitudeStr, 
			@RequestParam String slogan1, 
			@RequestParam String slogan2,
			@RequestParam String nom) {
		try {
			double latitude = Double.parseDouble(latitudeStr);
			double longitude = Double.parseDouble(longitudeStr);

			Room salleEntity = roomService.insertByID(id, numero, heure, email, localisation,
					localisationExacte, latitude, longitude, slogan1, slogan2, nom);
			if (salleEntity != null) {
				return new ResponseEntity<>(salleEntity, HttpStatus.OK);
			} else {
				return new ResponseEntity<>("Salle introuvable avec l'ID spécifié", HttpStatus.NOT_FOUND);
			}
		} catch (NumberFormatException e) {
			return new ResponseEntity<>("Les valeurs de latitude et de longitude doivent être des nombres valides",
					HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/sendsalleinfoemail")
	public String sendRoomInformationEmail(@RequestParam String userEmail) throws MessagingException {
		long salleId = 1;
		roomService.sendRoomInformationEmail(userEmail, salleId);
		return "Room information email sent successfully";
	}
}
