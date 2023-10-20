import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Template1Component } from './main/builder/template1/template1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResumeBuilderInputComponent } from './main/component/resume-builder-input/resume-builder-input.component';
import { OverlayComponentComponent } from './main/component/overlay-component/overlay-component.component';

@NgModule({
  declarations: [
    AppComponent,
    Template1Component,
    ResumeBuilderInputComponent,
    OverlayComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
