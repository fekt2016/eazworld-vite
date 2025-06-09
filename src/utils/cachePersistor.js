import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const setupPersistor = (queryClient) => {
  if (!queryClient.getQueryCache) {
    console.error("Invalid QueryClient instance");
    return;
  }
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  });
};
