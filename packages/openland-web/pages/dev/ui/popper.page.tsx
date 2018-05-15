import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XButton } from 'openland-x/XButton';
import { XTitle } from 'openland-x/XTitle';
import { XPopper2 } from '../../../components/Incubator/XPopper2';
import { XTooltip2 } from '../../../components/Incubator/XTooltip2';
import Glamorous from 'glamorous';
import { XIcon } from 'openland-x/XIcon';
import { XLink } from 'openland-x/XLink';
import { TextAppBar } from 'openland-text/TextAppBar';

const NavigatorIcon = Glamorous(XIcon)({
    fontSize: '28px',
    textAlign: 'center'
});

const NavigatorItem = Glamorous(XLink)({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: '16px',
    paddingBottom: '16px',
    flexShrink: 0,
    color: '#000000',
    cursor: 'pointer',
    '.is-active': {
        color: '#522BFF',
        '& > .reports .hover': {
            display: 'block'
        },
        '& > .reports .no-hover': {
            display: 'none'
        },
    },
    '&:hover': {
        color: '#522BFF',
        '& > .reports .hover': {
            display: 'block'
        },
        '& > .reports .no-hover': {
            display: 'none'
        },
    },
    '& > .reports': {
        width: 28,
        height: 28,
        display: 'flex',
        justifyContent: 'center',
        '& .hover': {
            display: 'none'
        },
        '& .no-hover': {
            display: 'block'
        }
    }
});

const NavigationContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '72px',
    paddingTop: '8px',
    backgroundColor: '#FAFAFC',
    flexShrink: 0,
    borderRightColor: 'rgba(0,0,0, 0.05)',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    alignItems: 'center',
    overflowY: 'scroll',
    position: 'sticky',
    top: 0
});

export default withApp('UI Framework - Popper', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Popper">
            <XContent>
                <XVertical>
                    <XTitle>Popper</XTitle>
                    <XVertical>

                        <XPopper2
                            content={`Lorem ipsum dolor sit amet, mei euripidis consequat ad, qui quot dicam recusabo ne, cu pro harum scripta voluptua. Vivendo theophrastus est ut, audire eleifend no sea. Per ei mediocrem expetendis interpretaris, melius aliquam dissentias nam ex. Eum an viris choro honestatis. Recusabo deseruisse definitionem sed no, stet facilis albucius et usu, vitae iuvaret ne est.`}
                            show={true}
                            placement="right">
                            <XButton text="right | always shown" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={'lorem ipsum'} show="hover" placement="left">
                            <XButton text="left | hover" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={'lorem ipsum'} show="hover" placement="top">
                            <XButton text="top | hover" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={'lorem ipsum'} show="hover" placement="bottom">
                            <XButton text="bottom | hover" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={'lorem ipsum'} show={false}>
                            <XButton text="hiden" alignSelf="flex-start" />
                        </XPopper2> 

                        <XPopper2 content={'lorem ipsum'} show={true} placement="right" padding={{ left: 20 }}>
                            <XButton text="padding-left" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={'lorem ipsum'} show="hover" placement="right" padding={20}>
                            <XButton text="padding" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={(<XButton text="lorem ipsum" />)} show="hover" placement="right" >
                            <XButton text="reach content" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={(<XButton text="lorem ipsum" />)} show="hover" placement="right" animated={false}>
                            <XButton text="not animated" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={(<XButton text="lorem ipsum" />)} show="hover" placement="right" renderer={PopperDefaultRender}>
                            <XButton text="using rendered" alignSelf="flex-start" />
                        </XPopper2>

                        <XTitle>Tooltip</XTitle>

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
                        </NavigationContainer>

                    </XVertical>

                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});