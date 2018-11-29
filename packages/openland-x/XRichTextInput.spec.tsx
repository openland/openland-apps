import * as React from 'react';
import { convertToHTML, convertFromHTML } from 'draft-convert';

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

const testFixture = (htmlFixture: any) => {
    const contentState = toContentState(htmlFixture);
    const htmlOut = toHTML(contentState);
    expect(htmlOut).toBe(htmlFixture);
};

describe.only('XRichComponent', () => {
    it('converts one mention with span', () => {
        testFixture('<p><span data-mention-id="123">@Sergey Lapin</span></p>');
    });

    it('converts two mention with span', () => {
        testFixture(
            '<p><span data-mention-id="123">@Sergey Lapin</span> <span data-mention-id="456">@Other Guy</span></p>',
        );
    });
});
