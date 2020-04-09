import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { VideoCategory } from 'src/app/models/video-category/video-category';
import isRequired from 'src/app/decorators/isRequired';
import isType from 'src/app/decorators/isType';
import getCategoryIcon from '../categoryIcon';
import { VideoCategoryType } from 'src/app/shared/enums/video-category-type';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnChanges {

  @isRequired
  @isType('object')
  @Input() category: VideoCategory;
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
