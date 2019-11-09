import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-shell-modal",
  templateUrl: "./modal.component.html"
})
export class ModalComponent {
  @Input() id;
  @Input() title;
  @Input() body;
  @Input() button;

  @Output() actioned: EventEmitter<any> = new EventEmitter();

  public show() {
    document.getElementById("openModalButton-" + this.id).click();
  }

  public action() {
    this.actioned.emit();
    document.getElementById("closeModalButton-" + this.id).click();
  }
}
