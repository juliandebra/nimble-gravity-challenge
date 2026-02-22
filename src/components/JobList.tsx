import React, { useEffect, useState } from 'react'
import type { Job, Candidate } from '../types'
import { getJobList } from '../api/services'
import JobItem from './JobItem'

interface JobListProps {
  candidate: Candidate
}

const SkeletonCard = () => (
  <div className='bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 animate-pulse'>
    <div className='h-3 w-20 bg-slate-700 rounded mb-3' />
    <div className='h-5 w-3/4 bg-slate-700 rounded mb-6' />
    <div className='h-3 w-28 bg-slate-700 rounded mb-2' />
    <div className='h-10 bg-slate-700 rounded-xl mb-3' />
    <div className='h-10 bg-slate-700/60 rounded-xl' />
  </div>
)

const JobList: React.FC<JobListProps> = ({ candidate }) => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getJobList()
      setJobs(data)
    } catch {
      setError('Could not load positions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center py-16 text-center'>
        <div className='w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-4'>
          <svg
            className='w-6 h-6 text-rose-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={1.5}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
            />
          </svg>
        </div>
        <p className='text-slate-400 text-sm mb-4'>{error}</p>
        <button
          onClick={fetchJobs}
          className='text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-5 py-2 rounded-xl transition-all'
        >
          Try Again
        </button>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 text-center'>
        <div className='w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4'>
          <svg
            className='w-6 h-6 text-slate-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={1.5}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V6a2.25 2.25 0 012.25-2.25h5.25'
            />
          </svg>
        </div>
        <p className='text-slate-400 text-sm'>
          No open positions at the moment.
        </p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      {jobs.map(job => (
        <JobItem key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  )
}

export default JobList
