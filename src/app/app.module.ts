import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { PostesComponent } from './postes/postes.component';
import { CompetencesComponent } from './competences/competences.component';
import { CollaborateursComponent } from './collaborateurs/collaborateurs.component';
import { NewPostComponent } from './new-post/new-post.component';
import { FormsModule } from '@angular/forms';
import { ModifyPostComponent } from './modify-post/modify-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PostesComponent,
    CompetencesComponent,
    CollaborateursComponent,
    NewPostComponent,
    ModifyPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
