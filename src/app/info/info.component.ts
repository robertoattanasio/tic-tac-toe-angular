import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent {
  @Input() usefulInfo: string;
  @Output() resetTable = new EventEmitter();

  resetGame() {
    this.resetTable.emit();
  }
}
