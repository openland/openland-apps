import {
    MessageSpan,
    MessageSpan_MessageSpanOrganizationMention_organization,
    MessageSpan_MessageSpanRoomMention_room,
    MessageSpan_MessageSpanUserMention_user,
    MessageSpanType,
} from 'openland-api/spacex.types';

export enum SpanType {
    root = 'root',
    link = 'link',
    text = 'text',
    new_line = 'new_line',
    mention_all = 'mention_all',
    mention_user = 'mention_user',
    mention_users = 'mention_users',
    mention_room = 'mention_room',
    mention_organization = 'mention_organization',
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
    hashtag = 'hashtag',
    search_highlight = 'search_highlight',
}

export type Span =
    | SpanRoot
    | SpanUser
    | SpanAll
    | SpanRoom
    | SpanOrganization
    | SpanText
    | SpanLink
    | SpanUsers
    | SpanBold
    | SpanHashtag
    | SpanDate
    | SpanCodeBlock
    | SpanCodeInline
    | SpanInsane
    | SpanIrony
    | SpanItalic
    | SpanLoud
    | SpanRotating
    | SpanSearchHighlight
    | SpanEmoji;

interface SpanAbs {
    type: SpanType;
    offset: number;
    length: number;

    textRaw?: string;
    text?: string | Element[] | JSX.Element[] | Element | JSX.Element;
    children?: Span[];
}

export interface SpanRoot extends SpanAbs {
    type: SpanType.root;
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

export interface SpanHashtag extends SpanAbs {
    type: SpanType.hashtag;
}

export interface SpanSearchHighlight extends SpanAbs {
    type: SpanType.search_highlight;
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
    user: MessageSpan_MessageSpanUserMention_user;
}

export interface SpanUsers extends SpanAbs {
    type: SpanType.mention_users;
}

export interface SpanAll extends SpanAbs {
    type: SpanType.mention_all;
}

export interface SpanRoom extends SpanAbs {
    type: SpanType.mention_room;
    room: MessageSpan_MessageSpanRoomMention_room;
}

export interface SpanOrganization extends SpanAbs {
    type: SpanType.mention_organization;
    organization: MessageSpan_MessageSpanOrganizationMention_organization;
}

export type ServerSpan = MessageSpan | { __typename: 'MessageSpanSearchHighlight', offset: number, length: number };

export type SpanSymbolToTypeT = {
    [key: string]: { type: MessageSpanType; master?: boolean; lined?: boolean };
};

export const SpanSymbolToType: SpanSymbolToTypeT = {
    '*': { type: MessageSpanType.Bold },
    '```': { type: MessageSpanType.CodeBlock, master: true },
    '`': { type: MessageSpanType.InlineCode },
    '🌈': { type: MessageSpanType.Insane },
    '~': { type: MessageSpanType.Irony },
    '_': { type: MessageSpanType.Italic },
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
    mention_room: {
        variants: [{ s: '@', opened: true }],
        supportMobile: true,
    },
    mention_organization: {
        variants: [{ s: '@', opened: true }],
        supportMobile: true,
    },
    mention_all: {
        variants: [{ s: '@', opened: true }],
        supportMobile: true,
    },
};
