import * as React from 'react';
import { Platform } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

export interface TViewProps {
    children?: any;

    height?: number;
    width?: number;

    flexDirection?: 'row' | 'column';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
    justifyContent?: 'flex-start' | 'flex-end' | 'center';
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch';

    marginTop?: number;
    marginLeft?: number;
    marginRight?: number;
    marginBottom?: number;

    onPress?: string;
}

function bindValue(src: string): any {
    return { bind: src }
}

function bindText(src: string): any {
    return <ttextbind value={src} />;
}

export const TView = (props: TViewProps) => {
    return <tview {...props}>{props.children}</tview>;
};

export interface TTextProps {
    height?: number;
    width?: number;
    marginTop?: number;
    marginLeft?: number;
    marginRight?: number;
    marginBottom?: number;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    lineHeight?: number;
    letterSpacing?: number;
    numberOfLines?: number;
    textDecorationLine?: 'none' | 'underline';
    textAlign?: 'center' | 'right' | 'left';

    children?: any;
}

export const TText = (props: TTextProps) => {
    return <ttext {...props}>{props.children}</ttext>;
}

export const TIF = (props: { negate?: boolean, condition: string, children: any }) => {
    return <tif {...props}>{props.children}</tif>;
}

export const Example = () => {
    return (
        <TView height={80} flexDirection="row" onPress="dialog">
            <TView width={80} height={80} alignItems="center" justifyContent="center">
                {}
            </TView>
            <TView marginRight={10} marginTop={12} marginBottom={12} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                <TView height={Platform.OS === 'android' ? 22 : 18} marginTop={Platform.OS === 'android' ? -4 : 0}>
                    <TText fontSize={15} height={22} fontWeight={TextStyles.weight.medium} color={Platform.OS === 'android' ? '#000' : '#181818'} flexGrow={1} flexBasis={0} marginRight={10}>{bindText("item.title")}</TText>
                    <TIF condition="item.date">
                        <TText fontSize={13} height={16} marginTop={2} color="#aaaaaa">{bindText("item.date")}</TText>
                    </TIF>
                </TView>

                <TView flexDirection="row" alignItems="stretch" marginTop={2} marginBottom={2} height={38}>
                    <TIF negate={true} condition="item.typing">
                        {}
                    </TIF>
                    <TIF condition="item.typing">
                        {}
                    </TIF>
                    <TIF condition="item.unread">
                        {}
                    </TIF>
                </TView>
            </TView>
        </TView>
    )
};