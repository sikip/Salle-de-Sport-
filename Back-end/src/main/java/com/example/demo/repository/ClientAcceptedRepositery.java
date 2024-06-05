package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ClientAccept;
@Repository
public interface ClientAcceptedRepositery extends JpaRepository<ClientAccept, Long> {
	 @Query("SELECT COUNT(ca) FROM clientaccept ca WHERE ca.acceptation = 'true' AND ca.User.id = :userId")
	    long countAcceptedClientsByUserId(Long userId);
	    @Query("SELECT ca FROM clientaccept ca WHERE ca.user.id = :userId")
	    List<ClientAccept> findByUserId(Long userId);
}
