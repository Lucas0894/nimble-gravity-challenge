import { useState, useEffect } from 'react'
import { getCandidateByEmail, getAllJobsPositions } from './services/api'
import { JobList } from './components/jobList'

function App() {
    const [candidate, setCandidate] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [jobs, setJobs] = useState([])

    const email = import.meta.env.VITE_CANDIDATE_EMAIL
    

    useEffect(()=>{
      const getCandidate = async ()=>{
        try {
          const data = await getCandidateByEmail(email)
          setCandidate(data)
        } catch (error) {
          setError("Error to fetching candidate")
        }finally{
          setLoading(false)
        }
      }
      getCandidate()
    },[])

    useEffect(()=>{
      const getJobsPositions = async ()=>{
        try {
          const data = await getAllJobsPositions()
          setJobs(data)
        } catch (error) {
          setError('Error to fetch all jobs positions')
        }finally{
          setLoading(false)
        }
      }
      getJobsPositions()
    },[])


  return (
    <>
       <div className='min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex justify-center items-center'>
        <div className='w-full max-w-2xl bg-white/80 backdrop-blur-md border border-white/40 p-10 rounded-3xl shadow-xl'>
           <h1 className='text-4xl bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 font-bold text-center'>
               Nimbre Gravity Challenge
           </h1>
           {loading && <p className='text-center'>Loading...</p>}
           {error && <p className='text-center text-red-600'>{error}</p>}
           {!loading && !error && <JobList jobs={jobs} candidate={candidate} />}
        </div>
       </div>    
    </>
  )
}

export default App
