import '../../../globals';
import * as React from 'react';
import { XCard } from 'openland-x/XCard';
import { XVertical } from 'openland-x-layout/XVertical';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XSelect } from 'openland-x/XSelect';
import { withApp } from '../../../components/withApp';
import { XTooltip } from '../../../components/Incubator/XTooltip';
import { ParcelShortList } from '../../../components/Incubator/ParcelShortList';
import { XIcon } from 'openland-x/XIcon';
import { XHeader } from 'openland-x/XHeader';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XEmpty } from 'openland-x/XEmpty';
import { XBanner } from 'openland-x/XBanner';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { XLoader } from 'openland-x/XLoader';

export default withApp('UI Framework', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="UI Framework">
            <XCard shadow="medium">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <ParcelShortList>
                        <ParcelShortList.Item title="Parcel #0859013" adress="Parcel Address" info="154,341ft², Parking lot, Residential" path="/ui" />
                        <ParcelShortList.Item title="Parcel #0859013" adress="Parcel Address" info="154,341ft², Parking lot, Residential" />
                        <ParcelShortList.Item title="Parcel #0859013" adress="Parcel Address" info="154,341ft², Parking lot, Residential" />
                        <ParcelShortList.Item title="Parcel #0859013" adress="Parcel Address" info="154,341ft², Parking lot, Residential" />
                        <ParcelShortList.Item title="Parcel #0859013" adress="Parcel Address" info="154,341ft², Parking lot, Residential" />
                    </ParcelShortList>
                </div>
            </XCard>
            <XCard asRow={true}>
                <div>qwe</div>
            </XCard>
            <XCard>
                <XContent>
                    <XTitle>Default Button</XTitle>
                    <XVertical>
                        <XTooltip marginLeft={0} placement="left">
                            <XTooltip.Target>
                                <XIcon icon="arrow_left" />
                            </XTooltip.Target>
                            <XTooltip.Content>
                                Openland systems detected that this parcel is too complex for automatical building placement.
                                </XTooltip.Content>
                        </XTooltip>
                        <XTooltip marginLeft={0} title="Openland systems detected that this parcel is too complex for automatical building placement. 222222" />
                        <XLinkExternal href="https://goo.gl/urJT1F" />
                        <XSelect
                            name="form-field-name"
                            value={'value'}
                            options={[
                                { value: 'one', label: 'One' },
                                { value: 'two', label: 'Two' },
                            ]}
                        />
                        <XSwitcher alignSelf="flex-start">
                            <XSwitcher.Item path="/ui">first</XSwitcher.Item>
                            <XSwitcher.Item>second</XSwitcher.Item>
                            <XSwitcher.Item>third</XSwitcher.Item>
                            <XSwitcher.Item>fourth</XSwitcher.Item>
                        </XSwitcher>
                        <XSwitcher alignSelf="flex-start" fieldStyle={true}>
                            <XSwitcher.Item path="/ui">first</XSwitcher.Item>
                            <XSwitcher.Item>second</XSwitcher.Item>
                            <XSwitcher.Item>third</XSwitcher.Item>
                            <XSwitcher.Item>fourth</XSwitcher.Item>
                        </XSwitcher>
                        <XSwitcher alignSelf="flex-start" flatStyle={true}>
                            <XSwitcher.Item path="/ui" count={0}>first</XSwitcher.Item>
                            <XSwitcher.Item count={100}>second</XSwitcher.Item>
                            <XSwitcher.Item count={80}>third</XSwitcher.Item>
                            <XSwitcher.Item count={3}>fourth</XSwitcher.Item>
                        </XSwitcher>>
                    </XVertical>
                </XContent>
            </XCard>
            <XCard separators={true}>
                <XHeader
                    text="Loader block title"
                    truncateDescription={true}
                    description="qweqweqweqwe"
                />
                <XEmpty icon="remove_shopping_cart" text="empty text">
                    <XLinkExternal href="https://goo.gl/urJT1F" />
                </XEmpty>
            </XCard>
            <XCard separators={true}>
                <XBanner title="test data" />
                <XHeader
                    truncateDescription={true}
                    description={`
                        $ concurrently "yarn sources:watch" "yarn assets:watch" "yarn less:watch" "yarn server"
                        $ ./node_modules/typescript/bin/tsc --watch
                        $ yarn cpx "./src/static/**/*" ./build/dist/static/ --watch
                        $ yarn less-watch-compiler --minified false src/less build/dist/static/css style.less
                        $ node ./build/dist/server.js
                        $ /Users/max_volkov/Desktop/statecraft-web/node_modules/.bin/less-watch-compiler --minified false src/less build/dist/static/css style.less
                        $ /Users/max_volkov/Desktop/statecraft-web/node_modules/.bin/cpx './src/static/**/*' ./build/dist/static/ --watch
                        `}
                />
                <XLoader loading={true} >
                    <XServiceMessage title="Warning example with hint and button element" />
                </XLoader>
            </XCard>
        </DevDocsScaffold>
    );
});