import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CompetencesService {
  private apiUrl = 'http://localhost:1111/competences';

  constructor(private http: HttpClient) { }

  getAllCompetences(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCompetenceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCompetence(Competence: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, Competence);
  }

  updateCompetence(id: string, updatedCompetence: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedCompetence);
  }

  deleteCompetence(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  searchCompetences(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search_Competences?keyword=${keyword}`);
  }

  getPageCompetences(page: number, size: number): Observable<any[]> {
    const url = `${this.apiUrl}?page=${page}&size=${size}`;
    return this.http.get<any[]>(url);
  }


}
