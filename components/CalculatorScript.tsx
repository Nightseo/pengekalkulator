'use client'

import { useEffect, useRef } from 'react'

interface CalculatorScriptProps {
  logic: string
  styles?: string
}

export default function CalculatorScript({ logic, styles }: CalculatorScriptProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    // Execute the calculator logic by injecting a script tag
    if (logic) {
      try {
        // Wrap the logic to add scroll functionality after results are shown
        const wrappedLogic = `
          ${logic}

          // Add auto-scroll functionality to results
          (function() {
            // Find the style.display setter and wrap it
            const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style');

            // Use MutationObserver to detect when results are shown
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                  const target = mutation.target;
                  if (target.id && (target.id.includes('result') || target.id.includes('resultat')) &&
                      target.style.display === 'block') {
                    // Scroll to results with smooth behavior
                    setTimeout(() => {
                      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                  }
                }
              });
            });

            // Observe all elements with result-related IDs
            setTimeout(() => {
              const resultElements = document.querySelectorAll('[id*="result"], [id*="resultat"]');
              resultElements.forEach(el => {
                observer.observe(el, { attributes: true, attributeFilter: ['style'] });
              });
            }, 500);
          })();
        `;

        // Create a script element
        const script = document.createElement('script')
        script.textContent = wrappedLogic
        script.type = 'text/javascript'

        // Append to document head or body
        document.body.appendChild(script)
        scriptRef.current = script
      } catch (error) {
        console.error('Error executing calculator logic:', error)
      }
    }

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current)
      }
    }
  }, [logic])

  return (
    <>
      {styles && <style dangerouslySetInnerHTML={{ __html: styles }} />}
    </>
  )
}
