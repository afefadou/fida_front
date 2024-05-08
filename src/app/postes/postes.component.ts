import { Component, OnInit } from '@angular/core';
import { PostesService } from './postes.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { forkJoin, Observable } from 'rxjs';



@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.css'] 
})
export class PostesComponent implements OnInit {
 

viewCollaboratorDetails(arg0: any) {
throw new Error('Method not implemented.');
}
  postes: any[] = [];
  searchFormGroup!: FormGroup;
  collabs: any[] = [];

  currentPage: number = 0;
  pageSize: number = 2;
  totalPages: number = 0;

  fetchedSkills: any[] = [];

  posteCompetences: any[] = [];

  selectedPost: any;

  constructor(private posteService: PostesService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: [null],
    });
    this.loadPostes();
    this.loadPagePostes();
    this.loadCollabs();

    
  }

  showPostDetails(post: any): void {
    this.selectedPost = post;
  }
  
  navigateToPost(postId: string): void {
    this.router.navigate(['/postes', postId]);
  }

  loadPagePostes(): void {
    this.posteService.getPagePostes(this.currentPage, this.pageSize).subscribe(
      (data: any[]) => {
        this.postes = data;
      },
      (error: any) => {
        console.log('Error fetching page postes:', error);
      }
    );
  }

  handleNewPost(){
    this.router.navigate(['/newPost']);
  }

  loadPostes(): void {
    this.posteService.getAllPostes()
      .subscribe(
        (data: any[]) => {
          this.postes = data;
        },
        (error: any) => {
          console.log('Error fetching postes:', error);
        }
      );
  }
 handleSearchPostes(): void {
    let keyword = this.searchFormGroup.value.keyword;
    if (keyword.trim() !== '') { // Check if keyword is not empty or only whitespace
      this.posteService.searchPostes(keyword).subscribe(
        (data: any[]) => {
          this.postes = data;
        },
        (error: any) => {
          console.log('Error searching postes:', error);
        }
      );
    } else {
      // If keyword is empty or only whitespace, reload all postes
      this.loadPostes();
    }
  }

    //this part is for assigning a collab 

    loadCollabs(): void {
      this.posteService.getAllCollabs()
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
        this.posteService.searchCollabs(keyword).subscribe(
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


  deletePoste(id: string): void {
    let conf = confirm("Are you sure?");
    if (conf === false) return;
    this.posteService.deletePoste(id).subscribe({
      next: (data) => {
        // Corrected variable name 'p' to 'id'
        let index = this.postes.findIndex(poste => poste.id === id); // Find index using id
        if (index !== -1) {
          this.postes.splice(index, 1); // Remove the deleted post from the array
        }
      },
      error: (error) => { // Corrected arrow function syntax
        console.error('Error deleting post:', error);
        // handle errors here, depending on your application's requirements
      }
    });
  }

// Define a property to store skill descriptions
skillDescriptions: { [key: string]: string } = {};

// Method to fetch skill details for a specific competence ID
fetchSkillDetails(competenceId: string): void {
  this.posteService.getSkillDetails(competenceId).subscribe(
    (res: any) => {
      this.skillDescriptions[competenceId] = res.description;
      console.log(res.description);
    },
    (err: any) => {
      console.log(err);
    }
  );
}

}




// import { Component, OnInit } from '@angular/core';
// import { PostesService } from './postes.service';
// import { Router } from '@angular/router';
//
// @Component({
//   selector: 'app-postes',
//   templateUrl: './postes.component.html',
//   styleUrl: './postes.component.css'
// })
// export class PostesComponent implements OnInit{
//   postes! : Array<any>;
//
//   constructor(private posteService:  PostesService) {
//     }
//  ngOnInit(): void {
//     this.loadPostes();
//   }
//
//
//   loadPostes(): void {
//     this.posteService.getAllPostes()
//       .subscribe(
//         (data: any[]) => { // Specify type for data parameter
//           this.postes = data;
//         },
//         (error: any) => { // Specify type for error parameter
//           console.log('Error fetching postes:', error);
//         }
//       );
//
//   }
//
//
// deletePoste(id: string): void {
//   let conf = confirm("Are you sure?");
//   if(conf==false) return;
//         this.posteService.deletePoste(id).subscribe({
//           next : (data)=>{
//             let index=this.postes.indexOf(p);
//             this.postes.splice(index,1);
//             }
//           }
//         });
// }
//
//
//
//
//            () => {
//               console.log('Post deleted successfully.');
//               this.loadPostes();
//             }, error => {
//               console.error('Error deleting post:', error);
//               // handle errors here, depending on your application's requirements
// }
