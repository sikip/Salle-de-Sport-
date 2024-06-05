package com.example.demo.entity;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
@Table(name = "chop")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Chop {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
     private long id;
	 private String name;
	 private long prix;
	 private String type;
     private Timestamp addedDate;
     private long persentage;
     private long starRating;
     private long kontiter;
     private String size;
     private String color;
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] imageslid1; 
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] imageslid2; 
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] imageslid3; 
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] imageslid4; 
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "userchop", 
				joinColumns = @JoinColumn(name = "chop_id"), 
				inverseJoinColumns = @JoinColumn (name = "user_id"))
    private Set<User> userchop = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "userpaymentchop", 
				joinColumns = @JoinColumn(name = "chop_id"), 
				inverseJoinColumns = @JoinColumn (name = "user_id"))
    private Set<User> userpaymentchop = new HashSet<>();
	
	
}
