export class PaymentRequest {
    appToken: string;
    appSecret: string;
    acceptCard: boolean;
    amount: number;
    sessionTimeoutSecs: number;
    developerTrackingId: string;
      userId:number;
          constructor(
      appToken: string,
      appSecret: string,
      acceptCard: boolean,
      amount: number,
      sessionTimeoutSecs: number,
      developerTrackingId: string,
      userId:number,
    ) {
      this.appToken = appToken;
      this.appSecret = appSecret;
      this.acceptCard = acceptCard;
      this.amount = amount;
      this.sessionTimeoutSecs = sessionTimeoutSecs;
      this.developerTrackingId = developerTrackingId;
      this.userId = userId;
    } 
  }
  