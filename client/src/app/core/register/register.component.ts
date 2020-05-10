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
  currentStep: any = 1;
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

  moveStep(step) {
    this.currentStep = step;
  }

  uploadImage(image) {
    this.displayPicture = image.files[0];
  }


  onSubmit() {
    let formData = new FormData();
    formData.append('firstName', this.registerForm.value.firstName);
    formData.append('lastName', this.registerForm.value.lastName);
    formData.append('userName', this.registerForm.value.userName);
    formData.append('password', this.registerForm.value.password);
    formData.append('displayPicture', this.displayPicture);

    this.authenticationService.registerUser(formData).subscribe(response => {
      console.log(response);
    });
  }

}
