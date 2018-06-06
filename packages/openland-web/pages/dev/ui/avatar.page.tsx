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
                        <XTitle>Cloud</XTitle>
                        <XHorizontal>
                            <XAvatar src="3a6fc01f-4542-40ea-96c3-191df4d166b8" />
                            <XAvatar src="3a6fc01f-4542-40ea-96c3-191df4d166b8" size="x-large" />
                            <XAvatar src="3a6fc01f-4542-40ea-96c3-191df4d166b8" size="large" />
                            <XAvatar src="3a6fc01f-4542-40ea-96c3-191df4d166b8" size="medium" />
                            <XAvatar src="3a6fc01f-4542-40ea-96c3-191df4d166b8" size="small" />
                        </XHorizontal>

                        <XHorizontal>
                            <XAvatar style="square" cloudImageUuid="3a6fc01f-4542-40ea-96c3-191df4d166b8" />
                            <XAvatar style="square" cloudImageUuid="3a6fc01f-4542-40ea-96c3-191df4d166b8" size="x-large" />
                            <XAvatar style="square" cloudImageUuid="3a6fc01f-4542-40ea-96c3-191df4d166b8" size="large" />
                            <XAvatar style="square" cloudImageUuid="3a6fc01f-4542-40ea-96c3-191df4d166b8" size="medium" />
                            <XAvatar style="square" cloudImageUuid="3a6fc01f-4542-40ea-96c3-191df4d166b8" size="small" />
                        </XHorizontal>

                        <XTitle>default</XTitle>
                        <XHorizontal>
                            <XAvatar />
                            <XAvatar src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />

                            <XAvatar style="square" />
                            <XAvatar style="square" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />

                            <XGroup>
                                <XAvatar style="square" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                                <XAvatar style="square" />
                                <XAvatar style="square" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>x-large</XTitle>
                        <XHorizontal>
                            <XAvatar size="x-large" />
                            <XAvatar src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="x-large" />

                            <XAvatar style="square" size="x-large" />
                            <XAvatar style="square" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="x-large" />

                            <XGroup>
                                <XAvatar style="square" size="x-large" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                                <XAvatar style="square" size="x-large" />
                                <XAvatar style="square" size="x-large" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>large</XTitle>
                        <XHorizontal>
                            <XAvatar size="large" />
                            <XAvatar src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="large" />

                            <XAvatar style="square" size="large" />
                            <XAvatar style="square" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="large" />

                            <XGroup>
                                <XAvatar style="square" size="large" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                                <XAvatar style="square" size="large" />
                                <XAvatar style="square" size="large" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>medium</XTitle>
                        <XHorizontal>
                            <XAvatar size="medium" />
                            <XAvatar src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="medium" />

                            <XAvatar style="square" size="medium" />
                            <XAvatar style="square" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="medium" />

                            <XGroup>
                                <XAvatar style="square" size="medium" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                                <XAvatar style="square" size="medium" />
                                <XAvatar style="square" size="medium" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                            </XGroup>
                        </XHorizontal>

                        <XTitle>small</XTitle>
                        <XHorizontal>
                            <XAvatar size="small" />
                            <XAvatar src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="small" />

                            <XAvatar style="square" size="small" />
                            <XAvatar style="square" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" size="small" />

                            <XGroup>
                                <XAvatar style="square" size="small" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                                <XAvatar style="square" size="small" />
                                <XAvatar style="square" size="small" src="https://theblueraft.files.wordpress.com/2010/08/aang.jpg" />
                            </XGroup>
                        </XHorizontal>

                    </XVertical>

                </XVertical>
            </XContent>
        </DevDocsScaffold >
    );
});