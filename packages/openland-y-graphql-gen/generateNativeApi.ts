import * as fs from 'fs';
import * as path from 'path';
import { parse, NonNullTypeNode, TypeNode, print, VariableDefinitionNode } from 'graphql/language/index';

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
            throw Error();
        }
    } else if (v.kind === 'ListType') {
        if (v.type.kind === 'NamedType') {
            if (v.type.name.value === 'String' || v.type.name.value === 'ID') {
                return 'readListString(src, "' + name + '")'
            } else {
                throw Error();
            }
        } else {
            throw Error(v.type.kind);
        }
    } else if (v.kind === 'NonNullType') {
        return 'notNull(' + buildReader(name, (v as NonNullTypeNode).type) + ')';
    } else {
        throw Error();
    }
}

export function generateNativeApi() {
    let manifestPath = path.resolve(__dirname + '/../../queries.json');
    let manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8")) as { operations: { source: string }[] };
    // let gqlroot = path.resolve(__dirname + '/../../android/app/src/main/graphql/com/openland/api/')
    // let files = fs.readdirSync(gqlroot)
    //     .filter((v) => v.endsWith('.graphql'))
    //     .map((v) => parse(fs.readFileSync(gqlroot + '/' + v, 'utf-8')));

    let map = '';
    map += 'import Apollo\n';
    map += 'class ApiFactory: ApiFactoryBase {\n'
    map += '  func buildQuery(name: String, src: NSDictionary) -> GraphQLQuery {\n'
    for (let m of manifest.operations) {
        let doc = m.source;
        let parsed = parse(doc);
        // console.log(print(parsed));
        for (let def of parsed.definitions) {
            if (def.kind === 'OperationDefinition') {
                if (def.operation === 'query') {
                    map += '    if (name == "' + def.name!!.value + '") {\n'
                    // map += 'Query: ' + def.name!!.value + '(\n';

                    // console.log(def.name!!.value);
                    let vars = fixParameters(def.variableDefinitions);
                    for (let v of vars) {
                        map += '      let ' + v.variable.name.value + ' = ' + buildReader(v.variable.name.value, v.type) + '\n';
                    }
                    map += '      return ' + def.name!!.value + 'Query(' + vars.map((v) => v.variable.name.value + ': ' + v.variable.name.value).join(', ') + ')\n'
                    // map += ')\n';
                    map += '    }\n';
                }
            }
        }
    }
    map += '    fatalError()\n';
    map += '  }\n';
    map += '}\n';
    fs.writeFileSync(path.resolve(__dirname + '/../../ios/APIFactory.swift'), map, 'utf-8');
}

generateNativeApi();