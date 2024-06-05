package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Classes;
import com.example.demo.entity.User;
import com.example.demo.repository.ClassesRepoitery;
import com.example.demo.repository.UserRepositery;




@Service
public class ClassesService {

    private final ClassesRepoitery classesRepoitery;
    private final UserRepositery userRepositery;

    public ClassesService(ClassesRepoitery classesRepoitery, UserRepositery userRepositery) {
        this.classesRepoitery = classesRepoitery;
        this.userRepositery = userRepositery;
    }

	public Classes addclasses(Classes classes) {

		return classesRepoitery.save(classes);
	}


	public List<Classes> getAllClasses() {

		return classesRepoitery.findAll();
	}
	 public void inscrireUtilisateurAClasse(long userId, long classeId) {
	        Optional<Classes> optionalClasse = classesRepoitery.findById(classeId);
	        if (optionalClasse.isPresent()) {
	        	Classes classe = optionalClasse.get();
	            Optional<User> optionalUser = userRepositery.findById(userId);
	            if (optionalUser.isPresent()) {
	                User user = optionalUser.get();
	                classe.getUsercalsse2().add(user);
	                classesRepoitery.save(classe);
	            } else {
	                throw new IllegalArgumentException("Utilisateur non trouvé avec l'ID : " + userId);
	            }
	        } else {
	            throw new IllegalArgumentException("Classe non trouvée avec l'ID : " + classeId);
	        }
	    }
	  public List<Classes> findClassesByUserId(long userId) {
	        return classesRepoitery.findClassesByUserId(userId);
	    }
	    public int countClassesByUserId(long userId) {
	        return classesRepoitery.countClassesByUserId(userId);
	    }
		public Classes getClasseByID(Long id) {
	
		     return classesRepoitery.findById(id).orElse(null);
		}
	    public long countUsersByClasseId(Long classeId) {
	        return classesRepoitery.countuserclasse(classeId);
	    }
	    public List<User> getUsersByClasseId(Long classeId) {
	        return classesRepoitery.findUsersByClasseId(classeId);
	    }
	    
	    
	    

}
