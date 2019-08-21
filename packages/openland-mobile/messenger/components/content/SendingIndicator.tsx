import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

const SHOW_INDICATOR_AFTER_TIME = 2000;

interface SendingIndicatorProps {
    sendTime: number;
    theme: ThemeGlobal;
}

export const SendingIndicator = React.memo((props: SendingIndicatorProps) => {
    const { sendTime, theme } = props;
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - sendTime > SHOW_INDICATOR_AFTER_TIME) {
                setVisible(true);

                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <ASFlex width={16} height={16}>
            {visible && (
                <ASImage
                    source={require('assets/ic-recent-16.png')}
                    width={16}
                    height={16}
                    tintColor={theme.foregroundQuaternary}
                />
            )}
        </ASFlex>
    );
});