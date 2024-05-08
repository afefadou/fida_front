import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostesService {
  private apiUrl = 'http://localhost:1111/postes';

  private apiUrl1 = 'http://localhost:1111/collabs';

  constructor(private http: HttpClient) { }

  getSkillDetails(competenceId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:1111/competences/${competenceId}`);
  }
  
  getAllPostes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPosteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPoste(poste: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, poste);
  }

  updatePoste(id: string, updatedPoste: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedPoste);
  }

  deletePoste(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  searchPostes(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search_postes?keyword=${keyword}`);
  }

  getPagePostes(page: number, size: number): Observable<any[]> {
    const url = `${this.apiUrl}?page=${page}&size=${size}`;
    return this.http.get<any[]>(url);
  }

  getAllCollabs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl1);
  }
  
  searchCollabs(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/search?keyword=${keyword}`);
  }

}
