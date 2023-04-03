import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import truncate from 'lodash-es/truncate';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

const MAX_CHARS_LENGTH = 512;
@Component({
  selector: 'ui-description',
  template: `<p class="description">
    <span [innerHtml]="shortDescription | safeHtml"> </span>
  </p>`,
  styles: [],
})
export class DescriptionComponent {
  shortDescription!: string;

  constructor(private sanitizer: DomSanitizer) {}

  @Input()
  set description(description: string) {
    this.shortDescription = truncate(description, { length: MAX_CHARS_LENGTH });
  }
}
