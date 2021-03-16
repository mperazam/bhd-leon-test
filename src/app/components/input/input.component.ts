import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {

  @Input() placeholder: string;
  @Input() requiredMsg: string;
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  @Input() inputType: string;

  constructor() {}

}
