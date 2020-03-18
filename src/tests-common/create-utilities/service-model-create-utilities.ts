import { ServiceModel } from 'src/app/models/service-models/service-model';
import { ServicePageInfo } from 'src/app/models/service-models/service-page-info';

export class ServiceModelCreateUtilities {
  public static create<T>(
    models: T[] = [],
    nextPageToken?: string,
    pageInfo?: ServicePageInfo
  ): ServiceModel<T[]> {
    const serviceModel: ServiceModel<T[]> = {
      items: models,
      nextPageToken: nextPageToken,
      pageInfo: pageInfo
    };

    return serviceModel;
  }
}
