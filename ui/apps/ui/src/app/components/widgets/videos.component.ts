/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { environment } from '@environment/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VideoDetail } from '../../widgets/videos/videos-widget.types';
const YOUTUBE_API_KEY = 'AIzaSyAlLHVx3PSPvVnCUd7DL2wNsj_9UzLPTAk';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

@UntilDestroy()
@Component({
  selector: 'ui-widget-videos',
  template: `
    <div>
      <div class="widget rounded paddings">
        <div class="row">
          <div class="col-6 widget-header">Videos</div>
          <div class="col-6" align="end">
            <span (click)="showMore()" class="widget-editable"
              >Show more
              <img id="show-more" src="assets/arrow_right_small.svg" />
            </span>
          </div>
        </div>

        <div *ngFor="let item of slicedData">
          <div class="row pt-4">
            <div class="col-12">
              <img
                (click)="moveToVideo(item.id)"
                width="100%"
                height="100%"
                src="{{ item.thumbnailUrl }}"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="row pt-3 pb-3">
                <span class="widget-header-theme">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="row" align="end">
              <span>
                <button
                  [disabled]="!hasPrev"
                  type="button"
                  class="btn px-0 py-0"
                  (click)="getPreviousData()"
                >
                  <img width="24px" height="24px" src="assets/left_icon.svg" />
                </button>
                <button
                  [disabled]="!hasNext"
                  type="button"
                  class="btn px-0 py-0"
                  (click)="getNextData()"
                >
                  <img width="24px" height="24px" src="assets/right_icon.svg" />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .widget-header-place {
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 26px;
        color: #1a2128;
      }
      .widget-header-theme {
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 26px;
        color: #1a2128;
      }
      .interested {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 6px 16px;
        gap: 8px;
        background: rgba(25, 117, 255, 0.08);
        border-radius: 10px;
      }
      .interested-text {
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        color: #144b9e;
      }
      .going-text {
        font-family: 'Switzer';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #919ba2;
      }
      #show-more {
        padding-right: 6px;
      }
    `,
  ],
})
export class WidgetVideosComponent implements OnInit {
  backendUrl = `${environment.backendApiPath}`;
  videos: VideoDetail[];
  slicedData: VideoDetail[];
  idx = 0;
  slideCount = 1;

  constructor(private http: HttpClient) {
    this.videos = [];
    this.slicedData = [];
  }

  ngOnInit() {
    this.search().subscribe((data) => {
      // Show data and navigate around it
      this.videos = data;
      this.slicedData = this.videos.slice(0, 1);
    });
  }
  search(): Observable<VideoDetail[]> {
    const params: string = [
      `key=${YOUTUBE_API_KEY}`,
      `channelId=UCHsaUFy5LJ3rJ28qDg2StGA`,
      `part=snippet,id`,
      `order=date`,
      `maxResults=10`,
    ].join('&');

    const queryUrl = `${YOUTUBE_API_URL}?${params}`;

    return this.http.get<any>(queryUrl).pipe(
      /* TEST MOCK
      catchError(() =>
        of([
          {
            title:
              'EBRAINS Research Infrastructure: supporting the future of brain science',
            id: 'aPD1Tqtc6lk',
            description: 'desc',
            thumbnailUrl: 'https://i.ytimg.com/vi/aPD1Tqtc6lk/hqdefault.jpg',
          },
          {
            title:
              '1EBRAINS Research Infrastructure: supporting the future of brain science',
            id: 'aPD1Tqtc6lk',
            description: 'desc',
            thumbnailUrl: 'https://i.ytimg.com/vi/ds60-4oPR10/hqdefault.jpg',
          },
          {
            title:
              '2EBRAINS Research Infrastructure: supporting the future of brain science',
            id: 'aPD1Tqtc6lk',
            description: 'desc',
            thumbnailUrl: 'https://i.ytimg.com/vi/HwRkps_gDl0/hqdefault.jpg',
          },
        ])
      ),
      tap((event: any) => console.log(event))*/
      map((response) => {
        return response['items'].map(
          (item: {
            id: { videoId: any };
            snippet: {
              title: any;
              description: any;
              thumbnails: { high: { url: any } };
            };
          }) => {
            return new VideoDetail({
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnailUrl: item.snippet.thumbnails.high.url,
            });
          }
        );
      })
    );
  }

  public showMore() {
    window.open('https://www.youtube.com/@EOSCPortal/', '_blank');
  }
  get hasNext() {
    return this.idx < this.videos.length - 1;
  }
  get hasPrev() {
    return this.idx > 0;
  }

  public getNextData() {
    if (this.idx < this.videos.length - 1) {
      this.idx++;
      this.slicedData = this.videos.slice(
        this.idx * this.slideCount,
        this.idx * this.slideCount + this.slideCount
      );
    }
  }

  public getPreviousData() {
    if (this.idx !== 0) {
      this.idx--;
      this.slicedData = this.videos.slice(
        this.idx * this.slideCount,
        this.idx * this.slideCount + this.slideCount
      );
    }
  }

  public moveToVideo(path: string) {
    window.open('https://www.youtube.com/watch?v=' + path, '_blank');
  }
}
