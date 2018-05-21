export class FinancialModel {
    name: string;
    jobId: number;
    estimateType: string;
    fixedBidItems: BidItems[];
}

export class BidItems {
    costType: number;
    lineItem: number;
    estimateAmt: any;
    budget: any;
    margin: any;
}
