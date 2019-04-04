import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XView } from 'react-mental';

export const TasksFragment = React.memo(() => {
    let userStorage = React.useContext(MessengerContext).userStorage;
    let data = JSON.parse(userStorage.useKeys('app.tasks', ['index.projects']).userStorage[0].value || '[]') as {
        id: string;
        name: string;
    }[];
    let inbox = JSON.parse(userStorage.useKeys('app.tasks', ['index.inbox']).userStorage[0].value || '[]') as {
        id: string;
        name: string;
    }[];
    return (
        <XView flexDirection="column" alignSelf="stretch" alignItems="stretch">
            {inbox.map((v) => (
                <XView key={v.id}>{v.name}</XView>
            ))}
        </XView>
    );
});