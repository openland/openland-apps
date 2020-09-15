import * as React from 'react';
import { UListText } from 'openland-web/components/unicorn/UListText';
import { css } from 'linaria';

import { emoji } from 'openland-y-utils/emoji';
import { UText } from 'openland-web/components/unicorn/UText';

interface ShowMoreProps {
    text: string;
}

const showMoreLink = css`
    color: var(--accentPrimary);
    font-weight: 600;
    
    &:hover {
        opacity: 0.64;
        cursor: pointer;
    }
`;

const MAX_CHARACTERS = 400;
const MAX_LINE_BREAKS = 10;

const getLineBreaksNumber = (text: string) => text.split(/\r\n|\r|\n/).length;

const getShortText = (text: string) => {
    if (text.length > MAX_CHARACTERS) {
        return `${text.substr(0, MAX_CHARACTERS)}... `;
    } else {
        const shortTextLength = text.split(/\r\n|\r|\n/).slice(0, MAX_LINE_BREAKS).join('\n').length;
        return `${text.substr(0, shortTextLength)}... `;
    }
};

export const ShowMoreText = React.memo<ShowMoreProps>(({ text }) => {
    const [fullLength, setFullLength] = React.useState(false);

    const isSmallText = text.length < MAX_CHARACTERS && getLineBreaksNumber(text) < MAX_LINE_BREAKS;

    if (fullLength || isSmallText) {
        return <UListText value={text}/>;
    }

    const compactView = (
        <>
            <UText text={getShortText(text)} proccessText={emoji} />
            <span className={showMoreLink} onClick={() => setFullLength(true)}>Show more</span>
        </>
    );

    return (
        <UListText value={compactView}/>
    );
});