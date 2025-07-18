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





 // Set the logged-in user (store username)
  setLoggedInUser(user: User): void {
    this.currentUser = user;
  }

  // Get the username of the logged-in user
  getUsername(): string {
    return this.currentUser ? this.currentUser.userName : '';  // Return the username if user is logged in
  }
   getLoggedInUserID(): any {
    if (this.currentUser) {
      return this.currentUser.userID;
    }
  }
  
}
