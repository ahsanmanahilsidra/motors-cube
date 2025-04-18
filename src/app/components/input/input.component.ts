import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    standalone: false
})
export class InputComponent {
  @Input() label: string | undefined;
  @Input() type = 'text'; // set default type be text

  focused: boolean | undefined;

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }
}
