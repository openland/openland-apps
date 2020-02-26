import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { FormLayout, Title, Subtitle, AuthActionButton } from 'openland-web/pages/auth/components/authComponents';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';

const imageClassName = css`
    object-fit: cover;
    width: 320px;
    align-self: center;
    margin-bottom: 16px;
`;

export const DiscoverRecommendationsStart = (props: { onStartClick: (event: React.MouseEvent<any>) => void }) => {

    return (
        <XView flexGrow={1} flexShrink={1} paddingBottom={89}>
            <FormLayout>
                <ImgWithRetry
                    className={imageClassName}
                    src="https://cdn.openland.com/shared/art/art-discover-recommendation.png"
                    srcSet="https://cdn.openland.com/shared/art/art-discover-recommendation@2x.png 2x, https://cdn.openland.com/shared/art/art-discover-recommendation@3x.png 3x"
                />
                <Title text="Get chat recommendations" />
                <Subtitle text="Find the right chats for you" />
                <AuthActionButton marginTop={32} text="Start" onClick={props.onStartClick} />
            </FormLayout>
        </XView>
    );
};