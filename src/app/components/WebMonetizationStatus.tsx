'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock, Zap } from 'lucide-react'

declare global {
  interface Window {
    MonetizationEvent: any
  }
}

export default function WebMonetizationStatus() {
  const [monetizationState, setMonetizationState] = useState<'loading' | 'started' | 'stopped' | 'pending'>('loading')
  const [totalReceived, setTotalReceived] = useState(0)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if Web Monetization is supported
    const monetization = (document as any).monetization;
    if (monetization) {
      setIsSupported(true)
      
      // Listen for monetization events
      monetization.addEventListener('monetizationstart', () => {
        setMonetizationState('started')
      })

      monetization.addEventListener('monetizationpending', () => {
        setMonetizationState('pending')
      })

      monetization.addEventListener('monetizationprogress', (event: any) => {
        setTotalReceived(prev => prev + parseInt(event.detail.amount))
      })

      monetization.addEventListener('monetizationstop', () => {
        setMonetizationState('stopped')
      })

      // Set initial state
      setMonetizationState(monetization.state)
    } else {
      setIsSupported(false)
    }
  }, [])

  const getStatusIcon = () => {
    switch (monetizationState) {
      case 'started':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
      case 'stopped':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Zap className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusText = () => {
    if (!isSupported) {
      return 'Web Monetization is supported'
    }
    
    switch (monetizationState) {
      case 'started':
        return 'Receiving payments'
      case 'pending':
        return 'Connecting...'
      case 'stopped':
        return 'Payments stopped'
      default:
        return 'Checking status...'
    }
  }

  const getStatusColor = () => {
    if (!isSupported) return 'bg-gray-500/20 border-gray-500/30'
    
    switch (monetizationState) {
      case 'started':
        return 'bg-green-500/20 border-green-500/30'
      case 'pending':
        return 'bg-yellow-500/20 border-yellow-500/30'
      case 'stopped':
        return 'bg-red-500/20 border-red-500/30'
      default:
        return 'bg-gray-500/20 border-gray-500/30'
    }
  }

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor()}`}>
      {getStatusIcon()}
      <span className="text-sm text-white">{getStatusText()}</span>
      {monetizationState === 'started' && totalReceived > 0 && (
        <span className="text-xs text-gray-300">
          ({totalReceived} received)
        </span>
      )}
    </div>
  )
}