import {finalize} from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigsService } from '../../services/configs.service';
import { Config } from '../../../../entities/config';

@Component({
    selector: 'app-admin-config-form',
    templateUrl: './form.component.html',
    providers: [ConfigsService]
})
export class AdminConfigFormComponent implements OnInit {
    private sub: any;
    isSuccessful: boolean;
    isRequesting: boolean;
    errors: string;  
    public configs: Config[];
    public config: Config;

    public configForm: FormGroup = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        module: [''],
        value: ['', Validators.required]
    });

    constructor(
        private configsService: ConfigsService,
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute
        ) {
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id']) {
            var id = params['id'];
            this.configsService.get(id, '', '')
                .subscribe(config => {
                    this.set(config);
                });
            }
        });
    }
    
    private set(config: Config) {
        this.configForm.patchValue({
            id: config.id,
            name: config.name,
            module: config.module,
            value: config.value
        });
    }

    public save() {
        this.configsService.addOrUpdate(
            this.configForm.value['id'],
            this.configForm.value['name'],
            this.configForm.value['module'],
            this.configForm.value['value']
        ).pipe(
        finalize(() => this.isRequesting = false))
        .subscribe(
        result  => {
            this.isSuccessful = true;
        },
        errors =>  this.errors = errors);
    }

    private saveSuccess(config: Config) {
        if (config.id !== '0') {
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
