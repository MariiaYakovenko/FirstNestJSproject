import { IMessage } from './message.interface';

export interface IResponse {
  messages: IMessage[];
  current_page: number;
  total_pages: number;
  total_records: number;
}
