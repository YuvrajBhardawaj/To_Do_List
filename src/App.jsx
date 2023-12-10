import { useEffect, useState } from "react"

function App() {
  const li=["Yuvraj","Mayank","Sanjay"]
  const [list,setList]=useState("")
  const [task,setTask]=useState([])
  const submitHandler=(e)=>{
    e.preventDefault()
    setTask([...task,{list}])  //...will keep the previous values
    setList("")
    console.log(task)
  }
 
  let renderTask=<h2>No Tasks Available</h2>
  renderTask=task.map((t,i)=>{
    return (
    <li key={i} className="flex justify-between">
      <h1>{i+1}</h1>
      <h1>{t.list}</h1>
      <button className="text-white bg-black rounded-3xl px-3 py-2" onClick={()=>task.splice(i,1)}>Delete</button>
    </li>
    
    )
  })
  useEffect(()=>{renderTask},[task])
  return (
    <>
      <h1 className="bg-black text-blue-300 px-2 py-3 text-center text-5xl">Yuvraj's To Do List</h1>
      <form onSubmit={submitHandler}>
        <input type="text" className="rounded-3xl px-3 py-2 text-xl border-zinc-700 border-2 m-5" placeholder="Enter Your Task..." value={list} onChange={(e)=>setList(e.target.value)}/>
        <button className="bg-black text-white px-4 py-2 text-xl font-bold rounded-3xl">ADD</button>
      </form>
      <hr />
      <div className="p-8">
        <ul>
         {renderTask}
        </ul>
      </div>
    </>
  )
}

export default App
