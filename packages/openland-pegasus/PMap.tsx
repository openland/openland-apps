import * as React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { css } from 'linaria';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

const TOKEN = 'pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw';
const containerStyles = css`
    flex-grow: 1;
    flex-shrink: 1;
    align-self: stretch; 
`;

const ResizeObserver = ((canUseDOM && window && ((window as any).ResizeObserver)) || ResizeObserverPolyfill) as typeof ResizeObserverPolyfill;

export const PMyLocation = React.memo((props: { latitude: number, longitude: number }) => {
    return (
        <Marker
            className="mapboxgl-user-location-dot"
            longitude={props.longitude}
            latitude={props.latitude}
            captureDrag={false}
            captureDoubleClick={false}
        />
    );
});

export const PMap = React.memo((props: { children?: any }) => {

    const containerRef = React.useRef<HTMLDivElement>(null);

    const [viewport, setViewport] = React.useState<{
        width: number, height: number, latitude: number, longitude: number, zoom: number
    } | undefined>(undefined);

    React.useLayoutEffect(() => {
        setViewport({
            width: containerRef.current!.clientWidth,
            height: containerRef.current!.clientHeight,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8
        });

        let observer = new ResizeObserver((e) => {
            setViewport((s) => ({
                latitude: 37.7577,
                longitude: -122.4376,
                zoom: 8,
                ...s, width: e[0].contentRect.width, height: e[0].contentRect.height
            }));
        });

        observer.observe(containerRef.current!);

        return () => observer.disconnect();
    }, []);

    return (
        <div className={containerStyles} ref={containerRef}>
            {viewport && (
                <ReactMapGL
                    mapboxApiAccessToken={TOKEN}
                    {...viewport}
                    onViewportChange={setViewport}
                >
                    {props.children}
                </ReactMapGL>
            )}
        </div>
    );
});