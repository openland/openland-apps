import { generate } from 'graphql-code-generator';
import * as fs from 'fs';
import * as path from 'path';

// let documents = fs.readFileSync(__dirname + '/documents.handlebars', 'utf-8');

function prepareTemplate(file: string) {
    fs.writeFileSync(
        __dirname + '/_tmp.js',
        `
        var c = require("graphql-codegen-core");
        var fs = require("fs");
        let documents = fs.readFileSync(__dirname + '/documents.handlebars', 'utf-8');
        var config = {
            inputType: c.EInputType.SINGLE_FILE,
            flattenTypes: true,
            templates: {
                index: documents
            },
            primitives: {
                String: 'string',
                Int: 'number',
                Float: 'number',
                Boolean: 'boolean',
                ID: 'string'
            },
            customHelpers: {
                ifEq: function(v1, v2, options) {
                    if(v1 === v2) {
                      return options.fn(this);
                    }
                    return options.inverse(this);
                }
            },
            outFile: '${file}.tmp'
        };
        exports["default"] = config;
        `,
        'utf-8');
    //     "use strict";
    // exports.__esModule = true;
    // var graphql_codegen_core_1 = require("graphql-codegen-core");
    // var fs = require("fs");
    // var documents = fs.readFileSync(__dirname + '/documents.handlebars', 'utf-8');
    // var config = {
    //     inputType: graphql_codegen_core_1.EInputType.PROJECT,
    //     flattenTypes: true,
    //     templates: {
    //         index: documents
    //     },
    //     primitives: {
    //         String: 'string',
    //         Int: 'number',
    //         Float: 'number',
    //         Boolean: 'boolean',
    //         ID: 'string'
    //     },
    //     filesExtension: '.types.ts'
    //     // outFile: './out.ts'
    // };
    // exports["default"] = config;
}

function postProcess(file: string) {
    let contents = fs.readFileSync(file + '.tmp', 'utf-8');
    contents = contents.trim();
    let fn = path.parse(file);
    let parts = contents.split('\n')
        .filter((v) => v.trim().length > 0);
    for (let p of parts) {
        let name = p.split('=')[0];
        name = name.substring(13).trim();
        let pContents = '// WARNING! THIS IS AUTOGENERATED FILE. DO NOT EDIT!\n';
        pContents += 'import * as ' + fn.name + ' from \'./queries/' + fn.name + '\';\n';
        pContents += 'import * as Types from \'./Types\';\n';
        if (p.indexOf('typedQuery') >= 0) {
            pContents += 'import { typedQuery } from \'openland-y-graphql/typed\';\n\n';
        }
        if (p.indexOf('typedMutation') >= 0) {
            pContents += 'import { typedMutation } from \'openland-y-graphql/typed\';\n\n';
        }
        pContents += p.replace(/!!IMPORTS!!/g, fn.name);
        fs.writeFileSync(path.resolve(fn.dir + '/../' + name + '.ts'), pContents);

        console.warn(name);
    }
    // contents = 'import * as Raw from \'./' + fn.name + '\';\n' + contents;
    // if (contents.indexOf('typedQuery') >= 0) {
    //     contents = 'import { typedQuery } from \'openland-x-graphql/typed\';\n' + contents;
    // }
    // if (contents.indexOf('typedMutation') >= 0) {
    //     contents = 'import { typedMutation } from \'openland-x-graphql/typed\';\n' + contents;
    // }
    // contents = '// WARNING! THIS IS AUTOGENERATED FILE. DO NOT EDIT!\n\n' + contents;
    // fs.writeFileSync(fn.dir + '/' + fn.name + '.types.ts', contents);
    fs.unlinkSync(file + '.tmp');
    return { import: 'import * as ' + fn.name + ' from \'./queries/' + fn.name + '\';', contents: contents.replace(/!!IMPORTS!!/g, fn.name) };
}

async function doIteration(file: string): Promise<{ import: string, contents: string }> {
    console.warn('Processing ' + path.parse(file).base);
    prepareTemplate(file);
    delete require.cache[require.resolve('./_tmp.js')];
    let genres = generate(
        {
            overwrite: true,
            template: path.resolve(__dirname + '/_tmp.js'),
            schema: path.resolve(__dirname + '/../../schema.json'),
            args: [file]
        },
        true);
    genres.then((v) => console.warn('post2'));
    await genres;
    await new Promise<string>((r) => {
        setTimeout(() => { r(''); }, 500);
    });
    fs.unlinkSync(__dirname + '/_tmp.js');
    return postProcess(file);
}

async function doConvert() {
    // process.env.DEBUG = 'true';
    // Loading list of files
    let root = path.resolve(__dirname + '/../openland-api/queries/');
    let res = fs.readdirSync(root);
    res = res.filter((v) => {
        // Special Case for Tasks
        if (v === 'Tasks.ts') {
            return false;
        }
        let parts = v.split('.');
        return parts.length === 2 && parts[1] === 'ts';
    });

    // Prepare
    let dst = path.resolve(__dirname + '/../openland-api/');
    fs.readdirSync(dst)
        .filter((v) => ['fragments', 'queries', 'Tasks.ts', 'Types.ts'].indexOf(v) < 0)
        .forEach((v) => fs.unlinkSync(path.resolve(__dirname + '/../openland-api/' + v)));

    // Processing
    let processed: { import: string, contents: string }[] = [];
    for (let r of res) {
        processed.push(await doIteration(root + '/' + r));
    }
    let resContent = '// WARNING! THIS IS AUTOGENERATED FILE. DO NOT EDIT!\n\n';
    resContent += 'import { typedQuery } from \'openland-y-graphql/typed\';\n';
    resContent += 'import { typedMutation } from \'openland-y-graphql/typed\';\n';
    resContent += 'import * as Types from \'./Types\';\n';
    resContent += processed.map((v) => v.import).join('\n') + '\n';
    resContent += '\n';
    resContent += processed.map((v) => v.contents).join('\n');
    fs.writeFileSync(path.resolve(__dirname + '/../openland-api/index.ts'), resContent);
}

doConvert();
// let res = doConvert();
