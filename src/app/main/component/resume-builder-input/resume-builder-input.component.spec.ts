import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderInputComponent } from './resume-builder-input.component';

describe('ResumeBuilderInputComponent', () => {
  let component: ResumeBuilderInputComponent;
  let fixture: ComponentFixture<ResumeBuilderInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeBuilderInputComponent]
    });
    fixture = TestBed.createComponent(ResumeBuilderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
