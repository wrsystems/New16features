// 11/14 added lots ?
export interface Entry {
  id: number;
  created?: string;
  sentToFlak?: boolean;
  dateSentToFlak?: string;
  orgId?: number;
  orgName?: string;
  subject: string;
  content: string;
  starRating?: string;
  userId?: number;
  userName?: string;
  userDeleted?: boolean;
  useAnony?: boolean;
  useEmail?: boolean;
  useAddress?: boolean;
  useAll?: boolean;
}
