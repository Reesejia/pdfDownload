import DfsChild from './src/DfsChild'

export { Print }  from './src/index'
export declare class PrintPageDeclare extends DfsChild {
	print: () => Promise<boolean>;
}
export interface PageInfo {
    title?: string;
}
export interface ModuleInfo {
  moduleId: string;
  moduleInfo: PageInfo
}
export type ModuleMap = Map<string, ModuleInfo>
export interface CurrentStyleElement extends Element {
	currentStyle: {
		[propName: string]: any;
	};
}
export interface EleStyleInfo {
  height: number,
  isTable: boolean,
  tableModuleInfo: TbModuleInfo
}
export interface TbModuleInfoItem{
  module: HTMLElement,
  height: number,
  talbeWraper?: boolean,
  tbHeaderHeight?: number
}
export interface TbModuleInfo {
  tbTopInfo: {
    height: number,
    module: HTMLElement
  },
  tbHeader: {
    height: number,
    module: HTMLElement
  },
  table: {
    height: number,
    module: HTMLElement
  },
  tbBomInfo: {
    height: number,
    module: HTMLElement
  },
  minHeight: number
  isGtThree: boolean,
  outTableHeight: number,
  marginPadHeight: number
}

