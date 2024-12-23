// ***SITE CREDIT***

console.log(
	'%cSite by View Source \n%cview-source.com',
	[
		'margin: 20px 0 0;',
		'font-size: 12px',
		'font-family: Helvetica, sans-serif',
		'font-weight: 700',
	].join(';'),
	[
		'margin: -5px 0 20px;',
		'font-size: 12px',
		'font-family: Helvetica, sans-serif',
		'font-weight: 400',
	].join(';')
);

// ***GLOBAL VARIABLES***

const root = document.documentElement;

// enable the possibility for browser-specific CSS
root.setAttribute('data-useragent', navigator.userAgent);

const vs = {
	tabletBreakpoint: 1024,
	mobileBreakpoint: 600,
	isTouchDevice: window.matchMedia('(any-hover: none)').matches,
};

vs.isTabletScreen = vs.tabletBreakpoint >= innerWidth ? true : false;
vs.isMobileScreen = vs.mobileBreakpoint >= innerWidth ? true : false;
vs.hasLocalStorage = () => {
	try {
		var storage = window['localStorage'],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return false;
	}
};
vs.browserType = () => {
	const ua = navigator.userAgent;

	if ((ua.indexOf('Opera') || ua.indexOf('OPR')) != -1) {
		return 'Opera';
	} else if (ua.indexOf('Chrome') != -1) {
		return 'Chrome';
	} else if (ua.indexOf('Safari') != -1) {
		return 'Safari';
	} else if (ua.indexOf('Firefox') != -1) {
		return 'Firefox';
	} else if (ua.indexOf('MSIE') != -1 || !!document.documentMode === true) {
		return 'IE';
	} else {
		return 'Unknown';
	}
};

window.addEventListener('resize', () => {
	vs.isTabletScreen = vs.tabletBreakpoint >= innerWidth ? true : false;
	vs.isMobileScreen = vs.mobileBreakpoint >= innerWidth ? true : false;
});

// ***BFCACHE*** https://web.dev/bfcache

// prevent safari to load from cache
window.addEventListener('pageshow', (event) => {
	if (event.persisted) location.reload(true);
});

// prevent chrome to load from cache
const perfEntries = performance.getEntriesByType('navigation');
if (typeof perfEntries[0] != 'undefined') {
	if (perfEntries[0].type === 'back_forward') location.reload(true);
}

// ***UTILITIES / GET***

const getRandomInt = (min, max) => {
	const _min = Math.ceil(min);
	const _max = Math.floor(max);

	// inclusive of max and min
	return Math.floor(Math.random() * (_max - _min + 1) + _min);
};

const getOffset = (el) => {
	const elBounding = el.getBoundingClientRect();

	return {
		top: elBounding.top + scrollY,
		left: elBounding.left + scrollX,
	};
};

const getSiblings = (el) => {
	return Array.from(el.parentNode.children).filter(function (sibling) {
		return sibling !== el;
	});
};

const getUrlBaseAndPath = (url) => {
	if (url.includes('?')) {
		return url.split('?')[0];
	} else {
		return url;
	}
};

// ***UTILITIES / FORMAT***

const formatNumberSuffix = (value, suffixOnly) => {
	let int = parseInt(value);
	let integer = suffixOnly ? '' : int;

	if (int > 3 && int < 21) return `${integer}th`;

	switch (int % 10) {
		case 1:
			return `${integer}st`;
		case 2:
			return `${integer}nd`;
		case 3:
			return `${integer}rd`;
		default:
			return `${integer}th`;
	}
};

const formatHandleize = (string) => {
	return String(string)
		.normalize('NFKD') // split accented characters into their base characters and diacritical marks
		.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.replace(/\W/g, '') // remove non-alphanumeric characters
		.replace(/\s+/g, '-') // replace spaces with hyphens
		.replace(/-+/g, '-') // remove consecutive hyphens
		.trim() // trim leading or trailing whitespace
		.toLowerCase(); // convert to lowercase
};

const formatPad = (val, length = 2, char = 0) => {
	// example, leading zero: 8 = "08",
	// example, password: 000088885581 = "********5581"
	return val.toString().padStart(length, char);
};

const formatClamp = (value, min = 0, max = 1) => {
	// example, formatClamp(999, 0, 300) = 300
	return value < min ? min : value > max ? max : value;
};

const formatNumberCommas = (string) => {
	// example, formatNumberWithCommas(3000.12) = 3,000.12
	const parts = string.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return parts.join('.');
};

const formatNumberEuro = (string) => {
	// example, formatNumberEuro(3000.12) = 3 000,12
	const parts = string.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

	return parts.join(',');
};

const formatDateUsStandard = (date) => {
	return [
		formatPad(date.getDate()),
		formatPad(date.getMonth() + 1),
		date.getFullYear(),
	].join('/');
};

// ***UTILITIES / VALIDATION***

const validateEmail = (string) => {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return regex.test(string);
};

const validateUsPhone = (string) => {
	const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

	return regex.test(string);
};

const validateAndReturnJson = (json) => {
	try {
		JSON.parse(json);
	} catch (e) {
		console.error(e);
		return false;
	}

	return JSON.parse(string);
};

const validateJson = (string) => {
	try {
		JSON.parse(string);
	} catch (e) {
		console.error(e);
		return false;
	}

	return JSON.parse(string);
};

// ***UTILITIES / ARRAY***

const arrayIntersection = (a1, a2) => {
	return a1.filter(function (n) {
		return a2.indexOf(n) !== -1;
	});
};

// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
const arrayUniqueValues = (array) => {
	let unique = [...new Set(array)];

	return unique;
};

// sorting array of objects asc
const arraySortObjValAsc = (arr, objVal) => {
	return arr.sort(function (a, b) {
		if (a[objVal] > b[objVal]) {
			return 1;
		}
		if (b[objVal] > a[objVal]) {
			return -1;
		}
		return 0;
	});
};

// sorting array of objects desc
const arraySortObjValDesc = (arr, objVal) => {
	return arr.sort(function (a, b) {
		if (a[objVal] > b[objVal]) {
			return -1;
		}
		if (b[objVal] > a[objVal]) {
			return 1;
		}
		return 0;
	});
};

// https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
const arrayCartesian = (...arrays) => {
	return [...arrays].reduce(
		(a, b) =>
			a.map((x) => b.map((y) => x.concat(y))).reduce((a, b) => a.concat(b), []),
		[[]]
	);
};

// ***ACTIONS***

const scrollDisable = () => {
	document.documentElement.style.overflow = 'hidden';

	if (vs.isTouchDevice) {
		document.body.style.overflow = 'hidden';
	}
};

const scrollEnable = () => {
	document.documentElement.style.overflow = 'initial';

	if (vs.isTouchDevice) {
		document.body.style.overflow = 'initial';
	}
};

// event delegation
// example; on('body', 'click', '.accordion-toggle, .accordion-toggle *', e => {…});
const on = (selector, eventType, childSelectors, eventHandler) => {
	const _childSelectors = childSelectors.split(',');
	const elements = document.querySelectorAll(selector);

	for (element of elements) {
		element.addEventListener(eventType, (eventOnElement) => {
			_childSelectors.forEach((selector) => {
				if (
					eventOnElement.target.matches(selector) ||
					eventOnElement.target.closest(selector)
				) {
					eventHandler(eventOnElement);
				}
			});
		});
	}
};

const parseHtmlString = (htmlString) => {
	const parser = new DOMParser();
	return parser.parseFromString(htmlString, 'text/html');
};

// TODO:
// throttle
