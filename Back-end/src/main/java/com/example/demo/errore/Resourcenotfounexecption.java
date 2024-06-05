package com.example.demo.errore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class Resourcenotfounexecption extends RuntimeException {

    private static final long serialVersionUID = 1L;
    private final boolean status;
    private final String message;

 

  

}