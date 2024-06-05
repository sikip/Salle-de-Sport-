package com.example.demo.reposetory;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepositery;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
 class UserRepositeryTest {
	@Autowired
	UserRepositery userRepositery ;
	
	
    @Test
    void testSaveUser() {
       
       User user = new User();
       user.setUsername("TestUser");
       user.setEmail("exempale@example.com");
       User savedUser = userRepositery.save(user);	        
  	   Assertions.assertThat(savedUser).isNotNull();
	   Assertions.assertThat(savedUser.getId()).isPositive();
   }
	 @Test
	 void UserRepositery_UpdateUser_ReturnUserNotNull() {
	    
	     User user = new User();
	     User savedUser = userRepositery.saveAndFlush(user);
	      user.setUsername("TestUser");
	       user.setEmail("exempale@example.com");		
	       User retrievedUser = userRepositery.findById(savedUser.getId()).orElseThrow();
			     Assertions.assertThat(retrievedUser).isNotNull();
	 }
	 
	    @Test
	     void UserRepositery_FindById_ReturnUserNotNull() {
	    	User user = new User();
	    	userRepositery.save(user);

	    	User UserList = userRepositery.findById(user.getId()).get();

	        Assertions.assertThat(UserList).isNotNull();
	    } 
	    @Test
	     void userRepositery_UserDelete_ReturnUserIsEmpty() {
	    	User user = new User();


	    	userRepositery.save(user);

	    	userRepositery.deleteById(user.getId());
	        Optional<User> UserReturn = userRepositery.findById(user.getId());
	        Assertions.assertThat(UserReturn).isEmpty();
	    }
	 
	
}
