import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XFormField } from 'openland-x-forms/XFormField';
import { XTextArea } from 'openland-x/XTextArea';
import { randomKey } from 'openland-graphql/utils/randomKey';

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

    let [newTaskModal, setNewTaskModal] = React.useState(false);

    const newTask = (
        <XModalForm
            title="Create task"
            defaultAction={async src => {
                await userStorage.setKeys('app.tasks', [{
                    key: 'index.inbox',
                    value: JSON.stringify([...inbox, {
                        id: randomKey(),
                        name: src.name
                    }])
                }]);
                // await client.mutateFeedPost({ message: src.message });
                // await client.refetchFeedHome();
            }}
            onClosed={() => setNewTaskModal(false)}
            isOpen={newTaskModal}
        >
            <XFormField field="name">
                <XTextArea
                    minHeight={240}
                    placeholder="What do you need?"
                    resize={false}
                    valueStoreKey="fields.name"
                    autofocus={true}
                />
            </XFormField>
        </XModalForm>
    )

    return (
        <XView flexDirection="column" alignSelf="stretch" alignItems="stretch" paddingTop={32} paddingLeft={16} paddingRight={16} paddingBottom={64}>
            {newTask}
            <XView flexDirection="row" justifyContent="center" paddingVertical={12}>
                <XView maxWidth={800}>
                    <XButton
                        text="New"
                        onClick={() => {
                            setNewTaskModal(true)
                        }}
                    />
                </XView>
            </XView>
            {inbox.map((v) => (
                <XView flexDirection="row" justifyContent="center" paddingVertical={12}>
                    <XView
                        cursor="pointer"
                        maxWidth={800}
                        flexGrow={1}
                        flexShrink={1}
                        flexDirection="column"
                        alignItems="stretch"
                        backgroundColor="white"
                        // opacity={1}
                        // hoverOpacity={0.6}
                        borderRadius={16}
                        paddingVertical={8}
                        paddingHorizontal={16}
                        onClick={() => {
                            userStorage.setKeys('app.tasks', [{
                                key: 'index.inbox',
                                value: JSON.stringify(inbox.filter((v2) => v.id !== v2.id))
                            }])
                        }}
                    >
                        <XView fontSize={18} lineHeight="20px" key={v.id}>{v.name}</XView>
                    </XView>
                </XView>
            ))}
        </XView>
    );
});