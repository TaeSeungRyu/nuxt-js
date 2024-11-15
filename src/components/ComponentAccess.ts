import { TYPE } from "@/type";
import type { componentType } from "@/type";
import { InputText } from "./index"; //각종 input 컴포넌트들

/***
 * 컴포넌트 빌더에서 사용하는 클래스 입니다.
 */
export class ComponentAccess {
  private static components: Array<any> = [{ key: TYPE.TEXT, item: InputText }];
  private constructor() {} //생성 금지

  public static getComponentCase(target: String) {
    let componentCase: componentType = {};
    this.components.forEach((element: any) => {
      if (element.key == target) {
        componentCase = { TYPE: element.key, component: element.item };
      }
    });
    return componentCase;
  }
}
