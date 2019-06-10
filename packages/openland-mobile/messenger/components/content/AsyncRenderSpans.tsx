import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASText, ASTextProps } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { renderPreprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { AppTheme } from 'openland-mobile/themes/themes';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { getSpansSlices } from 'openland-y-utils/spans/utils';
import { Span } from 'openland-y-utils/spans/Span';

interface TextWrapperProps extends ASTextProps {
    color: string;
    children?: any;
}

const TextWrapper = (props: TextWrapperProps) => {
    const { children, ...other } = props;

    return (
        <ASText
            key={'text-' + props.color}
            {...other}
            letterSpacing={-0.3}
            fontWeight={TextStyles.weight.regular}
        >
            {children}
        </ASText>
    );
};

interface RenderSpansProps {
    spans: Span[];
    message: DataSourceMessageItem;
    padded?: boolean;
    fontStyle?: 'italic' | 'normal';
    theme: AppTheme;
    maxWidth: number;
    insetLeft: number;
    insetRight: number;
    insetTop: number;
    textAlign?: 'left' | 'right' | 'center';
    emojiOnly?: boolean;

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
}

export class RenderSpans extends React.PureComponent<RenderSpansProps> {
    render() {
        const { emojiOnly, textAlign, spans, message, padded, fontStyle, theme, maxWidth, insetLeft, insetRight, insetTop, onUserPress, onGroupPress } = this.props;
        const mainTextColor = emojiOnly ? theme.textColor : (message.isOut ? theme.textColorOut : theme.textColor);
        const content = getSpansSlices(spans, padded);

        return (
            <>
                {content.map((c, i) => (
                    <>
                        {(c.type === 'slice' || c.type === 'loud' || c.type === 'emoji') && (
                            <TextWrapper
                                key={c.type + '-' + i}
                                color={mainTextColor}
                                fontStyle={fontStyle}
                                fontSize={c.type === 'emoji' ? 48 : (c.type === 'loud' ? 20 : 16)}
                                marginTop={(c.type === 'loud' && i !== 0) ? 8 : undefined}
                                marginBottom={(c.type === 'loud' && i !== content.length - 1) ? 8 : undefined}
                                textAlign={textAlign}
                                maxWidth={maxWidth}
                            >
                                {c.spans.length > 0 && renderPreprocessedText(c.spans, message, theme, onUserPress, onGroupPress)}
                                {c.padded && (message.isOut ? paddedTextOut(message.isEdited) : paddedText(message.isEdited))}
                            </TextWrapper>
                        )}
                        {c.type === 'code_block' && (
                            <ASFlex
                                key={c.type + '-' + i}
                                marginLeft={-insetLeft}
                                marginRight={-insetRight}
                                marginTop={i === 0 ? insetTop : undefined}
                                backgroundColor={(message.isOut && !message.isService) ? theme.codeSpan.backgroundOut : theme.codeSpan.background}
                            >
                                <ASFlex marginLeft={insetLeft} marginRight={insetRight} marginTop={5} marginBottom={5}>
                                    <TextWrapper fontSize={14} color={mainTextColor} maxWidth={maxWidth}>
                                        {renderPreprocessedText(c.spans, message, theme, onUserPress, onGroupPress)}
                                    </TextWrapper>
                                </ASFlex>
                            </ASFlex>
                        )}
                    </>
                ))}
            </>
        )
    }
}