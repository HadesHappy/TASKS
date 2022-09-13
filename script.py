# Author: Hades
# Date: 2022-09-13
# Date Updated: 2022-09-13
# What: Script for RESTful API

import argparse
from dateutil.parser import parse
import sys
from urllib.parse import urlencode
from urllib.request import urlopen, Request
import json

ALLOWED_ACTIONS = ['add', 'list', 'update', 'delete']
API_ENDPOINT = 'http://localhost:4000/tasks'

parser = argparse.ArgumentParser(
    description="Script for RESTful API",
)

parser.add_argument("action", choices=ALLOWED_ACTIONS, help=f'Action Type. should be one of {ALLOWED_ACTIONS}')
parser.add_argument("--title", type=str, required=False, help="Title of the task")
parser.add_argument("--expire-on", type=str, required=False, help="Expiration Date of the task (Create ONLY)")
parser.add_argument("--expiring-today", type=bool, default=False, help="Whether to retrieve tasks which expire today (Retrieve ONLY)")
parser.add_argument("--task-id", type=str, required=False, help="Task Id (MongoDB ObjectId)")


args = parser.parse_args()
action = args.action
title = args.title
expire_on = args.expire_on
expiring_today = args.expiring_today
task_id = args.task_id


if action == 'add':
    if not title:
        sys.exit("Task must have a title")
    if not expire_on:
        sys.exit("Task must have Expiration Date")

    try:
        expire_on = parse(expire_on)
    except:
        sys.exit(f"Invalid Date Format: {expire_on}")
    
    post_data_json = {
        "title": title,
        "date": expire_on
    }
    post_data = urlencode(post_data_json).encode('ascii')

    try:
        with urlopen(f"{API_ENDPOINT}/create-task", post_data) as response:
            response_content = json.load(response)
            print(f"Successfully Created a Task\n {response_content}")
    except:
        sys.exit(f"Something went wrong during accessing API...")

elif action == "list":
    if task_id:
        try:
            with urlopen(f"{API_ENDPOINT}/get-task/{task_id}") as response:
                response_content = json.load(response)
                print(f"Successfully Retreived Task with id: {task_id}\n {response_content}")
        except:
            sys.exit(f"Could not find a task with id: {task_id}")
    elif not expiring_today:
        try:
            with urlopen(API_ENDPOINT) as response:
                response_content = json.load(response)
                print(f"Successfully Retreived Task List\n {response_content}")
        except:
            sys.exit(f"Something went wrong during accessing API...")
    else:
        sys.exit(f"expire on today")

elif action == "update":
    if not task_id:
        sys.exit("Task id required")
    if not title:
        sys.exit("Task must have a title")
    if not expire_on:
        sys.exit("Task must have Expiration Date")

    try:
        expire_on = parse(expire_on)
    except:
        sys.exit(f"Invalid Date Format: {expire_on}")
    data_json = {
        "title": title,
        "date": expire_on
    }
    data = urlencode(data_json).encode('ascii')

    try:
        req = Request(url=f"{API_ENDPOINT}/update-task/{task_id}", data=data, method='PUT')
        with urlopen(req) as response:
            response_content = json.load(response)
            print(f"Successfully Updated the Task with id: {task_id}")
    except:
        sys.exit(f"Could not find a task with id: {task_id}")

elif action == "delete":
    if not task_id:
        sys.exit("Task id required")
   
    try:
        req = Request(url=f"{API_ENDPOINT}/delete-task/{task_id}", method='DELETE')
        with urlopen(req) as response:
            response_content = json.load(response)
            print(f"Successfully Deleted the Task with id: {task_id}")
    except:
        sys.exit(f"Could not find a task with id: {task_id}")