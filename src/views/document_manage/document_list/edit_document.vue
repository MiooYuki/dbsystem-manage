<route lang="yaml">
  meta:
    title: 编辑文档
</route>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import api from '@/api'

const route = useRoute()
const tabbar = useTabbar()

const form = ref({
  id: '',
  name: '',
  description: '',
  category: '',
  imgUrl: '',
})

function onSubmit(): void {
  api.put('/document/edit', form.value, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((result) => {
    window.console.log(result)
    const res = result as any
    if (res.code === 200) {
      ElMessageBox.alert('修改成功。', '消息', {
        confirmButtonText: '确定',
        callback: () => {
          tabbar.close('/document/document_list')
        },
      })
    }
  })
}

onMounted(() => {
  api.get('/document/get', {
    params: {
      id: route.params.id,
    },
  }).then((res) => {
    form.value = res.data
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
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option label="分类1" value="shanghai" />
            <el-option label="分类2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            修改
          </el-button>
          <el-button @click="tabbar.close('/document/document_list')">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </PageMain>
  </div>
</template>
