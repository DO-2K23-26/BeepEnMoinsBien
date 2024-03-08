/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
			  swing: 'swing 700ms ',
			}
		  }
	},
	plugins: [],
};

