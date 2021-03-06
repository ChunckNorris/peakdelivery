export class Account {
    accountId: string;
    accountName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    isAltAddress: boolean;
    altAddress1: string;
    altAddress2: string;
    altCity: string;
    altState: string;
    altZip: string;
    accountContact: string;
    contactNumber: string;
    contactEmail: string;


}
export class AccountRunOptions {
    id: number;
    text: string;

}
export class AccountBillingOptions {
    id: number;
    text: string;

}

export class AccountRunModel {
    runName: string;
    description: string;
    accountId: string;
    isActive: boolean;

}