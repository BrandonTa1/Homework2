import sqlite3

conn = sqlite3.connect('database.db')
print("Connected to database successfully")

conn.execute('CREATE TABLE user (userName TEXT, email TEXT, password TEXT)')
print("Created table user successfully!")




conn.close()
