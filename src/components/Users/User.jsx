import React from 'react'
import { Form } from 'react-bootstrap'

const User = (props) => {

    const checkUser = (check) => {
        props.onSetCheckUser(props.id, check) 
    }

    let regDate = props.regDate.slice(0,10).split('-')
    regDate[2] = Number(regDate[2]) + 1
    if (regDate[2] < 10) regDate[2] = '0' + regDate[2]
    regDate = regDate.join('-')

    let logDate
    if (props.logDate !== '0000-00-00') {
        logDate = props.logDate.slice(0,10).split('-')
        logDate[2] = Number(logDate[2]) + 1
        if (logDate[2] < 10) logDate[2] = '0' + logDate[2]
        logDate = logDate.join('-')
    } else logDate = props.logDate

    return (
        <tr>
            <th className='text-center'>
                <Form.Check 
                    type='checkbox'
                    checked={ props.checkedUsers.includes(props.id) }
                    onChange={(e) => checkUser(e.target.checked)}
                />
            </th>
            <th className='text-center'>
                {props.id}
            </th>
            <th className={
                props.login === localStorage.login
                    ? 'text-primary'
                    : ''
            }>
                {props.email}
            </th>
            <th className={
                props.login === localStorage.login
                    ? 'text-primary'
                    : ''
            }>
                {props.login}
            </th>
            <th className={
                props.login === localStorage.login
                    ? 'text-primary'
                    : ''
            }>
                { regDate }
            </th>
            <th className={
                props.login === localStorage.login
                    ? 'text-primary'
                    : ''
            }>
                { logDate }
            </th>
            <th className={
                props.blocked === 0
                    ? 'text-success'
                    : 'text-danger'
            }>
                {props.blocked}
            </th>

        </tr>
    )
}

export default User