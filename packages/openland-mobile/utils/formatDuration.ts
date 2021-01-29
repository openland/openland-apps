import moment from "moment";

export const formatDuration = (ms: number) => {
    let duration = moment.duration(ms);
    let m = duration.minutes();
    let s = duration.seconds();
    let seconds = s <= 9 ? `0${s}` : s;
    return `${m}:${seconds}`;
};
