import { TYPE, type menuType } from "~/type";

export function getMenuItems(): menuType[] {
  const menus: menuType[] = reactive([
    {
      id: 1,
      name: "메뉴1",
      url: "/",
      icon: TYPE.home,
      option: {
        show: true,
      },
    },
    {
      id: 1,
      name: "메뉴2",
      icon: TYPE.manage,
      option: {
        show: false,
      },
      children: [
        {
          id: 2,
          name: "메뉴2 - 1",
          url: "/manage/list",
          icon: "manage",
        },
        {
          id: 2,
          name: "메뉴2 - 2",
          url: "/manage/write ",
          icon: "manage",
        },
      ],
    },
  ]);
  for (let i = 0; i < 10; i++) {
    menus.push({
      id: i + 5,
      name: `메뉴${i + 3}~~~`,
      url: "/",
      icon: TYPE.home,
      option: {
        show: true,
      },
      children: [
        {
          id: i + 35,
          name: `메뉴${i + 3} - 1`,
          url: "/manage/list",
          icon: "manage",
        },
        {
          id: i + 135,
          name: `메뉴${i + 3} - 2`,
          url: "/manage/write ",
          icon: "manage",
        },
        {
          id: i + 135,
          name: `메뉴${i + 3} - 2`,
          url: "/manage/write ",
          icon: "manage",
        },

        {
          id: i + 135,
          name: `메뉴${i + 3} - 2`,
          url: "/manage/write ",
          icon: "manage",
        },
        {
          id: i + 135,
          name: `메뉴${i + 3} - 2`,
          url: "/manage/write ",
          icon: "manage",
        },
      ],
    });
  }
  return menus;
}

export const HEADER_HEIGHT = 73;
export const LEFT_MENU_WIDTH = 212;
