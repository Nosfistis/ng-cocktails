import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  checked = false;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.onChange(localStorage.getItem('theme') === 'true');
  }

  onChange(checked: boolean): void {
    this.checked = checked;

    if (checked) {
      this.document.body.classList.add('light-theme');
    } else {
      this.document.body.classList.remove('light-theme');
    }

    localStorage.setItem('theme', checked ? 'true' : 'false');
  }
}
