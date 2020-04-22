import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { VideoCategory } from 'src/app/models/video-category/video-category';
import isRequired from 'src/app/decorators/isRequired';
import getCategoryIcon from '../categoryIcon';
import { VideoCategoryType } from 'src/app/shared/enums/video-category-type';
import { RegionCode } from 'src/app/shared/enums/region-code';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnChanges {

  @isRequired
  @Input()
  category: VideoCategory;

  @isRequired
  @Input()
  regionCode: RegionCode;

  private _icon: string;

  constructor(
    public sanitizer: DomSanitizer
  ) { }

  get icon(): SafeHtml {
    const sanitazedHtml = this.sanitizer.bypassSecurityTrustHtml(this._icon);

    return sanitazedHtml;
  }

  ngOnChanges(): void {
    const categoryType = VideoCategoryType[this.category.snippet.title];
    const categoryValue = getCategoryIcon(categoryType);

    this._icon = categoryValue;
  }
}
