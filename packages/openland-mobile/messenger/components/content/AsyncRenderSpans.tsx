import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { renderPreprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { AppTheme } from 'openland-mobile/themes/themes';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { getSpansSlices } from 'openland-y-utils/spans/utils';
import { Span } from 'openland-y-utils/spans/Span';

interface TextWrapperProps {
    marginBottom?: number;
    maxWidth?: number;
    fontSize?: number;
    color: string;
    fontStyle?: 'italic' | 'normal';
    children?: any;
}

const TextWrapper = (props: TextWrapperProps) => (
    <ASText
        key={'text-' + props.color}
        color={props.color}
        letterSpacing={-0.3}
        fontSize={props.fontSize || 16}
        fontWeight={TextStyles.weight.regular}
        fontStyle={props.fontStyle}
        maxWidth={props.maxWidth}
        marginBottom={props.marginBottom}
    >
        {props.children}
    </ASText>
)

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

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
}

export class RenderSpans extends React.PureComponent<RenderSpansProps> {
    render() {
        const { spans, message, padded, fontStyle, theme, maxWidth, insetLeft, insetRight, insetTop, onUserPress, onGroupPress } = this.props;
        const mainTextColor = message.isOut ? theme.textColorOut : theme.textColor;
        const content = getSpansSlices(spans, padded);

        return (
            <>
                {content.map((c, i) => (
                    <>
                        {(c.type === 'slice' || c.type === 'loud') && (
                            <TextWrapper
                                key={c.type + '-' + i}
                                color={mainTextColor}
                                fontStyle={fontStyle}
                                fontSize={c.type === 'loud' ? 20 : undefined}
                                marginBottom={c.type === 'loud' ? 4 : undefined}
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