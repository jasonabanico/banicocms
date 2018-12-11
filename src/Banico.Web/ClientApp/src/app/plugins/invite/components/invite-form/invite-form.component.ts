﻿import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Invite } from '../../main/invite';
import { InviteService } from '../../main/invite.service';

@Component({
    selector: 'invite-form',
    templateUrl: './invite-form.component.html',
    providers: [InviteService]
})
export class InviteFormComponent implements OnInit {
    public invite: Invite;

    public constructor(
        @Inject(InviteService) private inviteService: InviteService,
        private router: Router,
        private route: ActivatedRoute        
    ) {
    }

    public ngOnInit() {
        this.invite = new Invite();
    }

    public submit() {
        this.inviteService.addInvite(this.invite)
            .subscribe(invite => this.submitInviteSuccess(invite));
    }

    private submitInviteSuccess(invite: Invite) {
        if (invite.id !== '0') {
            alert('Saved.');
        } else {
            alert('Save failed.');
        }
    }
}