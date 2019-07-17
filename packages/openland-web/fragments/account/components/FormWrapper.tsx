import * as React from 'react';
import { XView } from 'react-mental';
import { XText, Mode } from 'openland-web/components/XText';

export const FormWrapper = ({ title, children }: { title: string; children: any }) => {
    return (
        <XView
            marginTop={12}
            justifyContent="center"
            alignSelf="center"
            flexDirection="row"
            paddingBottom={40}
            paddingHorizontal={16}
            maxWidth={480}
            width="100%"
        >
            <XView flexDirection="column" flexGrow={1}>
                {/* <XView marginBottom={40}>
                    <XText mode={Mode.TitleOne}>{title}</XText>
                </XView> */}
                {children}
            </XView>
        </XView>
    );
};
