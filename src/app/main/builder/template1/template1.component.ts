import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from "@angular/forms";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
// import * as html2pdf from 'html2pdf.js';
@Component({
  selector: "app-template1",
  templateUrl: "./template1.component.html",
  styleUrls: ["./template1.component.scss"],
})
export class Template1Component implements OnInit, AfterViewInit {
  @ViewChild("pdfContent", { static: false }) pdfContent!: ElementRef;
  @ViewChild("noForm") noForm!: TemplateRef<any>;
  @ViewChild("contactInfoForm") contactInfoForm!: TemplateRef<any>;
  @ViewChild("skillSummary") skillSummaryTemplae!: TemplateRef<any>;

  resumeForm!: FormGroup;
  contact_info!: FormGroup;
  skills_summary!: FormGroup;

  selectedTemplate!: TemplateRef<any>;

  constructor(private _fb: FormBuilder) {}
  ngOnInit(): void {
    this.resumeForm = this._fb.group({
      full_name: ["Priyesh Pandey"],
      job_role: ["Senior Software Developer"],
      personal_profile: [
        "A Python developer with 5.8 years of experience in Django, Flask for Retail eCommerce, POS and Storage domain.",
      ],
      // contact_info: this.addContactInfo(),
      // skills_summary: this.addSkillSummary(),
      awards_received: this.addAwardsReceived(),
      work_experience: new FormArray([]),
    });

    this.contact_info = this._fb.group({
      address1: ["3205 Eden Drive, Glen Allen"],
      address2: [""],
      email: ["oliviawil@email.net"],
      phone: ["804-931-9418"],
      site_link: ["https://github.com/heympriyesh"],
    });

    this.skills_summary = this._fb.group({
      skill1: ["C++"],
      skill1_rating: [3, [Validators.required]],
      skill2: ["Java"],
      skill2_rating: [3, [Validators.required]],
      skill3: ["Python"],
      skill3_rating: [3, [Validators.required]],
      skill4: ["React"],
      skill4_rating: [4, [Validators.required]],
    });

    (this.resumeForm.get("work_experience") as FormArray).push(
      this.addWorkExperience()
    );

    console.log("this.resumeBuilder", this.resumeForm.value);
  }

  ngAfterViewInit(): void {
    this.selectedTemplate = this.contactInfoForm;
    // this.selectedTemplate=this.noForm
  }

  discard() {
    this.selectedTemplate = this.noForm;
  }

  setTemplate(name: string) {
    if (name === "contact_info") {
      this.selectedTemplate = this.contactInfoForm;
    } else if (name === "skills_summary") {
      this.selectedTemplate = this.skillSummaryTemplae;
    }
  }

  addSkillSummary(): FormGroup {
    return this._fb.group({
      skill1: ["Python"],
      skill1_rating: [4, [Validators.required]],
      skill2: ["Python"],
      skill2_rating: [4, [Validators.required]],
      skill3: ["Python"],
      skill3_rating: [4, [Validators.required]],
      skill4: ["Python"],
      skill4_rating: [4, [Validators.required]],
    });
  }

  addWorkExperience(): FormGroup {
    return this._fb.group({
      title: [""],
      org_name: [""],
      role: [],
      start_date: [""],
      end_date: [null],
      point1: [],
      point2: [],
    });
  }

  addAwardsReceived() {
    return this._fb.group({
      award1: [""],
      award2: [""],
      award3: [""],
    });
  }
  generatePDF() {
    const content = this.pdfContent.nativeElement;
    const pdfWidth = 210; // A4 page width in mm
    const pdfHeight = (content.offsetHeight * pdfWidth) / content.offsetWidth;
    // const pdfHeight = content.offsetHeight *0.264583333;

    console.log(
      "🚀 ~ file: template1.component.ts:88 ~ Template1Component ~ generatePDF ~ pdfHeight:",
      pdfHeight
    );

    // Remove padding and margins from the content
    content.style.padding = "0";
    content.style.margin = "0";

    html2canvas(content, { scale: 2 }) // Increase scale for higher DPI
      .then((canvas) => {
        const contentDataURL = canvas.toDataURL("image/jpeg", 1.0); // Use JPEG for better quality
        const newTab = window.open();

        newTab?.document.write(
          `<!DOCTYPE html><head><title>Document preview</title></head><body><img src="${contentDataURL}"  ></body></html>`
        );

        newTab?.document.close();
        // window.open(contentDataURL,'_blank')
        const pdf = new jspdf("p", "mm", "a4");
        const position = 0;

        pdf.addImage(contentDataURL, "JPEG", 0, position, pdfWidth, pdfHeight);
        pdf.save("sample.pdf");

        // Restore padding and margins if necessary
        content.style.removeProperty("padding");
        content.style.removeProperty("margin");
      });
  }

  imageSrc: any;
  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let file = fileList[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);
    }
  }

  setSkillRating(rating:number,controlName:string){
    this.skills_summary.controls[controlName].setValue(rating)
  }
  getControl(formName: any, name: string): FormControl {
    if (formName === "contact_info") {
      return this.contact_info.controls[name] as FormControl;
    } else if (formName === "skills_summary") {
      return this.skills_summary.controls[name] as FormControl;
    } else {
      return this.contact_info.controls[name] as FormControl;
    }
  }
}
