import * as React from 'react';
import { XView } from 'react-mental';

interface UListHeaderProps {
    text: string;
    counter?: string | number;
}

export const UListHeader = (props: UListHeaderProps) => {
    const { text, counter } = props;

    return (
        <XView marginTop={16} height={48} fontSize={17} lineHeight="48px" paddingHorizontal={16} fontWeight="600">
            {text}

            {!!counter && (
                <XView>
                    {counter}
                </XView>
            )}
        </XView>
    );
};