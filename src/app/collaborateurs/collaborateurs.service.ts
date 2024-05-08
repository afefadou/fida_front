import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CollaborateursService {
  private apiUrl = 'http://localhost:1111/collabs';

  constructor(private http: HttpClient) { }

  getAllCollaborateurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCollaborateurById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCollaborateur(Collaborateur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, Collaborateur);
  }

  updateCollaborateur(id: string, updatedCollaborateur: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedCollaborateur);
  }

  deleteCollaborateur(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  searchCollaborateurs(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search_Collabs?keyword=${keyword}`);
  }

  getPageCollaborateurs(page: number, size: number): Observable<any[]> {
    const url = `${this.apiUrl}?page=${page}&size=${size}`;
    return this.http.get<any[]>(url);
  }


}
