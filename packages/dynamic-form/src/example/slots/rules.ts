/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-29 20:48:28
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-30 17:27:01
 * @FilePath: /vue-form/src/example/slots/rules.ts
 * @Description:
 *
 */
export const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'));
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'));
      } else {
        callback();
      }
    }
  }, 1000);
};

export const checkEmpty = (rule: any, value: any, callback: any) => {
  if (!value || value === '' || value === false || value.length === 0) {
    callback(new Error(`It's Empty!`));
  } else {
    callback();
  }
};
