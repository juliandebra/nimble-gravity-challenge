import { useEffect, useState } from 'react'
import type { Candidate } from './types'
import { getCandidateByEmail } from './api/services'
import Header from './components/Header'
import CandidateCard from './components/CandidateCard'
import JobList from './components/JobList'

function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const data = await getCandidateByEmail(
          import.meta.env.VITE_CANDIDATE_EMAIL,
        )
        setCandidate(data)
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            'Failed to load candidate information.',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCandidate()
  }, [])

  return (
    <div className='min-h-screen bg-[#0f172a] text-slate-200'>
      <Header />

      <main className='max-w-5xl mx-auto px-6 pb-24'>
        {loading ? (
          <div className='flex flex-col items-center justify-center py-24 gap-4'>
            <div className='w-10 h-10 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin' />
            <p className='text-sm text-slate-500 animate-pulse'>
              Loading your profile...
            </p>
          </div>
        ) : error ? (
          <div className='max-w-md mx-auto mt-16 bg-rose-500/5 border border-rose-500/20 rounded-2xl p-8 text-center'>
            <div className='w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-4'>
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
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </div>
            <h3 className='text-base font-semibold text-white mb-1'>
              Could not load profile
            </h3>
            <p className='text-sm text-slate-400 mb-5'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-5 py-2 rounded-xl transition-all'
            >
              Retry
            </button>
          </div>
        ) : candidate ? (
          <div>
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <span className='text-xs font-bold uppercase tracking-widest text-slate-500'>
                  Your Profile
                </span>
                <div className='flex-1 h-px bg-slate-800' />
              </div>
              <CandidateCard candidate={candidate} />
            </section>

            <section>
              <div className='flex items-center gap-3 mb-6'>
                <span className='text-xs font-bold uppercase tracking-widest text-slate-500'>
                  Open Positions
                </span>
                <div className='flex-1 h-px bg-slate-800' />
              </div>
              <JobList candidate={candidate} />
            </section>
          </div>
        ) : null}
      </main>

      <footer className='border-t border-slate-800/60 py-8 text-center'>
        <p className='text-xs text-slate-600'>
          &copy; {new Date().getFullYear()} Nimble Gravity &mdash; Engineering
          Excellence
        </p>
      </footer>
    </div>
  )
}

export default App
