import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListSet } from '../../entities/list-set';
import { ListSetService } from '../../services/list-set.service';

@Component({
  selector: 'list-set-display',
  templateUrl: './list-set-display.component.html',
  styleUrls: ['./list-set-display.component.scss']
})
export class ListSetDisplayComponent implements OnInit {
  private sub: any;
  public listSet: ListSet = new ListSet(null);

  constructor(
    private listSetService: ListSetService,
    private router: Router,
    private route: ActivatedRoute
    ) {
}

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        var id = params['id'];
        alert(id);
        this.listSetService.get(id)
          .subscribe(listSet => {
            alert(JSON.stringify(listSet));
            this.set(listSet);
          });
        }
    });
  }

  private set(listSet: ListSet) {
    this.listSet = listSet;
  }

}
