import axios from "axios"
import { useEffect, useState } from "react"
import { Routes, Route, Link } from 'react-router-dom'
function App() {

  const [list,setList]=useState("")
  const [task,setTask]=useState([])

  useEffect(()=>{
    axios.get('/api/to_do_list')
    .then((res)=>setTask(res.data))
    .catch((err)=>console.log(err))
  },[task],[list])

  const submitHandler=(e)=>{
    e.preventDefault()
    if(list.length>0){
      axios.post('/api/to_do_list',{list})
    .then((res)=>{
      console.log(res)
      setList("")
    })
    .catch((err)=>console.log(err))
    }
  }
  const onDelete=(index)=>{
    const taskId=task[index]._id
    axios.delete(`/api/to_do_list/${taskId}`)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }
  let renderTask=task.map((t,i)=>{
    return (
    <li key={i} className="flex justify-between my-4 items-center">
        <h1>{i+1}</h1>
        <h1>{t.task}</h1>
        <button className="text-white bg-black rounded-3xl px-3 py-2" onClick={()=>onDelete(i)}>Delete</button>
    </li>
    )
  })
  return (
    <>
    <Routes>
      <Route path="/" element={<>
      <h1 className="bg-black text-blue-300 px-2 py-3 text-center text-5xl">Yuvraj's To Do List</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 '>
        <form onSubmit={submitHandler} className="flex ">
          <input type="text" className="rounded-3xl w-full px-3 py-2 text-xl border-zinc-700 border-2" placeholder="Enter Your Task..." value={list} onChange={(e)=>setList(e.target.value)}/>
          <button className="bg-black text-white px-4 py-2 text-xl font-bold rounded-3xl">ADD</button>
        </form>
        <hr />
        <div className="text-center p-8 w-full">
          <ul>
          {task.length>0?renderTask:<h2>No Tasks Available</h2>}
          </ul>
        </div>
      </div>
      </>
      }>
      </Route>
    </Routes>
    </>
  )
}

export default App
