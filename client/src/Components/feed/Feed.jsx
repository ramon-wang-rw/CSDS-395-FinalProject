import "./feed.css";
import Write from "../write/Write"
import React, {useEffect, useState, useReducer} from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Container, Button, Form, Card, Modal, Table} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';



export default function Feed() {
  const [posts, setPosts] = useState([])

  const [workid, setWorkid] = useState('')
  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState([])
  const [showWork, setShowWork] = useState(false)

  function handleCloseW() {
    setShowWork(false)
  }

  function refresh(newPost) {
    console.log('reached')
    if(posts === undefined) {
      setPosts([newPost])
    }
    else {
        setPosts(prevState => [newPost, ...prevState]);
    }
  }


  async function populateFeed() {
    console.log('reached')
    const req = await fetch('http://localhost:5000/api/getPosts', {
			headers: {
				'username': localStorage.getItem('username'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
            setPosts(data.posts)
		} else {
			alert(data.error)
		}
        return;
  }

  async function viewWorkout(id) {
    setWorkid(id)
    const req = await fetch('http://localhost:5000/workouts/' + id, {
			headers: {
				'username': localStorage.getItem('username'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
            setExercises(data.exercises[0])
            setWorkoutName(data.exercises[1][0].name)
            setShowWork(true)
		} else {
			alert(data.error)
		}

  }

  async function addWorkout(event) {
    event.preventDefault();
    const username = localStorage.getItem('username')
    const id = uuidv4();
    const response = await fetch('http://localhost:5000/workouts/create', {
        method:'POST',
        headers: {
    'Content-Type': 'application/json',
            'username': username,
            
  },
        body: JSON.stringify({
            name: workoutName,
            day: '',
            id: id
        }),
    })
    const data = await response.json()

    if(data.status === 'error') {
        console.log('reached')
    }
    else {
        console.log('tes')
        alert('Workout added')
        anotherFunction(id, username)
    }

}

async function anotherFunction(id, username) {
        let eId = uuidv4(); //fix so that it doesnt have duplicate eid
        const promises = exercises.map(e => (
            eId = uuidv4(),
            fetch('http://localhost:5000/api/addSet', {
              method:'POST',
              headers: {
          'Content-Type': 'application/json',
                  'username': username,
                  
        },
              body: JSON.stringify({
                  workoutId: id,
                  moveName: e.move_name,
                  set: e.repetition,
                  rep: e.rep_count,
                  set_id: eId,
                  setNum: -1
              }),
          })
        ))
        
        const results = await Promise.all(promises)
  return;
}

    useEffect(() => {
      const username = localStorage.getItem('username')
      populateFeed();
      return;
  }, [])

  return (
    <div className="feed">
        <div className="feedWrapper">
            <Write refresh={refresh}/>
        </div>
        {posts.map(d => (
          <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <img
                  className="postProfileImg"
                  src ="/assets/person.jpg"
                  alt=""
                />
                <span className="postUsername">
                  {d.user_name}
                </span>
                <span className="postDate">{d.created_at}</span>
              </div>
              {/* <div className="postTopRight">
                <MoreVert />
              </div> */}
            </div>
            <div className="postCenter">
              <span className="postText">{d.message}</span>
              {d.workout_id != null && 
              <>
              <br />
              <br />
            <Button onClick={() => viewWorkout(d.workout_id)}>View Workout</Button>
            <Modal show={showWork} onHide={handleCloseW}>
                    <Modal.Header closeButton>
                    <Modal.Title>{workoutName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Exercise Name</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        </tr>
                    </thead>
                    <tbody>    
                    {exercises.map(f => (
                        <tr>
                        <td>{f.move_name}</td>
                        <td>{f.repetition}</td>
                        <td>{f.rep_count}</td>
                        </tr>
                    ))}
                    </tbody>
                    </Table>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={addWorkout}>
                        Add Workout
                    </Button>

                    <Button variant="secondary" onClick={handleCloseW}>
                        Close
                    </Button>
                    
                    </Modal.Footer>
            </Modal>
            </>

              }
            </div>
            {/* <div className="postBottom">
              <div className="postBottomLeft">
                <img className="likeIcon" src="assets/like.png"  alt="" />
                <span className="postLikeCounter">{like} people like it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
              </div>
            </div> */}
          </div>
        </div>

        ))}
    </div>
  )
}
