import requests

data = {"username": "user", "password": "admin"}

# drf-token

response = requests.post("http://localhost:8000/api-token-auth/", data=data)
headers = {"Authorization": f'Token {response.json()["token"]}'}
print(headers)
response_users = requests.delete("http://localhost:8000/api/projects/2/", headers=headers)
print(response_users.json())


# simple-jwt-token

jwt = requests.post("http://localhost:8000/api-jwt/", data=data)
token = jwt.json()

jwt_headers = {"Authorization": f"Bearer {token['access']}"}
print(jwt_headers)

jwt_response = requests.delete("http://localhost:8000/api/todo/4/", headers=jwt_headers)
print(jwt_response.json())

version_headers = {"Accept": "application/json; version=ver_2.0"}
version_response = requests.get("http://localhost:8000/api/users/", headers={**jwt_headers, **version_headers})
print(version_response.json())

version_headers = {"Accept": "application/json; version=ver_3.0"}
version_response = requests.get("http://localhost:8000/api/users/", headers={**jwt_headers, **version_headers})
print(version_response.json())

jwt_data = {"refresh": f"{token['refresh']}"}
refresh_response = requests.post("http://localhost:8000/api-jwt/refresh/", data=jwt_data)
print(refresh_response.json())
