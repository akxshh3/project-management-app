import requests

base_url = "http://127.0.0.1:5001/api"

# 1. Signup
res = requests.post(f"{base_url}/auth/signup", json={
    "username": "testuser22",
    "email": "test22@test.com",
    "password": "password"
})
print("Signup:", res.status_code, res.text)
if res.status_code == 201:
    token = res.json()["access_token"]
else:
    # try login
    res = requests.post(f"{base_url}/auth/login", json={
        "email": "test22@test.com",
        "password": "password"
    })
    print("Login:", res.status_code, res.text)
    token = res.json().get("access_token")

# 2. Add Project
if token:
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.post(f"{base_url}/projects", json={"title": "Test Proj", "description": "desc"}, headers=headers)
    print("Create project:", res.status_code, res.text)
