import { DrawingMode } from "../models/DrawingMode";
import { DrawingEditor } from "../models/DrawingEditor";

export class DisplayComponent {
  drawingMode: DrawingMode;
  target: string;

  hoverText: string; // tooltip text
  svg: string; // component's icon
  cssClass: string;
  childName: string;
  canvasDrawer: DrawingEditor;

  constructor(
    mode: DrawingMode,
    selector: string,
    parent: DrawingEditor,
    options: DisplayComponentOptions
  ) {
    this.drawingMode = mode;
    this.target = selector;
    this.cssClass = options.classNames;
    this.hoverText = options.altText;
    this.svg = options.svg;
    this.childName = options.childName;
    this.canvasDrawer = parent;
    this.render();
    this.attachEvents();
  }

  render() {
    // const html = `<label id="${this.target.replace(
    //   "#",
    //   ""
    // )}" class="btn btn-primary text-light " title="${this.hoverText}">
    //                     <input type="radio" name="options" autocomplete="off">
    //                     ${this.iconStr()}
    //                  </label>`;
    //
    // const toolbarContainer = document.getElementById("toolbar-container");
    //
    // if (toolbarContainer) {
    //   toolbarContainer.innerHTML = html;
    // }
  }

  private iconStr(): string {
    if (this.cssClass != null) {
      return `<i class="${this.cssClass}"></i>`;
    } else {
      return this.svg;
    }
  }

  attachEvents() {
    console.log("--------attachEvents---56---------", this.target);

    const data = {
      mode: this.drawingMode,
      container: this.canvasDrawer,
      target: this.target,
    };

    //When clicking the <label>, fire this event.
    const targetEle = document.getElementById(this.target);
    console.log("--------attachEvents---66---------", targetEle);

    if (targetEle) {
      targetEle.addEventListener("click", function () {
        console.log("--------addEvent---70---------", data);

        data.container.drawingMode = data.mode;
        data.container.componentSelected(data.target);
      });
    }
  }

  selectedChanged(componentName: string) {}
}

export class DisplayComponentOptions {
  altText?: string;
  svg?: string;
  classNames?: string;
  childName?: string;
}
