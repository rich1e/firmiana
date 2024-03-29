/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 19:18:56
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-07 19:19:13
 * @FilePath: /vue-form/src/helper/IoCDemo/entities.ts
 * @Description:
 *
 */
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import type { Weapon, ThrowableWeapon, Warrior } from './interfaces';
import { TYPES } from './types';

@injectable()
class Katana implements Weapon {
  public hit() {
    return 'cut!';
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw() {
    return 'hit!';
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Weapon;
  private _shuriken: ThrowableWeapon;

  public constructor(
    @inject(TYPES.Weapon) katana: Weapon,
    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon,
  ) {
    this._katana = katana;
    this._shuriken = shuriken;
  }

  public fight() {
    return this._katana.hit();
  }
  public sneak() {
    return this._shuriken.throw();
  }
}

export { Ninja, Katana, Shuriken };
