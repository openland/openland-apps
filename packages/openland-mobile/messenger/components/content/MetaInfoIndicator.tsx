import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASText } from 'react-native-async-view/ASText';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { formatTime } from 'openland-y-utils/formatTime';
import { TextStylesAsync, CompensationAlpha } from 'openland-mobile/styles/AppStyles';
import { Platform } from 'react-native';

interface LabelProps {
    date: number;
    edited: boolean;
    color: string;
}

const baselineCompensation = Platform.OS === 'ios' ? 1 : 0; // Sorry universe
const Label = React.memo((props: LabelProps) => {
    const { date, edited, color } = props;

    return (
        <ASFlex alignItems="center">
            {edited && (
                <ASImage
                    source={require('assets/ic-edited-16.png')}
                    width={16}
                    height={16}
                    marginRight={2}
                    tintColor={color}
                    opacity={CompensationAlpha}
                />
            )}
            <ASFlex marginTop={-baselineCompensation} marginBottom={baselineCompensation}>
                <ASText
                    {...TextStylesAsync.Caption}
                    color={color}
                >
                    {formatTime(date)}
                </ASText>
            </ASFlex>
        </ASFlex>
    );
});

interface MetaInfoIndicatorProps {
    message: DataSourceMessageItem;
    theme: ThemeGlobal;
    type: 'default' | 'media' | 'emoji';
}

export const MetaInfoIndicator = React.memo((props: MetaInfoIndicatorProps) => {
    const { type, message, theme } = props;
    const { isEdited = false, isOut, date } = message;

    if (type === 'emoji') {
        return (
            <ASFlex
                marginLeft={isOut ? undefined : 8}
                marginRight={isOut ? 8 : undefined}
                alignItems="flex-end"
            >
                <Label
                    date={date}
                    edited={isEdited}
                    color={theme.foregroundTertiary}
                />
            </ASFlex>
        );
    }

    if (type === 'media') {
        return (
            <ASFlex
                overlay={true}
                alignItems="flex-end"
                justifyContent="flex-end"
                marginRight={-4}
            >
                <ASFlex backgroundColor={theme.overlayMedium} borderRadius={10}>
                    <ASFlex marginTop={1} marginBottom={1} marginLeft={isEdited ? 6 : 8} marginRight={8}>
                        <Label
                            date={date}
                            edited={isEdited}
                            color={theme.foregroundContrast}
                        />
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        );
    }

    return (
        <ASFlex
            overlay={true}
            justifyContent="flex-end"
            alignItems="flex-end"
            marginBottom={-4}
        >
            <Label
                date={date}
                edited={isEdited}
                color={theme.bubble(isOut).foregroundSecondary}
            />
        </ASFlex>
    );
});