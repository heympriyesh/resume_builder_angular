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
  @ViewChild("skillSummary") skillSummaryTemplate!: TemplateRef<any>;
  @ViewChild("awardsReceived") awardsReceivedFormTemplate!: TemplateRef<any>;
  @ViewChild("name_role") nameRoleTemplate!: TemplateRef<any>;
  @ViewChild("description") descriptionTemplateRef!: TemplateRef<any>;
  @ViewChild("workExperienceAndProject")
  workExperienceAndProjectTemplateRef!: TemplateRef<any>;

  workExperienceForm!: FormGroup;
  contact_info!: FormGroup;
  skills_summary!: FormGroup;
  awards_received!: FormGroup;
  full_name = new FormControl("Priyesh Pandey");
  job_role = new FormControl("Senior Software Engineer");
  bio = new FormControl(
    "A Python developer with 5.8 years of experience in Django, Flask for Retail eCommerce, POS and Storage domain."
  );

  imageSrc: any;
  selectedWorkAndProjectIndex: number | undefined = 0;
  selectedTemplate!: TemplateRef<any>;

  constructor(private _fb: FormBuilder) {}
  ngOnInit(): void {
    this.workExperienceForm = this._fb.group({
      work_experience: new FormArray([]),
    });

    this.initForm();
    this.addWorkAndProjectExp();
    console.log("--this.workExerienceForm", this.workExperienceForm);
    let arr = this.workExperienceControls.at(0).get("detail") as FormArray;
    console.log("workExperienceControls", arr.at(0));
    // console.log("this.resumeBuilder", this.workExperienceForm.get('work_experience')?.value);
  }

  initForm() {
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

    this.awards_received = this._fb.group({
      award1: ["Most Outstanding Employee of the Year, Pixelpoint Hive (2015)"],
      award2: ["Best Mobile App Design, HGFZ Graduate Center (2014)"],
      award3: ["Design Award, Cliffmoor College (2012)"],
    });
  }

  ngAfterViewInit(): void {
    this.selectedTemplate = this.noForm;
  }

  discard() {
    this.selectedTemplate = this.noForm;
  }

  setTemplate(name: string, index?: number) {
    if (name === "contact_info") {
      this.selectedTemplate = this.contactInfoForm;
    } else if (name === "skills_summary") {
      this.selectedTemplate = this.skillSummaryTemplate;
    } else if (name === "awards_received") {
      this.selectedTemplate = this.awardsReceivedFormTemplate;
    } else if (name === "name_role") {
      this.selectedTemplate = this.nameRoleTemplate;
    } else if (name === "description") {
      this.selectedTemplate = this.descriptionTemplateRef;
    } else if (name === "work_exp") {
      this.selectedWorkAndProjectIndex = index;
      this.selectedTemplate = this.workExperienceAndProjectTemplateRef;
    }
  }

  addWorkAndProjectExp() {
    const workExperienceArray = this.workExperienceForm.get(
      "work_experience"
    ) as FormArray;
    workExperienceArray.push(this.addWorkExperience());
    const lastIndex =
      (this.workExperienceForm.get("work_experience") as FormArray).length - 1;
    this.addDetailData(lastIndex);
  }

  addWorkExperience(): FormGroup {
    return this._fb.group({
      title: "PROJECT",
      detail: this._fb.array([]), // Initialize the 'detail' as a FormArray
    });
  }
  addDetailData(workExperienceIndex: number) {
    const workExperienceArray = this.workExperienceForm.get(
      "work_experience"
    ) as FormArray;
    const detailArray = workExperienceArray
      .at(workExperienceIndex)
      .get("detail") as FormArray;
    detailArray.push(this.createDetailFormGroup());
  }

  createDetailFormGroup(): FormGroup {
    return this._fb.group({
      org_name: ["Campus Events"],
      role: ["ML Engineer"],
      start_date: ["April 2023"],
      end_date: [null],
      point1: [
        `Led the data ingestion efforts for our three person team which developed a real time tracker of campus events for universities in Pennsylvania`,
      ],
      point2: [
        `Built web scraper in Python that got data from websites of campus groups then built an ETL which loaded data into Amazon Redshift`,
      ],
    });
  }

  get workExperienceControls() {
    return this.workExperienceForm.get("work_experience") as FormArray;
  }

  removeaddWorkAndProjectExp(index: number) {
    if (index === this.selectedWorkAndProjectIndex)
      this.selectedTemplate = this.noForm;
    (this.workExperienceForm.get("work_experience") as FormArray).removeAt(
      index
    );
  }
  generatePDF() {
    const content = this.pdfContent.nativeElement;
    const pdfWidth = 210; // A4 page width in mm
    const pdfHeight = (content.offsetHeight * pdfWidth) / content.offsetWidth;
    content.style.padding = "0";
    content.style.margin = "0";
    html2canvas(content, { scale: 2 }) // Increase scale for higher DPI
      .then((canvas) => {
        const contentDataURL = canvas.toDataURL("image/jpeg", 1.0); // Use JPEG for better quality
       
        const pdf = new jspdf("p", "mm", "a4");
        let position = 0;

        pdf.addImage(contentDataURL, "JPEG", 0, position, pdfWidth, pdfHeight);
        pdf.save("sample.pdf");

        // Restore padding and margins if necessary
        content.style.removeProperty("padding");
        content.style.removeProperty("margin");
      });
  }

  
  
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

  setSkillRating(rating: number, controlName: string) {
    this.skills_summary.controls[controlName].setValue(rating);
  }

  getControl(formName: any, name: string, index = 0, k = 0): FormControl {
    if (formName === "contact_info") {
      return this.contact_info.controls[name] as FormControl;
    } else if (formName === "skills_summary") {
      return this.skills_summary.controls[name] as FormControl;
    } else if (formName === "awards_received") {
      return this.awards_received.controls[name] as FormControl;
    } else if (formName === "title") {
      return this.workExperienceControls.at(index).get(name) as FormControl;
    } else if (formName === "detail") {
      return (this.workExperienceControls.at(index).get("detail") as FormArray)
        .at(k)
        .get(name) as FormControl;
    } else {
      return this.contact_info.controls[name] as FormControl;
    }
  }

  getDetailArrayAccordingToIndex(index: any): FormArray {
    return this.workExperienceControls.at(index).get("detail") as FormArray;
  }

  deleteDetailBlock(i: number, k: number) {
    let detailBlock = this.getDetailArrayAccordingToIndex(i);
    detailBlock.removeAt(k);
  }
}
