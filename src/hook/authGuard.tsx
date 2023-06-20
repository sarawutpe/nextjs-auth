import { useState } from "react";
import { Observable } from "rxjs";
import { useRouter } from "next/navigation";

export function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type Status = "loading" | "authenticated" | "unauthenticated";

export const useAuthGuard = (): {
  isAuthenticated: boolean;
  status: Status;
} => {
  const router = useRouter();
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>("loading");

  const authObservable = new Observable(
    (observer: { next: (arg0: boolean) => void; complete: () => void }) => {
      sleep(3000).then(() => {
        observer.next(true);
        observer.complete();
      });
    }
  );

  authObservable.subscribe({
    next: (value: boolean | ((prevState: boolean) => boolean)) => {
      setAuthenticated(value);
      setStatus("authenticated");
    },
    complete: () => {
      // Cleanup logic if needed
    },
  });

  return { isAuthenticated, status };
};
