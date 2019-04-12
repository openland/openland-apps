import * as React from 'react';
import { XView } from 'react-mental';
import { AppFull } from 'openland-api/Types';
import { XButton } from 'openland-x/XButton';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { TextProfiles } from 'openland-text/TextProfiles';
import { SearchCardsOrShowProfile } from 'openland-web/pages/main/directory/components/DirectoryNavigation';
import { RoomsWithSort } from 'openland-web/fragments/RoomsExploreComponent';
import { XMemo } from 'openland-y-utils/XMemo';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

const { App } = TextProfiles;

export const AddBotToChat = ({ apps }: { apps: AppFull[] }) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    let [app] = apps.filter((a: AppFull) => a.id === router.query.addBotToChat || '');

    if (!app) {
        return null;
    }

    const RoomsWithAddToChatButton = XMemo((props: any) => {
        return (
            <RoomsWithSort
                {...props}
                CustomButtonComponent={(xRoomCardProps: any) => {
                    return (
                        <XButton
                            text={'Add'}
                            flexShrink={0}
                            style={'primary'}
                            onClick={(e: any) => {
                                e.stopPropagation();

                                client.mutateAddAppToChat({
                                    appId: app.id,
                                    chatId: xRoomCardProps.room.id,
                                });
                                // hack to navigate after modal closing navigation
                                setTimeout(() => {
                                    router!.push(`/mail/${xRoomCardProps.room.id}`);
                                });
                            }}
                        />
                    );
                }}
                customMenu={null}
            />
        );
    });

    return (
        <XModalForm
            customFooter={null}
            title={App.addBotToChat}
            targetQuery="addBotToChat"
            defaultData={{}}
            defaultAction={() => {
                //
            }}
        >
            <XView flexDirection="column">
                <SearchCardsOrShowProfile
                    CardsComponent={RoomsWithAddToChatButton}
                    searchPlaceholder={'Search groups'}
                    noQueryText={'Featured groups'}
                    hasQueryText={'Groups'}
                    sortOptions={{
                        label: 'Sort by',
                        values: [
                            { label: 'Members count', value: 'membersCount' },
                            { label: 'Creation date', value: 'createdAt' },
                        ],
                    }}
                />
            </XView>
        </XModalForm>
    );
};
