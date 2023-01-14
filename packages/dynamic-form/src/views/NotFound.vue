<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 20:17:54
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-07 20:19:57
 * @FilePath: /vue-form/src/views/NotFound.vue
 * @Description:
 *
-->
<script lang="tsx">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'NotFound',
    setup() {
      return () => {
        return (
          <>
            <h1>404, Oops ~</h1>
          </>
        );
      };
    },
  });
</script>
