<!--
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-06-02 18:17:14
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-06-02 20:51:06
-->
<script setup lang="ts">
  import { ref } from 'vue';

  const msg = 'Expression Evaluator';
  const result = ref(null);

  const updateImageDisplay = (evt: any) => {
    const file = evt.currentTarget.files[0];
    handleReadFile(file);
  };

  const handleReadFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (thisFile) => {
      if (thisFile.target && thisFile.target.result) {
        result.value = JSON.parse(thisFile.target.result.toString());
      }
    };
  };

  const findGlobleParam = (json: any) => {
    return json.data.tree.attrs.configGlobleParam;
  };

  const findExpObj = (json: any) => {
    return json.data.tree.attrs.exp_obj;
  };

  /**
   * 查找以 expre_ 开头的属性和值
   * @param json
   * @returns
   */
  const findExprePropertys = (json: any) => {
    const regex = /("expre_[^"]+"):\s*"([^"]*)"/g;
    const expres: any[] = [];
    let matches;
    while ((matches = regex.exec(JSON.stringify(json)))) {
      const property = matches[1];
      const value = matches[2];
      // console.log("Property:", property);
      // console.log("Value:", value);
      if (value && Number.isNaN(parseInt(value))) {
        const obj: any = {};
        obj[property] = value;
        expres.push(obj);
      }
    }
    return expres;
  };

  const analysis = () => {
    console.log(result.value);
    console.log(findExprePropertys(result.value));
    console.log(findGlobleParam(result.value));
    console.log(findExpObj(result.value));
  };
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="wrapper">
    <div>
      <label for="file">选择要上传的文件</label>
      <input
        type="file"
        id="file"
        @change="updateImageDisplay"
        name="file"
        accept=".json, .passive"
        multiple
      />
    </div>
    <div>
      <button @click="analysis">分析</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .wrapper {
    text-align: left;
  }
</style>
