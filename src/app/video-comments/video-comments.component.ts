import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services-singleton/window.service';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.scss']
})
export class VideoCommentsComponent implements OnInit {

  constructor(private windowService: WindowService) { }

  ngOnInit() {
    this.windowService.onReachBottom(this.loadComments);
  }

  loadComments(): void {

  }
}
