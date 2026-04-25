import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timer = {
  intervalId: null,
  selectedDate: null,
  isActive: false,

  refs: {
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },

  init() {
    this.refs.startBtn.disabled = true;

    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: selectedDates => {
        this.handleDateSelection(selectedDates[0]);
      },
    };

    flatpickr('#datetime-picker', options);
    this.refs.startBtn.addEventListener('click', () => this.start());
  },

  handleDateSelection(date) {
    if (date < Date.now()) {
      alert('Please choose a date in the future');
      this.refs.startBtn.disabled = true;
      return;
    }

    this.selectedDate = date;
    this.refs.startBtn.disabled = false;
  },

  start() {
    if (this.isActive) return;

    this.isActive = true;
    this.refs.startBtn.disabled = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const diff = this.selectedDate - currentTime;

      if (diff <= 0) {
        this.stop();
        this.updateInterface(0, 0, 0, 0);
        return;
      }

      const timeComponents = this.convertMs(diff);
      this.updateInterface(timeComponents);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  },

  updateInterface({ days, hours, minutes, seconds }) {
    this.refs.days.textContent = this.pad(days);
    this.refs.hours.textContent = this.pad(hours);
    this.refs.minutes.textContent = this.pad(minutes);
    this.refs.seconds.textContent = this.pad(seconds);
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },
};

// Запуск инициализации
timer.init();
