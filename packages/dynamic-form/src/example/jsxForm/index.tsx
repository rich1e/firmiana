/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-24 09:46:15
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-06 15:42:45
 * @FilePath: /vue-form/src/example/jsxForm/index.tsx
 * @Description:
 *
 */
import { defineComponent, reactive, ref } from 'vue';
import { ElDivider } from 'element-plus';
import style from './index.module.scss';
import ModernForm from './ModernForm';
import PopularForm from './PopularForm.vue';
import { checkEmpty } from '../../components/DynamicForm/src/hooks/useValidator';

// type FormRefType = InstanceType<typeof ElForm>;

export default defineComponent({
  name: 'JsxForm',
  setup() {
    const render = () => {
      const formRef = ref(null);

      const model1 = reactive({
        username: '',
        gender: '',
        secondname: '',
        married: false,
        city: '',
        referees: [],
        slots: 1,
      });

      const rules1 = {
        username: [{ validator: checkEmpty, trigger: 'blur' }],
        gender: [{ validator: checkEmpty, trigger: 'blur' }],
        secondname: [{ validator: checkEmpty, trigger: 'blur' }],
        married: [{ validator: checkEmpty, trigger: 'blur' }],
        referees: [{ validator: checkEmpty, trigger: 'blur' }],
      };

      const json1 = [
        {
          inputType: 'input',
          label: 'User name',
          prop: 'username',
          inputVal: model1.username,
        },
        {
          inputType: 'radio',
          label: 'Gender',
          prop: 'gender',
          inputVal: model1.gender,
        },
        {
          inputType: 'input',
          label: 'Second name',
          prop: 'secondname',
          inputVal: model1.secondname,
        },
      ];

      return (
        <>
          <h1>jsxForm</h1>
          <div class={style['form-wrapper']}>
            <div class={style['form-wrapper_item']}>
              <ElDivider>Popular Form</ElDivider>
              <PopularForm
                formRef={formRef}
                formModel={model1}
                formRules={rules1}
                formFields={json1}
              />
            </div>

            <div class={style['form-wrapper_item']}>
              <ElDivider>Modern Form</ElDivider>
              <ModernForm />
            </div>
          </div>
        </>
      );
    };

    return () => {
      return <>{render()}</>;
    };
  },
});
