package com.example.demo.entitydto;

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
public class RoomDto {
	private long id;

    private String numero;

    private String time;

    private String email;


    private String localisation;

    private String locationexact;


    private Double latitude;


    private Double longitude;


    private String slogon1;


    private String slogon2;

 

    private String name;


    private long prix;

    private byte[] image;

    private byte[] imageslid1;

    private byte[] imagessignateure;
}
