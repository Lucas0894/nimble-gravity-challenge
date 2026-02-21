import { JobItem } from "./JobItem"

export const JobList = ({jobs, candidate})=>{
    return (
        <>
          <div>
             {
                jobs.map((job)=>{
                    return <JobItem key={job.id} job={job} candidate={candidate} />
                })
             }
          </div>
        </>
    )
}