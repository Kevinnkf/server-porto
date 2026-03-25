export const formatMonth = (date = new Date()) => {
    const monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];
    const monthIndex = monthNames = [date.getMonth()];
    const year = date.getFullYear();
    
    return `${monthIndex} ${year}`;
}