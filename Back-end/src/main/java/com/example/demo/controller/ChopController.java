package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Chop;
import com.example.demo.service.ChopService;


@CrossOrigin(origins = "*")
@RestController
public class ChopController {
	private final ChopService chopService;

	public ChopController(ChopService chopService) {
	    this.chopService = chopService;
	}

@GetMapping("/getallchop")
public List<Chop> getAllChops() {
     return chopService.getAllChops();
 }
@GetMapping("/tchort")
public List<Chop> getChopsByTypeTchort() {
     return chopService.getChopsByTypeTchort();
 }
@GetMapping("/short")
public List<Chop> getChopsByTypeShort() {
     return chopService.getChopsByTypeShort();
 }
@GetMapping("/pontallon")
public List<Chop> getChopsByTypePantalon() {
     return chopService.getChopsByTypePantalon();
 }
@GetMapping("/Débardeur")
public List<Chop> getChopsByTypeDébardeur() {
     return chopService.getChopsByTypeDébardeur();
 }
@GetMapping("/Survêtement")
public List<Chop> getChopsByTypeSurvêtement() {
     return chopService.getChopsByTypeSurvêtement();
 }
@GetMapping("/Legging")
public List<Chop> getChopsByTypeLegging() {
     return chopService.getChopsByTypeLegging();
 }
@GetMapping("/Chaussures")
public List<Chop> getChopsByTypeChaussures() {
     return chopService.getChopsByTypeChaussures();
 }
@GetMapping("/chopsprix")
 public List<Chop> searchChopsByPriceRange(@RequestParam("min") long minPrice, @RequestParam("max") long maxPrice) {
     return chopService.searchChopsByPriceRange(minPrice, maxPrice);
 }
	   @GetMapping("/wheyprotein")
	   public List<Chop> getChopsByTypewheyprotein() {
	        return chopService.getChopsByTypewheyprotein();
	    }
	   @GetMapping("/caséine")
	   public List<Chop> getChopsByTypecaséine() {
	        return chopService.getChopsByTypecaséine();
	    }
	   @GetMapping("/poid")
	   public List<Chop> getChopsByTypePOId() {
	        return chopService.getChopsByTypePOId();
	    }
	   @GetMapping("/riz")
	   public List<Chop> getChopsByTypeRiz() {
	        return chopService.getChopsByTypeRiz();
	    }
	    @GetMapping("/chop/{id}")
	    public Chop getChopById(@PathVariable long id) {
	        return chopService.getById(id);
	    }
	   
	    @PostMapping("/addtocart/{userId}/{id}")
	    public ResponseEntity<String> addToCart(@PathVariable long userId, @PathVariable long id) {
	    	chopService.addToCart(userId, id);
	        return ResponseEntity.ok("Chop added to cart successfully");
	    }
	    @GetMapping("/countchop/{userId}")
	    public int countChopsByUserId(@PathVariable Long userId) {
	        return chopService.countChopsByUserId(userId);
	    }
	    @GetMapping("/userpanier/{userId}")
	    public ResponseEntity<List<Chop>> getChopsByUserId(@PathVariable Long userId) {
	        List<Chop> chops = chopService.findChopsByUserId(userId);
	        return new ResponseEntity<>(chops, HttpStatus.OK);
	    }
	    @GetMapping("/calculateprice/{id}")
	    public ResponseEntity<Long> calculatePriceWithPercentageDiscount(@PathVariable Long id) {
	        Long calculatedPrice = chopService.calculatePriceWithPercentageDiscount(id);
	        return new ResponseEntity<>(calculatedPrice, HttpStatus.OK);
	    }
	    @PostMapping("/addToCartpayment/{userId}/{id}")
	    public ResponseEntity<String> addToCartpayment(@PathVariable long userId, @PathVariable long id) {
	    	chopService.addToCartPayment(userId, id);
	        return ResponseEntity.ok("Chop added to payment successfully");
	    }
	    @GetMapping("/userpanierpayment/{userId}")
	    public ResponseEntity<List<Chop>> findChopsByUserpaymentchopId(@PathVariable Long userId) {
	        List<Chop> chops = chopService.findChopsByUserpaymentchopId(userId);
	        return new ResponseEntity<>(chops, HttpStatus.OK);
	    }
}

