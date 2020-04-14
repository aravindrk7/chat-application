import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  displayPicture: any;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // displayPicture: ['', Validators.required]
    });
  }
  uploadImage(image) {
    this.displayPicture = image.files[0];
  }
  onSubmit() {
    let params = new FormData();
    params.append('firstName', this.registerForm.value.firstName);
    params.append('lastName', this.registerForm.value.lastName);
    params.append('userName', this.registerForm.value.userName);
    params.append('password', this.registerForm.value.password);
    params.append('displayPicture', this.displayPicture);
    // console.log(this.registerForm);
    console.log(params);
    this.authenticationService.registerUser(params).subscribe(response => {
      console.log(response);
    });
  }

}
