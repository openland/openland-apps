export function formatAddresses(addresses: {
    streetName: string,
    streetNameSuffix: string | null,
    streetNumber: number,
    streetNumberSuffix: string | null
}[]) {
    let streets = new Map<string, { numbers: { number: number, suffix: string | null }[] }>();

    // Grouping By street name
    for (let addr of addresses) {
        let name = addr.streetName;
        if (addr.streetNameSuffix) {
            name += ' ' + addr.streetNameSuffix;
        }
        if (streets.has(name)) {
            let street = streets.get(name)!!;
            street.numbers.push({ number: addr.streetNumber, suffix: addr.streetNumberSuffix });
        } else {
            streets.set(name, { numbers: [{ number: addr.streetNumber, suffix: addr.streetNumberSuffix }] });
        }
    }

    let parts: string[] = [];
    for (let addr of Array.from(streets.keys()).sort()) {
        let numbers = streets.get(addr)!!;

        let formattedNumbers = numbers.numbers.map((v) => v.number + (v.suffix ? v.suffix : '')).join(', ');

        parts.push(formattedNumbers + ' ' + addr);
    }
    return parts.join('; ');
}