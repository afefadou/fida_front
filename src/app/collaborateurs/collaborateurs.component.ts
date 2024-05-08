import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CollaborateursService } from './collaborateurs.service';



@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrl: './collaborateurs.component.css'
})
export class CollaborateursComponent {
  constructor(private CollaborateursService: CollaborateursService, private fb: FormBuilder) {}


  collaborateurs: any[] = [];
  searchFormGroup!: FormGroup;

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: [null],
    });
    this.loadCollaborateurs();

  }
  

deleteCollaborateur(id: string): void {
  let conf = confirm("Are you sure?");
  if (conf === false) return;
  this.CollaborateursService.deleteCollaborateur(id).subscribe({
    next: (data) => {
      // Corrected variable name 'p' to 'id'
      let index = this.collaborateurs.findIndex(collaborateur => collaborateur.id === id); // Find index using id
      if (index !== -1) {
        this.collaborateurs.splice(index, 1); // Remove the deleted post from the array
      }
    },
    error: (error) => { // Corrected arrow function syntax
      console.error('Error deleting post:', error);
      // handle errors here, depending on your application's requirements
    }
  });
}

handleNewCollaborateur() {
throw new Error('Method not implemented.');
}

loadCollaborateurs(): void {
  this.CollaborateursService.getAllCollaborateurs()
    .subscribe(
      (data: any[]) => {
        this.collaborateurs = data;
      },
      (error: any) => {
        console.log('Error fetching postes:', error);
      }
    );
}

handleSearchCollaborateurs(): void {
  let keyword = this.searchFormGroup.value.keyword;
  if (keyword.trim() !== '') { // Check if keyword is not empty or only whitespace
    this.CollaborateursService.searchCollaborateurs(keyword).subscribe(
      (data: any[]) => {
        this.collaborateurs = data;
      },
      (error: any) => {
        console.log('Error searching postes:', error);
      }
    );
  } else {
    // If keyword is empty or only whitespace, reload all postes
    this.loadCollaborateurs();
  }
}

}
