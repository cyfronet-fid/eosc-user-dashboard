import { Component, Input } from '@angular/core';
import truncate from 'lodash-es/truncate';

const MAX_CHARS_LENGTH = 256;
@Component({
  selector: 'ui-description',
  template: `<p class="description">
    <span>
      {{ shortDescription }}
    </span>
  </p>`,
  styles: [],
})
export class DescriptionComponent {
  shortDescription!: string;

  @Input()
  set description(description: string) {
    this.shortDescription = truncate(description, { length: MAX_CHARS_LENGTH });
  }
}
