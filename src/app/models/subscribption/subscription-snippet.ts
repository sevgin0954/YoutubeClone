import { SubscriptionSnippetResourceId } from './subscription-snippet-resourceId';
import { Thumbnail } from '../thumbnail/thumbnail';

export interface SubscriptionSnippet {
  snippet: {
    publishedAt: Date,
    channelTitle: string,
    title: string,
    description: string,
    resourceId: SubscriptionSnippetResourceId,
    channelId: string,
    thumbnails: Thumbnail[]
  }
}
