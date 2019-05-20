import { FullMessage_GeneralMessage_spans, FullMessage_ServiceMessage_spans, UserShort, MessageSpanType } from "openland-api/Types";

export type SpanType = 'link' | 'text' | 'new_line' | 'mention_user' | 'mention_users' | 'mention_room' | 'bold' | 'date' | 'code_block' | 'code_inline' | 'insane' | 'irony' | 'italic' | 'loud' | 'rotating';
export type Span = SpanUser | SpanRoom | SpanText | SpanLink | SpanUsers | SpanBold | SpanDate | SpanCodeBlock | SpanCodeInline | SpanInsane | SpanIrony | SpanItalic | SpanLoud | SpanRotating;

interface SpanAbs {
    type: SpanType;
    offset: number;
    length: number;

    textRaw?: string;
    text?: string | Element[] | JSX.Element[] | Element | JSX.Element;
    childrens?: Span[];
}

export interface SpanText extends SpanAbs {
    type: 'text' | 'new_line';
}

export interface SpanBold extends SpanAbs {
    type: 'bold';
}

export interface SpanCodeBlock extends SpanAbs {
    type: 'code_block';
}

export interface SpanCodeInline extends SpanAbs {
    type: 'code_inline';
}

export interface SpanInsane extends SpanAbs {
    type: 'insane';
}

export interface SpanIrony extends SpanAbs {
    type: 'irony';
}

export interface SpanItalic extends SpanAbs {
    type: 'italic';
}

export interface SpanLoud extends SpanAbs {
    type: 'loud';
}

export interface SpanRotating extends SpanAbs {
    type: 'rotating';
}

export interface SpanDate extends SpanAbs {
    type: 'date';
    date: string;
}

export interface SpanLink extends SpanAbs {
    type: 'link';
    link: string;
}

export interface SpanUser extends SpanAbs {
    type: 'mention_user';
    user: UserShort;
}

export interface SpanUsers extends SpanAbs {
    type: 'mention_users';
    users: UserShort[];
}

export interface SpanRoom extends SpanAbs {
    type: 'mention_room';
    title: string;
    id: string;
}

export type ServerSpan = FullMessage_GeneralMessage_spans | FullMessage_ServiceMessage_spans;

export const WhiteListAroundSpec = ['', ' ', '\n', ',', '.', '(', ')'];

export const SpanSymbolToType: { [key: string]: { type: MessageSpanType, master?: boolean }} = {
    '*': { type: MessageSpanType.Bold },
    '```': { type: MessageSpanType.CodeBlock, master: true },
    '\'\'\'': { type: MessageSpanType.CodeBlock, master: true },
    '`': { type: MessageSpanType.InlineCode },
    '\'': { type: MessageSpanType.InlineCode },
    '🌈': { type: MessageSpanType.Insane },
    '~': { type: MessageSpanType.Irony },
    '_': { type: MessageSpanType.Italic },
    ':': { type: MessageSpanType.Loud },
    '🔄': { type: MessageSpanType.Rotating },
};

export const SpanTypeToSymbol: { [key: string]: { symbol: string[], opened?: boolean }} = {
    'bold': { symbol: ['*'] },
    'code_block': { symbol: ['```', '\'\'\''] },
    'code_inline': { symbol: ['`', '\''] },
    'insane': { symbol: ['🌈'] },
    'irony': { symbol: ['~'] },
    'italic': { symbol: ['_'] },
    'loud': { symbol: [':'] },
    'rotating': { symbol: ['🔄'] },
    'mention_user': { symbol: ['@'], opened: true },
};