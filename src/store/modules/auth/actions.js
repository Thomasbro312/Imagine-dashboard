
export default {
    // this registers a new account
    async register(context, payload){
        let url = 'http://localhost:8000/api/resource';

        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                name: payload.name,
                password: payload.password,
                phone_number: payload.phone_number,
                company_name: payload.company_name
            })
        });
    },
    // this logs you in through the api
    async login(context, payload) {
        const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        email: payload.email,
                        password: payload.password
                    }
                )
            }
        )
        if (!response.ok) {
            throw new Error('Login failed');
        }

        const responseData = await response.json();

        context.commit('setUser',{
            user: responseData.user,
        })
        context.commit('SetUser_id',{
            userId: responseData.user.user_id
        })
        context.commit('setRole',{
            role: responseData.user.role
        })
        context.commit('setToken',{
            token: responseData.token
        })
    },
    // this deletes the token, role and userid from local storage once you log out
    async logout(context){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user_id')

        this.token= null;

        context.commit('destroyToken',{
            token: null,
        })

    }
}