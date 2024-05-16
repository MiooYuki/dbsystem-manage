<script setup>
import Editor from '@tinymce/tinymce-vue'
import { reactive } from 'vue'

const apikey = '58xgznt1cdt5ff0cj8pc5nd3ii4lh9orm7xk5qhk23mtppxu'
const init = reactive({
  language: 'zh_CN',
  min_height: 600,
  resize: false,
  // 关闭菜单栏
  menubar: false,
  // 图片上传地址
  images_upload_url: '/api/image_upload',
  // 工具栏配置
  toolbar_mode: 'warp',
  toolbar_sticky: true,
  toolbar1: 'code | bold italic underline strikethrough subscript superscript | lineheight forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | bullist numlist checklist',
  toolbar2: 'fullscreen | styles fontsize fontfamily | emoticons blockquote codesample link image table | wordcount',
  // 插件
  plugins: 'codesample table link image editimage lists advlist checklist advcode wordcount fullscreen autoresize emoticons',
  // 代码示例插件配置
  codesample_languages: [
    { text: 'Text', value: 'text' },
    { text: 'HTML/XML', value: 'markup' },
    { text: 'JavaScript', value: 'javascript' },
    { text: 'CSS', value: 'css' },
    { text: 'PHP', value: 'php' },
    { text: 'Ruby', value: 'ruby' },
    { text: 'Python', value: 'python' },
    { text: 'Java', value: 'java' },
    { text: 'C', value: 'c' },
    { text: 'C#', value: 'csharp' },
    { text: 'C++', value: 'cpp' },
  ],
})
</script>

<template>
  <Editor :api-key="apikey" :init="init" />
</template>
