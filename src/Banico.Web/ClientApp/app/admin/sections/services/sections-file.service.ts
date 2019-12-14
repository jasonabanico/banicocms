import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { SectionItem } from '../../../entities/section-item';
//import { status, json } from '../../../shared/fetch';
//import { Observable } from 'rxjs/Observable';
import { SectionsService } from '../../../shared/services/sections.service';

@Injectable()
export class SectionsFileService {
    sectionApiBaseUrl: string;

    readonly SEGMENT_DELIM: string = '_';
    readonly TYPE_DELIM: string = '~';
    readonly SECTION_DELIM: string = '*';

    constructor(
        @Inject(SectionsService) private sectionService: SectionsService,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        this.sectionApiBaseUrl = `${this.baseUrl}api/Section`;
    }

    public UploadFile(sectionType: string, inputString: string) {
        var lines = inputString.split('\n');
        this.ProcessPair(new SectionItem(), sectionType, '', '', '', lines[0].split(','), lines);
    }

    public ProcessPair(
        sectionItem: SectionItem, 
        section: string, 
        parentId: string, 
        pathName: string, 
        path: string, 
        remainingFields: string[], 
        lines: string[]) {
        if (remainingFields.length > 0) {
            var name: string = remainingFields[0];
            if (name) {
                var alias: string = remainingFields[1].replace(/(\r\n|\n|\r)/gm,"");;
                remainingFields.splice(0, 2);

                this.sectionService.getSectionItems(
                    '', '', '', '', name, parentId, false
                )
                    .subscribe(sectionItem => this.ProcessSectionItem(
                        sectionItem[0], 
                        section, 
                        name, 
                        alias, 
                        parentId, 
                        pathName, 
                        path, 
                        remainingFields, 
                        lines));
            } else {
                if (lines.length > 0) {
                    lines.splice(0, 1);
                    this.ProcessPair(new SectionItem(), section, '', '', '', lines[0].split(','), lines);
                }
            }
        }
        else {
            if (lines.length > 0) {
                lines.splice(0, 1);
                this.ProcessPair(new SectionItem(), section, '', '', '', lines[0].split(','), lines);
            }
        }
    }

    public ProcessSectionItem(
        sectionItem: SectionItem, 
        sectionType: string, 
        name: string, 
        alias: string, 
        parentId: string, 
        pathName: string, 
        path: string, 
        remainingFields: string[], 
        lines: string[]) {
        if (isNaN(Number(sectionItem.id)) || (Number(sectionItem.id) === 0)) {
            if (name !== '') {
                sectionItem.name = name;
                sectionItem.alias = alias;
                sectionItem.section = sectionType;
                sectionItem.pathName = pathName;
                sectionItem.pathUrl = path;
                sectionItem.parentId = parentId;

                if (pathName) {
                    pathName = sectionItem.pathName + this.SEGMENT_DELIM;
                }

                if (path) {
                    path = sectionItem.pathUrl + this.SEGMENT_DELIM;
                }

                this.sectionService.addOrUpdateSectionItem(
                    sectionItem.id,
                    sectionItem.section,
                    sectionItem.parentId,
                    sectionItem.pathUrl,
                    sectionItem.pathName,
                    sectionItem.name,
                    sectionItem.alias
                    )
                    .subscribe(newSection => this.ProcessPair(newSection,
                        sectionType, 
                        newSection.id, 
                        pathName + sectionItem.name, 
                        path + newSection.alias, 
                        remainingFields,
                        lines));
            }
        } 
        else {
            if (pathName) {
                pathName = pathName + this.SEGMENT_DELIM;
            }

            if (path) {
                path = path + this.SEGMENT_DELIM;
            }

            this.ProcessPair(sectionItem,
                sectionType, 
                sectionItem.id, 
                pathName + sectionItem.name, 
                path + sectionItem.alias, 
                remainingFields,
                lines);
        }
    }
}