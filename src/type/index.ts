import type { Component } from "vue";

/**
 * input필드, 레프트 아이콘 필드에 사용할 값 입니다.
 */
const TYPE = {
  TEXT: "TEXT",
  NUMBER: "NUMBER",
  TEXTAREA: "TEXTAREA",
  PASSWORD: "PASSWORD",
  FILE: "FILE",
  PHONE: "PHONE",
  EMAIL: "EMAIL",
  RADIO: "RADIO",
  CHECK: "CHECK",
  SELECT: "SELECT",
  TOGGLE: "TOGGLE",
  DROP_FILE: "DROP_FILE",
  TELL: "TELL",
  home: "home",
  manage: "manage",
};
Object.freeze(TYPE); //객체 불변화(readonly)
/**
 * @class 데이터 바인딩 및 컴포넌트 주입용 클래스
 * @constructor
 * @param {string} name api 서버와 연동 할 때 사용할 키
 * @param {string | number | array | object} value 바인딩할 데이터 또는 배열
 * @param {string} type 데이터의 종류
 * @param {boolean} require 데이터 기본 검증 필요여부, 함수 validate에서 대상여부
 * @param {object} option 옵션
 * @example
 * option : {
 *   change(Function) : 데이터가 변경된 이후 이벤트 전달,
 *   defaultName(string) : select 테그의 기본 이름 값,
 *   style(Object) : 컴포넌트에 추가할 스타일,
 *   error(boolean) : 컴포넌트 스타일을 오류로 변경,
 *   disable(boolean) : 컴포넌트를 사용할 수 없게 변경(스타일포함),
 *   min(number) : 최소 값, 문자 또는 숫자 형식의 데이터 유효성 검사시(validate) 사용,
 *   max(number) : 최대 값, 문자 또는 숫자 형식의 데이터 유효성 검사시(validate) 사용,
 *   skip(boolean) : 유효성 검사시(validate) 넘어갈지 말지 여부,
 *   multiple(boolean) : 파일인 경우 다중선택 여부,
 *   style(Object) : 엘리먼트에 적용시킬 스타일,
 *   class(string) : 엘리먼트에 적용시킬 클래스,
 * }
 */
class DataStructure {
  public name: string;
  public value: any;
  public type: string;
  public require: boolean;
  public option: any;
  public tabindex: number;

  constructor(arg: any) {
    const { value, type, require, option, tabindex, name } = arg;
    this.value = value;
    this.name = name;
    if (!type) throw new Error("type empty");
    this.type = type;
    this.require = require;
    this.option = option || {};
    this.tabindex = tabindex;
  }

  /**
   * @param {string} arg 문자열을 받아서 휴대폰 번호 유효성 검사를 합니다.
   * @returns {boolean}
   */
  isPhone(arg: string): boolean {
    let phonePattern = /01[016789][^0][0-9]{2,5}[0-9]{5,8}/;
    return phonePattern.test(arg);
  }

  /**
   * @param {string} arg 문자열을 받아서 이메일형식 유효성 검사를 합니다.
   * @returns {boolean}
   */
  isEmail(arg: string): boolean {
    let regex =
      /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/;
    return regex.test(arg);
  }

  isTell(tel: string) {
    if (tel == "") {
      return true;
    }
    const phoneRule = /^(070|02|0[3-9]{1}[0-9]{1})[0-9]{4}[0-9]{4}$/;
    const phoneRule2 = /^(0[3-9]{1}[0-9]{1}[0-9]{1})[0-9]{4,4}[0-9]{4}$/;
    const phoneRule3 = /^(0[3-9]{1}[0-9]{1})[0-9]{3}[0-9]{4}$/;
    const res1 = phoneRule.test(tel);
    const res2 = phoneRule2.test(tel);
    const res3 = phoneRule3.test(tel);
    return res1 || res2 || res3;
  }

  /**
   * @method 데이터의 기본 유효성을 검증 합니다(기본 단순형식)
   * @returns {boolean}
   */

  validate(): boolean {
    if (this.require) {
      const { min, max, skip, isOneDecimalPlace } = this.option || {};
      if (skip === true) return true;
      if (
        this.value.value === null ||
        this.value.value === "" ||
        this.value === null ||
        this.value === ""
      )
        return false;
      const checkValue: any = this.value.value || this.value;

      if (
        this.type === TYPE.TEXT ||
        this.type === TYPE.TEXTAREA ||
        this.type === TYPE.PASSWORD
      ) {
        if (min !== null && `${checkValue}`.trim().length < min) {
          return false;
        }
        if (max !== null && `${checkValue}`.trim().length > max) {
          return false;
        }
      } else if (this.type === TYPE.PHONE && !this.isPhone(checkValue)) {
        return false;
      } else if (this.type === TYPE.EMAIL && !this.isEmail(checkValue)) {
        return false;
      } else if (this.type === TYPE.NUMBER) {
        let reValue = checkValue;
        if (isNaN(checkValue)) {
          reValue = Number(checkValue.replaceAll(",", ""));
          if (isNaN(reValue)) return false;
        }
        if (min !== null && reValue < min) {
          return false;
        }
        if (max !== null && reValue > max) {
          return false;
        }
        if (!isOneDecimalPlace(reValue)) {
          return false;
        }
      } else if (
        this.type === TYPE.CHECK ||
        this.type === TYPE.RADIO ||
        this.type === TYPE.SELECT
      ) {
        const check1 = this.value.find((_dt: any) => _dt.selected === true);
        const check2 = this.value.find((_dt: any) => _dt.checked === true);
        if (!check1 && !check2) {
          return false;
        }
      } else if (this.type === TYPE.TELL && !this.isTell(checkValue)) {
        return false;
      }
    }
    return true;
  }
}

/***
 * 컴포넌트 빌더에서 사용하는 타입 입니다.
 */
type _component = {
  TYPE: string;
  component: Component;
};
export type componentType = {
  [props: string]: _component | undefined; //암시적 표현
};

export { TYPE, DataStructure };

/**
 * 서버에 요청시 사용되는 값의 타입 입니다.
 * @value {any} 서버에 요청시 사용되는 값
 * @name {string} 서버에 요청시 사용되는 이름
 * @desc {string} 설명
 */
export type valueObject = {
  [props: string]: {
    value: any; //서버에 요청시 사용되는 값
    name: string; //서버에 요청시 사용되는 이름
    desc?: string; //설명
    option?: any; //옵션
  };
};
