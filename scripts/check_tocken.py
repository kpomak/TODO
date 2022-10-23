import requests

response = requests.post("http://localhost:8000/api-token-auth/", data={"username": "user", "password": "admin"})
headers = {"Authorization": f'Token {response.json()["token"]}'}
print(headers)
response_users = requests.delete("http://localhost:8000/api/projects/2/", headers=headers)

print(response_users.json())
