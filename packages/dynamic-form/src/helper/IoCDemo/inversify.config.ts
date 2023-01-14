/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 19:18:56
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-08 13:43:31
 * @FilePath: /vue-form/src/helper/IoCDemo/inversify.config.ts
 * @Description:
 *
 */
import { Container } from 'inversify';
import { TYPES } from './types';
import { Warrior, Weapon, ThrowableWeapon } from './interfaces';
import { Ninja, Katana, Shuriken } from './entities';

const myContainer = new Container();
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);

export { myContainer };
