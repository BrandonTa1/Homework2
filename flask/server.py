from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

db = SQLAlchemy(app)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    points = db.Column(db.String(100))

    def __repr__(self):
        return f'<Student: {self.name}>'

@app.route('/students', methods=['GET', 'POST'])
def handle_students():
    if request.method == 'GET':
        students = Student.query.all()
        students_list = [{'id': student.id, 'name': student.name, 'points': student.points} for student in students]
        return jsonify(students_list)

    elif request.method == 'POST':
        data = request.get_json()
        new_student = Student(name=data['name'], points=data['points'])
        db.session.add(new_student)
        db.session.commit()
        return jsonify({'message': 'Student added successfully'}), 201

@app.route('/students/<int:student_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_student(student_id):
    student = Student.query.get_or_404(student_id)

    if request.method == 'GET':
        return jsonify({'id': student.id, 'name': student.name, 'points': student.points})

    elif request.method == 'PUT':
        data = request.get_json()
        student.name = data['name']
        student.points = data['points']
        db.session.commit()
        return jsonify({'message': 'Student updated successfully'})

    elif request.method == 'DELETE':
        db.session.delete(student)
        db.session.commit()
        return jsonify({'message': 'Student deleted successfully'})

if __name__ == "__main__":
    app.run(debug=True)