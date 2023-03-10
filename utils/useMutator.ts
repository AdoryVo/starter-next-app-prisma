import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export function useMutator() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  async function handleMutate(mutate: Function) {
    setIsFetching(true);
    // Mutate external data source
    await mutate()
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  return {
    isMutating: isFetching || isPending,
    handleMutate,
  }
}