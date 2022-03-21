import { Injectable } from '@angular/core';
import { Cv } from '../model/cv';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CONSTANTES } from '../../config/constantes.config';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  selectCvSubject = new Subject<Cv>();
  private cvs: Cv[] = [];
  constructor(private http: HttpClient) {}
  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(CONSTANTES.apis.cv);
  }
  getFakeCvs(): Cv[] {
    return [
      new Cv(1, 'Mellouli', 'Mohamed Karim ', 'as.png', 'student', '1234', 22),
    ];
  }
  findCvById(id: number): Observable<Cv> {
    return this.http.get<Cv>(CONSTANTES.apis.cv + id);
  }
  deleteCvById(id: number) {
    // const params = new HttpParams().set('access_token', localStorage.getItem('token'));
    return this.http.delete(CONSTANTES.apis.cv + id);
  }
  findFakeCvById(id: number): Cv {
    return this.cvs.find((cv) => cv.id === id);
  }
  deleteFakeCv(cv: Cv): boolean {
    const index = this.cvs.indexOf(cv);
    if (index > -1) {
      this.cvs.splice(index, 1);
      return true;
    }
    return false;
  }
  selectItem(cv: Cv): void {
    this.selectCvSubject.next(cv);
  }
}
