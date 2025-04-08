const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
    try {
        console.log('SignUp formData being sent:', formData);
        const res = await fetch(`${BASE_URL}/sign-up`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if(data.error) {
            throw new Error(data.error);
        }

        if(data.token) {
            localStorage.setItem('token', data.token);
            return JSON.parse(atob(data.token.split('.')[1])).payload;
        }

        throw new Error('Invalid response from server');
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

const signIn = async (formData) => {
    try {
        console.log('SignIn formData being sent:', formData);
        const res = await fetch(`${BASE_URL}/sign-in`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if(data.error) {
            throw new Error(data.error);
        }

        if(data.token) {
            localStorage.setItem('token', data.token);
            return JSON.parse(atob(data.token.split('.')[1])).payload
        }

        throw new Error('Invalid response from server');
    } catch (error) {
        console.error(error);
        throw new Error(error)
    }
};

export {
    signUp,
    signIn
};