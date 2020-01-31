import * as React from 'react';
import { UListHeader } from './UListHeader';
import { XView } from 'react-mental';

interface UListGroupProps {
    header?: string;
    counter?: number;
    marginTop?: number;
    marginBottom?: number;
    action?: {
        title: string;
        path?: string;
        onClick?: () => void;
    };
    padded?: boolean;
    children?: any;
}

export const UListGroup = (props: UListGroupProps) => {
    const { header, counter, action, children, marginTop, marginBottom } = props;
    const components: any[] = [];

    React.Children.forEach(children, c => {
        if (c !== null && c !== undefined) {
            components.push(c);
        }
    });

    if (components.length === 0) {
        return null;
    }

    return (
        <XView marginTop={marginTop} marginBottom={marginBottom}>
            {!!header && <UListHeader text={header} counter={counter} action={action} padded={props.padded} />}

            <XView>{components}</XView>
        </XView>
    );
};
