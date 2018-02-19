import * as React from 'react';
import Glamorous from 'glamorous';
import { XDocumentAppRootFullScreen } from '../X/Scaffold/XDocumentRoot';
import { AppSidebar } from './AppSidebar';
import { XHead } from '../X/XHead';
import { XSlider } from '../X/XSlider';
import { XSelect } from '../X/XSelect';
import { XVertical } from '../X/XVertical';
import { XMapLight } from '../X/XMapLight';
import { AppHeader } from './AppHeader';
import { AppNavigation } from './AppNavigation';

const ClassicalWrapper = Glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1,
});
const ClassicalContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',

    minWidth: '1020px',
    maxWidth: '1400px',
    minHeight: '100vh',

    marginLeft: 'auto',
    marginRight: 'auto',
    pointerEvents: 'none'
})

const MapContainer = Glamorous.div({
    alignSelf: 'stretch',
    flexGrow: 1,
    minWidth: '1020px'
})

const FilterContainer = Glamorous.div({
    display: 'flex',
    alignSelf: 'flex-end',
    flexDirection: 'column',
    width: 208,
    padding: 8,
    pointerEvents: 'auto',
    backgroundColor: 'rgb(245, 246, 248)',
    boxShadow: '0 7px 14px 0 rgba(50,50,93,.1), 0 3px 6px 0 rgba(0,0,0,.07)',
    borderRadius: 4,
    '& > div > div > span': {
        display: 'block',
        marginBottom: 3
    }
})

let Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
    paddingLeft: '16px',
    paddingRight: '32px',
    paddingBottom: '32px'
})

export class AppContentMap extends React.Component {
    render() {
        return (
            <XDocumentAppRootFullScreen>
                <XHead title="Dashboard" />

                <MapContainer>
                    <XMapLight mapStyle={'mapbox://styles/mapbox/light-v9'}>
                        {this.props.children}
                    </XMapLight>
                </MapContainer>

                <ClassicalWrapper>
                    <ClassicalContainer>
                        <AppSidebar asOverlay={true}>
                            <AppNavigation />
                        </AppSidebar>
                        <Container>
                            <XVertical>
                                <AppHeader />
                                <FilterContainer>
                                    <XVertical>
                                        <div>
                                        <span>Zoning</span>
                                            <div>
                                                <XSelect 
                                                    name="form-field-name"
                                                    value={'value'}
                                                    options={[
                                                        { value: 'one', label: 'One' },
                                                        { value: 'two', label: 'Two' },
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <span>Area</span>
                                            <XSlider>
                                                <XSlider.Slider />
                                            </XSlider>
                                        </div>
                                    </XVertical>
                                </FilterContainer>
                            </XVertical>
                        </Container>
                    </ClassicalContainer>
                </ClassicalWrapper>
            </XDocumentAppRootFullScreen>
        );
    }
}