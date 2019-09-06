import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionItem } from '../../../../entities/section-item';
import { NavBarService } from '../../../../shell/nav-bar/nav-bar.service';
import { SectionsService } from '../../../../shared/services/sections.service';
import { SectionsFileService } from '../../services/sections-file.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-admin-sections-section-item',
    templateUrl: './section-item.component.html',
    providers: [SectionsFileService]
})
export class AdminSectionsSectionItemComponent implements OnInit {
    public helper: string;
    public showDropdown: boolean;

    public parentSectionItem: SectionItem;
    public newSectionItem: SectionItem;

    private sub: any;
    private file: any;

    private readonly PATH_DELIM: string = '_';
    private readonly TYPE_DELIM: string = '~';
    private readonly SECTION_DELIM: string = '*';

    public sectionItemForm: FormGroup = this.fb.group({
        id: [''],
        name: ['', Validators.required]
      });

    public constructor(
        private navBarService: NavBarService,
        private sectionsService: SectionsService,
        private sectionFileService: SectionsFileService,
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this.parentSectionItem = new SectionItem();

        this.newSectionItem = new SectionItem();
        this.newSectionItem.parentId = this.parentSectionItem.parentId;
        this.newSectionItem.pathUrl = this.parentSectionItem.pathUrl;
        this.newSectionItem.pathName = this.parentSectionItem.pathName;

        var pathUrl: string = "";
        var section: string = "";
        this.sub = this.route.params.subscribe(params => {
            section = params['section'];
            this.setSection(section);
            if (params['path']) {
                pathUrl = params['path'];
                section = pathUrl.split(this.TYPE_DELIM)[0];
                this.sectionsService.getSectionItemByPath(pathUrl)
                    .subscribe(sectionItems => {
                        if (sectionItems.length > 0) {
                            this.setParentSectionItem(sectionItems[0], pathUrl);
                        }
                    });
            }

            this.navBarService.initialize('', pathUrl, section, '/admin/sections');
        });
    }

    private setFile($event) {
        this.file = $event.target;
    }

    private uploadFile() {
        var file: File = this.file.files[0]; 
        var reader: FileReader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => this.onLoadCallback(reader.result);
    }

    private onLoadCallback(result: any) {
        this.sectionFileService.UploadFile(this.parentSectionItem.section, result);
    }

    private setSection(section: string) {
        this.parentSectionItem.section = section;
        //this.navBarService.setSectionType(0, sectionType);
        this.newSectionItem.section = section;
    }

    private setParentSectionItem(parentSectionItem: SectionItem, path: string) {
        this.parentSectionItem = parentSectionItem;

        this.newSectionItem.pathUrl = this.parentSectionItem.pathUrl;
        if (this.newSectionItem.pathUrl) {
            this.newSectionItem.pathUrl = this.newSectionItem.pathUrl + this.PATH_DELIM;
        }
        this.newSectionItem.pathUrl = this.newSectionItem.pathUrl + this.parentSectionItem.alias;

        this.newSectionItem.parentId = this.parentSectionItem.id;
        this.newSectionItem.section = this.parentSectionItem.section;
        this.newSectionItem.pathName = this.parentSectionItem.pathName;
        if (this.parentSectionItem.pathName > '') {
            this.newSectionItem.pathName = this.newSectionItem.pathName + this.PATH_DELIM;
        }
        this.newSectionItem.pathName = this.newSectionItem.pathName + this.parentSectionItem.name;

        this.navBarService.setNavBarItem(null, parentSectionItem);
    }

    public save() {
        this.newSectionItem.name = this.sectionItemForm.value['name'];
        let alias: string = this.newSectionItem.name.toLowerCase();
        alias = alias.replace(/ /g, '-');
        alias = alias.replace(/[^\w\s-]/g, '');
        this.newSectionItem.alias = alias;

        this.sectionsService.addOrUpdateSectionItem(
            this.newSectionItem.id,
            this.newSectionItem.section,
            this.newSectionItem.parentId,
            this.newSectionItem.pathUrl,
            this.newSectionItem.pathName,
            this.newSectionItem.name,
            this.newSectionItem.alias
        )
            .subscribe(sectionItem => this.saveSectionItemSuccess(sectionItem));
    }

    private saveSectionItemSuccess(sectionItem: SectionItem) {
        if (sectionItem.id != '') {
            alert('Saved.');
            this.navBarService.addSectionItem(0, sectionItem);
            this.resetNewSectionItem();
        }
        else {
            alert('Save failed.');
        }
    }

    private resetNewSectionItem() {
        this.newSectionItem = new SectionItem();
        this.newSectionItem.section = this.parentSectionItem.section;
        this.newSectionItem.pathUrl = this.parentSectionItem.pathUrl;
        if (this.newSectionItem.pathUrl) {
            this.newSectionItem.pathUrl = this.newSectionItem.pathUrl + this.PATH_DELIM;
        }
        this.newSectionItem.pathUrl = this.newSectionItem.pathUrl + this.parentSectionItem.alias;
        this.newSectionItem.pathName = this.parentSectionItem.pathName;
        if (this.newSectionItem.pathName) {
            this.newSectionItem.pathName = this.newSectionItem.pathName + this.PATH_DELIM;
        }
        this.newSectionItem.pathName = this.newSectionItem.pathName + this.parentSectionItem.name;
        this.newSectionItem.parentId = this.parentSectionItem.id;
    }
    
    private SaveResponse(data: any) {
        if (data != null) {
            if (data.value != null) {
                if (data.value == '0') {
                    alert('Saved.');
                } else {
                    alert('Save failed.');
                }
            } else {
                alert('Save failed.');
            }
        } else {
            alert('Save failed.');
        }
    }
}
