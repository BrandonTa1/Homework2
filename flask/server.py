from flask import Flask, jsonify
from flask import render_template
from flask import request
import sqlite3

app = Flask(__name__)

# Home Page route
@app.route("/")
def home():
    return "<p>Hello, sqlite3</p>"



# Route to add a new record (INSERT) student data to the database
@app.route("/add", methods=['POST', 'GET'])
def addrec():
    # Data will be available from POST submitted by the form
    if request.method == 'POST':
        try:
            data = request.get_json()
            nm = data['name']
            ID = data['ID']
            points = data['points']

            # Check if the ID already exists in the database
            with sqlite3.connect('database.db') as con:
                cur = con.cursor()
                cur.execute("SELECT ID FROM students WHERE ID=?", (ID,))
                existing_id = cur.fetchone()

                if existing_id:
                    msg = f"Record with ID {ID} already exists in the database"
                else:
                    # Perform the INSERT operation only if the ID doesn't exist
                    cur.execute("INSERT INTO students (name, ID, points) VALUES (?,?,?)", (nm, ID, points))
                    con.commit()
                    msg = "Record successfully added to the database"
        except Exception as e:
            con.rollback()
            msg = f"Error in the INSERT: {str(e)}"
        finally:
            con.close()
            get_data()  # Refresh the data after adding or rejecting the entry
            # Send the transaction message to the front-end
            return jsonify({'message': msg})

# Route to SELECT all data from the database and display in a table      
@app.route('/list')
def list():
    print("test")
    # Connect to the SQLite3 datatabase and 
    # SELECT rowid and all Rows from the students table.
    con = sqlite3.connect("database.db")
    con.row_factory = sqlite3.Row

    cur = con.cursor()
    cur.execute("SELECT rowid, * FROM students")

    rows = cur.fetchall()
    students_list = [{'name': row['name'], 'id': row['id'], 'points': row['points']} for row in rows]
    con.close()
    # Send the results of the SELECT to the list.html page
    return jsonify(students_list)


# Route used to execute the UPDATE statement on a specific record in the database
@app.route("/edit", methods=['POST','GET'])
def editrec():
    # Data will be available from POST submitted by the form
    if request.method == 'POST':
        try:
            data = request.get_json()
            nm = data['name']
            ID = data['ID']
            points = data['points']

            # UPDATE a specific record in the database based on the rowid
            with sqlite3.connect('database.db') as con:
                cur = con.cursor()
                cur.execute("UPDATE students SET name='"+nm+"', points='"+points+"' WHERE ID="+ID)

                con.commit()
                msg = "Record successfully edited in the database"
        except:
            con.rollback()
            msg = "Error in the Edit"

        finally:
            con.close()
            # Send the transaction message to result.html
            return jsonify({'message': msg})

# Route used to DELETE a specific record in the database    
@app.route("/delete", methods=['POST','GET'])
def delete():
    if request.method == 'POST':
        try:
            # Use the hidden input value of ID from the form to get the rowid
            data = request.get_json()
            ID = data.get('ID')

            # Connect to the database and DELETE a specific record based on rowid
            with sqlite3.connect('database.db') as con:
                cur = con.cursor()
                cur.execute("DELETE FROM students WHERE ID=?", (ID,))

                con.commit()
                msg = "Record successfully deleted from the database"
        except Exception as e:
            con.rollback()
            msg = f"Error in the DELETE: {str(e)}"
        finally:
            con.close()
            # Send the transaction message to the front-end
            return jsonify({'message': msg})

@app.route('/sendUpdate')
def get_data():
    print("test1")
    con = sqlite3.connect("database.db")
    con.row_factory = sqlite3.Row

    cur = con.cursor()
    cur.execute("SELECT rowid, * FROM students")

    rows = cur.fetchall()
    students_list = [{'name': row['name'], 'id': row['id'], 'points': row['points']} for row in rows]
    con.close()
    # Send the results of the SELECT to the list.html page
    return jsonify(students_list)

if __name__ == "__main__":
    app.run(debug=True)