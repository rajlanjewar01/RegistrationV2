import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface SignupCredentials{
  name: string,
  email: string,
  phone: number,
  password: string,
  confirmPassword: string
}
interface SignupResponse{
  confirmPassword: string,
  email: string,
  id: number,
  name: string,
  password: string
  phone: number,
}
interface SignedinCredentials{
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl ='http://localhost:3000';
  signedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  signup(credetials: SignupCredentials){
    return this.http
    .post<SignupResponse>(this.rootUrl + "/users", credetials,{ 
      withCredentials: true
    })
    .pipe(
      tap(() => {
            this.signedIn$.next(true);
        })
      );
    }


    // signin(credetials: SignedinCredentials){
    //   // console.log(credetials); //contains value
    //   // return this.http.post("http://localhost:3000/users", credetials).pipe(
    //   //   tap(() =>{
    //   //       this.signedIn$.next(true);
    //   //   })
    //   // )
    //   this.http.get<any>('http://localhost:3000/users')
    //   .subscribe( response => {
    //       //console.log(response);  //all the list object array
    //       const user = response.find(a: any) =>{
    //         return a.email === this. 
    //       }

    //   })
    // }





    checkAuth(){
      return this.http
      .get(this.rootUrl + "/users",{
        withCredentials: true
      })
      .pipe(
        tap((response)=>{
          console.log(response);
        })
      )
    }

    }
