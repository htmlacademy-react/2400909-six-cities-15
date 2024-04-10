import moment from "moment";

export const formatDate = (date: moment.MomentInput): string => moment(date).format('MMMM YYYY');

export const formatDateTime = (date: moment.MomentInput): string => moment(date).format('YYYY-MM-DD');
