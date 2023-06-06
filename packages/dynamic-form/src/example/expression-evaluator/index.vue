<!--
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-06-02 18:17:14
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-06-06 17:43:08
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue';

  import GlobalParamsEvaluator, {
    print,
    formatGlobal,
    findExpObj,
    findExprePropertys,
    findGlobleParam,
  } from './global-params-evaluator';
  import { WebPerformance } from './helper';

  const msg = 'Expression Evaluator';
  const result = ref(null);
  const resultJSON = ref('');
  const expre: Ref<any[]> = ref([]);
  const globleParam: Ref<any[]> = ref([]);
  const globleParamJSON = ref('');
  const expObj: Ref<any[]> = ref([]);
  const expObjJSON = ref('');
  const showTime = ref('0');
  const isShow = ref(false);

  const p = new WebPerformance();

  const geval = new GlobalParamsEvaluator();

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

  const displayPassive = (val?: boolean) => {
    if (!val && !isShow.value) {
      isShow.value = true;
    } else {
      isShow.value = false;
    }

    if (val) {
      isShow.value = val;
    }
    resultJSON.value = JSON.stringify(result.value, null, 2);
  };

  const displayExpre = () => {
    expre.value = findExprePropertys(result.value).map((item) => {
      return {
        select: false,
        expre: item,
      };
    });
  };

  const displayGlobleParam = () => {
    globleParam.value = findGlobleParam(result.value);
    globleParamJSON.value = JSON.stringify(globleParam.value, null, 2);
  };

  const displayExpObj = () => {
    expObj.value = findExpObj(result.value);
    expObjJSON.value = JSON.stringify(expObj.value, null, 2);
  };

  const mathExample = () => {
    print(geval.math?.evaluate('2 * 3'));
    print(geval.math?.evaluate('0.1 + 0.2'));
    print(geval.math?.evaluate('0.3 / 0.2'));
    print(geval.math?.evaluate('0.874616541514647894948498463 * 0.2'));
    print(
      geval.math?.evaluate('decimal * 0.2 + n1', {
        decimal: '0.874616541514647894948498463',
        n1: '0.1',
      }),
    );
    print(geval.math?.evaluate('12 / (2.3 + 0.7)'));
    print(geval.math?.evaluate('sqrt(3^2 + 4^2)'));
  };

  const analysis = () => {
    p.excute('start');
    displayPassive(true);
    displayExpre();
    displayGlobleParam();
    displayExpObj();

    const scope = formatGlobal(globleParam.value);
    const expres = findExprePropertys(result.value);
    geval.setScope(scope);
    geval.import(true);
    // geval.set(expre.value);
    const { res, checked } = geval.checked(expres);

    if (!checked) {
      const errCodes = res.map((item) => item.idx);

      expre.value = expre.value.map((item, idx) => {
        const { expre } = item;
        if (errCodes.includes(idx)) {
          item.select = true;
          item.expre = expre;
        }
        return item;
      });
    }
    p.excute('end');
    showTime.value = p.total();
  };
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="title">
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
    <hr />
    <div>
      <button style="margin-right: 10px" @click="analysis">分析</button>
      <button @click="mathExample">示例</button>
    </div>
  </div>

  <div class="wrapper">
    <div class="expre-view">
      <h2
        >Find Expre: <span>{{ expre.length }}</span>
        <span> {{ showTime }} </span>
      </h2>
      <div class="expre-view--sub">
        <p v-for="(item, idx) in expre">
          <span :class="item.select ? 'err' : ''"
            >{{ idx }} - {{ item.expre }}</span
          >
        </p>
      </div>
    </div>

    <div class="expre-view">
      <h2
        >Global Parameters: <span>{{ globleParam.length }}</span></h2
      >
      <div class="expre-view--sub">
        <pre v-html="globleParamJSON"></pre>
      </div>
    </div>

    <div class="expre-view">
      <h2
        >Find ExpObj: <span>{{ Object.keys(expObj).length }}</span></h2
      >
      <div class="expre-view--sub">
        <pre v-html="expObjJSON"></pre>
      </div>
    </div>
  </div>

  <div style="margin: 10px auto">
    <button @click="displayPassive()">显示</button>
  </div>

  <div class="passive" v-show="isShow">
    <pre v-html="resultJSON"></pre>
  </div>
</template>

<style scoped lang="scss">
  .title {
    text-align: left;
  }

  .wrapper {
    display: flex;

    .expre-view {
      &:nth-child(2) {
        margin: auto 10px;
      }

      &--sub {
        height: 300px;
        padding: 5px;
        overflow: auto;
        text-align: left;
        border: 1px solid black;
      }

      pre {
        color: red;
      }

      p {
        color: red;
        white-space: nowrap;

        .err {
          background-color: aqua;
        }
      }
    }
  }

  .passive {
    height: 300px;
    padding: 5px;
    overflow: auto;
    color: red;
    text-align: left;
    border: 1px solid black;
  }
</style>
