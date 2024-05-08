import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewPostService } from './new-post.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'] 
})
export class NewPostComponent  implements OnInit {
  readonly apiUrl = 'http://localhost:1111/postes';
  // Define your form data properties
  postId: string ='';
  titre: string = '';
  description: string = '';
  team: string = '';
  salary: string = '';
  contractType: string='';

  statusMessage: string = '';
  searchFormGroup!: FormGroup;

  chosenSkillLevel: string='';
  chosenSkillId: string='';

  chosenCollabId: string='';



  chosenSkillDisabled: boolean = true;
  chosenSkillName: string = '';
  chosenSkillDescription: string = '';

  collabs: any[] = [];
  competences: any[] = [];
  chosenSkillIds: any[] = [];

  constructor(private router: Router, private newPostService: NewPostService, private http: HttpClient, private fb: FormBuilder) { }


 
 

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: [null],
    });
    this.loadCollabs();
    this.loadSkills();
    this.postId = this.generateId();
}

generateId(): string {
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return id;
}


  //this part is for assigning a collab 

  loadCollabs(): void {
    this.newPostService.getAllCollabs()
      .subscribe(
        (data: any[]) => {
          this.collabs = data;
        },
        (error: any) => {
          console.log('Error fetching collabs:', error);
        }
      );
  }
 handleSearchCollabs(): void {
    let keyword = this.searchFormGroup.value.keyword;
    if (keyword.trim() !== '') { // Check if keyword is not empty or only whitespace
      this.newPostService.searchCollabs(keyword).subscribe(
        (data: any[]) => {
          this.collabs = data;
        },
        (error: any) => {
          console.log('Error searching collabs:', error);
        }
      );
    } else {
      // If keyword is empty or only whitespace, reload all postes
      this.loadCollabs();
    }
  }

   // Function to assign collaborator to post
   assignCollabToPost(collabId: number, postId: string) {
    const apiUrl = `http://localhost:1111/postes/affectCollab/${collabId}/poste/${postId}`;
    
    this.http.put(apiUrl, null)
      .subscribe(
        (response) => {
          console.log('Collaborator assigned to post successfully:', response);
          // Handle success (e.g., show success message)
        },
        (error) => {
          console.error('Error assigning collaborator to post:', error);
          // Handle error (e.g., show error message)
        }
      );
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //this part for adding skills

  addSkill(skill: any): void {
    this.chosenSkillId = skill.id;
    // Enable the input fields for chosen skills
    this.chosenSkillDisabled = false;
    // Populate the input fields with the name and description of the selected skill
    this.chosenSkillName = skill.nom;
    this.chosenSkillDescription = skill.description;
  }
  
  loadSkills(): void {
    this.newPostService.getAllCompetences()
      .subscribe(
        (data: any[]) => {
          this.competences = data;
        },
        (error: any) => {
          console.log('Error fetching collabs:', error);
        }
      );
  }

  handleSearchSkills(): void {
    let keyword = this.searchFormGroup.value.keyword;
    if (keyword.trim() !== '') { // Check if keyword is not empty or only whitespace
      this.newPostService.searchCompetences(keyword).subscribe(
        (data: any[]) => {
          this.competences = data;
        },
        (error: any) => {
          console.log('Error searching skills:', error);
        }
      );
    } else {
      // If keyword is empty or only whitespace, reload all postes
      this.loadSkills();
    }
  }

  
  // Function to save the chosen skill with its level to the poste
  saveSkillLevel(posteId: string, competenceId: string, level: string): void {
    // Send HTTP POST request to the endpoint
    this.http.post<any>(
      `http://localhost:1111/postes/competenceLevel?posteId=${posteId}&competenceId=${competenceId}&level=${level}`,
      {}
    ).subscribe(
      (response) => {
        console.log('Skill level saved successfully:', response);
        // Handle success response if needed
      },
      (error) => {
        console.error('Error saving skill level:', error);
        // Handle error if needed
      }
    );
  }


  onSave(): void {
    // Assuming posteId, competenceId, and level are obtained from your component's properties or form fields
    const posteId = this.postId; // Assuming posteId is a property in your component
    const competenceId = this.chosenSkillId; // Assuming chosenSkillId is a property in your component
    const level = this.chosenSkillLevel; // Assuming chosenSkillLevel is a property in your component
  
    // Call the function to save the skill level
    this.saveSkillLevel(posteId, competenceId, level);
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //managing a post *


  backToPostes(): void {
    this.router.navigate(['/postes']);
  }

  savePost() {
 // Store the chosen skills before saving the post
 const savedSkills = this.chosenSkillIds.map(skillId => {
  const skill = this.competences.find(c => c.id === skillId);
  return {
    id: skill.id,
    nom: skill.nom,
    description: skill.description,
    level: skill.level
  };
});

// Create the Poste object with form data and generated ID
const newPost = {
  id: this.postId,
  titre: this.titre,
  description: this.description,
  contractType: this.contractType,
  salary: parseInt(this.salary),
  creationDate: new Date(),
  // Assign the stored skills to posteCompetences
  posteCompetences: savedSkills
};

// Send the POST request to the backend
this.http.post<any>(`${this.apiUrl}/save_poste`, newPost)
  .subscribe(
    (response) => {
      console.log('The post is saved successfully:', response);
      // Set status message
      this.statusMessage = `The post "${this.titre}" is saved successfully.`;

      // Reset form fields
     // const inputs = document.querySelectorAll('.custom-form-group input');
      //inputs.forEach(input => {
       // (input as HTMLInputElement).value = '';
      //});

      // Restore chosen skills after saving the post
      this.chosenSkillIds = [];
    },
    (error) => {
      console.error('Error saving post:', error);
      // Handle error (e.g., display error message)
    }
  );
  }

  refreshBoxes(): void {
    const textAreas = document.querySelectorAll('textarea');
    textAreas.forEach(textarea => {
      (textarea as HTMLTextAreaElement).value = '';
    });
  
    // Refresh input fields within elements having the class `.custom-form-group`
    const inputs = document.querySelectorAll('.custom-form-group input');
    inputs.forEach(input => {
      (input as HTMLInputElement).value = '';
    });
  }


  
// Initialize collabAssignedMap with all collabs set to false
collabAssignedMap: { [id: string]: boolean } = {
 
};

assignCollab(collabId: string) {
  // Mark the collab as assigned in the map
  this.collabAssignedMap[collabId] = false;
}

saveCollab(): void {
  // Perform save operation or any other logic here
  // Reset collabAssignedMap after save
  this.collabAssignedMap = {};
}

// Function to save the chosen collab to the poste
savePostCollab(posteId: string, collabId: string): void {
  // Send HTTP POST request to the endpoint
  this.http.post<any>(
    `http://localhost:1111/postes/affectCollab/${collabId}/poste/${posteId}`,
    {}
  ).subscribe(
    (response) => {
      console.log('Collab saved successfully:', response);
      // Handle success response if needed
      
    },
    (error) => {
      console.error('Error saving collab:', error);
      // Handle error if needed
    }
  );
}

onSaveCollab(collabId: string): void {
  // Assuming posteId and chosenCollabId are obtained from your component's properties or form fields
  const posteId = this.postId; // Assuming postId is a property in your component
  console.log('Collab data:', posteId, collabId);
  // Call the function to save the collab to the poste
  this.savePostCollab(posteId, collabId);
}
}







