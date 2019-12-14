import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { ContentItem } from "../../../../../entities/content-item";
import { DirectoryItem } from "../../entities/directory-item";
import { DirectoryService } from "../../services/directory.service";
import { SectionBarService } from "../../../../../shared/services/section-bar.service";
import { AppConfig } from "../../../../../../../Config/app.config";

@Component({
  selector: "app-plugins-directory-item",
  templateUrl: "./item.component.html",
  providers: [DirectoryService]
})
export class DirectoryItemComponent implements OnInit, OnDestroy {
  private id: string;
  public directoryItem: DirectoryItem;
  private sub: any;
  public isAdmin: boolean;
  public uriEncodeAddress: string;

  constructor(
    @Inject(SectionBarService) private sectionBarService: SectionBarService,
    @Inject(DirectoryService) private directoryService: DirectoryService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.directoryItem = new DirectoryItem(null);
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.directoryService
        .get(this.id)
        .subscribe(directoryItem => this.SetDirectoryItem(directoryItem));
    });
  }

  private SetDirectoryItem(directoryItem: DirectoryItem) {
    this.directoryItem = directoryItem;
    this.uriEncodeAddress = encodeURIComponent(directoryItem.address);
    var sectionItems = this.directoryService.toSectionItems(
      directoryItem.toContentItem()
    );
    this.sectionBarService.initialize(
      "directory",
      sectionItems,
      "",
      "/directory"
    );
  }

  public mapUrl(): SafeUrl {
    var url: string =
      "https://www.google.com/maps/embed/v1/search?key=" +
      AppConfig.GOOGLE_MAP_API_KEY +
      "&q=" +
      this.uriEncodeAddress;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private ToDirectoryItem(item: ContentItem): DirectoryItem {
    var output: DirectoryItem = new DirectoryItem(null);
    output.id = item.id;
    output.name = item.name;
    output.description = item.content;

    return output;
  }

  public delete() {
    // const modalRef = this.modalService.open(ModalComponent)
    // modalRef.componentInstance.title = "Delete Confirmation"
    // modalRef.componentInstance.body = "Delete this item?";
    // modalRef.componentInstance.button = "Delete";
    // modalRef.result.then((result) => {
    //     if (result === 'success') {
    //         this.directoryService.delete(this.directoryItem)
    //             .subscribe(response => this.SaveResponse(response));
    //     }
    // });
  }

  private SaveResponse(data: any) {
    if (data !== null) {
      if (data.value !== null) {
        if (data.value === "1") {
          alert("Saved.");
          var sectionItems = this.directoryService.toSectionItems(
            this.directoryItem.toContentItem()
          );
          this.router.navigateByUrl("directory/" + sectionItems);
        } else {
          alert("Save failed.");
        }
      } else {
        alert("Save failed.");
      }
    } else {
      alert("Save failed.");
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
