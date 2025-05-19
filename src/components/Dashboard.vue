<template>
  <div class="dashboard">
    <h1>ダッシュボード</h1>
    <div v-if="userStore.isLoggedIn">
        <p>ようこそ、{{ userStore.name }}さん</p>
        <p>メール: {{ userStore.email }}</p>
        <button @click="handleLogout">ログアウト</button>

        <h2>タスク一覧</h2>
        <p v-if="!loading && error" class="error">{{ error }}</p>
        <div v-if="loading" class="loading">読み込み中...</div>
        <ul v-else>
            <li v-for="task in tasks" :key="task.id">
                <strong>{{ task.title }}</strong>
                <span v-if="task.description">: {{ task.description }}</span>
                <span v-if="task.is_done">✅</span>
            </li>
        </ul>
        <h2>新規タスク作成</h2>
        <form @submit.prevent="handleCreateTask">
            <input v-model="newTitle" type="text" placeholder="タイトル" required />
            <input v-model="newDescription" type="text" placeholder="詳細" required />
            <button type="submit">作成</button>
        </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchTasks, Task ,createTask} from '@/lib/tasks';
import { logout } from '@/lib/logout';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const tasks = ref<Task[]>([]);
const loading = ref(true);
const error = ref('');
const newTitle = ref('');
const newDescription = ref('');
const userStore = useUserStore();

const handleLogout = async () => {
  await logout();
  userStore.clearUser();
  router.push('/login');
};

const handleCreateTask = async () => {
  try {
    const newTask = await createTask(newTitle.value, newDescription.value);
    tasks.value.push(newTask); // 成功したら追加
    newTitle.value = '';
    newDescription.value = '';
  } catch (e: any) {
    error.value = e.message || '作成エラー';
  }
};

onMounted(async () => {
  try {
    tasks.value = await fetchTasks();
  } catch (e: any) {
    error.value = 'タスクの取得に失敗しました';
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: 2rem auto;
}
.error {
  color: red;
  margin-top: 1rem;
}
.loading {
  color: #555;
  margin-top: 1rem;
}
form {
  margin-top: 2rem;
}
form input {
  margin-right: 0.5rem;
  padding: 0.5rem;
}
form button {
  padding: 0.5rem 1rem;
}
</style>
