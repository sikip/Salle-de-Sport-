package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Message;


@Repository
public interface MessageRepositery extends JpaRepository<Message, Long> {
	 List<Message> findBySenderIdAndRecipientId(Long senderId, Long recipientId);
	 List<Message> findByRecipientIdAndSenderId(Long recipientId, Long senderId);
	
}
