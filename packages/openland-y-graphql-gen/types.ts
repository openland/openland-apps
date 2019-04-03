export interface ManifestOperation {
    source: string,
    filePath: string,
    operationName: string,
    operationType: 'query' | 'mutation' | 'subscription',
    variables: any[]
}

export interface ManifestFragment {
    fragmentName: string,
    filePath: string,
    fields: {
        responseName: string,
        fieldName: string,
        type: string,
        isConditional: boolean
    }[]
}

export interface Manifest {
    operations: ManifestOperation[],
    fragments: ManifestFragment[]
}

export interface Schema {
    __schema: { types: { kind: string, name: string, inputFields: { name: string, type: any }[] }[] }
}