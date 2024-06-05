package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Vedeo;





@Repository
public interface VedeoRepositery extends JpaRepository<Vedeo, Long> {
	Optional<Vedeo> findByEventId(long eventId);
	Optional<Vedeo>findByClasseId(long classeId);
}
