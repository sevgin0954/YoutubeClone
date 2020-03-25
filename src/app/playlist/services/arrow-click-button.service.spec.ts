import { ArrowClickButtonService } from "./arrow-click-button.service";

describe('', () => {
  let playlistElementService: any;
  let service: ArrowClickButtonService;

  beforeEach(() => {
    playlistElementService = jasmine
      .createSpyObj('ElementDisplayService', [
        'showLastHiddenElementFromLeft',
        'showFirstHiddenElementFromRight',
        'hideFirstShownElement'
      ]);
  });
  beforeEach(() => {
    service = new ArrowClickButtonService(playlistElementService);
  });

  describe('ArrowClickButtonService', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
