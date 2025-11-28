declare global {
  interface Window {
    VANTA: {
      TOPOLOGY: (options: any) => any;
      current: any;
    };
    p5: any;
  }
}

export {};
