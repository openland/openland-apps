import * as fs from 'fs';
import * as path from 'path';

function generateApi() {
    let queries = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../openland-api/queries.json'), 'utf-8')) as {
        operations: {
            filePath: string,
            operationName: string,
            operationType: 'query' | 'mutation' | 'subscription',
            variables: any[]
        }[],
        fragments: {
            fragmentName: string,
            filePath: string
        }[]
    };

    function forEachQuery(callback: (id: string, name: string, hasVariables: boolean) => void) {
        for (let op of queries.operations) {
            if (op.operationType === 'query') {
                let name = op.operationName;
                if (name.endsWith('Query')) {
                    name = name.substring(0, name.length - 'Query'.length);
                }
                callback(op.operationName, name, op.variables.length > 0);
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
    forEachQuery((id, name, hasVariables) => {
        if (hasVariables) {
            output += '    async query' + name + '(variables: Types.' + name + 'Variables, opts?: OperationParameters): Promise<Types.' + name + '> {\n';
            output += '        return this.query(\'' + id + '\', variables, opts);\n';
            output += '    }\n';
        } else {
            output += '    async query' + name + '(opts?: OperationParameters): Promise<Types.' + name + '> {\n';
            output += '        return this.query(\'' + id + '\', undefined, opts);\n';
            output += '    }\n';
        }
    });

    // Refetch
    forEachQuery((id, name, hasVariables) => {
        if (hasVariables) {
            output += '    async refetch' + name + '(variables: Types.' + name + 'Variables): Promise<Types.' + name + '> {\n';
            output += '        return this.refetch(\'' + id + '\', variables);\n';
            output += '    }\n';
        } else {
            output += '    async refetch' + name + '(): Promise<Types.' + name + '> {\n';
            output += '        return this.refetch(\'' + id + '\');\n';
            output += '    }\n';
        }
    });

    // Update
    forEachQuery((id, name, hasVariables) => {
        if (hasVariables) {
            output += '    async update' + name + '(variables: Types.' + name + 'Variables, updater: (data: Types.' + name + ') => Types.' + name + ' | null): Promise<boolean> {\n';
            output += '        return this.updateQuery(updater, \'' + id + '\', variables);\n';
            output += '    }\n';
        } else {
            output += '    async update' + name + '(updater: (data: Types.' + name + ') => Types.' + name + ' | null): Promise<boolean> {\n';
            output += '        return this.updateQuery(updater, \'' + id + '\');\n';
            output += '    }\n';
        }
    });

    // Hooks
    forEachQuery((id, name, hasVariables) => {
        if (hasVariables) {
            output += '    use' + name + '(variables: Types.' + name + 'Variables, opts: ApiQueryWatchParameters & { suspense: false }): Types.' + name + ' | null;\n';
            output += '    use' + name + '(variables: Types.' + name + 'Variables, opts?: ApiQueryWatchParameters): Types.' + name + ';\n';
            output += '    use' + name + '(variables: Types.' + name + 'Variables, opts?: ApiQueryWatchParameters): Types.' + name + ' | null {\n';
            output += '        return this.useQuery(\'' + id + '\', variables, opts);\n';
            output += '    }\n';
        } else {
            output += '    use' + name + '(opts: ApiQueryWatchParameters & { suspense: false }): Types.' + name + ' | null;\n';
            output += '    use' + name + '(opts?: ApiQueryWatchParameters): Types.' + name + ';\n';
            output += '    use' + name + '(opts?: ApiQueryWatchParameters): Types.' + name + ' | null {\n';
            output += '        return this.useQuery(\'' + id + '\', undefined, opts);\n';
            output += '    }\n';
        }
    });

    // Mutations
    for (let op of queries.operations) {
        if (op.operationType === 'mutation') {
            let name = op.operationName as string;
            if (name.endsWith('Mutation')) {
                name = name.substring(0, name.length - 'Mutation'.length);
            }

            if (op.variables.length > 0) {
                output += '    async mutate' + name + '(variables: Types.' + name + 'Variables): Promise<Types.' + name + '> {\n';
                output += '        return this.mutate(\'' + op.operationName + '\', variables);\n';
                output += '    }\n';
            } else {
                output += '    async mutate' + name + '(): Promise<Types.' + name + '> {\n';
                output += '        return this.mutate(\'' + op.operationName + '\');\n';
                output += '    }\n';
            }
        }
    }

    // Subscriptions
    for (let op of queries.operations) {
        if (op.operationType === 'subscription') {
            let name = op.operationName;
            if (name.endsWith('Subscription')) {
                name = name.substring(0, name.length - 'Subscription'.length);
            }

            if (op.variables.length > 0) {
                output += '    subscribe' + name + '(variables: Types.' + name + 'Variables, handler: GraphqlSubscriptionHandler<Types.' + name + '>): GraphqlActiveSubscription<Types.' + name + '> {\n';
                output += '        return this.subscribe(handler, \'' + op.operationName + '\', variables);\n';
                output += '    }\n';
            } else {
                output += '    subscribe' + name + '(handler: GraphqlSubscriptionHandler<Types.' + name + '>): GraphqlActiveSubscription<Types.' + name + '> {\n';
                output += '        return this.subscribe(handler, \'' + op.operationName + '\');\n';
                output += '    }\n';
            }
        }
    }

    output += '}\n';

    fs.writeFileSync(path.resolve(__dirname + '/../openland-api/OpenlandClient.ts'), output, 'utf-8');
}

generateApi();