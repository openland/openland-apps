import * as React from 'react';
import { EditorState } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';

export const myConvertToHtml = (content: any): string => {
    return convertToHTML({
        blockToHTML: (block: any) => {
            if (block.type === 'PARAGRAPH') {
                return <p />;
            }
            return '';
        },
        entityToHTML: (entity: any, originalText: any) => {
            if (entity.type === 'mention') {
                return (
                    <span data-mention-id={entity.data.mention.id}>
                        {originalText}
                    </span>
                );
            }
            return originalText;
        },
    })(content);
};

export const myConvertFromHtml = (value: string): any => {
    const converted = convertFromHTML({
        htmlToEntity: (nodeName: any, node: any, createEntity: any) => {
            if (nodeName === 'span') {
                return createEntity('mention', 'IMMUTABLE', {});
            }
        },
        htmlToBlock: (nodeName: any, node: any) => {
            if (nodeName === 'blockquote') {
                return {
                    type: 'blockquote',
                    data: {},
                };
            }
            return '';
        },
    })(value);

    console.log(converted);
    return converted;
};
