import * as React from 'react';

export function emojiComponentSprite(name: string, category: string, key?: string) {
    return <span className={`joypixels joypixels-24-${category} _${name}`}>{}</span>;
}