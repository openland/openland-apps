import * as fs from 'fs';
import * as path from 'path';
import { parse, print } from 'graphql/language/index';

let manifestPath = path.resolve(__dirname + '/../../manifest.json');
let destPath = path.resolve(__dirname + '/../../android/app/src/main/graphql/com/openland/api/');
let manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8")) as { operations: { document: string }[] };

for (let m of manifest.operations) {
    let doc = m.document;
    let parsed = parse(doc);
    for (let def of parsed.definitions) {
        if (def.kind === 'FragmentDefinition') {
            fs.writeFileSync(destPath + '/' + def.name.value + '.graphql', print(def), 'utf-8')
        } else if (def.kind === 'OperationDefinition') {
            fs.writeFileSync(destPath + '/' + def.name!!.value + '.graphql', print(def), 'utf-8')
        } else {
            throw Error('Unknown kind: ' + def.kind)
        }
    }
}