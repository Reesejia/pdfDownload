export default class PdfPage {
	constructor() {
		this.deps = document.createElement('div');
		this.createWraperEle();
	}

  curPage: HTMLElement | null = document.createElement('div');
  deps: HTMLElement | null = document.createElement('div');
  moduleWraper: HTMLElement = document.createElement('div');
  cloneEmptyTable: HTMLElement | null =  null
  emptyTable: HTMLElement | null =  null
  moduleTbWraper: HTMLElement | null =  null

	createWraperEle() {
		let pageEle = document.createElement('div');
    pageEle.setAttribute('style', 'height:1500px; page-break-after:always;padding: 25px; 20px 0px; box-sizing: border-box;');
    // border: 1px solid red
		this.curPage = pageEle;
	}

	addChildEle(ele: HTMLElement) {
    (this.curPage as HTMLElement).appendChild(ele);
  }

	createPage() {
    this.deps?.appendChild(this.curPage as HTMLElement);
    this.createWraperEle();
  }

  pushLastWraper(){
    this.deps?.appendChild(this.curPage as HTMLElement);
    this.curPage = null
  }

  createModule() {
    this.moduleWraper = document.createElement('div')
    // this.moduleWraper.setAttribute('style', 'border: 1px solid red');
    this.moduleWraper.setAttribute('class', 'page-splite-flag');
    (this.curPage as HTMLElement).appendChild(this.moduleWraper);
  }

  createTBModule() {
    this.moduleTbWraper = document.createElement('div')
    // this.moduleTbWraper.setAttribute('style', 'border: 1px solid red');
    this.moduleTbWraper.setAttribute('class', 'page-splite-flag');
    this.emptyTable = this.cloneEmptyTable?.cloneNode(true) as HTMLElement
    this.moduleTbWraper.appendChild(this.emptyTable as HTMLElement);
    (this.curPage as HTMLElement).appendChild(this.moduleTbWraper)
  }

  appendModule(module: HTMLElement){
    this.moduleWraper?.appendChild(module)
  }

  cloneTable(table: HTMLElement){
    this.cloneEmptyTable = table.cloneNode(true) as HTMLElement
    this.emptyTable = table.cloneNode(true) as HTMLElement
  }
}
