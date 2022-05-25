import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
    ])
  });

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
  }




  onSubmit(){
      this.http.get<any>('http://localhost:3000/users')
      .subscribe(res =>{
        const user = res.find((a: any) =>{
          return a.email === this.authForm.value.email && a.password === this.authForm.value.password
        });
        if(user){
          console.log("login success");
        }else{
          console.log("user not founds");
        }
      },
      error =>{
        console.log("something went wrong");
      });
    }

  }
