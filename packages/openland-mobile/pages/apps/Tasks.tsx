import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { View } from 'react-native';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { PromptBuilder } from 'openland-mobile/components/Prompt';
import { randomKey } from 'openland-graphql/utils/randomKey';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZListItem } from 'openland-mobile/components/ZListItem';

const Tasks = React.memo(() => {
    let userStorage = getMessenger().engine.userStorage;
    let data = JSON.parse(userStorage.useKeys('app.tasks', ['index.projects']).userStorage[0].value || '[]') as {
        id: string;
        name: string;
    }[];
    let callback = React.useCallback(() => {
        new PromptBuilder()
            .callback((value) => {
                userStorage.setKeys('app.tasks', [{
                    key: 'index.projects',
                    value: JSON.stringify([...data, {
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
                {data.map((v) => (
                    <ZListItem key={v.id} text={v.name} description="project" />
                    // <View key={v.id} width={100} height={100} backgroundColor="red">
                    //     <ZText text={v.name} />
                    // </View>
                ))}
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