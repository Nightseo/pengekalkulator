'use client'

import { useEffect } from 'react'

interface CalculatorScriptProps {
  logic: string
  styles?: string
}

export default function CalculatorScript({ logic, styles }: CalculatorScriptProps) {
  useEffect(() => {
    // Execute the calculator logic
    if (logic) {
      try {
        // Create a function from the logic string and execute it
        const executeLogic = new Function(logic)
        executeLogic()
      } catch (error) {
        console.error('Error executing calculator logic:', error)
      }
    }

    // Cleanup function
    return () => {
      // Remove any event listeners or cleanup if needed
    }
  }, [logic])

  return (
    <>
      {styles && <style dangerouslySetInnerHTML={{ __html: styles }} />}
    </>
  )
}
