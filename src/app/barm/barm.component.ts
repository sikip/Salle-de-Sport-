import { Component } from '@angular/core';

@Component({
  selector: 'app-barm',
  templateUrl: './barm.component.html',
  styleUrls: ['./barm.component.css']
})
export class BarmComponent {
  menuItems = [
    'Loan Calculator',
    'Compare',
    'Contact',
    'Faq',
    'Log In',
    'Sign up',
    'Service',
    'Terms & Condition'
  ];
}
