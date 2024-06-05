package com.example.demo.payload;

import java.util.List;

public class JwtResponse {

	 	private Long id;
	    private String username;
	    private String email;
	    private List<String> roles;
	    private String jwt;
	    private String userPay;
	    private String confuser;
	  
	    public String getConfuser() {
			return confuser;
		}
		public void setConfuser(String confuser) {
			this.confuser = confuser;
		}
		public String getUserPay() {
			return userPay;
		}
		public void setUserPay(String userPay) {
			this.userPay = userPay;
		}
		public JwtResponse(Long id, String username, String email, List<String> roles, String jwt ,String userPay,String confuser) {
	        this.id = id;
	        this.username = username;
	        this.email = email;
	        this.roles = roles;
	        this.jwt = jwt;
	        this.userPay=userPay;
	        this.confuser=confuser;
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
	    public List<String> getRoles() {
	        return roles;
	    }
	    public void setRoles(List<String> roles) {
	        this.roles = roles;
	    }
	    public String getJwt() {
	        return jwt;
	    }
	    public void setJwt(String jwt) {
	        this.jwt = jwt;
	    }

	    
	
}
