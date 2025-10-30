import { CalculatorData } from '@/types/calculator'
import * as fs from 'fs'
import * as path from 'path'

// Función para cargar dinámicamente solo las calculadoras generadas
export async function getGeneratedCalculators(): Promise<Record<string, CalculatorData>> {
  const calculatorsDir = path.join(process.cwd(), 'calculators-data')
  const calculators: Record<string, CalculatorData> = {}

  // Verificar si el directorio existe
  if (!fs.existsSync(calculatorsDir)) {
    return calculators
  }

  // Leer todos los archivos .ts en el directorio
  const files = fs.readdirSync(calculatorsDir).filter(file => file.endsWith('.ts'))

  for (const file of files) {
    const slug = file.replace('.ts', '')
    const filePath = path.join(calculatorsDir, file)

    try {
      // Leer el contenido del archivo para verificar que no es un template
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Solo incluir si no contiene "Pending OpenAI generation"
      if (!fileContent.includes('Pending OpenAI generation')) {
        // Importar dinámicamente
        const module = await import(`@/calculators-data/${slug}`)
        const calculatorData = module[`${slug.replace(/-/g, '')}CalculatorData`] || module.default

        if (calculatorData) {
          calculators[slug] = calculatorData
        }
      }
    } catch (error) {
      console.error(`Error loading calculator ${slug}:`, error)
    }
  }

  return calculators
}

// Función síncrona para obtener lista de slugs generados (para uso en componentes)
export function getGeneratedSlugs(): string[] {
  const calculatorsDir = path.join(process.cwd(), 'calculators-data')

  if (!fs.existsSync(calculatorsDir)) {
    return []
  }

  const files = fs.readdirSync(calculatorsDir).filter(file => file.endsWith('.ts'))
  const slugs: string[] = []

  for (const file of files) {
    const slug = file.replace('.ts', '')
    const filePath = path.join(calculatorsDir, file)

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Solo incluir si no contiene "Pending OpenAI generation"
      if (!fileContent.includes('Pending OpenAI generation')) {
        slugs.push(slug)
      }
    } catch (error) {
      console.error(`Error checking calculator ${slug}:`, error)
    }
  }

  return slugs
}

// Helper para cargar un solo calculator
export async function getCalculatorBySlug(slug: string): Promise<CalculatorData | null> {
  try {
    const module = await import(`@/calculators-data/${slug}`)
    const calculatorData = module[`${slug.replace(/-/g, '')}CalculatorData`] || module.default
    return calculatorData || null
  } catch (error) {
    return null
  }
}

// Get latest calculators (sorted by modification time)
export async function getLatestCalculators(limit: number = 5): Promise<Array<{ slug: string; title: string }>> {
  const calculatorsDir = path.join(process.cwd(), 'calculators-data')

  if (!fs.existsSync(calculatorsDir)) {
    return []
  }

  // Get files with their stats
  const files = fs.readdirSync(calculatorsDir)
    .filter(file => file.endsWith('.ts'))
    .map(file => {
      const filePath = path.join(calculatorsDir, file)
      const stats = fs.statSync(filePath)
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Skip if pending generation
      if (fileContent.includes('Pending OpenAI generation')) {
        return null
      }

      return {
        slug: file.replace('.ts', ''),
        mtime: stats.mtime.getTime(),
        filePath
      }
    })
    .filter(Boolean) as Array<{ slug: string; mtime: number; filePath: string }>

  // Sort by modification time (newest first)
  files.sort((a, b) => b.mtime - a.mtime)

  // Get titles for the latest calculators
  const result: Array<{ slug: string; title: string }> = []

  for (const file of files.slice(0, limit)) {
    try {
      const module = await import(`@/calculators-data/${file.slug}`)
      const calculatorData = module[`${file.slug.replace(/-/g, '')}CalculatorData`] || module.default

      if (calculatorData && calculatorData.metadata) {
        result.push({
          slug: file.slug,
          title: calculatorData.metadata.h2 || calculatorData.metadata.title || file.slug
        })
      }
    } catch (error) {
      console.error(`Error loading calculator ${file.slug}:`, error)
    }
  }

  return result
}
