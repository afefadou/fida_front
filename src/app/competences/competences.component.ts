import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CompetencesService } from './competences.service';



@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrl: './competences.component.css'
})
export class CompetencesComponent {

  constructor(private CompetencesService: CompetencesService, private fb: FormBuilder) {}


  competences: any[] = [];
  searchFormGroup!: FormGroup;

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: [null],
    });
    this.loadCompetences();

  }
  

deleteCompetence(id: string): void {
  let conf = confirm("Are you sure?");
  if (conf === false) return;
  this.CompetencesService.deleteCompetence(id).subscribe({
    next: (data) => {
      // Corrected variable name 'p' to 'id'
      let index = this.competences.findIndex(competence => competence.id === id); // Find index using id
      if (index !== -1) {
        this.competences.splice(index, 1); // Remove the deleted post from the array
      }
    },
    error: (error) => { // Corrected arrow function syntax
      console.error('Error deleting post:', error);
      // handle errors here, depending on your application's requirements
    }
  });
}

handleNewCompetence() {
throw new Error('Method not implemented.');
}

loadCompetences(): void {
  this.CompetencesService.getAllCompetences()
    .subscribe(
      (data: any[]) => {
        this.competences = data;
      },
      (error: any) => {
        console.log('Error fetching postes:', error);
      }
    );
}

handleSearchCompetences(): void {
  let keyword = this.searchFormGroup.value.keyword;
  if (keyword.trim() !== '') { // Check if keyword is not empty or only whitespace
    this.CompetencesService.searchCompetences(keyword).subscribe(
      (data: any[]) => {
        this.competences = data;
      },
      (error: any) => {
        console.log('Error searching postes:', error);
      }
    );
  } else {
    // If keyword is empty or only whitespace, reload all postes
    this.loadCompetences();
  }
}

}
