import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Template1Component } from './main/builder/template1/template1.component';
import { HomeComponent } from './main/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResumeBuilderInputComponent } from './main/component/resume-builder-input/resume-builder-input.component';

@NgModule({
  declarations: [
    AppComponent,
    Template1Component,
    HomeComponent,
    ResumeBuilderInputComponent
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
