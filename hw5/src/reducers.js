import * as Actions from './actions'

const Reducer = (state = {
    location : "signIn",
    errorMsg : "",
    successMsg: "",
    keyword: "",
    username: "",
    headline: "",
    avatar: "",
    zipcode: "",
    email: "",
    dob: "",
    flag: 1,
    followers: [],
    article : [],
    filteredArticles: []
}, action) => {
    switch (action.type) {
        case Actions.NAV_LANDING:
            return { ...state, location : "landing" }
        case Actions.NAV_MAIN:
            return { ...state, location : "main", flag: 1 }
        case Actions.NAV_PROFILE:
            return { ...state, location : "profile", flag: 0}
        case Actions.NAV_SIGNIN:
            return {...state, location : "signIn"}
        case Actions.NAV_SIGNUP:
            return {...state, location : "signUp"}
        case Actions.ERRORMSG:
            return {...state, errorMsg: action.errorMsg}
        case Actions.SUCCESSMSG:
            return {...state, successMsg: action.successMsg}
        /*case Actions.NEW_USER_INFO:
            return { ...state, location : "main", userinfo : action.info}
        case Actions.SUCCESS:
            return { ...state, successMsg : action.errorMessage, userinfo : action.info }*/
        case Actions.CLEAR_ERR:
            return { ...state, errorMsg : "" }
        case Actions.FILTER_KEYWORD:
            return {...state, keyword : action.keyword, filteredArticles: state.article.filter((a) => {return a.text.indexOf(action.keyword) > 0 || a.author == action.keyword})}
        case Actions.FETCH_FOLLOWERS:
            return {...state, followers: action.follower}
        case Actions.ADD_FOLLOWER:
            return {...state, 
                followers: [...state.followers,{name: action.name, avatar: action.avatar, headline: action.headline}], 
                article: [...state.article, action.articles], 
                article : state.article.sort(function(a, b) {
                    let x = new Date(a.date)
                    let y = new Date(b.date)
                    return ((x>y) ? -1 :((x<y)?1:0))
                })
            }
        case Actions.REMOVE_FOLLOWER:
            return {...state, followers: state.followers.filter((f) => {return f.name != action.username})}
        case Actions.FETCH_ARTICLES:
            return {...state, article: action.sortedArticles, filteredArticles: action.sortedArticles}
        case Actions.POST:
            return {...state, article: [...state.article, action._article]}
        case Actions.UPDATE_HEADLINE:
            return {...state, headline: action.text }
        case Actions.UPDATE_PROFILE:
            return {...state, successMsg: action.successMsg, email: action.email, zipcode: action.zipcode, password: action.password }
        default:
            return state
    }
}

export default Reducer