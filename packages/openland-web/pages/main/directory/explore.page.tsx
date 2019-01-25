import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { DirectoryUniversalNavigation } from './components/DirectoryUniversalNavigation';
import { XView } from 'react-mental';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { withAvailableRooms } from 'openland-web/api/withAvailableRooms';
import { AvailableRooms_rooms_SharedRoom } from 'openland-api/Types';

const Rooms = withAvailableRooms(
    withQueryLoader(props => {
        return (
            <>
                {props.data.rooms
                    .filter(v => v.__typename === 'SharedRoom')
                    .map(v => v as AvailableRooms_rooms_SharedRoom)
                    .filter((a, i, s) => s.findIndex(v => v.id === a.id) === i)
                    .filter(v => v.membersCount && v.membersCount > 0)
                    .sort((a, b) => {
                        if (b.membersCount === a.membersCount) {
                            return a.title.localeCompare(b.title);
                        }
                        return b.membersCount! - a.membersCount!;
                    })
                    .map(v => (
                        <XView as="a" path={'/mail/' + v.id} key={v.id}>
                            {v.title} ({v.membersCount + ''}/{v.membership})
                        </XView>
                    ))}
            </>
        );
    }),
);

export default withApp('Explore', 'viewer', () => {
    return (
        <DirectoryUniversalNavigation title={'Explore'}>
            <Rooms />
        </DirectoryUniversalNavigation>
    );
});
