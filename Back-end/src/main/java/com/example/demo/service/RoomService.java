package com.example.demo.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Room;


import com.example.demo.entitydto.RoomDto;
import com.example.demo.errore.RoomError;
import com.example.demo.repository.RoomRepositery;
@Service
public class RoomService {
    private final RoomRepositery roomRepository;
 
    private final JavaMailSender javaMailSender;

    public RoomService(RoomRepositery roomRepository,  JavaMailSender javaMailSender) {
        this.roomRepository = roomRepository;
   
        this.javaMailSender = javaMailSender;
    }
		public List<Room> getsalle() {
			
			return roomRepository.findAll();
		}
		public RoomDto convertToRoomDTO(Room room) {
		    RoomDto roomDTO = new RoomDto();
		    roomDTO.setNumero(room.getNumero());
		    roomDTO.setTime(room.getTime());
		    roomDTO.setEmail(room.getEmail());
		 

		    return roomDTO;
		}
		public RoomDto addsalle(RoomDto roomDTO, MultipartFile imageFile1, MultipartFile imageFile2) {
		    try {
		        Room room = new Room();
		        room.setNumero(roomDTO.getNumero());
		        room.setTime(roomDTO.getTime());
		        room.setEmail(roomDTO.getEmail());
		        room.setLocalisation(roomDTO.getLocalisation());
		        room.setLocationexact(roomDTO.getLocationexact());
		        room.setLatitude(roomDTO.getLatitude());
		        room.setLongitude(roomDTO.getLongitude());
		        room.setSlogon1(roomDTO.getSlogon1());
		        room.setSlogon2(roomDTO.getSlogon2());
		        room.setName(roomDTO.getName());
		        room.setPrix(roomDTO.getPrix());
		        

		        room.setImage(imageFile1.getBytes());
		        room.setImageslid1(imageFile2.getBytes());

		        Room savedRoom = roomRepository.save(room);

		        // Convert the saved room back to DTO and return
		        return convertToRoomDTO(savedRoom);
		    } catch (IOException e) {
		    	 throw new RoomError(false, "Failed to add salle with image: " + e.getMessage());
		    }
		}
		public void ajouterImagesALaSalle(long salleId, MultipartFile image1, MultipartFile image2) {
			Room salle = roomRepository.findById(salleId)
					.orElseThrow(() -> new IllegalArgumentException("Salle non trouvée avec l'ID : " + salleId));
			try {
				if (image1 != null && !image1.isEmpty()) {
					salle.setImageslid1(image1.getBytes());
				}
				if (image2 != null && !image2.isEmpty()) {
					salle.setImage(image2.getBytes());
				}

				roomRepository.save(salle);
			} catch (IOException e) {
				 throw new RoomError(false, "Error reading image data: " + e.getMessage());
			}
		}
		public Optional<Room> getSalleById(long id) {
			return roomRepository.findById(id);
		}
		
		public Room updateRoomById(long id, String numero, String time, String email, String localaisation,
				String locationexact, double latitude, double longitude, String slogon1, String slogon2, String name) {

			Optional<Room> optionalSalle = roomRepository.findById(id);
			if (optionalSalle.isPresent()) {
				Room existingSalle = optionalSalle.get();

				updateNumero(existingSalle, numero);
				updateTime(existingSalle, time);
				updateEmail(existingSalle, email);
				updateLocalaisation(existingSalle, localaisation);
				updateLocationexact(existingSalle, locationexact);
				updateLatitude(existingSalle, latitude);
				updateLongitude(existingSalle, longitude);
				updateSlogon1(existingSalle, slogon1);
				updateSlogon2(existingSalle, slogon2);
				updateName(existingSalle, name);

				return roomRepository.save(existingSalle);
			} else {
				return null;
			}
		}

private void updateNumero(Room salle, String numero) {
if (numero != null && !numero.isEmpty()) {
salle.setNumero(numero);
}
}

private void updateTime(Room salle, String time) {
	if (time != null && !time.isEmpty()) {
		salle.setTime(time);
	}
}
private void updateEmail(Room salle, String email) {
	if (email != null && !email.isEmpty()) {
		salle.setEmail(email);
	}
}
private void updateLocalaisation(Room salle, String localaisation) {
	if (localaisation != null && !localaisation.isEmpty()) {
		salle.setLocalisation(localaisation);
	}
}
private void updateLocationexact(Room salle, String locationexact) {
	if (locationexact != null && !locationexact.isEmpty()) {
		salle.setLocationexact(locationexact);
	}
}
private void updateLatitude(Room salle, Double latitude) {
    if (latitude != null) {
        salle.setLatitude(latitude);
    }
}
private void updateLongitude(Room salle, Double longitude) {
    if (longitude != null) {
        salle.setLongitude(longitude);
    }
}
private void updateSlogon1(Room salle, String slogon1) {
	if (slogon1 != null && !slogon1.isEmpty()) {
		salle.setSlogon1(slogon1);
	}
}
private void updateSlogon2(Room salle, String slogon2) {
	if (slogon2 != null && !slogon2.isEmpty()) {
		salle.setSlogon2(slogon2);
	}
}
private void updateName(Room salle, String name) {
	if (name != null && !name.isEmpty()) {
		salle.setName(name);
	}
}
		public Room insertByID(long idSalle, String numero, String heure, String email, String localisation, String localisationExacte,
		        double latitude, double longitude, String slogan1, String slogan2, String nom) {
			Room salleEntity = roomRepository.findById(idSalle).orElse(null);
		if (salleEntity != null) {
		salleEntity.setNumero(numero);
		salleEntity.setTime(heure);
		salleEntity.setEmail(email);
		salleEntity.setLocalisation(localisation);
		salleEntity.setLocationexact(localisationExacte);
		salleEntity.setLatitude(latitude);
		salleEntity.setLongitude(longitude);
		salleEntity.setSlogon1(slogan1);
		salleEntity.setSlogon2(slogan2);
		salleEntity.setName(nom);
		return roomRepository.save(salleEntity);
		} else {
		return null; 
		}
		}
		public void sendRoomInformationEmail(String userEmail, long salleId) throws MessagingException {
		
		    Room salle = roomRepository.findById(salleId).orElse(null);
		    if (salle == null) {
		    
		        return;
		    }

		  
		    MimeMessage message = javaMailSender.createMimeMessage();
		    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		    try {
		        helper.setTo(userEmail);
		        helper.setSubject("Room Information");

		     
		        String htmlContent = "<html><head>" +
		                "<style>" +
		                "body { font-family: Arial, sans-serif; }" +
		                "h2 { color: black; font-size: 20px; margin-bottom: 10px; }" +
		                "p { margin-bottom: 5px; color:black }" +
		                "strong { font-weight: bold; }" +
		                ".footer { margin-top: 20px; color: #888; }" +
		                "</style>" +
		                "</head><body>" +
		                "<h2>Room Details</h2>" +
		                "<p><strong>hello sir, this is our information room</strong> "  + "</p>" +
		                "<p><strong>Prix:</strong> " + salle.getPrix() + "</p>" +
		                "<p><strong>Number:</strong> " + salle.getNumero() + "</p>" +
		                "<p><strong>Email:</strong> " + salle.getEmail() + "</p>" +
		                "<p><strong>Time:</strong> " + salle.getTime() + "</p>" +
		                "<p><strong>Location:</strong> " + salle.getLocalisation() + "</p>" +
		                "<p><strong>Exact Location:</strong> " + salle.getLocationexact() + "</p>" +
		                "<p><strong>Slogan 1:</strong> " + salle.getSlogon1() + "</p>" +
		                "<p><strong>Slogan 2:</strong> " + salle.getSlogon2() + "</p>" +
		                "<div class=\"footer\">Cordialement, " + salle.getName() + "</div>" +
		                "</body></html>";

		        helper.setText(htmlContent, true);

		        // Send email
		        javaMailSender.send(message);
		    } catch (MessagingException | MailException e) {
		       
		        e.printStackTrace();
		        throw e; 
		    }
		}
		}

