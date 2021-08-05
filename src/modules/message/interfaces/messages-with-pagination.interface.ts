import { IMessage } from './message.interface';

export interface IMessagesWithPagination {
  messages: IMessage[];
  current_page: number;
  total_pages: number;
  total_records: number;
}
