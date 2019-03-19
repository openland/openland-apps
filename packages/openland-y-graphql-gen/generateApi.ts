import * as fs from 'fs';
import * as path from 'path';

export function generateApi() {
    let root = path.resolve(__dirname + '/../openland-api/queries');
    let files = fs.readdirSync(root)
        .filter((v) => v.endsWith('.ts.json'))
        .map((v) => JSON.parse(fs.readFileSync(root + '/' + v, 'utf-8')));

    let output = '';
    output += 'import * as Source from \'./index\';\n';
    output += 'import * as Types from \'./Types\'\n';
    output += 'import { GraphqlClient, GraphqlActiveSubscription } from \'openland-graphql/GraphqlClient\'\n';
    output += 'export class OpenlandClient {\n';
    output += '    readonly client: GraphqlClient;\n';
    output += '    constructor(client: GraphqlClient) {\n';
    output += '        this.client = client;\n';
    output += '    }\n';

    for (let f of files) {
        for (let op of f.operations) {
            if (op.type === 'query') {
                let name = op.name as string;
                if (name.endsWith('Query')) {
                    name = name.substring(0, name.length - 'Query'.length);
                }

                if (op.hasVariables) {
                    output += '    async query' + name + '(variables: Types.' + name + 'Variables): Promise<Types.' + name + '> {\n';
                    output += '        return this.client.query(Source.' + op.name + ', variables);\n';
                    output += '    }\n';
                    output += '    async refetch' + name + '(variables: Types.' + name + 'Variables): Promise<Types.' + name + '> {\n';
                    output += '        return this.client.refetch(Source.' + op.name + ', variables);\n';
                    output += '    }\n';
                    output += '    use' + name + '(variables: Types.' + name + 'Variables): Types.' + name + ' {\n';
                    output += '        return this.client.useQuery(Source.' + op.name + ', variables);\n';
                    output += '    }\n';
                    output += '    useWithoutLoader' + name + '(variables: Types.' + name + 'Variables): Types.' + name + ' | null {\n';
                    output += '        return this.client.useWithoutLoaderQuery(Source.' + op.name + ', variables);\n';
                    output += '    }\n';
                } else {
                    output += '    async query' + name + '(): Promise<Types.' + name + '> {\n';
                    output += '        return this.client.query(Source.' + op.name + ');\n';
                    output += '    }\n';
                    output += '    async refetch' + name + '(): Promise<Types.' + name + '> {\n';
                    output += '        return this.client.refetch(Source.' + op.name + ');\n';
                    output += '    }\n';
                    output += '    use' + name + '(): Types.' + name + ' {\n';
                    output += '        return this.client.useQuery(Source.' + op.name + ');\n';
                    output += '    }\n';
                    output += '    useWithoutLoader' + name + '(): Types.' + name + ' | null {\n';
                    output += '        return this.client.useWithoutLoaderQuery(Source.' + op.name + ');\n';
                    output += '    }\n';
                }
            }
        }
    }

    for (let f of files) {
        for (let op of f.operations) {
            if (op.type === 'mutation') {
                let name = op.name as string;
                if (name.endsWith('Mutation')) {
                    name = name.substring(0, name.length - 'Mutation'.length);
                }

                if (op.hasVariables) {
                    output += '    async mutate' + name + '(variables: Types.' + name + 'Variables): Promise<Types.' + name + '> {\n';
                    output += '        return this.client.mutate(Source.' + op.name + ', variables);\n';
                    output += '    }\n';
                } else {
                    output += '    async mutate' + name + '(): Promise<Types.' + name + '> {\n';
                    output += '        return this.client.mutate(Source.' + op.name + ');\n';
                    output += '    }\n';
                }
            }
        }
    }

    for (let f of files) {
        for (let op of f.operations) {
            if (op.type === 'subscription') {
                let name = op.name as string;
                if (name.endsWith('Subscription')) {
                    name = name.substring(0, name.length - 'Subscription'.length);
                }

                if (op.hasVariables) {
                    output += '    subscribe' + name + '(variables: Types.' + name + 'Variables): GraphqlActiveSubscription<Types.' + name + ', Types.' + name + 'Variables> {\n';
                    output += '        return this.client.subscribe(Source.' + op.name + ', variables);\n';
                    output += '    }\n';
                } else {
                    output += '    subscribe' + name + '(): GraphqlActiveSubscription<Types.' + name + ', {}> {\n';
                    output += '        return this.client.subscribe(Source.' + op.name + ');\n';
                    output += '    }\n';
                }
            }
        }
    }

    output += '}\n';
    // console.log(output);

    fs.writeFileSync(path.resolve(__dirname + '/../openland-api/OpenlandClient.ts'), output, 'utf-8');
}