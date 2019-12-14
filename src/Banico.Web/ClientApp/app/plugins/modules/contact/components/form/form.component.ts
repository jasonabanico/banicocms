import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Contact } from "../../entities/contact";
import { Field } from "../../entities/field";
import { AuthService } from "../../../../../shared/services/auth.service";
import { ContactService } from "../../services/contact.service";
import { ModalComponent } from "../../../../../shell/modal/modal.component";

@Component({
  selector: "app-plugins-contact-form",
  templateUrl: "./form.component.html",
  providers: [ContactService]
})
export class ContactFormComponent implements OnInit, OnDestroy {
  public contact: Contact;
  private sub: any;
  public isAdmin: boolean;
  public fieldValue: string[];

  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(ContactService) private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.contact = new Contact(null);
    this.sub = this.route.params.subscribe(params => {
      var alias = params["alias"];
      this.contactService
        .getByAlias(alias)
        .subscribe(contact => this.setContact(contact));
    });
  }

  private setContact(contact: Contact) {
    this.contact = contact;
    this.contact.fields = [];
    this.fieldValue = [];
    var fields = JSON.parse(contact.content);
    for (var i = 0; i < fields.length; i++) {
      var fieldItem = fields[i];
      var field = new Field();
      field.name = fieldItem.name;
      field.type = fieldItem.type;
      this.contact.fields.push(field);
      this.fieldValue.push("");
    }
  }

  public delete() {
    // const modalRef = this.modalService.open(ModalComponent)
    // modalRef.componentInstance.title = "Delete Confirmation"
    // modalRef.componentInstance.body = "Delete this item?";
    // modalRef.componentInstance.button = "Delete";
    // modalRef.result.then((result) => {
    //     if (result === 'success') {
    //         this.contactService.deleteContact(this.contact)
    //             .subscribe(response => this.SaveResponse(response));
    //     }
    // });
  }

  public send() {
    var message = "";
    message = message + "Sender Name: " + this.contact.senderName + "\n";
    message = message + "Sender Email: " + this.contact.senderEmail + "\n";
    for (var i = 0; i < this.contact.fields.length; i++) {
      var fieldItem = this.contact.fields[i];
      message = message + fieldItem.name + ": " + this.fieldValue[i] + "\n";
    }

    // this.contactService
    //   .sendContactEmail(this.contact, message)
    //   .subscribe(response => alert(JSON.stringify(response)));
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
