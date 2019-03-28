import * as fs from 'fs';
import * as path from 'path';
import { parse, NonNullTypeNode, TypeNode, VariableDefinitionNode } from 'graphql/language/index';
import { camelCase } from "change-case";

function structNameForPropertyName(propertyName: string) {
    return camelCase(propertyName);
}

function fixParameters(src?: ReadonlyArray<VariableDefinitionNode>): VariableDefinitionNode[] {
    if (src) {
        let res = [...src];
        // console.log(res);
        res.sort((a, b) => a.loc!!.start - b.loc!!.end);
        return res;
    } else {
        return [];
    }
}

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

function buildSchemaListReader(name: string, v: any): string {
    // console.log(v);
    if (v.kind === 'SCALAR') {
        if (v.name === 'String' || v.name === 'ID') {
            return 'readStringList(src, "' + name + '")'
        } else if (v.name === 'Boolean') {
            return 'readBoolList(src, "' + name + '")'
        } else if (v.name === 'Int') {
            return 'readIntList(src, "' + name + '")'
        } else if (v.name === 'Float') {
            return 'readFloatList(src, "' + name + '")'
        } else {
            throw Error('Unknown scalar type: ' + v.name.value);
        }
    } else if (v.kind === 'INPUT_OBJECT' || v.kind === 'ENUM') {
        return 'read' + v.name + 'List(src, "' + name + '")'
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
        if (v.name === 'String' || v.name === 'ID') {
            return 'readOptionalString(src, "' + name + '")'
        } else if (v.name === 'Boolean') {
            return 'readOptionalBool(src, "' + name + '")'
        } else if (v.name === 'Int') {
            return 'readOptionalInt(src, "' + name + '")'
        } else if (v.name === 'Float') {
            return 'readOptionalFloat(src, "' + name + '")'
        } else {
            throw Error('Unknown scalar type: ' + v.name.value);
        }
    } else if (v.kind === 'INPUT_OBJECT' || v.kind === 'ENUM') {
        return 'read' + v.name + 'Optional(src, "' + name + '")'
    } else if (v.kind === 'LIST') {
        return buildSchemaListReader(name, v.ofType);
    } else if (v.kind === 'NON_NULL') {
        return 'optionalNotNull(' + buildSchemaReader(name, v.ofType) + ')';
    } else {
        throw Error();
    }
}

export function generateNativeApi() {
    let manifestPath = path.resolve(__dirname + '/../openland-api/queries.json');
    let manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8")) as {
        operations: {
            source: string,
            filePath: string,
            operationName: string,
            operationType: 'query' | 'mutation' | 'subscription',
            variables: any[]
        }[],
        fragments: {
            fragmentName: string,
            filePath: string,
            fields: {
                responseName: string,
                fieldName: string,
                type: string,
                isConditional: boolean
            }[]
        }[]
    };
    let schemaPath = path.resolve(__dirname + '/../../schema.json');
    let schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8")) as { __schema: { types: { kind: string, name: string, inputFields: { name: string, type: any }[] }[] } };
    // let gqlroot = path.resolve(__dirname + '/../../android/app/src/main/graphql/com/openland/api/')
    // let files = fs.readdirSync(gqlroot)
    //     .filter((v) => v.endsWith('.graphql'))
    //     .map((v) => parse(fs.readFileSync(gqlroot + '/' + v, 'utf-8')));

    let map = '';
    map += 'import Apollo\n';
    map += 'class ApiFactory: ApiFactoryBase {\n'

    // Run Query

    let runQuery = '  func runQuery(client: ApolloClient, name: String, src: NSDictionary, cachePolicy: CachePolicy, handler: @escaping ResponseHandler) {\n';
    let readQuery = '  func readQuery(store: ApolloStore, name: String, src: NSDictionary, handler: @escaping ResponseHandler) {\n';
    let writeQuery = '  func writeQuery(store: ApolloStore, data: NSDictionary, name: String, src: NSDictionary, handler: @escaping ResponseHandler) {\n';
    let writeFragment = '  func writeFragment(store: ApolloStore, data: NSDictionary, name: String, handler: @escaping ResponseHandler) {\n';
    let runMutation = '  func runMutation(client: ApolloClient, name: String, src: NSDictionary, handler: @escaping ResponseHandler) {\n';
    let watchQuery = '  func watchQuery(client: ApolloClient, name: String, src: NSDictionary, cachePolicy: CachePolicy, handler: @escaping ResponseHandler) -> WatchCancel {\n';
    let runSubscription = '  func runSubscription(client: ApolloClient, name: String, src: NSDictionary, handler: @escaping ResponseHandler) -> WatchCancel {\n'
    let inputTypes = '';
    let identifiers = new Set<string>();

    function populateIds(src: TypeNode) {
        if (src.kind === 'ListType') {
            populateIds(src.type)
        } else if (src.kind === 'NamedType') {
            identifiers.add(src.name.value);
        } else if (src.kind === 'NonNullType') {
            populateIds(src.type);
        } else {
            throw Error();
        }
    }

    function populateIds2(src: any): boolean {
        if (src.kind === 'LIST') {
            return populateIds2(src.ofType)
        } else if (src.kind === 'INPUT_OBJECT') {
            let res = false;
            if (!identifiers.has(src.name)) {
                identifiers.add(src.name);
                res = true;
            }
            if (src.inputFields) {
                for (let i of src.inputFields) {
                    let r = populateIds2(i.type);
                    if (r) {
                        res = r;
                    }
                }
            }
            return res;
        } else if (src.kind === 'NON_NULL') {
            return populateIds2(src.ofType);
        } else if (src.kind === 'ENUM' || src.kind === 'SCALAR') {
            if (!identifiers.has(src.name)) {
                identifiers.add(src.name);
                return true;
            }
            return false;
        } else {
            console.warn(src);
            throw Error();
        }
    }

    for (let m of manifest.operations) {
        let doc = m.source;
        let parsed = parse(doc);
        for (let def of parsed.definitions) {
            if (def.kind === 'OperationDefinition') {
                if (def.operation === 'query') {
                    let vars = fixParameters(def.variableDefinitions);
                    for (let v of vars) {
                        populateIds(v.type);
                    }

                    // Run Query
                    runQuery += '    if (name == "' + def.name!!.value + '") {\n'
                    for (let v of vars) {
                        runQuery += '      let ' + v.variable.name.value + ' = ' + buildReader(v.variable.name.value, v.type) + '\n';
                    }
                    runQuery += '      let requestBody = ' + def.name!!.value + 'Query(' + vars.map((v) => v.variable.name.value + ': ' + v.variable.name.value).join(', ') + ')\n'
                    runQuery += '      client.fetch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in\n'
                    runQuery += '          if e != nil {\n'
                    runQuery += '            handler(nil, e)\n'
                    runQuery += '          } else if (r != nil && r!.data != nil) {\n'
                    runQuery += '            handler(r!.data!.resultMap, nil)\n'
                    runQuery += '          } else {\n'
                    runQuery += '            handler(nil, nil)\n'
                    runQuery += '          }\n'
                    runQuery += '      }\n'
                    runQuery += '      return\n'
                    runQuery += '    }\n';

                    // Read Query
                    readQuery += '    if (name == "' + def.name!!.value + '") {\n'
                    for (let v of vars) {
                        readQuery += '      let ' + v.variable.name.value + ' = ' + buildReader(v.variable.name.value, v.type) + '\n';
                    }
                    readQuery += '      let requestBody = ' + def.name!!.value + 'Query(' + vars.map((v) => v.variable.name.value + ': ' + v.variable.name.value).join(', ') + ')\n'
                    readQuery += '      store.withinReadTransaction { (tx) in\n'
                    readQuery += '        handler((try tx.read(query: requestBody)).resultMap, nil)\n';
                    readQuery += '      }\n'
                    readQuery += '      return\n'
                    readQuery += '    }\n';

                    // Write Query
                    writeQuery += '    if (name == "' + def.name!!.value + '") {\n'
                    for (let v of vars) {
                        writeQuery += '      let ' + v.variable.name.value + ' = ' + buildReader(v.variable.name.value, v.type) + '\n';
                    }
                    writeQuery += '      let requestBody = ' + def.name!!.value + 'Query(' + vars.map((v) => v.variable.name.value + ': ' + v.variable.name.value).join(', ') + ')\n'
                    writeQuery += '      let data = ' + def.name!!.value + 'Query.Data(unsafeResultMap: self.convertData(src: data))\n'
                    writeQuery += '      store.withinReadWriteTransaction { (tx) in\n'
                    writeQuery += '        try tx.write(data: data, forQuery: requestBody)\n'
                    writeQuery += '        handler(nil, nil)\n';
                    writeQuery += '      }\n'
                    writeQuery += '      return\n'
                    writeQuery += '    }\n';

                    // WatchQuery
                    watchQuery += '    if (name == "' + def.name!!.value + '") {\n'
                    for (let v of vars) {
                        watchQuery += '      let ' + v.variable.name.value + ' = ' + buildReader(v.variable.name.value, v.type) + '\n';
                    }
                    watchQuery += '      let requestBody = ' + def.name!!.value + 'Query(' + vars.map((v) => v.variable.name.value + ': ' + v.variable.name.value).join(', ') + ')\n'
                    watchQuery += '      let res = client.watch(query: requestBody, cachePolicy: cachePolicy, queue: GraphQLQueue) { (r, e) in\n'
                    watchQuery += '          if e != nil {\n'
                    watchQuery += '            handler(nil, e)\n'
                    watchQuery += '          } else if (r != nil && r!.data != nil) {\n'
                    watchQuery += '            handler(r!.data!.resultMap, nil)\n'
                    watchQuery += '          } else {\n'
                    watchQuery += '            handler(nil, nil)\n'
                    watchQuery += '          }\n'
                    watchQuery += '      }\n'
                    watchQuery += '      return { () in res.cancel() }\n'
                    watchQuery += '    }\n';
                } else if (def.operation === 'mutation') {
                    let vars = fixParameters(def.variableDefinitions);
                    for (let v of vars) {
                        populateIds(v.type);
                    }

                    runMutation += '    if (name == "' + def.name!!.value + '") {\n'
                    for (let v of vars) {
                        runMutation += '      let ' + v.variable.name.value + ' = ' + buildReader(v.variable.name.value, v.type) + '\n';
                    }
                    runMutation += '      let requestBody = ' + def.name!!.value + 'Mutation(' + vars.map((v) => v.variable.name.value + ': ' + v.variable.name.value).join(', ') + ')\n'
                    runMutation += '      client.perform(mutation: requestBody, queue: GraphQLQueue) { (r, e) in\n'
                    runMutation += '          if e != nil {\n'
                    runMutation += '            handler(nil, e)\n'
                    runMutation += '          } else if (r != nil && r!.errors != nil) {\n'
                    runMutation += '            handler(nil, NativeGraphqlError(src: r!.errors!))\n'
                    runMutation += '          } else if (r != nil && r!.data != nil) {\n'
                    runMutation += '            handler(r!.data!.resultMap, nil)\n'
                    runMutation += '          } else {\n'
                    runMutation += '            handler(nil, nil)\n'
                    runMutation += '          }\n'
                    runMutation += '      }\n'
                    runMutation += '      return\n'
                    runMutation += '    }\n';
                } else if (def.operation === 'subscription') {
                    let vars = fixParameters(def.variableDefinitions);
                    for (let v of vars) {
                        populateIds(v.type);
                    }

                    runSubscription += '    if (name == "' + def.name!!.value + '") {\n'
                    for (let v of vars) {
                        runSubscription += '      let ' + v.variable.name.value + ' = ' + buildReader(v.variable.name.value, v.type) + '\n';
                    }
                    runSubscription += '      let requestBody = ' + def.name!!.value + 'Subscription(' + vars.map((v) => v.variable.name.value + ': ' + v.variable.name.value).join(', ') + ')\n'
                    runSubscription += '      let res = client.subscribe(subscription: requestBody, queue: GraphQLQueue) { (r, e) in\n'
                    runSubscription += '          if e != nil {\n'
                    runSubscription += '            handler(nil, e)\n'
                    runSubscription += '          } else if (r != nil && r!.data != nil) {\n'
                    runSubscription += '            handler(r!.data!.resultMap, nil)\n'
                    runSubscription += '          } else {\n'
                    runSubscription += '            handler(nil, nil)\n'
                    runSubscription += '          }\n'
                    runSubscription += '      }\n'
                    runSubscription += '      return { () in res.cancel() }\n'
                    runSubscription += '    }\n';
                }
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

    for (let type of schema.__schema.types) {
        if (type.kind === 'INPUT_OBJECT' && identifiers.has(type.name)) {

            inputTypes += '  func parse' + type.name + '(_ src: NSDictionary) -> ' + type.name + ' {\n'
            for (let v of type.inputFields) {
                inputTypes += '    let ' + v.name + ' = ' + buildSchemaReader(v.name, v.type) + '\n';
            }
            inputTypes += '    return ' + type.name + '(' + type.inputFields!.map((v) => structNameForPropertyName(v.name) + ': ' + v.name).join(', ') + ')\n'
            inputTypes += '  }\n';

            inputTypes += '  func read' + type.name + '(_ src: NSDictionary, _ name: String) -> ' + type.name + '? {\n'
            inputTypes += '    let v = src[name]\n'
            inputTypes += '    if v != nil && !(v is NSNull) {\n'
            inputTypes += '      return self.parse' + type.name + '(v as! NSDictionary)\n'
            inputTypes += '    } else {\n'
            inputTypes += '      return nil\n'
            inputTypes += '    }\n'
            inputTypes += '  }\n'
            inputTypes += '  func read' + type.name + 'Optional(_ src: NSDictionary, _ name: String) -> Optional<' + type.name + '?> {\n'
            inputTypes += '    let v = src[name]\n'
            inputTypes += '    if v != nil {\n'
            inputTypes += '      if (v is NSNull) {'
            inputTypes += '        return Optional.some(nil)'
            inputTypes += '      } else {\n'
            inputTypes += '        return Optional.some(self.parse' + type.name + '(v as! NSDictionary))\n'
            inputTypes += '      }\n'
            inputTypes += '    } else {\n'
            inputTypes += '      return Optional.none\n'
            inputTypes += '    }\n'
            inputTypes += '  }\n'

            inputTypes += '  func read' + type.name + 'List(_ src: NSDictionary, _ name: String) -> [' + type.name + '?]? {\n'
            inputTypes += '    let v = src[name]\n'
            inputTypes += '    if v != nil && !(v is NSNull) {\n'
            inputTypes += '      let items = v as! [NSDictionary?]\n'
            inputTypes += '      var res: [' + type.name + '?] = []\n'
            inputTypes += '      for i in 0..<items.count {\n'
            inputTypes += '        let itm = items[i]\n'
            inputTypes += '        if itm != nil && !(itm is NSNull) {\n'
            inputTypes += '          res.append(self.parse' + type.name + '(itm!))\n'
            inputTypes += '        } else {\n'
            inputTypes += '          res.append(nil)\n'
            inputTypes += '        }\n'
            inputTypes += '      }\n'
            inputTypes += '      return res\n'
            inputTypes += '    } else {\n'
            inputTypes += '      return nil\n'
            inputTypes += '    }\n'
            inputTypes += '  }\n'
        }
        if (type.kind === 'ENUM' && identifiers.has(type.name)) {
            inputTypes += '  func read' + type.name + '(_ src: NSDictionary, _ name: String) -> ' + type.name + '? {\n'
            inputTypes += '    let v = self.readString(src, name);\n'
            inputTypes += '    if v != nil && !(v is NSNull) {\n'
            inputTypes += '      return ' + type.name + '.init(rawValue: v!)\n'
            inputTypes += '     } else {\n'
            inputTypes += '       return nil\n'
            inputTypes += '     }\n'
            inputTypes += '  }\n';
            inputTypes += '  func read' + type.name + 'Optional(_ src: NSDictionary, _ name: String) -> Optional<' + type.name + '?> {\n'
            inputTypes += '    let v = self.readString(src, name);\n'
            inputTypes += '    if v != nil {\n'
            inputTypes += '      if (v is NSNull) {\n'
            inputTypes += '        return Optional.some(nil)\n'
            inputTypes += '      } else {\n'
            inputTypes += '        return Optional.some(' + type.name + '.init(rawValue: v!))\n'
            inputTypes += '      }\n'
            inputTypes += '     } else {\n'
            inputTypes += '       return Optional.none\n'
            inputTypes += '     }\n'
            inputTypes += '  }\n';
        }
    }

    for (let f of manifest.fragments) {
        let id = f.fields.find((v) => v.fieldName === 'id' && !v.isConditional);
        let typename = f.fields.find((v) => v.fieldName === '__typename' && !v.isConditional);
        if (id && typename) {
            writeFragment += '    if name == "' + f.fragmentName + '" {\n'
            writeFragment += '      let data = ' + f.fragmentName + '(unsafeResultMap: self.convertData(src: data))\n';
            writeFragment += '      let key = data.id + ":" + data.__typename\n'
            writeFragment += '      store.withinReadWriteTransaction { (tx) in\n';
            writeFragment += '        try tx.write(object: data, withKey: key)\n';
            writeFragment += '        handler(nil, nil)\n';
            writeFragment += '      }\n';
            writeFragment += '      return\n';
            writeFragment += '    }\n'
        }
    }

    // else if (def.kind === 'InputObjectTypeDefinition') {
    //     inputTypes += 'read' + def.name.value + '(_ src: NSDictionary, _ name: String) {\n'
    //     for (let v of def.fields!) {
    //         inputTypes += '      let ' + v.name.value + ' = ' + buildReader(v.name.value, v.type) + '\n';
    //     }
    //     inputTypes += '      return ' + def.name!!.value + '(' + def.fields!.map((v) => v.name.value + ': ' + v.name.value).join(', ') + ')\n'
    //     inputTypes += '}\n';
    // }

    runQuery += '    fatalError()\n';
    runQuery += '  }\n';
    watchQuery += '    fatalError()\n';
    watchQuery += '  }\n';
    runMutation += '    fatalError()\n';
    runMutation += '  }\n'
    runSubscription += '    fatalError()\n';
    runSubscription += '  }\n';
    readQuery += '    fatalError()\n';
    readQuery += '  }\n';
    writeQuery += '    fatalError()\n';
    writeQuery += '  }\n';
    writeFragment += '    fatalError()\n';
    writeFragment += '  }\n';

    map += runQuery;
    map += '\n';
    map += watchQuery;
    map += '\n';
    map += runMutation;
    map += '\n';
    map += runSubscription
    map += '\n';
    map += readQuery;
    map += '\n';
    map += writeQuery;
    map += '\n';
    map += writeFragment;
    map += '\n';

    map += inputTypes;

    map += '}\n';
    fs.writeFileSync(path.resolve(__dirname + '/../../ios/APIFactory.swift'), map, 'utf-8');
}

generateNativeApi();