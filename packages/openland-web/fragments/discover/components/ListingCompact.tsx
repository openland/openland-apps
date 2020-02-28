import React from 'react';
import { XView } from 'react-mental';
import { RoomShort_SharedRoom } from 'openland-api/spacex.types';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { TextTitle3 } from 'openland-web/utils/TextStyles';

interface ListingCompactProps {
    title?: string;
    items: RoomShort_SharedRoom[];
}

export const ListingCompact = React.memo((props: ListingCompactProps) => {
    return (
        <XView marginTop={16} paddingHorizontal={16}>
            {props.title && (
                <XView marginBottom={12}>
                    <h2 className={TextTitle3}>
                        {props.title}
                    </h2>
                </XView>
            )}
            <XView marginLeft={-16} marginRight={-16}>
                {props.items.map(item => (
                    <UGroupView
                        key={'group-' + item.id}
                        group={item as RoomShort_SharedRoom}
                    />
                ))}
            </XView>
        </XView>
    );
});
