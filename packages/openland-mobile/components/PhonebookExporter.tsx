import { OpenlandClient } from 'openland-api/spacex';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { Platform, PermissionsAndroid } from 'react-native';
import * as Contacts from 'react-native-contacts';
import { Priority } from 'openland-api/Priority';
import { parsePhoneNumberFromString, CountryCode, isSupportedCountry } from 'libphonenumber-js';
import * as Localize from "react-native-localize";
import { backoff } from 'openland-y-utils/timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
    TODO:
    - improve phone normalization (with device country code if needed)
    - optimize processing
    - think about alternative data formats and storages
*/

const CONTACTS_STORAGE_VERSION = 3;
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

class PhonebookExporterImpl {
    private client: OpenlandClient;
    private pending: LocaleContact[] = [];
    private defaultCountry: CountryCode = 'US';
    private isSending = false;

    constructor(client: OpenlandClient) {
        this.client = client.withParameters({ defaultPriority: Priority.LOW });
    }

    init = async (cb?: () => void) => {
        const deviceCountry = Localize.getCountry();

        this.defaultCountry = isSupportedCountry(deviceCountry) ? deviceCountry as CountryCode : 'US';

        if (Platform.OS === 'ios') {
            Contacts.checkPermission((errorCheck, permissionCheck) => {
                if (permissionCheck === 'undefined') {
                    Contacts.requestPermission((error, permission) => {
                        if (permission === 'authorized') {
                            this.findContacts();
                            if (cb) {
                                cb();
                            }
                        }
                    });
                }

                if (permissionCheck === 'authorized') {
                    this.findContacts();
                    if (cb) {
                        cb();
                    }
                }
                if (permissionCheck === 'denied') {
                    handlePermissionDismiss('contacts');
                    AsyncStorage.setItem('haveContactsPermission', 'false');
                }
            });
        } else if (Platform.OS === 'android') {
            const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);

            if (permission === 'granted') {
                this.findContacts();
                if (cb) {
                    cb();
                }
            }
            if (permission === 'never_ask_again') {
                handlePermissionDismiss('contacts');
                AsyncStorage.setItem('haveContactsPermission', 'false');
            }
            if (permission === 'denied') {
                return;
            }
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

    private validateContact = (c: LocaleContact) => {
        return (typeof c.firstName === 'string' && c.phones.length > 0);
    }

    private findContacts = async () => {
        await AsyncStorage.setItem('haveContactsPermission', 'true');
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

                    if (this.validateContact(converted)) {
                        this.pending.push(converted);

                        await AsyncStorage.setItem(storageKey, JSON.stringify(converted));
                    }
                }
            }

            await this.sendContacts();
        });
    }

    private sendContacts = async () => {
        if (this.isSending || this.pending.length <= 0) {
            return;
        }

        this.isSending = true;

        while (this.pending.length > 0) {
            const batch = this.pending.splice(0, BATCH_SIZE);

            await backoff(async () => {
                await this.client.mutatePhonebookAdd({
                    records: batch.map(c => ({
                        firstName: c.firstName,
                        lastName: c.lastName,
                        phones: c.phones.map(p => p.number)
                    }))
                });
                await this.client.refetchPhonebookWasExported();
                await this.client.refetchMyContacts({ first: 20 }, { fetchPolicy: 'network-only' });
            });

            await AsyncStorage.multiSet(batch.map(p => ([
                this._sitem(p.id),
                JSON.stringify({ ...p, sent: true })
            ])));
        }

        this.isSending = false;
    }
}

export let cachedContactsExporter: PhonebookExporterImpl | null = null;

export function getContactsExporter() {
    if (!cachedContactsExporter) {
        cachedContactsExporter = new PhonebookExporterImpl(getClient());
    }
    return cachedContactsExporter;
}
