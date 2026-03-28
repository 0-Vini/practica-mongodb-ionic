import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class PersonaService {
private apiUrl = 'http://localhost:3000/personas';
constructor(private http: HttpClient) { }
// Obtener todas las personas
getPersonas(): Observable<any[]> {
return this.http.get<any[]>(this.apiUrl);
}
// Guardar una persona nueva
guardarPersona(persona: any): Observable<any> {
return this.http.post(this.apiUrl, persona);
}
}