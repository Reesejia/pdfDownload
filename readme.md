## 说明
- Print class
    - 根据传入的要打印的模块启动dfs搜索
- DfsChild class
    - 负责根据标识获取分页所需要的信息
- SplitePage class
    - 负责计算pdf分页和table分页
- PdfPage class
    - 负责生成每个pdf页面
- Compose class
    - 负责将每个pdf页面放到原来根元素的位置
## 使用方法
### step1 view层约定
- 1. 普通模块
    - 给业务关系比较紧密的模块的外层元素，加上 class="page-splite-flag"

~~~html
    <div class="page-splite-flag">
        <div>
            <p>title1</p>
            <p>info1</p>
            <p>content1</p>
        </div>
        <p>message1...</p>
         <div>
            <p>title1</p>
            <p>info1</p>
            <p>content1</p>
        </div>
        <p>message2...</p>
    </div>
~~~
- 2. 如果一个页面有多个class="page-splite-flag"元素，当前页面根元素用class="page-splite-flag-wraper" 包裹
~~~html
  <div class="page-splite-flag-wraper">
        <div class="page-splite-flag">
             <p>message1...</p>
             <div>
                 <p>title1</p>
                 <p>info1</p>
                 <p>content1</p>
             </div>
        </div>

        <div class="page-splite-flag">
             <p>message2...</p>
             <div>
                 <p>title3</p>
                 <p>info4</p>
                 <p>content2</p>
             </div>
        </div>

    </div>

~~~
- 3. 带有table的模块
    - 引入cardTable 组件，用slot的方式在对应的信息放进去；
~~~html
<template>
  <div class="card-table page-splite-flag">
    <div class="card-table-top-wraper">
      <slot name="card-table-header" />
    </div>
    <div class="card-table-wraper" >
      <slot name="card-table" />
    </div>
    <div class="card-table-bom-wraper">
      <slot name="card-table-footer" />
    </div>
  </div>
</template>
~~~
> demo
~~~html
 <card-table >
      <template #card-table-header>
        <div>
          <h3>投资产品选择</h3>
        </div>
        <h4 style="padding-left: 20px">定投产品总览</h4>
      </template>
      <template #card-table>
        <ts-table
          :table-data="regularList"
          :table-head="regularHead"
          :table-title-obj="{ hide: true }"
          :paginationHide="true"
        />
      </template>

       <template #card-table-footer>
           <p>表格说明信息1</p>
           <p>表格说明信息2</p>
           <p>...</p>
      </template>
    </card-table>
~~~
### step2
- 给要下载的组合所有页面的根元素加上id
~~~javascript
/**
 * string: 组合名称1
 * ModuleInfo: {moduleId: 组合名称1的页面的根元素id, title: 页面标题等自定义信息}
*/
const printMap: Map<string, ModuleInfo> = new Map([
      ["family", {moduleId:  "#print-analy-wraper", moduleInfo: {title: '财富体检'}}],
      ["pension", {moduleId:  "#print-pension-wraper", moduleInfo: {title: '养老规划'}}],
      ["base",  {moduleId:  "#print-base-wraper", moduleInfo: {title: '家庭保障'}} ],
      ["child",   {moduleId:  "#print-child-wraper", moduleInfo: {title: '子女教育'}}  ],
      ["invest",  {moduleId:  "#print-invest-wraper", moduleInfo: {title: '投资规划'}}  ],
    ]);
const downloadList = ["family", "invest"]



/**
 * downloadList 当前要下载的页面组合名称
 * printMap 所有要下载的页面组合
*/
new Print(downloadList, printMap);
~~~


