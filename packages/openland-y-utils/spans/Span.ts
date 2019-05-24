import {
    FullMessage_GeneralMessage_spans,
    FullMessage_ServiceMessage_spans,
    UserForMention,
    MessageSpanType,
} from 'openland-api/Types';

export type SpanType =
    | 'link'
    | 'text'
    | 'new_line'
    | 'mention_all'
    | 'mention_user'
    | 'mention_users'
    | 'mention_room'
    | 'bold'
    | 'date'
    | 'code_block'
    | 'code_inline'
    | 'insane'
    | 'irony'
    | 'italic'
    | 'loud'
    | 'rotating'
    | 'emoji';
export type Span =
    | SpanUser
    | SpanAll
    | SpanRoom
    | SpanText
    | SpanLink
    | SpanUsers
    | SpanBold
    | SpanDate
    | SpanCodeBlock
    | SpanCodeInline
    | SpanInsane
    | SpanIrony
    | SpanItalic
    | SpanLoud
    | SpanRotating
    | SpanEmoji;

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

export interface SpanEmoji extends SpanAbs {
    type: 'emoji';
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
    user: UserForMention;
}

export interface SpanUsers extends SpanAbs {
    type: 'mention_users';
    users: UserForMention[];
}

export interface SpanAll extends SpanAbs {
    type: 'mention_all';
}

export interface SpanRoom extends SpanAbs {
    type: 'mention_room';
    title: string;
    id: string;
}

export type ServerSpan = FullMessage_GeneralMessage_spans | FullMessage_ServiceMessage_spans;

export const SpanSymbolToType: {
    [key: string]: { type: MessageSpanType; master?: boolean; lined?: boolean };
} = {
    '*': { type: MessageSpanType.Bold },
    '```': { type: MessageSpanType.CodeBlock, master: true },
    "'''": { type: MessageSpanType.CodeBlock, master: true },
    '`': { type: MessageSpanType.InlineCode },
    "'": { type: MessageSpanType.InlineCode },
    '🌈': { type: MessageSpanType.Insane },
    '~': { type: MessageSpanType.Irony },
    _: { type: MessageSpanType.Italic },
    '# ': { type: MessageSpanType.Loud, lined: true },
    '🔄': { type: MessageSpanType.Rotating },
};

export interface SpecSymbolsType {
    variants: ({
        s: string;
        opened?: boolean
    })[];
    supportMobile: boolean;
}

export const SpanTypeToSymbol: { [key: string]: SpecSymbolsType } = {
    bold: {
        variants: [{ s: '*' }],
        supportMobile: true
    },
    code_block: {
        variants: [{ s: '```' }, { s: "'''" }],
        supportMobile: true
    },
    code_inline: {
        variants: [{ s: '`' }, { s: "'" }],
        supportMobile: true
    },
    insane: {
        variants: [{ s: '🌈' }],
        supportMobile: false
    },
    irony: {
        variants: [{ s: '~' }],
        supportMobile: true
    },
    italic: {
        variants: [{ s: '_' }],
        supportMobile: true
    },
    loud: {
        variants: [
            { s: ':' }, // DEPRECATED
            { s: '# ', opened: true },
        ],
        supportMobile: true
    },
    rotating: {
        variants: [{ s: '🔄' }],
        supportMobile: false
    },
    mention_user: {
        variants: [{ s: '@', opened: true }],
        supportMobile: true
    },
    mention_all: {
        variants: [{ s: '@', opened: true }],
        supportMobile: true
    },
};
