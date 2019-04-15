import Global = NodeJS.Global;
export interface CustomGlobal extends Global {
    dbProcessId: number;
    rendererProcessId: number;
}
