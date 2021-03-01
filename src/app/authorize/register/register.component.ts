import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  isLinear = false;
  userForm: FormGroup;
  passwordForm: FormGroup;
  personalForm: FormGroup;

  constructor(private fb: FormBuilder, public service: HttpService) {
    this.createForm();
  }
  ngOnit() {}
  createForm() {
    this.userForm = this.fb.group({
      userName: ["", Validators.required],
      emailID: [
        "",
        Validators.compose([Validators.email, Validators.required]),
      ],
      mobile: [
        "",
        Validators.compose([Validators.required, Validators.min(10)]),
      ],
    });

    this.passwordForm = this.fb.group({
      newPassword: [
        "",
        Validators.compose([Validators.required, Validators.min(6)]),
      ],
      confPassWord: [
        "",
        Validators.compose([Validators.required, Validators.min(6)]),
      ],
    });

    this.personalForm = this.fb.group({
      address: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
    });
  }

  /**Method for the user Registration */
  register() {
    if (
      this.passwordForm.value.newPassword ==
      this.passwordForm.value.confPassWord
    ) {
      let jsonObj = {
        name: this.userForm.value.userName,
        email: this.userForm.value.emailID,
        mobile: this.userForm.value.mobile,
        Address: this.personalForm.value.address,
        city: this.personalForm.value.city,
        country: this.personalForm.value.country,
        password: this.passwordForm.value.confPassWord,
      };
      this.service.userRegister(jsonObj).subscribe((resp) => {
        console.log(resp);
        // this.toast("User registered successfully");
      });
    } else {
      // this.toast("New password and confirm password must be same");
    }
  }
}
