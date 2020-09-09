import * as React from 'react';
import { UListText } from 'openland-web/components/unicorn/UListText';
import { css } from 'linaria';

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

export const ShowMoreText = React.memo<ShowMoreProps>(({ text }) => {
    const [fullLength, setFullLength] = React.useState(false);

    if (fullLength || text.length < 500) {
        return <UListText value={text}/>;
    }

    const shortText = `${text.substr(0, 500)}... `;
    const compactView = (
        <>
            {shortText}
            <span className={showMoreLink} onClick={() => setFullLength(true)}>Show more</span>
        </>
    );

    return (
        <UListText value={compactView}/>
    );
});