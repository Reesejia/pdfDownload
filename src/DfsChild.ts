import { spliteFlagWraper, spliteFlag, tableClass, cardTableTopWraper, cardTableWraper, cardTableBomWraper, cardTableTBHeaderWraper, cardElRowClass, elTableBodyWraper, minRowsCount } from './const'
import { CurrentStyleElement, TbModuleInfo} from '../index'
import PdfPage from './PdfPage'

export default class DfsChild extends PdfPage{
  constructor(){
    super()
  }
	childMap = new Map();
  time = 1
	walk(ele: HTMLElement) {
    this.time++
    if(ele.hasChildNodes()){
      let nodeQueue = Array.from(ele.children)
      while(nodeQueue.length > 0){
        let node = nodeQueue.shift()
        if(node?.classList.contains(spliteFlag)){
          this.setPagesMap(node as HTMLElement)
          continue
        } else {
          this.walk(node as HTMLElement)
        }
      }
    } else {
      this.setPagesMap(ele as HTMLElement)
    }
	}

	setPagesMap(ele: HTMLElement) {
    if (ele.classList.contains(spliteFlag) && !this.childMap.has(ele)) {
        this.childMap.set(ele, this.getModuleInfo(ele));
    }
  }

  getModuleInfo (ele:HTMLElement){
    const isTable = ele.classList.contains(tableClass)
    const moduleInfo = {
      height:  this.calcHeight(ele),
      isTable,
      tableModuleInfo: {}
    }
    if(isTable){
      moduleInfo.tableModuleInfo = this.getTableModuleInfo(ele, moduleInfo.height)
    }
    return moduleInfo
  }

  getTableModuleInfo(ele: HTMLElement, height: number){
    let tbModuleInfo = {
      tbTopInfo: {
       ...this.getEleInfo(ele, cardTableTopWraper)
      },
      tbHeader: {
        height: 0,
        ...this.getEleInfo(ele, cardTableTBHeaderWraper )
      },
      table: {
        ...this.getEleInfo(ele, cardTableWraper),
        talbeWraper: true,
        tbHeaderHeight: 0
      },
      tbBomInfo: {
        ...this.getEleInfo(ele, cardTableBomWraper)
      },
      minHeight: 0,
      outTableHeight: 0,
      marginPadHeight: 0,
      isGtThree: false
    }

    let {minHeight,isGtThree, outTableHeight, marginPadHeight } = this.calcMinHeight(ele, tbModuleInfo as unknown as TbModuleInfo, height)
    tbModuleInfo.outTableHeight = outTableHeight
    tbModuleInfo.minHeight = minHeight
    tbModuleInfo.isGtThree = isGtThree
    tbModuleInfo.marginPadHeight = marginPadHeight
    tbModuleInfo.table.tbHeaderHeight = tbModuleInfo.tbHeader.height as number
    return tbModuleInfo
  }

    /**
     * minHeight 最小高度 = topInfoHeight + tbHeaderheight + row * minRowsCount
     */
  calcMinHeight(ele: HTMLElement, tbModuleInfo: TbModuleInfo, height: number) {
    let nodes = ele.querySelectorAll(cardElRowClass)
    const tBodyHeight = ele.querySelector(elTableBodyWraper)?.clientHeight || 0
    let isGtThree = nodes && nodes.length > 3
    let minHeight = 0;
    let outTableHeight =  height - tBodyHeight
    const { tbTopInfo,tbHeader, tbBomInfo, table } = tbModuleInfo
    let marginPadHeight = height - (tbTopInfo.height +  table.height + tbBomInfo.height)
    if(nodes && nodes.length > 3){
      const rowHeight = (nodes[0] as HTMLElement).offsetHeight
      minHeight = tbTopInfo.height + tbHeader.height + rowHeight * minRowsCount
    } else {
      minHeight = height
    }
    return {minHeight,isGtThree, outTableHeight, marginPadHeight}
  }

  getEleInfo(ele: HTMLElement, className: string){
    let module: HTMLElement = ele.querySelector(className) as HTMLElement
   if(ele && module){
    return {
      module,
      height: this.calcHeight(module),
     }
   }
  }

	calcHeight(ele: HTMLElement | CurrentStyleElement) {
		return (
			(ele as HTMLElement).offsetHeight +
			this.getStyle(ele as CurrentStyleElement, 'marginTop') +
      this.getStyle(ele as CurrentStyleElement, 'marginBottom') +
      this.getStyle(ele as CurrentStyleElement, 'paddingTop') +
      this.getStyle(ele as CurrentStyleElement, 'paddingBottom')
		);
	}

	getStyle(ele: CurrentStyleElement, attr: string) {
		if (ele.currentStyle as CurrentStyleElement) {
			return parseInt(ele.currentStyle[attr]);
		} else {
			return parseInt((document.defaultView as Window).getComputedStyle(ele as Element, null)[attr]);
		}
	}
}
