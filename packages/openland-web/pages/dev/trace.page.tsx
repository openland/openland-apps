import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { withApp } from '../../components/withApp';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { useClient } from 'openland-api/useClient';

const rootContainer = css`
    overflow-x: scroll;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    flex-shrink: 1;
    flex-grow: 1;
    margin-top: 20px;
`;

const traceLineStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    flex-wrap: nowrap;
    white-space: nowrap;
`;

const traceContainer = css`
    display: flex;
    flex-direction: column;
`;

const foldableContainer = css`
    display: flex;
    flex-direction: column;
`;

const foldableContent = css`
    display: flex;
    flex-direction: column;
    padding-left: var(--padding-left);
`;

const progress = css`
    flex-shrink: 0;
    background-color: #4287f5;
    height: 20px;
    min-width: 1px;
    margin-top: 1px;
    margin-bottom: 1px;
    animation: width 1s linear forwards;

    @keyframes width {
        from {
            width: 0;
        }
        to {
            width: var(--width);
        }
    }
`;

function trace2tree(data: any) {
    let root: any = {
        name: 'root',
        fields: [],
    };

    for (let trace of data.traces) {
        let r = root;
        for (let part of trace.path) {
            let node = r.fields.find((n: any) => n.name === part);
            if (!node) {
                r.fields.push({
                    name: part,
                    fields: [],
                });
            }
            r = r.fields.find((n: any) => n.name === part);
            if (trace.path.indexOf(part) === trace.path.length - 1) {
                r.startOffset = trace.startOffset;
                r.duration = trace.duration;
            }
        }
    }
    return root;
}

function Foldable({
    visible,
    foldable,
    paddingLeft,
    canCollapse,
}: {
    visible: JSX.Element;
    foldable: JSX.Element;
    paddingLeft: number;
    canCollapse: boolean;
}) {
    const [folded, setFolded] = React.useState(false);

    return (
        <div className={cx(foldableContainer, 'Foldable')}>
            <div
                onClick={() => (canCollapse ? setFolded(!folded) : null)}
                style={{ cursor: canCollapse ? 'pointer' : undefined }}
            >
                {visible}
            </div>
            <div
                className={foldableContent}
                style={{ '--padding-left': paddingLeft + 'px' } as React.CSSProperties}
            >
                {!folded && foldable}
            </div>
        </div>
    );
}

const TraceFragment = React.memo((props: { traceId: string }) => {
    const client = useClient();
    const trace = client.useDebugGqlTrace({ id: props.traceId }).debugGqlTrace;
    const traceData = JSON.parse(trace.traceData);
    const [scaleSize, setScaleSize] = React.useState(5);

    const timeToP = (time: number) => {
        return time * scaleSize * 0.05;
    };

    function print(r: any) {
        let lines = [];
        for (let field of r.fields) {
            const canCollapse = !!field.fields.length;
            let traceLine: any = <></>;

            if (field.startOffset !== undefined) {
                traceLine = (
                    <div className={traceLineStyle}>
                        <div
                            className={progress}
                            style={
                                {
                                    '--width': timeToP(field.duration || 0) + 'px',
                                } as React.CSSProperties
                            }
                        />
                        <div style={{ marginLeft: 10, flexShrink: 0 }}>
                            <span>
                                {`${field.duration}ms  ${field.name}`} {canCollapse ? '-' : null}
                            </span>
                        </div>
                    </div>
                );
            } else {
                traceLine = (
                    <div className={traceLineStyle} style={{marginTop: 10}}>
                        <span>
                            {`(${field.name})`} {canCollapse ? '-' : null}
                        </span>
                    </div>
                );
            }

            lines.push(
                <Foldable
                    visible={traceLine}
                    paddingLeft={timeToP(field.duration || 0)}
                    foldable={print(field)}
                    canCollapse={canCollapse}
                />,
            );
        }
        return <div className={traceContainer}>{lines}</div>;
    }
    let root = print(trace2tree(traceData));

    return (
        <DevToolsScaffold title={trace.name} scroll="disable">
            <XView flexDirection="column" flexGrow={1} flexShrink={1} overflow="hidden" paddingTop={12}>
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={scaleSize}
                    onChange={(e) => setScaleSize(Number(e.target.value))}
                />
                <div className={rootContainer}>{root}</div>
            </XView>
        </DevToolsScaffold>
    );
});

export default withApp('Super Admins', ['super-admin', 'software-developer'], () => {
    const router = useXRouter();
    const traceId = router.routeQuery.id as string;
    return <TraceFragment traceId={traceId} />;
});
