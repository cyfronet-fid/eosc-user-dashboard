/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { environment } from '@environment/environment';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VideoDetail } from '../../widgets/videos/videos-widget.types';
const YOUTUBE_API_KEY = 'we need key here';
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
        <div class="row pt-4">
          <div class="col-12">
            <img width="100%" height="100%" src="assets/video1.png" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="row pt-3 pb-3">
              <span class="widget-header-theme"
                >EOSC Marketplace Ask Me Anything Session</span
              >
            </div>
            <div class="row" align="end">
              <span>
                <button
                  [disabled]="!hasNext()"
                  type="button"
                  class="btn px-0 py-0"
                  (click)="setNext()"
                >
                  <img width="24px" height="24px" src="assets/left_icon.svg" />
                </button>
                <button
                  [disabled]="!hasPrev()"
                  type="button"
                  class="btn px-0 py-0"
                  (click)="setPrev()"
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.search().subscribe((data) => {
      // Show data and navigate around it
      console.log(data);
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
  public hasNext() {
    return true;
  }
  public hasPrev() {
    return true;
  }
  public setNext() {
    console.log('next');
  }
  public setPrev() {
    console.log('prev');
  }
}
