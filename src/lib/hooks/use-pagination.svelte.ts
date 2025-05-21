export type UsePaginationProps = {
	currentPage: number;
	paginationItemsToDisplay: number;
	totalPages: number;
};

export function usePagination(options: UsePaginationProps) {
	let currentPage = $state(options.currentPage);
	let totalPages = $state(options.totalPages);
	const itemsCount = $state(options.paginationItemsToDisplay);

	const showLeftEllipsis = $derived(currentPage > Math.ceil(itemsCount / 2));
	const showRightEllipsis = $derived(totalPages - currentPage >= Math.ceil(itemsCount / 2));

	const pages = $derived.by(() => {
		if (totalPages <= itemsCount) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const half = Math.floor(itemsCount / 2);
		let start = Math.max(1, currentPage - half);
		let end = Math.min(totalPages, start + itemsCount - 1);

		if (end === totalPages) {
			start = Math.max(1, end - itemsCount + 1);
		} else if (start === 1) {
			end = Math.min(totalPages, itemsCount);
		}

		if (showLeftEllipsis) start++;
		if (showRightEllipsis) end--;

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	});

	const setPage = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			currentPage = newPage;
		}
	};

	const updateTotalPages = (count: number) => {
		if (count >= 1) {
			totalPages = count;
			if (currentPage > count) {
				currentPage = count;
			}
		}
	};

	return {
		get currentPage() { return currentPage; },
		set currentPage(value: number) { currentPage = value; },
		get totalPages() { return totalPages; },
		get showLeftEllipsis() { return showLeftEllipsis; },
		get showRightEllipsis() { return showRightEllipsis; },
		get pages() { return pages; },
		setPage,
		updateTotalPages
	};
}
