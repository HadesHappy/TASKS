1. Download and Install Python3

2. Following are the example scripts for CRUD operation

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