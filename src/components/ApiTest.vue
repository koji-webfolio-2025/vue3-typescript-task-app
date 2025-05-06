<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface ApiResponse {
  message: string
}

interface Task {
  id: number
  title: string
  description: string
  is_done: boolean
  created_at: string
  updated_at: string
}


const message = ref<string>('loading...')
const tasks = ref<Task[]>([]) 

const title = ref('')
const description = ref('')

const createTask = async () => {
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/tasks', {
      title: title.value,
      description: description.value,
    });
    alert('タスク登録成功！');
    title.value = '';
    description.value = '';
  } catch (error) {
    alert('タスク登録失敗...');
    console.error(error);
  }
}

onMounted(async () => {
  try {
    const res = await axios.get<ApiResponse>('http://127.0.0.1:8000/api/test')
    message.value = res.data.message

    // ★ タスク一覧も取得する
    const taskRes = await axios.get<Task[]>('http://127.0.0.1:8000/api/tasks')
    tasks.value = taskRes.data

  } catch (error) {
    message.value = 'APIエラーが発生しました'
    console.error(error)
  }
})
</script>

<template>
  <div>
    <h2>Laravel APIからのメッセージ：</h2>
    <p>{{ message }}</p>
    
    <h2>タスク一覧</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }} - {{ task.description }}
      </li>
    </ul>

    <h2>タスク登録フォーム</h2>
    <form @submit.prevent="createTask">
      <div>
        <label>タイトル：</label>
        <input v-model="title" type="text" />
      </div>
      <div>
        <label>説明：</label>
        <textarea v-model="description"></textarea>
      </div>
      <button type="submit">タスク登録</button>
    </form>

  </div>
</template>
