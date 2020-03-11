import { ChannelResolverService } from './channel-resolver.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { ChannelResourceProperties } from 'src/app/shared/enums/resource-properties/channel-resource-properties';
import { of, Observable } from 'rxjs';
import { Channel } from 'src/app/models/channel/channel';

let channelService: any;
let service: ChannelResolverService;

beforeEach(() => {
  channelService = jasmine.createSpyObj('ChannelService', ['getByIds']);
});
beforeEach(() => {
  service = new ChannelResolverService(channelService);
});

describe('ChannelResolverService', () => {

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('ChannelResolverService\s resolve method', () => {

  let returnedChannel1: Channel = {
    id: '123',
    brandingSettings: null,
    snippet: null,
    statistics: null
  };
  let channelServiceReturnData = of({
    items: [returnedChannel1]
  });
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    route = new ActivatedRouteSnapshot();
  });
  beforeEach(() => {
    channelService.getByIds.and.returnValue(channelServiceReturnData);
  });

  it('with route with empty id should throw an exception', () => {
    // Arrange
    const routeId = '';
    setupRouteIdParam(routeId);
    const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_STRING);

    // Act

    // Assert
    expect(() => service.resolve(route, null)).toThrowError(exceptionRegex);
  });

  it('with route with id should call channelService with id', () => {
    // Arrange
    const expectedChannelIdArgument = '123';
    setupRouteIdParam(expectedChannelIdArgument);

    // Act
    service.resolve(route, null);

    // Assert
    const callArguments = channelService.getByIds.calls.mostRecent();
    const callChannelIdArgument = callArguments.args[0];
    expect(callChannelIdArgument).toEqual([expectedChannelIdArgument]);
  });

  it('should call channelService with pageArguments with maxResults equal to one', () => {
    // Arrange

    // Act
    callMethodWithDefaultArguments();

    // Assert
    const callArguments = channelService.getByIds.calls.mostRecent();
    const callMaxResultsArgument = callArguments.args[1];
    expect(callMaxResultsArgument.maxResults).toEqual(1);
  });

  it('should call channelService with the correct resources', () => {
    // Arrange
    const expectedResources = [
      ChannelResourceProperties.brandingSettings,
      ChannelResourceProperties.snippet,
      ChannelResourceProperties.statistics,
    ];

    // Act
    callMethodWithDefaultArguments();

    // Assert
    const callArguments = channelService.getByIds.calls.mostRecent();
    const callResourcesArgument = callArguments.args[2];
    expect(callResourcesArgument).toEqual(expectedResources);
  });

  it('should return the first item', done => {
    // Arrange

    // Act
    const data$ = callMethodWithDefaultArguments();

    // Assert
    data$.subscribe(actualData => {
      expect(actualData).toEqual(returnedChannel1);
      done();
    });
  });

  function callMethodWithDefaultArguments(): Observable<Channel> {
    const routeId = '123';
    setupRouteIdParam(routeId);

    const data$ = service.resolve(route, null);

    return data$;
  }

  function setupRouteIdParam(id: string): void {
    route.params = {
      'id': id
    };
  }
});
