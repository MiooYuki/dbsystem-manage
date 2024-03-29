<route lang="yaml">
  meta:
    title: 新建文档
  </route>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import api from '@/api'

const tabbar = useTabbar()

const form = ref({
  name: '',
  description: '',
  category: '',
})

const categories = ref([
  {
    id: '',
    name: '',
  },
])

function onSubmit(): void {
  api.post('/document/create', form.value, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((result) => {
    window.console.log(result)
    const res = result as any
    if (res.code === 200) {
      ElMessageBox.alert('创建成功。', '消息', {
        confirmButtonText: '确定',
        callback: () => {
          tabbar.close('/document/document_list')
        },
      })
    }
  })
}

function handleChange(): void {
  window.console.log(form.value)
}

onMounted(() => {
  api.get('/category/list').then((res) => {
    categories.value = res.data
    form.value.category = res.data[0].id
  })
})
</script>

<template>
  <div>
    <PageMain>
      <el-form :model="form" label-width="auto" style="max-width: 600px;">
        <el-form-item label="文档标题：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="文档描述：">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="文档分类：">
          <el-select v-model="form.category" placeholder="请选择分类" @change="handleChange">
            <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            创建
          </el-button>
          <el-button @click="tabbar.close('/document/document_list')">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </PageMain>
  </div>
</template>
