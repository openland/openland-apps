import * as path from 'path';
import * as fs from 'fs';

const measuresPath = path.join(__dirname, `__measures__`);

export const writeMeasure = ({
    measureName,
    value,
}: {
    measureName: string;
    value: object;
}) => {
    fs.writeFileSync(
        `${measuresPath}/${measureName}.json`,
        JSON.stringify(value, null, 2),
    );
};

export const readMeasure = ({ measureName }: { measureName: string }) => {
    return JSON.parse(
        fs.readFileSync(`${measuresPath}/${measureName}.json`, 'utf-8'),
    );
};

export const haveMeasure = ({ measureName }: { measureName: string }) => {
    return fs.existsSync(`${measuresPath}/${measureName}.json`);
};
