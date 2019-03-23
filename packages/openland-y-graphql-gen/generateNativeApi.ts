import * as fs from 'fs';
import * as path from 'path';
import { parse, print } from 'graphql/language/index';
export function generateNativeApi() {
    let manifestPath = path.resolve(__dirname + '/../../manifest.json');
    let manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8")) as { operations: { document: string }[] };

    let map = '';

    for (let m of manifest.operations) {
        let doc = m.document;
        let parsed = parse(doc);
        for (let def of parsed.definitions) {
            if (def.kind === 'OperationDefinition') {
                if (def.operation === 'query') {
                    map += '\n Query: ' + def.name!!.value + '(';
                    if (def.variableDefinitions) {
                        map += def.variableDefinitions.map((v) => (
                            v.variable.name.value + ': ' + v.type
                        )).join(', ')
                    }
                }
            }
        }
    }
    console.log(map);
}

generateNativeApi();