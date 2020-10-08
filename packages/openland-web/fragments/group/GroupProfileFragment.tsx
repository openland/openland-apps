import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import copy from 'copy-to-clipboard';

import { useClient } from 'openland-api/useClient';
import { plural } from 'openland-y-utils/plural';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UOrganizationView } from 'openland-web/components/unicorn/templates/UOrganizationView';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { GroupActions } from './components/GroupActions';
import { PremiumBadge } from 'openland-web/components/PremiumBadge';
import { formatMoneyInterval } from 'openland-y-utils/wallet/Money';
import { NotFound } from 'openland-unicorn/NotFound';
import { UListHeroNew } from 'openland-web/components/unicorn/UListHeroNew';
import { ProfileLayout } from 'openland-web/components/ProfileLayout';
import { ShowMoreText } from 'openland-web/fragments/shortname/components/ShowMoreText';
import { ProfileTabsFragment } from 'openland-web/fragments/shortname/components/ProfileTabsFragment';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import AtIcon from 'openland-icons/s/ic-at-24.svg';
import PriceIcon from 'openland-icons/s/ic-tag-price-24.svg';
import IcFeatured from 'openland-icons/s/ic-featured-16.svg';

const listItemWrapper = css`
    width: 250px;
`;

const featuredIcon = css`
    display: var(--featured-icon-display);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-left: 4px;
`;

export const GroupProfileFragment = React.memo<{ id?: string }>((props) => {
    const client = useClient();
    const unicorn = useUnicorn();
    const toastHandlers = useToast();
    const roomId = props.id || unicorn.id;
    const group = client.useRoomChat({ id: roomId }, { fetchPolicy: 'cache-and-network' }).room;

    if (!group || group.__typename === 'PrivateRoom') {
        return <NotFound />;
    }

    const {
        id,
        membersCount,
        photo,
        title,
        description,
        organization,
        isPremium,
        shortname,
        premiumSettings,
        featured,
    } = group;

    const onCopyLinkClick = React.useCallback(() => {
        copy(`https://openland.com/${shortname || id}`, { format: 'text/plain' });

        toastHandlers.show({
            type: 'success',
            text: 'Link copied',
        });
    }, [shortname, id]);

    const descriptionHero = plural(membersCount || 0, ['member', 'members']);

    let price = '';
    if (isPremium && premiumSettings) {
        price = formatMoneyInterval(premiumSettings.price, premiumSettings.interval, true);
    }

    const leftColumn = (
        <UListHeroNew
            title={title}
            titleIcon={isPremium ? <PremiumBadge /> : undefined}
            titleRightIcon={
                featured ? (
                    <div className={featuredIcon}>
                        <UIcon icon={<IcFeatured />} color="var(--accentNegative)" />
                    </div>
                ) : undefined
            }
            description={descriptionHero}
            avatar={{ photo, id, title }}
        >
            <UButton
                text="View group"
                path={`/mail/${id}`}
                size="large"
                shape="square"
                marginRight={16}
            />
            <GroupActions group={group} />
        </UListHeroNew>
    );

    const rightColumn = (
        <>
            {(shortname || price || description) && (
                <UListGroup header="About">
                    {!!description && <ShowMoreText text={description} />}
                    <XView flexDirection="row" flexWrap="wrap" marginTop={8}>
                        {!!shortname && (
                            <UListItem
                                title={shortname}
                                icon={<AtIcon />}
                                useRadius={true}
                                wrapperClassName={listItemWrapper}
                                onClick={onCopyLinkClick}
                            />
                        )}
                        {!!price && (
                            <UListItem
                                title={price}
                                icon={<PriceIcon />}
                                useRadius={true}
                                wrapperClassName={listItemWrapper}
                                interactive={false}
                            />
                        )}
                    </XView>
                </UListGroup>
            )}
            {organization && (
                <UListGroup
                    header={organization.isCommunity ? 'Community' : 'Organization'}
                    marginBottom={16}
                >
                    <UOrganizationView organization={organization} />
                </UListGroup>
            )}
            <ProfileTabsFragment chatId={roomId} group={group} />
        </>
    );

    return (
        <ProfileLayout
            leftColumn={leftColumn}
            rightColumn={rightColumn}
            title={title}
            track="group_profile"
        />
    );
});
