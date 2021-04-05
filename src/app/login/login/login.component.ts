import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiauthService } from 'src/app/services/apiauth.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  
  public loginForm = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  });

  constructor(private apiAuth: ApiauthService, private router: Router, private fb: FormBuilder) {
    if(this.apiAuth.usuarioData){
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {
  }

  login(): void{
    this.apiAuth.login(this.loginForm.value).subscribe(response => {
      if(response.exito===1) {
        this.router.navigate(['/'])
      }
    });
  }
  

}
