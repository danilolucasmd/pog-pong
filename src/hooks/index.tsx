import { useState, useEffect } from 'react';
import { Subscription, Observable } from 'rxjs';

export function useObservable<T>(callbackfn: () => Observable<any[] | T>, deps?: readonly any[]): [T, any, boolean, (value: any) => void] {
  const [value, setValue] = useState<any>(null);
  const [error, setError] = useState(null);
  const [isComplete, setIsCompleted] = useState(false);
  let subscription: Subscription;

  useEffect(() => {
    !!subscription && subscription.unsubscribe();

    setIsCompleted(false);
    setError(null);

    subscription = callbackfn().subscribe(
      value => {
        setValue(value);
        setError(null);
      },
      error => {
        setError(error);
        setValue(null);
      },
      () => setIsCompleted(true)
    );

    return () => subscription.unsubscribe();
  }, deps);

  return [value, error, isComplete, setValue];
}