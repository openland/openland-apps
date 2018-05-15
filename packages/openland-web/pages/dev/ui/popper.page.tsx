import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XButton } from 'openland-x/XButton';
import { XTitle } from 'openland-x/XTitle';
import { XPopper2 } from 'openland-x/XPopper';

export default withApp('UI Framework - Popper', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Popper">
            <XContent>
                <XVertical>
                    <XTitle>Popper</XTitle>
                    <XVertical>

                        <XPopper2
                            content={`Lorem ipsum dolor sit amet, mei euripidis consequat ad, qui quot dicam recusabo ne, cu pro harum scripta voluptua. Vivendo theophrastus est ut, audire eleifend no sea. Per ei mediocrem expetendis interpretaris, melius aliquam dissentias nam ex. Eum an viris choro honestatis. Recusabo deseruisse definitionem sed no, stet facilis albucius et usu, vitae iuvaret ne est.`}
                            isVisible={true}
                            width={200}
                            placement="right">
                            <XButton text="right | always shown | sliding arrow | width" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={'lorem ipsum'} visibleOnHover={true} placement="left">
                            <XButton text="left | hover" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={'lorem ipsum'} visibleOnHover={true} placement="top">
                            <XButton text="top | hover" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={'lorem ipsum'} visibleOnHover={true} placement="bottom">
                            <XButton text="bottom | hover" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={'lorem ipsum'} isVisible={false}>
                            <XButton text="hiden" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={'lorem ipsum'} isVisible={true} placement="right" padding={20}>
                            <XButton text="padding-left" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={'lorem ipsum'} visibleOnHover={true} placement="right" padding={20}>
                            <XButton text="padding" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={<XButton text="lorem ipsum" />
                        } visibleOnHover={true} placement="right" >
                            <XButton text="reach content" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={<XButton text="lorem ipsum" />} isVisible={true} placement="right">
                            <XButton text="reach content - disable wrap" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={(<XButton text="lorem ipsum" />)} visibleOnHover={true} placement="right" animated={false}>
                            <XButton text="not animated" alignSelf="flex-start" />
                        </XPopper2>

                        {/* <XTitle>Tooltip</XTitle>

                        <NavigationContainer>
                            <XTooltip2 content={<strong>{TextAppBar.items.explore}</strong>} placement="right">
                                <NavigatorItem path="/prospecting" activateForSubpaths={true}>
                                    <NavigatorIcon icon="explore" />
                                </NavigatorItem>
                            </XTooltip2>

                            <XTooltip2 content={<strong>{TextAppBar.items.explore}</strong>} placement="right">
                                <NavigatorItem path="/prospecting" activateForSubpaths={true}>
                                    <NavigatorIcon icon="search" />
                                </NavigatorItem>
                            </XTooltip2>

                            <XTooltip2 content={<strong>{TextAppBar.items.explore}</strong>} placement="right">
                                <NavigatorItem path="/prospecting" activateForSubpaths={true}>
                                    <NavigatorIcon icon="work" />
                                </NavigatorItem>
                            </XTooltip2>

                            <XTooltip2 content={<strong>{TextAppBar.items.explore}</strong>} placement="right">
                                <NavigatorItem path="/prospecting" activateForSubpaths={true}>
                                    <NavigatorIcon icon="sort" />
                                </NavigatorItem>
                            </XTooltip2>
                        </NavigationContainer> */}

                    </XVertical>

                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});