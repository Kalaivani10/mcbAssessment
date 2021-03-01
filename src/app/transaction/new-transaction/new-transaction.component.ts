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
export class NewTransactionComponent {
  isLinear = false;
  referenceForm: FormGroup;
  customerDetailForm: FormGroup;
  transactionForm: FormGroup;
  paymentForm: FormGroup;
  constructor(private formbuilder: FormBuilder) {
    this.createForm();
  }
  ngOnit() {}
  createForm() {
    this.referenceForm = this.formbuilder.group({
      referenceNo: ["", Validators.required],
    });

    this.customerDetailForm = this.formbuilder.group({
      custNo: ["", Validators.required],
      custName: ["", Validators.required],
      custAddress: ["", Validators.required],
      mobile: ["", Validators.required],
    });
    this.paymentForm = this.formbuilder.group({
      payment: [
        "",
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
    this.transactionForm = this.formbuilder.group({
      amount: [
        "",
        Validators.compose([Validators.required, Validators.min(10)]),
      ],
      currency: ["", Validators.required],
      bank: ["", Validators.required],
      bAccountNo: ["", Validators.required],
    });
  }

  /**Method for the user Registration */
  register() {}
}
