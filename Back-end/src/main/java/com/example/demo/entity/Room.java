package com.example.demo.entity;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

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
@Table(	name = "room") 
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private long id;
    @NotBlank(message = "Name cannot be empty")
    @Size(min = 8, max = 8, message = "The number must contain exactly 8 characters")
    @Pattern(regexp = "^\\d{8}$", message = "The number field must contain exactly 8 digits")
	private String numero;

    @NotBlank(message = "The time field cannot be empty")
    @Size(min = 3, max = 50, message = "The time field must contain between 3 and 50 characters")
	private String time;


    @NotBlank(message = "The email field cannot be empty")
    @Email(message = "The email field must be a valid email address")
	private String email;

	
    @NotBlank(message = "The location field cannot be empty")
	private String localisation;


    @NotBlank(message = "Field locationexact cannot be empty")
	private String locationexact;


    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
	private Double latitude;


    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
	private Double longitude;
	

    @NotBlank(message = "Field slogon1 cannot be empty")
	private String slogon1;

	
    @NotBlank(message = "Field slogon1 cannot be empty")
	private String slogon2;

    @NotBlank(message = "Field slogon1 cannot be emptye")
	private String name;
    
    @Positive(message = "The price must be positive")
	private long prix;
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] image; 

	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] imageslid1; 

	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] imagessignateure; 
}
