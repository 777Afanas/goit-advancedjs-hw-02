import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.js-form'),
};

const createPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
};

const onFormSubmit = e => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const { delay, state } = Object.fromEntries(formData.entries());
  const delayMs = Number(delay);

  //   createPromise(delayMs, state)
  //     .then(value => console.log(`✅ Fulfilled promise in ${delay}ms`))
  //         .catch(error => console.log(`❌ Rejected promise in ${delay}ms`));

  createPromise(delayMs, state)
    .then(value => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });

  e.currentTarget.reset();
};

refs.form.addEventListener('submit', onFormSubmit);
