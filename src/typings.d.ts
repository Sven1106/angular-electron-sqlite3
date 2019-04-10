/* SystemJS module definition */
declare var nodeModule: NodeModule;
interface NodeModule {
  id: string;
  dbProcessId: number;
}

declare var window: Window;
interface Window {
  process: any;
  require: any;
  dbProcessId: number;
}
