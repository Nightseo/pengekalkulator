import { CalculatorData } from '@/types/calculator'

/**
 * Calculadora: beregn moms
 * Generado automáticamente con Claude API
 * Fecha: 2025-10-30T17:10:59.244Z
 */

export const momsCalculatorData: CalculatorData = {
  slug: 'moms',

  metadata: {
    title: "Moms Kalkulator - Beregn Præcist din Moms",
    description: "Fjern eller tilføj 25% moms nemt. Få præcise resultater hurtigt med vores brugervenlige momsberegner.",
    excerpt: "Beregn dansk moms på sekunder. Tilføj eller fjern 25% moms fra et beløb med detaljeret opgørelse af beløb ekskl. moms, moms og beløb inkl. moms.",
    canonical: 'https://pengekalkulator.com/beregn/moms',
    keywords: ["beregn moms"],
    category: "Forretning",
    h1: "Beregn moms",
    h2: "Moms Kalkulator"
  },

  calculator: {
    html: "<div class=\"calc-container\">\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Vælg beregningstype</label>\n    <select class=\"calc-select\" id=\"calculationType\">\n      <option value=\"add\">Tilføj moms (beløb ekskl. moms)</option>\n      <option value=\"remove\">Fjern moms (beløb inkl. moms)</option>\n    </select>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\" id=\"amountLabel\">Beløb ekskl. moms</label>\n    <div class=\"calc-input-wrapper\">\n      <input type=\"number\" class=\"calc-input\" id=\"amount\" placeholder=\"0\" step=\"0.01\" min=\"0\">\n      <span class=\"calc-input-suffix\">kr</span>\n    </div>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Momssats</label>\n    <div class=\"calc-input-wrapper\">\n      <input type=\"number\" class=\"calc-input\" id=\"vatRate\" value=\"25\" step=\"0.01\" min=\"0\" max=\"100\">\n      <span class=\"calc-input-suffix\">%</span>\n    </div>\n    <p class=\"calc-help\">Standard dansk momssats er 25%</p>\n  </div>\n\n  <button class=\"calc-button\" id=\"calculateBtn\">Beregn moms</button>\n\n  <div class=\"calc-result-container\" id=\"results\" style=\"display: none;\">\n    <div class=\"calc-result-box\">\n      <div class=\"calc-result-label\" id=\"resultLabel\">Beløb inkl. moms</div>\n      <div class=\"calc-result-value\" id=\"totalAmount\">0 kr</div>\n    </div>\n\n    <div class=\"calc-breakdown\">\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\" id=\"baseLabel\">Beløb ekskl. moms:</span>\n        <span class=\"calc-breakdown-value\" id=\"baseAmount\">0 kr</span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\" id=\"vatLabel\">Moms (25%):</span>\n        <span class=\"calc-breakdown-value\" id=\"vatAmount\">0 kr</span>\n      </div>\n      <div class=\"calc-breakdown-item\" style=\"border-top: 2px solid #e5e7eb; margin-top: 8px; padding-top: 8px; font-weight: 600;\">\n        <span class=\"calc-breakdown-label\" id=\"totalLabel\">Beløb inkl. moms:</span>\n        <span class=\"calc-breakdown-value\" id=\"totalBreakdown\">0 kr</span>\n      </div>\n    </div>\n\n    <div class=\"calc-result-box\" style=\"background-color: #f9fafb; margin-top: 16px;\">\n      <div class=\"calc-result-subtitle\">Forklaring</div>\n      <p class=\"calc-help\" id=\"explanation\" style=\"margin: 8px 0 0 0;\"></p>\n    </div>\n  </div>\n</div>",
    logic: "// Elementer\nconst calculationType = document.getElementById('calculationType');\nconst amountInput = document.getElementById('amount');\nconst vatRateInput = document.getElementById('vatRate');\nconst calculateBtn = document.getElementById('calculateBtn');\nconst results = document.getElementById('results');\nconst amountLabel = document.getElementById('amountLabel');\nconst resultLabel = document.getElementById('resultLabel');\nconst baseLabel = document.getElementById('baseLabel');\nconst vatLabel = document.getElementById('vatLabel');\nconst totalLabel = document.getElementById('totalLabel');\nconst totalAmount = document.getElementById('totalAmount');\nconst baseAmount = document.getElementById('baseAmount');\nconst vatAmount = document.getElementById('vatAmount');\nconst totalBreakdown = document.getElementById('totalBreakdown');\nconst explanation = document.getElementById('explanation');\n\n// Formatér tal til dansk format\nfunction formatCurrency(value) {\n  return value.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kr';\n}\n\n// Opdater labels baseret på beregningstype\nfunction updateLabels() {\n  const type = calculationType.value;\n  \n  if (type === 'add') {\n    amountLabel.textContent = 'Beløb ekskl. moms';\n    resultLabel.textContent = 'Beløb inkl. moms';\n    baseLabel.textContent = 'Beløb ekskl. moms:';\n    totalLabel.textContent = 'Beløb inkl. moms:';\n  } else {\n    amountLabel.textContent = 'Beløb inkl. moms';\n    resultLabel.textContent = 'Beløb eksl. moms';\n    baseLabel.textContent = 'Beløb ekskl. moms:';\n    totalLabel.textContent = 'Beløb inkl. moms:';\n  }\n}\n\n// Beregn moms\nfunction calculateVAT() {\n  const amount = parseFloat(amountInput.value);\n  const vatRate = parseFloat(vatRateInput.value);\n  const type = calculationType.value;\n\n  // Validering\n  if (isNaN(amount) || amount < 0) {\n    alert('Indtast venligst et gyldigt beløb');\n    return;\n  }\n\n  if (isNaN(vatRate) || vatRate < 0 || vatRate > 100) {\n    alert('Indtast venligst en gyldig momssats mellem 0 og 100%');\n    return;\n  }\n\n  let baseAmountValue, vatAmountValue, totalAmountValue;\n\n  if (type === 'add') {\n    // Tilføj moms til beløb ekskl. moms\n    baseAmountValue = amount;\n    vatAmountValue = amount * (vatRate / 100);\n    totalAmountValue = baseAmountValue + vatAmountValue;\n\n    explanation.textContent = `Du har tilføjet ${vatRate}% moms til ${formatCurrency(baseAmountValue)}. Det samlede beløb inkl. moms bliver ${formatCurrency(totalAmountValue)}.`;\n  } else {\n    // Fjern moms fra beløb inkl. moms\n    totalAmountValue = amount;\n    baseAmountValue = amount / (1 + vatRate / 100);\n    vatAmountValue = totalAmountValue - baseAmountValue;\n\n    explanation.textContent = `Du har fjernet ${vatRate}% moms fra ${formatCurrency(totalAmountValue)}. Beløbet ekskl. moms er ${formatCurrency(baseAmountValue)}.`;\n  }\n\n  // Vis resultater\n  baseAmount.textContent = formatCurrency(baseAmountValue);\n  vatAmount.textContent = formatCurrency(vatAmountValue);\n  totalBreakdown.textContent = formatCurrency(totalAmountValue);\n  vatLabel.textContent = `Moms (${vatRate}%):`;\n\n  if (type === 'add') {\n    totalAmount.textContent = formatCurrency(totalAmountValue);\n    resultLabel.textContent = 'Beløb inkl. moms';\n  } else {\n    totalAmount.textContent = formatCurrency(baseAmountValue);\n    resultLabel.textContent = 'Beløb ekskl. moms';\n  }\n\n  results.style.display = 'block';\n}\n\n// Event listeners\ncalculationType.addEventListener('change', updateLabels);\ncalculateBtn.addEventListener('click', calculateVAT);\n\n// Enter key support\namountInput.addEventListener('keypress', function(e) {\n  if (e.key === 'Enter') {\n    calculateVAT();\n  }\n});\n\nvatRateInput.addEventListener('keypress', function(e) {\n  if (e.key === 'Enter') {\n    calculateVAT();\n  }\n});\n\n// Initialiser labels\nupdateLabels();",
    styles: ""
  },

    content: {
    howToUse: {
          "title": "Sådan beregner du moms nemt",
          "description": "Brug vores kalkulator til at tilføje eller fjerne 25% moms fra et beløb.",
          "steps": [
                {
                      "step": 1,
                      "title": "Indtast beløb",
                      "description": "Indtast det beløb, du vil beregne moms for."
                },
                {
                      "step": 2,
                      "title": "Vælg beregningstype",
                      "description": "Vælg om du vil tilføje eller fjerne moms."
                },
                {
                      "step": 3,
                      "title": "Klik på beregn",
                      "description": "Tryk på 'Beregn'-knappen for at se resultatet."
                },
                {
                      "step": 4,
                      "title": "Se resultat",
                      "description": "Resultatet viser beløbet med eller uden moms."
                }
          ]
    },
    examples: [
          {
                "title": "Beregn moms for en middagsregning",
                "description": "Du har spist middag på en restaurant og vil vide prisen uden moms.",
                "input": {
                      "beløb": "500 kr",
                      "beregningstype": "fjerne moms"
                },
                "output": "400 kr",
                "explanation": "Beløbet uden moms er 400 kr, da 500 kr inkluderer 25% moms."
          },
          {
                "title": "Tilføj moms til en håndværkerregning",
                "description": "Du har modtaget en faktura for malerarbejde og skal tilføje moms.",
                "input": {
                      "beløb": "8000 kr",
                      "beregningstype": "tilføje moms"
                },
                "output": "10.000 kr",
                "explanation": "Med 25% moms bliver det samlede beløb 10.000 kr."
          },
          {
                "title": "Prisjustering på webshop",
                "description": "Du vil justere prisen på en vare i din online butik til at inkludere moms.",
                "input": {
                      "beløb": "200 kr",
                      "beregningstype": "tilføje moms"
                },
                "output": "250 kr",
                "explanation": "Prisen med 25% moms bliver 250 kr."
          }
    ],
    faqs: [
          {
                "question": "Hvordan beregner jeg moms på en nem måde?",
                "answer": "Brug vores momsberegner ved at indtaste beløbet og vælge, om du vil tilføje eller fjerne moms."
          },
          {
                "question": "Hvad er momssatsen i Danmark?",
                "answer": "Den danske momssats er 25%. Dette gælder for de fleste varer og tjenester i Danmark."
          },
          {
                "question": "Hvordan fjerner jeg moms fra et beløb?",
                "answer": "Indtast beløbet i vores beregner og vælg 'fjerne moms' for at se prisen uden moms."
          },
          {
                "question": "Kan jeg bruge beregneren til både køb og salg?",
                "answer": "Ja, beregneren kan bruges til at finde ud af både købs- og salgspriser med eller uden moms."
          },
          {
                "question": "Er beregningerne i overensstemmelse med dansk lovgivning?",
                "answer": "Ja, vores beregninger følger de gældende danske momssatser og regler."
          }
    ],
    additionalInfo: {
          "title": "Forståelse af dansk moms",
          "content": "Moms er en indirekte skat på 25% i Danmark, der gælder for de fleste varer og tjenester. Det er vigtigt at beregne moms korrekt for at sikre, at du opfylder lovkravene og styrer din økonomi effektivt. Brug vores værktøjer til præcise beregninger."
    }
  },


  generatedAt: '2025-10-30T17:10:59.246Z',
  version: '1.0.0'
}
