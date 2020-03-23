

## Notes on Auth ## 
Accessing User: localStorage.user_id from anywhere...

* so fetch with user_id in the params 
* fetch(`http://localhost:3000/users/${localStorage.user_id}`)

* If there is no user_id it will break so you must account for that..
* we can do this by routing to login if no user has logged in (haven't done this yet)
* or checking if localStorage.user_id exists first before fetching.