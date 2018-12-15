import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContent } from 'openland-x-layout/XContent';
import { XAvatar } from 'openland-x/XAvatar';
import { XTitle } from 'openland-x/XTitle';
import { XAvatar2 } from 'openland-x/XAvatar2';

const EXAMPLE = "https://theblueraft.files.wordpress.com/2010/08/aang.jpg";

const EXAMPLE_SRC = "https://ucarecdn.com/31ebe787-70bc-478b-9dc2-f46319165c69/-/crop/269x269/100,0/";
const EXAMPLE_TITLE = "John Doe";
const EXAMPLE_ID = "ID";

export default withApp('UI Framework - Avatar', 'viewer', props => {
    return (
        <DevDocsScaffold title="Avatar">
            <XContent>
                <XVertical>
                    <XVertical>
                        <XTitle>Online dot</XTitle>
                        <XHorizontal>
                            <XVertical separator="none" alignItems="center">
                                <div>74</div>
                                <XAvatar2 size={74} online={true} src={EXAMPLE_SRC} title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>58</div>
                                <XAvatar2 size={58} online={true} src={EXAMPLE_SRC} title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>default (40)</div>
                                <XAvatar2 online={true} src={EXAMPLE_SRC} title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>36</div>
                                <XAvatar2 size={36} online={true} src={EXAMPLE_SRC} title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>32</div>
                                <XAvatar2 size={32} online={true} src={EXAMPLE_SRC} title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>28</div>
                                <XAvatar2 size={28} online={true} src={EXAMPLE_SRC} title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>24</div>
                                <XAvatar2 size={24} online={true} src={EXAMPLE_SRC} title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>
                        </XHorizontal>
                    </XVertical>
                    <XVertical>
                        <XTitle>No image</XTitle>
                        <XHorizontal>
                            <XVertical separator="none" alignItems="center">
                                <div>74</div>
                                <XAvatar2 size={74} online={true} src="ph://" title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>58</div>
                                <XAvatar2 size={58} online={true} src="ph://" title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>default (40)</div>
                                <XAvatar2 online={true} src="ph://" title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>36</div>
                                <XAvatar2 size={36} online={true} src="ph://" title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>32</div>
                                <XAvatar2 size={32} online={true} src="ph://" title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>28</div>
                                <XAvatar2 size={28} online={true} src="ph://" title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>

                            <XVertical separator="none" alignItems="center">
                                <div>24</div>
                                <XAvatar2 size={24} online={true} src="ph://" title={EXAMPLE_TITLE} id={EXAMPLE_ID} />
                            </XVertical>
                        </XHorizontal>
                    </XVertical>

                    <br />
                    <br />
                    <br />
                    <br />

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
                            <XAvatar style="organization" src={EXAMPLE} />
                            <XAvatar style="organization" />
                            <XAvatar style="organization" src={EXAMPLE} />
                        </XHorizontal>

                        <XTitle>x-large</XTitle>
                        <XHorizontal>
                            <XAvatar size="x-large" />
                            <XAvatar src={EXAMPLE} size="x-large" />
                            <XAvatar style="organization" size="x-large" />
                            <XAvatar style="organization" src={EXAMPLE} size="x-large" />
                            <XAvatar style="organization" size="x-large" src={EXAMPLE} />
                            <XAvatar style="organization" size="x-large" />
                            <XAvatar style="organization" size="x-large" src={EXAMPLE} />
                        </XHorizontal>

                        <XTitle>large</XTitle>
                        <XHorizontal>
                            <XAvatar size="large" />
                            <XAvatar src={EXAMPLE} size="large" />
                            <XAvatar style="organization" size="large" />
                            <XAvatar style="organization" src={EXAMPLE} size="large" />
                            <XAvatar style="organization" size="large" src={EXAMPLE} />
                            <XAvatar style="organization" size="large" />
                            <XAvatar style="organization" size="large" src={EXAMPLE} />
                        </XHorizontal>

                        <XTitle>medium</XTitle>
                        <XHorizontal>
                            <XAvatar size="medium" />
                            <XAvatar src={EXAMPLE} size="medium" />
                            <XAvatar style="organization" size="medium" />
                            <XAvatar style="organization" src={EXAMPLE} size="medium" />
                            <XAvatar style="organization" size="medium" src={EXAMPLE} />
                            <XAvatar style="organization" size="medium" />
                            <XAvatar style="organization" size="medium" src={EXAMPLE} />
                        </XHorizontal>

                        <XTitle>small</XTitle>
                        <XHorizontal>
                            <XAvatar size="small" />
                            <XAvatar src={EXAMPLE} size="small" />
                            <XAvatar style="organization" size="small" />
                            <XAvatar style="organization" src={EXAMPLE} size="small" />
                            <XAvatar style="organization" size="small" src={EXAMPLE} />
                            <XAvatar style="organization" size="small" />
                            <XAvatar style="organization" size="small" src={EXAMPLE} />
                        </XHorizontal>
                    </XVertical>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});
