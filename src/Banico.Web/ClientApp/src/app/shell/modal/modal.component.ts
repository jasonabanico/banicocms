import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})

export class ModalComponent  {
    @Input() title;
    @Input() body;
    @Input() button;
    
    //constructor (public activeModal: NgbActiveModal) {
    //}
}
