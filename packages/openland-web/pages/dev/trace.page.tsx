import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { withApp } from '../../components/withApp';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { useClient } from 'openland-api/useClient';

const containerStyle = css`
    display: flex;
    flex-direction: column;
`;

const traceLineStyle = css`
    display: flex;
    flex-direction: row;
`;

const traceContainer = css`
    display: flex;
    flex-direction: column;
`;

const foldableContainer = css`
    display: flex;
    flex-direction: column;
`;

const progress = css`
    background-color: #4287f5;
    height: 20px;
    min-width: 1px;
    margin-top: 1px;
    margin-bottom: 1px;
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

const timeToP = (time: number) => {
    if (time >= 10000) {
        return time / 100;
    }
    if (time >= 1000) {
        return time / 10;
    }
    if (time >= 100) {
        return time / 5;
    }
    if (time < 100) {
        return time * 2;
    }
    return time;
};

const Progress = ({ width }: { width: string | number }) => {
    return <div className={progress} style={{ width }} />;
};

function Foldable({ visible, foldable }: { visible: JSX.Element; foldable: JSX.Element }) {
    const [folded, setFolded] = React.useState(false);

    return (
        <div className={foldableContainer}>
            <div onClick={() => setFolded(!folded)} style={{ cursor: 'pointer' }}>
                {visible}
            </div>
            {!folded && foldable}
        </div>
    );
}

const TraceFragment = React.memo((props: { traceId: string }) => {
    const client = useClient();
    const trace = client.useDebugGqlTrace({ id: props.traceId }).debugGqlTrace;
    const traceData = JSON.parse(trace.traceData);

    function print(r: any) {
        let lines = [];
        for (let field of r.fields) {
            let traceLine: any = <></>;
            if (field.startOffset !== undefined) {
                traceLine = (
                    <div className={traceLineStyle}>
                        <div style={{ marginLeft: timeToP(field.startOffset || 0) }}>
                            <Progress width={timeToP(field.duration || 0)} />
                        </div>
                        <div style={{ marginLeft: 10 }}>{`${field.duration}ms  ${field.name}`}</div>
                    </div>
                );
            } else {
                let startOffset = r.startOffset || 0;
                traceLine = (
                    <div className={traceLineStyle}>
                        <div style={{ marginLeft: timeToP(startOffset || 0) }}>
                            {`(${field.name}) -`}
                        </div>
                    </div>
                );
            }
            lines.push(<Foldable visible={traceLine} foldable={print(field)} />);
        }
        return <div className={traceContainer}>{lines}</div>;
    }
    let root = print(trace2tree(traceData));

    return (
        <DevToolsScaffold title={trace.name}>
            <XView flexDirection="column" flexGrow={1} flexShrink={1}>
                <div className={containerStyle}>{root}</div>
            </XView>
        </DevToolsScaffold>
    );
});

export default withApp('Super Admins', ['super-admin', 'software-developer'], () => {
    const router = useXRouter();
    const traceId = router.routeQuery.id as string;
    return <TraceFragment traceId={traceId} />;
});
