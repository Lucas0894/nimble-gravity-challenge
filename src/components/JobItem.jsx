import { useState } from "react"
import { applyToJob } from "../services/api"

export const JobItem = ({job, candidate})=>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [repoUrl, setRepoUrl] = useState("")
    const [message, setMessage] = useState(null)
    const [applied, setApplied] = useState(false)
    
    const handleSubmit = async ()=>{
        if(!repoUrl){
            setError("Repo URL is required")
            return
        }
        setLoading(true)
        setError(null)
        setMessage(null)
        try {
            const response = await applyToJob({
            uuid: candidate.uuid,
            jobId: job.id,
            candidateId: candidate.candidateId,
            applicationId: candidate.applicationId,
            repoUrl
        })
          if(response.ok){
            setApplied(true)
            setMessage("Application submitted successfully!")
          }    
        } catch (error) {
            setError("Error submitting application")
        } finally{
            setLoading(false)
        }
        
    }


    return (
        <>
           <div className="border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200">
              <h3 className="font-semibold text-center text-lg mb-3 text-gray-800">{job.title}</h3>
              <input className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2" value={repoUrl} type="text" placeholder="Github repo URL" onChange={(e)=>setRepoUrl(e.target.value)} />
              <button disabled={loading || applied} className={`w-full py-2 ${applied? "bg-green-600 cursor-not-allowed": loading? "disabled:bg-gray-400 cursor-not-allowed" : "bg-blue-600"} text-white rounded-md font-semibold hover:bg-blue-700 cursor-pointer transition `} onClick={handleSubmit}>{loading? "Submitting...": applied? "Applied": "Submit"}</button>
              {message && <p className="text-green-600 mt-2 text-sm">{message}</p>}
              {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
           </div>
        </>
    )
}