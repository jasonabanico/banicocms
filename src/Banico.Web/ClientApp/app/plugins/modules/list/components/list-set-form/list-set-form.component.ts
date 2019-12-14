import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListSetService } from '../../services/list-set.service';
import { ListSet } from '../../entities/list-set';

@Component({
    selector: 'app-plugins-list-set-form',
    templateUrl: './list-set-form.component.html',
    providers: [ListSetService]
})
export class ListSetFormComponent implements OnInit {
    private sub: any;
    public isSuccessful: boolean;
    public isRequesting: boolean;
    public errors: string;  

    public listSetForm: FormGroup = this.fb.group({
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
            if (params['id']) {
            var id = params['id'];
            this.listSetService.get(id)
                .subscribe(listSet => {
                this.set(listSet);
                });
            }
        });
    }
    
    private set(listSet: ListSet) {
        var sectionItems = this.listSetService.toSectionItems(listSet.toContentItem());
        this.listSetForm.patchValue({
            id: listSet.id,
            sectionItems: sectionItems,
            name: listSet.name,
            alias: listSet.alias,
            description: listSet.description
        });
    }

    public save() {
        var alias: string = this.listSetForm.value['alias'];
        this.listSetService.addOrUpdate(
            this.listSetForm.value['id'],
            this.listSetForm.value['name'],
            alias,
            this.listSetForm.value['description'],
            this.listSetForm.value['sectionItems'],
        )
        //.finally(() => {
        //    this.isSuccessful = true;
        //    this.router.navigate(['/list/list-set/' + alias]);
        //})
        .subscribe(
            result  => {
                this.isSuccessful = true;
                this.router.navigate(['/list/list-set/' + alias]);
            },
            errors =>  {
                this.errors = errors
            });        
    }

    private saveSuccess(listSet: ListSet) {
        if (listSet.id !== '0') {
            alert('Saved.');
        }
        else {
            alert('Save failed.');
        }
    }

    private SaveResponse(data: any) {
        if (data !== null) {
            if (data.value !== null) {
                if (data.value === '0') {
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
