package com.example.demo.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.transaction.Transactional;

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

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.payment.Emailrequest;
import com.example.demo.repository.UserRepositery;
import com.example.demo.service.UserService;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;



@CrossOrigin(origins = "*")
@RestController
public class UserController {
    private final UserService userService;
 
    private final UserRepositery userRepositery;

    public UserController(UserService userService, UserRepositery userRepositery) {
        this.userService = userService;
        this.userRepositery = userRepositery;
    }
    @GetMapping("/client-count")
    public long getNumberClients() {
    	return userService.getNumberClients();
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            
        }
    }
    @PostMapping("/{clientId}")
    public ResponseEntity<String> addRevieuxAndImage(
            @PathVariable("clientId") long clientId,
            @RequestParam("revieux") String revieux,
            @RequestParam("image") MultipartFile image
    ) {
        try {
        	userService.ajouterrevieuxclien(clientId, revieux, image);
            return ResponseEntity.status(HttpStatus.CREATED).body("Revieux and image added successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding review and image: " + e.getMessage());
        }
    }
    @GetMapping("/getuser")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @PostMapping("/admin/{userId}")
    public ResponseEntity<Object> updateUserImage(@PathVariable Long userId,
                                              @RequestParam("imageFile") MultipartFile imageFile) {
        try {
        	userService.updateUserImage(userId, imageFile);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error updating user image: " + e.getMessage());
        }
    }
    @GetMapping("/countByMonth")
    public Map<String, Integer> getUserCountsByMonth() {
        return userService.countUsersByMonth();
    }
    @GetMapping("/cautche-count")
    public ResponseEntity<Long> countCautchUsers() {
        long count = userService.countUsersWithCautchRole();
        return ResponseEntity.ok(count);
    }
    @GetMapping("/cautch")
    public List<User> getUsersWithRoleCoach() {
        return userService.findUsersByRoleCoach();
    }
    @GetMapping("/user")
    public List<User> findUsersByRoleUser() {
        return userService.findUsersByRoleUser();
    }
    @GetMapping("/attribut/{userId}")
    public ResponseEntity<String> getUserAttributes(@PathVariable Long userId) {
        String attributes = userService.afficherAttributsSelonId(userId);
        if (attributes.contains("non trouvé")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(attributes);
        }
        return ResponseEntity.ok().body(attributes);
    }
    @Transactional
    @PostMapping("/updateuser/{userId}")
    public User updateUser(@PathVariable long userId,
            @RequestParam(required = false) Double telephone,
            @RequestParam(required = false) Double janfi,
            @RequestParam(required = false) Double fivri,
            @RequestParam(required = false) Double mars,
            @RequestParam(required = false) Double avrile,
            @RequestParam(required = false) Double mais,
            @RequestParam(required = false) Double juin,
            @RequestParam(required = false) Double octobre,
            @RequestParam(required = false) Double juilliat,
            @RequestParam(required = false) Double decembre,
            @RequestParam(required = false) Double nauvembre,
            @RequestParam(required = false) Double aute,
            @RequestParam(required = false) Double septembre,
            @RequestParam(required = false) String username) {

    	 User existingUser = userService.getUserById(userId);

    	    if (existingUser != null) {
    	      
    	        if (telephone != null) {
    	            existingUser.setTelephone(telephone);
    	        }
    	        if (janfi != null) {
    	            existingUser.setJanfi(janfi);
    	        }
    	        if (fivri != null) {
    	            existingUser.setFivri(fivri);
    	        }
    	        if (mars != null) {
    	            existingUser.setMars(mars);
    	        }
    	        if (avrile != null) {
    	            existingUser.setAvrile(avrile);
    	        }
    	        if (mais != null) {
    	            existingUser.setMais(mais);
    	        }
    	        if (juin != null) {
    	            existingUser.setJuin(juin);
    	        }
    	        if (juilliat != null) {
    	            existingUser.setJuilliat(juilliat);
    	        }
    	        if (aute != null) {
    	            existingUser.setAute(aute);
    	        }
    	        if (octobre != null) {
    	            existingUser.setOctobre(octobre);
    	        }
    	        if (decembre != null) {
    	            existingUser.setDecembre(decembre);
    	        }
    	        if (nauvembre != null) {
    	            existingUser.setNauvembre(nauvembre);
    	        }
    	        if (septembre != null) {
    	            existingUser.setSeptembre(septembre);
    	        }


    	      
    	        return userRepositery.save(existingUser);
    	    } else {
    	       
    	        return null;
    	    }
    	}
    @Transactional
    @PostMapping("/updateuser2/{userId}")
    public User updateUser(@PathVariable long userId,
                           @RequestParam(required = false) String username,
                           @RequestParam(required = false) String email,
                           @RequestParam(required = false) Double telephone) {
        User existingUser = userService.getUserById(userId);

        if (existingUser != null) {
          
            if (username != null) {
                existingUser.setUsername(username);
            }
            if (email != null) {
                existingUser.setEmail(email);
            }
            if (telephone != null) {
                existingUser.setTelephone(telephone);
            }

           
            return userRepositery.save(existingUser);
        } else {
            
            return null;
        }
    }
    @Transactional
    @PostMapping("/updateuser3/{userId}")
    public User updateUser3(@PathVariable long userId,
            @RequestParam(required = false) Double confibm,
            @RequestParam(required = false) Double poid) {

    	 User existingUser = userService.getUserById(userId);

    	    if (existingUser != null) {
    	       
    	        if (confibm != null) {
    	            existingUser.setConfibm(confibm);
    	        }
    	        if (poid != null) {
    	            existingUser.setPoid(poid);
    	        }
    	  
    	        return userRepositery.save(existingUser);
    	    } else {
    
    	        return null;
    	    }
    	}
    @PostMapping("/userimage/{userId}")
    public ResponseEntity<String> updateUserImage (@PathVariable long userId,
    		  @RequestParam("image") MultipartFile image){
    	userService.UpdateUserImage(userId, image);
       return ResponseEntity.status(HttpStatus.CREATED).body("Images successfully added to room with ID : " + userId);
    }
    @GetMapping("/allusers")
    public List<User> getAllUsersAndCoaches() {
        return userService.findAllUsersAndCoaches();
    }
    @PostMapping("/addtocartoffee/{userId}/{id}")
    public ResponseEntity<String> addToCart(@PathVariable long userId, @PathVariable long id) {
    	userService.addToCart(userId, id);
        return ResponseEntity.ok("Chop added to cart successfully");
    }
    @GetMapping("/qrcode/{userId}")
    public byte[] generateQRCode(@PathVariable Long userId) {
        User user = userRepositery.findById(userId).orElse(null);
        if (user != null) {
            String userData = prepareUserData(user);
            try {
                BufferedImage bufferedImage = generateQRImage(userData);
                return convertImageToByteArray(bufferedImage);
            } catch (WriterException | IOException e) {
                handleException(e);
            }
        }
        return new byte[0];
    }

    private String prepareUserData(User user) {
        StringBuilder roleNames = new StringBuilder();
        for (Role role : user.getRoles()) {
            roleNames.append(role.getName()).append(", ");
        }
        if (roleNames.length() > 0) {
            roleNames.setLength(roleNames.length() - 2);
        }
        return "ID: " + user.getId() + ", Name: " + user.getUsername() + ", Email: " + user.getEmail() + ", Roles: " + roleNames.toString();
    }

    private BufferedImage generateQRImage(String userData) throws WriterException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(userData, com.google.zxing.BarcodeFormat.QR_CODE, 300, 300);
        BufferedImage bufferedImage = new BufferedImage(300, 300, BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < 300; x++) {
            for (int y = 0; y < 300; y++) {
                bufferedImage.setRGB(x, y, bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
            }
        }
        return bufferedImage;
    }

    private byte[] convertImageToByteArray(BufferedImage bufferedImage) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "png", byteArrayOutputStream);
        return byteArrayOutputStream.toByteArray();
    }

    private void handleException(Exception e) {
        e.printStackTrace(); 
    }

    @GetMapping("/confirm-registration/{email}")
    public ResponseEntity<String> confirmRegistration(@PathVariable("email") String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
   
            user.setConfuser("true");
            userService.saveUser(user);
            return ResponseEntity.ok().body("Successful confirmation for user : " + email);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/sendEmailadmin")
    public ResponseEntity<String> sendEmail(@RequestBody Emailrequest request) {
        try {
        	userService.sendEmail(request);
            return ResponseEntity.ok("Email sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        }
    }
}
