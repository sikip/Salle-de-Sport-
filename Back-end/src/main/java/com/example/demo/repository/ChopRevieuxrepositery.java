package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.ChopRevieux;

public interface ChopRevieuxrepositery extends JpaRepository<ChopRevieux, Long>{
	   @Query("SELECT COUNT(cr) FROM ChopRevieux cr WHERE cr.chop.id = :chopId")
	    int countByChopId(long chopId);
	   
	   
	   
	   @Query("SELECT cr FROM ChopRevieux cr JOIN cr.chop c WHERE c.id = :chopId")
	   List<ChopRevieux> findByChopId(@Param("chopId") long chopId);


}
