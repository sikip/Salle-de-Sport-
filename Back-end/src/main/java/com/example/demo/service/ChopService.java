package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Chop;
import com.example.demo.entity.User;
import com.example.demo.repository.ChopRepositery;
import com.example.demo.repository.UserRepositery;



@Service
public class ChopService {
	@Autowired
	ChopRepositery chopRepositery;
	@Autowired
    UserRepositery userRepositery;
	
	public List<Chop> getAllChops() {
	    return chopRepositery.findAll();
	}
	public List<Chop> getChopsByTypeTchort() {
	    return chopRepositery.findByType("tchort");
	}
	public List<Chop> getChopsByTypeShort () {
	    return chopRepositery.findByType("Short ");
	}
	public List<Chop> getChopsByTypePantalon() {
	    return chopRepositery.findByType("Pantalon");
	}
	public List<Chop> getChopsByTypeDébardeur() {
	    return chopRepositery.findByType("Débardeur");
	}
	public List<Chop> getChopsByTypeSurvêtement() {
	    return chopRepositery.findByType("Survêtement");
	}
	public List<Chop> getChopsByTypeLegging() {
	    return chopRepositery.findByType("Legging");
	}
	public List<Chop> getChopsByTypeChaussures() {
	    return chopRepositery.findByType("Chaussures");
	}
	public List<Chop> searchChopsByPriceRange(long prixMin, long prixMax) {
	    return chopRepositery.findByPrixBetween(prixMin, prixMax);
	}
	public List<Chop> getChopsByTypewheyprotein() {
	    return chopRepositery.findByType("wheyprotein");
	}
	public List<Chop> getChopsByTypecaséine () {
	    return chopRepositery.findByType("caséine ");
	}
	public List<Chop> getChopsByTypePOId () {
	    return chopRepositery.findByType("poid");
	}
	public List<Chop> getChopsByTypeRiz () {
	    return chopRepositery.findByType("riz");
	}
	public Chop getById(long id) {
	    return chopRepositery.findById(id).orElse(null);
	}
	public void addToCart(long userId, long chopId) {
	    Optional<User> optionalUser = userRepositery.findById(userId);
	    Optional<Chop> optionalChop = chopRepositery.findById(chopId);

	    if (optionalUser.isPresent() && optionalChop.isPresent()) {
	        User user = optionalUser.get();
	        Chop chop = optionalChop.get();
	        chop.getUserchop().add(user); // Add chop to user's cart
	        chopRepositery.save(chop); // Save the updated chop
	    }
	}
	public int countChopsByUserId(Long userId) {
	    return chopRepositery.countByUserchopId(userId);
	}
	public List<Chop> findChopsByUserId(Long userId) {
	    return chopRepositery.findChopsByUserchopId(userId);
	}
	public Long calculatePriceWithPercentageDiscount(Long chopId) {
	    Chop chop = chopRepositery.findById(chopId).orElse(null);
	    if (chop == null || chop.getPersentage() <= 0) {
	        return chop.getPrix();
	    }
	    double discount = chop.getPrix() * chop.getPersentage() / 100;
	    return chop.getPrix() - Math.round(discount);
	}
	@Transactional
	public void addToCartPayment(long userId, long chopId) {
	    Optional<User> optionalUser = userRepositery.findById(userId);
	    Optional<Chop> optionalChop = chopRepositery.findById(chopId);

	    if (optionalUser.isPresent() && optionalChop.isPresent()) {
	        User user = optionalUser.get();
	        Chop chop = optionalChop.get();

	        if (chop.getKontiter() > 0) {
	            chop.setKontiter(chop.getKontiter() - 1);
	            chop.getUserpaymentchop().add(user);
	            chopRepositery.save(chop);
	        } else {
	            throw new RuntimeException("La chop est en rupture de stock.");
	        }
	    } else {
	        throw new RuntimeException("Utilisateur ou chop introuvable.");
	    }
	}
	public List<Chop> findChopsByUserpaymentchopId(Long userId) {
	    return chopRepositery.findChopsByUserpaymentchopId(userId);
	}



	}

