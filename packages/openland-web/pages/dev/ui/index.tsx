import '../../../globals';
import * as React from 'react';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { XButtonLike } from '../../../components/X/XButtonLike';
import { XTitle } from '../../../components/X/XTitle';
import { XVertical } from '../../../components/X/XVertical';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { XBullet } from '../../../components/X/XBullet';
import { XSwitcher } from '../../../components/X/XSwitcher';
import { XSlider, XRange } from '../../../components/X/XSlider';
import { XSelect } from '../../../components/X/XSelect';
import { XForm } from '../../../components/X/XForm';
import { XDropdown } from '../../../components/Incubator/XDropdown2';
import { XCardLink } from '../../../components/Incubator/XCardLink';
import { withApp } from '../../../components/withApp';
import { XTooltip } from '../../../components/Incubator/XTooltip';
import { XConfirm } from '../../../components/Incubator/XConfirm';
import { CitySelector } from '../../../components/Incubator/CitySelector';
import { ParcelShortList } from '../../../components/Incubator/ParcelShortList';
import { XTab } from '../../../components/X/XTab';
import { XIcon } from 'openland-x/XIcon';
import { StateSelect } from '../../../api';
import { XHeader } from '../../../components/X/XHeader';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';

export default withApp('UI Framework', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="UI Framework">
            <XTab>
                <XTab.Item path="/ui" asArrow={true}>Inbox</XTab.Item>
                <XTab.Item asArrow={true}>Something</XTab.Item>
                <XTab.Item asArrow={true}>Something</XTab.Item>
                <XTab.Item asArrow={true}>Something</XTab.Item>
                <XTab.Item asArrow={true}>Something</XTab.Item>
                <XTab.Item asArrow={true}>Something</XTab.Item>
                <XTab.Item>Other One</XTab.Item>
            </XTab>

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
                <XCard.Content>
                    <XTitle>Default Button</XTitle>
                    <XVertical>
                        <XForm.DateSingle onDateChange={(date: any) => console.warn(date)} />
                        <XForm.DateRange anyDate={true} />
                        <StateSelect />
                        <XButtonLike />
                        <CitySelector title="San Francisco">
                            <CitySelector.Popper>
                                <button>lol</button>
                            </CitySelector.Popper>
                        </CitySelector>
                        <XTooltip marginLeft={0} placement="left">
                            <XTooltip.Target>
                                <XIcon icon="arrow_left" />
                            </XTooltip.Target>
                            <XTooltip.Content>
                                Openland systems detected that this parcel is too complex for automatical building placement.
                                </XTooltip.Content>
                        </XTooltip>
                        <XTooltip marginLeft={0} title="Openland systems detected that this parcel is too complex for automatical building placement. 222222" />
                        <XConfirm onConfirm={() => { console.warn('confirm function'); }}>
                            <XButton onClick={(e) => { e.preventDefault(); }}>Confirm button</XButton>
                        </XConfirm>
                        <XLinkExternal href="https://goo.gl/urJT1F" />
                        <XSelect
                            name="form-field-name"
                            value={'value'}
                            options={[
                                { value: 'one', label: 'One' },
                                { value: 'two', label: 'Two' },
                            ]}
                        />
                        <XBullet alignSelf="flex-start">bullet</XBullet>
                        <XBullet alignSelf="flex-start" color="red">bullet</XBullet>
                        <XBullet alignSelf="flex-start" color="green">bullet</XBullet>
                        <XBullet alignSelf="flex-start" color="blue">bullet</XBullet>
                        <XBullet alignSelf="flex-start" color="yellow">bullet</XBullet>
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
                        </XSwitcher>
                        <XSlider dots step={5} defaultValue={100} />
                        <XRange dots step={5} defaultValue={[20, 40]} />
                        <XDropdown title="with children">
                            <XCard>
                                <XCard.FormList>
                                    <XCard.FormCell
                                        title="XForm example"
                                        placeholder="Placeholder"
                                        description="Form description"
                                    />
                                </XCard.FormList>
                            </XCard>
                        </XDropdown>
                    </XVertical>
                </XCard.Content>
            </XCard>
            <XCardLink href="https://goo.gl/urJT1F" title="GET /_next/webpack/c14ba59cb321053a0d76" text="DONE  Compiled successfully in 892ms" icon="beach_access" />
            <XCard separators={true}>
                <XHeader
                    text="Loader block title"
                    truncateDescription={true}
                    description="qweqweqweqwe"
                />
                <XCard.Empty icon="remove_shopping_cart" text="empty text">
                    <XLinkExternal href="https://goo.gl/urJT1F" />
                </XCard.Empty>
            </XCard>
            <XCard shadow="medium" href="vk.com" bounce={true}>
                <XCard.Footer text="footer">
                    <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                    <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                </XCard.Footer>
                <XCard.Hint title="test data" />
            </XCard>
            <XCard>
                <XCard.Hint title="test data" />
                <XCard.Warning title="Warning example with hint and button element">
                    <XButton alignSelf="flex-start">Default</XButton>
                </XCard.Warning>
            </XCard>
            <XCard>
                <XForm>
                    <XForm.Header title="x-form title" />
                    <XForm.Field title="x-form-field container test">
                        <XForm.RawInput placeholder="loles" />
                        <XForm.RawSelect options={[{ title: 'qwe1', value: 'qwe1' }, { title: 'qwe2', value: 'qwe2' }, { title: 'qwe3', value: 'qwe3' }]} />
                    </XForm.Field>
                    <XForm.Field title="x-form-field container test" description="If you use your SSN for tax purposes, you can enter that here. Don't have one yet? Apply online. (Sadly, the website has opening hours. Really.)">
                        <XForm.RawInput placeholder="loles" />
                    </XForm.Field>
                </XForm>
                <XForm>
                    <XForm.Header title="x-form title" description={`$ concurrently "yarn sources:watch" "yarn assets:watch" "yarn less:watch" "yarn server"`} />
                    <XForm.Field title="x-form-field container test" description="description text" novalid={true}>
                        <XForm.RawTextarea placeholder="loles" novalid={true} />
                        <XForm.RawInput placeholder="loles" novalid={true} />
                    </XForm.Field>
                </XForm>
            </XCard>
            <XCard separators={true}>
                <XCard.Hint title="test data" />
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
                >
                    <XHeader.Target>
                        <CitySelector title="San Francisco">
                            <CitySelector.Popper>
                                <button>lol</button>
                            </CitySelector.Popper>
                        </CitySelector>
                    </XHeader.Target>
                    <XButton alignSelf="flex-start" style="dark" icon="launch">icon</XButton>
                    <XButton alignSelf="flex-start" style="dark" icon="launch">icon</XButton>
                </XHeader>
                <XCard.Loader loading={true} >
                    <XCard.FormList>
                        <XCard.FormCell
                            title="XForm example"
                            placeholder="Placeholder"
                            description="Form description"
                        />
                    </XCard.FormList>
                    <XCard.Warning title="Warning example with hint and button element">
                        <XButton alignSelf="flex-start">Default</XButton>
                    </XCard.Warning>
                </XCard.Loader>
            </XCard>
            {/* <XCard shadow="medium" loading={true}>
                <XCard.Footer text="footer">
                    <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                    <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                </XCard.Footer>
            </XCard> */}
            <XCard>
                <XCard.FormList>
                    <XCard.FormCell
                        title="XForm example"
                        placeholder="Placeholder"
                        description="Form description"
                    />
                </XCard.FormList>
            </XCard>
        </DevDocsScaffold>
    );
});