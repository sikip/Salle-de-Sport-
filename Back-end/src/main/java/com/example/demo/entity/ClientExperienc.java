package com.example.demo.entity;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ClientExperienc {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long beforekilo;
	private Long afterkilo;
	private String name;
	private Long week;
	private Long fatbefor;
	private Long fatafter;
	private String comextern;
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] image; 
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] image2;
	@OneToOne
	@JoinColumn(name = "userRoom")
	private Room userRoom;
}
