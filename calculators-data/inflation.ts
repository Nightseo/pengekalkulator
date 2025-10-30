import { CalculatorData } from '@/types/calculator'

/**
 * Calculadora: beregn inflation
 * Generado automáticamente con Claude API
 * Fecha: 2025-10-30T17:25:02.142Z
 */

export const inflationCalculatorData: CalculatorData = {
  slug: 'inflation',

  metadata: {
    title: "Inflation Kalkulator - Beregn Din Købekrafts Ændring",
    description: "Beregn hvordan inflation påvirker din købekraft over tid. Forstå værdien af dine penge i fremtiden med vores præcise værktøj.",
    excerpt: "Beregn hvordan inflation påvirker din købekraft over tid. Se fremtidige priser og værdifald med denne enkle inflationsberegner baseret på danske forhold.",
    canonical: 'https://pengekalkulator.com/beregn/inflation',
    keywords: ["beregn inflation"],
    category: "Privatøkonomi",
    h1: "Beregn inflation",
    h2: "Inflation Kalkulator"
  },

  calculator: {
    html: "<div class=\"calc-container\">\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Beløb i dag (kr)</label>\n    <input type=\"number\" id=\"currentAmount\" class=\"calc-input\" placeholder=\"10.000\" value=\"10000\">\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Årlig inflationsrate (%)</label>\n    <input type=\"number\" id=\"inflationRate\" class=\"calc-input\" placeholder=\"2,0\" value=\"2\" step=\"0.1\">\n    <div class=\"calc-help\">Gennemsnitlig inflation i Danmark er typisk 1,5-2,5% om året</div>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Antal år frem</label>\n    <input type=\"number\" id=\"years\" class=\"calc-input\" placeholder=\"10\" value=\"10\" min=\"1\" max=\"50\">\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Beregningsretning</label>\n    <select id=\"calculationType\" class=\"calc-select\">\n      <option value=\"future\">Fremtidig værdi (hvad koster det om X år?)</option>\n      <option value=\"current\">Nutidsværdi (hvad svarer fremtidigt beløb til i dag?)</option>\n    </select>\n  </div>\n\n  <button id=\"calculateBtn\" class=\"calc-button\">Beregn inflation</button>\n\n  <div id=\"errorMsg\" class=\"calc-error\" style=\"display: none;\"></div>\n\n  <div id=\"results\" class=\"calc-result-container\" style=\"display: none;\">\n    <div class=\"calc-result-box\">\n      <div class=\"calc-result-label\" id=\"resultLabel\">Fremtidig værdi</div>\n      <div class=\"calc-result-value\" id=\"futureValue\">0 kr</div>\n      <div class=\"calc-result-subtitle\" id=\"resultSubtitle\"></div>\n    </div>\n\n    <div class=\"calc-result-box\">\n      <div class=\"calc-result-label\">Købekraftstab</div>\n      <div class=\"calc-result-value\" id=\"purchasingPowerLoss\">0 kr</div>\n      <div class=\"calc-result-subtitle\" id=\"lossPercentage\"></div>\n    </div>\n\n    <div class=\"calc-breakdown\">\n      <h3>Udvikling år for år</h3>\n      <div id=\"yearlyBreakdown\"></div>\n    </div>\n\n    <div class=\"calc-breakdown\">\n      <h3>Sammenligning</h3>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Oprindeligt beløb:</span>\n        <span class=\"calc-breakdown-value\" id=\"originalAmount\">0 kr</span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Påvirket beløb:</span>\n        <span class=\"calc-breakdown-value\" id=\"affectedAmount\">0 kr</span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Forskel:</span>\n        <span class=\"calc-breakdown-value\" id=\"difference\">0 kr</span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Total ændring:</span>\n        <span class=\"calc-breakdown-value\" id=\"totalChange\">0%</span>\n      </div>\n    </div>\n\n    <div class=\"calc-help\">\n      <strong>Bemærk:</strong> Denne beregning er baseret på en konstant inflationsrate. Den faktiske inflation kan variere fra år til år. Danmarks Statistik offentliggør den officielle forbrugerprisindeks (CPI).\n    </div>\n  </div>\n</div>",
    logic: "// Formater tal til dansk format\nfunction formatCurrency(amount) {\n  return amount.toLocaleString('da-DK', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' kr';\n}\n\nfunction formatPercent(value) {\n  return value.toLocaleString('da-DK', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';\n}\n\n// Vis fejlmeddelelse\nfunction showError(message) {\n  const errorMsg = document.getElementById('errorMsg');\n  errorMsg.textContent = message;\n  errorMsg.style.display = 'block';\n  document.getElementById('results').style.display = 'none';\n}\n\n// Skjul fejlmeddelelse\nfunction hideError() {\n  document.getElementById('errorMsg').style.display = 'none';\n}\n\n// Beregn inflation\nfunction calculateInflation() {\n  hideError();\n\n  // Hent input værdier\n  const currentAmount = parseFloat(document.getElementById('currentAmount').value);\n  const inflationRate = parseFloat(document.getElementById('inflationRate').value);\n  const years = parseInt(document.getElementById('years').value);\n  const calculationType = document.getElementById('calculationType').value;\n\n  // Validering\n  if (isNaN(currentAmount) || currentAmount <= 0) {\n    showError('Indtast venligst et gyldigt beløb større end 0');\n    return;\n  }\n\n  if (isNaN(inflationRate)) {\n    showError('Indtast venligst en gyldig inflationsrate');\n    return;\n  }\n\n  if (inflationRate < -10 || inflationRate > 50) {\n    showError('Inflationsraten skal være mellem -10% og 50%');\n    return;\n  }\n\n  if (isNaN(years) || years < 1 || years > 50) {\n    showError('Antal år skal være mellem 1 og 50');\n    return;\n  }\n\n  // Beregn inflation\n  const rate = inflationRate / 100;\n  let futureValue, purchasingPowerLoss, originalAmount, affectedAmount;\n\n  if (calculationType === 'future') {\n    // Beregn fremtidig værdi (hvad koster det om X år)\n    originalAmount = currentAmount;\n    affectedAmount = currentAmount * Math.pow(1 + rate, years);\n    futureValue = affectedAmount;\n    purchasingPowerLoss = affectedAmount - currentAmount;\n  } else {\n    // Beregn nutidsværdi (hvad svarer fremtidigt beløb til i dag)\n    originalAmount = currentAmount;\n    affectedAmount = currentAmount / Math.pow(1 + rate, years);\n    futureValue = affectedAmount;\n    purchasingPowerLoss = currentAmount - affectedAmount;\n  }\n\n  const totalChangePercent = ((affectedAmount - originalAmount) / originalAmount) * 100;\n  const lossPercent = Math.abs((purchasingPowerLoss / originalAmount) * 100);\n\n  // Opdater resultater\n  if (calculationType === 'future') {\n    document.getElementById('resultLabel').textContent = 'Fremtidig værdi';\n    document.getElementById('resultSubtitle').textContent = `Om ${years} år med ${formatPercent(inflationRate)} årlig inflation`;\n  } else {\n    document.getElementById('resultLabel').textContent = 'Nutidsværdi';\n    document.getElementById('resultSubtitle').textContent = `Dagens købekraft af fremtidigt beløb`;\n  }\n\n  document.getElementById('futureValue').textContent = formatCurrency(affectedAmount);\n  document.getElementById('purchasingPowerLoss').textContent = formatCurrency(Math.abs(purchasingPowerLoss));\n  document.getElementById('lossPercentage').textContent = `${formatPercent(lossPercent)} ${calculationType === 'future' ? 'stigning' : 'fald'} i ${years} år`;\n\n  // Opdater sammenligning\n  document.getElementById('originalAmount').textContent = formatCurrency(originalAmount);\n  document.getElementById('affectedAmount').textContent = formatCurrency(affectedAmount);\n  document.getElementById('difference').textContent = formatCurrency(Math.abs(purchasingPowerLoss));\n  document.getElementById('totalChange').textContent = formatPercent(totalChangePercent);\n\n  // Generer år-for-år breakdown\n  const yearlyBreakdown = document.getElementById('yearlyBreakdown');\n  yearlyBreakdown.innerHTML = '';\n\n  // Vis maks 10 år i breakdown, eller alle år hvis mindre end 10\n  const displayYears = years <= 10 ? years : 10;\n  const yearStep = years > 10 ? Math.ceil(years / 10) : 1;\n\n  for (let i = yearStep; i <= years; i += yearStep) {\n    let yearValue;\n    if (calculationType === 'future') {\n      yearValue = currentAmount * Math.pow(1 + rate, i);\n    } else {\n      yearValue = currentAmount / Math.pow(1 + rate, i);\n    }\n\n    const yearDiv = document.createElement('div');\n    yearDiv.className = 'calc-breakdown-item';\n    yearDiv.innerHTML = `\n      <span class=\"calc-breakdown-label\">Efter ${i} år:</span>\n      <span class=\"calc-breakdown-value\">${formatCurrency(yearValue)}</span>\n    `;\n    yearlyBreakdown.appendChild(yearDiv);\n  }\n\n  // Vis sidste år hvis ikke allerede vist\n  if (years % yearStep !== 0 && years > displayYears) {\n    let yearValue;\n    if (calculationType === 'future') {\n      yearValue = currentAmount * Math.pow(1 + rate, years);\n    } else {\n      yearValue = currentAmount / Math.pow(1 + rate, years);\n    }\n\n    const yearDiv = document.createElement('div');\n    yearDiv.className = 'calc-breakdown-item';\n    yearDiv.innerHTML = `\n      <span class=\"calc-breakdown-label\">Efter ${years} år:</span>\n      <span class=\"calc-breakdown-value\">${formatCurrency(yearValue)}</span>\n    `;\n    yearlyBreakdown.appendChild(yearDiv);\n  }\n\n  // Vis resultater\n  document.getElementById('results').style.display = 'block';\n}\n\n// Event listeners\ndocument.getElementById('calculateBtn').addEventListener('click', calculateInflation);\n\n// Beregn ved Enter-tryk\ndocument.querySelectorAll('.calc-input, .calc-select').forEach(element => {\n  element.addEventListener('keypress', function(e) {\n    if (e.key === 'Enter') {\n      calculateInflation();\n    }\n  });\n});\n\n// Beregn automatisk ved load\nwindow.addEventListener('load', calculateInflation);",
    styles: ""
  },

    content: {
    howToUse: {
          "title": "Forstå inflationens indvirkning nemt",
          "description": "Vores kalkulator hjælper dig med at se, hvordan inflation påvirker din købekraft over tid.",
          "steps": [
                {
                      "step": 1,
                      "title": "Indtast startbeløb",
                      "description": "Skriv det beløb, du vil analysere."
                },
                {
                      "step": 2,
                      "title": "Vælg tidsperiode",
                      "description": "Vælg hvor mange år frem du vil beregne."
                },
                {
                      "step": 3,
                      "title": "Angiv inflationsrate",
                      "description": "Indtast den årlige inflationsprocent."
                },
                {
                      "step": 4,
                      "title": "Klik på beregn",
                      "description": "Se resultatet af din købekrafts ændring."
                }
          ]
    },
    examples: [
          {
                "title": "Planlægning af ferieopsparing",
                "description": "Du vil spare op til en ferie om 5 år og vil sikre dig, at dine penge ikke mister værdi.",
                "input": {
                      "startbeløb": "50.000 kr.",
                      "tidsperiode": "5 år",
                      "inflationsrate": "2%"
                },
                "output": "45.308 kr.",
                "explanation": "Efter 5 år vil 50.000 kr. kun have en købekraft svarende til 45.308 kr. ved en årlig inflation på 2%."
          },
          {
                "title": "Langsigtet pensionsplanlægning",
                "description": "Du overvejer, hvordan inflation vil påvirke din pensionsopsparing over 20 år.",
                "input": {
                      "startbeløb": "1.000.000 kr.",
                      "tidsperiode": "20 år",
                      "inflationsrate": "1,5%"
                },
                "output": "742.140 kr.",
                "explanation": "Om 20 år vil 1.000.000 kr. have en købekraft på 742.140 kr. med en årlig inflation på 1,5%."
          },
          {
                "title": "Værdi af arvebeløb i fremtiden",
                "description": "Du har modtaget en arv og vil vide, hvad den vil være værd om 10 år.",
                "input": {
                      "startbeløb": "200.000 kr.",
                      "tidsperiode": "10 år",
                      "inflationsrate": "1,8%"
                },
                "output": "167.213 kr.",
                "explanation": "Om 10 år vil 200.000 kr. have en købekraft svarende til 167.213 kr. ved en årlig inflation på 1,8%."
          }
    ],
    faqs: [
          {
                "question": "Hvordan beregner jeg inflationens påvirkning?",
                "answer": "Indtast startbeløb, vælg tidsperiode og inflationsrate i vores kalkulator, og klik 'beregn' for at se resultatet."
          },
          {
                "question": "Hvor ofte skal jeg opdatere inflationsraten?",
                "answer": "Det anbefales at opdatere raten årligt eller når der er større økonomiske ændringer."
          },
          {
                "question": "Er beregningen i henhold til danske regler?",
                "answer": "Ja, vores værktøj følger almindelig praksis og er baseret på danske økonomiske standarder."
          },
          {
                "question": "Hvad betyder inflationsraten for min opsparing?",
                "answer": "Inflationsraten angiver, hvor meget din opsparings købekraft vil falde årligt."
          },
          {
                "question": "Kan jeg bruge værktøjet til pensionsplanlægning?",
                "answer": "Ja, det er ideelt til at forstå, hvordan inflation påvirker din pensionsopsparing over tid."
          },
          {
                "question": "Hvad skal jeg være opmærksom på ved langsigtede beregninger?",
                "answer": "Vær opmærksom på, at den faktiske inflationsrate kan variere over tid, hvilket påvirker resultatet."
          }
    ],
    additionalInfo: {
          "title": "Forstå Inflation i Danmark",
          "content": "Inflation reducerer købekraften af dine penge over tid. I Danmark påvirkes inflationen af faktorer som energipriser og lønudvikling. For at beskytte dine opsparinger, overvej investeringer, der kan overvinde inflationens effekt. Hold dig opdateret på økonomiske nyheder."
    }
  },


  generatedAt: '2025-10-30T17:25:02.143Z',
  version: '1.0.0'
}
