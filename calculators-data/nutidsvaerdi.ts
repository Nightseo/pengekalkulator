import { CalculatorData } from '@/types/calculator'

/**
 * Calculadora: beregn nutidsværdi
 * Generado automáticamente con Claude API
 * Fecha: 2025-10-25T19:33:17.310Z
 */

export const nutidsvaerdiCalculatorData: CalculatorData = {
  slug: 'nutidsvaerdi',

  metadata: {
    title: "Nutidsværdi Kalkulator - Beregn Fremtidens Værdi Nu",
    description: "Find nutidsværdien af dine fremtidige pengestrømme med præcision. Opdag investeringsmuligheder og optimer din økonomi i dag.",
    excerpt: "Beregn nutidsværdi (NPV) af fremtidige pengestrømme for at vurdere, om en investering er rentabel. Indtast initial investering, diskonteringsrente og forventede pengestrømme.",
    canonical: 'https://pengekalkulator.com/beregn/nutidsvaerdi',
    keywords: ["beregn nutidsværdi"],
    category: "Investering & Opsparing",
    h1: "Beregn nutidsværdi",
    h2: "Nutidsværdi Kalkulator"
  },

  calculator: {
    html: "<div class=\"calc-container\">\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Initial investering (kr)</label>\n    <div class=\"calc-input-wrapper\">\n      <input type=\"number\" id=\"initialInvestment\" class=\"calc-input\" placeholder=\"100000\" step=\"1000\" value=\"100000\">\n      <span class=\"calc-input-suffix\">kr</span>\n    </div>\n    <small class=\"calc-help\">Det beløb du investerer i starten (normalt negativt)</small>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Diskonteringsrente (%)</label>\n    <div class=\"calc-input-wrapper\">\n      <input type=\"number\" id=\"discountRate\" class=\"calc-input\" placeholder=\"5\" step=\"0.1\" value=\"5\" min=\"0\" max=\"100\">\n      <span class=\"calc-input-suffix\">%</span>\n    </div>\n    <small class=\"calc-help\">Den årlige forrentningskrav eller WACC</small>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Antal år</label>\n    <input type=\"number\" id=\"numYears\" class=\"calc-input\" placeholder=\"5\" min=\"1\" max=\"50\" value=\"5\">\n    <small class=\"calc-help\">Investeringshorisont i antal år</small>\n  </div>\n\n  <div id=\"cashFlowsContainer\"></div>\n\n  <button class=\"calc-button\" id=\"calculateBtn\">Beregn nutidsværdi</button>\n  <button class=\"calc-button-secondary\" id=\"resetBtn\">Nulstil</button>\n\n  <div id=\"errorMessage\" class=\"calc-error\" style=\"display: none;\"></div>\n\n  <div id=\"resultContainer\" class=\"calc-result-container\" style=\"display: none;\">\n    <div class=\"calc-result-box\">\n      <div class=\"calc-result-label\">Nutidsværdi (NPV)</div>\n      <div class=\"calc-result-value\" id=\"npvResult\">0 kr</div>\n      <div class=\"calc-result-subtitle\" id=\"npvConclusion\"></div>\n    </div>\n\n    <div class=\"calc-breakdown\">\n      <h3 style=\"margin-top: 0; color: #2c3e50;\">Beregningsdetaljer</h3>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Initial investering:</span>\n        <span class=\"calc-breakdown-value\" id=\"initialInvestmentDisplay\">0 kr</span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Sum af diskonterede pengestrømme:</span>\n        <span class=\"calc-breakdown-value\" id=\"totalPvDisplay\">0 kr</span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Diskonteringsrente:</span>\n        <span class=\"calc-breakdown-value\" id=\"rateDisplay\">0%</span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Investeringsperiode:</span>\n        <span class=\"calc-breakdown-value\" id=\"periodDisplay\">0 år</span>\n      </div>\n    </div>\n\n    <div class=\"calc-breakdown\">\n      <h3 style=\"margin-top: 0; color: #2c3e50;\">Diskonterede pengestrømme pr. år</h3>\n      <div id=\"yearlyBreakdown\"></div>\n    </div>\n  </div>\n</div>",
    logic: "// Generér inputfelter for pengestrømme baseret på antal år\nfunction generateCashFlowInputs() {\n  const numYears = parseInt(document.getElementById('numYears').value) || 5;\n  const container = document.getElementById('cashFlowsContainer');\n  \n  if (numYears < 1 || numYears > 50) {\n    showError('Antal år skal være mellem 1 og 50');\n    return;\n  }\n  \n  container.innerHTML = '<h3 style=\"color: #2c3e50; margin-top: 1.5rem; margin-bottom: 1rem;\">Forventede pengestrømme</h3>';\n  \n  for (let i = 1; i <= numYears; i++) {\n    const defaultValue = i === 1 ? 30000 : (i === numYears ? 150000 : 30000);\n    const div = document.createElement('div');\n    div.className = 'calc-group';\n    div.innerHTML = `\n      <label class=\"calc-label\">År ${i} pengestrøm (kr)</label>\n      <div class=\"calc-input-wrapper\">\n        <input type=\"number\" id=\"cashFlow${i}\" class=\"calc-input\" placeholder=\"${defaultValue}\" step=\"1000\" value=\"${defaultValue}\">\n        <span class=\"calc-input-suffix\">kr</span>\n      </div>\n    `;\n    container.appendChild(div);\n  }\n}\n\n// Vis fejlmeddelelse\nfunction showError(message) {\n  const errorDiv = document.getElementById('errorMessage');\n  errorDiv.textContent = message;\n  errorDiv.style.display = 'block';\n  document.getElementById('resultContainer').style.display = 'none';\n}\n\n// Skjul fejlmeddelelse\nfunction hideError() {\n  document.getElementById('errorMessage').style.display = 'none';\n}\n\n// Formater tal i dansk format\nfunction formatCurrency(amount) {\n  return amount.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kr';\n}\n\nfunction formatNumber(num) {\n  return num.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });\n}\n\n// Beregn nutidsværdi\nfunction calculateNPV() {\n  hideError();\n  \n  const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);\n  const discountRate = parseFloat(document.getElementById('discountRate').value);\n  const numYears = parseInt(document.getElementById('numYears').value);\n  \n  // Validering\n  if (isNaN(initialInvestment) || isNaN(discountRate) || isNaN(numYears)) {\n    showError('Udfyld venligst alle felter med gyldige værdier');\n    return;\n  }\n  \n  if (numYears < 1 || numYears > 50) {\n    showError('Antal år skal være mellem 1 og 50');\n    return;\n  }\n  \n  if (discountRate < 0 || discountRate > 100) {\n    showError('Diskonteringsrente skal være mellem 0% og 100%');\n    return;\n  }\n  \n  // Hent alle pengestrømme\n  const cashFlows = [];\n  for (let i = 1; i <= numYears; i++) {\n    const cashFlow = parseFloat(document.getElementById(`cashFlow${i}`).value);\n    if (isNaN(cashFlow)) {\n      showError(`Udfyld venligst pengestrøm for år ${i}`);\n      return;\n    }\n    cashFlows.push(cashFlow);\n  }\n  \n  // Beregn NPV\n  const r = discountRate / 100;\n  let totalPV = 0;\n  const yearlyPV = [];\n  \n  for (let i = 0; i < cashFlows.length; i++) {\n    const year = i + 1;\n    const pv = cashFlows[i] / Math.pow(1 + r, year);\n    totalPV += pv;\n    yearlyPV.push({\n      year: year,\n      cashFlow: cashFlows[i],\n      pv: pv\n    });\n  }\n  \n  const npv = totalPV - initialInvestment;\n  \n  // Vis resultater\n  document.getElementById('npvResult').textContent = formatCurrency(npv);\n  \n  // Konklusion\n  let conclusion = '';\n  if (npv > 0) {\n    conclusion = '✓ Positiv NPV - Investeringen er rentabel';\n    document.getElementById('npvResult').style.color = '#27ae60';\n  } else if (npv < 0) {\n    conclusion = '✗ Negativ NPV - Investeringen er ikke rentabel';\n    document.getElementById('npvResult').style.color = '#e74c3c';\n  } else {\n    conclusion = 'NPV er nul - Investeringen giver præcis afkastet krævet';\n    document.getElementById('npvResult').style.color = '#f39c12';\n  }\n  document.getElementById('npvConclusion').textContent = conclusion;\n  \n  // Vis detaljer\n  document.getElementById('initialInvestmentDisplay').textContent = formatCurrency(initialInvestment);\n  document.getElementById('totalPvDisplay').textContent = formatCurrency(totalPV);\n  document.getElementById('rateDisplay').textContent = discountRate.toLocaleString('da-DK', { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + '%';\n  document.getElementById('periodDisplay').textContent = numYears + ' år';\n  \n  // Vis årligt breakdown\n  const yearlyBreakdownDiv = document.getElementById('yearlyBreakdown');\n  yearlyBreakdownDiv.innerHTML = '';\n  \n  yearlyPV.forEach(item => {\n    const div = document.createElement('div');\n    div.className = 'calc-breakdown-item';\n    div.innerHTML = `\n      <span class=\"calc-breakdown-label\">År ${item.year} (${formatCurrency(item.cashFlow)}):</span>\n      <span class=\"calc-breakdown-value\">${formatCurrency(item.pv)}</span>\n    `;\n    yearlyBreakdownDiv.appendChild(div);\n  });\n  \n  document.getElementById('resultContainer').style.display = 'block';\n}\n\n// Nulstil formularen\nfunction resetForm() {\n  document.getElementById('initialInvestment').value = '100000';\n  document.getElementById('discountRate').value = '5';\n  document.getElementById('numYears').value = '5';\n  generateCashFlowInputs();\n  hideError();\n  document.getElementById('resultContainer').style.display = 'none';\n}\n\n// Event listeners\ndocument.getElementById('calculateBtn').addEventListener('click', calculateNPV);\ndocument.getElementById('resetBtn').addEventListener('click', resetForm);\n\n// Generer nye pengestrøm felter når antal år ændres\ndocument.getElementById('numYears').addEventListener('change', generateCashFlowInputs);\n\n// Initialiser ved sideindlæsning\ngenerateCashFlowInputs();\n\n// Beregn ved Enter tast\ndocument.addEventListener('keypress', function(e) {\n  if (e.key === 'Enter') {\n    calculateNPV();\n  }\n});",
    styles: ""
  },

    content: {
    howToUse: {
          "title": "Sådan beregner du nutidsværdi effektivt",
          "description": "Find nutidsværdien af dine fremtidige pengestrømme nemt og hurtigt.",
          "steps": [
                {
                      "step": 1,
                      "title": "Indtast pengestrømme",
                      "description": "Føj hver fremtidig pengestrøm til kalkulatoren."
                },
                {
                      "step": 2,
                      "title": "Vælg diskonteringsrate",
                      "description": "Indstil raten for at afspejle din forventede afkast."
                },
                {
                      "step": 3,
                      "title": "Angiv tidsperioder",
                      "description": "Indtast antallet af perioder for hver pengestrøm."
                },
                {
                      "step": 4,
                      "title": "Klik på beregn",
                      "description": "Tryk på knappen for at se nutidsværdien."
                }
          ]
    },
    examples: [
          {
                "title": "Investering i sommerhusudlejning",
                "description": "Du overvejer at investere i et sommerhus til udlejning og vil beregne nutidsværdien af de forventede lejeindtægter over 5 år.",
                "input": {
                      "pengestrømme": "50.000 kr. årligt",
                      "diskonteringsrate": "4%",
                      "tidsperioder": "5 år"
                },
                "output": "220.315 kr.",
                "explanation": "Nutidsværdien viser, hvor meget de fremtidige lejeindtægter er værd i dag med en diskonteringsrate på 4%."
          },
          {
                "title": "Vurdering af pensionsopsparing",
                "description": "Du vil finde ud af, hvad din årlige pensionsudbetaling i 10 år er værd i dag.",
                "input": {
                      "pengestrømme": "100.000 kr. årligt",
                      "diskonteringsrate": "3%",
                      "tidsperioder": "10 år"
                },
                "output": "851.364 kr.",
                "explanation": "Dette beløb repræsenterer den nuværende værdi af din pensionsudbetaling over 10 år med en årlig diskonteringsrate på 3%."
          },
          {
                "title": "Startkapital til ny virksomhed",
                "description": "Du planlægger at starte en virksomhed og vil beregne nutidsværdien af forventede overskud de næste 3 år.",
                "input": {
                      "pengestrømme": "200.000 kr. årligt",
                      "diskonteringsrate": "5%",
                      "tidsperioder": "3 år"
                },
                "output": "544.446 kr.",
                "explanation": "Nutidsværdien beregnet med en 5% diskonteringsrate viser, hvor meget de forventede overskud er værd i dag."
          }
    ],
    faqs: [
          {
                "question": "Hvordan beregner jeg nutidsværdien af mine investeringer?",
                "answer": "Indtast dine fremtidige pengestrømme, vælg en passende diskonteringsrate og angiv tidsperioderne. Brug en nutidsværdikalkulator til at finde resultatet."
          },
          {
                "question": "Hvilken diskonteringsrate skal jeg bruge?",
                "answer": "Diskonteringsraten bør afspejle dit forventede afkast eller den risiko, du er villig til at tage. Typisk ligger den mellem 3% og 10%."
          },
          {
                "question": "Hvorfor er nutidsværdi vigtig?",
                "answer": "Nutidsværdi hjælper dig med at vurdere, om en investering er værd at foretage ved at sammenligne dens fremtidige indtægter med dens nuværende værdi."
          },
          {
                "question": "Kan jeg bruge nutidsværdi til at vurdere min pensionsopsparing?",
                "answer": "Ja, nutidsværdi kan bruges til at finde ud af, hvor meget dine fremtidige pensionsudbetalinger er værd i dag."
          },
          {
                "question": "Er beregning af nutidsværdi i overensstemmelse med danske regler?",
                "answer": "Ja, beregning af nutidsværdi er en universelt anerkendt metode, der også anvendes i Danmark til økonomiske analyser."
          },
          {
                "question": "Hvad skal jeg være opmærksom på, når jeg bruger en nutidsværdikalkulator?",
                "answer": "Sørg for at indtaste præcise data, og vælg en diskonteringsrate, der realistisk afspejler din investeringssituation."
          }
    ],
    additionalInfo: {
          "title": "Forstå nutidsværdi i Danmark",
          "content": "Nutidsværdi er essentiel for at vurdere investeringers reelle værdi over tid. I Danmark bruges den til at sammenligne fremtidige pengestrømme med nutidskroner. Husk at vælge en realistisk diskonteringsrate, typisk mellem 3% og 10%, baseret på risiko og afkast."
    }
  },


  generatedAt: '2025-10-25T19:33:17.311Z',
  version: '1.0.0'
}
