export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('uk-UA', options);
}

export function calculatePing(sentTimestamp, interactionTimestamp) {
    return sentTimestamp - interactionTimestamp;
}
