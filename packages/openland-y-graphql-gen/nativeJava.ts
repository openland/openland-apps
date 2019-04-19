import { Manifest, Schema } from "./types";
import { parse, OperationTypeNode, OperationDefinitionNode, TypeNode, NonNullTypeNode } from 'graphql/language/index';

function buildItemReader(name: string, v: TypeNode): string {
    if (v.kind === 'NamedType') {
        if (v.name.value === 'String' || v.name.value === 'ID' || v.name.value === 'Date') {
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
        if (v.name.value === 'String' || v.name.value === 'ID' || v.name.value === 'Date') {
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

function buildSchemaListReader(name: string, v: any): string {
    // console.log(v);
    if (v.kind === 'SCALAR') {
        if (v.name === 'String' || v.name === 'ID' || v.name === 'Date') {
            return 'readOptionalStringList(src, "' + name + '")'
        } else if (v.name === 'Boolean') {
            return 'readBoolList(src, "' + name + '")'
        } else if (v.name === 'Int') {
            return 'readIntList(src, "' + name + '")'
        } else if (v.name === 'Float') {
            return 'readFloatList(src, "' + name + '")'
        } else {
            throw Error('Unknown scalar type: ' + v.name);
        }
    } else if (v.kind === 'INPUT_OBJECT' || v.kind === 'ENUM') {
        return 'read' + v.name + 'ListOptional(src, "' + name + '")'
    } else if (v.kind === 'NON_NULL') {
        return 'notNullListItems(' + buildSchemaListReader(name, v.ofType) + ')';
    } else if (v.kind === 'LIST') {
        // return buildSchemaListReader(name, v.ofType);
        throw Error();
    } else {
        throw Error();
    }
}

function buildSchemaReader(name: string, v: any): string {
    // console.log(v);
    if (v.kind === 'SCALAR') {
        if (v.name === 'String' || v.name === 'ID' || v.name === 'Date') {
            return 'readOptionalString(src, "' + name + '")'
        } else if (v.name === 'Boolean') {
            return 'readOptionalBool(src, "' + name + '")'
        } else if (v.name === 'Int') {
            return 'readOptionalInt(src, "' + name + '")'
        } else if (v.name === 'Float') {
            return 'readOptionalFloat(src, "' + name + '")'
        } else {
            throw Error('Unknown scalar type: ' + v.name);
        }
    } else if (v.kind === 'INPUT_OBJECT' || v.kind === 'ENUM') {
        return 'read' + v.name + 'Optional(src, "' + name + '")'
    } else if (v.kind === 'LIST') {
        return buildSchemaListReader(name, v.ofType);
    } else if (v.kind === 'NON_NULL') {
        return 'notNull(' + buildSchemaReader(name, v.ofType) + ')';
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
    src += 'import com.openland.api.type.*\n';
    src += 'import com.openland.api.fragment.*\n';
    src += '\n';

    let identifiers = new Set<string>();

    function populateIds(src2: TypeNode) {
        if (src2.kind === 'ListType') {
            populateIds(src2.type)
        } else if (src2.kind === 'NamedType') {
            identifiers.add(src2.name.value);
        } else if (src2.kind === 'NonNullType') {
            populateIds(src2.type);
        } else {
            throw Error();
        }
    }

    function populateIds2(src2: any): boolean {
        if (src2.kind === 'LIST') {
            return populateIds2(src2.ofType)
        } else if (src2.kind === 'INPUT_OBJECT') {
            let res = false;
            if (!identifiers.has(src2.name)) {
                identifiers.add(src2.name);
                res = true;
            }
            if (src2.inputFields) {
                for (let i of src2.inputFields) {
                    let r = populateIds2(i.type);
                    if (r) {
                        res = r;
                    }
                }
            }
            return res;
        } else if (src2.kind === 'NON_NULL') {
            return populateIds2(src2.ofType);
        } else if (src2.kind === 'ENUM' || src2.kind === 'SCALAR') {
            if (!identifiers.has(src2.name)) {
                identifiers.add(src2.name);
                return true;
            }
            return false;
        } else {
            console.warn(src);
            throw Error();
        }
    }

    // Parse operations and resolve scopes
    let operations: OperationDefinitionNode[] = [];
    for (let v of manifest.operations) {
        for (let d of parse(v.source).definitions) {
            if (d.kind === 'OperationDefinition') {
                if (d.variableDefinitions) {
                    for (let v2 of d.variableDefinitions) {
                        populateIds(v2.type);
                    }
                }
                operations.push(d);
            }
        }
    }
    var hasUnresolved = true;
    while (hasUnresolved) {
        hasUnresolved = false;
        for (let type of schema.__schema.types) {
            if (type.kind === 'INPUT_OBJECT' && identifiers.has(type.name)) {
                hasUnresolved = hasUnresolved || populateIds2(type);
            }
        }
    }

    // Enums
    for (let type of schema.__schema.types) {
        if (type.kind === 'ENUM' && identifiers.has(type.name)) {
            src += 'fun read' + type.name + '(src: ReadableMap, name: String): ' + type.name + '? {\n'
            src += '    val v = readString(src, name);\n'
            src += '    if (v != null) {\n'
            src += '        return ' + type.name + '.safeValueOf(v)\n'
            src += '    } else {\n'
            src += '        return null\n'
            src += '    }\n'
            src += '}\n';

            src += 'fun read' + type.name + 'Optional(src: ReadableMap, name: String): Input<' + type.name + '> {\n'
            src += '    val v = readOptionalString(src, name);\n'
            src += '    if (v.defined) {\n'
            src += '        if (v.value != null) {\n'
            src += '          return Input.fromNullable(' + type.name + '.safeValueOf(v.value))\n'
            src += '        } else {\n'
            src += '          return Input.fromNullable(null)\n'
            src += '        }\n'
            src += '    } else {\n'
            src += '        return Input.absent()\n'
            src += '    }\n'
            src += '}\n';
        }
    }

    // Input typess
    for (let type of schema.__schema.types) {
        if (type.kind === 'INPUT_OBJECT' && identifiers.has(type.name)) {
            src += 'fun parse' + type.name + '(src: ReadableMap): ' + type.name + ' {\n'
            src += '    val builder = ' + type.name + '.builder()\n'
            for (let v of type.inputFields) {
                if (v.type.kind === 'NON_NULL') {
                    src += '    builder.' + v.name + '(' + buildSchemaReader(v.name, v.type) + ')\n';
                } else {
                    src += '    builder.' + v.name + 'Input(' + buildSchemaReader(v.name, v.type) + ')\n';
                }
            }
            src += '    return builder.build()\n'
            src += '}\n';

            src += 'fun read' + type.name + '(src: ReadableMap, name: String): ' + type.name + '? {\n'
            src += '    if (src.hasKey(name)) {\n'
            src += '        if (src.isNull(name)) {\n'
            src += '            return null\n'
            src += '        } else {\n'
            src += '            return parse' + type.name + '(src.getMap(name)!!)\n'
            src += '        }\n'
            src += '    } else {\n'
            src += '        return null\n';
            src += '    }\n'
            src += '}\n';

            src += 'fun read' + type.name + 'List(src: ReadableMap, name: String): List<' + type.name + '?>? {\n'
            src += '    if (src.hasKey(name)) {\n'
            src += '        if (src.isNull(name)) {\n'
            src += '            return null\n'
            src += '        } else {\n'
            src += '            val items = src.getArray(name)!!\n'
            src += '            val res = mutableListOf<' + type.name + '?>()\n'
            src += '            for(i in 0 until items.size()) {\n'
            src += '                if (items.isNull(i)) {\n'
            src += '                    res.add(null)\n'
            src += '                } else {\n'
            src += '                    res.add(parse' + type.name + '(items.getMap(i)!!))\n'
            src += '                }\n'
            src += '            }\n'
            src += '            return res\n'
            src += '        }\n'
            src += '    } else {\n'
            src += '        return null\n';
            src += '    }\n'
            src += '}\n';

            src += 'fun read' + type.name + 'Optional(src: ReadableMap, name: String): Input<' + type.name + '> {\n'
            src += '    if (src.hasKey(name)) {\n'
            src += '        if (src.isNull(name)) {\n'
            src += '            return Input.fromNullable(null)\n'
            src += '        } else {\n'
            src += '            return Input.fromNullable(parse' + type.name + '(src.getMap(name)!!))\n'
            src += '        }\n'
            src += '    } else {\n'
            src += '        return Input.absent()\n';
            src += '    }\n'
            src += '}\n';

            src += 'fun read' + type.name + 'ListOptional(src: ReadableMap, name: String): Input<List<' + type.name + '?>> {\n'
            src += '    if (src.hasKey(name)) {\n'
            src += '        if (src.isNull(name)) {\n'
            src += '            return Input.fromNullable(null)\n'
            src += '        } else {\n'
            src += '            val items = src.getArray(name)!!\n'
            src += '            val res = mutableListOf<' + type.name + '?>()\n'
            src += '            for(i in 0 until items.size()) {\n'
            src += '                if (items.isNull(i)) {\n'
            src += '                    res.add(null)\n'
            src += '                } else {\n'
            src += '                    res.add(parse' + type.name + '(items.getMap(i)!!))\n'
            src += '                }\n'
            src += '            }\n'
            src += '            return Input.fromNullable(res)\n'
            src += '        }\n'
            src += '    } else {\n'
            src += '        return Input.absent()\n';
            src += '    }\n'
            src += '}\n';
        }
    }

    // Queries
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

    // Subsciptions
    src += 'fun readSubscription(name: String, src: ReadableMap): Subscription<Operation.Data, Operation.Data, Operation.Variables> {\n';
    for (let op of operations) {
        if (op.operation === 'subscription') {
            let name = op.name!!.value;
            src += '    if (name == "' + name + '") {\n'
            src += '       val builder = ' + name + 'Subscription.builder()\n'
            if (op.variableDefinitions) {
                for (let v of op.variableDefinitions) {
                    src += '       builder.' + v.variable.name.value + '(' + buildReader(v.variable.name.value, v.type) + ')\n';
                }
            }
            src += '       return builder.build() as Subscription<Operation.Data, Operation.Data, Operation.Variables>\n'
            src += '    }\n'
        }
    }
    src += '    throw Error("Unknown subscription: $name")\n'
    src += '}\n'

    // Mutations
    src += 'fun readMutation(name: String, src: ReadableMap): Mutation<Operation.Data, Operation.Data, Operation.Variables> {\n';
    for (let op of operations) {
        if (op.operation === 'mutation') {
            let name = op.name!!.value;
            src += '    if (name == "' + name + '") {\n'
            src += '       val builder = ' + name + 'Mutation.builder()\n'
            if (op.variableDefinitions) {
                for (let v of op.variableDefinitions) {
                    src += '       builder.' + v.variable.name.value + '(' + buildReader(v.variable.name.value, v.type) + ')\n';
                }
            }
            src += '       return builder.build() as Mutation<Operation.Data, Operation.Data, Operation.Variables>\n'
            src += '    }\n'
        }
    }
    src += '    throw Error("Unknown mutation: $name")\n'
    src += '}\n'

    // Fragments

    src += 'fun readFragment(name: String, src: ReadableMap): Pair<String, GraphqlFragment> {\n';
    for (let f of manifest.fragments) {
        let id = f.fields.find((v) => v.fieldName === 'id' && !v.isConditional);
        let typename = f.fields.find((v) => v.fieldName === '__typename' && !v.isConditional);
        if (id && typename) {
            src += '    if (name == "' + f.fragmentName + '") {\n'
            src += '        val res = ' + f.fragmentName + '.Mapper().map(responseReader(src))\n'
            src += '        return (res.__typename() + "$" + res.id()) to res\n'
            src += '    }\n'
        }
    }
    src += '    throw Error("Unknown Fragment: $name")\n'
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