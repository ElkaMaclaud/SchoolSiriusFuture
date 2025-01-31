export function dateValidate(val: string): string {
    let formattedTime = val;
    if (val.length === 1) {
        formattedTime = `0${val}:00`;
    } else if (val.length === 2) {
        formattedTime = `${val}:00`; 
    } else if (val.length === 4) {
        formattedTime = `${val}0`; 
    }
    return formattedTime;
}

