import * as React from 'react';
import { XView } from 'react-mental';
import { XText, Mode } from 'openland-web/components/XText';

export const FormWrapper = ({ title, children }: { title: string; children: any }) => {
    return (
        <XView justifyContent="center" alignItems="center" alignSelf="center">
            <XView flexDirection="column">
                <XText mode={Mode.TitleOne}>{title}</XText>

                {children}
            </XView>
        </XView>
    );
};
