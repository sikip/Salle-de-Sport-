package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ClientExperienc;

@Repository
public interface ClientExperiencerepositery extends JpaRepository<ClientExperienc, Long> {

}
