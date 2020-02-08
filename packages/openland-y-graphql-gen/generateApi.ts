import * as fs from 'fs';
import * as path from 'path';
import * as graphql from 'graphql';

function generateApi() {

    var walk = function (dir: string, ext: string) {
        var results: string[] = [];
        var list = fs.readdirSync(dir);
        list.forEach(function (file: string) {
            file = dir + '/' + file;
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                /* Recurse into a subdirectory */
                results = results.concat(walk(file, ext));
            } else {
                /* Is a file */
                if (file.endsWith(ext)) {
                    results.push(file);
                }
            }
        });
        return results;
    };

    let definitionFiles = walk(path.resolve(__dirname, '../openland-api/definitions/'), '.graphql');
    let definitions: string = '';
    for (let f of definitionFiles) {
        definitions += fs.readFileSync(f, 'utf-8') + '\n';
    }

    let doc = graphql.parse(definitions);

    // let queries = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../openland-api/queries.json'), 'utf-8')) as {
    //     operations: {
    //         filePath: string,
    //         operationName: string,
    //         operationType: 'query' | 'mutation' | 'subscription',
    //         variables: any[]
    //     }[],
    //     fragments: {
    //         fragmentName: string,
    //         filePath: string
    //     }[]
    // };

    function forEachMutation(callback: (name: string, hasVariables: boolean) => void) {
        for (let op of doc.definitions) {
            if (op.kind === 'OperationDefinition') {
                let name = op.name!.value;
                if (op.operation === 'mutation') {
                    callback(name, op.variableDefinitions && op.variableDefinitions.length > 0 || false);
                }
            }
        }
    }

    function forEachQuery(callback: (name: string, hasVariables: boolean) => void) {
        for (let op of doc.definitions) {
            if (op.kind === 'OperationDefinition') {
                let name = op.name!.value;
                if (op.operation === 'query') {
                    callback(name, op.variableDefinitions && op.variableDefinitions.length > 0 || false);
                }
            }
        }
    }

    function forEachSubscription(callback: (name: string, hasVariables: boolean) => void) {
        for (let op of doc.definitions) {
            if (op.kind === 'OperationDefinition') {
                let name = op.name!.value;
                if (op.operation === 'subscription') {
                    callback(name, op.variableDefinitions && op.variableDefinitions.length > 0 || false);
                }
            }
        }
    }

    let output = '';
    output += 'import * as Types from \'./Types\';\n';
    output += 'import { GraphqlEngine, GraphqlActiveSubscription, OperationParameters, GraphqlSubscriptionHandler } from \'@openland/spacex\';\n';
    output += 'import { BaseApiClient, ApiQueryWatchParameters } from \'openland-graphql/BaseApiClient\';\n';
    output += '\n';
    output += 'export class OpenlandClient extends BaseApiClient {\n';
    output += '    constructor(engine: GraphqlEngine) {\n';
    output += '        super(engine);\n';
    output += '    }\n';

    // Queries
    forEachQuery((name, hasVariables) => {
        if (hasVariables) {
            output += '    async query' + name + '(variables: Types.' + name + 'Variables, opts?: OperationParameters): Promise<Types.' + name + '> {\n';
            output += '        return this.query(\'' + name + '\', variables, opts);\n';
            output += '    }\n';
        } else {
            output += '    async query' + name + '(opts?: OperationParameters): Promise<Types.' + name + '> {\n';
            output += '        return this.query(\'' + name + '\', undefined, opts);\n';
            output += '    }\n';
        }
    });

    // Refetch
    forEachQuery((name, hasVariables) => {
        if (hasVariables) {
            output += '    async refetch' + name + '(variables: Types.' + name + 'Variables): Promise<Types.' + name + '> {\n';
            output += '        return this.refetch(\'' + name + '\', variables);\n';
            output += '    }\n';
        } else {
            output += '    async refetch' + name + '(): Promise<Types.' + name + '> {\n';
            output += '        return this.refetch(\'' + name + '\');\n';
            output += '    }\n';
        }
    });

    // Update
    forEachQuery((name, hasVariables) => {
        if (hasVariables) {
            output += '    async update' + name + '(variables: Types.' + name + 'Variables, updater: (data: Types.' + name + ') => Types.' + name + ' | null): Promise<boolean> {\n';
            output += '        return this.updateQuery(updater, \'' + name + '\', variables);\n';
            output += '    }\n';
        } else {
            output += '    async update' + name + '(updater: (data: Types.' + name + ') => Types.' + name + ' | null): Promise<boolean> {\n';
            output += '        return this.updateQuery(updater, \'' + name + '\');\n';
            output += '    }\n';
        }
    });

    // Hooks
    forEachQuery((name, hasVariables) => {
        if (hasVariables) {
            output += '    use' + name + '(variables: Types.' + name + 'Variables, opts: ApiQueryWatchParameters & { suspense: false }): Types.' + name + ' | null;\n';
            output += '    use' + name + '(variables: Types.' + name + 'Variables, opts?: ApiQueryWatchParameters): Types.' + name + ';\n';
            output += '    use' + name + '(variables: Types.' + name + 'Variables, opts?: ApiQueryWatchParameters): Types.' + name + ' | null {\n';
            output += '        return this.useQuery(\'' + name + '\', variables, opts);\n';
            output += '    }\n';
        } else {
            output += '    use' + name + '(opts: ApiQueryWatchParameters & { suspense: false }): Types.' + name + ' | null;\n';
            output += '    use' + name + '(opts?: ApiQueryWatchParameters): Types.' + name + ';\n';
            output += '    use' + name + '(opts?: ApiQueryWatchParameters): Types.' + name + ' | null {\n';
            output += '        return this.useQuery(\'' + name + '\', undefined, opts);\n';
            output += '    }\n';
        }
    });

    // Mutations
    forEachMutation((name, hasVariables) => {
        if (hasVariables) {
            output += '    async mutate' + name + '(variables: Types.' + name + 'Variables): Promise<Types.' + name + '> {\n';
            output += '        return this.mutate(\'' + name + '\', variables);\n';
            output += '    }\n';
        } else {
            output += '    async mutate' + name + '(): Promise<Types.' + name + '> {\n';
            output += '        return this.mutate(\'' + name + '\');\n';
            output += '    }\n';
        }
    });

    // Subscriptions
    forEachSubscription((name, hasVariables) => {
        if (hasVariables) {
            output += '    subscribe' + name + '(variables: Types.' + name + 'Variables, handler: GraphqlSubscriptionHandler<Types.' + name + '>): GraphqlActiveSubscription<Types.' + name + '> {\n';
            output += '        return this.subscribe(handler, \'' + name + '\', variables);\n';
            output += '    }\n';
        } else {
            output += '    subscribe' + name + '(handler: GraphqlSubscriptionHandler<Types.' + name + '>): GraphqlActiveSubscription<Types.' + name + '> {\n';
            output += '        return this.subscribe(handler, \'' + name + '\');\n';
            output += '    }\n';
        }
    });

    output += '}\n';

    fs.writeFileSync(path.resolve(__dirname + '/../openland-api/spacex.ts'), output, 'utf-8');
}

generateApi();