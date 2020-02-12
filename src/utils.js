export const getCelcius = (input) => {
    return Math.round(input - 273.15);
}

export const getDayName = (dt) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[new Date(dt * 1000).getDay()];
}

export const getTime = (dt) => {
    return new Date(dt * 1000).getHours();
}