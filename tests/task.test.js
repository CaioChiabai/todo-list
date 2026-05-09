const request = require('supertest');
const app = require('../src/app');
const { TaskModel } = require('../src/models/taskModel');

// ============================================
// Unit Tests: TaskModel
// ============================================

describe('TaskModel', () => {
  let model;

  beforeEach(() => {
    model = new TaskModel();
  });

  describe('create()', () => {
    test('should create a task with valid data', () => {
      const task = model.create({ title: 'Test task' });

      expect(task).toBeDefined();
      expect(task.id).toBeDefined();
      expect(task.title).toBe('Test task');
      expect(task.description).toBe('');
      expect(task.completed).toBe(false);
      expect(task.reminderDate).toBeNull();
      expect(task.createdAt).toBeDefined();
      expect(task.updatedAt).toBeDefined();
    });

    test('should create a task with description and reminder', () => {
      const reminderDate = new Date(Date.now() + 3600000).toISOString();
      const task = model.create({
        title: 'Task with details',
        description: 'Some description',
        reminderDate
      });

      expect(task.description).toBe('Some description');
      expect(task.reminderDate).toBe(reminderDate);
    });

    test('should throw error when title is missing', () => {
      expect(() => model.create({})).toThrow('O título é obrigatório.');
      expect(() => model.create({ title: '' })).toThrow('O título é obrigatório.');
      expect(() => model.create({ title: '   ' })).toThrow('O título é obrigatório.');
    });

    test('should throw error when title exceeds 100 chars', () => {
      const longTitle = 'a'.repeat(101);
      expect(() => model.create({ title: longTitle })).toThrow('O título deve ter no máximo 100 caracteres.');
    });

    test('should throw error when description exceeds 500 chars', () => {
      const longDesc = 'a'.repeat(501);
      expect(() => model.create({ title: 'Test', description: longDesc })).toThrow('A descrição deve ter no máximo 500 caracteres.');
    });

    test('should trim title and description', () => {
      const task = model.create({ title: '  Test  ', description: '  Desc  ' });
      expect(task.title).toBe('Test');
      expect(task.description).toBe('Desc');
    });
  });

  describe('findAll()', () => {
    test('should return empty array when no tasks', () => {
      expect(model.findAll()).toEqual([]);
    });

    test('should return all tasks sorted by newest first', () => {
      model.create({ title: 'First' });
      model.create({ title: 'Second' });

      const tasks = model.findAll();
      expect(tasks).toHaveLength(2);
      expect(tasks[0].title).toBe('Second');
      expect(tasks[1].title).toBe('First');
    });
  });

  describe('findById()', () => {
    test('should find a task by ID', () => {
      const created = model.create({ title: 'Find me' });
      const found = model.findById(created.id);
      expect(found).toBeDefined();
      expect(found.title).toBe('Find me');
    });

    test('should return null for unknown ID', () => {
      expect(model.findById('non-existent')).toBeNull();
    });
  });

  describe('update()', () => {
    test('should update task title', () => {
      const task = model.create({ title: 'Original' });
      const updated = model.update(task.id, { title: 'Updated' });

      expect(updated.title).toBe('Updated');
      expect(updated.updatedAt).not.toBe(task.updatedAt);
    });

    test('should toggle completed status', () => {
      const task = model.create({ title: 'Toggle me' });
      expect(task.completed).toBe(false);

      const updated = model.update(task.id, { completed: true });
      expect(updated.completed).toBe(true);
    });

    test('should return null for unknown ID', () => {
      expect(model.update('non-existent', { title: 'New' })).toBeNull();
    });

    test('should throw error for empty title on update', () => {
      const task = model.create({ title: 'Valid' });
      expect(() => model.update(task.id, { title: '' })).toThrow('O título é obrigatório.');
    });
  });

  describe('delete()', () => {
    test('should delete a task', () => {
      const task = model.create({ title: 'Delete me' });
      expect(model.delete(task.id)).toBe(true);
      expect(model.findById(task.id)).toBeNull();
      expect(model.count()).toBe(0);
    });

    test('should return false for unknown ID', () => {
      expect(model.delete('non-existent')).toBe(false);
    });
  });

  describe('findReminders()', () => {
    test('should find tasks with past reminder dates', () => {
      const pastDate = new Date(Date.now() - 60000).toISOString(); // 1 min ago
      model.create({ title: 'Reminder task', reminderDate: pastDate });
      model.create({ title: 'No reminder' });

      const reminders = model.findReminders();
      expect(reminders).toHaveLength(1);
      expect(reminders[0].title).toBe('Reminder task');
    });

    test('should NOT include completed tasks in reminders', () => {
      const pastDate = new Date(Date.now() - 60000).toISOString();
      const task = model.create({ title: 'Done task', reminderDate: pastDate });
      model.update(task.id, { completed: true });

      expect(model.findReminders()).toHaveLength(0);
    });

    test('should NOT include tasks with future reminders', () => {
      const futureDate = new Date(Date.now() + 3600000).toISOString(); // 1 hour ahead
      model.create({ title: 'Future task', reminderDate: futureDate });

      expect(model.findReminders()).toHaveLength(0);
    });
  });

  describe('count()', () => {
    test('should return correct count', () => {
      expect(model.count()).toBe(0);
      model.create({ title: 'One' });
      expect(model.count()).toBe(1);
      model.create({ title: 'Two' });
      expect(model.count()).toBe(2);
    });
  });
});

// ============================================
// Integration Tests: API Endpoints
// ============================================

describe('API Endpoints', () => {
  // Reset the in-memory store before each test
  const { taskModel } = require('../src/models/taskModel');

  beforeEach(() => {
    taskModel.tasks = [];
  });

  describe('GET /api/tasks', () => {
    test('should return empty array initially', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('POST /api/tasks', () => {
    test('should create a task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'API task', description: 'Created via test' });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('API task');
      expect(res.body.id).toBeDefined();
    });

    test('should return 400 for missing title', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ description: 'No title' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('PUT /api/tasks/:id', () => {
    test('should update a task', async () => {
      const createRes = await request(app)
        .post('/api/tasks')
        .send({ title: 'Original' });

      const id = createRes.body.id;

      const updateRes = await request(app)
        .put(`/api/tasks/${id}`)
        .send({ title: 'Updated', completed: true });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body.title).toBe('Updated');
      expect(updateRes.body.completed).toBe(true);
    });

    test('should return 404 for unknown ID', async () => {
      const res = await request(app)
        .put('/api/tasks/unknown-id')
        .send({ title: 'Nope' });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    test('should delete a task', async () => {
      const createRes = await request(app)
        .post('/api/tasks')
        .send({ title: 'To delete' });

      const id = createRes.body.id;

      const deleteRes = await request(app).delete(`/api/tasks/${id}`);
      expect(deleteRes.status).toBe(200);

      // Verify deletion
      const getRes = await request(app).get('/api/tasks');
      expect(getRes.body).toHaveLength(0);
    });

    test('should return 404 for unknown ID', async () => {
      const res = await request(app).delete('/api/tasks/unknown-id');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/tasks/reminders', () => {
    test('should return tasks with due reminders', async () => {
      const pastDate = new Date(Date.now() - 60000).toISOString();

      await request(app)
        .post('/api/tasks')
        .send({ title: 'Reminder', reminderDate: pastDate });

      await request(app)
        .post('/api/tasks')
        .send({ title: 'No reminder' });

      const res = await request(app).get('/api/tasks/reminders');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe('Reminder');
    });
  });

  describe('GET /api/health', () => {
    test('should return health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.timestamp).toBeDefined();
    });
  });
});
