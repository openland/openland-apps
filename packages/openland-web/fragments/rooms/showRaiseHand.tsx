import * as React from 'react';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { TextBody, TextTitle1 } from 'openland-web/utils/TextStyles';

const titleStyle = cx(TextTitle1, css`
    padding: 0 24px;
    margin: 16px 0 8px;
    text-align: center;
    color: var(--foregroundPrimary);
`);

const subtitleStyle = cx(TextBody, css`
    padding: 0 24px;
    text-align: center;
    color: var(--foregroundSecondary);
`);

export const showRaiseHand = (action: () => Promise<void>) => {
    const builder = new AlertBlanketBuilder();

    builder.body(() => (
        <XView paddingVertical={24}>
            <XView
                width={96}
                height={96}
                borderRadius={100}
                backgroundColor="var(--backgroundTertiaryTrans)"
                justifyContent="center"
                alignItems="center"
                alignSelf="center"
            >
                <ImgWithRetry
                    src="//cdn.openland.com/shared/rooms/raised-hand-back-42.png"
                    srcSet="//cdn.openland.com/shared/rooms/raised-hand-back-42@2x.png 2x, //cdn.openland.com/shared/rooms/raised-hand-back-42@3x.png 3x"
                />
            </XView>
            <div className={titleStyle}>
                Raise hand?
            </div>
            <div className={subtitleStyle}>
                Room admins will see that you want to speak
            </div>
        </XView>
    ));
    builder.action('Raise hand 🖐 ', action, 'success');
    builder.cancelText('Maybe later');
    builder.width(480);
    builder.show();
};
