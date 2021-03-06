import React,{useState} from 'react'
import { useForm  } from "react-hook-form";

import {createLogEntry} from "./Api";

const LogEntryForm = ({location, onClose})=> {
    const [loading, setLoading] = useState(false)
    const [error, setError]= useState('')
    const { register, handleSubmit } = useForm();

    const onSubmit =async  (data)=>{
        try {
            setLoading(true)
            data.latitude = location.latitude
            data.longitude = location.longitude
            await createLogEntry(data)
            await onClose()
        } catch (error){
            setError(error.message)
            console.log(error);
            setLoading(false)
        }
    }

    return (
       <form className="entry-form" onSubmit={handleSubmit(onSubmit)} >
           { error ? <h3 className="error" >{error}</h3> : null}
           <label htmlFor="title" >Title</label>
           <input type="text" required  name="title" ref={register}  />
           
           <label htmlFor="comments">Comments</label>
           <textarea name="comments" rows={3}  ref={register}  ></textarea>
           
           <label htmlFor="description">Description</label>
           <textarea name="description" rows={3}  ref={register} ></textarea>
           
           <label htmlFor="image">Image</label>
           <input name="image"  ref={register} />
           
           <label htmlFor="visitDate">visit Date</label>
           <input name="visitDate" type="date" required   ref={register}  />
    <button disabled={loading} >{loading ? "Loading": "Create Log"}</button>
       </form>
    )
}

export default  LogEntryForm