
export const state = () => ({
  line: {
    pictureUrl: null,
    displayName: null,
    userId: null,
    // 'U933cc0e91e577c936856fac8f5612798'
  },
    dialog:{
        isShow:false,
        title:'',
        message:''
    },
    register:{
        firstname:'',
        lastname:'',
        email:'',
        phonenumber:'',
        yearclass:'',
        gender:'',
        studentID:'',
    },
    })

export const getters = {
    // getUser(state){
    //     return state.user  
    //   },
    getRegister(state){
        return state.register
      },
    getDialog(state){
        return state.dialog
      },
    getEvent(state){
        return state.data.event
      },
    // getAgenda(state){
    //     return state.data.agenda
    //   },
    // getSurvey(state){
    //     return state.survey
    //   },
    getLine(state){
        return state.line
      },
    
}

export const mutations = {
    SET_REGISTER(state, data){
        state.register = {
          ...state.register,
          ...data
        }
      },
    // SET_USER(state, data){
    //     state.user = {
    //         ...state.user,
    //         ...data
    //     }
    // },
    SET_DIALOG(state, data){
        state.dialog = {
            ...state.dialog,
            ...data
        }
    },
    // SET_SURVEY(state, data){
    //     state.survey = {
    //         ...state.survey,
    //         ...data
    //     }
    // },
    SET_LINE(state, data){
        state.line = {
            ...state.line,
            ...data
        }
    },   
}

export const actions = {
    // setUser({ commit }, data){
    //     commit('SET_USER', data)
    //     },
    setRegister({ commit }, data){
        commit('SET_REGISTER', data)
        },
    setDialog({ commit }, data){
        commit('SET_DIALOG', data)
        },
    // setSurvey({ commit }, data){
    //     commit('SET_SURVEY', data)
    //     },
    setLine({ commit }, data){
        commit('SET_LINE', data)
        },
}
