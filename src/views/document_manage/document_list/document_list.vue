<route lang="yaml">
meta:
  title: 文档列表
</route>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import api from '@/api'

const router = useRouter()
const { reload } = useMainPage()
const { open } = useTabbar()

// 未选择表格时禁用批量删除按钮
const deleteDisable = ref(true)

// 表格数据
const tableData = ref([
  {
    id: '',
    name: '',
    description: '',
    category: '',
    imgUrl: '',
  },
])

// 处理选择文档
function handleSelectionChange(val: any[]): void {
  window.console.log(val)
  if (val !== null && val.length !== 0) {
    deleteDisable.value = false
  }
  else {
    deleteDisable.value = true
  }
}

// 处理编辑文档
function handleEdit(row: any): void {
  open({
    name: 'EditDocument',
    params: {
      id: row.id,
    },
  })
}

// 处理删除文档
function handleDelete(row: any): void {
  ElMessageBox.confirm('确定要删除这条文档吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    api.delete('/document/delete', {
      params: {
        id: row.id,
      },
    }).then((result) => {
      const res = result as any
      if (res.code === 200) {
        ElMessageBox.alert('删除成功。', '消息', {
          confirmButtonText: '确定',
          callback: () => {
            reload()
          },
        })
      }
    })
  })
}

// 页面加载时
onMounted(() => {
  api.get('/document/list').then((res) => {
    tableData.value = res.data
  })
})
</script>

<template>
  <div>
    <PageMain>
      <template #title>
        <el-button plain type="primary" @click="router.push('/document/document_list/create')">
          新建文档
        </el-button>
        <el-button plain type="danger" :disabled="deleteDisable">
          批量删除
        </el-button>
      </template>
      <el-table :data="tableData" border style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column prop="name" label="Title" width="200px" />
        <el-table-column prop="description" label="Descriptions" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <el-dropdown>
              <el-button link type="primary">
                操作
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>详情</el-dropdown-item>
                  <el-dropdown-item @click="handleEdit(scope.row)">
                    编辑
                  </el-dropdown-item>
                  <el-dropdown-item @click="handleDelete(scope.row)">
                    删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </PageMain>
  </div>
</template>
