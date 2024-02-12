import unittest
from flask import Flask, jsonify
from flask.testing import FlaskClient
from app import app, db, Todo

class TestApp(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_update_task(self):
        # Create a task
        task = Todo(title='Task 1', description='Description 1', completed=False)
        db.session.add(task)
        db.session.commit()

        # Update the task
        response = self.app.put('/edit/1', json={'title': 'Updated Task', 'completed': True})
        data = response.get_json()

        # Check if the task was updated successfully
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'task updated')
        self.assertEqual(data['task']['title'], 'Updated Task')
        self.assertEqual(data['task']['description'], 'Description 1')
        self.assertEqual(data['task']['completed'], True)

    def test_update_task_not_found(self):
        # Update a non-existent task
        response = self.app.put('/edit/1', json={'title': 'Updated Task', 'completed': True})
        data = response.get_json()

        # Check if the task not found message is returned
        self.assertEqual(response.status_code, 404)
        self.assertEqual(data['message'], 'task not found')

if __name__ == '__main__':
    unittest.main()