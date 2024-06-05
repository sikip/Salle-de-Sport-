package com.example.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String date ;
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] image; 
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] image2; 
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] image3; 
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] image4; 
	@Column(length = 1000)
	private String nom;
	private String tag;
	private String petdescription;
	private String nomecrivan;
	private String article;
	private String revieuxadmin;
    private long salaire;
    private long salairecautch;
	private String nomconsei;
	private String paragraphs ;
	private String paragraphe2;
	private String paragraphe3;
	private String acceptation;
	private Timestamp addedDate;
	private Date datee;
    private long nbplace;
    private long prix;
    
    
    @OneToOne
    @JoinColumn(name = "User_id")
    private User user;
    
    @ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = " userevente", 
				joinColumns = @JoinColumn(name = "evente_id"), 
						  inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> userevente  = new HashSet<>();
    
    @ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = " Likeevente", 
				joinColumns = @JoinColumn(name = "evente_id"), 
						  inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> likeEvente  = new HashSet<>();
    
}
