import { TestBed } from '@angular/core/testing';

import { CommentThreadsService } from './comment-threads.service';

describe('CommentThreadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentThreadsService = TestBed.get(CommentThreadsService);
    expect(service).toBeTruthy();
  });
});
