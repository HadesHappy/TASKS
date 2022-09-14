##I used node.js for designing backend apis and used python for command instructions.
##And for unit test, jest is used.
How to run the project
1. Type npm install to download node modules.

2. Type npm start to run the server.

3. Download and Install Python3

4. Following are the example scripts for CRUD operation

    # To add task:
        python script.py add --title "This is title" --expire-on "2022-09-13"

    # To list all tasks:
        python script.py list
    # To get one task with specific id:
        python script.py list --task-id 632012c8162ca329b4194adb
    
    # To Update a task with specific id:
        python script.py update --task-id 632012c8162ca329b4194adb --title "Updated Title" --expire-on "2022-08-01"
    
    # To Delete a task with specific id:
        python script.py delete --task-id 632012c8162ca329b4194adb
        
 5. For unit test, type npm test.
 
 Thanks.
