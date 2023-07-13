const debounce = <A, R = void>(func: (args: A) => Promise<R>, wait = 250): ((args: A) => Promise<R>) => {
	let timeout: number | null = null;
	return (args: A): Promise<R> =>
		new Promise((resolve) => {
			if (timeout) {
				window.clearTimeout(timeout);
			}

			timeout = window.setTimeout(() => resolve(func(args)), wait);
		});
};

export default debounce;
