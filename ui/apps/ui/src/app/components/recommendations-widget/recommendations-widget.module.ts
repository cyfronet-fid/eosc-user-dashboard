import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationsWidgetComponent } from '@components/recommendations-widget/recommendations-widget.component';
import { RecommendationComponent } from './recommendation.component';
import { UrlTitleModule } from '@components/recommendations-widget/layouts/url-title/url-title.module';
import { TagsModule } from '@components/recommendations-widget/layouts/tags/tags.module';
import { SecondaryTagsModule } from '@components/recommendations-widget/layouts/secondary-tags/secondary-tags.module';
import { TertiaryTagsModule } from '@components/recommendations-widget/layouts/tertiary-tags/tertiary-tags.module';
import { DescriptionModule } from '@components/recommendations-widget/layouts/description/description.module';
import { NavbarModule } from '@components/recommendations-widget/layouts/navbar/navbar.module';

@NgModule({
  declarations: [RecommendationsWidgetComponent, RecommendationComponent],
  imports: [
    CommonModule,
    UrlTitleModule,
    TagsModule,
    SecondaryTagsModule,
    TertiaryTagsModule,
    DescriptionModule,
    NavbarModule,
  ],
  exports: [RecommendationsWidgetComponent, RecommendationComponent],
})
export class RecommendationsWidgetModule {}
