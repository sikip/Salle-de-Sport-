package com.example.demo.entity;

import java.time.LocalTime;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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

public class Classes {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
     private long id;
	private String name;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "registration_date", nullable = false)
    private Date date;
    private String addedDayOfWeek; 
    private Date addedDate;

    private LocalTime registrationTimedebut;
    private LocalTime registrationTifin;

	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] image; 
    private String nomprof;
    private long  nbrseance;
    private long prix;
    
    private String profmail;
    private long proftel;
    
    @ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = " usercalsse2", 
				joinColumns = @JoinColumn(name = "classe_id"), 
						  inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> usercalsse2  = new HashSet<>();
 
	@OneToOne
	@JoinColumn(name = "User")
	private User User; 



}

