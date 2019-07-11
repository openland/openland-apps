import * as React from 'react';
import { XView } from 'react-mental';
import { XText, Mode } from 'openland-web/components/XText';

export const FormWrapper = ({ title, children }: { title: string; children: any }) => {
    return (
        <XView marginTop={12} justifyContent="center" alignItems="center" alignSelf="center">
            <XView flexDirection="column">
                <XView marginBottom={40}>
                    <XText mode={Mode.TitleOne}>{title}</XText>
                </XView>

                {children}
            </XView>
        </XView>
    );
};
