import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.scss'],
})
export class Template1Component implements OnInit {
  resumeForm!: FormGroup;
  constructor(private _fb: FormBuilder) {}
  ngOnInit(): void {
    this.resumeForm = this._fb.group({
      full_name: ['Priyesh Pandey'],
      job_role: ['Senior Software Developer'],
      personal_profile: [
        'A Python developer with 5.8 years of experience in Django, Flask for Retail eCommerce, POS and Storage domain.',
      ],
      contact_info: this.addContactInfo(),
      skills_summary:this.addSkillSummary(),
      awards_received: this.addAwardsReceived(),
      work_experience: new FormArray([]),
    });


   ( this.resumeForm.get('work_experience') as FormArray).push(this.addWorkExperience());

   console.log('this.resumeBuilder',this.resumeForm.value);
  }

  addContactInfo(): FormGroup {
    return this._fb.group({
      address1: ['3205 Eden Drive, Glen Allen'],
      address2: ['Virginia - 23060'],
      email: ['oliviawil@email.net'],
      phone: ['804-931-9418'],
      site_link: ['https://github.com/heympriyesh'],
    });
  }

  addSkillSummary(): FormGroup {
    return this._fb.group({
      skill1: ['Python'],
      skill1_rating: [4, [Validators.required]],
      skill2: ['Python'],
      skill2_rating: [4, [Validators.required]],
      skill3: ['Python'],
      skill3_rating: [4, [Validators.required]],
      skill4: ['Python'],
      skill4_rating: [4, [Validators.required]],
    });
  }

  addWorkExperience():FormGroup{
    return this._fb.group(({
      title:[''],
      org_name:[''],
      role:[],
      start_date:[''],
      end_date:[null],
      point1:[],
      point2:[]
    }))
  }

  addAwardsReceived(){
    return this._fb.group({
      award1:[''],
      award2:[''],
      award3:['']
    })
  }
}
