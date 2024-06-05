package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data 
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "OFFER")
public class Offer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private long id;
	
    @NotBlank(message = "Name cannot be empty")
	private String nom;
    
    @Positive(message = "The price must be positive")
	private double prix;
    
    @NotBlank(message = "The 'class' field cannot be empty")
	private String classe;
    
    @NotBlank(message = "The 'month' field cannot be empty")
	private String month;
    
    @Positive(message = "The message must be positive")
	private double message;
       
    @Positive(message = "The entrepr must be positive")
	private double entrepr;
	
	@OneToOne
	@JoinColumn(name = "salle")
	private Room salle;
	
}
