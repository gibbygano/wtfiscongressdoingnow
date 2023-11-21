export const debounce = (func: () => void, timeout = 500) => {
	let timer: ReturnType<typeof setTimeout>;
	return () => {
		const context = self;
		clearTimeout(timer);
		timer = setTimeout(() => func.apply(context), timeout);
	};
};

export const debounce_leading = (func: () => void, duration = 500) => {
	let timeout: ReturnType<typeof setTimeout>;
	return () => {
		const context = self;
		if (!timeout) {
			func.apply(context);
		} else {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(context), duration);
		}
	};
};
