

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net"

export const getCandidateByEmail = async (email)=>{
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`)
    if(!response.ok){
        throw new Error(`Failed to fetch candidate`)
    }
    const data = response.json()
    return data
}

export const getAllJobsPositions = async ()=>{
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`)
    if(!response.ok){
        throw new Error('Failed to fetch all candidates')
    }
    const data = response.json()
    return data
}

export const applyToJob = async ({uuid, candidateId, jobId, applicationId, repoUrl})=>{
   const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        uuid,
        jobId,
        candidateId,
        applicationId,
        repoUrl
    })
   })
   if(!response.ok){
    throw new Error('Failed to apply to job')
   }
   return await response.json()
}