export function checkingEnteredData(val: string) {
    let value = val.replace(/[^0-9:]/g, '');

    value = value.replace(/(^|\s)(\d:)/g, '$10$2');

    const colonIndex = value.indexOf(':');
    if (colonIndex !== -1) {
        value = value.slice(0, colonIndex + 1) + value.slice(colonIndex + 1).replace(/:/g, '');
    }

    value = value.replace(/^(\d{2})(?=\d)/, '$1:');

    value = value.replace(/^(\d{2})/, (match, p1) => {
        const hours = parseInt(p1, 10);
        return hours > 23 ? '23' : match;
    });

    value = value.replace(/:(\d{2})/, (match, p1) => {
        const minutes = parseInt(p1, 10);
        return minutes > 59 ? ':59' : match;
    });

    value = value.replace(/(\d{2}:\d{2}).*/, '$1');

    return value;
}

