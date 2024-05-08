import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostesComponent} from "./postes/postes.component";
import {CollaborateursComponent} from "./collaborateurs/collaborateurs.component";
import {CompetencesComponent} from "./competences/competences.component";
import { NewPostComponent } from './new-post/new-post.component';




const routes: Routes = [

  {path : "postes", component : PostesComponent},
  {path : "competences", component : CompetencesComponent},
  {path : "collaborateurs", component : CollaborateursComponent},
  { path: "newPost", component: NewPostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
