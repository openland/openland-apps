import * as React from 'react';
import { OpenlandClient } from 'openland-api/spacex';
import { Platform, AsyncStorage } from 'react-native';
import * as Contacts from 'react-native-contacts';
import { Priority } from 'openland-api/Priority';
import { parsePhoneNumberFromString, CountryCode, isSupportedCountry } from 'libphonenumber-js';
import * as Localize from "react-native-localize";
import { backoff } from 'openland-y-utils/timer';

/*
    TODO:
    - send pending contacts to server
    - implement for Android
    - improve phone normalization (with device country code if needed)
    - optimize processing
    - think about alternative data formats and storages
*/

const CONTACTS_STORAGE_VERSION = 1;
const BATCH_SIZE = 100;

interface LocalePhoneNumber extends Contacts.PhoneNumber {
    numberRaw: string;
}

interface LocaleContact {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phones: LocalePhoneNumber[];
    hash: string;
    sent: boolean;
}

class ContactsRegistrator {
    // @ts-ignore
    private client: OpenlandClient;
    private pending: LocaleContact[] = [];
    private defaultCountry: CountryCode = 'US';

    constructor(client: OpenlandClient) {
        this.client = client.withParameters({ defaultPriority: Priority.LOW });
        // this.init();
    }

    init = async () => {
        const deviceCountry = Localize.getCountry();

        this.defaultCountry = isSupportedCountry(deviceCountry) ? deviceCountry as CountryCode : 'US';

        if (Platform.OS === 'ios') {
            Contacts.checkPermission((errorCheck, permissionCheck) => {
                if (permissionCheck === 'undefined') {
                    Contacts.requestPermission((error, permission) => {
                        if (permission === 'authorized') {
                            this.findContacts();
                        }
                    });
                }

                if (permissionCheck === 'authorized') {
                    this.findContacts();
                }
            });
        }
    }

    private getHash = (c: Contacts.Contact) => {
        const { givenName, familyName, middleName, phoneNumbers } = c;
        const phoneHash = phoneNumbers.map(p => `${p.label}${p.number}`).join('-');

        return `${givenName}-${familyName}-${middleName}-${phoneHash}`;
    }

    private _sitem = (id: string) => `contact-${CONTACTS_STORAGE_VERSION}-${id}`;

    private convertContact = (c: Contacts.Contact) => {
        const { recordID, givenName, familyName, middleName, phoneNumbers } = c;
        const parsedPhones: LocalePhoneNumber[] = [];

        phoneNumbers.map(n => {
            const parsed = parsePhoneNumberFromString(n.number, this.defaultCountry);

            if (!!parsed) {
                parsedPhones.push({
                    label: n.label,
                    number: parsed.number.toString(),
                    numberRaw: n.number
                });
            }
        });

        const res: LocaleContact = {
            id: recordID,
            firstName: givenName,
            lastName: familyName,
            middleName: middleName,
            phones: parsedPhones,
            hash: this.getHash(c),
            sent: false
        };

        return res;
    }

    private findContacts = async () => {
        Contacts.getAllWithoutPhotos(async (error, contacts) => {
            for (const c of contacts) {
                const storageKey = this._sitem(c.recordID);
                const storageItem = await AsyncStorage.getItem(storageKey);
                let needToSync = false;

                if (storageItem) {
                    const parsedStorageItem = JSON.parse(storageItem) as LocaleContact;

                    if (parsedStorageItem.hash !== this.getHash(c) || !parsedStorageItem.sent) {
                        needToSync = true;
                    }
                } else {
                    needToSync = true;
                }

                if (needToSync) {
                    const converted = this.convertContact(c);

                    this.pending.push(converted);

                    await AsyncStorage.setItem(storageKey, JSON.stringify(converted));
                }
            }

            this.sendContacts();
        });
    }

    private sendContacts = async () => {
        while (this.pending.length > 0) {
            const batch = this.pending.splice(0, BATCH_SIZE);

            await backoff(async () => {
                // execute mutation
            });

            await AsyncStorage.multiSet(batch.map(p => ([
                this._sitem(p.id),
                JSON.stringify({ ...p, sent: true })
            ])));
        }
    }
}

var registrator: ContactsRegistrator | null = null;

export class ContactsManager extends React.PureComponent<{ client: OpenlandClient }> {
    componentDidMount() {
        if (registrator === null) {
            registrator = new ContactsRegistrator(this.props.client);
        }
    }

    render() {
        return null;
    }
}