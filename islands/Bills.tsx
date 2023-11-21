import { computed, useSignal } from "@preact/signals";
import "humanizer";
import { BillsGrid } from "components";
import { Status } from "components/shared";
import { useFetchBills, useRegisterServiceWorker } from "hooks";
import { useEffect } from "preact/hooks";
import { keyListener, scrollListener } from "DOMEventHandlers";

export default () => {
	useRegisterServiceWorker();

	const pageSize = useSignal("12");
	const offsetUnsafe = useSignal<string | null>("0");
	const offsetSafe = computed(() => offsetUnsafe.value ?? "0");

	const fromDate = new Date("04/26/2023");
	const fromDateISO = fromDate.toISOString().split(".")[0] + "Z";
	const {
		bills,
		loading,
		error,
	} = useFetchBills(fromDateISO, pageSize.value, offsetSafe.value);

	const scrollBottom = () => {
		if (self.innerHeight + self.scrollY === document.body.scrollHeight && bills.nextPage) {
			offsetUnsafe.value = new URL(bills.nextPage).searchParams.get("offset");
		}
	};

	const escape = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			(document.activeElement as HTMLElement)?.blur();
		}
	};

	useEffect(() => {
		scrollListener(scrollBottom);
		keyListener(escape);

		return () => {
			scrollListener(scrollBottom, true), keyListener(escape, true);
		};
	}, []);

	return (
		<Status
			loadingStatusMessage={<span class="font-semibold">Loading Bills...</span>}
			error={error}
			loading={loading}
			alreadyHasData={bills.packages.length > 0}
			fullscreen
		>
			<div class="flex-1 flex flex-col">
				<BillsGrid {...bills} />
			</div>
		</Status>
	);
};
