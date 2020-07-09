import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Text, Image } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const ContactsStub = React.memo(() => {
    let theme = React.useContext(ThemeContext);

    return (
        <ASSafeAreaView
            flexGrow={1}
            paddingHorizontal={32}
            alignItems="center"
            justifyContent="center"
        >
            <Image
                source={require('assets/img-contacts-empty.png')}
                style={{ width: 270, height: 180, marginBottom: 1 }}
            />
            <Text
                style={{
                    ...TextStyles.Title2,
                    color: theme.foregroundPrimary,
                    textAlign: 'center',
                    marginBottom: 4,
                }}
                allowFontScaling={false}
            >
                No contacts yet
            </Text>
            <Text
                style={{
                    ...TextStyles.Body,
                    color: theme.foregroundSecondary,
                    textAlign: 'center',
                }}
                allowFontScaling={false}
            >
                Invite your contacts to Openland or add people manually from their profiles, and
                they will appear here
            </Text>
        </ASSafeAreaView>
    );
});

const ContactsPage = React.memo((props: PageProps) => {
    return (
        <>
            <SHeader title="Contacts" />
            <ContactsStub />
        </>
    );
});

export const Contacts = withApp(ContactsPage, { navigationAppearance: 'large' });