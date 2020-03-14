import { Injectable, Inject } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpRequest
} from "@angular/common/http";
import { first } from "rxjs/operators";
import { SectionItem } from "../../../entities/section-item";
//import { status, json } from '../../../shared/fetch';
//import { Observable } from 'rxjs/Observable';
import { SectionsService } from "../../../shared/services/sections.service";

@Injectable()
export class SectionsFileService {
  sectionApiBaseUrl: string;
  createdSectionItems: SectionItem[] = [];

  readonly SEGMENT_DELIM: string = "_";
  readonly TYPE_DELIM: string = "~";
  readonly SECTION_DELIM: string = "*";

  constructor(
    @Inject(SectionsService) private sectionsService: SectionsService,
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {
    this.sectionApiBaseUrl = `${this.baseUrl}api/Section`;
  }

  public UploadFile(section: string, inputString: string) {
    //console.log(JSON.stringify(inputString));
    var lines = inputString.split("\n");
    var line = lines[0].split(",");
    console.log("PROCESSING LINE: " + line);
    var name = line[0];
    var alias = line[1];
    line.splice(0, 2);
    lines.splice(0, 1);
    this.Process(section, "", name, alias, line, lines, 0);
  }

  private Process(
    section: string,
    parentId: string,
    name: string,
    alias: string,
    remainingItems: string[],
    remainingLines: string[],
    lineNumber: number
  ) {
    // console.log("PROCESSING: " + name);
    const isRoot = !parentId;
    // console.log(
    //   "CHECKING [" +
    //     section +
    //     "] [" +
    //     alias +
    //     "] [" +
    //     parentId +
    //     "] [" +
    //     isRoot +
    //     "]"
    // );
    this.sectionsService
      .getSectionItems("", section, "", alias, "", parentId, isRoot)
      //.pipe(first())
      .subscribe(sectionItems => {
        // console.log("EXIST CHECK: " + JSON.stringify(sectionItems));
        var sectionItem = null;

        if (sectionItems && sectionItems.length > 0 && sectionItems[0])
          sectionItem = sectionItems[0];

        if (!sectionItem) {
          sectionItem = this.SearchNewSectionItems(alias, parentId);
        }

        if (!sectionItem) {
          // console.log(name + " does not exist.");
          sectionItem = new SectionItem();
          sectionItem.name = name;
          sectionItem.alias = alias;
          sectionItem.section = section;
          if (parentId) {
            this.sectionsService
              .getSectionItems(parentId, section, "", "", "", "", false)
              .pipe(first())
              .subscribe(sectionItems => {
                const parentSectionItem = sectionItems[0];
                sectionItem = this.SetSectionItemParent(
                  parentSectionItem,
                  sectionItem
                );
                this.AddSectionItem(
                  section,
                  sectionItem,
                  remainingItems,
                  remainingLines,
                  lineNumber
                );
              });
          } else {
            this.AddSectionItem(
              section,
              sectionItem,
              remainingItems,
              remainingLines,
              lineNumber
            );
          }
        } else {
          // console.log(name + " exists.");
          this.ProcessNext(
            section,
            sectionItem.id,
            remainingItems,
            remainingLines,
            lineNumber
          );
        }
      });
  }

  private SetSectionItemParent(
    parentSectionItem: SectionItem,
    sectionItem: SectionItem
  ) {
    // console.log("PARENT IS " + JSON.stringify(parentSectionItem));
    sectionItem.parentId = parentSectionItem.id;
    if (parentSectionItem.pathName) {
      sectionItem.pathName =
        parentSectionItem.pathName +
        this.SEGMENT_DELIM +
        parentSectionItem.name;
    } else {
      sectionItem.pathName = parentSectionItem.name;
    }
    // console.log("PATHNAME = " + sectionItem.pathName);

    if (parentSectionItem.pathUrl) {
      sectionItem.pathUrl =
        parentSectionItem.pathUrl +
        this.SEGMENT_DELIM +
        parentSectionItem.alias;
    } else {
      sectionItem.pathUrl = parentSectionItem.alias;
    }
    // console.log("PATHURL = " + sectionItem.pathUrl);

    return sectionItem;
  }

  private AddSectionItem(
    section: string,
    sectionItem: SectionItem,
    remainingItems: string[],
    remainingLines: string[],
    lineNumber: number
  ) {
    // console.log(JSON.stringify(sectionItem));
    this.sectionsService
      .addOrUpdateSectionItem(
        "",
        sectionItem.section,
        sectionItem.parentId,
        sectionItem.pathUrl,
        sectionItem.pathName,
        sectionItem.name,
        sectionItem.alias
      )
      .subscribe(newSectionItem => {
        // console.log(sectionItem.name + " created with ID " + newSectionItem.id);
        sectionItem.id = newSectionItem.id;
        this.createdSectionItems.push(sectionItem);
        this.ProcessNext(
          section,
          newSectionItem.id,
          remainingItems,
          remainingLines,
          lineNumber
        );
      });
  }

  private ProcessNext(
    section: string,
    parentId: string,
    remainingItems: string[],
    remainingLines: string[],
    lineNumber: number
  ) {
    if (remainingItems.length > 0) {
      const name = remainingItems[0];
      // console.log(
      //   remainingItems.length +
      //     " more items in the line: " +
      //     JSON.stringify(remainingItems) +
      //     " Next is " +
      //     name +
      //     " and parent ID " +
      //     parentId
      // );
      const alias = remainingItems[1];
      remainingItems.splice(0, 2);
      this.Process(
        section,
        parentId,
        name,
        alias,
        remainingItems,
        remainingLines,
        lineNumber
      );
    } else {
      // console.log("Moving to the next line " + lineNumber + 1);
      var line = remainingLines[0].split(",");
      const name = line[0];
      const alias = line[1];
      console.log("PROCESSING LINE: " + line);
      line.splice(0, 2);
      remainingLines.splice(0, 1);
      this.Process(
        section,
        "",
        name,
        alias,
        line,
        remainingLines,
        lineNumber + 1
      );
    }
  }

  private SearchNewSectionItems(alias: string, parentId: string) {
    // console.log(
    //   "Searching New Section Items for " + alias + " and " + parentId
    // );
    for (var i = 0; i < this.createdSectionItems.length; i++) {
      const sectionItem = this.createdSectionItems[i];
      // console.log(
      //   "Comparing " +
      //     sectionItem.alias +
      //     " and " +
      //     alias +
      //     " plus " +
      //     sectionItem.parentId +
      //     " and " +
      //     parentId
      // );
      if (sectionItem.alias === alias && sectionItem.parentId === parentId) {
        // console.log("FOUND! ID is " + sectionItem.id);
        return sectionItem;
      }
    }

    // console.log("NOT FOUND");
    return null;
  }
}
