import * as React from 'react';

type LocalContactStatus = 'removed' | 'added';
type LocalContactsMap = { [key: string]: LocalContactStatus };

type LocalContactsProviderState = {
    localContacts: LocalContactsMap,
    addContact: (userId: string) => void,
    removeContact: (userId: string) => void,
};

type LocalContactsProviderProps = { children: any };

const LocalContactsContext = React.createContext<LocalContactsProviderState>({ localContacts: {}, addContact: () => { /* */ }, removeContact: () => { /* */ } });

export class LocalContactsProvider extends React.PureComponent<LocalContactsProviderProps, LocalContactsProviderState> {
    constructor(props: LocalContactsProviderProps) {
        super(props);
        this.state = {
            localContacts: {},
            addContact: this.addContact,
            removeContact: this.removeContact,
        };
    }

    addContact = (userId: string) => {
        this.setState(prev => ({ localContacts: { ...prev.localContacts, [userId]: 'added' } }));
    }

    removeContact = (userId: string) => {
        this.setState(prev => ({ localContacts: { ...prev.localContacts, [userId]: 'removed' } }));
    }

    render = () => {
        return (
            <LocalContactsContext.Provider value={{ ...this.state }} >
                {this.props.children}
            </LocalContactsContext.Provider>
        );
    }
}

export const useLocalContacts = () => {
    return React.useContext(LocalContactsContext);
};

export const useLocalContact = (userId: string, initialInContacts: boolean) => {
    const { localContacts, addContact, removeContact } = useLocalContacts();

    const localStatus = localContacts[userId];
    const isContact = localStatus ? localStatus === 'added' : initialInContacts;

    return { isContact, addContact, removeContact };
};
