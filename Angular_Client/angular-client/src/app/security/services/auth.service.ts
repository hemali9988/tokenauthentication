import { logging } from 'protractor';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';




const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL: string = 'http://localhost:62800/api/';
  private loginUrl: string = this.BASE_URL + 'identity';
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http:HttpClient) { 
    this.headers=this.headers.set("Content-Type","application/json");
    this.headers=this.headers.set("Accept","application/json");
  }

  login(username:string,password:string):Observable<boolean>{

    return this.http.post(this.loginUrl,{username:username,password:password},{headers:this.headers,observe:'response'})
    .pipe(
      map((response:HttpResponse<any>)=>{
      // login successful if there's a jwt token in the response

        let token=response.body.token;
        let refreshToken=response.body.refreshToken;

        if(token)
        {
          localStorage.setItem("loggedUser",JSON.stringify({username:username,token:token,refreshToken:refreshToken}));
          
          // return true to indicate successful login
          return true;
        }
        else
        {
          return false;
        }

      } )//,throwError(this.handleError)   
      
    );
  }

  logout():void{
    localStorage.removeItem('loggedUser');
  }

  getToken():string{
    let loggedUser=JSON.parse(localStorage.getItem('loggedUser'));
    let token=loggedUser && loggedUser.token;
    return token ? token:"";
  }

  isAuthenticated():boolean{
    const token=this.getToken();
    // Check whether the token is expired or not
    // return true or false
    return token!="" ? jwtHelper.isTokenExpired(token):false;
  }

  // private handleError(error:HttpErrorResponse){
  //   if(error.error instanceof ErrorEvent){
  //           // A client-side or network error occurred. Handle it accordingly.
  //           console.error('An error occurred:', error.error.message);

  //   }
  //   else{
  //           // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);

  //   }
  //       // return an ErrorObservable with a user-facing error message
  //       return new ErrorObservable(error);

  // }
  // ;
  
}
