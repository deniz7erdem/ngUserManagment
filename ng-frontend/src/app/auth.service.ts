import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  path = "http://localhost:3000/user";

  login(user: Object) {
    return this.http.post<any>(this.path + "/login", user)
  }

  get isLogIn() {
    return !!localStorage.getItem("TOKEN");
  }

  logout() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }


  getUsers<Object>() {
    let headers = new HttpHeaders();
    let token = localStorage.getItem("TOKEN");
    headers = headers.append("Authorization", "Bearer " + token);
    return this.http.get(this.path + "/getUsers", { headers: headers });
  }

  updateUser(user: Object) {
    let headers = new HttpHeaders();
    let token = localStorage.getItem("TOKEN");
    headers = headers.append("Authorization", "Bearer " + token);
    return this.http.post<any>(this.path + "/updateUser", user, { headers: headers });
  }

  addUser(user: Object) {
    let headers = new HttpHeaders();
    let token = localStorage.getItem("TOKEN");
    headers = headers.append("Authorization", "Bearer " + token);
    return this.http.post<any>(this.path + "/addUser", user, { headers: headers });
  }

  delUser(user: Object) {
    let headers = new HttpHeaders();
    let token = localStorage.getItem("TOKEN");
    headers = headers.append("Authorization", "Bearer " + token);
    return this.http.post(this.path + "/delUser", user, { headers: headers })
  }

}
