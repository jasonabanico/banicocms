import { Component, Input } from "@angular/core";

@Component({
  selector: "app-shell-modal",
  templateUrl: "./modal.component.html"
})
export class ModalComponent {
  @Input() id;
  @Input() title;
  @Input() body;
  @Input() button;

  public show() {
    document.getElementById("openModalButton-" + this.id).click();
  }
}
