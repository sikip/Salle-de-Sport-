package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Classes;
import com.example.demo.entity.User;



@Repository
public interface ClassesRepoitery extends JpaRepository<Classes, Long> {
    @Query("SELECT c FROM Classes c JOIN c.usercalsse2 u WHERE u.id = :userId")
    List<Classes> findClassesByUserId(@Param("userId") long userId);
    @Query("SELECT COUNT(c) FROM Classes c JOIN c.usercalsse2 u WHERE u.id = :userId")
    int countClassesByUserId(@Param("userId") long userId);
    @Query("SELECT COUNT(u) FROM Classes c JOIN c.usercalsse2 u WHERE c.id = :classeId")
    long countuserclasse(Long classeId);
    @Query("SELECT u FROM Classes c JOIN c.usercalsse2 u WHERE c.id = :classeId")
    List<User> findUsersByClasseId(Long classeId);
    List<Classes> findByNameStartingWith(String name);
}
