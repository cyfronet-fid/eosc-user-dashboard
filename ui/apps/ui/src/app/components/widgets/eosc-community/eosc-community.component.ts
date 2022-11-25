import { AfterViewInit, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ui-eosc-community-widget',
  template: `
    <div class="gx-0 community-background">
      <div class="row ps-4 content-header">
        <span class="eosc-nav-text"
          >EOSC Communities
          <img
            width="18px"
            height="16px"
            class="left-arrow"
            id="leftarrow"
            (click)="handleNavigation($event)"
            aria-label="Previous"
            data-direction="start"
            src="assets/left-community.svg" /><img
            width="18px"
            height="16px"
            id="rightarrow"
            (click)="handleNavigation($event)"
            aria-label="Next"
            data-direction="end"
            class="right-arrow"
            src="assets/right-community.svg"
        /></span>
      </div>
      <div class="carousel" #carousel>
        <div
          class="carousel-scroll-container"
          role="region"
          aria-label="carousel"
          tabindex="0"
        >
          <ol class="carousel-media pt-4 pb-4" role="list">
            <li class="carousel-it ps-4 pe-4">
              <ui-eosc-community-life-widget
                class="left-first"
              ></ui-eosc-community-life-widget>
            </li>
            <li class="carousel-it ps-4 pe-4">
              <ui-eosc-community-escape-widget
                class="first-community"
              ></ui-eosc-community-escape-widget>
            </li>
            <li class="carousel-it ps-4 pe-4">
              <ui-eosc-community-envri-widget
                class="second-community"
              ></ui-eosc-community-envri-widget>
            </li>
            <li class="carousel-it ps-4 pe-4">
              <ui-eosc-community-sshoc-widget
                class="third-community"
              ></ui-eosc-community-sshoc-widget>
            </li>
            <li class="carousel-it ps-4 pe-4">
              <ui-eosc-community-panosc-widget
                class="fourth-community"
              ></ui-eosc-community-panosc-widget>
            </li>
          </ol>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      * {
        box-sizing: border-box;
      }
      .carousel [role='list'] {
        /* These are more appropriate in a CSS reset */
        padding: 0;
        list-style: none;
      }
      .carousel-media {
        /* Arrange media horizontally */
        display: flex;
      }
      .carousel-scroll-container {
        /* Enable horizontal scrolling */
        overflow-x: hidden;
        /* Enable horizontal scroll snap */
        scroll-snap-type: x proximity;
        /* Smoothly snap from one focal point to another */
        scroll-behavior: smooth;
      }

      .carousel-it:first-of-type {
        /* Allow users to fully scroll to the start */
        scroll-snap-align: start;
      }
      .carousel-it:last-of-type {
        /* Allow users to fully scroll to the end */
        scroll-snap-align: end;
      }

      .communities {
        position: relative;
        padding-top: 18px;
        overflow-x: hidden;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
      }
      .community-background {
        background: #edf3fa;
        height: 302px;
        width: 100%;
      }
      .content-header {
        padding-top: 32px;
      }
      .eosc-nav-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: #3d4db6;
      }
      .right-arrow {
        padding-left: 10px;
        padding-bottom: 4px;
      }
      .right-arrow:hover {
        width: 20px;
        height: 18px;
        cursor: pointer;
      }
      .left-arrow:hover {
        width: 20px;
        height: 18px;
        cursor: pointer;
      }
      .left-arrow {
        padding-left: 10px;
        padding-bottom: 4px;
      }
    `,
  ],
})
export class EoscCommunityWidgetComponent implements AfterViewInit {
  navControlPrevious: Element | null;
  navControlNext: Element | null;
  root: Element | null;
  scrollContainer: Element | null;
  mediaList: Element | null;

  constructor() {
    this.mediaList = null;
    this.scrollContainer = null;
    this.root = null;
    this.navControlNext = null;
    this.navControlPrevious = null;
  }
  ngAfterViewInit(): void {
    this.navControlNext = document.querySelector('[id="rightarrow"]');
    this.navControlPrevious = document.querySelector('[id="leftarrow"]');
    this.navigateToNextItem = this.navigateToNextItem.bind(this);
    this.root = document.querySelector('[class="carousel"]');
    this.scrollContainer = this.root
      ? this.root.querySelector('[role="region"][tabindex="0"]')
      : null;

    this.mediaList = this.scrollContainer
      ? this.scrollContainer.querySelector('[role="list"]')
      : null;

    // Set up event listeners and init UI
    if (this.scrollContainer) {
      this.scrollContainer.addEventListener(
        'scroll',
        this._handleCarouselScroll
      );
      this._handleCarouselScroll();
    }
  }

  /**
   * Returns `true` if the given element is in a horizontal RTL writing mode.
   * @param {HTMLElement} element
   */
  isRtl = (element: Element) =>
    window.getComputedStyle(element).direction === 'rtl';

  /**
   * Returns the distance from the starting edge of the viewport to the given focal point on the element.
   * @param {HTMLElement} element
   * @param {'start'|'center'|'end'} [focalPoint]
   */
  getDistanceToFocalPoint = (element: Element, focalPoint = 'center') => {
    const isHorizontalRtl = this.isRtl(element);
    const documentWidth = document.documentElement.clientWidth;
    const rect = element.getBoundingClientRect();
    switch (focalPoint) {
      case 'start':
        return isHorizontalRtl ? documentWidth - rect.right : rect.left;
      case 'end':
        return isHorizontalRtl ? documentWidth - rect.left : rect.right;
      case 'center':
      default: {
        const centerFromLeft = rect.left + rect.width / 2;
        return isHorizontalRtl
          ? documentWidth - centerFromLeft
          : centerFromLeft;
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNavigation = (e: { target: any }) => {
    this._handleCarouselScroll();
    const button = e.target;
    const direction = button.dataset.direction;
    const isDisabled = button.getAttribute('aria-disabled') === 'true';
    if (isDisabled) return;
    this.navigateToNextItem(direction);
  };

  _handleCarouselScroll() {
    if (this.scrollContainer) {
      // scrollLeft is negative in a right-to-left writing mode
      const scrollLeft = Math.abs(this.scrollContainer.scrollLeft);
      // off-by-one correction for Chrome, where clientWidth is sometimes rounded down
      const width = this.scrollContainer.clientWidth + 1;
      const isAtStart = Math.floor(scrollLeft) === 0;
      const isAtEnd =
        Math.ceil(width + scrollLeft) >= this.scrollContainer.scrollWidth;
      this.navControlPrevious?.setAttribute(
        'aria-disabled',
        isAtStart.toString()
      );
      this.navControlNext?.setAttribute('aria-disabled', isAtEnd.toString());
    }
  }

  /**
   * @param {'start'|'end'} direction
   */
  navigateToNextItem(direction: string) {
    if (this.mediaList && this.scrollContainer && this.root) {
      let mediaItems = Array.from(
        this.mediaList.querySelectorAll(':scope > *')
      );
      mediaItems = direction === 'start' ? mediaItems.reverse() : mediaItems;

      // Basic idea: Find the first item whose focal point is past
      // the scroll container's center in the direction of travel.
      const scrollContainerCenter = this.getDistanceToFocalPoint(
        this.scrollContainer,
        'center'
      );
      let targetFocalPoint;
      for (const mediaItem of mediaItems) {
        let focalPoint = window.getComputedStyle(mediaItem).scrollSnapAlign;
        if (focalPoint === 'none') {
          focalPoint = 'center';
        }
        const distanceToItem = this.getDistanceToFocalPoint(
          mediaItem,
          focalPoint
        );
        if (
          (direction === 'start' &&
            distanceToItem + 1 < scrollContainerCenter) ||
          (direction === 'end' && distanceToItem - scrollContainerCenter > 1)
        ) {
          targetFocalPoint = distanceToItem;
          break;
        }
      }

      // This should never happen, but it doesn't hurt to check
      if (typeof targetFocalPoint === 'undefined') return;
      // RTL flips the direction
      const sign = this.isRtl(this.root) ? -1 : 1;
      const scrollAmount = sign * (targetFocalPoint - scrollContainerCenter);
      this.scrollContainer.scrollBy({ left: scrollAmount });
    }
  }
}
