import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-new-transaction",
  templateUrl: "./new-transaction.component.html",
  styleUrls: ["./new-transaction.component.scss"],
})
export class NewTransactionComponent implements OnInit {
    fruits: Array<string> = [
      "apple",
      "pear",
      "kiwi",
      "banana",
      "grape",
      "strawberry",
      "grapefruit",
      "melon",
      "mango",
      "plum",
    ];

    formGroup: FormGroup;

    nameFormGroup: FormGroup;
    emailFormGroup: FormGroup;

    steps = [
      { label: "Confirm your name", content: "Last name, First name." },
      { label: "Confirm your contact information", content: "123-456-7890" },
      { label: "Confirm your address", content: "1600 Amphitheater Pkwy MTV" },
      { label: "You are now done", content: "Finished!" },
    ];

    /** Returns a FormArray with the name 'formArray'. */
    get formArray(): AbstractControl | null {
      return this.formGroup.get("formArray");
    }

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit() {
      this.formGroup = this._formBuilder.group({
        formArray: this._formBuilder.array([
          this._formBuilder.group({
            firstNameFormCtrl: ["", Validators.required],
            lastNameFormCtrl: ["", Validators.required],
          }),
          this._formBuilder.group({
            emailFormCtrl: ["", Validators.email],
          }),
        ]),
      });

      this.nameFormGroup = this._formBuilder.group({
        firstNameCtrl: ["", Validators.required],
        lastNameCtrl: ["", Validators.required],
      });

      this.emailFormGroup = this._formBuilder.group({
        emailCtrl: ["", Validators.email],
      });
    }
  }
//   isLinear = false;
//   firstFormGroup: FormGroup;
//   secondFormGroup: FormGroup;

//   constructor(private _formBuilder: FormBuilder) {}

//   ngOnInit() {
//     this.firstFormGroup = this._formBuilder.group({
//       firstCtrl: ["", Validators.required],
//     });
//     this.secondFormGroup = this._formBuilder.group({
//       secondCtrl: ["", Validators.required],
//     });
//   }
// }
