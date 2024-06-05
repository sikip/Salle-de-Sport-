package com.example.demo.entity;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private long id;
	private String nom;
    private String email;
    private String commentaire;
	private Date addedDate;
	   @OneToOne
	    @JoinColumn(name = "event_id")
	    private Event event;
}