import { Component } from "@angular/core";
import { ConfigsService } from "../configs/services/configs.service";

@Component({
    selector: 'app-admin-home',
    templateUrl: './home.component.html',
    providers: []
})
export class AdminHomeComponent {
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