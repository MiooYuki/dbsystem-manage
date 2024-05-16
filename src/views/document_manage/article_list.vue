<route lang="yaml">
  meta:
    title: 文章列表
</route>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

const menuData = ref([
  {
    id: new Date().getTime() + Math.floor(Math.random() * 10000),
    parentId: 0,
    name: '章节一',
    children: [],
  },
])

function addChapter(): void {
  menuData.value.push({
    id: new Date().getTime() + Math.floor(Math.random() * 10000),
    parentId: 0,
    name: '新章节',
    children: [],
  })
}

function deleteRow(row: any): void {
  window.console.log(row)
  menuData.value = menuData.value.filter((item) => {
    return item.id !== row.id
  })
}
</script>

<template>
  <div>
    <PageMain>
      <h3>目录结构</h3>
      <el-table :data="menuData" style="width: 100%; margin-bottom: 20px;" row-key="id" default-expand-all>
        <el-table-column prop="name" label="Name" />
        <el-table-column align="right">
          <template #header>
            <el-button type="primary" @click="addChapter">
              添加章节
            </el-button>
          </template>
          <template #default="scope">
            <el-button link type="primary">
              编辑名称
            </el-button>
            <el-button link type="primary">
              添加子章节
            </el-button>
            <el-button link type="danger" @click="deleteRow(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </PageMain>
  </div>
</template>
