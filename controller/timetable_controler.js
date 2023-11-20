const now = new Date();
const options = { hour: '2-digit', minute: '2-digit', hour12: true };

const currentTime = now.toLocaleTimeString('en-US', options);

console.log('Current Time:', currentTime);

const startTimes = [
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
];

function upcoming_lecture() {
    const upcomingSlot = startTimes.find((slot) => slot > currentTime);

    if (upcomingSlot) {
        console.log('Upcoming Lecture:', upcomingSlot);
    } else {
        console.log('No upcoming lectures for today.');
    }
}

function ongoing_lecture() {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    console.log('Ongoing Lecture:', startTimes.find((slot) => {
        const [hour, minute] = slot.split(/: /);
        const slotHour = parseInt(hour);
        const slotMinute = parseInt(minute);

        return currentHour > slotHour || (currentHour === slotHour && currentMinute >= slotMinute);
    }));
}

upcoming_lecture();
ongoing_lecture();

module.exports = {
    upcoming_lecture,
    ongoing_lecture
};
