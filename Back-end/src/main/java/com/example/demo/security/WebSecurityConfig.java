package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.security.service.UserDetailsServiceImpl;



@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		// securedEnabled = true,
		// jsr250Enabled = true,
		prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsServiceImpl userDetailsService;
    private final AuthEntryPointJwt unauthorizedHandler;
    private final JwtUtils jwtUtils;

    public WebSecurityConfig(UserDetailsServiceImpl userDetailsService,
                             AuthEntryPointJwt unauthorizedHandler,
                             JwtUtils jwtUtils) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter(jwtUtils, userDetailsService);
    }

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
				.antMatchers("/api/auth/**").permitAll()
				.antMatchers("/addRole**").permitAll().
				antMatchers("/signup**").permitAll()
				.antMatchers("/signin**").permitAll()
				.antMatchers("/reset-password**").permitAll()
				.antMatchers("/classes**").permitAll()
				.antMatchers("/attribut/{userId}**").permitAll()
				.antMatchers("/countByMonth**").permitAll()            
				.antMatchers("/addtocartoffee/{userId}/{id}**").permitAll()            
				.antMatchers("/generatepayment2/{userId}/{id}**").permitAll()            
				.antMatchers("/offres/{id}**").permitAll()            
				.antMatchers("/addclass**").permitAll()
				.antMatchers("/sall/{id}**").permitAll()    
				.antMatchers("/sendsalleinfoemail**").permitAll()    
				.antMatchers("/confirm-registration/{email}**").permitAll()    
				.antMatchers("/{clientId}**").permitAll()
				.antMatchers("/eventtes/{eventId}**").permitAll()  
				.antMatchers("/getallevent**").permitAll()  
			    .antMatchers("/eventsimage2/{id}**").permitAll()
				.antMatchers("/event-count**").permitAll()
				.antMatchers("/{id}/images34**").permitAll()
				.antMatchers("/getuser**").permitAll()
				.antMatchers("/cautch**").permitAll()
				.antMatchers("/acceptedclient/{userId}**").permitAll()          
				.antMatchers("/classe/{id}**").permitAll()
				.antMatchers("/{userId}/vlient**").permitAll()
				.antMatchers("/getevent**").permitAll()
				.antMatchers("/findByidEvente/{id}**").permitAll()
				.antMatchers("/client-count**").permitAll()
				.antMatchers("/lastAccepted**").permitAll()
				.antMatchers("/useracept/{userId}**").permitAll()
				.antMatchers("/cautche-count**").permitAll()
				.antMatchers("/initiate**").permitAll()
				.antMatchers("/callback**").permitAll()
				.antMatchers("/add**").permitAll()    
				.antMatchers("/qrcode/{userId}**").permitAll()    
				.antMatchers("/addcautche**").permitAll()
				.antMatchers("/addpub/{cautchId}**").permitAll()
				.antMatchers("/{eventId}/comments**").permitAll()
				.antMatchers("/getcommentaire**").permitAll()
				.antMatchers("/passed**").permitAll()
				.antMatchers("/vedeo2/{classeID}**").permitAll()
				.antMatchers("/playVideoByClasseId/{classeId}**")
				.permitAll().antMatchers("/addevent**").permitAll()
				.antMatchers("/addsalle**").permitAll()
				.antMatchers("/getAllOffre**").permitAll()
				.antMatchers("/search**").permitAll()
				.antMatchers("/countuserclasse/{classeId}**").permitAll()
				.antMatchers("/send-message/{senderId}/{recipientId}**").permitAll()       
				.antMatchers("/revieuxchop/{userId}/{id}**").permitAll()       
				.antMatchers("/choprevcount/{chopId}**").permitAll()    
				.antMatchers("/calculateprice/{id}**").permitAll()     
				.antMatchers("/message/{senderId}/{recipientId}**").permitAll()
				.antMatchers("/message2/{recipientId}/{userId}**").permitAll()
				.antMatchers("/userlikeev/{userId}**").permitAll()
				.antMatchers("/updateuser/{userId}**").permitAll().
				antMatchers("/likesnumber/{eventId}**")
				.permitAll().antMatchers("/save**").permitAll()
				.antMatchers("/allvideo**").permitAll()
				.antMatchers("/updateuser2/{userId}**").permitAll()
				.antMatchers("/updateuser3/{userId}**").permitAll()
				.antMatchers("/userimage/{userId}**").permitAll()
				.antMatchers("/getsall**").permitAll()
				.antMatchers("/admin/{userId}**").permitAll()
				.antMatchers("/publication/details**").permitAll()
				.antMatchers("/usersclasseassocier/{classeId}**").permitAll()
				.antMatchers("/inscriptionevent/{userId}/{eventeId}**").permitAll()
				.antMatchers("/s1/{id}**").permitAll()
				.antMatchers("/{salleId}/images**").permitAll()
				.antMatchers("/events/countAfterDate**").permitAll()
				.antMatchers("/eventsuser/{eventId}**").permitAll()
				.antMatchers("/eventuser2/{eventId}**").permitAll()
				.antMatchers("/userevv/{userId}**").permitAll()
				.antMatchers("/videos/{id}**").permitAll()
				.antMatchers("/like/{eventId}**").permitAll()
				.antMatchers("/vedeo/{eventvedeoId}**").permitAll()
				.antMatchers("/allusers**").permitAll()
				.antMatchers("/update2/{id}**").permitAll()
				.antMatchers("/{eventId}/cautch-details**").permitAll()
				.antMatchers("/evcotch/{cautchId}**").permitAll()
				.antMatchers("/playVideoByEventId/{eventId}**").permitAll()
				.antMatchers("/post2/{id}**").permitAll()
				.antMatchers("/users/{id}**").permitAll()
				.antMatchers("/post/{id}**").permitAll()  
				.antMatchers("/verify/{paymentId}**").permitAll()       
				.antMatchers("/generatepayment/{userId}**").permitAll()       
				.antMatchers("/play/{id}**").permitAll()        
				.antMatchers("/eventsimagetitle/{id}**").permitAll()        
				.antMatchers("/sendEmailadmin**").permitAll()         
				.antMatchers("/classesRevieux/{classesId}/{userId}**").permitAll()         
				.antMatchers("/getclassesRevieux**").permitAll()         
				.antMatchers("/play2/{id}**").permitAll()
				.antMatchers("/count/{userId}**").permitAll()
				.antMatchers("/calculate/{userId}**").permitAll()
				.antMatchers("/eventsacepted/{userId}**").permitAll()
				.antMatchers("/eventsMoi/{userId}**").permitAll()
				.antMatchers("/inscriptioniv/{userId}/{eventId}**").permitAll() 
				.antMatchers("/addToCartpayment/{userId}/{id}**").permitAll() 
				.antMatchers("/userpanierpayment/{userId}**").permitAll()    
				.antMatchers("/searchChop**").permitAll() 
				.antMatchers("/tchort**").permitAll()         
				.antMatchers("/clientexperiences/{id}**").permitAll()    
				.antMatchers("/allexperience**").permitAll()       
				.antMatchers("/findrevieuxByChopId/{id}**").permitAll()         
				.antMatchers("/short**").permitAll() 
				.antMatchers("/pontallon**").permitAll() 
				.antMatchers("/Débardeur**").permitAll() 
				.antMatchers("/countchop/{userId}**").permitAll() 
				.antMatchers("/userpanier/{userId}**").permitAll() 
				.antMatchers("/Survêtement**").permitAll() 
				.antMatchers("/Legging**").permitAll() 
				.antMatchers("/Chaussures**").permitAll() 
				.antMatchers("/chopsprix**").permitAll()           
				.antMatchers("/clientexperiences**").permitAll()           
				.antMatchers("/wheyprotein**").permitAll()     
				.antMatchers("/caséine**").permitAll()     
				.antMatchers("/poid**").permitAll()     
				.antMatchers("/riz**").permitAll()     
				.antMatchers("/createOrder**").permitAll()     
				.antMatchers("/checkIfLiked/{userId}/{eventId}**").permitAll()   
				.antMatchers("/chop/{id}**").permitAll()   
				.antMatchers("/addtocart/{userId}/{id}**").permitAll()   
				.antMatchers("/eventsaceptedsalaire/{userId}**").permitAll()
				.antMatchers("/eventsper/{userId}**").permitAll()
				.antMatchers("/eventsindice/{userId}**").permitAll()
				.antMatchers("/insererAttributs/{id}**")
				.permitAll().antMatchers("/updatesalle/{id}**").permitAll()
				.antMatchers("/totalaccepted**").permitAll()
				.antMatchers("/eventfalse**").permitAll()
				.antMatchers("/getall**").permitAll().antMatchers("/user**")
				.permitAll().antMatchers("/withEventName**").permitAll()
				.antMatchers("/searchUser**").permitAll()
				.antMatchers("/eventmois/{userId}**").permitAll()         
				.antMatchers("/{id}/imagesphoto4**").permitAll()         
				.antMatchers("/update/{id}").permitAll()
				.antMatchers("/commentaires/{eventId}**").permitAll()
				.antMatchers("/getallchop**").permitAll()
				.antMatchers("/topevent/{userId}**").permitAll()
				.antMatchers("/nomeventaccept/{userId}**").permitAll()
				.antMatchers("/userevents/{userId}**").permitAll()
				.antMatchers("/commantaire-count**").permitAll()
				.antMatchers("/evcotch/{userId}**").permitAll()						
				.antMatchers("/countclasse/{userId}**").permitAll()
				.antMatchers("/inscription/{userId}/{classeId}**")
				.permitAll().antMatchers("/userclasse/{userId}**").permitAll()
				.antMatchers("/false**").permitAll()
				.antMatchers("/api/test/**").permitAll().anyRequest().authenticated();
		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}
}