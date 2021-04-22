import Compose  from './Compose'
import { ModuleMap, ModuleInfo } from '../index'
export class Print {
  constructor(selectModule: string[], moduleMap: ModuleMap){
    this.selectModule = selectModule
    this.moduleMap = moduleMap
    this.createPrint()
  }

  selectModule:string[] = []
  ModuleInfoSet: ModuleInfo[] = []
  moduleMap = new Map()

  createPrint(){
    this.filterSelectModule()
    let PromisePageAll = this.ModuleInfoSet.map((module: ModuleInfo) => {
       return new Compose(module).print()
    })
    // console.log('PromisePageAll', PromisePageAll)
  }

  filterSelectModule(){
    this.ModuleInfoSet = this.selectModule.filter(item => this.moduleMap.has(item)).map(item =>  this.moduleMap.get(item))
  }
}
