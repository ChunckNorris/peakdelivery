import { Component } from '@angular/core';

/**
 * Generated class for the LabelScannerComponent component. 
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'label-scanner',
  templateUrl: 'label-scanner.html'
})
export class LabelScannerComponent {

  text: string;

  constructor() {
    console.log('Hello LabelScannerComponent Component');
    this.text = 'Hello World';
  }

}
