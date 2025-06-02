export type RefreshToken = {
  creationDate: Date;
  expiryDate: Date;
  family: number;
  invalidated: boolean;
  tokenId: string;
  used: boolean;
  userId: number;
};
