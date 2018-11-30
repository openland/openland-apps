import { convertToHTML, convertFromHTML } from 'draft-convert';
import * as cheerio from 'cheerio';

export const htmlMessageToDbFormat = (str: string) => {
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

export const toContentState = (html: any, options?: any) => {
    return convertFromHTML({
        htmlToEntity: (nodeName: any, node: any, createEntity: any) => {
            if (nodeName === 'span') {
                return createEntity('mention', 'IMMUTABLE', {
                    mention: {
                        id: node.getAttribute('data-mention-id'),
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
                }">${originalText}</span>`;
            }
            return originalText;
        },
    })(contentState);
};
