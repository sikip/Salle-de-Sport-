package com.example.demo.entity;

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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



@Entity
@Table(	name = "users", 
		uniqueConstraints = { 
			@UniqueConstraint(columnNames = "username"),
			@UniqueConstraint(columnNames = "email") 
		})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	@Size(max = 20)
	private String username;
    @NotBlank
	@Size(max = 50)
	@Email
	private String email;
    @NotBlank
	@Size(max = 120)
	private String password;
    
    
    private String userPay = "false";
    private String confuser = "false";
    
    public String getConfuser() {
		return confuser;
	}

	public void setConfuser(String confuser) {
		this.confuser = confuser;
	}

	public String isUserPay() {
		return userPay;
	}

	public void setUserPay(String userPay) {
		this.userPay = userPay;
	}

	private double telephone;  
    
    public double getTelephone() {
		return telephone;
	}

	public void setTelephone(double telephone2) {
		this.telephone = telephone2;
	}

	private double janfi;
	private double fivri;
	private double mars; 
	private double avrile;
	private double mais;
	private double juin;
	private double juilliat;
	private double aute;
	private double septembre;
	private double octobre;
	private double decembre;
	private double nauvembre;
	
	private String type;
	
	private double confibm;
    
    private double poid;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "registration_date", nullable = false)
    private Date registrationDate;
    
    
    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }
	
	private String revieux;
	private String commentaire;
	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] image; 

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "useroffre", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "offre_id"))
	private Set<Offer> offre = new HashSet<>();
		public Set<Offer> getOffre() {
		return offre;
	}

	public void setOffre(Set<Offer> offre) {
		this.offre = offre;
	}

	@OneToOne
	@JoinColumn(name = "userRoom")
	private Room userRoom;
		
	@OneToMany(mappedBy = "user")
	private Set<ClassesRevieux> reviewAssociations = new HashSet<>();

	public User() {
		this.registrationDate = new Date();
	}
	 public User(String username, String email, String password  ) {
	        this.username = username;
	        this.email = email;
	        this.password = password;
	    }
	 
	 public User(String revieux, byte[] image, Date registrationDate, String commentaire, String username, double confibm, double poid, double telephone, double janfi, double fivri, double mars, double avrile
			 , double mais, double juin, double juilliat, double aute, double septembre, double octobre, double decembre, double nauvembre,String email, String userPay,String type) {
		    this.revieux = revieux;
		    this.image = image;
		    this.registrationDate = registrationDate;
		    this.commentaire = commentaire;
		    this.username = username;
		    this.confibm = confibm;
		    this.poid = poid;
		    this.telephone = telephone;
		    this.janfi = janfi;
		    this.fivri = fivri;
		    this.mars = mars;
		    this.avrile = avrile;
		    this.mais = mais;
		    this.juin = juin;
		    this.juilliat = juilliat;
		    this.aute = aute;
		    this.septembre = septembre;
		    this.octobre = octobre;
		    this.decembre = decembre;
		    this.nauvembre = nauvembre;
		    this.username = username;
		    this.email = email;
		    this.userPay= userPay;
		    this.type=type;
		}




	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getJanfi() {
		return janfi;
	}

	public void setJanfi(double janfi) {
		this.janfi = janfi;
	}

	public double getFivri() {
		return fivri;
	}

	public void setFivri(double fivri) {
		this.fivri = fivri;
	}

	public double getMars() {
		return mars;
	}

	public void setMars(double mars) {
		this.mars = mars;
	}

	public double getAvrile() {
		return avrile;
	}

	public void setAvrile(double avrile) {
		this.avrile = avrile;
	}

	public double getMais() {
		return mais;
	}

	public void setMais(double mais) {
		this.mais = mais;
	}

	public double getJuin() {
		return juin;
	}

	public void setJuin(double juin) {
		this.juin = juin;
	}

	public double getJuilliat() {
		return juilliat;
	}

	public void setJuilliat(double juilliat) {
		this.juilliat = juilliat;
	}

	public double getAute() {
		return aute;
	}

	public void setAute(double aute) {
		this.aute = aute;
	}

	public double getSeptembre() {
		return septembre;
	}

	public void setSeptembre(double septembre) {
		this.septembre = septembre;
	}

	public double getOctobre() {
		return octobre;
	}

	public void setOctobre(double octobre) {
		this.octobre = octobre;
	}

	public double getDecembre() {
		return decembre;
	}

	public void setDecembre(double decembre) {
		this.decembre = decembre;
	}

	public double getNauvembre() {
		return nauvembre;
	}

	public void setNauvembre(double nauvembre) {
		this.nauvembre = nauvembre;
	}

	public double getPoid() {
		return poid;
	}

	public void setPoid(double poid2) {
		this.poid = poid2;
	}

	public double getConfibm() {
		return confibm;
	}

	public void setConfibm(double confibm) {
		this.confibm = confibm;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRevieux() {
		return revieux;
	}
	public void setRevieux(String revieux) {
		this.revieux = revieux;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Room getUserRoom() {
		return userRoom;
	}

	public void setUserRoom(Room userRoom) {
		this.userRoom = userRoom;
	}

	    
}