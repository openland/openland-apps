import React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { showCreatingGroupFragment } from 'openland-web/fragments/create/CreateEntityFragment';
import Plus from 'openland-icons/placeholder/plus.svg';
import Person from 'openland-icons/placeholder/person.svg';
import Apps from 'openland-icons/placeholder/apps.svg';

const button = css`
    &:hover,
    &:focus {
        .stackLayoutPlaceholderIconBackground {
            /* scale to 64px */
            transform: scale(1.14);

            background-color: var(--backgroundTertiaryHover);

            transition: transform 50ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
                background-color 50ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
        }
    }
`;

const icon = css`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    & svg {
        fill: var(--foregroundSecondary);
    }
`;

const iconBackround = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 100%;
    background-color: var(--backgroundTertiary);

    will-change: transform, background-color;
    transition: transform 200ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
        background-color 200ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
`;

interface ButtonProps {
    icon: React.ReactNode;
    text: string;
    path?: string;
    onClick?: () => void;
}

const Button = React.memo((props: ButtonProps) => (
    <div className={button}>
        <XView
            paddingLeft={8}
            paddingRight={8}
            path={props.path}
            flexDirection="column"
            alignItems="center"
            minWidth={128}
            cursor="pointer"
            onClick={props.onClick}
        >
            <XView position="relative" width={56} height={56}>
                <div className={cx(iconBackround, 'stackLayoutPlaceholderIconBackground')} />
                <div className={cx(icon, 'stackLayoutPlaceholderIcon')}>{props.icon}</div>
            </XView>
            <XView marginTop={16}>
                <span className={TextLabel1}>{props.text}</span>
            </XView>
        </XView>
    </div>
));

export const MessengerPlaceholderFragment = React.memo(() => {
    const createGroup = () => showCreatingGroupFragment({ entityType: 'group' });
    return (
        <XView
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            backgroundColor="var(--backgroundPrimary)"
        >
            <img
                width="320"
                height="200"
                src="//cdn.openland.com/shared/art/art-create.png"
                srcSet="//cdn.openland.com/shared/art/art-create@2x.png 2x, //cdn.openland.com/shared/art/art-create@3x.png 3x"
                alt=""
            />
            <XView marginTop={16}>
                <h2 className={TextTitle1}>Pick a chat on the left</h2>
            </XView>
            <XView marginTop={8} color="var(--foregroundSecondary)">
                <p className={TextBody}>Or get done something else</p>
            </XView>
            <XView marginTop={32} justifyContent="center" flexWrap="nowrap" flexDirection="row">
                <Button icon={<Plus />} text="Create group" onClick={createGroup} />
                <Button icon={<Person />} text="Invite friends" path="/settings/invites" />
                <Button icon={<Apps />} text="Install apps" path="/settings/download" />
            </XView>
        </XView>
    );
});
