export function exportWrongFields(error: any) {
    let invalidFields: { key: string, messages: string[] }[] = [];
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        for (let e of error.graphQLErrors) {
            if (e.invalidFields && e.invalidFields.length > 0) {
                for (let f of e.invalidFields) {
                    let ex = invalidFields.find((v) => v.key === f.key);
                    if (ex) {
                        ex.messages = [...ex.messages, f.message];
                    } else {
                        invalidFields.push({ key: f.key, messages: [f.message] });
                    }
                }
            }
        }
    }
    if (error.invalidFields && error.invalidFields.length > 0) {
        for (let i of error.invalidFields) {
            let ex = invalidFields.find((v) => v.key === i.key);
            if (ex) {
                ex.messages = [...ex.messages, ...i.messages];
            } else {
                invalidFields.push({ key: i.key, messages: i.messages });
            }
        }
    }
    return invalidFields;
}