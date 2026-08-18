import useUiStore from "@/stores/ui.store";
import { TopLoaderBar } from "./TopLoaderBar";
export function GlobalTopLoader() {
  const isLoading = useUiStore((state) => state.pendingRequests > 0);

  if (!isLoading) {
    return null;
  }

  return <TopLoaderBar />;
}
