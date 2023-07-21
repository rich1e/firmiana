/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-01-13 17:31:37
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-17 15:51:15
 */
/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-21 17:05:16
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-25 11:11:19
 * @FilePath: /vue-form/src/example/jsx/components/Inputs/index.tsx
 * @Description:
 *
 */
import { defineComponent } from 'vue';
import { ElInput, inputProps } from 'element-plus';

export default defineComponent({
  name: 'InInput',
  /**
   * @see https://github.com/element-plus/element-plus/discussions/8394
   */
  // props: {
  //   ...inputProps,
  // },
  setup(_, { attrs, expose }) {
    // console.log('InInput#', attrs);
    const getValue = () => {
      console.log('getValue');
    };

    expose({ getValue });

    return () => <ElInput {...attrs} />;
  },
});
