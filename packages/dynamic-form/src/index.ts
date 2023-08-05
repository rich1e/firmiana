/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2022-12-05 14:56:45
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 16:26:13
 */
import 'element-plus/dist/index.css';
import { withInstall } from './installer';

import DynamicForm from './components/DynamicForm';
import { FirInputExpression } from './components/InputExpression';

// 按需引入
export { DynamicForm, FirInputExpression };
// 全局引入
export default withInstall(DynamicForm);
