import api from './client'
import type { Candidate, Job, ApplyPayload } from '../types'

export const getCandidateByEmail = async (
  email: string,
): Promise<Candidate> => {
  const response = await api.get<Candidate>(
    `/api/candidate/get-by-email?email=${email}`,
  )
  return response.data
}

export const getJobList = async (): Promise<Job[]> => {
  const response = await api.get<Job[]>('/api/jobs/get-list')
  return response.data
}

export const applyToJob = async (
  payload: ApplyPayload,
): Promise<{ ok: boolean }> => {
  const response = await api.post<{ ok: boolean }>(
    '/api/candidate/apply-to-job',
    payload,
  )
  return response.data
}
