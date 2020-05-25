import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import { css, cx } from 'linaria';
import AlertBlanket from 'openland-x/AlertBlanket';
import { URickInput } from 'openland-web/components/unicorn/URickInput';

const anim = css`
    animation: blink 300ms;
    @keyframes blink {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const ShortcutHandlerView = () => {
    let ref = React.useRef<HTMLDivElement>(null);
    let [inner, setInner] = React.useState<boolean>(false);
    let blink = React.useCallback(() => {
        if (ref.current) {
            ref.current.className = cx(TextLabel1, anim);
            setTimeout(() => {
                if (ref.current) {
                    ref.current.className = cx(TextLabel1);
                }
            }, 310);
        }
    }, []);
    useShortcuts([
        {
            keys: ['Control', 'V'], callback: () => {
                blink();
                setInner(true);
            }
        },
        {
            keys: ['Control', 'X'], callback: () => {
                if (inner) {
                    blink();
                    setInner(false);
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            keys: ['b'], callback: () => {
                AlertBlanket.alert('booom');
            }
        },
    ], [inner]);
    return (
        <div className={TextLabel1} style={{ paddingLeft: 16 }}>
            <div ref={ref} >
                {!inner && 'Press [Ctrl + V] to add inner view'}
                {inner && 'Press [Ctrl + X] to remove inner view'}
            </div>
            <URickInput appearance="input" />
            {inner && <ShortcutHandlerView />}
        </div>
    );
};

export default withApp('Rick Text Input', ['super-admin', 'software-developer'], props => {
    return (
        <DevDocsScaffold title="Shortcuts">
            {canUseDOM && <ShortcutHandlerView />}
        </DevDocsScaffold>
    );
});