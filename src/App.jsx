import { useEffect, useState } from "react"
import { Routes, Route, Link } from 'react-router-dom'
function App() {
  const [list,setList]=useState("")
  const [task,setTask]=useState((JSON.parse(localStorage.getItem('data'))) || [])
  const submitHandler=(e)=>{
    e.preventDefault()
    setTask([...task,{list}])  //...will keep the previous values
    setList("") 
    console.log(task)
  }
  let renderTask=task.map((t,i)=>{
    return (
    <li key={i} className="flex justify-between my-4 items-center">
        <h1>{i+1}</h1>
        <h1>{t.list}</h1>
        <button className="text-white bg-black rounded-3xl px-3 py-2" onClick={()=>{
          let arr=[...task]
          arr.splice(i,1)
          setTask(arr)
        }}>Delete</button>
    </li>
    )
  })
 useEffect(()=>{
    //localStorage.clear()
    localStorage.setItem('data',JSON.stringify(task))
    console.log(JSON.stringify(task))
    //console.log(JSON.parse(localStorage.getItem('data')))
 },[task])
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