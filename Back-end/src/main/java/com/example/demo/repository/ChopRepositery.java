package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Chop;

public interface ChopRepositery extends JpaRepository<Chop, Long>  {
	 List<Chop> findByNameStartingWith(String name);
	 List<Chop> findByType(String type);
	 List<Chop> findByPrixBetween(long prixMin, long prixMax); 

	    @Query("SELECT COUNT(e) FROM chop e JOIN e.userchop u WHERE u.id = :userId")
	    int countByUserchopId(Long userId);
	    @Query("SELECT c FROM chop c JOIN c.userchop u WHERE u.id = :userId")
	    List<Chop> findChopsByUserchopId(Long userId);
	    @Query("SELECT c FROM chop c JOIN c.userpaymentchop u WHERE u.id = :userId")
	    List<Chop> findChopsByUserpaymentchopId(Long userId);
}
