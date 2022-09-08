import { React, useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Container, Table } from 'react-bootstrap'
import * as Axios from 'axios'
import User from './User'
import UsersButtons from './UsersButtons'
import CheckboxAll from './CheckboxAll'

const Users = (props) => {
    
    const onGetUsersInfo = () => {
        Axios.get('http://localhost:3306/api/get')
        .then((response) => {
            if (props.allUsersInfo === '' || (JSON.stringify(props.allUsersInfo) !== JSON.stringify(response.data))) {
                console.log('updating users data')
                if (!!localStorage.login && (JSON.stringify(response.data.filter(el => el.login === localStorage.login)[0]) !== localStorage.userInfo)) {
                    props.onAdminYourself()
                }
                props.onGetUsersInfo(response.data)
                return 
            }
            console.log('no need to update data!')
        })
    }

    const [check, setCheck] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            onGetUsersInfo()
        }, 1000)
        return () => clearInterval(interval)
    })
    
    if (props.isLogged && !!props.allUsersInfo) {
        let renderUsers = props.allUsersInfo.map(el => <User 
            key = {el.id} 
            id = {el.id} 
            email = {el.email} 
            login = {el.login}
            logDate = {el.LogDate}
            regDate = {el.RegDate}
            blocked = {el.blocked} 
            onSetCheckUser = {props.onSetCheckUser}
            checkedUsers = {props.checkedUsers}
        />)

        return (
            <Container>
                <Table striped bordered hover responsive="lg" className='mt-5' variant={(props.theme) ? 'dark' : ''}>
                    <thead>
                        <tr>
                            <th className='text-center'>
                                <CheckboxAll
                                    check = { check }
                                    setCheck = { setCheck }
                                    allUsersInfo = {props.allUsersInfo}
                                    onCheckAll = {props.onCheckAll}
                                />
                            </th>
                            <th className='text-center'>
                                id
                            </th>
                            <th>
                                Email    
                            </th>
                            <th>
                                Login   
                            </th> 
                            <th>
                                Register Date
                            </th>
                            <th>
                                Login Date
                            </th>
                            <th>
                                Blocked 
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { renderUsers }
                    </tbody>
                </Table>
                <UsersButtons
                    checkedUsers = {props.checkedUsers}
                    onBlockUser = {props.onBlockUser}
                    onUnblockUser = {props.onUnblockUser}
                    onDeleteUser = {props.onDeleteUser}
                    setCheck = { setCheck }
                />
            </Container>
        )
    } else if (props.isLogged) {
        return (
            <Container>
                <Alert variant={'success'} className='mt-5 h-100 text-center'>
                    Loading for table info...
                </Alert>
            </Container>
        ) 
    }else return (
        <Container>
            <Alert variant={'danger'} className='mt-5 h-100 text-center'>
                YOU DON'T HAVE ACCESS TO THIS PAGE!!!
            </Alert>
        </Container>
    )
}

export default Users