import * as React from 'react';
import { PerfCollectorContext } from './PerfCollectorContext';

const compareCurrentMeasureWithSavedMeasure = ({
    savedMeasure,
    currentMeasure,
}: {
    savedMeasure: any;
    currentMeasure: any;
}) => {
    if (!currentMeasure) {
        return;
    }

    for (let key of Object.keys(currentMeasure)) {
        // const savedMeasureItem = savedMeasure[key];
        const currentMeasureItem = currentMeasure[key];
        // if (!savedMeasureItem) {
        //     continue;
        // }

        if (key === 'CacheComponent' && currentMeasureItem.measure > 300) {
            throw Error(`BOOM ${key} is too slow to rerender :${currentMeasureItem.measure}`);
        }

        if (key.indexOf('DisplayNone') !== -1 && currentMeasureItem.measure > 150) {
            throw Error(`BOOM ${key} is too slow to rerender :${currentMeasureItem.measure}`);
        }
    }
};

export const PerfViewer = () => {
    if (location.hostname !== 'localhost') {
        return null;
    }

    const perfCollector = React.useContext(PerfCollectorContext);
    const [perfState, setPerfState] = React.useState(perfCollector.getMap());
    const [firstRender, setFirstRender] = React.useState<any>(true);
    const [timeout, setIntervalTimeout] = React.useState<any>(null);
    const [maxMeasureDisplayNone, setMaxMeasureDisplayNone] = React.useState<any>(null);
    const [maxMeasureCacheComponent, setMaxMeasureCacheComponent] = React.useState<any>(null);
    const [hasError, setHasError] = React.useState<any>(false);

    React.useEffect(
        () => {
            let newMaxMeasureDisplayNone = maxMeasureDisplayNone;
            let newMaxMeasureCacheComponent = maxMeasureCacheComponent;
            for (let key of Object.keys(perfState)) {
                if (key === 'CacheComponent') {
                    if (perfState[key].measure > newMaxMeasureCacheComponent) {
                        newMaxMeasureCacheComponent = perfState[key].measure;
                    }
                }

                if (key.indexOf('DisplayNone') !== -1) {
                    if (perfState[key].measure > newMaxMeasureDisplayNone) {
                        newMaxMeasureDisplayNone = perfState[key].measure;
                    }
                }
            }
            if (newMaxMeasureCacheComponent !== maxMeasureCacheComponent) {
                setMaxMeasureCacheComponent(newMaxMeasureCacheComponent);
            }
            if (maxMeasureDisplayNone !== newMaxMeasureDisplayNone) {
                setMaxMeasureDisplayNone(newMaxMeasureDisplayNone);
            }
        },
        [perfState],
    );

    React.useEffect(
        () => {
            if (hasError) {
                if (timeout) {
                    clearInterval(timeout);
                    setIntervalTimeout(null);
                }
            }
        },
        [hasError],
    );

    if (!timeout && firstRender) {
        setFirstRender(false);

        const intervalToSave = setInterval(() => {
            try {
                compareCurrentMeasureWithSavedMeasure({
                    savedMeasure: perfCollector.measureFromServer,
                    currentMeasure: perfCollector.getMap(),
                });
            } catch (err) {
                setHasError(true);

                throw err;
            }
            setPerfState(perfCollector.getMap());
        }, 1000);

        setIntervalTimeout(intervalToSave);
    }

    // console.log(`Max measure CacheComponent: ${maxMeasureCacheComponent}`);
    // console.log(`Max measure DisplayNone: ${maxMeasureDisplayNone}`);

    return null;

    // return (
    //     <XView
    //         position="fixed"
    //         right={0}
    //         top={0}
    //         width={600}
    //         height={'100%'}
    //         backgroundColor="white"
    //         zIndex={1000}
    //     >
    //         <XScrollView3 useDefaultScroll flexGrow={1} flexShrink={1}>
    //             Max measure CacheComponent: {maxMeasureCacheComponent}
    //             <br />
    //             Max measure DisplayNone: {maxMeasureDisplayNone}
    //             <pre>{JSON.stringify(perfState, null, 2)}</pre>
    //         </XScrollView3>
    //     </XView>
    // );
};
