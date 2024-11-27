import { TYPE } from "@/type";
import type { componentType } from "@/type";
import {
  InputText,
  InputNumber,
  InputPassword,
  InputCheckbox,
  InputRadio,
  InputSelectBox,
  InputToggle,
} from "./modules/index"; //각종 input 컴포넌트들

import { home, manage } from "./menus";

/***
 * 컴포넌트 빌더에서 사용하는 클래스 입니다.
 */
export class ComponentAccess {
  private static components: Array<any> = [
    //일반 컴포넌트들
    { key: TYPE.TEXT, item: InputText },
    { key: TYPE.NUMBER, item: InputNumber },
    { key: TYPE.PASSWORD, item: InputPassword },
    { key: TYPE.CHECK, item: InputCheckbox },
    { key: TYPE.RADIO, item: InputRadio },
    { key: TYPE.SELECT, item: InputSelectBox },
    { key: TYPE.TOGGLE, item: InputToggle },

    //좌측 메뉴들
    { key: TYPE.home, item: home },
    { key: TYPE.manage, item: manage },
  ];
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
