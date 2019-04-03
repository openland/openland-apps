import { Manifest, Schema } from "./types";
import { parse, OperationTypeNode, OperationDefinitionNode, TypeNode, NonNullTypeNode } from 'graphql/language/index';

function buildItemReader(name: string, v: TypeNode): string {
    if (v.kind === 'NamedType') {
        if (v.name.value === 'String' || v.name.value === 'ID') {
            return 'readStringList(src, "' + name + '")'
        } else if (v.name.value === 'Boolean') {
            return 'readBoolList(src, "' + name + '")'
        } else if (v.name.value === 'Int') {
            return 'readIntList(src, "' + name + '")'
        } else if (v.name.value === 'Float') {
            return 'readFloatList(src, "' + name + '")'
        } else {
            return 'read' + v.name.value + 'List(src, "' + name + '")'
        }
    } else if (v.kind === 'NonNullType') {
        return 'notNullListItems(' + buildItemReader(name, (v as NonNullTypeNode).type) + ')';
    } else {
        throw Error();
    }
}

function buildReader(name: string, v: TypeNode): string {
    if (v.kind === 'NamedType') {
        if (v.name.value === 'String' || v.name.value === 'ID') {
            return 'readString(src, "' + name + '")'
        } else if (v.name.value === 'Boolean') {
            return 'readBool(src, "' + name + '")'
        } else if (v.name.value === 'Int') {
            return 'readInt(src, "' + name + '")'
        } else if (v.name.value === 'Float') {
            return 'readFloat(src, "' + name + '")'
        } else {
            return 'read' + v.name.value + '(src, "' + name + '")'
            // throw Error('Unknown named type: ' + v.name.value);
        }
    } else if (v.kind === 'ListType') {
        return buildItemReader(name, v.type);
    } else if (v.kind === 'NonNullType') {
        return 'notNull(' + buildReader(name, (v as NonNullTypeNode).type) + ')';
    } else {
        throw Error();
    }
}

export function nativeJava(manifest: Manifest, schema: Schema): string {
    let src = '';
    src += 'package com.openland.react.graphql\n\n';

    src += 'import com.facebook.react.bridge.ReadableMap\n';
    src += 'import com.apollographql.apollo.api.*\n';
    src += 'import com.openland.api.*\n';
    src += '\n';

    // Parse operations
    let operations: OperationDefinitionNode[] = [];
    for (let v of manifest.operations) {
        for (let d of parse(v.source).definitions) {
            if (d.kind === 'OperationDefinition') {
                operations.push(d);
            }
        }
    }

    // Process Queries
    src += 'fun readQuery(name: String, src: ReadableMap): Query<Operation.Data, Operation.Data, Operation.Variables> {\n';
    for (let op of operations) {
        if (op.operation === 'query') {
            let name = op.name!!.value;
            src += '    if (name == "' + name + '") {\n'
            src += '       val builder = ' + name + 'Query.builder()\n'
            if (op.variableDefinitions) {
                for (let v of op.variableDefinitions) {
                    src += '       builder.' + v.variable.name.value + '(' + buildReader(v.variable.name.value, v.type) + ')\n';
                }
            }
            src += '       return builder.build() as Query<Operation.Data, Operation.Data, Operation.Variables>\n'
            src += '    }\n'
        }
    }
    src += '    throw Error("Unknown query: $name")\n'
    src += '}\n'

    // let operations = manifest.operations.map((v) => parse(v.source).definitions);
    // operations.flatMap()

    // operations.map
    // operations.filter((v)=>v.')

    // for (let o of manifest.operations) {
    //     let doc = o.source;
    //     let parsed = parse(doc);

    // }

    return src;
}