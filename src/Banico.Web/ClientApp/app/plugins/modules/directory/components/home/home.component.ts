import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Section } from "../../../../../entities/section";
import { DirectoryItem } from "../../entities/directory-item";
import { SectionBarService } from "../../../../../shared/services/section-bar.service";
import { SectionsService } from "../../../../../shared/services/sections.service";
import { DirectoryService } from "../../services/directory.service";

@Component({
  selector: "app-plugins-directory-home",
  templateUrl: "./home.component.html",
  providers: [DirectoryService]
})
export class DirectoryHomeComponent implements OnInit, OnDestroy {
  private id: string;
  private sub: any;
  private path: string;
  public directoryItems: DirectoryItem[];
  public isAdmin: boolean;

  constructor(
    @Inject(SectionBarService) private sectionBarService: SectionBarService,
    @Inject(DirectoryService) private directoryService: DirectoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.path = "";
      this.sectionBarService.initialize(
        "directory",
        this.path,
        "",
        "/directory"
      );

      this.directoryService
        .getAll()
        .subscribe(directoryItems => this.setDirectoryItems(directoryItems));
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private setDirectoryItems(directoryItems: DirectoryItem[]) {
    this.directoryItems = directoryItems;
  }
}
