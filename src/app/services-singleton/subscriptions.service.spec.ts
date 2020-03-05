import { SubscriptionsService } from "./subscriptions.service";

let httpClient: any;
let service: any;

beforeEach(() => {
  httpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
});
beforeEach(() => {
  service = new SubscriptionsService(httpClient);
});

describe('SubscriptionsService', () => {

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('', () => {

});
