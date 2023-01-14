/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-12-05 14:56:45
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-05 16:13:54
 * @FilePath: /vue-form/src/index.ts
 * @Description:
 *
 */
import 'element-plus/dist/index.css';
import DynamicForm from './components/DynamicForm';
import { withInstall } from './installer';

// 按需引入
export { DynamicForm };
// 全局引入
export default withInstall(DynamicForm);
