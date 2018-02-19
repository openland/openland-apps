import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { XGrid } from '../../../components/X/XGrid';
import { XCell } from '../../../components/X/XGrid';
import { XCard } from '../../../components/X/XCard';
import { XButton, XButtonLike } from '../../../components/X/XButton';
import { XTitle } from '../../../components/X/XTitle';
import { XVertical } from '../../../components/X/XVertical';
import { XLinkExternal } from '../../../components/X/XLinkExternal';
import { XView } from '../../../components/X/XView';
import { XBullet } from '../../../components/X/XBullet';
import { XSwitcher } from '../../../components/X/XSwitcher';
import { XSlider } from '../../../components/X/XSlider';
import { XSelect } from '../../../components/X/XSelect';
import { XForm } from '../../../components/X/XForm2';
import { Title, Text } from '../../../components/Incubator/XRowsExample';
import { withApp } from '../../../components/App/withApp';
import { AppContent } from '../../../components/App/AppContent';

export default withApp((props) => {
    return (
        <>
            <XHead title="San Francisco Housing Analytics" />
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
                            <XLinkExternal path="https://goo.gl/urJT1F" />
                            <XSelect 
                                name="form-field-name"
                                value={'value'}
                                options={[
                                    { value: 'one', label: 'One' },
                                    { value: 'two', label: 'Two' },
                                ]}
                            />
                            <XBullet title="bullet" alignSelf="flex-start" />
                            <XBullet title="bullet" alignSelf="flex-start" color="red" />
                            <XBullet title="bullet" alignSelf="flex-start" color="green" />
                            <XBullet title="bullet" alignSelf="flex-start" color="blue" />
                            <XBullet title="bullet" alignSelf="flex-start" color="yellow" />
                            <XSwitcher alignSelf="flex-start">
                                <XSwitcher.Item path="/app/ui">first</XSwitcher.Item>
                                <XSwitcher.Item>second</XSwitcher.Item>
                                <XSwitcher.Item>third</XSwitcher.Item>
                                <XSwitcher.Item>fourth</XSwitcher.Item>
                            </XSwitcher>
                            <XSlider>
                                <XSlider.Slider />
                            </XSlider>
                            <XSlider>
                                <XSlider.Range />
                            </XSlider>
                        </XVertical>
                    </XCard.Content>
                </XCard>
                <XCard shadow="medium">
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
                            <XForm.Input placeholder="loles"/>
                            <XForm.Select options={[{title: 'qwe1', value: 'qwe1'}, {title: 'qwe2', value: 'qwe2'}, {title: 'qwe3', value: 'qwe3'}]} />
                        </XForm.Field>
                        <XForm.Field title="x-form-field container test" description="If you use your SSN for tax purposes, you can enter that here. Don't have one yet? Apply online. (Sadly, the website has opening hours. Really.)">
                            <XForm.Input placeholder="loles" />
                        </XForm.Field>
                    </XForm>
                    <XForm>
                        <XForm.Header title="x-form title" description={`$ concurrently "yarn sources:watch" "yarn assets:watch" "yarn less:watch" "yarn server"`} />
                        <XForm.Field title="x-form-field container test" description="description text" novalid={true}>
                            <XForm.Textarea placeholder="loles" novalid={true} />
                            <XForm.Input placeholder="loles" novalid={true} />
                        </XForm.Field>
                    </XForm>
                </XCard>
                <XCard separators={true}>
                    <XCard.Hint title="test data" />
                    <XCard.Header 
                        title="Loader block title" 
                        ellipcise={true}
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
                <XCard>
                    <XCard.Content>
                        <XView>
                            <Title>Example title</Title>
                            <XView>
                                <Text>Example text</Text>
                                <a style={{ color: '#6638F0' }}>example description column child components</a>
                            </XView>
                        </XView>
                        <XView>
                            <XView justifyContent="space-between" direction="row" alignItems="center">
                                <Title>Example title with button</Title>
                                <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                            </XView>
                            <XView>
                                <Text>
                                    Example text
                                <a style={{ color: '#6638F0' }}>example description inline child components</a>
                                </Text>
                            </XView>
                        </XView>
                        <XView justifyContent="space-between" direction="row">
                            <Text>Footer example with two buttons</Text>
                            <XView justifyContent="space-between" direction="row" childWhiteSpace={true}>
                                <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                                <XButton alignSelf="flex-start" style="dark">Bordered</XButton>
                            </XView>
                        </XView>
                    </XCard.Content>
                </XCard>
            </AppContent>
        </>
    );
});