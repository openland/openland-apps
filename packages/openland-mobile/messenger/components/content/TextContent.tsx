import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { renderPreprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { AppTheme } from 'openland-mobile/themes/themes';

interface TextContentProps {
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    padded?: boolean;
    fontStyle?: 'italic' | 'normal';
    theme: AppTheme;
}

export class TextContent extends React.PureComponent<TextContentProps> {
    render() {
        const { message, theme, onUserPress, onGroupPress } = this.props;

        let mainTextColor = message.isOut ? theme.textColorOut : theme.textColor;
        let parts = renderPreprocessedText(message.textSpans, message, theme, onUserPress, onGroupPress);

        if (message.title) {
            parts.unshift(<ASText key={'br-title'} >{'\n'}</ASText>);
            parts.unshift(<ASText key={'text-title'} fontWeight={TextStyles.weight.medium}>{message.title}</ASText>);
        }

        return (
            <>
                {!!message.text && (
                    <ASText
                        key={'text-' + mainTextColor}
                        color={mainTextColor}
                        letterSpacing={-0.3}
                        fontSize={16}
                        fontWeight={TextStyles.weight.regular}
                        fontStyle={this.props.fontStyle}
                    >
                        {parts}
                        {this.props.padded !== false ? (message.isOut ? paddedTextOut(message.isEdited) : paddedText(message.isEdited)) : undefined}
                    </ASText>
                )}
            </>
        )
    }
}