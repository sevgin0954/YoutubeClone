import { ServicePageInfo } from './service-page-info';

export interface ServiceModel<T> {
  nextPageToken: string,
  items: T,
  pageInfo: ServicePageInfo
}
