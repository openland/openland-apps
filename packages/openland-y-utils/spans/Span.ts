import {
    FullMessage_GeneralMessage_spans,
    FullMessage_ServiceMessage_spans,
    UserForMention,
    MessageSpanType,
} from 'openland-api/Types';

export enum SpanType {
    link = 'link',
    text = 'text',
    new_line = 'new_line',
    mention_all = 'mention_all',
    mention_user = 'mention_user',
    mention_users = 'mention_users',
    mention_room = 'mention_room',
    bold = 'bold',
    date = 'date',
    code_block = 'code_block',
    code_inline = 'code_inline',
    insane = 'insane',
    irony = 'irony',
    italic = 'italic',
    loud = 'loud',
    rotating = 'rotating',
    emoji = 'emoji',
}

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
    type: SpanType.text | SpanType.new_line;
}

export interface SpanEmoji extends SpanAbs {
    type: SpanType.emoji;
}

export interface SpanBold extends SpanAbs {
    type: SpanType.bold;
}

export interface SpanCodeBlock extends SpanAbs {
    type: SpanType.code_block;
}

export interface SpanCodeInline extends SpanAbs {
    type: SpanType.code_inline;
}

export interface SpanInsane extends SpanAbs {
    type: SpanType.insane;
}

export interface SpanIrony extends SpanAbs {
    type: SpanType.irony;
}

export interface SpanItalic extends SpanAbs {
    type: SpanType.italic;
}

export interface SpanLoud extends SpanAbs {
    type: SpanType.loud;
}

export interface SpanRotating extends SpanAbs {
    type: SpanType.rotating;
}

export interface SpanDate extends SpanAbs {
    type: SpanType.date;
    date: string;
}

export interface SpanLink extends SpanAbs {
    type: SpanType.link;
    link: string;
}

export interface SpanUser extends SpanAbs {
    type: SpanType.mention_user;
    user: UserForMention;
}

export interface SpanUsers extends SpanAbs {
    type: SpanType.mention_users;
    users: UserForMention[];
}

export interface SpanAll extends SpanAbs {
    type: SpanType.mention_all;
}

export interface SpanRoom extends SpanAbs {
    type: SpanType.mention_room;
    title: string;
    id: string;
}

export type ServerSpan = FullMessage_GeneralMessage_spans | FullMessage_ServiceMessage_spans;

export const SpanSymbolToType: {
    [key: string]: { type: MessageSpanType; master?: boolean; lined?: boolean };
} = {
    '*': { type: MessageSpanType.Bold },
    '```': { type: MessageSpanType.CodeBlock, master: true },
    '`': { type: MessageSpanType.InlineCode },
    '🌈': { type: MessageSpanType.Insane },
    '~': { type: MessageSpanType.Irony },
    _: { type: MessageSpanType.Italic },
    '# ': { type: MessageSpanType.Loud, lined: true },
    '🔄': { type: MessageSpanType.Rotating },
};

export interface SpecSymbolsType {
    variants: ({
        s: string;
        opened?: boolean;
    })[];
    supportMobile: boolean;
}

export const SpanTypeToSymbol: { [key: string]: SpecSymbolsType } = {
    bold: {
        variants: [{ s: '*' }],
        supportMobile: true,
    },
    code_block: {
        variants: [{ s: '```' }, { s: "'''" }],
        supportMobile: true,
    },
    code_inline: {
        variants: [{ s: '`' }, { s: "'" }],
        supportMobile: true,
    },
    insane: {
        variants: [{ s: '🌈' }],
        supportMobile: false,
    },
    irony: {
        variants: [{ s: '~' }],
        supportMobile: true,
    },
    italic: {
        variants: [{ s: '_' }],
        supportMobile: true,
    },
    loud: {
        variants: [
            { s: ':' }, // DEPRECATED
            { s: '# ', opened: true },
        ],
        supportMobile: true,
    },
    rotating: {
        variants: [{ s: '🔄' }],
        supportMobile: false,
    },
    mention_user: {
        variants: [{ s: '@', opened: true }],
        supportMobile: true,
    },
    mention_all: {
        variants: [{ s: '@', opened: true }],
        supportMobile: true,
    },
};
