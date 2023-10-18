import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { FormControl, FormControlName} from '@angular/forms';
@Component({
  selector: 'resume-builder-input',
  templateUrl: './resume-builder-input.component.html',
  styleUrls: ['./resume-builder-input.component.scss'],
 
})
export class ResumeBuilderInputComponent implements  OnInit {
  @Input()
  label!: string;
  @Input()
  placeholder!: string;
  @Input()
  type!: string;
  @Input()
  id!: string;
  @Input()
  control!: FormControl; // For FormControl binding
  @Input() ngModelValue: any; // For ngModel binding
  ngOnInit() {
    // console.log("🚀 ~ file: resume-builder-input.component.ts:23 ~ ResumeBuilderInputComponent ~ ngOnInit ~ this.control:", this.control)
    if (this.control && this.ngModelValue) {
      this.control.setValue(this.ngModelValue);
    }
  }
  

}
