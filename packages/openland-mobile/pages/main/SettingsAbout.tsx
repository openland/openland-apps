import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { View, Text } from 'react-native';
// import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const SettingsAboutComponent = React.memo<PageProps>((props) => {
    // const theme = React.useContext(ThemeContext);

    return (
        <>
            <SHeader title="About" />
            <SScrollView>
                <Text>Hello!</Text>
            </SScrollView>
        </>
    );
});

export const SettingsAbout = withApp(SettingsAboutComponent);