import { CurrencyValue } from './money.model'

export interface TaskToList {
  platforms: string;
  keywords?: string;
  budgetGreaterEqual?: number;
  budgetLowerEqual?: number;
  olderThanId?: string;
  newerThanId?: string;
  skip: number;
  limit: number;
}
export interface TasksResponsive {
  tasks: TaskPublicInfo[] | [];
  count: number;
}
export interface TaskPublicInfo {
  id: string;
  addedTime: string;
  title: string;
  description: string;
  budget: CurrencyValue;
  proposalCount: number;
  platforms: Array<string>;
  proposalAlreadySent: boolean;
  addedByMe: boolean;
  hasContractCreated: boolean;
  hasContractAccepted: boolean;
}
