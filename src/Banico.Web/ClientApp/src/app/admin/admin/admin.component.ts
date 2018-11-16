import { Component } from "@angular/core";
import { ConfigsService } from "../configs/main/configs.service";

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    providers: []
})
export class AdminComponent {
    isInitialized: boolean;

    constructor(
        private configsService: ConfigsService
        ) {
    }

    public ngOnInit() {
        this.configsService.initialized()
            .subscribe(result => this.isInitialized = result);
    }

    public initialize() {
        this.configsService.setInitialSettings()
            .subscribe(result => this.isInitialized = true);
    }
}