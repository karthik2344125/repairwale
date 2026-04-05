import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../shared/context/AuthContext'
import Button from '../../shared/components/Button'

const CURRENT_JOB_KEY = 'rw_mechanic_current_job'
const ORDER_HISTORY_KEY = 'rw_mechanic_order_history'
const DEMO_REQUESTS_KEY = 'rw_demo_mechanic_requests'
const DEMO_MODE_KEY = 'rw_demo_mode'

const workflowSteps = {
  travel_to_customer: {
    label: 'Travel to customer',
    progress: 25,
    description: 'Open maps and drive to the customer location.'
  },
  arrived: {
    label: 'Arrived at location',
    progress: 50,
    description: 'Notify the customer that you have reached.'
  },
  working: {
    label: 'Work in progress',
    progress: 80,
    description: 'Share live progress while completing the repair.'
  },
  completed: {
    label: 'Job completed',
    progress: 100,
    description: 'Close the job and confirm service completion.'
  }
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

function buildMapsUrl(locationText) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText || '')}`
}

function getWorkflowStage(job) {
  return workflowSteps[job?.workflowStage] || workflowSteps.travel_to_customer
}

export default function MechanicJobPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { requestId } = useParams()
  const { user } = useAuth()
  const [job, setJob] = useState(null)

  useEffect(() => {
    const stateJob = location.state?.request
    const storedJob = readJson(CURRENT_JOB_KEY, null)
    const demoRequests = readJson(DEMO_REQUESTS_KEY, [])
    const history = readJson(ORDER_HISTORY_KEY, [])

    const nextJob =
      stateJob?.id === requestId ? stateJob :
      storedJob?.id === requestId ? storedJob :
      demoRequests.find((item) => item.id === requestId) ||
      history.find((item) => item.id === requestId) ||
      null

    if (nextJob) {
      setJob(nextJob)
      writeJson(CURRENT_JOB_KEY, nextJob)
    }
  }, [location.state, requestId])

  const persistJob = (nextJob) => {
    setJob(nextJob)
    writeJson(CURRENT_JOB_KEY, nextJob)

    const isDemoMode = localStorage.getItem(DEMO_MODE_KEY) === 'mechanic'
    if (isDemoMode) {
      const demoRequests = readJson(DEMO_REQUESTS_KEY, [])
      const nextRequests = demoRequests
        .map((item) => item.id === nextJob.id ? nextJob : item)
        .filter((item) => item.id !== nextJob.id || nextJob.status !== 'completed')
      writeJson(DEMO_REQUESTS_KEY, nextRequests)
    }

    if (nextJob.status === 'completed') {
      const history = readJson(ORDER_HISTORY_KEY, [])
      writeJson(ORDER_HISTORY_KEY, [
        { ...nextJob, completedAt: Date.now() },
        ...history.filter((item) => item.id !== nextJob.id)
      ])
      try {
        localStorage.removeItem(CURRENT_JOB_KEY)
      } catch {}
    }
  }

  const updateStage = (workflowStage) => {
    if (!job) return
    const nextStep = workflowSteps[workflowStage] || workflowSteps.travel_to_customer
    persistJob({
      ...job,
      workflowStage,
      status: workflowStage === 'completed' ? 'completed' : 'active',
      progress: nextStep.progress,
      progressUpdatedAt: Date.now()
    })
  }

  if (!job) {
    return (
      <div className="mechanic-job-page">
        <style>{styles}</style>
        <div className="job-shell">
          <div className="job-panel">
            <div className="job-title">Job not found</div>
            <p className="job-text">The accepted job details are not available yet.</p>
            <Button onClick={() => navigate('/mechanic/dashboard')}>Back to Dashboard</Button>
          </div>
        </div>
      </div>
    )
  }

  const step = getWorkflowStage(job)

  return (
    <div className="mechanic-job-page">
      <style>{styles}</style>
      <div className="job-shell">
        <div className="job-topbar">
          <div>
            <div className="job-eyebrow">Accepted Job</div>
            <h1 className="job-title">{job.customerName}</h1>
            <p className="job-text">Use maps to travel, then keep updating progress in real time.</p>
          </div>
          <div className="job-top-actions">
            <Button variant="ghost" onClick={() => navigate('/mechanic/dashboard')}>Dashboard</Button>
            <Button variant="ghost" onClick={() => navigate('/mechanic/profile')}>Profile</Button>
            <Button variant="ghost" onClick={() => navigate('/mechanic/order-history')}>Old Orders</Button>
          </div>
        </div>

        <div className="job-grid">
          <div className="job-panel">
            <div className="job-section-title">Customer Details</div>
            <div className="detail-row"><span>Customer</span><strong>{job.customerName}</strong></div>
            <div className="detail-row"><span>Phone</span><strong>{job.customerPhone || 'Not shared yet'}</strong></div>
            <div className="detail-row"><span>Location</span><strong>{job.location}</strong></div>
            <div className="detail-row"><span>Problem</span><strong>{job.problem}</strong></div>
            <div className="detail-row"><span>Status</span><strong>{step.label}</strong></div>
          </div>

          <div className="job-panel">
            <div className="job-section-title">Travel & Progress</div>
            <div className="progress-summary">
              <span>{step.progress}%</span>
              <span>{step.description}</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${step.progress}%` }} /></div>
            <div className="job-actions">
              <Button variant="ghost" onClick={() => window.open(buildMapsUrl(job.location), '_blank', 'noopener,noreferrer')}>Open Maps</Button>
              <Button variant="ghost" onClick={() => updateStage('arrived')}>Arrived</Button>
              <Button variant="ghost" onClick={() => updateStage('working')}>Start Work</Button>
              <Button onClick={() => updateStage('completed')}>Complete Job</Button>
            </div>
          </div>
        </div>

        <div className="job-panel">
          <div className="job-section-title">What happens next</div>
          <div className="timeline-grid">
            {Object.entries(workflowSteps).map(([key, item]) => (
              <div key={key} className={`timeline-item ${job.workflowStage === key || (!job.workflowStage && key === 'travel_to_customer') ? 'is-active' : ''}`}>
                <div className="timeline-label">{item.label}</div>
                <div className="timeline-desc">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="job-panel compact-note">
          <strong>Mechanic</strong> {user?.fullName || 'account'} is handling this job.
        </div>
      </div>
    </div>
  )
}

const styles = `
.mechanic-job-page {
  min-height: 100vh;
  background: #0b1220;
  color: #e2e8f0;
  padding: 20px;
}

.job-shell {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 16px;
}

.job-topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.job-eyebrow {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

.job-title {
  margin: 4px 0 6px;
  font-size: 28px;
}

.job-text {
  margin: 0;
  color: #94a3b8;
}

.job-top-actions,
.job-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.job-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.job-panel {
  background: #0f172a;
  border: 1px solid #233248;
  padding: 16px;
}

.job-section-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid #233248;
  font-size: 13px;
}

.detail-row:first-of-type {
  border-top: 0;
}

.detail-row span {
  color: #94a3b8;
}

.detail-row strong {
  color: #e2e8f0;
  text-align: right;
}

.progress-summary {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: #cbd5e1;
  font-size: 12px;
  margin-bottom: 8px;
}

.progress-bar {
  height: 8px;
  background: #1e293b;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #94a3b8;
}

.timeline-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.timeline-item {
  border: 1px solid #233248;
  padding: 12px;
  background: #0b1220;
}

.timeline-item.is-active {
  border-color: #475569;
}

.timeline-label {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
}

.timeline-desc {
  font-size: 12px;
  color: #94a3b8;
}

.compact-note {
  color: #cbd5e1;
}

@media (max-width: 800px) {
  .job-grid,
  .timeline-grid {
    grid-template-columns: 1fr;
  }

  .job-title {
    font-size: 24px;
  }
}
`
