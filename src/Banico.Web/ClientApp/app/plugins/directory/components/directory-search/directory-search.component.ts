import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DirectoryItem } from '../../main/directory-item';
import { NavBarService } from '../../../../shell/nav-bar/nav-bar.service';
import { SectionsService } from '../../../../shared/services/sections.service';
import { DirectoryService } from '../../main/directory.service';

@Component({
    selector: 'app-directory-search',
    templateUrl: './directory-search.component.html',
    providers: [DirectoryService]
})
export class DirectorySearchComponent implements OnInit, OnDestroy {
    private id: string;
    private sub: any;
    public path: string;
    public directoryItems: DirectoryItem[];
    public isAdmin: boolean;

    constructor(
        @Inject(NavBarService) private navBarService: NavBarService,
        @Inject(DirectoryService) private directoryService: DirectoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        // this.sub = this.route.params.subscribe(params => {
        //     this.id = params['id'];
        //     this.directoryService.GetDirectoryItem(this.id)
        //         .subscribe(item => this.item = item);
        // });

        this.sub = this.route.params.subscribe(params => {
            var search = params['search'];
            this.navBarService.initialize('directory', '', '', '/directory');

        if (search)
            {
                this.directoryService.getWithTextSearch(search)
                .subscribe(directoryItems => this.setDirectoryItems(directoryItems));
            }
        });
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private setDirectoryItems(directoryItems: DirectoryItem[]) {
        this.directoryItems = directoryItems;
    }
}
