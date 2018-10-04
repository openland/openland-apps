import * as React from 'react';
import Glamroos from 'glamorous';
import { withApp } from '../../components/withApp';
import { withOnlineUsers } from '../../api/withOnlineUsers';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { withQueryLoader } from '../../components/withQueryLoader';
import { XMap } from 'openland-x-map/XMap';
import { XMapPointLayer } from 'openland-x-map/XMapPointLayer';
import { XMapSource } from 'openland-x-map/XMapSource';

const Wrapper = Glamroos.div({
    flexGrow: 1,
    flexBasis: 0,
    height: '100vh'
});

export default withApp('Super Organizations', 'super-admin', withOnlineUsers(withQueryLoader((props) => {
    let convertedSource = {
        'type': 'FeatureCollection',
        'features': props.data.onlineUsers
            .filter((v) => !!v.location && !!v.location.coordinates)
            .map((v) => ({
                type: 'Feature',
                'geometry': { type: 'Point', coordinates: [v.location!!.coordinates!!.longitude, v.location!!.coordinates!!.latitude] },
                properties: {
                    'id': v.user.id
                }
            }))
    };
    return (
        <DevToolsScaffold title="Users" padding={false}>
            <Wrapper>
                <XMap focusPosition={{ latitude: 0, longitude: 0, zoom: 1.5 }}>
                    <XMapSource
                        id="online-users"
                        data={convertedSource}
                        cluster={true}
                    />
                    <XMapPointLayer source="online-users" layer="online-users" color="#ff0000" />
                </XMap>
            </Wrapper>
            {/* <XHeader text="Online users" />
            <XTable>
                <XTable.Body>
                    {props.data.onlineUsers.map(u => (
                        <XTable.Row>
                            <XTable.Cell width={100}>
                                <XAvatar cloudImageUuid={u.user.photo || undefined} />
                            </XTable.Cell>
                            <XTable.Cell width={400}>
                                <XText>{u.user.name}</XText>
                            </XTable.Cell>
                            <XTable.Cell>
                                <XText>{u.location!!.locationName}</XText>
                            </XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable> */}
        </DevToolsScaffold>
    );
})));