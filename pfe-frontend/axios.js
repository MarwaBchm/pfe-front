import axios from 'axios';

// Enable credentials (cookies) for cross-origin requests
axios.defaults.withCredentials = true;

// Fetch CSRF token from meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (csrfToken) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
}

export default axios;
