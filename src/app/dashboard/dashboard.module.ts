import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthorizeRoutingModule } from "../authorize/authorize-routing.module";
import { AngularMaterialModule } from "../material-module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AuthorizeRoutingModule,
    FlexLayoutModule,
    AngularMaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
