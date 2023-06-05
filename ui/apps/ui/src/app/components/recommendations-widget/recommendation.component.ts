import { Component, Input, OnInit } from '@angular/core';
import {
  ISecondaryTag,
  ITag,
  ITertiaryTag,
} from '@components/recommendations-widget/types';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { RecommendationsService } from './recommendations.service';
import { delay } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '@environment/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserProfileService } from '../../auth/user-profile.service';

export class GetId {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getId(_id: number | string = _.uniqueId()): string {
    return _.lowerFirst(this.constructor.name) + '_' + uuidv4();
  }
}

@UntilDestroy()
@Component({
  selector: 'ui-recommendation',
  template: `<div>
    <div
      *ngIf="!this.disliked && !this.duringdislike"
      class="recommendation pt-4"
      style="position:relative;"
    >
      <ui-tags [tags]="tags" [accesstags]="accessTags"></ui-tags>
      <ui-url-title [title]="title" [url]="url"></ui-url-title>
      <ui-secondary-tags [tags]="secondaryTags"></ui-secondary-tags>
      <ui-description [description]="description"></ui-description>
      <ui-tertiary-tags [tags]="tertiaryTags"></ui-tertiary-tags>
      <hr class="my-12" />
      <div class="row justify-content-start ps-2 pe-2">
        <div *ngIf="!this.addedToFav" class="border-img" (click)="addFav()">
          <span class="add-fav-text pe-2">Add to favourites</span>
          <img width="16px" height="16px" src="assets/interested.svg" />
        </div>
        <div *ngIf="this.addedToFav" class="border-img2" (click)="removeFav()">
          <span class="add-fav-text pe-2">In favourites!</span>
          <img width="16px" height="16px" src="assets/trash2.svg" />
        </div>
        <div
          *ngIf="!this.disableDislike && this.dislikeEnabled"
          class="ms-2 border-img-dis"
          (click)="open(content)"
        >
          <img
            width="16px"
            ngbTooltip="Show less like this"
            placement="top"
            height="16px"
            src="assets/unlike.svg"
          />
        </div>
        <!--div
              ngbDropdown
              ngbDropdownToggle
              *ngIf="!this.disableDislike && this.dislikeEnabled"
              class="ms-2 dropdown border-img-dis"
            >
              <div id="dropdownBasic1" class="d-inline-block">
                <img width="16px" height="16px" src="assets/more.svg" />
                <div ngbDropdownMenu aria-labelledby="dropdownBasic1">
                  <button
                    [disabled]="this.disableDislike"
                    ngbDropdownItem
                    class="add-fav-text"
                    (click)="open(content)"
                  >
                    Send Feedback
                  </button>
                </div>
              </div>
            </div-->
      </div>
      <ng-template #content let-modal>
        <div class="modal-header ms-10 me-10">
          <img width="48px" height="48px" src="assets/modal_ok.svg" />
        </div>
        <div class="modal-body ms-10 me-10">
          <div>
            <span class="add-title-text pe-2"
              >The provided data will help improve the EOSC search engine.</span
            >
          </div>
          <div class="mb-3 mt-3">
            <div class="form-check mt-1 mb-1">
              <input
                mdbCheckbox
                class="form-check-input"
                type="checkbox"
                value="Something is wrong"
                id="flexCheck1"
                (change)="checkBox1($event)"
              />
              <label class="form-check-label" for="flexCheck1">
                Something is wrong
              </label>
            </div>
            <div class="form-check mt-1 mb-1">
              <input
                mdbCheckbox
                class="form-check-input"
                type="checkbox"
                value="Not relevant"
                id="flexCheck2"
                (change)="checkBox2($event)"
              />
              <label class="form-check-label" for="flexCheck2">
                This isn't relevant
              </label>
            </div>
            <div class="form-check mt-1 mb-1">
              <input
                mdbCheckbox
                class="form-check-input"
                type="checkbox"
                value="This is spam"
                id="flexCheck3"
                (change)="checkBox3($event)"
              />
              <label class="form-check-label" for="flexCheck3">
                This is spam
              </label>
            </div>
          </div>
          <label mdbLabel class="form-label">Comments or suggestions?</label>
          <textarea
            mdbInput
            class="form-control"
            rows="4"
            placeholder="Type in.."
            [(ngModel)]="textValue"
            (ngModelChange)="textAreaEmpty()"
          ></textarea>
        </div>
        <div class="row ps-2 pe-2 pt-2 pb-2">
          <div class="col-6 pe-1">
            <button
              style="min-width: 100%!important"
              type="button"
              class="btn btn-outline-dark"
              aria-label="Cancel"
              (click)="modal.dismiss('Dismissed')"
            >
              Cancel
            </button>
          </div>
          <div class="col-6 ps-1">
            <button
              type="button"
              style="min-width: 100%!important; background-color: #010F87; color: white;"
              class="btn"
              [disabled]="option1 || option2 || option3 || area ? false : true"
              (click)="modal.close('Save click')"
            >
              Send
            </button>
          </div>
        </div>
      </ng-template>
    </div>
    <div
      *ngIf="this.duringdislike"
      class="recommendation pt-3 blured-bck"
      align="center"
    >
      <div class="pt-2 pb-4">
        <span class="add-fav-text-dislike pe-2"
          >We will show you less resources like this.</span
        >
      </div>
      <button
        style="min-width: 20%!important"
        type="button"
        class="btn btn-sm btn-dark mb-3"
        aria-label="Undo"
        (click)="this.dislikecanceled = true; this.duringdislike = false"
      >
        Undo
      </button>
    </div>
    <div
      *ngIf="this.disliked"
      class="recommendation pt-3 blured-bck"
      style="position: relative; top: 0; left:0; width: 100%; height: 100%;"
      align="center"
    >
      <span class="add-fav-text-dislike" style="z-index:99; position:relative;"
        >Disliked. Refresh website to see better adjusted recommendations. It
        can take few hours until new rocommendation appears.</span
      >
    </div>
  </div>`,
  styles: [
    `
      .blured-bck {
        background-color: rgba(14, 35, 66, 0.33) !important;
        backdrop-filter: blur(7.5px);
        -webkit-backdrop-filter: blur(7.5px);
        border: 1px solid #eef1f3;
        z-index: 98;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .blured-bck2 {
        background-color: rgba(14, 35, 66, 0.63) !important;
        -webkit-filter: blur(3px);
        -moz-filter: blur(3px);
        -o-filter: blur(3px);
        -ms-filter: blur(3px);
        filter: blur(3px);
        z-index: 98;
        top: 0;
        bottom: 0;
        position: relative;
        border: 1px solid #eef1f3;
      }
      .second-modal {
        background: black;
        border-radius: 6px;
      }
      .dropdown-toggle::after {
        display: none;
      }
      .border-img {
        background: rgba(25, 117, 255, 0.08);
        border-radius: 10px;
        padding-top: 3px;
        width: 149px;
        height: 32px;
      }
      .border-img2 {
        background: rgba(201, 242, 155, 0.3);
        border-radius: 10px;
        padding-top: 3px;
        width: 149px;
        height: 32px;
      }
      .border-img-dis {
        background: rgba(25, 117, 255, 0.08);
        border-radius: 10px;
        padding-top: 3px;
        width: 40px;
        height: 32px;
      }
      .add-fav-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
        color: #144b9e;
      }
      .add-fav-text-dislike {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        color: white;
      }
      .add-title-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 800;
        font-size: 14px;
        line-height: 14px;
        color: black;
      }
      .add-title-text2 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: white;
      }
      .add-title-text3 {
        font-family: 'Inter';
        font-style: normal;
        text-decoration: underline;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: white;
      }
      .add-title-text3:hover {
        cursor: pointer;
      }
      .btn-image {
        background-image: 'assets/more.svg' !important;
        background-size: contain; //or cover
        background: rgba(25, 117, 255, 0.08);
        border-radius: 10px;
        padding-top: 3px;
        width: 40px;
        height: 32px;
      }
      .border-img:hover {
        cursor: pointer;
        background: rgba(25, 117, 255, 0.18);
      }
      .border-img2:hover {
        cursor: pointer;
        background: rgba(201, 242, 155, 0.5);
      }
      .border-img-dis:hover {
        cursor: pointer;
        background: rgba(25, 117, 255, 0.18);
      }
    `,
  ],
})
export class RecommendationComponent extends GetId implements OnInit {
  @Input()
  title!: string;

  @Input()
  url!: string;

  @Input()
  type!: string;

  @Input()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id!: any;

  @Input()
  visitid!: string;

  @Input()
  description!: string;

  @Input()
  image!: string;

  @Input()
  pubdate!: string;

  @Input()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  favs: any;

  @Input()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dis: any;

  @Input()
  tags: ITag[] = [];

  @Input()
  jwttoken!: string;

  @Input()
  accessTags: ISecondaryTag[] = [];

  @Input()
  secondaryTags: ISecondaryTag[] = [];

  @Input()
  tertiaryTags: ITertiaryTag[] = [];

  closeResult = '';
  option1 = false;
  option2 = false;
  option3 = false;
  textValue = '';
  area = false;
  disableDislike = false;
  addedToFav = false;
  disliked = false;
  dislikeEnabled = environment.dislikeEnabled;
  duringdislike = false;
  dislikecanceled = false;

  constructor(
    private _modalService: NgbModal,
    private _recommendationsService: RecommendationsService,
    private _router: Router,
    private _userProfileService: UserProfileService
  ) {
    super();
  }
  ngOnInit(): void {
    if (this.favs) {
      this.addedToFav = false;
      if (this.favs.favorites[this.getValidType(this.type)].length !== 0) {
        for (const elem of this.favs.favorites[this.getValidType(this.type)]) {
          if (elem.title == this.title && elem.url == this.url) {
            this.addedToFav = true;
          }
        }
      }
    }
    if (this.dis) {
      this.disliked = false;
      if (this.dis.dislikes[this.getValidType(this.type)].length !== 0) {
        for (const elem of this.dis.dislikes[this.getValidType(this.type)]) {
          if (elem.title == this.title && elem.url == this.url) {
            this.disliked = true;
          }
        }
      }
    }
  }

  open(content: unknown) {
    this._modalService
      .open(content, { centered: true, size: 'md' })
      .result.then(
        (result) => {
          this.closeResult = `Send with: ${result}`;
          this.duringdislike = true;
          this.dislikecanceled = false;
          this.open2();
        },
        (reason) => {
          this.closeResult = `Dismissed: ${reason}`;
        }
      );
  }

  open2() {
    setTimeout(() => {
      if (!this.dislikecanceled) {
        this._userProfileService.user$
          .pipe(
            untilDestroyed(this),
            // delay is required to have rerender out of angular's detection cycle
            delay(0)
          )
          .subscribe((profile) => {
            this.disableDislike = true;
            this.disliked = true;
            // get data to send
            const payload = {
              reason: this.getReason(),
              suggestion: this.getSuggestion(),
              action: 'dislike',
              resource_id: this.id,
              resource_type: this.type,
              visit_id: this.visitid,
              aai_uid: profile.aai_id,
              title: this.title,
              url: this.url,
            };
            this.duringdislike = false;
            this.dislikecanceled = false;
            this._recommendationsService
              .evaluate$(payload, this.getValidType(this.type), this.jwttoken)
              .pipe(delay(0))
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              .subscribe(() => {});
          });
      }
    }, 5000);
  }

  getReason() {
    const reasons = [];
    if (this.option1) {
      reasons.push('Something is wrong');
    }
    if (this.option2) {
      reasons.push('This is not relevant');
    }
    if (this.option3) {
      reasons.push('This is spam');
    }
    return reasons;
  }

  getSuggestion() {
    let suggestion = '';
    if (this.textValue) {
      suggestion = this.textValue;
    }
    return suggestion;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkBox1(event: any) {
    if (event.target.checked == true) {
      this.option1 = true;
    } else {
      this.option1 = false;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkBox2(event: any) {
    if (event.target.checked == true) {
      this.option2 = true;
    } else {
      this.option2 = false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkBox3(event: any) {
    if (event.target.checked == true) {
      this.option3 = true;
    } else {
      this.option3 = false;
    }
  }

  textAreaEmpty() {
    if (this.textValue != '') {
      this.area = true;
    } else {
      this.area = false;
    }
  }

  getValidType(types: string) {
    if (types == 'publication') return 'publications';
    else if (types == 'software') return 'software';
    else if (types == 'dataset') return 'datasets';
    else if (types == 'training') return 'trainings';
    else if (types == 'service') return 'services';
    else if (types == 'data-source') return 'datasources';
    else if (types == 'other') return 'other';
    else if (types == 'news') return 'news';
    else return 'othermisc';
  }

  public addFav() {
    this.addedToFav = true;

    const payload = [
      {
        title: this.title,
        img: this.image,
        pubdate: this.pubdate,
        url: this.url,
        visitid: this.visitid,
        description: this.description,
        tags: this.tags,
        accesstags: this.accessTags,
        sectags: this.secondaryTags,
        terttags: this.tertiaryTags,
        id: this.id,
        type: this.type,
      },
    ];

    this._recommendationsService
      .favadd$(payload, this.getValidType(this.type), this.jwttoken)
      .pipe(delay(0))
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .subscribe(() => {});
  }

  public removeFav() {
    this.addedToFav = false;

    const payload = [
      {
        title: this.title,
        img: this.image,
        pubdate: this.pubdate,
        url: this.url,
        visitid: this.visitid,
        description: this.description,
        tags: this.tags,
        accesstags: this.accessTags,
        sectags: this.secondaryTags,
        terttags: this.tertiaryTags,
        id: this.id,
        type: this.type,
      },
    ];

    this._recommendationsService
      .favremove$(payload, this.getValidType(this.type), this.jwttoken)
      .pipe(delay(0))
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .subscribe(() => {
        if (this._router.url == '/dashboard/favourities') {
          this._recommendationsService.emitFavRemove();
        }
      });
  }
}
