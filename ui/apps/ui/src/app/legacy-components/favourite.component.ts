import { Component } from '@angular/core';
// import { IResource } from '../repositories/resource.interface';

@Component({
  selector: 'ui-favourite',
  template: `
    <div id="container">
      <p>
        <!--        <a class="title" href="{{ favourite.url }}" target="_blank">{{-->
        <!--          favourite.title-->
        <!--        }}</a>-->
      </p>
      <article>
        <p>
          <small>
            <i>
              <!--              {{ favourite.description }}-->
            </i>
          </small>
        </p>
      </article>
      <!--      <ng-container *ngIf="favourite.organisation !== undefined">-->
      <!--        <p>Organisation: {{ favourite.organisation }}</p>-->
      <!--      </ng-container>-->
    </div>
  `,
  styles: [
    `
      .title {
      }
      #container {
        margin-bottom: 12px;
        padding: 20px;
        border-radius: 5px;
        background: white;
      }
      article {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    `,
  ],
})
export class FavouriteComponent {
  // @Input()
  // favourite!: IResource;
}
