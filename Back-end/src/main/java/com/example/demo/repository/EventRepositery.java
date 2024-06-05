package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Event;
import com.example.demo.entity.User;


@Repository
public interface EventRepositery extends JpaRepository<Event, Long> {
	  List<Event> findByAcceptation(String acceptation);
	    @Query("SELECT e FROM Event e WHERE e.datee < CURRENT_DATE  AND e.acceptation = 'true' ")
	    List<Event> findEventsByAddedDatePassed();
	    
	    
	    @Query("SELECT MONTH(e.datee) as month, COUNT(e) as eventCount " +
	            "FROM Event e " +
	            "WHERE e.user.id = ?1 " +
	            "GROUP BY MONTH(e.datee)")
	    List<Object[]> countEventsByUserAndMonth(Long userId);
	    
	    @Query("SELECT COUNT(e) FROM Event e WHERE e.user.id = :userId")
	    long countTotalEventsByUser(@Param("userId") Long userId);
	    
	    @Query("SELECT e FROM Event e WHERE e.user.id = :userId")
	    List<Event> findByUserId(@Param("userId") Long userId);
	    
	    @Query("SELECT SUM(e.salairecautch) + (COUNT(e) * e.salaire) FROM Event e WHERE e.user.id = :userId AND e.acceptation = 'true'")
	    Long calculateUserEarnings(@Param("userId") Long userId);
	    
	    @Query("SELECT COUNT(e) FROM Event e WHERE e.user.id = :userId AND e.acceptation = :acceptation")
	    long countTotalEventsByUserAndAcceptation(@Param("userId") Long userId, @Param("acceptation") String acceptation);
	    
	    @Query("SELECT COUNT(e) FROM Event e WHERE e.user.id = :userId AND YEAR(e.datee) = :year AND MONTH(e.datee) = :month")
	    long countEventsByUserAndMonth(@Param("userId") Long userId, @Param("year") int year, @Param("month") int month);
	    
	    @Query("SELECT SUM(e.salairecautch) + (COUNT(e) * e.salaire) FROM Event e WHERE e.user.id = :userId AND e.acceptation = 'true' AND YEAR(e.datee) = :year AND MONTH(e.datee) = :month")
	    long calculateAcceptedRevenueForUserAndMonth(@Param("userId") Long userId, @Param("year") int year, @Param("month") int month);
	    
	    @Query("SELECT COALESCE(SUM(e.salairecautch) + (COUNT(e) * e.salaire), 0) FROM Event e WHERE e.user.id = :userId AND e.acceptation = 'true' AND YEAR(e.datee) = :year AND MONTH(e.datee) = :previousMonth")
	    long calculateAcceptedRevenueForUserAndPreviousMonth(@Param("userId") Long userId, @Param("year") int year, @Param("previousMonth") int previousMonth);
	    
	    @Query("SELECT e.nom, MONTH(e.datee), DAY(e.datee) FROM Event e WHERE e.user.id = :userId AND e.acceptation = 'true'")
	    List<Object[]> findAcceptedEventsByUserId(@Param("userId") Long userId);
	    
	    List<Event> findAllByAcceptation(String acceptation);
	    
	    @Query(value = "SELECT e FROM Event e ORDER BY e.addedDate DESC")
	    Event findTopByOrderByAddedDateDesc();
	    
	    @Query("SELECT e FROM Event e WHERE e.datee > CURRENT_DATE  AND e.acceptation = 'true' ")
	    List<Event> findTop10ByAcceptationOrderByAddedDateDesc();
	    
	    @Query("SELECT COUNT(e) FROM Event e WHERE e.datee > CURRENT_DATE AND e.acceptation = 'true'")
	    int countEventsAfterCurrentDateAndAccepted();
	    
	    @Query("SELECT COUNT(u) FROM Event e JOIN e.userevente u WHERE e.id = :eventId")
	    Long countUsersByEventId(Long eventId);
	    
	    @Query("SELECT u FROM Event e JOIN e.userevente u WHERE e.id = :eventId")
	    List<User> findUsersByEventId(Long eventId);
	    
	    @Query("SELECT COUNT(e) FROM Event e JOIN e.userevente u WHERE u.id = :userId")
	    int countByUsereventeId(Long userId);
	    
	    @Query("SELECT e, SIZE(e.likeEvente) " +"FROM Event e " +"WHERE e.user.id = :userId " +"ORDER BY SIZE(e.likeEvente) DESC")
	    List<Object[]> findEventsByUserIdWithLikes(@Param("userId") Long userId);
	    
	    @Query("SELECT COUNT(u) FROM Event e JOIN e.likeEvente u WHERE e.id = :eventId")
	    int countLikesByEventId(@Param("eventId") Long eventId);
	    
	    List<Event> findByNomStartingWith(String nom);
}
