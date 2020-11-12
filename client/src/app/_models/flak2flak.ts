// created 07-23-20

export interface Flak {
  id: number;
  userName: string;
  created: Date;
  lastUsed: Date;

  tagId: number;
  tagName: string;
  mesId: number;
  subject: string;

  isClosed: boolean;
  isTerminated: boolean;
  newResponse: boolean;

  flaId: number;
  messageContent: string;

  orgId: number;
  orgName: string;

}
