export interface Signature {
  id: string;
  ownerID: string;
  ownerName: string;
  currentPlanID: string;
  currentPlanExpirationDate: Date;
  currentPlanPaymentDate: Date;
  currentPlanPaymentMethod: string;
  currentPlanPaymentStatus: string;
  currentPlanPaymentAmount: number;
  currentPlanPaymentCurrency: string;
  currentPlanPaymentReceiptURL: string;
  currentPlanPaymentReceiptNumber: string;
  currentPlanPaymentReceiptPDF: string;
  situation: string;
  createdAt: Date;
  updatedAt: Date;
}
