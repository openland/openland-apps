import * as React from 'react';
import * as Diff from 'diff';

export function XDiff(props: { oldValue: string, newValue: string }) {
    return (
        <div>
            {Diff.diffChars(props.oldValue, props.newValue).map((s) => {
                if (s.added) {
                    return <span style={{ backgroundColor: '#ACF2BD' }}>{s.value}</span>;
                } else if (s.removed) {
                    return <span style={{ backgroundColor: '#FDB9C0' }}>{s.value}</span>;
                } else {
                    return s.value;
                }
            })}
        </div>
    );
}