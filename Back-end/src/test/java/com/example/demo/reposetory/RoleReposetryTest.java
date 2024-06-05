package com.example.demo.reposetory;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.demo.entity.ERole;
import com.example.demo.entity.Role;
import com.example.demo.repository.RoleRepositery;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
 class RoleReposetryTest {
	 @Autowired
	    private RoleRepositery RoleRepositery;
	    @Test
	    void RoleRepository_SaveAll_ReturnSavedRole() {
	        Role role = Role.builder()
	                .name(ERole.ROLE_USER) // Utilisez le nom correct de la propriété
	                .build();
	        
	        Role savedRole = RoleRepositery.save(role); // Utilisez roleRepository au lieu de RoleRepositery
	        
	        // Assert
	        Assertions.assertThat(savedRole).isNotNull();
	        Assertions.assertThat(savedRole.getId()).isPositive();
	    }
		 @Test
		 void RoleRepository_UpdateRole_ReturnRoleNotNull() {
		    
			 Role role =  Role.builder()
					   .name(ERole.ROLE_USER)
		                .build();


			 Role savedRole = RoleRepositery.saveAndFlush(role);


			 savedRole.setName(ERole.ROLE_USER);
		

		
			 Role retrievedRole = RoleRepositery.findById(savedRole.getId()).orElseThrow();

		     
		     Assertions.assertThat(retrievedRole).isNotNull();
		 }
		    @Test
		     void RoleRepository_FindById_ReturnRoleNotNull() {
		    	Role role = Role.builder()
		    			   .name(ERole.ROLE_USER)
			             .build();

		    	RoleRepositery.save(role);

		    	Role roleList = RoleRepositery.findById(role.getId()).get();

		        Assertions.assertThat(roleList).isNotNull();
		    } 
		    @Test
		     void roleRepositery_RoleDelete_ReturnRoleIsEmpty() {
		    	Role role = Role.builder()
		    			 .name(ERole.ROLE_USER)
			             .build();

		    	RoleRepositery.save(role);

		    	RoleRepositery.deleteById(role.getId());
		        Optional<Role> RoleReturn = RoleRepositery.findById(role.getId());

		        Assertions.assertThat(RoleReturn).isEmpty();
		    }
}
