import '../../globals';
import * as React from 'react';
import { XHead } from '../../components/X/XHead';
import { XGrid } from '../../components/X/XGrid';
import { XCell } from '../../components/X/XGrid';
import { XCard } from '../../components/X/XCard';
import { XButton, XButtonLike } from '../../components/X/XButton';
import { XTitle } from '../../components/X/XTitle';
import { XVertical } from '../../components/X/XVertical';
import { XLinkExternal } from '../../components/X/XLinkExternal';
import { XBullet } from '../../components/X/XBullet';
import { XSwitcher } from '../../components/X/XSwitcher';
import { XSlider, XRange } from '../../components/X/XSlider';
import { XSelect } from '../../components/X/XSelect';
import { XForm } from '../../components/X/XForm';
import { XDropdown } from '../../components/Incubator/XDropdown'
import { XCardLink } from '../../components/Incubator/XCardLink';
import { withApp } from '../../components/withApp';
import { AppContent } from '../../components/App/AppContent';

export default withApp('viewer', (props) => {
    return (
        <>
            <XHead title={['UI Framework']} />
            <AppContent>
                <XCard>
                    <XCard.Content>
                        <XGrid
                            layouts={{
                                templateAreas: [
                                    ['sidebar', 'header', 'header'],
                                    ['sidebar', 'footer', 'footer']
                                ],
                                'xs': {
                                    templateAreas: [
                                        ['header', 'sidebar'],
                                        ['header', 'sidebar'],
                                        ['footer', 'sidebar']
                                    ],
                                },
                                'sm': {
                                    templateAreas: [
                                        ['sidebar', 'sidebar'],
                                        ['header', 'header'],
                                        ['footer', 'footer']
                                    ],
                                }
                            }}
                        >
                            <XCell area="sidebar">
                                Sidebar
                        </XCell>
                            <XCell area="header">
                                Header
                        </XCell>
                            <XCell area="footer">
                                Footer
                        </XCell>
                        </XGrid>
                    </XCard.Content>
                </XCard>
                <XCard>
                    <XCard.Content>
                        <XTitle>Default Button</XTitle>
                        <XVertical>
                            <XButtonLike />
                            <XButton alignSelf="flex-start">Default</XButton>
                            <XButton alignSelf="flex-start" style="dark" disabled={true}>Bordered</XButton>

                            <XButton alignSelf="flex-start" style="dark" icon="launch">icon</XButton>
                            <XButton alignSelf="flex-start" icon="close" />

                            <XButton alignSelf="flex-start" style="dark" size="large">Large</XButton>
                            <XButton alignSelf="flex-start" style="dark" size="large" bounce={true} disabled={true}>Bounce</XButton>
                            <XButton alignSelf="flex-start" style="important">Important</XButton>
                            <XButton alignSelf="flex-start" loading={true} />
                            <XButton alignSelf="flex-start" loading={true} disabled={true}>Loading</XButton>
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
                            <XSlider dots step={5} defaultValue={100} />
                            <XRange dots step={5} defaultValue={[20, 40]} />
                            <XDropdown title="select users" options={[{ title: 'qwe1', value: 'qwe1' }, { title: 'qwe2', value: 'qwe2' }, { title: 'qwe3', value: 'qwe3' }, { title: 'qwe1', value: 'qwe1' }, { title: 'qwe2', value: 'qwe2' }, { title: 'qwe3', value: 'qwe3' }, { title: 'qwe1', value: 'qwe1' }, { title: 'qwe2', value: 'qwe2' }, { title: 'qwe3', value: 'qwe3' }]}/>
                        </XVertical>
                    </XCard.Content>
                </XCard>
                <XCardLink href="https://goo.gl/urJT1F" title="GET /_next/webpack/c14ba59cb321053a0d76" text="DONE  Compiled successfully in 892ms" icon="beach_access" />
                <XCard separators={true}>
                    <XCard.Header
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
                    <XCard.Header
                        text="Loader block title"
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
                        <XCard.Header.Target>
                            <XButtonLike />
                        </XCard.Header.Target>
                        <XButton alignSelf="flex-start" style="dark" icon="launch">icon</XButton>
                        <XButton alignSelf="flex-start" style="dark" icon="launch">icon</XButton>
                    </XCard.Header>
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
                <XCard shadow="medium" loading={true}>
                    <XCard.Footer text="footer">
                        <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                        <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                    </XCard.Footer>
                </XCard>
                <XCard>
                    <XCard.FormList>
                        <XCard.FormCell
                            title="XForm example"
                            placeholder="Placeholder"
                            description="Form description"
                        />
                    </XCard.FormList>
                </XCard>
            </AppContent>
        </>
    );
});