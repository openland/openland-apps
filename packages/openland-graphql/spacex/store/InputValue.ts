export type InputValue = | {
    type: 'string',
    value: string
} | {
    type: 'int',
    value: number
} | {
    type: 'float',
    value: number
} | {
    type: 'boolean',
    value: boolean
} | {
    type: 'null'
} | {
    type: 'list'
    items: [InputValue]
} | {
    type: 'object',
    fields: { [key: string]: InputValue }
} | {
    type: 'reference',
    name: string
};