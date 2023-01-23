const user =  {
    id: 1,
    email: 'test@example.com',
    password: 'password',
    role: 'admin',
    username: 'test',
}

const userWithoutPassword =  {
    id: 1,
    email: 'test@example.com',
    role: 'admin',
    username: 'test',
}

const login = {
    email: 'admin@admin.com',
    password: 'secret_admin',
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjc0NTA0OTg5LCJleHAiOjE2NzUxMDk3ODl9.cZCEpRsdIYf66760FtM4-ICXfWKC4YMgO7Y2W6bbASc';

export default { user, token, login, userWithoutPassword }