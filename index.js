const refs = {
    days: document.querySelector('.value[data-value="days"]'),
    hours: document.querySelector('.value[data-value="hours"]'),
    mins: document.querySelector('.value[data-value="mins"]'),
    secs: document.querySelector('.value[data-value="secs"]'),
}

class CountdownTimer {

    constructor({ onTick, dueTime}) {
        this.onTick = onTick;
        this.dueTime = dueTime;
    }

    pad(value) {
        return value < 10 ? '0' + value : value;
    }
    
    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs };
    }

    start() {

        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.dueTime - currentTime;
            const time = this.getTimeComponents(deltaTime);

            this.onTick(time);
        }, 1000);
    }    
}

function updateTimerFace({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
}

const timer = new CountdownTimer({
    dueTime: Date.parse(new Date('Jul 07, 2021')),
    onTick: updateTimerFace,
});

timer.start();