import { PrintPageDeclare, ModuleInfo , PageInfo} from '../index'
import SplitePage from './SplitePage'



export default class Compose extends SplitePage  implements PrintPageDeclare {
	constructor(module: ModuleInfo) {
    super()
    this.getEleHeight(module.moduleId);
    this.modulePageInfo = module.moduleInfo
	}
  rootWraperEle: HTMLElement | null = null;
  wraperDiv = [];
  modulePageInfo:PageInfo = {}
  dfsChild = null

	getEleHeight(ele: string) {
		this.rootWraperEle = document.querySelector(ele);
		if (this.rootWraperEle && this.rootWraperEle!== null) {
      this.walk(this.rootWraperEle as HTMLElement)
      return
    }

    if(process.env.NODE_ENV === 'production'){
      console.error(`找不到${ele}包裹元素！`)
    } else {
      throw new Error(`找不到${ele}包裹元素！`)
    }
  }

	print() {
    return new Promise((resolve: (value: boolean) => void, reject: (value: boolean) => void) =>{
      console.log("this.time", this.time)
      this.splitPage()
      if(this.rootWraperEle && this.completeSplit){
        this.clearContainer()
        this.appendPage(this.deps as HTMLElement)
        this.deps = null
        resolve(true)
      } else {
        reject(false)
        throw new Error('布局失败')
      }
    })
  }

  clearContainer(){
    Array.from((this.rootWraperEle as HTMLElement)?.children).forEach(eleItem =>{
      this.rootWraperEle?.removeChild(eleItem)
    })
  }

  appendPage(nodes: HTMLElement){
    const total = nodes.children.length
    Array.from(nodes.children).forEach((node, index) => {
      this.rootWraperEle?.appendChild(node)
      // let footerTemplate = this.createFooterTemplate(index, total)
      // node.appendChild(footerTemplate)
      this.rootWraperEle?.appendChild(node)
    });
  }

  createFooterTemplate(pageNumber: number, total: number){
    const printFooterWraper = document.createElement('div');
    const spanCur = document.createElement('span');
    const spanTotal = document.createElement('span');
    const spanTitle = document.createElement('span');
    spanCur.innerText = `第${pageNumber + 1}页`
    spanTotal.innerText = `共${total}页`
    spanTitle.innerText = this.modulePageInfo.title as string
    printFooterWraper.appendChild(spanTitle)
    printFooterWraper.appendChild(spanCur)
    printFooterWraper.appendChild(spanTotal)
    return printFooterWraper
  }
}



