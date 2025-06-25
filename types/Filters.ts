interface Filters {
	[key: string]: Filter;
}

interface Filter {
	filterValue: string;
	enabled: boolean;
	visibleToUi: boolean;
	label: string;
}

export type { Filter, Filters };
