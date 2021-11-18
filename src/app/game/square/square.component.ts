import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
})
export class SquareComponent {
  @Input() answer: string;
  @Input() tableLocked: boolean;

  checkColorBackground(answer) {
    let color: string;
    if (answer == 'X') {
      color = 'var(--lightRed)';
    } else if (answer == 'O') {
      color = 'var(--lightBlue)';
    }
    return color;
  }
}
