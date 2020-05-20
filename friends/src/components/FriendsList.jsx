import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const FriendsList = props => {

    const [friends, setFriends] = useState([])
    const [newFriend, setNewFriend] = useState({
        name: "",
        email: "",
        age: 0,
        id: 0
    })

    useEffect(() => {
        getFriends()
    }, [])

    const getFriends = () => {
        axiosWithAuth()
            .get("/api/friends")
            .then(res => {
                setFriends(res.data)
            })
    }

    const handleChange = e => {
        setNewFriend({
            ...newFriend,
            [e.target.name]: e.target.value
        })
    }

    const addFriend = e => {
        e.preventDefault()
        const notAString = Number(newFriend.id)
        setNewFriend({ ...newFriend, id: notAString })
        axiosWithAuth()
            .post("/api/friends", newFriend)
            .then(res => setFriends(res.data))
    }

    const removeFriend = e => {
        console.log(e.target.id)
        const friendId = Number(e.target.id)
        axiosWithAuth()
            .delete(`/api/friends/${friendId}`)
            .then(res => setFriends(res.data))
    }

    return (
        <>
            <form onSubmit={addFriend}>
                <input
                    type="text"
                    name="name"
                    value={newFriend.name}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="age"
                    value={newFriend.age}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    value={newFriend.email}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="id"
                    value={newFriend.id}
                    onChange={handleChange}
                />
                <button>Add Friend</button>
            </form>
            {friends.map(friend => {
                return (
                    <>
                        <h1>{friend.name}</h1>
                        <h2>{friend.email}</h2>
                        <h2>{friend.age}</h2>
                        <button id={friend.id} onClick={removeFriend}>Remove</button>
                    </>
                )
            })}
        </>
    )
}

export default FriendsList