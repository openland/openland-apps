import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SScrollView } from 'react-native-s/SScrollView';
import { ThemeController } from 'openland-mobile/themes/ThemeControler';

const SettingsAppearanceComponent = React.memo<PageProps>((props) => {
    let [theme, setTheme] = React.useState(ThemeController.theme);
    return (
        <>
            <SHeader title="Appearance" />
            <SScrollView>
                <ZListItemGroup header="Theme">
                    <ZListItem
                        text="Light"
                        checkmark={theme === 'light'}
                        onPress={() => {
                            setTheme('light');
                            ThemeController.theme = 'light';
                        }}
                    />
                    <ZListItem
                        text="Dark"
                        checkmark={theme === 'dark'}
                        onPress={() => {
                            setTheme('dark');
                            ThemeController.theme = 'dark';
                        }}
                    />
                </ZListItemGroup>
            </SScrollView>
            {/* <SettingsNotificationsContent {...this.props} /> */}
        </>
    );
});

export const SettingsAppearance = withApp(SettingsAppearanceComponent);