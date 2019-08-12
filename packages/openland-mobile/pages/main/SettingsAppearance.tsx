import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SScrollView } from 'react-native-s/SScrollView';
import { ThemeController } from 'openland-mobile/themes/ThemeControler';

const SettingsAppearanceComponent = React.memo<PageProps>((props) => {
    let [theme, setTheme] = React.useState(ThemeController.theme);
    return (
        <>
            <SHeader title="Appearance" />
            <SScrollView>
                <ZListGroup header="Theme">
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
                        checkmark={theme === 'Dark'}
                        onPress={() => {
                            setTimeout(() => {
                                setTheme('Dark');
                                ThemeController.theme = 'Dark';
                            }, 10);
                        }}
                    />
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const SettingsAppearance = withApp(SettingsAppearanceComponent);