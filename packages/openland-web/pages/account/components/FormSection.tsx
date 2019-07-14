import * as React from 'react';
import { XView } from 'react-mental';
import { XText, Mode } from 'openland-web/components/XText';

export const FormSection = ({ title, children }: { title: string; children: any }) => {
    return (
        <XView marginBottom={16}>
            <XView height={48} flexDirection="row" alignItems="center">
                <XText mode={Mode.TitleTwo}>{title}</XText>
            </XView>
            {children}
        </XView>
    );
};
