import * as React from 'react';
import { UListHeader } from './UListHeader';
import { XView } from 'react-mental';

interface UListGroupProps {
    header?: string;
    counter?: number;
    children?: any;
}

export const UListGroup = (props: UListGroupProps) => {
    const { header, counter, children } = props;
    const components: any[] = [];

    React.Children.forEach(children, (c) => {
        if (c !== null && c !== undefined) {
            components.push(c);
        }
    });

    if (components.length === 0) {
        return null;
    }

    return (
        <XView>
            {!!header && <UListHeader text={header} counter={counter} />}

            <XView>
                {components}
            </XView>
        </XView>
    );
};