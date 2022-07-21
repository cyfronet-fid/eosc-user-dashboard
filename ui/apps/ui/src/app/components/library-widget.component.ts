import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-library-widget',
  template: `
    <div class="widget" [class.active]="isActive">
      <div class="widget-content">
        <img class="widget-icon" [src]="imageSrc" alt="..." />
        <p class="widget-label">{{ label }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .active > .widget-content {
        background-color: #05cae7;
      }
      .widget {
        text-align: center;
        cursor: pointer;
      }

      .widget-content {
        padding: 24px 0;
        background-color: white;
        position: relative;
      }

      .widget-icon {
        max-width: 70px;
        max-height: 70px;
        padding-bottom: 24px;
      }
    `,
  ],
})
export class LibraryWidgetComponent {
  @Input()
  imageSrc!: string;

  @Input()
  label!: string;

  @Input()
  isActive!: boolean;
}
