export interface TryEntry {

id: number;
AccId: number;
AccVwwId: number;
Created: Date;
IsSent: boolean;
DateSent: Date;

UseAnony: boolean;
UseMail: boolean;
UseAddress: boolean;
UsePhone: boolean;
UseAll: boolean;

Subject: string;
MessageContent: string;
CategoryL1: string;
CategoryL2: string;
CategoryL3: string;
StarRating: string;

IsToEmployee: boolean;
Sendee: number;

OrgId: number;
IsEmail: boolean;
Email: string;

Name: string;
ShortName: string;
AbbrevName: string;
IsPhone: boolean;
PhoneNo: number;
PhoneExtension: number;

IsAddress: boolean;
AddressL1: string;
AddressL2: string;
City: string;
State: string;
Postal: number;
PostalDigits: number;
EmailDomain: string;

}
