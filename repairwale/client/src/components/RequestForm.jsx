import React, { useState, useEffect } from 'react'

export default function RequestForm({ onSubmit, initialProblem = '', submitLabel = 'Create' }){
  const [problem, setProblem] = useState(initialProblem || '')

  useEffect(() => {
    // update local state when initialProblem changes (prefill from service booking)
    setProblem(initialProblem || '')
  }, [initialProblem])

  function submit(e){
    e.preventDefault()
    if (!problem.trim()) return alert('Describe the problem')
    onSubmit(problem.trim())
    setProblem('')
  }

  return (
    <form onSubmit={submit} style={{ display:'flex', gap:8, alignItems:'center' }}>
      <input value={problem} onChange={e => setProblem(e.target.value)} placeholder="Short problem description" style={{ flex:1, padding:10, borderRadius:8, border:'1px solid rgba(0,0,0,0.06)', background:'transparent', color:'inherit' }} />
      <button type="submit" style={{ padding:'10px 14px', borderRadius:8, border:0, background:'linear-gradient(90deg,#f5f5f5,#d9d9d9)', color:'#111', fontWeight:700 }}>{submitLabel}</button>
    </form>
  )
}
