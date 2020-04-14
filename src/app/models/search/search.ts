import { SearchSnippet } from './search-snippet';
import { SnippetId } from './snippet-id';

export interface Search {
  id: SnippetId,
  snippet: SearchSnippet
}
