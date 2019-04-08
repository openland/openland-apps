import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { PromptBuilder } from 'openland-mobile/components/Prompt';
import { randomKey } from 'openland-graphql/utils/randomKey';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';

const Tasks = React.memo(() => {
    let userStorage = getMessenger().engine.userStorage;
    let data = JSON.parse(userStorage.useKeys('app.tasks', ['index.projects']).userStorage[0].value || '[]') as {
        id: string;
        name: string;
    }[];
    let inbox = JSON.parse(userStorage.useKeys('app.tasks', ['index.inbox']).userStorage[0].value || '[]') as {
        id: string;
        name: string;
    }[];
    let callback = React.useCallback(() => {
        new PromptBuilder()
            .callback((value) => {
                userStorage.setKeys('app.tasks', [{
                    key: 'index.inbox',
                    value: JSON.stringify([...inbox, {
                        id: randomKey(),
                        name: value
                    }])
                }])
            })
            .title('New project')
            .show();
        //
    }, [data]);

    return (
        <>
            <SHeaderButton title="Create" onPress={callback} />
            <SScrollView>
                <ZListItemGroup header="Projects">
                    {data.map((v) => (
                        <ZListItem
                            key={v.id}
                            text={v.name}
                            description="project"
                            onLongPress={() => {
                                let builder = new AlertBlanketBuilder();
                                builder.button('Cancel', 'cancel');
                                builder.action('Delete', 'destructive', () => {
                                    userStorage.setKeys('app.tasks', [{
                                        key: 'index.projects',
                                        value: JSON.stringify(data.filter((v2) => v.id !== v2.id))
                                    }])
                                });
                                builder.title('Are you sure want to delete ' + v.name + '?')
                                builder.show();
                            }}
                        />
                    ))}
                </ZListItemGroup>

                <ZListItemGroup header="Tasks" actionRight={{ title: '+ add', onPress: callback }}>
                    {inbox.map((v) => (
                        <ZListItem
                            key={v.id}
                            text={v.name}
                            description="task"
                            onLongPress={() => {
                                let builder = new AlertBlanketBuilder();
                                builder.button('Cancel', 'cancel');
                                builder.action('Delete', 'destructive', () => {
                                    userStorage.setKeys('app.tasks', [{
                                        key: 'index.inbox',
                                        value: JSON.stringify(inbox.filter((v2) => v.id !== v2.id))
                                    }])
                                });
                                builder.title('Are you sure want to delete ' + v.name + '?')
                                builder.show();
                            }}
                        />
                    ))}
                </ZListItemGroup>
            </SScrollView>
        </>
    );
});

Tasks.displayName = 'Tasks';

export default withApp(() => {
    return (
        <>
            <SHeader title="Tasks" />
            <React.Suspense fallback={<ZLoader />}>
                <Tasks />
            </React.Suspense>
        </>
    );
});