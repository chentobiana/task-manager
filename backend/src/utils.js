

function isTodayOrFuture(dateString) {
    // Regular expression to match the date format YYYY-MM-DD
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

    // Check if the date string matches the required format
    if (!dateString.match(dateFormat)) {
        throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
    }

    // Convert the dateString into a Date object
    const inputDate = new Date(dateString);
    const today = new Date();

    // Set time to midnight for accurate comparison
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    // Compare the input date with today's date
    return inputDate >= today;
}