import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContent } from 'openland-x-layout/XContent';
import { XAvatar } from 'openland-x/XAvatar';
import { XTitle } from 'openland-x/XTitle';
import { XGroup } from 'openland-x/XGroup';

const EXAMPLE = 'https://theblueraft.files.wordpress.com/2010/08/aang.jpg';

export default withApp('UI Framework - Avatar', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Avatar">
            <XContent>
                <XVertical>
                    <XVertical>
                        <XTitle>Online dot</XTitle>
                        <XHorizontal>
                            <XAvatar size="x-large" online={true} src={EXAMPLE} />
                            <XAvatar size="large" online={true} src={EXAMPLE} />
                            <XAvatar size="s-large" online={true} src={EXAMPLE} />
                            <XAvatar size="x-medium" online={true} src={EXAMPLE} />
                            <XAvatar size="s-medium" online={true} src={EXAMPLE} />
                            <XAvatar size="l-medium" online={true} src={EXAMPLE} />
                            <XAvatar size="medium" online={true} src={EXAMPLE} />
                            <XAvatar online={true} src={EXAMPLE} />
                            <XAvatar size="small" online={true} src={EXAMPLE} />
                            <XAvatar size="x-small" online={true} src={EXAMPLE} />
                        </XHorizontal>

                        <XTitle>default</XTitle>
                        <XHorizontal>
                            <XAvatar />
                            <XAvatar src={EXAMPLE} />

                            <XAvatar style="organization" />
                            <XAvatar style="organization" src={EXAMPLE} />

                            <XGroup>
                                <XAvatar style="organization" src={EXAMPLE} />
                                <XAvatar style="organization" />
                                <XAvatar style="organization" src={EXAMPLE} />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>x-large</XTitle>
                        <XHorizontal>
                            <XAvatar size="x-large" />
                            <XAvatar src={EXAMPLE} size="x-large" />

                            <XAvatar style="organization" size="x-large" />
                            <XAvatar style="organization" src={EXAMPLE} size="x-large" />

                            <XGroup>
                                <XAvatar style="organization" size="x-large" src={EXAMPLE} />
                                <XAvatar style="organization" size="x-large" />
                                <XAvatar style="organization" size="x-large" src={EXAMPLE} />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>large</XTitle>
                        <XHorizontal>
                            <XAvatar size="large" />
                            <XAvatar src={EXAMPLE} size="large" />

                            <XAvatar style="organization" size="large" />
                            <XAvatar style="organization" src={EXAMPLE} size="large" />

                            <XGroup>
                                <XAvatar style="organization" size="large" src={EXAMPLE} />
                                <XAvatar style="organization" size="large" />
                                <XAvatar style="organization" size="large" src={EXAMPLE} />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>medium</XTitle>
                        <XHorizontal>
                            <XAvatar size="medium" />
                            <XAvatar src={EXAMPLE} size="medium" />

                            <XAvatar style="organization" size="medium" />
                            <XAvatar style="organization" src={EXAMPLE} size="medium" />

                            <XGroup>
                                <XAvatar style="organization" size="medium" src={EXAMPLE} />
                                <XAvatar style="organization" size="medium" />
                                <XAvatar style="organization" size="medium" src={EXAMPLE} />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>small</XTitle>
                        <XHorizontal>
                            <XAvatar size="small" />
                            <XAvatar src={EXAMPLE} size="small" />

                            <XAvatar style="organization" size="small" />
                            <XAvatar style="organization" src={EXAMPLE} size="small" />

                            <XGroup>
                                <XAvatar style="organization" size="small" src={EXAMPLE} />
                                <XAvatar style="organization" size="small" />
                                <XAvatar style="organization" size="small" src={EXAMPLE} />
                            </XGroup>
                        </XHorizontal>

                    </XVertical>

                </XVertical>
            </XContent>
        </DevDocsScaffold >
    );
});