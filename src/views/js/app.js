/**
 * TODO List — Frontend Application Logic
 * Architecture: MVC (View Layer - Client-Side)
 *
 * Handles:
 * - CRUD operations via Fetch API
 * - UI rendering and updates
 * - Reminder polling
 * - Theme toggling
 * - Toast notifications
 */

const API_URL = '/api/tasks';
const REMINDER_POLL_INTERVAL = 30000; // 30 seconds

// --- State ---
let tasks = [];
let currentFilter = 'all';
let reminderIds = new Set();

// --- DOM Elements ---
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-description');
const taskReminderInput = document.getElementById('task-reminder');
const titleCount = document.getElementById('title-count');
const descCount = document.getElementById('desc-count');
const submitBtn = document.getElementById('submit-btn');
const taskListEl = document.getElementById('task-list');
const emptyStateEl = document.getElementById('empty-state');
const taskCountEl = document.getElementById('task-count');
const themeToggle = document.getElementById('theme-toggle');
const toastContainer = document.getElementById('toast-container');
const filterBtns = document.querySelectorAll('.filter-btn');

// ============================================
// API Functions
// ============================================

async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Erro ao carregar tarefas');
    tasks = await res.json();
    renderTasks();
  } catch (error) {
    showToast('Erro ao carregar tarefas.', 'error');
    console.error(error);
  }
}

async function createTask(data) {
  try {
    setLoading(true);
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erro ao criar tarefa');
    }

    const task = await res.json();
    tasks.unshift(task);
    renderTasks();
    showToast('Tarefa criada com sucesso!', 'success');
    return task;
  } catch (error) {
    showToast(error.message, 'error');
    console.error(error);
    return null;
  } finally {
    setLoading(false);
  }
}

async function updateTask(id, data) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erro ao atualizar tarefa');
    }

    const updated = await res.json();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) tasks[index] = updated;
    renderTasks();
    return updated;
  } catch (error) {
    showToast(error.message, 'error');
    console.error(error);
    return null;
  }
}

async function deleteTask(id) {
  try {
    // Animate removal first
    const card = document.querySelector(`[data-task-id="${id}"]`);
    if (card) {
      card.classList.add('removing');
      await new Promise(resolve => setTimeout(resolve, 350));
    }

    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erro ao remover tarefa');
    }

    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    showToast('Tarefa removida!', 'success');
  } catch (error) {
    showToast(error.message, 'error');
    console.error(error);
    // Re-fetch to restore UI state
    await fetchTasks();
  }
}

async function fetchReminders() {
  try {
    const res = await fetch(`${API_URL}/reminders`);
    if (!res.ok) return;

    const reminders = await res.json();
    const newReminderIds = new Set(reminders.map(t => t.id));

    // Check for newly triggered reminders
    for (const id of newReminderIds) {
      if (!reminderIds.has(id)) {
        const task = tasks.find(t => t.id === id);
        if (task) {
          showToast(`🔔 Lembrete: ${task.title}`, 'warning');
        }
      }
    }

    reminderIds = newReminderIds;
    updateReminderHighlights();
  } catch (error) {
    console.error('Erro ao verificar lembretes:', error);
  }
}

// ============================================
// Rendering
// ============================================

function renderTasks() {
  const filtered = getFilteredTasks();

  taskCountEl.textContent = tasks.length;

  if (filtered.length === 0) {
    taskListEl.innerHTML = '';
    emptyStateEl.hidden = false;
    return;
  }

  emptyStateEl.hidden = true;

  taskListEl.innerHTML = filtered.map(task => {
    const isCompleted = task.completed;
    const hasReminder = task.reminderDate;
    const isReminderDue = reminderIds.has(task.id);

    const cardClasses = [
      'task-card',
      isCompleted ? 'completed' : '',
      isReminderDue && !isCompleted ? 'has-reminder-due' : ''
    ].filter(Boolean).join(' ');

    const checkboxClass = `task-checkbox${isCompleted ? ' checked' : ''}`;

    const reminderBadge = hasReminder
      ? `<span class="task-reminder-badge ${isReminderDue && !isCompleted ? 'due' : ''}">
           🔔 ${formatDate(task.reminderDate)}
         </span>`
      : '';

    return `
      <div class="${cardClasses}" data-task-id="${task.id}">
        <button
          class="${checkboxClass}"
          onclick="handleToggleComplete('${task.id}', ${!isCompleted})"
          title="${isCompleted ? 'Marcar como pendente' : 'Marcar como concluída'}"
          aria-label="${isCompleted ? 'Marcar como pendente' : 'Marcar como concluída'}"
        ></button>
        <div class="task-body">
          <div class="task-title">${escapeHtml(task.title)}</div>
          ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
          <div class="task-meta">
            <span class="task-date">📅 ${formatDate(task.createdAt)}</span>
            ${reminderBadge}
          </div>
        </div>
        <div class="task-actions">
          <button
            class="btn-delete"
            onclick="handleDelete('${task.id}')"
            title="Remover tarefa"
            aria-label="Remover tarefa"
          >🗑️</button>
        </div>
      </div>
    `;
  }).join('');
}

function getFilteredTasks() {
  switch (currentFilter) {
    case 'pending':
      return tasks.filter(t => !t.completed);
    case 'completed':
      return tasks.filter(t => t.completed);
    case 'reminders':
      return tasks.filter(t => t.reminderDate && !t.completed);
    default:
      return tasks;
  }
}

function updateReminderHighlights() {
  document.querySelectorAll('.task-card').forEach(card => {
    const id = card.dataset.taskId;
    const task = tasks.find(t => t.id === id);
    if (!task || task.completed) return;

    if (reminderIds.has(id)) {
      card.classList.add('has-reminder-due');
      const badge = card.querySelector('.task-reminder-badge');
      if (badge) badge.classList.add('due');
    } else {
      card.classList.remove('has-reminder-due');
      const badge = card.querySelector('.task-reminder-badge');
      if (badge) badge.classList.remove('due');
    }
  });
}

// ============================================
// Event Handlers
// ============================================

function handleToggleComplete(id, completed) {
  updateTask(id, { completed });
}

function handleDelete(id) {
  deleteTask(id);
}

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const description = taskDescInput.value.trim();
  const reminderDate = taskReminderInput.value || null;

  if (!title) {
    showToast('O título é obrigatório.', 'error');
    taskTitleInput.focus();
    return;
  }

  const result = await createTask({ title, description, reminderDate });
  if (result) {
    taskForm.reset();
    titleCount.textContent = '0';
    descCount.textContent = '0';
    taskTitleInput.focus();
  }
});

// Character counters
taskTitleInput.addEventListener('input', () => {
  titleCount.textContent = taskTitleInput.value.length;
});

taskDescInput.addEventListener('input', () => {
  descCount.textContent = taskDescInput.value.length;
});

// Filter tabs
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ============================================
// Utilities
// ============================================

function setLoading(loading) {
  const text = submitBtn.querySelector('.btn-text');
  const spinner = submitBtn.querySelector('.btn-loading');
  if (loading) {
    text.hidden = true;
    spinner.hidden = false;
    submitBtn.disabled = true;
  } else {
    text.hidden = false;
    spinner.hidden = true;
    submitBtn.disabled = false;
  }
}

function showToast(message, type = 'success') {
  const icons = { success: '✅', error: '❌', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || ''}</span><span>${escapeHtml(message)}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================================
// Initialization
// ============================================

function init() {
  // Restore theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Load tasks
  fetchTasks();

  // Start reminder polling
  setInterval(fetchReminders, REMINDER_POLL_INTERVAL);
  // Also check immediately
  setTimeout(fetchReminders, 2000);
}

init();
