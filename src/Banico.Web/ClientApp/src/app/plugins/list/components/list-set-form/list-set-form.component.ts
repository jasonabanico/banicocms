import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListSetService } from '../../services/list-set.service';
import { ListSet } from '../../entities/list-set';

@Component({
    selector: 'list-set-form',
    templateUrl: './list-set-form.component.html',
    providers: [ListSetService]
})
export class ListSetFormComponent implements OnInit {
    private sub: any;
    isSuccessful: boolean;
    isRequesting: boolean;
    errors: string;  

    listSetForm = this.fb.group({
        id: [''],
        sectionItems: ['', Validators.required],
        name: ['', Validators.required],
        alias: ['', Validators.required],
        description: ['', Validators.required]
      });

    constructor(
        private listSetService: ListSetService,
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute
        ) {
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['alias']) {
            var alias = params['alias'];
            this.listSetService.getByAlias(alias)
                .subscribe(listSet => {
                this.set(listSet);
                });
            }
        });
    }
    
    private set(listSet: ListSet) {
        this.listSetForm.patchValue({
            id: listSet.id,
            sectionItems: listSet.sectionItems,
            name: listSet.name,
            alias: listSet.alias,
            description: listSet.description
        });
    }

    public save() {
        this.listSetService.addOrUpdate(
            this.listSetForm.value['id'],
            this.listSetForm.value['sectionItems'],
            this.listSetForm.value['name'],
            this.listSetForm.value['alias'],
            this.listSetForm.value['description']
        )
        .finally(() => this.isRequesting = false)
        .subscribe(
        result  => {
            this.isSuccessful = true;
        },
        errors =>  this.errors = errors);
    }

    private saveSuccess(listSet: ListSet) {
        if (listSet.id != '0') {
            alert('Saved.');
        }
        else {
            alert('Save failed.');
        }
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
