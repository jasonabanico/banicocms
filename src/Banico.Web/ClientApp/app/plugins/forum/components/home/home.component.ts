import { Component } from '@angular/core';
import { Subforum } from '../../entities/subforum';
import { ForumSubforumService } from '../../services/subforum.service';

@Component({
    selector: 'app-plugins-forum-home',
    templateUrl: './home.component.html'
})
export class ForumHomeComponent {
    public subforums: Subforum[];
    
    constructor(
        private subforumService: ForumSubforumService
        ) {
    }
    
    ngOnInit() {
        this.subforums = new Array();
        this.subforumService.getAll()
            .subscribe(subforums => this.setSubforums(subforums));
    }

    private setSubforums(subforums: Subforum[])
    {
        this.subforums = subforums;
    }
}