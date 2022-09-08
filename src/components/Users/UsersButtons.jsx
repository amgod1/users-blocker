import React from 'react'
import { Button } from 'react-bootstrap'

const UsersButtons = (props) => {

    const blockUser = () => {
        if (props.checkedUsers.length === 0) { alert('No user selected'); return }
        props.onBlockUser()
        props.setCheck(false)
    }

    const unblockUser = () => {
        if (props.checkedUsers.length === 0) { alert('No user selected'); return }
        props.onUnblockUser()
        props.setCheck(false)
    }

    const deleteUser = () => {
        if (props.checkedUsers.length === 0) { alert('No user selected'); return }
        props.onDeleteUser()
        props.setCheck(false)
    }

    return (
        <div>
            <Button variant='warning' onClick={ blockUser }>
                Block    
            </Button>
            <Button variant='success' onClick={ unblockUser } className='mx-2'>
                Unblock    
            </Button>
            <Button variant='danger' onClick={ deleteUser }>
                Delete    
            </Button>
        </div>
    )
}

export default UsersButtons