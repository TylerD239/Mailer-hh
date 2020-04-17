const handlers = {
    'SHOW_LOADER': (state) => ({...state, loading: true}),
    'ADD_MARK': (state, {mark, email}) => ({...state, marks: {...state.marks, [email]: mark}}),
    'CHANGE_GROUP': (state, {list, group}) => ({...state, list, group, loading: false}),
    'CHANGE_NAME': (state, {name, studentId}) => {
        console.log(1)
        state.list[studentId][0] = name
        return {...state}
    },
    'CHANGE_MAIL': (state, {email, studentId}) => {
        state.list[studentId][1] = email
        return {...state}
    },
    'DELETE_STUDENT': (state, {studentId}) => ({...state, list: state.list.filter((el,i) => (i !== studentId))}),
    'ADD_STUDENT': (state, {name, email}) => ({...state, list: [...state.list, [name, email]]}),
    'DELETE_MARK': (state, {email}) => {
        // console.log(email)
        delete state.marks[email]
        return {...state}
    },
    'CLEAR_MARKS': (state) => ({...state, marks: {}}),
    DEFAULT: state => state
}


export const StudentsReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}


