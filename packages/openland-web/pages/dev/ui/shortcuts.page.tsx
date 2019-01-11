import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';

export default withApp('UI Framework - Shortcuts', 'viewer', () => {
    let [showChild1, setShowChild1] = React.useState<boolean>(false);
    let [showChild2, setShowChild2] = React.useState<boolean>(false);
    return (
        <DevDocsScaffold title="Shortcuts">
            <XContent>
                hit CTRL_OPTION_O or CTRL_OPTION_P
                <XShortcuts
                    handlerMap={{
                        CTRL_OPTION_O: () => {
                            console.log('parent: CTRL_OPTION_O');
                        },
                        CTRL_OPTION_P: () => {
                            console.log('parent: CTRL_OPTION_P');
                        },
                    }}
                    keymap={{
                        CTRL_OPTION_O: {
                            osx: ['ctrl+option+o'],
                            windows: ['ctrl+alt+o'],
                        },
                        CTRL_OPTION_P: {
                            osx: ['ctrl+option+p'],
                            windows: ['ctrl+alt+p'],
                        },
                    }}
                >
                    <XView>
                        parent
                        <XView>
                            <XButton
                                text="show child 1"
                                onClick={() => {
                                    setShowChild1(!showChild1);
                                }}
                            />
                            <XButton
                                text="show child 2"
                                onClick={() => {
                                    setShowChild2(!showChild2);
                                }}
                            />
                        </XView>
                    </XView>
                    {showChild1 && (
                        <XShortcuts
                            handlerMap={{
                                CTRL_OPTION_O: () => {
                                    console.log('child1: CTRL_OPTION_O');
                                },
                            }}
                            keymap={{
                                CTRL_OPTION_O: {
                                    osx: ['ctrl+option+o'],
                                    windows: ['ctrl+alt+o'],
                                },
                            }}
                        >
                            child1
                        </XShortcuts>
                    )}
                    {showChild2 && (
                        <XShortcuts
                            supressOtherShortcuts
                            handlerMap={{
                                CTRL_OPTION_O: () => {
                                    console.log('child2: CTRL_OPTION_O');
                                },
                            }}
                            keymap={{
                                CTRL_OPTION_O: {
                                    osx: ['ctrl+option+o'],
                                    windows: ['ctrl+alt+o'],
                                },
                            }}
                        >
                            child2
                        </XShortcuts>
                    )}
                </XShortcuts>
            </XContent>
        </DevDocsScaffold>
    );
});
