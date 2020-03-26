import { Component, Input, OnChanges } from '@angular/core';
import { VideoCategory } from 'src/app/models/video-category/video-category';
import isRequired from 'src/decorators/isRequired';
import isType from 'src/decorators/isType';
import categoriesIcons from '../categoryIcon';
import { VideoCategoryType } from 'src/app/shared/enums/video-category-type';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
    const categoryValue = categoriesIcons.get(categoryType);

    this._icon = categoryValue;
  }
}
