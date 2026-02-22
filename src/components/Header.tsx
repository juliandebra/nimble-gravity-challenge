import React from 'react'

const Header: React.FC = () => {
  return (
    <header className='relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-b from-blue-600/10 via-violet-600/5 to-transparent pointer-events-none' />
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none' />

      <div className='relative z-10 max-w-5xl mx-auto px-6 pt-14 pb-10 text-center'>
        <div className='inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6'>
          <span className='w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse' />
          <span className='text-xs font-semibold tracking-widest text-blue-400 uppercase'>
            We&apos;re Hiring
          </span>
        </div>

        <h1 className='text-5xl md:text-6xl font-extrabold tracking-tight mb-4'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400'>
            Nimble Gravity
          </span>
        </h1>

        <p className='text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed'>
          Join our team of engineering experts and help us build the next
          generation of data&#8209;driven products.
        </p>

        <div className='mt-8 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-slate-700 to-transparent' />
      </div>
    </header>
  )
}

export default Header
