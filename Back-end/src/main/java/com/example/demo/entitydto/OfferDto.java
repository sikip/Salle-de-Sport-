package com.example.demo.entitydto;





import com.example.demo.entity.Offer;

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
public class OfferDto {
    private long id;
    private String nom;
    private double prix;
    private String classe;
    private String month;
    private double message;
    private double entrepr;
    private long salleId; 

    public static OfferDto fromEntity(Offer offer) {
        OfferDto dto = new OfferDto();
        dto.setId(offer.getId());
        dto.setNom(offer.getNom());
        dto.setPrix(offer.getPrix());
        dto.setClasse(offer.getClasse());
        dto.setMonth(offer.getMonth());
        dto.setMessage(offer.getMessage());
        dto.setEntrepr(offer.getEntrepr());
        if (offer.getSalle() != null) {
            dto.setSalleId(offer.getSalle().getId());
        }
        return dto;
    }
}