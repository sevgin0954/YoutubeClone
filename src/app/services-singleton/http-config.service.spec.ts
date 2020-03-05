import { HttpConfigService } from './http-config.service';

let httpClient: any;
let service: any;

beforeEach(() => {
  httpClient = jasmine.createSpyObj('HttpClient', ['post', 'delete']);
});
beforeEach(() => {
  service = new HttpConfigService(httpClient);
});

describe('HttpConfigService', () => {

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
