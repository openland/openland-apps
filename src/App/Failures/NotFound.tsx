import * as React from 'react';

export default function () {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw'
            }}
        >
            <div
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    height: 300,
                    width: 300,
                    display: 'flex'
                }}
            >
                Not found!
            </div>
        </div>
    );
}