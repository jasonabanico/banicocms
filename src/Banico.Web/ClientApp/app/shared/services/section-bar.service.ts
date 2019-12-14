import { first } from "rxjs/operators";
import { Injectable, Inject } from "@angular/core";
import { SectionBarItem } from "../../entities/section-bar-item";
import { SectionItem } from "../../entities/section-item";
import { Section } from "../../entities/section";
import { SectionsService } from "./sections.service";

@Injectable()
export class SectionBarService {
  public isAdmin: boolean;
  public sectionBarItems: SectionBarItem[];
  public pathUrlRoot: string;
  private inputPathUrl: string;

  public readonly SEGMENT_DELIM: string = "_";
  public readonly TYPE_DELIM: string = "~";
  public readonly SECTION_DELIM: string = "*";

  public constructor(
    @Inject(SectionsService) private sectionsService: SectionsService
  ) {}

  public async initialize(
    module: string,
    inputPathUrl: string,
    adminSection: string,
    pathRoot: string
  ) {
    this.isAdmin = false;
    this.inputPathUrl = inputPathUrl;
    this.pathUrlRoot = pathRoot;
    this.sectionBarItems = new Array<SectionBarItem>();

    let sections = new Array<Section>();
    if (adminSection) {
      this.isAdmin = true;
      const section = new Section();
      section.name = adminSection;
      sections.push(section);
    } else {
      sections = await this.sectionsService
        .getSections("", module, "")
        .pipe(first())
        .toPromise();
    }

    this.initializeSectionBarItems(sections);

    for (let i = 0; i < sections.length; i++) {
      this.setup(this.sectionBarItems[i]);
    }
  }

  // Initializes each nav bar
  private initializeSectionBarItems(sections: Section[]) {
    for (var i: number = 0; i < sections.length; i++) {
      var sectionBarItem = new SectionBarItem();
      sectionBarItem.showDropdown = false;
      sectionBarItem.childrenVisible = false;
      sectionBarItem.section = sections[i];
      sectionBarItem.sectionItem = new SectionItem();
      sectionBarItem.childSectionItems = new Array<SectionItem>();

      this.sectionBarItems.push(sectionBarItem);
    }
  }

  public async setup(sectionBarItem: SectionBarItem) {
    var sectionName: string = sectionBarItem.section.name;
    sectionBarItem.homePathUrl = this.fullPathUrl(sectionName, "");
    var sectionPathUrl: string = this.pathUrlSegmentBySection(sectionName);

    if (sectionPathUrl) {
      var sectionItems = await this.sectionsService
        .getSectionItemByPath(sectionName + this.TYPE_DELIM + sectionPathUrl)
        .pipe(first())
        .toPromise();
      await this.setSectionBarItem(sectionBarItem, sectionItems[0]);
    }

    if (!sectionPathUrl) {
      var sectionItems = await this.sectionsService
        .getSectionItems("", sectionName, "", "", "", "", true)
        .pipe(first())
        .toPromise();
      sectionBarItem.childSectionItems = this.cleanChildSectionItems(
        sectionBarItem,
        sectionItems
      );
    }

    // set dropdown
    sectionBarItem.showDropdown = sectionBarItem.childSectionItems.length > 0;
  }

  public async setSectionBarItem(
    sectionBarItem: SectionBarItem,
    sectionItem: SectionItem
  ) {
    if (!sectionBarItem) {
      sectionBarItem = this.sectionBarItems[0];
    }

    sectionBarItem.sectionItem = sectionItem;

    // set path names
    sectionBarItem.pathNames = this.setPathNames(sectionBarItem);

    // set path url
    var sectionPathUrl: string = sectionBarItem.sectionItem.pathUrl;
    if (sectionPathUrl) {
      sectionPathUrl = sectionPathUrl + this.SEGMENT_DELIM;
    }
    sectionPathUrl = sectionPathUrl + sectionBarItem.sectionItem.alias;
    this.setPathUrls(sectionBarItem, sectionPathUrl);

    // set child section items
    var sectionItems = await this.sectionsService
      .getSectionItems("", "", "", "", "", sectionBarItem.sectionItem.id, false)
      .pipe(first())
      .toPromise();
    sectionBarItem.childSectionItems = this.cleanChildSectionItems(
      sectionBarItem,
      sectionItems
    );
  }

  private setPathNames(sectionBar: SectionBarItem) {
    var pathNames = new Array<string>();

    if (sectionBar.sectionItem.pathName) {
      pathNames = sectionBar.sectionItem.pathName.split(this.SEGMENT_DELIM);
    }

    var i: number;
    for (i = 0; i < pathNames.length; i++) {
      if (pathNames[i].length === 0) {
        pathNames.splice(i, 1);
      }
    }

    return pathNames;
  }

  private setPathUrls(sectionBarItem: SectionBarItem, sectionPathUrl: string) {
    var pathUrls: string[];
    pathUrls = sectionBarItem.sectionItem.pathUrl.split(this.SEGMENT_DELIM);
    var sectionName: string;
    if (sectionBarItem.section !== null) {
      sectionName = sectionBarItem.section.name;
    }

    var i: number;
    for (i = 0; i < pathUrls.length; i++) {
      if (pathUrls[i] !== null) {
        if (pathUrls[i].length === 0) {
          pathUrls.splice(i, 1);
        }
      }
    }

    sectionBarItem.pathUrls = [];
    var currentPathUrl: string = "";
    for (i = 0; i < pathUrls.length; i++) {
      if (i > 0) {
        currentPathUrl = currentPathUrl + this.SEGMENT_DELIM;
      }
      currentPathUrl = currentPathUrl + pathUrls[i];
      var newCurrentPathUrl: string = this.fullPathUrl(
        sectionName,
        currentPathUrl
      );

      sectionBarItem.pathUrls.push(newCurrentPathUrl);
    }
  }

  public cleanChildSectionItems(
    sectionBarItem: SectionBarItem,
    sectionItems: SectionItem[]
  ) {
    if (sectionItems && sectionItems.length > 0) {
      var i: number;
      for (i = 0; i < sectionItems.length; i++) {
        //sectionItems[i].fullpath = this.pathWithAlias(sectionItems[i].path, sectionItems[i].alias);

        if (sectionItems[i]) {
          if (sectionItems[i].section !== sectionBarItem.section.name) {
            sectionItems.splice(i, 1);
          }
        }
      }
    }

    return sectionItems;
  }

  private pathWithAlias(sectionItem: SectionItem): string {
    var pathUrlWithAlias: string = sectionItem.pathUrl;
    if (pathUrlWithAlias) {
      pathUrlWithAlias = pathUrlWithAlias + this.SEGMENT_DELIM;
    }
    pathUrlWithAlias = pathUrlWithAlias + sectionItem.alias;
    return this.fullPathUrl(sectionItem.section, pathUrlWithAlias);
  }

  private fullPathUrl(section: string, localPathUrl: string): string {
    var fullPathUrl: string = "";
    for (var i: number = 0; i < this.sectionBarItems.length; i++) {
      var pathUrlToAdd: string = "";

      if (this.sectionBarItems[i].section.name !== section) {
        pathUrlToAdd =
          this.sectionBarItems[i].section.name +
          this.TYPE_DELIM +
          this.pathUrlSegmentBySection(this.sectionBarItems[i].section.name);
      } else {
        if (localPathUrl) {
          pathUrlToAdd =
            this.sectionBarItems[i].section.name +
            this.TYPE_DELIM +
            localPathUrl;
        }
      }

      if (pathUrlToAdd) {
        if (fullPathUrl) {
          fullPathUrl = fullPathUrl + this.SECTION_DELIM;
        }
        fullPathUrl = fullPathUrl + pathUrlToAdd;
      }
    }

    return fullPathUrl;
  }

  private pathUrlSegmentBySection(inputSection: string): string {
    if (this.inputPathUrl) {
      var pathUrls: string[] = this.inputPathUrl.split(this.SECTION_DELIM);
      for (var i: number = 0; i < pathUrls.length; i++) {
        var pathUrl = pathUrls[i];
        var section = pathUrl.split(this.TYPE_DELIM)[0];
        if (section === inputSection) {
          return pathUrl.split(this.TYPE_DELIM)[1];
        }
      }
    }

    return "";
  }

  public addSectionItem(index: number, sectionItem: SectionItem) {
    //sectionItem.fullpath = this.pathWithAlias(sectionItem.path, sectionItem.alias);
    this.sectionBarItems[index].childSectionItems.push(sectionItem);
    this.sectionBarItems[index].showDropdown = true;
  }

  public setVisible($event: any, sectionBar: SectionBarItem) {
    //$event.preventDefault();
    sectionBar.childrenVisible = !sectionBar.childrenVisible;
  }
}
