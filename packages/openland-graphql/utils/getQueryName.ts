export function getQueryName(query: any) {
    return query.document.definitions[0].name.value as string
}