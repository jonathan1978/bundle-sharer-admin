import moment from 'moment';
import { toast } from 'react-toastify';
/**
 * Convert validation Errors to key => value object
 * @param {array} errors
 */
export const convertErrorsToObject = errors => {
  const obj = [];
  let hasError = false;
  errors.forEach(item => {
    obj[item.path] = item.errors[0];
    hasError = true;
  });
  if (hasError) {
    toast.error('There are errors in the form');
  }
  return obj;
};

/**Validate form using yup
 * @param schema yup-object
 * @param form array
 */
export const validateForm = (schema, form) => {
  // Remove errors first

  const divs = document.getElementsByClassName('form-errors');
  while (divs.length > 0) divs[0].remove();

  return schema.validate(form, { abortEarly: false }).catch(err => {
    console.log(err.inner);

    const errors = convertErrorsToObject(err.inner);

    let keys = Object.keys(errors);
    keys.forEach(item => {
      const element = document.getElementsByName(item)[0];
      const div = document.createElement('div');
      div.innerHTML = errors[item];
      div.classList.add('form-errors');
      element.parentNode.parentNode.append(div);
      // element.parentNode.closest('.MuiFormControl-root-265').append(div);
    });

    return Promise.reject(errors);
  });
};

/************************************************* */

/**
 * regex for phone validatation
 */

export const phoneRegex = /(0[1-9]+)/;

/**
 * Get current Date
 */
export const currentDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  return yyyy + '-' + dd + '/' + mm;
};

/**
 * Convert form to FormData Type
 * @param {*} form Array of input values
 */
export const formToFormData = (form = {}) => {
  var formData = new FormData();
  const keys = Object.keys(form);

  for (const key of keys) {
    if (form[key] !== null) {
      // Check if item is and array and also has its element as file instance
      if (Array.isArray(form[key]) && form[key][0] instanceof File) {
        form[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        // Check if item is array and stringify it
        if (Array.isArray(form[key])) {
          formData.append(key, JSON.stringify(form[key]));
        } else {
          formData.append(key, form[key]);
        }
      }
    }
  }

  return formData;
};

/**
 * Default text for required fields
 */
export const requiredText = 'This field is required';
/**
 * Default text for invaild form
 */
export const invalidFormText = 'Form is invalid';

/**
 * Default Timeout
 */
export const defaultTimeOut = 3000;

/**
 * Get Request Params from datatable
 * @param {array} param
 */

export const getRequestParamsFromDatatable = query => {
  let filterParams = '&';
  query.filters.forEach(element => {
    var { column, value } = element;
    filterParams += `${column.field}=${value}&`;
  });

  return filterParams;
};

/**
 * Convert object to url string
 * @param {*} obj
 */
export const convertObjectToUrlString = obj => {
  var str = '';
  for (var key in obj) {
    if (str != '') {
      str += '&';
    }
    str += key + '=' + encodeURIComponent(obj[key]);
  }
  return str;
};

/**
 * Format Date with moment
 * @param {string} date
 */
export const formatDate = (date, full = false) =>
  moment(date).format(full ? 'DD MMM, YYYY HH:MM' : 'DD MMM, YYYY');

/**
 * Format Date with moment FOR INPUT
 * @param {string} date
 */
export const formatDateForInput = date => moment(date).format('YYYY-MM-DD');

/**
 * Format price
 * @param {number} amount
 */
export const formatPrice = amount => {
  const newAmount = new Intl.NumberFormat().format(Number(amount).toFixed(2));
  return newAmount;
};

/**
 * Reload page after some defined time
 */
export const reloadPage = () => {
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};
