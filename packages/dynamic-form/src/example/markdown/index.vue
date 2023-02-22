<!--
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-02-17 17:09:38
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-02-22 16:48:52
 * @FilePath     : /firmiana/packages/dynamic-form/src/example/markdown/index.vue
 * @Description  :
 *
-->
<script setup lang="ts">
  import { ref } from 'vue';
  import { marked } from 'marked';
  import axios from 'axios';

  const MDFile = 'http://127.0.0.1:5173/README.md';
  // import README from './README.md';
  // import README from 'http://127.0.0.1:5173/README.md';
  // import dinosaurs from './data.json' assert { type: 'json' };

  // const all_res = import.meta.glob('./data.json', { eager: true });
  // const all_res = import.meta.glob('./README.md');
  // console.log(all_res);

  // const dinosaurs = import('./data.json', {
  //   assert: {
  //     type: 'json',
  //   },
  // });

  // dinosaurs.then(
  //   (d) => {
  //     console.log('🦕', d);
  //   },
  //   // d.default.forEach((dino) => {
  //   //   console.log('🦕', dino);
  //   // }),
  // );

  // const jsonContent = await import('./data.json', {
  //   assert: {
  //     type: 'json',
  //   },
  // });
  // console.log(jsonContent);

  // const getMarkdown = async () => {
  //   import(`./README.md`)
  //     .then((res) => {
  //       console.log(res);
  //       // fetch((res as any).default)
  //       //   .then((res) => {
  //       //     console.log(res.text());
  //       //   })
  //       //   .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const README = getMarkdown();
  // console.log(README);

  // import data from './data.json';
  // console.log(data);

  const markdown = ref('');

  /**
   * @param md
   * @see https://github.com/simonhaenisch/md-to-pdf/issues/74#issuecomment-834789712
   * @see https://marked.js.org/using_pro#renderer
   * @see https://blog.csdn.net/tujiaw/article/details/78442687
   */
  const parseToc = (md: string) => {
    const toc: { level: number; text: string; slug: string }[] = [];

    const renderer = new marked.Renderer();

    renderer.heading = (text, level, raw, slugger) => {
      const slug = slugger.slug(raw);
      toc.push({ level, text, slug });
      return text;
    };

    marked(md, { renderer });

    return toc
      .map((t) => `${Array(t.level).join('  ')}- [${t.text}](#${t.slug})`)
      .join('\n\n');
  };

  const fillTOC = (md: string) => {
    return md.replace(/\[TOC\]/, parseToc(md));
  };

  (async () => {
    /**
     * @see https://stackoverflow.com/questions/67865778/how-to-dynamically-import-markdown-files
     */
    const res = await fetch('./README.md');
    // const res = await fetch(MDFile);
    const origMD = await res.text();

    /**
     * @see https://stackoverflow.com/questions/65052115/how-to-read-the-txt-file-of-the-link-taken-in-axios
     */
    // const res = await axios.get(MDFile);
    // const origMD = res.data;

    console.log(origMD);

    const rendererMD = fillTOC(origMD);
    markdown.value = marked(rendererMD);
  })();
</script>

<template>
  <div class="note">
    <div v-html="markdown"></div>
  </div>
</template>

<style scoped lang="scss">
  .note {
    height: calc(100% - 200px);
    margin-top: 20px;
    overflow: auto;
    text-align: left;
  }
</style>
