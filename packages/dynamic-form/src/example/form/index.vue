<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-23 18:36:22
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-06 15:50:27
 * @FilePath: /vue-form/src/example/form/index.vue
 * @Description:
 *
-->
<template>
  <ElForm
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <ElFormItem label="User name" prop="username">
      <CustInput v-model="ruleForm.username" type="text" />{{
        ruleForm.username
      }}
    </ElFormItem>
    <ElFormItem label="Password" prop="pass">
      <ElInput v-model="ruleForm.pass" type="password" autocomplete="off" />
    </ElFormItem>
    <ElFormItem label="Confirm" prop="checkPass">
      <ElInput
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
      />
    </ElFormItem>
    <ElFormItem label="Activity type" prop="type">
      <ElCheckboxGroup v-model="ruleForm.type">
        <ElCheckbox label="Online activities" name="type" />
        <ElCheckbox label="Promotion activities" name="type" />
        <ElCheckbox label="Offline activities" name="type" />
        <ElCheckbox label="Simple brand exposure" name="type" />
      </ElCheckboxGroup>
    </ElFormItem>
    <ElFormItem label="Activity zone" prop="region">
      <ElSelect v-model="ruleForm.region" placeholder="Activity zone">
        <ElOption label="Zone one" value="shanghai" />
        <ElOption label="Zone two" value="beijing" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem label="Age" prop="age">
      <ElInput v-model.number="ruleForm.age" />
    </ElFormItem>
    <ElFormItem label="Instant delivery" prop="delivery">
      <ElSwitch v-model="ruleForm.delivery" />
    </ElFormItem>
    <ElFormItem label="Resources" prop="resource">
      <ElRadioGroup v-model="ruleForm.resource">
        <ElRadio label="Sponsorship" />
        <ElRadio label="Venue" />
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="submitForm(ruleFormRef)">
        Submit
      </ElButton>
      <ElButton @click="resetForm(ruleFormRef)">Reset</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import {
    ElForm,
    ElFormItem,
    ElButton,
    ElInput,
    ElRadio,
    ElRadioGroup,
    ElCheckbox,
    ElCheckboxGroup,
    ElSwitch,
    ElSelect,
    ElOption,
  } from 'element-plus';

  import CustInput from '../jsx/components/CustInput/index.vue';

  type FormRefType = InstanceType<typeof ElForm>;

  const ruleFormRef = ref<InstanceType<typeof ElForm> | null | any>(null);

  const checkAge = (rule: any, value: any, callback: any) => {
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

  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password'));
    } else {
      if (ruleForm.checkPass !== '') {
        if (!ruleFormRef.value) return;
        ruleFormRef.value.validateField('checkPass', () => null);
      }
      callback();
    }
  };

  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password again'));
    } else if (value !== ruleForm.pass) {
      callback(new Error("Two inputs don't match!"));
    } else {
      callback();
    }
  };

  const checkRegion = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Instant delivery is not select'));
    } else {
      // if (ruleForm.checkPass !== '') {
      //   if (!ruleFormRef.value) return;
      //   ruleFormRef.value.validateField('checkPass', () => null);
      // }
      callback();
    }
  };

  const checkDelivery = (rule: any, value: any, callback: any) => {
    if (value === false) {
      callback(new Error('Instant delivery is not select'));
    } else {
      // if (ruleForm.checkPass !== '') {
      //   if (!ruleFormRef.value) return;
      //   ruleFormRef.value.validateField('checkPass', () => null);
      // }
      callback();
    }
  };

  const checkResource = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please select activity resource'));
    } else {
      // if (ruleForm.checkPass !== '') {
      //   if (!ruleFormRef.value) return;
      //   ruleFormRef.value.validateField('checkPass', () => null);
      // }
      callback();
    }
  };

  const checkType = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      callback(new Error('Please select at least one activity type'));
    } else {
      // if (ruleForm.checkPass !== '') {
      //   if (!ruleFormRef.value) return;
      //   ruleFormRef.value.validateField('checkPass', () => null);
      // }
      callback();
    }
  };

  const ruleForm = reactive({
    username: '',
    pass: '',
    region: '',
    checkPass: '',
    age: '',
    delivery: false,
    resource: '',
    type: [],
  });

  /**
   * // TODO trigger 只能填写组件支持的事件
   * @see https://github.com/yiminghe/async-validator
   */
  const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    region: [{ validator: checkRegion, trigger: 'change' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    age: [{ validator: checkAge, trigger: 'blur' }],
    delivery: [{ validator: checkDelivery, trigger: 'change' }],
    resource: [{ validator: checkResource, trigger: 'change' }],
    // change 存在 bug
    type: [{ validator: checkType, trigger: 'blur' }],
  });

  const submitForm = (formEl: FormRefType | undefined) => {
    if (!formEl) return;
    formEl.validate((valid: any) => {
      if (valid) {
        console.log('submit!');

        console.log(ruleForm);
      } else {
        console.log('error submit!');
        return false;
      }
    });
  };

  const resetForm = (formEl: FormRefType | undefined) => {
    if (!formEl) return;
    console.log('formEl#', formEl);
    /**
     * el-form resetFields()方法对el-checkbox-group失效，仍显示错误提示信息
     * @see https://github.com/element-plus/element-plus/issues/7292
     */
    formEl.resetFields();
  };
</script>
