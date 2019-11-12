import { Component, Inject } from "@angular/core";
import { Config } from "../../../../entities/config";
import { ConfigsService } from "../../services/configs.service";

@Component({
    selector: 'app-admin-config-home',
    templateUrl: './home.component.html',
    providers: []
})
export class AdminConfigHomeComponent {
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
        this.configs = configs.sort((config1, config2) => config1.module.localeCompare(config2.module));
    }
}