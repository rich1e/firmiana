/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 19:18:56
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-07 19:19:22
 * @FilePath: /vue-form/src/helper/IoCDemo/interfaces.ts
 * @Description:
 *
 */
export interface Warrior {
  fight(): string;
  sneak(): string;
}

export interface Weapon {
  hit(): string;
}

export interface ThrowableWeapon {
  throw(): string;
}
