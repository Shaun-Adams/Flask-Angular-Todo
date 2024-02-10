from flask import Flask, request, jsonify, make_response, send_file, render_template
from flask_sqlalchemy import SQLAlchemy
from os import environ
from http import HTTPStatus
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL') or 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Todo(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    completed = db.Column(db.Boolean, default=False, nullable=False)

    def json(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed
        }

with app.app_context():
    db.create_all()

@app.route('/')
def serve_index():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def create_task():
    data = request.get_json()
    new_task = Todo(title=data['title'], description=data['description'], completed=data.get('completed', False))
    db.session.add(new_task)
    db.session.commit()
    return make_response(jsonify({'message': 'task created'}), HTTPStatus.CREATED)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Todo.query.all()
    print(tasks)  # Print the tasks to the console
    return make_response(jsonify([task.json() for task in tasks]), HTTPStatus.OK)

@app.route('/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = Todo.query.get(id)
    if task:
        return make_response(jsonify({'task': task.json()}), HTTPStatus.OK)
    return make_response(jsonify({'message': 'task not found'}), HTTPStatus.NOT_FOUND)

@app.route('/edit/<int:id>', methods=['PUT'])
def update_task(id):
    task = Todo.query.get(id)
    if task:
        data = request.get_json()
        if 'title' in data:
            task.title = data['title']
        if 'description' in data:
            task.description = data['description']
        if 'completed' in data:
            task.completed = data['completed']
        db.session.commit()
        return make_response(jsonify({'message': 'task updated', 'task': task.json()}), HTTPStatus.OK)
    return make_response(jsonify({'message': 'task not found'}), HTTPStatus.NOT_FOUND)

@app.route('/complete/<int:id>', methods=['PUT'])
def complete_task(id):
    task = Todo.query.get(id)
    if task:
        task.completed = True
        db.session.commit()
        return make_response(jsonify({'message': 'task completed'}), HTTPStatus.OK)
    return make_response(jsonify({'message': 'task not found'}), HTTPStatus.NOT_FOUND)

@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Todo.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return make_response(jsonify({'message': 'task deleted'}), HTTPStatus.OK)
    return make_response(jsonify({'message': 'task not found'}), HTTPStatus.NOT_FOUND)

if __name__ == '__main__':
    app.run(debug=True)