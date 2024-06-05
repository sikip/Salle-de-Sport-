import { Component } from '@angular/core';

@Component({
  selector: 'app-recom',
  templateUrl: './recom.component.html',
  styleUrls: ['./recom.component.css']
})
export class RecomComponent {
  weight: number = 0;
  height: number = 0;
  gender: string = '';
  age: number = 0;
  bmi: number = 0;
  bmiCategory: string = '';
  bmr: number = 0;
  tdee: number = 0;
  activityLevels = [
    { label: 'Sédentaire (peu ou pas exercice)', value: 1.2 },
    { label: 'Légèrement actif (exercice léger/sport 1-2 jours/semaine)', value: 1.375 },
    { label: 'Modérément actif (exercice modéré/sport 3 jours/semaine) ', value: 1.55 },
    { label: 'Très actif (exercice intense/sport 4 jours/semaine)', value: 1.725 },
    { label: 'Extrêmement actif (exercice très intense/sport 5-6 jours/semaine)', value: 1.9 }
  ];
  selectedChoice: string = '';



  selectedActivityLevel: number = this.activityLevels[0].value;
  weightLossRecommendations: string[] = [];


  calculateBMI() {
    if (this.weight && this.height) {
      this.bmi = this.weight / Math.pow(this.height / 100, 2);
      this.determineBMICategory();
      this.calculateBMR();
      this.calculateTDEE();
   
    }
  }
  
  determineBMICategory() {
    if (this.bmi < 18.5) {
      this.bmiCategory = 'Underweight';
    } else if (this.bmi >= 18.5 && this.bmi < 24.9) {
      this.bmiCategory = 'Normal weight';
    } else if (this.bmi >= 25 && this.bmi < 29.9) {
      this.bmiCategory = 'Overweight';
    } else {
      this.bmiCategory = 'Obese';
    }
  }

  calculateBMR() {
    if (this.gender === 'male') {
      this.bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age + 5;
    } else if (this.gender === 'female') {
      this.bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;
    }
  }

  calculateTDEE() {
    this.tdee = this.bmr * this.selectedActivityLevel;
  }

}
