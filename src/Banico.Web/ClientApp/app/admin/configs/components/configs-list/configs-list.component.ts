import { Component, Inject } from "@angular/core";
import { Config } from "../../../../entities/config";
import { ConfigsService } from "../../main/configs.service";

@Component({
    selector: 'app-configs-list',
    templateUrl: './configs-list.component.html',
    providers: []
})
export class ConfigsListComponent {
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