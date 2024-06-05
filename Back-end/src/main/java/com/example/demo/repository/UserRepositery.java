package com.example.demo.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ERole;
import com.example.demo.entity.User;



@Repository
public interface UserRepositery extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);
	 Optional<User> findByEmail(String email);
	 
	   List<User> findAllByRegistrationDateBetween(Date startDate, Date endDate);
	   long countUsersByRoles_Name(ERole roleName);
	   List<User> findByRoles_Name(ERole roleName);
	   List<User> findByUsernameStartingWith(String username); 
	   List<User> findByRoles_NameIn(List<ERole> roleNames);
}
