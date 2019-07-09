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
                        checkmark={theme === 'LightBlue'}
                        onPress={() => {
                            setTimeout(() => {
                                setTheme('LightBlue');
                                ThemeController.theme = 'LightBlue';
                            }, 10);
                        }}
                    />
                    <ZListItem
                        text="Dark"
                        checkmark={theme === 'DarkBlue'}
                        onPress={() => {
                            setTimeout(() => {
                                setTheme('DarkBlue');
                                ThemeController.theme = 'DarkBlue';
                            }, 10);
                        }}
                    />
                </ZListItemGroup>
            </SScrollView>
        </>
    );
});

export const SettingsAppearance = withApp(SettingsAppearanceComponent);