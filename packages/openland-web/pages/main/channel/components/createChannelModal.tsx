import * as React from 'react';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XInput } from 'openland-x/XInput';

export const CreateChannelModal = (props: XModalFormProps) => (
    <XModalForm
        {...props}
        useTopCloser={true}
        title="Create channel"
        defaultAction={() => null}
        defaultData={{
            input: {
                name: ''
            }
        }}
        submitBtnText="Create channel"
    >
        <XInput
            flexGrow={1}
            size="r-default"
            color="primary-sky-blue"
            placeholder="r-default"
            field="input.name"
        />
    </XModalForm>
);