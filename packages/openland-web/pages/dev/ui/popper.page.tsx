import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XButton } from 'openland-x/XButton';
import { XTitle } from 'openland-x/XTitle';
import { XPopper } from 'openland-x/XPopper';
import Glamorous from 'glamorous';

const CustomContentDiv = Glamorous.div<{ maxWidth?: number }>((props) => ({
    position: 'relative',
    maxWidth: props.maxWidth,
    padding: 10,
    background: '#fff',
    borderRadius: 4,
    boxShadow: '0 0 0 1px rgba(255, 10, 10, .1), 0 15px 35px 0 rgba(255, 10, 10, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
    color: '#525f7f',
    fontSize: 14,
    lineHeight: 'normal',
    fontWeight: 400,
    display: 'flex',
    flexDirection: 'column'
}));

const PlacementTop = '&[x-placement^="top"]';
const PlacementBottom = '&[x-placement^="bottom"]';
const PlacementRight = '&[x-placement^="right"]';
const PlacementLeft = '&[x-placement^="left"]';

const CustomArrowDiv = Glamorous.div<{ size: number }>((props) => ({
    borderStyle: 'solid',
    position: 'absolute',
    [PlacementTop]: {
        borderWidth: `${props.size}px ${props.size}px 0 ${props.size}px`,
        borderColor: '#f22 transparent transparent transparent',
        bottom: -props.size,
    },
    [PlacementBottom]: {
        borderWidth: `0 ${props.size}px ${props.size}px ${props.size}px`,
        borderColor: 'transparent transparent #f22 transparent',
        top: -props.size,
    },
    [PlacementRight]: {
        borderWidth: `${props.size}px ${props.size}px ${props.size}px 0`,
        borderColor: 'transparent #f22 transparent transparent',
        left: -props.size,
    },
    [PlacementLeft]: {
        borderWidth: `${props.size}px 0 ${props.size}px ${props.size}px`,
        borderColor: 'transparent transparent transparent #f22',
        right: -props.size,
    },
}));

export default withApp('UI Framework - Popper', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Popper">
            <XContent>
                <XVertical>
                    <XTitle>Popper</XTitle>
                    <XVertical>

                        <XPopper
                            content={`Lorem ipsum dolor sit amet, mei euripidis consequat ad, qui quot dicam recusabo ne, cu pro harum scripta voluptua. Vivendo theophrastus est ut, audire eleifend no sea. Per ei mediocrem expetendis interpretaris, melius aliquam dissentias nam ex. Eum an viris choro honestatis. Recusabo deseruisse definitionem sed no, stet facilis albucius et usu, vitae iuvaret ne est.`}
                            show={true}
                            width={200}
                            placement="right">
                            <XButton text="right | always shown | sliding arrow | width" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper content={'lorem ipsum'} showOnHover={true} placement="left">
                            <XButton text="left | hover" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper content={'lorem ipsum'} showOnHover={true} placement="top">
                            <XButton text="top | hover" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper content={'lorem ipsum'} showOnHover={true} placement="bottom">
                            <XButton text="bottom | hover" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper content={'lorem ipsum'} show={false}>
                            <XButton text="hiden" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper content={'lorem ipsum'} show={true} placement="right" padding={20}>
                            <XButton text="padding-left" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper content={'lorem ipsum'} showOnHover={true} placement="right" padding={20}>
                            <XButton text="padding" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper content={<XButton text="lorem ipsum" />
                        } showOnHover={true} placement="right" >
                            <XButton text="reach content" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper content={<XButton text="lorem ipsum" />} show={true} placement="right">
                            <XButton text="reach content - disable wrap" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper content={(<XButton text="lorem ipsum" />)} showOnHover={true} placement="right" animated={false}>
                            <XButton text="not animated" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper content={(<XButton text="lorem ipsum" />)}
                            show={true} placement="right" animated={false} arrow={null}>
                            <XButton text="no arrow" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper content={(<XButton text="lorem ipsum" />)}
                            show={true} placement="right" animated={false} 
                            arrow={(arrowRef: (node: any) => void) => {
                                return (
                                    <CustomArrowDiv innerRef={arrowRef} size={10}/>
                                );
                            }}>
                            <XButton text="custom arrow" alignSelf="flex-start" />
                        </XPopper>

                        <XPopper
                            content={(<XButton text="lorem ipsum" />)}
                            show={true} placement="right" animated={false}
                            contentContainer={(contentRef: (node: any) => void) => {
                                return (
                                    <CustomContentDiv innerRef={contentRef} />
                                );
                            }}
                        >
                            <XButton text="custom content container" alignSelf="flex-start" />
                        </XPopper>

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
        </DevDocsScaffold >
    );
});