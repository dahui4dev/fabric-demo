/**
 * 图形配置工具栏
 */
export class ToolBar {

  type = "rect",

  constructor(wb, options) {
    options || (options = {})

    this.type = options.shapeType
  }


}
