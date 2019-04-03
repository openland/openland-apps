import * as fs from 'fs';
import * as path from 'path';
import { Manifest, Schema } from './types';
import { nativeSwift } from './nativeSwift';
import { nativeJava } from './nativeJava';

export function generateNativeApi() {

    let manifestPath = path.resolve(__dirname + '/../openland-api/queries.json');
    let manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8")) as Manifest;
    let schemaPath = path.resolve(__dirname + '/../../schema.json');
    let schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8")) as Schema;

    // let ios = nativeSwift(manifest, schema);
    // fs.writeFileSync(path.resolve(__dirname + '/../../ios/APIFactory.swift'), ios, 'utf-8');

    let java = nativeJava(manifest, schema);
    fs.writeFileSync(path.resolve(__dirname + '/../../android/app/src/main/java/com/openland/react/graphql/APIFactory.kt'), java, 'utf-8');
}

generateNativeApi();