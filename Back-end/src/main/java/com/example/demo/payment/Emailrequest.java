package com.example.demo.payment;

public class Emailrequest {
	 private String name;
	    private String email;
	    private String message;
	    private Long number;
		public String getName() {
			return name;
		}
		public Long getNumber() {
			return number;
		}
		public void setNumber(Long number) {
			this.number = number;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getEmail() {
			return email;
		}
		@Override
		public String toString() {
			return "Emailrequest [name=" + name + ", email=" + email + ", message=" + message + "]";
		}
		public Emailrequest() {
			super();

		}
		public Emailrequest(String name, String email, String message ,Long number) {
			super();
			this.name = name;
			this.email = email;
			this.message = message;
			this.number= number;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}
}
