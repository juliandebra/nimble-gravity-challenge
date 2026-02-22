import React from 'react'
import type { Candidate } from '../types'

interface CandidateCardProps {
  candidate: Candidate
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const initials =
    candidate.firstName.charAt(0).toUpperCase() +
    candidate.lastName.charAt(0).toUpperCase()

  return (
    <div className='bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/60 p-6 mb-10'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-5'>
        <div className='shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-blue-900/30'>
          {initials}
        </div>

        <div className='flex-1 min-w-0'>
          <p className='text-xs font-semibold uppercase tracking-widest text-slate-500 mb-0.5'>
            Candidate
          </p>
          <h2 className='text-xl font-bold text-white truncate'>
            {candidate.firstName} {candidate.lastName}
          </h2>
          <p className='text-sm text-slate-400 truncate'>{candidate.email}</p>
        </div>

        <div className='w-full sm:w-auto shrink-0 bg-slate-900/70 rounded-xl border border-slate-800 px-4 py-3'>
          <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1'>
            UUID
          </p>
          <code className='text-xs font-mono text-blue-400 break-all'>
            {candidate.uuid}
          </code>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
