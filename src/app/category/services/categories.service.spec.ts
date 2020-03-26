import { CategoriesService } from './categories.service';

describe('', () => {

  let http: any;
  let service: CategoriesService;

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['get']);
  });
  beforeEach(() => {
    service = new CategoriesService(http);
  });

  describe('CategoriesService', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
