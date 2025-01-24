export const formatDateToDateTimeString = (isoDate) => {
	const date = new Date(isoDate);
	const now = new Date(); // Current date

	// Extract time components
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
	const formattedMinutes = minutes.toString().padStart(2, "0"); // Add leading zero if needed

	// Format day and date
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const day = days[date.getDay()];
	const month = months[date.getMonth()];
	const dayOfMonth = date.getDate();
	const year = date.getFullYear();

	// Check if the year needs to be displayed
	const includeYear = year !== now.getFullYear();
	const yearPart = includeYear ? ` ${year}` : "";

	// Combine into the desired format
	return `${formattedHours}:${formattedMinutes} ${ampm}, ${day} ${month} ${dayOfMonth}${yearPart}`;
};
