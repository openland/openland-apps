import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XButton } from 'openland-x/XButton';
import { XTitle } from 'openland-x/XTitle';
import { XPopper2, PopperDefaultRender } from '../../../components/Incubator/XPopper2';

export default withApp('UI Framework - Popper', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Popper">
            <XContent>
                <XVertical>
                    <XTitle>Tooltip</XTitle>
                      <XVertical>

                        <XPopper2 content={'lorem ipsum'} show={true} placement="right">
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

                        <XPopper2 content={'lorem ipsum'} show={true}  placement="right" margin={{left: 20}}>
                            <XButton text="margin-left" alignSelf="flex-start" />
                        </XPopper2>

                         <XPopper2 content={'lorem ipsum'} show={true}  placement="right" margin={20}>
                            <XButton text="margin" alignSelf="flex-start" />
                        </XPopper2>

                         <XPopper2 content={(<XButton text="lorem ipsum"/>)} show="hover"  placement="right" >
                            <XButton text="reach content" alignSelf="flex-start" />
                        </XPopper2>

                         <XPopper2 content={(<XButton text="lorem ipsum"/>)} show="hover"  placement="right" animated={false}>
                            <XButton text="not animated" alignSelf="flex-start" />
                        </XPopper2>

                        <XPopper2 content={(<XButton text="lorem ipsum"/>)} show="hover"  placement="right" renderer={PopperDefaultRender}>
                            <XButton text="using rendered" alignSelf="flex-start" />
                        </XPopper2>
                    </XVertical>

                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});