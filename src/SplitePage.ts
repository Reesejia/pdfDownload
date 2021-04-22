import { pageHeight, cardElRowClass, elTbody, rowHeight, headerHeight, wrapePadTop } from './const'
import { EleStyleInfo, TbModuleInfoItem} from '../index'
import DfsChild from './DfsChild'

export default class SplitePage extends DfsChild {
  constructor(){
    super()
  }
  completeSplit = false
  tBody:  HTMLElement[] | null = null

  findRows(ele: HTMLElement){
    const rows = ele.querySelectorAll(cardElRowClass)
    this.tBody =  (Array.from(rows) as HTMLElement[])
    return Array.from(rows)
  }

  cleanTbody(ele: HTMLElement){
    const tbody =  ele.querySelector(elTbody)
    this.tBody?.forEach(row =>{
      tbody?.removeChild(row)
    });
  }

  tbodyAppendChild(table: HTMLElement, row: HTMLElement){
      table.querySelector(elTbody)?.appendChild(row)
  }

 /**
   * 拆分table
   * @param ele childMap value
   * @param distance 剩余距离
   * mark
   */
  splitTable(ele: EleStyleInfo, distance: number){
    const {minHeight, tbTopInfo, table, tbBomInfo, outTableHeight, marginPadHeight} = ele.tableModuleInfo
    let tbQueue: TbModuleInfoItem[] = [tbTopInfo, table, tbBomInfo].filter(item => item.height > 0)
    if(pageHeight - distance > minHeight ){
      this.createModule()
      distance += marginPadHeight
    } else {
      this.createPage();
      this.createModule()
      distance = marginPadHeight + wrapePadTop
    }
      while(tbQueue.length > 0){
        let mItem: TbModuleInfoItem = tbQueue.shift() as TbModuleInfoItem
        if(distance + mItem?.height < pageHeight) {
          distance += mItem.height
          this.appendModule(mItem.module)
        } else {
          if(mItem.talbeWraper){
           distance += outTableHeight
           let rowQueue = this.findRows(mItem.module)
           this.cleanTbody(mItem.module)
           this.cloneTable(mItem.module as HTMLElement)
           this.createTBModule()
           while(rowQueue.length > 0){
              let rowNode = rowQueue.shift()
              if(distance + rowHeight < pageHeight){
                distance += rowHeight
                this.tbodyAppendChild(this.emptyTable as HTMLElement, rowNode as HTMLElement)
              } else {
                this.createPage();
                this.createTBModule()
                distance = (mItem.tbHeaderHeight as number || headerHeight) + rowHeight + wrapePadTop
                this.tbodyAppendChild(this.emptyTable as HTMLElement, rowNode as HTMLElement)
              }
           }
          } else {
            this.appendModule(mItem.module)
            distance += mItem.height
          }
        }
      }
    return distance
  }

  /**
   * 拆分页面
   */
  splitPage(){
    this.createWraperEle();
    let distance = 0;
    console.log(' splitPage  this.childMap', this.childMap)
		for (let ele of this.childMap.keys()) {
			if (distance + this.childMap.get(ele).height < pageHeight) {
				this.addChildEle(ele);
				distance += this.childMap.get(ele).height;
			} else {
       // tb data 大于三条，进行拆分，否则，放到下一页
      let nodeMapValue = this.childMap.get(ele)
        if(nodeMapValue.isTable &&  nodeMapValue?.tableModuleInfo?.isGtThree){
          distance = this.splitTable(nodeMapValue, distance)
        } else {
          this.createPage();
          this.addChildEle(ele);
          distance = this.childMap.get(ele).height + wrapePadTop
        }
			}
    }
    this.pushLastWraper()
    this.completeSplit = true
  }
}
