import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XButton } from 'openland-x/XButton';
import { XVertical2 } from 'openland-x/XVertical2';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { NativeAppsModal } from 'openland-web/components/NativeAppsModal';

const ResizableContent = React.memo(() => {
    let [height, setHeight] = React.useState(100);
    React.useEffect(() => {
        let r = setInterval(() => {
            setHeight(Math.random() * 1000 + 100);
        }, 1000);
        return () => clearInterval(r);
    }, []);
    return <XView height={height} width={100} backgroundColor="red" />;
});

export default withApp('UI Framework - Modals', 'viewer', props => {
    return (
        <DevDocsScaffold title="Modals">
            <XContent>
                <XVertical2>
                    <XTitle>for rooms</XTitle>
                    <XTitle>Modals</XTitle>
                    <XButton
                        text="Apps Modal"
                        onClick={() =>
                            showModalBox({ fullScreen: true }, () => (
                                <XScrollView3 flexGrow={1} flexShrink={1}>
                                    <NativeAppsModal />
                                </XScrollView3>
                            ))
                        }
                    />
                    <XButton
                        text="Show Modal"
                        onClick={() =>
                            showModalBox({}, ctx => (
                                <XView paddingHorizontal={20} paddingVertical={24}>
                                    <XButton text="close" onClick={() => ctx.hide()} />
                                </XView>
                            ))
                        }
                    />
                    <XButton
                        text="Show Large"
                        onClick={() =>
                            showModalBox({}, ctx => (
                                <XView
                                    paddingHorizontal={20}
                                    paddingVertical={24}
                                    flexDirection="column"
                                >
                                    <XButton text="close" onClick={() => ctx.hide()} />
                                    <XView height={2000} backgroundColor="yellow" />
                                </XView>
                            ))
                        }
                    />
                    <XButton
                        text="Show Dynamic"
                        onClick={() =>
                            showModalBox({}, ctx => (
                                <XView
                                    paddingHorizontal={20}
                                    paddingVertical={24}
                                    flexDirection="column"
                                >
                                    <XButton text="close" onClick={() => ctx.hide()} />
                                    <ResizableContent />
                                </XView>
                            ))
                        }
                    />
                    <XButton
                        text="Show Fullscreen Modal"
                        onClick={() =>
                            showModalBox({ fullScreen: true }, ctx => (
                                <XView alignItems="center" marginTop={100}>
                                    <XButton text="close" onClick={() => ctx.hide()} />
                                </XView>
                            ))
                        }
                    />
                    {/* <XModal target={<XButton text="Show Modal" />}>
                        <Lorem count={2} />
                    </XModal>
                    <XTitle>Controlled</XTitle>
                    <ControlledModal />
                    <XTitle>Routed</XTitle>
                    <XButton query={{ field: 'modal', value: 'true' }} text="Show Modal" />
                    <XModal targetQuery="modal">Hey!</XModal>
                    <XTitle>With Title</XTitle>
                    <XModal title="Modal Dialog" target={<XButton text="Show Modal" />}>
                        <Lorem count={2} />
                    </XModal>
                    <XTitle>Sizes</XTitle>
                    <XModal target={<XButton text="X-Large" />} size="x-large">
                        Hey!
                    </XModal>
                    <XModal target={<XButton text="Large" />} size="large">
                        Hey!
                    </XModal>
                    <XModal target={<XButton text="Default" />}>Hey!</XModal>
                    <XModal target={<XButton text="Small" />} size="small">
                        Hey!
                    </XModal>
                    <XTitle>Large Content</XTitle>
                    <XModal target={<XButton text="Show Modal" />}>
                        <Lorem count={40} />
                    </XModal> */}
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
