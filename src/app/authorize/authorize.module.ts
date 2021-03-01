// import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { AuthorizeRoutingModule } from './authorize-routing.module';
// import { LoginComponent } from './login/login.component';
// import { AngularMaterialModule } from '../material-module';
// import { FlexLayoutModule } from '@angular/flex-layout';

// @NgModule({
//   declarations: [LoginComponent],
//   imports: [
//     CommonModule,
//     FlexLayoutModule,
//     AuthorizeRoutingModule,
//     FlexLayoutModule,
//     AngularMaterialModule

//   ],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],

// })
// export class AuthorizeModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthorizeRoutingModule } from "./authorize-routing.module";
import { LoginComponent } from "./login/login.component";
import { AngularMaterialModule } from "../material-module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AuthorizeRoutingModule,
    FlexLayoutModule,
    AngularMaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthorizeModule {}
