import { CalculatorData } from '@/types/calculator'

/**
 * Calculadora: beregn feriedage
 * Generado automáticamente con Claude API
 * Fecha: 2025-10-30T17:09:16.426Z
 */

export const feriedageCalculatorData: CalculatorData = {
  slug: 'feriedage',

  metadata: {
    title: "Beregn Feriedage med Vores Kalkulator - Optjen Dine Dage",
    description: "Beregn dine optjente feriedage og deres værdi med vores brugervenlige kalkulator. Få et præcist overblik over din ferieoptjening.",
    excerpt: "Beregn præcist hvor mange feriedage du har optjent og værdien af dine feriepenge baseret på din ansættelsesperiode og løn efter dansk ferielov.",
    canonical: 'https://pengekalkulator.com/beregn/feriedage',
    keywords: ["beregn feriedage"],
    category: "Løn & Skat",
    h1: "Beregn Feriedage",
    h2: "Feriedage Kalkulator"
  },

  calculator: {
    html: "<div class=\"calc-container\">\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Antal måneder ansat i optjeningsåret</label>\n    <input type=\"number\" id=\"maaneder\" class=\"calc-input\" placeholder=\"12\" min=\"0\" max=\"12\" step=\"0.1\" value=\"12\">\n    <div class=\"calc-help\">Du optjener 2,08 feriedage pr. måned (25 dage om året)</div>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Din månedsløn (brutto)</label>\n    <div class=\"calc-input-wrapper\">\n      <input type=\"number\" id=\"manedslon\" class=\"calc-input\" placeholder=\"35000\" min=\"0\" step=\"100\" value=\"\">\n      <span class=\"calc-input-suffix\">kr</span>\n    </div>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Feriepengesats</label>\n    <select id=\"sats\" class=\"calc-select\">\n      <option value=\"12.5\">12,5% (Standard - Ferieloven)</option>\n      <option value=\"1\">1% (Særlig opsparing)</option>\n      <option value=\"custom\">Tilpasset sats</option>\n    </select>\n  </div>\n\n  <div class=\"calc-group\" id=\"customSatsGroup\" style=\"display:none;\">\n    <label class=\"calc-label\">Indtast tilpasset sats</label>\n    <div class=\"calc-input-wrapper\">\n      <input type=\"number\" id=\"customSats\" class=\"calc-input\" placeholder=\"12.5\" min=\"0\" max=\"100\" step=\"0.1\">\n      <span class=\"calc-input-suffix\">%</span>\n    </div>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Allerede afholdte feriedage</label>\n    <input type=\"number\" id=\"afholdte\" class=\"calc-input\" placeholder=\"0\" min=\"0\" max=\"25\" step=\"0.5\" value=\"0\">\n  </div>\n\n  <button class=\"calc-button\" id=\"beregn\">Beregn feriedage</button>\n\n  <div id=\"resultat\" class=\"calc-result-container\" style=\"display:none;\">\n    <div class=\"calc-result-box\">\n      <div class=\"calc-result-value\" id=\"antalFeriedage\"></div>\n      <div class=\"calc-result-label\">Optjente feriedage</div>\n      <div class=\"calc-result-subtitle\" id=\"resterende\"></div>\n    </div>\n\n    <div class=\"calc-result-box\">\n      <div class=\"calc-result-value\" id=\"feriepenge\"></div>\n      <div class=\"calc-result-label\">Samlet feriepengeværdi</div>\n    </div>\n\n    <div class=\"calc-breakdown\">\n      <h3>Detaljeret beregning</h3>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Optjeningsperiode:</span>\n        <span class=\"calc-breakdown-value\" id=\"periodeText\"></span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Optjeningsrate:</span>\n        <span class=\"calc-breakdown-value\">2,08 dage/måned</span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Optjente feriedage:</span>\n        <span class=\"calc-breakdown-value\" id=\"optjenteDage\"></span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Afholdte feriedage:</span>\n        <span class=\"calc-breakdown-value\" id=\"afholdteDage\"></span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Resterende feriedage:</span>\n        <span class=\"calc-breakdown-value\" id=\"resterendeDage\"></span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Månedsløn (brutto):</span>\n        <span class=\"calc-breakdown-value\" id=\"lonText\"></span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Feriepengesats:</span>\n        <span class=\"calc-breakdown-value\" id=\"satsText\"></span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Årlig optjeningsgrundlag:</span>\n        <span class=\"calc-breakdown-value\" id=\"grundlagText\"></span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Samlet feriepenge:</span>\n        <span class=\"calc-breakdown-value\" id=\"samletFeriepenge\"></span>\n      </div>\n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Værdi pr. feriedag:</span>\n        <span class=\"calc-breakdown-value\" id=\"vaerdiPrDag\"></span>\n      </div>\n    </div>\n\n    <div class=\"calc-help\" style=\"margin-top: 20px;\">\n      <strong>Om beregningen:</strong><br>\n      Efter Ferieloven optjener du 2,08 feriedage pr. måned (25 dage om året). Feriepenge udgør typisk 12,5% af din bruttoløn. Ferieåret løber fra 1. september til 31. august.\n    </div>\n  </div>\n\n  <div id=\"error\" class=\"calc-error\" style=\"display:none;\"></div>\n</div>",
    logic: "document.addEventListener('DOMContentLoaded', function() {\n  const maanederInput = document.getElementById('maaneder');\n  const manedslon = document.getElementById('manedslon');\n  const satsSelect = document.getElementById('sats');\n  const customSatsInput = document.getElementById('customSats');\n  const customSatsGroup = document.getElementById('customSatsGroup');\n  const afholdteInput = document.getElementById('afholdte');\n  const beregnBtn = document.getElementById('beregn');\n  const resultatDiv = document.getElementById('resultat');\n  const errorDiv = document.getElementById('error');\n\n  // Vis/skjul custom sats\n  satsSelect.addEventListener('change', function() {\n    if (this.value === 'custom') {\n      customSatsGroup.style.display = 'block';\n    } else {\n      customSatsGroup.style.display = 'none';\n    }\n  });\n\n  beregnBtn.addEventListener('click', beregnFeriedage);\n\n  function beregnFeriedage() {\n    errorDiv.style.display = 'none';\n    resultatDiv.style.display = 'none';\n\n    const maaneder = parseFloat(maanederInput.value);\n    const lon = parseFloat(manedslon.value);\n    const afholdte = parseFloat(afholdteInput.value);\n\n    // Validering\n    if (!maaneder || maaneder < 0 || maaneder > 12) {\n      visError('Indtast et gyldigt antal måneder mellem 0 og 12');\n      return;\n    }\n\n    if (!lon || lon <= 0) {\n      visError('Indtast en gyldig månedsløn');\n      return;\n    }\n\n    if (isNaN(afholdte) || afholdte < 0) {\n      visError('Indtast et gyldigt antal afholdte feriedage');\n      return;\n    }\n\n    // Hent feriepengesats\n    let sats;\n    if (satsSelect.value === 'custom') {\n      sats = parseFloat(customSatsInput.value);\n      if (!sats || sats < 0 || sats > 100) {\n        visError('Indtast en gyldig feriepengesats mellem 0 og 100%');\n        return;\n      }\n    } else {\n      sats = parseFloat(satsSelect.value);\n    }\n\n    // Beregninger\n    const optjenteDage = maaneder * 2.08; // 25 dage / 12 måneder = 2.08 dage pr. måned\n    const resterendeDage = Math.max(0, optjenteDage - afholdte);\n    const aarligLon = lon * 12;\n    const optjeningsgrundlag = (maaneder / 12) * aarligLon;\n    const samletFeriepenge = optjeningsgrundlag * (sats / 100);\n    const vaerdiPrDag = optjenteDage > 0 ? samletFeriepenge / optjenteDage : 0;\n\n    // Vis resultater\n    document.getElementById('antalFeriedage').textContent = optjenteDage.toFixed(1) + ' dage';\n    document.getElementById('resterende').textContent = 'Heraf ' + resterendeDage.toFixed(1) + ' dage tilbage';\n    document.getElementById('feriepenge').textContent = formatKr(samletFeriepenge);\n\n    // Breakdown\n    document.getElementById('periodeText').textContent = maaneder.toLocaleString('da-DK', {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ' måneder';\n    document.getElementById('optjenteDage').textContent = optjenteDage.toFixed(1) + ' dage';\n    document.getElementById('afholdteDage').textContent = afholdte.toFixed(1) + ' dage';\n    document.getElementById('resterendeDage').textContent = resterendeDage.toFixed(1) + ' dage';\n    document.getElementById('lonText').textContent = formatKr(lon);\n    document.getElementById('satsText').textContent = sats.toLocaleString('da-DK', {minimumFractionDigits: 1, maximumFractionDigits: 1}) + '%';\n    document.getElementById('grundlagText').textContent = formatKr(optjeningsgrundlag);\n    document.getElementById('samletFeriepenge').textContent = formatKr(samletFeriepenge);\n    document.getElementById('vaerdiPrDag').textContent = formatKr(vaerdiPrDag);\n\n    resultatDiv.style.display = 'block';\n  }\n\n  function formatKr(amount) {\n    return amount.toLocaleString('da-DK', {\n      minimumFractionDigits: 2,\n      maximumFractionDigits: 2\n    }) + ' kr';\n  }\n\n  function visError(message) {\n    errorDiv.textContent = message;\n    errorDiv.style.display = 'block';\n  }\n});",
    styles: ""
  },

    content: {
    howToUse: {
          "title": "Sådan beregner du dine feriedage",
          "description": "Find ud af hvor mange feriedage du har optjent og hvad de er værd.",
          "steps": [
                {
                      "step": 1,
                      "title": "Indtast arbejdstid",
                      "description": "Angiv hvor mange timer du arbejder om ugen."
                },
                {
                      "step": 2,
                      "title": "Indtast ansættelsestid",
                      "description": "Vælg hvor længe du har været ansat i din nuværende stilling."
                },
                {
                      "step": 3,
                      "title": "Beregn feriedage",
                      "description": "Klik på 'Beregn' for at se dine optjente feriedage."
                },
                {
                      "step": 4,
                      "title": "Se feriens værdi",
                      "description": "Få et overblik over den økonomiske værdi af dine feriedage."
                }
          ]
    },
    examples: [
          {
                "title": "Fuldtidsansat i et år",
                "description": "Du har arbejdet fuldtid i 12 måneder og vil vide dine optjente feriedage.",
                "input": {
                      "arbejdstid": "37 timer",
                      "ansættelsestid": "12 måneder"
                },
                "output": "25 feriedage",
                "explanation": "Som fuldtidsansat i et år har du optjent 25 feriedage i henhold til den danske ferielov."
          },
          {
                "title": "Deltidsansat i et halvt år",
                "description": "Du arbejder deltid og vil beregne feriedage efter 6 måneders ansættelse.",
                "input": {
                      "arbejdstid": "20 timer",
                      "ansættelsestid": "6 måneder"
                },
                "output": "10 feriedage",
                "explanation": "Som deltidsansat optjener du færre feriedage, svarende til din arbejdstid og ansættelsesperiode."
          },
          {
                "title": "Nyansat med kort ansættelse",
                "description": "Du er lige startet i en ny stilling og vil kende dine feriedage efter 3 måneder.",
                "input": {
                      "arbejdstid": "30 timer",
                      "ansættelsestid": "3 måneder"
                },
                "output": "6 feriedage",
                "explanation": "Du optjener 2,08 feriedage per måned, hvilket giver 6 feriedage efter 3 måneders deltidsarbejde."
          }
    ],
    faqs: [
          {
                "question": "Hvordan beregner jeg mine feriedage som deltidsansat?",
                "answer": "Indtast din ugentlige arbejdstid og ansættelsestid i beregneren for at få præcise feriedage."
          },
          {
                "question": "Hvor mange feriedage optjener jeg per måned?",
                "answer": "Du optjener 2,08 feriedage per måned, hvilket er standard i henhold til den danske ferielov."
          },
          {
                "question": "Kan jeg overføre ubrugte feriedage til næste år?",
                "answer": "Ifølge dansk lov kan ubrugte feriedage normalt ikke overføres, medmindre det er aftalt med arbejdsgiveren."
          },
          {
                "question": "Hvad er værdien af mine feriedage?",
                "answer": "Værdien afhænger af din løn. Beregneren giver et estimat baseret på dine indtastede oplysninger."
          },
          {
                "question": "Er beregneren i overensstemmelse med danske regler?",
                "answer": "Ja, beregneren følger den danske ferielov og gældende regler for optjening af feriedage."
          }
    ],
    additionalInfo: {
          "title": "Forstå dine feriedage bedre",
          "content": "I Danmark optjener du 2,08 feriedage pr. måned ifølge ferieloven. Det er vigtigt at kende din ret, da feriedage bidrager til balance mellem arbejde og fritid. Husk at planlægge din ferie i god tid for at sikre optimale forhold på arbejdspladsen."
    }
  },


  generatedAt: '2025-10-30T17:09:16.427Z',
  version: '1.0.0'
}
