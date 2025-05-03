export function getTimezoneOffset(timezone: string): number {
    try {
        const now = new Date();
        const tzOffset = new Date(now.toLocaleString('en-US', { timeZone: timezone })).getTime() - now.getTime();
        return tzOffset / (1000 * 60 * 60);
    } catch (error) {
        console.error('Error getting timezone offset:', error);
        return 0; // Default to UTC if there's an error
    }
}