/// <reference path="../../typings.d.ts" />

import * as React from 'react';
import HotTable from 'react-handsontable';
export function Spreadsheet() {
    return (
        <div>
            <HotTable
                width={600}
                autoColumnSize={true}
                colWidths={100}
                colHeaders={true}
                rowHeaders={true}
                data={[
                    [1, 2, 3, 4],
                    [1, 2, 3, 4],
                ]}
            />
        </div>
    );
}