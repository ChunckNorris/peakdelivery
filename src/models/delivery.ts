export class Delivery {
    driverName: string;
    deliveryId: string;
    driverId: string;
    clientId: string;
    run: string;
    bagToteId: string;
    slipToteId: string;
    activity: string;
    billing: string;
    timeDelivered: string;
    dateDelivered: string;
    text: string;
    multiLineText: string;
    scannedImage: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    contactPhone: string;
    isAltAddress: boolean;
    altAddress1: string;
    altAddress2: string;
    altCity: string;
    altState: string;
    altZip: string;
    signature: string;
    accountId: string;
    accountName: string;
    
}
export class DeliveryItem {
    deliveryId: number;
    accountId: string;
    driverId: string;
    driverName: string;
    runId: number;
    runName?: any;
    activityId: number;
    activityName?: any;
    billingId: number;
    billingName?: any;
    bagToteId: string;
    slipToteId: string;
    onCall?: any;
    mileage?: any;
    custom?: any;
    patientInfo?: any;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    altAddress1: string;
    altAddress2: string;
    altCity: string;
    altState: string;
    altZip: string;
    isAltAddress: boolean;
    notes: string;
    text: string;
    signature: string;
    contactPhone: string;
    scannedImage?: any;
}

export class DeliveryActivities {
    key: string;
    value: string;
}
export class DeliveryBillings{
    key: string;
    value: string;
}
export class DeliveryRunTypes {
    key: string;
    value: string;
}

export class DeliverySearchBindingModel
{
    deliveryId: number;
      accountId: string;
      driverId: string;
      startDate: string;
      endDate: string;
      activityId: number;
      searchTypeString: string;
     deliverySearchType: string; 
}

