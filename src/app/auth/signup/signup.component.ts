import { Component, OnInit } from '@angular/core';

//import formgroup, formcontrol
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFrm = new FormGroup({
      name: new FormControl('',[
      Validators.required,
    ]),
    
    email: new FormControl('',[
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    ]),

    phone: new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),

    password: new FormControl('',[
      Validators.required,
      Validators.maxLength(22),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
    ]),

    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
  }

  
  // signupForm(){
  //   if(this.signupFrm.invalid){
  //     return;
  //   }
  //  this.authService.signup(this.signupFrm.value).subscribe({
  //     next: (response) => {
  //       //on Success signup navigate to some other routes

  //     },
  //     error: (err) => {
  //       if(err.status === 0){
  //         //show error inside signup template form
  //         this.signupFrm.setErrors({ noConnection : true })
  //       }else{
  //         this.signupFrm.setErrors( { unKnownErrors : true } )
  //       }
  //     }
  //  });
  // }
  signupForm(){
    if(this.signupFrm.valid){
      this.apiService.postUser(this.signupFrm.value)
      .subscribe({
        next:(res)=>{
          alert("User added success");
          this.signupFrm.reset();
        },
        error:()=>{
          alert("Error occurs while adding product");
        }
      });
    }
  }

}
