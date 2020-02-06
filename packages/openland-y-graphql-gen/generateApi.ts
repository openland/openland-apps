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

    let output = '';
    output += 'import * as Types from \'./Types\';\n';
    output += 'import { GraphqlClient, GraphqlActiveSubscription, OperationParameters, QueryWatchParameters } from \'openland-graphql/GraphqlClient\';\n';
    output += 'import { BaseApiClient } from \'openland-graphql/BaseApiClient\';\n';
    output += '\n';
    output += 'export class OpenlandClient extends BaseApiClient {\n';
    output += '    constructor(client: GraphqlClient) {\n';
    output += '        super(client);\n';
    output += '    }\n';

    for (let op of queries.operations) {
        if (op.operationType === 'query') {
            let name = op.operationName;
            if (name.endsWith('Query')) {
                name = name.substring(0, name.length - 'Query'.length);
            }

            if (op.variables.length > 0) {
                output += '    async query' + name + '(variables: Types.' + name + 'Variables, opts?: OperationParameters): Promise<Types.' + name + '> {\n';
                output += '        return this.client.query(\'' + op.operationName + '\', variables, opts);\n';
                output += '    }\n';
                output += '    async refetch' + name + '(variables: Types.' + name + 'Variables): Promise<Types.' + name + '> {\n';
                output += '        return this.refetch(\'' + op.operationName + '\', variables);\n';
                output += '    }\n';
                output += '    use' + name + '(variables: Types.' + name + 'Variables, opts?: QueryWatchParameters): Types.' + name + ' {\n';
                output += '        return this.useQuerySuspense(\'' + op.operationName + '\', variables, opts);\n';
                output += '    }\n';
                output += '    useWithoutLoader' + name + '(variables: Types.' + name + 'Variables, opts?: QueryWatchParameters): Types.' + name + ' | null {\n';
                output += '        return this.useQuery(\'' + op.operationName + '\', variables, opts);\n';
                output += '    }\n';
            } else {
                output += '    async query' + name + '(opts?: OperationParameters): Promise<Types.' + name + '> {\n';
                output += '        return this.client.query(\'' + op.operationName + '\', undefined, opts);\n';
                output += '    }\n';
                output += '    async refetch' + name + '(): Promise<Types.' + name + '> {\n';
                output += '        return this.refetch(\'' + op.operationName + '\');\n';
                output += '    }\n';
                output += '    use' + name + '(opts?: QueryWatchParameters): Types.' + name + ' {\n';
                output += '        return this.useQuerySuspense(\'' + op.operationName + '\', undefined, opts);\n';
                output += '    }\n';
                output += '    useWithoutLoader' + name + '(opts?: QueryWatchParameters): Types.' + name + ' | null {\n';
                output += '        return this.useQuery(\'' + op.operationName + '\', undefined, opts);\n';
                output += '    }\n';
            }

            if (op.variables.length > 0) {
                output += '    async updateQuery' + name + '(updater: (data: Types.' + name + ') => Types.' + name + ' | null, variables: Types.' + name + 'Variables): Promise<boolean> {\n';
                output += '        return this.client.updateQuery(updater, \'' + op.operationName + '\', variables);\n';
                output += '    }\n';
            } else {
                output += '    async updateQuery' + name + '(updater: (data: Types.' + name + ') => Types.' + name + ' | null): Promise<boolean> {\n';
                output += '        return this.client.updateQuery(updater, \'' + op.operationName + '\');\n';
                output += '    }\n';
            }
        }
    }

    for (let op of queries.operations) {
        if (op.operationType === 'mutation') {
            let name = op.operationName as string;
            if (name.endsWith('Mutation')) {
                name = name.substring(0, name.length - 'Mutation'.length);
            }

            if (op.variables.length > 0) {
                output += '    async mutate' + name + '(variables: Types.' + name + 'Variables): Promise<Types.' + name + '> {\n';
                output += '        return this.client.mutate(\'' + op.operationName + '\', variables);\n';
                output += '    }\n';
            } else {
                output += '    async mutate' + name + '(): Promise<Types.' + name + '> {\n';
                output += '        return this.client.mutate(\'' + op.operationName + '\');\n';
                output += '    }\n';
            }
        }
    }

    for (let op of queries.operations) {
        if (op.operationType === 'subscription') {
            let name = op.operationName;
            if (name.endsWith('Subscription')) {
                name = name.substring(0, name.length - 'Subscription'.length);
            }

            if (op.variables.length > 0) {
                output += '    subscribe' + name + '(variables: Types.' + name + 'Variables): GraphqlActiveSubscription<Types.' + name + ', Types.' + name + 'Variables> {\n';
                output += '        return this.client.subscribe(\'' + op.operationName + '\', variables);\n';
                output += '    }\n';
            } else {
                output += '    subscribe' + name + '(): GraphqlActiveSubscription<Types.' + name + ', {}> {\n';
                output += '        return this.client.subscribe(\'' + op.operationName + '\');\n';
                output += '    }\n';
            }
        }
    }

    // for (let f of queries.fragments) {
    //     // let name = op.operationName;
    //     // if (name.endsWith('Subscription')) {
    //     //     name = name.substring(0, name.length - 'Subscription'.length);
    //     // }
    //     output += '    write' + f.fragmentName + '(data: Types.' + f.fragmentName + ') {\n'
    //     output += '      return this.client.writeFragment(data, Source.' + f.fragmentName + 'Fragment);\n'
    //     // return this.client.writeFragment(data, Source.AppChatFragment);
    //     output += '    }\n'
    // }

    output += '}\n';
    // console.log(output);

    fs.writeFileSync(path.resolve(__dirname + '/../openland-api/OpenlandClient.ts'), output, 'utf-8');
}

generateApi();