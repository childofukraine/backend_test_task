# backend_test_task
# https://test-task-e0yj.onrender.com
# 
### [POST] /registration
#### body: JSON
```json
{
    "login": "test", // required
    "password": "test", // required
    "role": "Boss",   // required, allowed:  allowed: [ Administrator", "Boss", "Regular user"]
    "boss_id": "Gold" // optional,not for Administrator
}
```
#### To register a new user
# 
### [POST] /login
#### body: JSON
```json
{
    "login": "test", // required
    "password": "test", // required
}
```
#### To authenticate as user
# 
### [POST] /info
#### body: JSON
```json
{
    "login": "test", // required
}
```
#### You will get information about users depending on your role
# 
### [POST] /new-boss
#### body: JSON
```json
{
    "boss_login": "boss2", // required
    "user_login": "user", // required
    "new_boss_login": "boss" // required
}
```
#### You will change the user's boss

