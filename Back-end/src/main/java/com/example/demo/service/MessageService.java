package com.example.demo.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Message;
import com.example.demo.entity.User;
import com.example.demo.repository.MessageRepositery;
import com.example.demo.repository.UserRepositery;



@Service
public class MessageService {



private final MessageRepositery messageRepositery;
private final UserRepositery userRepositery;


public MessageService(MessageRepositery messageRepositery, UserRepositery userRepositery) {
    this.messageRepositery = messageRepositery;
    this.userRepositery = userRepositery;
}




public ResponseEntity<String> sendMessage(User sender, User recipient, String content) {
    if (sender != null && recipient != null) {
        // Vérifiez si le contenu du message n'est pas vide
        if (content == null || content.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Message content cannot be empty.");
        }
        
        // Créez une nouvelle instance de message et définissez ses propriétés
        Message message = new Message();
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setContent(content);
        message.setAddedDate(new Timestamp(System.currentTimeMillis()));

        // Enregistrez le message
        messageRepositery.save(message);
        
        // Répondez avec le contenu du message
        return ResponseEntity.ok(content);
    } else {
        // Répondez avec un statut NOT_FOUND si l'un des utilisateurs est manquant
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    }
    }
public List<Message> getMessagesBySenderIdAndRecipientId(Long senderId, Long recipientId) {
    // Récupérer les objets User correspondant aux identifiants senderId et recipientId
    User sender = userRepositery.findById(senderId).orElse(null);
    User recipient = userRepositery.findById(recipientId).orElse(null);

    if (sender != null && recipient != null) {
        // Si les utilisateurs existent, rechercher les messages
        return messageRepositery.findBySenderIdAndRecipientId(senderId, recipientId);
    } else {
        // Gérer le cas où l'un des utilisateurs n'existe pas
        return Collections.emptyList();
    }
}
public List<Message> getMessagesByRecipientIdAndSenderId(Long recipientId, Long senderId) {
    // Récupérer les objets User correspondant aux identifiants senderId et recipientId
    User recipient = userRepositery.findById(recipientId).orElse(null);
    User sender = userRepositery.findById(senderId).orElse(null);


    if (sender != null && recipient != null) {
        // Si les utilisateurs existent, rechercher les messages
        return messageRepositery.findByRecipientIdAndSenderId(recipientId, senderId);
    } else {
        // Gérer le cas où l'un des utilisateurs n'existe pas
        return Collections.emptyList();
    }
}
public List<Message> getMixedMessagesByRecipientIdAndSenderId(Long recipientId, Long senderId) {
    User recipient = userRepositery.findById(recipientId).orElse(null);
    User sender = userRepositery.findById(senderId).orElse(null);

    List<Message> mixedMessages = new ArrayList<>();

    if (sender != null && recipient != null) {
        List<Message> recipientMessages = messageRepositery.findBySenderIdAndRecipientId(recipientId, senderId);
        List<Message> senderMessages = messageRepositery.findBySenderIdAndRecipientId(senderId, recipientId);

        mixedMessages.addAll(recipientMessages);
        mixedMessages.addAll(senderMessages);

        mixedMessages.sort((m1, m2) -> m1.getAddedDate().compareTo(m2.getAddedDate()));
    }

    return mixedMessages;
}
}