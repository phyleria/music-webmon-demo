// src/types/webmonetization.d.ts
declare global {
  interface Document {
    monetization?: {
      state: 'loading' | 'started' | 'stopped' | 'pending';
      addEventListener: (
        type: 'monetizationstart' | 'monetizationpending' | 'monetizationprogress' | 'monetizationstop',
        listener: (event: any) => void
      ) => void;
      removeEventListener: (
        type: 'monetizationstart' | 'monetizationpending' | 'monetizationprogress' | 'monetizationstop',
        listener: (event: any) => void
      ) => void;
    };
  }

  interface Window {
    MonetizationEvent: any;
  }
}

export {};