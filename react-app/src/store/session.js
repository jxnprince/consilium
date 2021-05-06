// constants
const CREATE = "session/create";
const DESTROY = "session/destroy";

const createSession = (user) => ({
    type: CREATE,
    payload: user
})

const destroySession = () => ({
    type: DESTROY
})

// thunks
export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: { 'Content-Type': 'application/json' }
    });

    const user = await response.json();
    if (!user.errors) dispatch(createSession(user))
}


export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const user = await response.json();
        if (user.errors) {
        const err = new Error('Unauthorized');
        err.errors = user.errors
        throw err
    }
    dispatch(createSession(user));
    return {};
}


export const signUp = (firstName, lastName, email, password, superUser) => async (dispatch)=> {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            superUser
        }),
    });
    const user = await response.json();
        if (user.errors) {
        const err = new Error('Unauthorized');
        err.errors = user.errors
        throw err
    }
    dispatch(createSession(user));
}


export const logout = () => async (dispatch) => {
    await fetch("/api/auth/logout", {
        headers: { "Content-Type": "application/json" }
    });
    //FETCH WAS ASSIGNED TO RESPONSE VARIABLE
//     const data = await response.json();
//     console.log(data)
    dispatch(destroySession());
};

// reducer


// useSelector(state => state.session.user)

export default function reducer(
    state = { user: null, loaded: false }, action){
        switch (action.type) {
            case CREATE:
                return { ...state, user: action.payload, loaded: true };

            case DESTROY:
                return { ...state, user: null, loaded: true };

            default:
                return state;
        }
}
