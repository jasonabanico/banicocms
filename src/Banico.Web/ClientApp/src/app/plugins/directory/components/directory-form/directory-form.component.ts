import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentItem } from '../../../../entities/content-item';
import { DirectoryItem } from '../../main/directory-item';
import { NavBarService } from '../../../../shell/nav-bar/nav-bar.service';
import { DirectoryService } from '../../main/directory.service';

@Component({
    selector: 'directory-form',
    templateUrl: './directory-form.component.html',
    providers: [DirectoryService]
})
export class DirectoryFormComponent implements OnInit {
    public directoryItem: DirectoryItem;
    private sub: any;
    private isEdit: boolean = false;

    public constructor(
        @Inject(NavBarService) private navBarService: NavBarService,
        @Inject(DirectoryService) private directoryService: DirectoryService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this.directoryItem = new DirectoryItem(null);
        this.sub = this.route.params.subscribe(params => {
            var id = params['id'];
            var path = params['path'];
            if (id) {
                this.directoryService.get(id)
                    .subscribe(directoryItem => this.set(directoryItem));
            }
            if (path) {
                this.navBarService.initialize('directory', path, '', '/directory');
                this.directoryItem.sectionItems = path;
            }
        });
    }

    private set(directoryItem: DirectoryItem) {
        this.directoryItem = directoryItem;
        this.navBarService.initialize('directory', directoryItem.sectionItems, '', '/directory');
        this.isEdit = true;
    }

    public save() {
        this.directoryService.addOrUpdate(this.directoryItem)
            .subscribe(directoryItem => this.saveDirectoryItemSuccess(directoryItem));
    }

    private saveDirectoryItemSuccess(directoryItem: DirectoryItem) {
        if (directoryItem.id != '0') {
            alert('Saved.');
            this.router.navigateByUrl('directory/item/' + directoryItem.id);
        }
        else {
            alert('Save failed.');
        }
    }

    private SaveResponse(data: any) {
        if (data != null) {
            if (data.value != null) {
                if (data.value == '1') {
                    alert('Saved.');
                    this.router.navigateByUrl('directory/item/' + this.directoryItem.id);
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
