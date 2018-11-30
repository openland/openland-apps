import { convertToHTML, convertFromHTML } from 'draft-convert';
import * as cheerio from 'cheerio';

export const htmlMessageToDbFormat = (str: string) => {
    const $ = cheerio.load(str);
    const mentions: any = [];

    $('span').each((index, item) => {
        const data = item.children && item.children[0] && item.children[0].data;

        mentions.push({
            id: item.attribs['data-mention-id'],
            isYou: item.attribs['data-mention-is-you'] === 'true',
            name: data && data.slice ? data.slice(1) : '',
        });
    });

    return {
        text: ($ as any).text(),
        mentions,
    };
};

export const toContentState = (html: any, options?: any) => {
    return convertFromHTML({
        htmlToEntity: (nodeName: any, node: any, createEntity: any) => {
            if (nodeName === 'span') {
                return createEntity('mention', 'IMMUTABLE', {
                    mention: {
                        id: node.getAttribute('data-mention-id'),
                        isYou:
                            node.getAttribute('data-mention-is-you') === 'true',
                    },
                });
            }
        },
    })(html, options);
};

export const toHTML = (contentState: any) => {
    return convertToHTML({
        entityToHTML: (entity: any, originalText: any) => {
            if (entity.type === 'mention') {
                return `<span data-mention-id="${
                    entity.data.mention.id
                }" data-mention-is-you="${
                    entity.data.mention.isYou
                }">${originalText}</span>`;
            }
            return originalText;
        },
    })(contentState);
};
