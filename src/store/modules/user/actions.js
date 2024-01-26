export default {
    async editUser(context, payload) {
        const apiKey = 'Help';
        const idp = this.$store.getters.user_id.userId
        try {
            const response = await fetch(`http://localhost:8000/api/users/${idp}`, {
                method: "PUT",
                body: JSON.stringify({
                    user_name: payload.user_name,
                    email: payload.email,
                    phone_number: payload.phone_number,
                    company_name: payload.company_name
                }),
                headers: {
                    'API-Key': apiKey,
                },
            })
            if (response.ok) {

            } else {
                throw new Error('Network response was not ok');
            }

        } catch (err) {
            console.error('Error editing resource:', err);
        }
    },
    async fetchUserById(context) {
        const apiKey = 'Help';
        const id = this.$store.getters.user_id.userId
        try {
            const response = await fetch(`http://localhost:8000/api/users/${id}`,{
                method: 'GET',
                headers: {
                    'API-Key': apiKey,
                },
            })
            const data = await response.json()
            this.users.user_name = data[0].user_name
            this.users.email = data[0].email
            this.users.phone_number = data[0].phone_number
            this.users.company_name = data[0].company_name

            context.commit('fetchUserById', response)
        } catch (error) {
            console.error('Error fetching resource data:', error);
        }
    }
}