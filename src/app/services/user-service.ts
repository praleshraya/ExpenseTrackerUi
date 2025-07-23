import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiUrl : string= "http://localhost:8080/users";

  currentUser: User | null =null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type':'application/json',
      
    })
  }

  constructor(private http:HttpClient){}

   private loggedInUser: User | null = null;
  private username: string = '';

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
    this.setUsername(user.userName); // Optional fallback
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  setUsername(name: string): void {
    this.username = name;
    sessionStorage.setItem('username', name);  // Persist on refresh
  }

  getUsername(): string {
    return this.username || sessionStorage.getItem('username') || '';
  }

  getLoggedInUserID(): number {
    return this.loggedInUser?.userID || 0;
  }

  loginFunction(user:User) : Observable<User>{
    return this.http.post<User>(this.userApiUrl.concat("/login"), user, this.httpOptions);
  }


  signupFunction(user: User): Observable<string> {
  return this.http.post<string>(this.userApiUrl.concat("/signup"),
    user,
    {
      headers: this.httpOptions.headers,
      responseType: 'text' as 'json', 
 
    }
  );


}






  
}
