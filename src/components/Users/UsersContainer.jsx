import Users from './Users'
import { connect } from 'react-redux'
import { getUsersInfoAC, setCheckUserAC, checkAllAC, blockUserAC, unblockUserAC, deleteUserAC } from '../../redux/Users-Reducer'
import { adminYourselfAC } from '../../redux/LogIn-Reducer'


let mapStateToProps = (state) => {
    return {
        isLogged: state.logInPage.isLogged,
        allUsersInfo: state.usersPage.allUsersInfo,
        checkedUsers: state.usersPage.checkedUsers,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onGetUsersInfo: (i) => dispatch(getUsersInfoAC(i)),
        onSetCheckUser: (id, check) => dispatch(setCheckUserAC(id, check)),
        onCheckAll: (info, all) => dispatch(checkAllAC(info, all)),
        onBlockUser: () => dispatch(blockUserAC()),
        onUnblockUser: () => dispatch(unblockUserAC()),
        onDeleteUser: () => dispatch(deleteUserAC()),
        onAdminYourself: () => dispatch(adminYourselfAC()),
    }
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer