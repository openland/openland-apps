import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASText } from 'react-native-async-view/ASText';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { formatTime } from 'openland-y-utils/formatTime';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';
import { Platform } from 'react-native';

interface MetaInfoInnerProps {
    message: DataSourceMessageItem;
    theme: ThemeGlobal;
}

const EditIcon = React.memo((props: { color: string; opacity?: number }) => (
    <ASImage
        source={require('assets/ic-edited-16.png')}
        width={16}
        height={16}
        marginRight={2}
        tintColor={props.color}
        opacity={props.opacity}
    />
));

interface LabelProps {
    date: number;
    edited: boolean;
    color: string;
    iconOpacity?: number;
    textOpacity?: number;
}

// Sorry universe
const baselineCompensation = Platform.OS === 'ios' ? 2 : 0;

const Label = React.memo((props: LabelProps) => {
    const { date, edited, color, iconOpacity, textOpacity } = props;

    return (
        <ASFlex alignItems="center">
            {edited && <EditIcon color={color} opacity={iconOpacity} />}
            <ASFlex marginTop={-baselineCompensation} marginBottom={baselineCompensation}>
                <ASText
                    {...TextStylesAsync.Caption}
                    color={color}
                    opacity={textOpacity}
                >
                    {formatTime(date)}
                </ASText>
            </ASFlex>
        </ASFlex>
    );
});

const DefaultInner = React.memo((props: MetaInfoInnerProps) => {
    const { message, theme } = props;
    const { isEdited, isOut, date } = message;

    return (
        <ASFlex
            overlay={true}
            justifyContent="flex-end"
            alignItems="flex-end"
            marginBottom={-3}
        >
            <Label
                date={date}
                edited={!!isEdited}
                color={isOut ? theme.foregroundContrast : theme.foregroundTertiary}
                iconOpacity={isOut ? 0.7 : 0.84}
                textOpacity={isOut ? 0.56 : undefined}
            />
        </ASFlex>
    );
});

const MediaInner = React.memo((props: MetaInfoInnerProps) => {
    const { message, theme } = props;
    const { isEdited, date } = message;

    return (
        <ASFlex
            overlay={true}
            alignItems="flex-end"
            justifyContent="flex-end"
            marginRight={-4}
            marginBottom={1}
        >
            <ASFlex backgroundColor={theme.overlayMedium} borderRadius={10}>
                <ASFlex marginTop={1} marginBottom={1} marginLeft={isEdited ? 6 : 8} marginRight={8}>
                    <Label
                        date={date}
                        edited={!!isEdited}
                        color={theme.foregroundContrast}
                        iconOpacity={0.84}
                    />
                </ASFlex>
            </ASFlex>
        </ASFlex>
    );
});

const EmojiInner = React.memo((props: MetaInfoInnerProps) => {
    const { message, theme } = props;
    const { isEdited, isOut, date } = message;

    return (
        <ASFlex
            marginLeft={isOut ? undefined : 8}
            marginRight={isOut ? 8 : undefined}
            alignItems="flex-end"
        >
            <Label
                date={date}
                edited={!!isEdited}
                color={theme.foregroundTertiary}
                iconOpacity={0.84}
            />
        </ASFlex>
    );
});

interface MetaInfoIndicatorProps extends MetaInfoInnerProps {
    type: 'default' | 'media' | 'emoji';
}

export const MetaInfoIndicator = React.memo((props: MetaInfoIndicatorProps) => {
    const { type, ...other } = props;

    if (type === 'emoji') {
        return <EmojiInner {...other} />;
    }

    if (type === 'media') {
        return <MediaInner {...other} />;
    }

    return <DefaultInner {...other} />;
});