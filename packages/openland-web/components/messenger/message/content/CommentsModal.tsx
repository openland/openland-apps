import * as React from 'react';
import { XView } from 'react-mental';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XVertical } from 'openland-x-layout/XVertical';

export const CommentsModal = () => {
    return (
        <XModalForm
            title={'TITLE'}
            targetQuery="comments"
            defaultData={{
                input: {},
            }}
            defaultAction={async ({ input }) => {
                console.log(input);
                //
            }}
        >
            <XView flexDirection="row" marginBottom={16}>
                <XView flexGrow={1} paddingLeft={16}>
                    <XVertical>Modal with SMTH!!!</XVertical>
                </XView>
            </XView>
        </XModalForm>
    );
};
