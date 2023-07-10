/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-06-05 18:01:00
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-06-06 13:40:14
 */
export class WebPerformance {
  start = 0;
  end = 0;

  excute(type: 'start' | 'end') {
    if (type === 'start') {
      this.createStart();
    } else if (type === 'end') {
      this.createEnd();
    }
  }

  private createStart() {
    this.start = new Date().getTime();
  }

  private createEnd() {
    this.end = new Date().getTime();
  }

  total() {
    return `${this.end - this.start}ms`;
  }
}
