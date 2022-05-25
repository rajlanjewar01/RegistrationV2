import { Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signedIn$ : BehaviorSubject<boolean>;

  constructor(private authService: AuthService, private api: ApiService){
    this.signedIn$ = this.authService.signedIn$;
  }


  //run first on app initialization (called just before component shown on DOM)
  ngOnInit(){
    this.authService.checkAuth().subscribe(()=>{
    });
  }  
}
