import * as React from 'react';
import { XView } from 'react-mental';
import { withAppProfile } from 'openland-web/api/withAppProfile';
import { AppFull } from 'openland-api/Types';
import { XButton } from 'openland-x/XButton';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { TextProfiles } from 'openland-text/TextProfiles';
import { SearchCardsOrShowProfile } from 'openland-web/pages/main/directory/components/DirectoryNavigation';
import { RoomsWithSort } from 'openland-web/fragments/RoomsExploreComponent';
import { XViewRouterContext } from 'react-mental';

const { App } = TextProfiles;

export const AddBotToChat = withAppProfile(({ addAppToChat, apps, router: { query } }) => {
    let router = React.useContext(XViewRouterContext);
    let [app] = apps.filter((a: AppFull) => a.id === query.addBotToChat || '');

    if (!app) {
        return null;
    }

    const RoomsWithAddToChatButton = React.memo((props: any) => {
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

                                addAppToChat({
                                    variables: {
                                        appId: app.id,
                                        chatId: xRoomCardProps.room.id,
                                    },
                                });
                                // hack to navigate after modal closing navigation
                                setTimeout(() => {
                                    router!.navigate(`/mail/${xRoomCardProps.room.id}`);
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
                    searchPlaceholder={'Search rooms'}
                    noQueryText={'Featured rooms'}
                    hasQueryText={'Rooms'}
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
}) as React.ComponentType<{
    apps: AppFull[];
}>;
