import * as React from 'react';
import { UListText } from 'openland-web/components/unicorn/UListText';
import { css } from 'linaria';

import { emoji } from 'openland-y-utils/emoji';
import { UText } from 'openland-web/components/unicorn/UText';
import { XViewProps } from 'react-mental';

interface ShowMoreProps extends XViewProps {
    text: string;
    maxCharacters?: number;
    maxLineBreaks?: number;
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

const getShortText = (text: string, maxCharacters: number, maxLineBreaks: number) => {
    if (text.length > maxCharacters) {
        return `${text.substr(0, maxCharacters)}... `;
    } else {
        const shortTextLength = text.split(/\r\n|\r|\n/).slice(0, maxLineBreaks).join('\n').length;
        return `${text.substr(0, shortTextLength)}... `;
    }
};

export const isSmallText = (text: string, maxCharacters: number, maxLineBreaks: number) => text.length < maxCharacters && getLineBreaksNumber(text) < maxLineBreaks;

export const ShowMoreText = React.memo<ShowMoreProps>((props) => {
    const { text, maxCharacters = MAX_CHARACTERS, maxLineBreaks = MAX_LINE_BREAKS, ...other } = props;
    const [fullLength, setFullLength] = React.useState(false);

    if (fullLength || isSmallText(text, maxCharacters, maxLineBreaks)) {
        return <UListText value={text} {...other}/>;
    }

    const compactView = (
        <>
            <UText text={getShortText(text, maxCharacters, maxLineBreaks)} proccessText={emoji} />
            <span className={showMoreLink} onClick={() => setFullLength(true)}>Show more</span>
        </>
    );

    return (
        <UListText value={compactView} {...other}/>
    );
});