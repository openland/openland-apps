import * as React from 'react';
import { XPopperProps } from 'openland-x/XPopper';
import { XPopperArrow } from 'openland-x/popper/XPopperArrow';
import { XPopperContent } from 'openland-x/popper/XPopperContent';

export class XPopperStub extends React.Component<XPopperProps> {
    static Arrow = XPopperArrow;
    static Content = XPopperContent;
    onMouseOverTarget = () => {
        //
    }

    onMouseOutTarget = () => {
        //
    }

    render() {
        return <>{this.props.children}</>;
    }
}

const XPopper = React.lazy(() => import('./XPopper'));

export const XPolitePopper = React.forwardRef<any, XPopperProps>(
    (props: XPopperProps, ref: any) => {
        const [render, setRender] = React.useState(false);

        React.useEffect(() => {
            setRender(true);
        }, []);

        return (
            <React.Suspense fallback={<XPopperStub {...props} />}>
                {render && <XPopper {...props} ref={ref} />}
            </React.Suspense>
        );
    },
);
