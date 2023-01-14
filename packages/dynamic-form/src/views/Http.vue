<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 19:22:40
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-06 15:44:13
 * @FilePath: /vue-form/src/views/Http.vue
 * @Description:
 *
-->
<script lang="tsx">
  import { defineComponent } from 'vue';
  import { ElButton } from 'element-plus';

  import { CustomAxiosHttpClientClass } from '../helper/request/customAxiosClass';

  import { Warrior } from '../helper/IoCDemo/interfaces';
  import { myContainer } from '../helper/IoCDemo/inversify.config';
  import { TYPES } from '../helper/IoCDemo/types';

  import { httpClient } from '../helper/request';

  export default defineComponent({
    name: 'Http',
    setup() {
      const onClickHandler = async () => {
        console.log('http!');

        const ninja = myContainer.get<Warrior>(TYPES.Warrior);

        console.log(ninja.fight());
        console.log(ninja.sneak());

        const http = new CustomAxiosHttpClientClass({}).create();
        const res = await http.get('api/get');

        console.log('Class Http', res);

        const currtHttp = httpClient.create();
        const data = await currtHttp.get('api/get');

        console.log('IoC Http', data);
      };

      return () => {
        return (
          <>
            <ElButton onClick={onClickHandler}>Http</ElButton>
          </>
        );
      };
    },
  });
</script>
