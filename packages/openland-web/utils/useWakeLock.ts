import React from 'react';

type WakeLockType = 'screen';

interface WakeLockSentinel extends EventTarget {
    readonly released: boolean;
    readonly type: WakeLockType;
    release(): Promise<undefined>;
}

interface WakeLock {
    request(type: WakeLockType): Promise<WakeLockSentinel>;
}

declare global {
    interface Navigator {
        readonly wakeLock: WakeLock;
    }
}
// Block screen dimming, chromium only
export function useWakeLock() {
 const wakeLock = React.useRef<WakeLockSentinel | null>(null);

 React.useEffect(() => {
     const requestWakeLock = async () => {
         try {
            wakeLock.current = await navigator.wakeLock?.request('screen');
         } catch (err) {
             console.error(`${err.name}, ${err.message}`);
         }
     };

     const releaseWakeLock = async () => {
         if (!wakeLock.current) {
             return;
         }
         try {
             await wakeLock.current.release();
             wakeLock.current = null;
         } catch (err) {
             console.error(`${err.name}, ${err.message}`);
         }
     };

     const handleVisibilityChange = async () => {
         if (wakeLock.current && document.visibilityState === 'visible') {
             await requestWakeLock();
         }
     };
     
     document.addEventListener('visibilitychange', handleVisibilityChange);
     requestWakeLock().catch(err => console.error(err));

     return () => {
         document.removeEventListener('visibilitychange', handleVisibilityChange);
         releaseWakeLock().catch(err => console.error(err));
     };
 }, []);
}