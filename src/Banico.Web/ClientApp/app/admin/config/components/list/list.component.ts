import { Component, Inject } from "@angular/core";
import { Config } from "../../../../entities/config";
import { ConfigsService } from "../../services/configs.service";

@Component({
    selector: 'app-admin-config-list',
    templateUrl: './list.component.html',
    providers: []
})
export class AdminConfigListComponent {
    public configs: Config[];

    constructor(
        @Inject(ConfigsService) public configsService: ConfigsService
    ) {
    }

    ngOnInit() {
        this.configs = new Array();
        this.configsService.getAll('', '', '')
            .subscribe(configs => this.setConfigs(configs));
    }

    private setConfigs(configs: Config[])
    {
        this.configs = configs;
    }
}