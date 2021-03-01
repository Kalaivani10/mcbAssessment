import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.scss"],
})
export class SideNavComponent implements OnInit {
  menuPosition: number = 0;

  constructor() {}

  ngOnInit() {}

  /** Event when the menu button is tapped */
  onclickMenu(index) {
    this.menuPosition = index;
  }
}
