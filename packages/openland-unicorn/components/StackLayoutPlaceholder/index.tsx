import React from 'react';
import { XView } from 'react-mental';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { showCreatingFragment } from 'openland-web/fragments/create/CreateEntityFragment';
import { Button } from './button';
import Plus from './plus.svg';
import Person from './person.svg';
import Apps from './apps.svg';

export const StackLayoutPlaceholder = React.memo(() => {
    const createGroup = () => showCreatingFragment({ entityType: 'group' });
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
