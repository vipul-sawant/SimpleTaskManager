function formatUTCToLocalDateTime(utcDateString) {
    const date = new Date(utcDateString);
    
    // Get date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(date.getDate()).padStart(2, "0");

    // Get time components
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Convert to 12-hour format
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 (midnight) to 12 AM

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

// Example Usage:
console.log(formatUTCToLocalDateTime("2025-03-04T16:00:00.000Z"));
// Output: "2025-03-04 11:00 AM" (Varies based on local timezone)


"2025-03-04T13:00:00.000Z"
"2025-03-06T15:30:00.000Z"
"2025-03-09T17:45:00.000Z"
"2025-03-11T17:00:00.000Z"
"2025-03-14T15:00:00.000Z"
"2025-03-20T11:00:00.000Z"
