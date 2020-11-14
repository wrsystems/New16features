
export interface Entry {
  id: number;
  created: string | null;
  sentToFlak: boolean;
  dateSentToFlak: string;
  orgId: number;
  orgName: string;
  subject: string;
  content: string;
  starRating: string;
  userId: number;
  userName: string;
  userDeleted: boolean;
  useAnony: boolean;
  useEmail: boolean;
  useAddress: boolean;
  useAll: boolean;
}
