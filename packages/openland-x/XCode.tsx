import * as React from 'react';

export function XCode(props: { src: string, language: string }) {
    return (
        <pre>
            {props.src}
        </pre>
    );
}