declare global  {
    interface Window {
        Page: {
            forceResize();
        };
    }
}
export default function use(View: any): any;
export {};
