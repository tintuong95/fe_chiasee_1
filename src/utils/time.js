export const timeBetween = (end) => {

	const now = moment(new Date()); //todays date
	const newEnd = moment(end); //todays date
	const duration = moment.duration(now.diff(newEnd));
	const days = duration.asDays();
	const hours = duration.asHours();
	if (days > 1) {
		return Math.round(days) + ' days';
	} else {
		return Math.round(hours) + ' hours';
	}
};
