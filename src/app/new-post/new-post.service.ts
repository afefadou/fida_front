import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewPostService {
  private apiUrl = 'http://localhost:1111/postes';
  private apiUrl1 = 'http://localhost:1111/collabs';
  private apiUrl2 = 'http://localhost:1111/competences';

  constructor(private http: HttpClient) { }

  createPoste(poste: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save_poste`, poste);
  }

    updatePoste(id: string, updatedPoste: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedPoste);
  }


  getAllCollabs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl1);
  }
  
  searchCollabs(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/search?keyword=${keyword}`);
  }

  getAllCompetences(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2);
  }
  
  searchCompetences(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/search?keyword=${keyword}`);
  }
}
