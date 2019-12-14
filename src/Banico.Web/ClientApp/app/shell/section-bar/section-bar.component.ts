import { Component, OnInit, Inject } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { SectionBarService } from "../../shared/services/section-bar.service";
import { SectionsService } from "../../shared/services/sections.service";

@Component({
  selector: "app-shell-section-bar",
  templateUrl: "./section-bar.component.html"
})
export class SectionBarComponent implements OnInit {
  public href: string = "";

  constructor(
    @Inject(SectionBarService) public sectionBarService: SectionBarService,
    private location: Location,
    private router: Router
  ) {
    router.events.subscribe(val => {
      if (location.path() !== "") {
        this.href = location.path();
      }
    });
  }

  ngOnInit() {}
}
