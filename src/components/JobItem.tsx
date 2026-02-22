import React, { useState } from 'react'
import type { Job, Candidate, ApplyPayload } from '../types'
import { applyToJob } from '../api/services'

interface JobItemProps {
  job: Job
  candidate: Candidate
}

const JobItem: React.FC<JobItemProps> = ({ job, candidate }) => {
  const [repoUrl, setRepoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!repoUrl) {
      setError('GitHub URL is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const payload: ApplyPayload = {
        uuid: candidate.uuid,
        candidateId: candidate.candidateId,
        jobId: job.id,
        repoUrl,
      }

      const response = await applyToJob(payload)
      if (response.ok) {
        setSuccess(true)
      } else {
        setError('Failed to apply. Please try again.')
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'An error occurred while applying.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className='group relative bg-slate-800/40 border border-emerald-500/40 rounded-2xl p-6 flex flex-col gap-3 shadow-lg shadow-emerald-900/10'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0'>
            <svg
              className='w-4 h-4 text-emerald-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2.5}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <div>
            <h3 className='font-semibold text-white text-sm'>{job.title}</h3>
            <p className='text-emerald-400 text-xs font-medium mt-0.5'>
              Application submitted!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='group relative bg-slate-800/40 border border-slate-700/60 hover:border-blue-500/40 rounded-2xl p-6 flex flex-col gap-4 shadow-lg transition-all duration-300'>
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/0 to-violet-600/0 group-hover:from-blue-600/5 group-hover:to-violet-600/5 transition-all duration-300 pointer-events-none' />

      <div className='flex items-start justify-between gap-3'>
        <div>
          <span className='inline-block text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1.5'>
            Open Position
          </span>
          <h3 className='text-base font-bold text-white leading-snug'>
            {job.title}
          </h3>
        </div>
        <span className='shrink-0 mt-1 inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold uppercase tracking-widest rounded-full px-2.5 py-1'>
          <span className='w-1 h-1 rounded-full bg-emerald-400' />
          Active
        </span>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <div>
          <label
            htmlFor={`repo-${job.id}`}
            className='block text-xs font-semibold text-slate-400 mb-1.5'
          >
            GitHub Repository URL
          </label>
          <input
            id={`repo-${job.id}`}
            type='url'
            value={repoUrl}
            onChange={e => setRepoUrl(e.target.value)}
            placeholder='https://github.com/user/repo'
            className='w-full bg-slate-900/70 border border-slate-700/80 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all'
            required
          />
        </div>

        {error && (
          <p className='text-xs text-rose-400 flex items-center gap-1.5'>
            <svg
              className='w-3.5 h-3.5 shrink-0'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
              />
            </svg>
            {error}
          </p>
        )}

        <button
          type='submit'
          disabled={loading}
          className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2
            ${
              loading
                ? 'bg-slate-700 cursor-not-allowed opacity-60'
                : 'bg-blue-600 hover:bg-blue-500 active:scale-[0.98] shadow-md shadow-blue-900/30'
            }`}
        >
          {loading ? (
            <>
              <svg
                className='animate-spin w-4 h-4'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
              Submitting...
            </>
          ) : (
            'Apply Now'
          )}
        </button>
      </form>
    </div>
  )
}

export default JobItem
