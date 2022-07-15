import { Component, Input } from '@angular/core';

export interface ILibraryWidget {
  id: string;
  imageSrc: string;
  label: string;
}

@Component({
  selector: 'ui-library-widget',
  template: `
    <div class="widget">
      <div class="widget-content">
        <img class="widget-icon" [src]="imageSrc" alt="..." />
        <p class="widget-label">{{ label }}</p>
      </div>
    </div>
  `,
  styles: [
    `
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
}
