import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Faq } from "../../entities/faq";
import { Qa } from "../../entities/qa";
import { FaqService } from "../../services/faq.service";
import { ModalComponent } from "../../../../../shell/modal/modal.component";

@Component({
  selector: "app-plugins-faq-list",
  templateUrl: "./list.component.html",
  providers: [FaqService]
})
export class FaqListComponent implements OnInit, OnDestroy {
  public faq: Faq;
  private sub: any;
  public isAdmin: boolean;

  constructor(
    @Inject(FaqService) private faqService: FaqService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.faq = new Faq(null);
    this.sub = this.route.params.subscribe(params => {
      var alias = params["alias"];
      this.faqService.getByAlias(alias).subscribe(faq => this.setFaq(faq));
    });
  }

  private setFaq(faq: Faq) {
    this.faq = faq;
    this.faq.qas = [];
    var qas = JSON.parse(faq.content);
    for (var i = 0; i < qas.length; i++) {
      var qaItem = qas[i];
      var qa = new Qa();
      qa.question = qaItem.question;
      qa.answer = qaItem.answer;
      this.faq.qas.push(qa);
    }
  }

  delete() {
    // const modalRef = this.modalService.open(ModalComponent)
    // modalRef.componentInstance.title = "Delete Confirmation"
    // modalRef.componentInstance.body = "Delete this item?";
    // modalRef.componentInstance.button = "Delete";
    // modalRef.result.then((result) => {
    //     if (result === 'success') {
    //         this.faqService.delete(this.faq)
    //             .subscribe(response => this.SaveResponse(response));
    //     }
    // });
  }

  private SaveResponse(data: any) {
    if (data !== null) {
      if (data.value !== null) {
        if (data.value === "1") {
          alert("Saved.");
          this.router.navigateByUrl("front");
        } else {
          alert("Save failed.");
        }
      } else {
        alert("Save failed.");
      }
    } else {
      alert("Save failed.");
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
