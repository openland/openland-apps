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

export default withApp('UI Framework - Avatar', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Avatar">
            <XContent>
                <XVertical>

                    <XVertical>
                    
                        <XTitle>default</XTitle>
                        <XHorizontal>
                            <XAvatar />
                            <XAvatar src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />

                            <XAvatar style="organization" />
                            <XAvatar style="organization" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />

                            <XGroup>
                                <XAvatar style="organization" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                                <XAvatar style="organization" />
                                <XAvatar style="organization" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>x-large</XTitle>
                        <XHorizontal>
                            <XAvatar size="x-large" />
                            <XAvatar src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="x-large" />

                            <XAvatar style="organization" size="x-large" />
                            <XAvatar style="organization" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="x-large" />

                            <XGroup>
                                <XAvatar style="organization" size="x-large" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                                <XAvatar style="organization" size="x-large" />
                                <XAvatar style="organization" size="x-large" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>large</XTitle>
                        <XHorizontal>
                            <XAvatar size="large" />
                            <XAvatar src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="large" />

                            <XAvatar style="organization" size="large" />
                            <XAvatar style="organization" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="large" />

                            <XGroup>
                                <XAvatar style="organization" size="large" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                                <XAvatar style="organization" size="large" />
                                <XAvatar style="organization" size="large" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>medium</XTitle>
                        <XHorizontal>
                            <XAvatar size="medium" />
                            <XAvatar src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="medium" />

                            <XAvatar style="organization" size="medium" />
                            <XAvatar style="organization" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="medium" />

                            <XGroup>
                                <XAvatar style="organization" size="medium" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                                <XAvatar style="organization" size="medium" />
                                <XAvatar style="organization" size="medium" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>small</XTitle>
                        <XHorizontal>
                            <XAvatar size="small" />
                            <XAvatar src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="small" />

                            <XAvatar style="organization" size="small" />
                            <XAvatar style="organization" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="small" />

                            <XGroup>
                                <XAvatar style="organization" size="small" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                                <XAvatar style="organization" size="small" />
                                <XAvatar style="organization" size="small" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                            </XGroup>
                        </XHorizontal>

                    </XVertical>

                </XVertical>
            </XContent>
        </DevDocsScaffold >
    );
});