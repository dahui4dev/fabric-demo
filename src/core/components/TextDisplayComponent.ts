import { DrawingMode } from "../models/DrawingMode";
import { DrawingEditor } from "../models/DrawingEditor";
import { DisplayComponent, DisplayComponentOptions } from "./DisplayComponent";

export class TextDisplayComponent extends DisplayComponent {
  constructor(target: string, parent: DrawingEditor) {
    const options = new DisplayComponentOptions();
    Object.assign(options, {
      altText: "Text",
      classNames: "fa fa-font",
      childName: "textComponentInput",
    });
    super(DrawingMode.Text, target, parent, options);
  }

  render(): void {
    super.render();
    //We need to render a hidden textbox next to the text button.

    // $(this.target)
    //   .parent()
    //   .append(
    //     `<input id="${this.childName}" class="col-sm-6 form-control hidden" />`
    //   );
  }

  //The two methods below, selectionUpdated and selectedChanged,
  //only exist on the base DisplayComponent class
  //because this TextDisplayComponent class needs them.

  //Show the textbox if the text button is selected
  selectionUpdated(newTarget: string) {
    // $(newTarget).removeClass("hidden");
  }

  selectedChanged(componentName: string): void {
    //If the text button is selected, show the textbox
    // if (componentName === this.target) {
    //   $(`#${this.childName}`).removeClass("hidden");
    // } else {
    //   $(`#${this.childName}`).addClass("hidden").val("");
    // }
  }
}
