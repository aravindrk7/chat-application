import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    this.authenticationService.loginUser(this.registerForm.value).subscribe(response => {
      console.log(response);
      if (response) {
        this.dataService.updatedUserData({ name: this.registerForm.value.userName });
        this.router.navigate(['/chat']);
      }
      else {
        alert("Invalid Username or Password");
      }
    });
  }

}
