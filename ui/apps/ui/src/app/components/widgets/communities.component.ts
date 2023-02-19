import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CommunitiesWidget } from '../../widgets/communities/communities-widget.types';

@UntilDestroy()
@Component({
  selector: 'ui-widget-communities',
  template: `
    <div>
      <div class="widget rounded paddings">
        <div class="row">
          <div class="col-10 widget-header">Join EOSC Communities</div>
        </div>

        <div *ngFor="let item of slicedData">
          <div class="row pt-4">
            <div class="col-4">
              <img
                style="cursor:pointer;"
                (click)="moveToEvent(item.Path)"
                width="100%"
                height="100%"
                src="{{ item.Image }}"
              />
            </div>
            <div class="col-8">
              <div class="row pt-3">
                <span
                  class="widget-header-theme"
                  [innerHTML]="item.Title"
                ></span>
              </div>
            </div>
          </div>
          <div class="row pt-2">
            <div class="col-12">
              <div class="row pt-3">
                <span
                  class="widget-header-place"
                  [innerHTML]="item.Body"
                ></span>
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
                  class="btn px-0 py-0"
                  (click)="getPreviousData()"
                >
                  <img width="24px" height="24px" src="assets/left_icon.svg" />
                </button>
                <button
                  [disabled]="!hasNext"
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
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 26px;
        color: #1a2128;
      }
      .widget-header-theme {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
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
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        color: #144b9e;
      }
      .going-text {
        font-family: 'Inter';
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
export class WidgetCommunitiesComponent implements OnInit {
  upcomingEvents: CommunitiesWidget[];
  idx = 0;
  slideCount = 1;
  slicedData: CommunitiesWidget[];

  constructor() {
    this.upcomingEvents = [
      {
        Title: 'ENVRI Fair – the way to understanding of the Earth System',
        Body: 'ENVRI is a community of environmental research infrastructures\
        working together to observe the Earth as one system. Community\
        collaborates to provide environmental data, tools, and other\
        services that are Open and FAIR, and can be easily used by anyone\
        for free.',
        Path: 'https://envri.eu/',
        Image: 'assets/envri.svg',
      },
      {
        Title:
          'ESCAPE – the consistent European research infrastructure ecosystem',
        Body: 'The cluster provides common innovative solutions for the\
        management, curation, and deposition of data, for the data driven\
        science economy, that span over a series of large domains in\
        fundamental research: astronomy, astrophysics, astroparticle\
        physics, high energy physics, particle and nuclear physics.',
        Path: 'https://projectescape.eu/',
        Image: 'assets/logo-Escape_2.svg',
      },
      {
        Title: 'EOSC-Life open digital space for life sciences',
        Body: 'The data, digital services and advanced facilities vital for life\
        science research must be findable, accessible, interoperable,\
        reusable (FAIR) across scientific disciplines and national\
        boundaries. Together they cover all aspects of life science\
        research and all life science domains.',
        Path: 'https://www.eosc-life.eu/',
        Image: 'assets/eosc-life.svg',
      },
      {
        Title:
          'PaNOSC - adopting FAIR data practices at photon and neutron sources',
        Body: 'The mission of the community is to contribute to the realization\
        of a data commons for Neutron and Photon science, providing\
        services and tools for data storage, analysis and simulation, for\
        the many scientists from existing and future disciplines using\
        data from photon and neutron sources.',
        Path: 'https://www.panosc.eu/',
        Image: 'assets/panosc.svg',
      },
      {
        Title: 'SSHOC – towards the complete SSH ecosystem',
        Body: 'Social Sciences & Humanities Open Cloud is a project that unites\
        20 partner organizations and their 27 associates in developing the\
        social sciences and humanities area of the European Open Science\
        Cloud.',
        Path: 'https://www.sshopencloud.eu/',
        Image: 'assets/sshoc-stakeholders.svg',
      },
    ];
    this.slicedData = [];
  }

  ngOnInit() {
    this.slicedData = this.upcomingEvents.slice(0, 1);
  }

  public showMore() {
    window.open('https://eosc-portal.eu/media/events', '_blank');
  }
  public moveToEvent(path: string) {
    window.open(path, '_blank');
  }

  public interested() {
    console.log('interested');
  }
  get hasNext() {
    return this.idx < this.upcomingEvents.length - 1;
  }
  get hasPrev() {
    return this.idx > 0;
  }
  public getNextData() {
    if (this.idx < this.upcomingEvents.length - 1) {
      this.idx++;
      this.slicedData = this.upcomingEvents.slice(
        this.idx * this.slideCount,
        this.idx * this.slideCount + this.slideCount
      );
    }
  }
  public getPreviousData() {
    if (this.idx !== 0) {
      this.idx--;
      this.slicedData = this.upcomingEvents.slice(
        this.idx * this.slideCount,
        this.idx * this.slideCount + this.slideCount
      );
    }
  }
}
