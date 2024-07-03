import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = environment.nodeAppUrl;

  constructor(private http: HttpClient) { }

  genericPost(endpoint:string, payload:any) {
    return this.http.post(this.baseUrl+endpoint, payload)
  }

  genericGet(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint)
  }

  genericDelete(endpoint: string){
    return this.http.delete(this.baseUrl+endpoint)
  }

  get(key: string, sessionType: string): any {
    let data = sessionType === 'session' ? sessionStorage.getItem(key) : localStorage.getItem(key);
    return data ? JSON.parse(data) : data;
  }

  isLoggedIn() {
    return sessionStorage.getItem('currentUser')
  }

}
