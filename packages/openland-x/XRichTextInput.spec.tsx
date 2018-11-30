import * as React from 'react';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { MessageWithMentionsTextComponent } from './XMention';
import * as cheerio from 'cheerio';
import * as renderer from 'react-test-renderer';

export const toContentState = (html: any, options?: any) => {
    return convertFromHTML({
        htmlToEntity: (nodeName: any, node: any, createEntity: any) => {
            if (nodeName === 'span') {
                return createEntity('MENTION', 'IMMUTABLE', {
                    'data-mention-id': node.getAttribute('data-mention-id'),
                });
            }
        },
    })(html, options);
};

export const toHTML = (contentState: any) => {
    return convertToHTML({
        entityToHTML: (entity: any, originalText: any) => {
            if (entity.type === 'MENTION') {
                return `<span data-mention-id="${
                    entity.data['data-mention-id']
                }">${originalText}</span>`;
            }
            return originalText;
        },
    })(contentState);
};

const testFromHtmlToDraftEditorStateAndBack = (htmlFixture: any) => {
    const contentState = toContentState(htmlFixture);
    const htmlOut = toHTML(contentState);
    expect(htmlOut).toBe(htmlFixture);
};

const htmlMessageToDbFormat = (str: string) => {
    const $ = cheerio.load(str);
    const mentions: any = [];

    $('span').each((index, item) => {
        mentions.push(item.attribs['data-mention-id']);
    });

    return {
        text: ($ as any).text(),
        mentions,
    };
};

describe.only('XRichComponent', () => {
    it('converts one mention with span', () => {
        testFromHtmlToDraftEditorStateAndBack(
            '<p><span data-mention-id="123">@Sergey Lapin</span></p>',
        );
    });

    it('converts two mention with span', () => {
        testFromHtmlToDraftEditorStateAndBack(
            '<p><span data-mention-id="123">@Sergey Lapin</span> <span data-mention-id="456">@Other Guy</span></p>',
        );
    });

    it('html to db format', () => {
        const str =
            '<p><span data-mention-id="123">@Sergey Lapin</span> 123 <span data-mention-id="456">@Other Guy</span></p>';

        const res = htmlMessageToDbFormat(str);

        expect(res).toEqual({
            mentions: ['123', '456'],
            text: '@Sergey Lapin 123 @Other Guy',
        });
    });

    it('db format to react component', () => {
        expect(
            renderer
                .create(
                    <MessageWithMentionsTextComponent
                        text={'@Sergey Lapin 123 @Other Guy'}
                        mentions={[
                            { id: '123', name: '@Sergey Lapin' } as any,
                            { id: '456', name: '@Other Guy' } as any,
                        ]}
                    />,
                )
                .toJSON(),
        ).toMatchSnapshot();
    });
});
