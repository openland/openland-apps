import * as React from 'react';
import { PerfCollectorContext } from 'openland-web/perf/PerfCollectorContext';

export const useCheckPerf = ({ name, id }: { name: string; id?: string }) => {
    const perfCollector = React.useContext(PerfCollectorContext);

    const isCached = id && perfCollector.getCachedChatsIds().indexOf(id) !== -1;
    let t0 = performance.now();
    React.useLayoutEffect(() => {
        let t1 = performance.now();

        const _map = perfCollector.getMap();

        let finalName = name;
        if (id) {
            finalName = name + ' ' + id;
        }

        // if (isCached) {
        //     finalName = name + ' ' + id + ' ' + 'cached';
        // }

        perfCollector.setMap({
            ..._map,
            [finalName]: {
                measure: t1 - t0,
                renderCount: _map[finalName] ? _map[finalName].renderCount + 1 : 1,
            },
        });
    }, [Math.random()]);
};
