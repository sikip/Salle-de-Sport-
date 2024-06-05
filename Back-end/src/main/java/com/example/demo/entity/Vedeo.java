package com.example.demo.entity;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
public class Vedeo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private long id;
	private String title;
	private String descrption;
	private String tags;
	private String videoName;
	private Date addedDate;
	   @ManyToOne
	    @JoinColumn(name = "event_id")
	    private Event event;
	   @ManyToOne
	    @JoinColumn(name = "classe_id")
	    private Classes classe;
}
