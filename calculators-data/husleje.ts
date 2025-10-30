import { CalculatorData } from '@/types/calculator'

/**
 * Calculadora: beregn husleje
 * Generado automáticamente con Claude API
 * Fecha: 2025-10-30T17:15:18.252Z
 */

export const huslejeCalculatorData: CalculatorData = {
  slug: 'husleje',

  metadata: {
    title: "Husleje Kalkulator - Beregn Dit Budget Nemt",
    description: "Beregn din ideelle husleje baseret på din indkomst. Få et klart billede af, hvad du har råd til, og optimer din økonomi i dag.",
    excerpt: "Beregn hvad du realistisk har råd til i husleje baseret på din bruttoindkomst, efter danske skatter og faste udgifter. Få personlige anbefalinger til din økonomi.",
    canonical: 'https://pengekalkulator.com/beregn/husleje',
    keywords: ["beregn husleje"],
    category: "Privatøkonomi",
    h1: "Beregn husleje",
    h2: "Husleje Kalkulator"
  },

  calculator: {
    html: "<div class=\"calc-container\">\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Månedlig bruttoindkomst</label>\n    <div class=\"calc-input-wrapper\">\n      <input type=\"number\" id=\"bruttoIndkomst\" class=\"calc-input\" placeholder=\"35000\" min=\"0\" step=\"1000\">\n      <span class=\"calc-input-suffix\">kr</span>\n    </div>\n    <div class=\"calc-help\">Indtast din månedlige bruttoløn før skat</div>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Årlig bruttoindkomst (bruges til skatteberegning)</label>\n    <div class=\"calc-input-wrapper\">\n      <input type=\"number\" id=\"aarligIndkomst\" class=\"calc-input\" placeholder=\"420000\" min=\"0\" step=\"10000\">\n      <span class=\"calc-input-suffix\">kr</span>\n    </div>\n    <div class=\"calc-help\">Indtast din samlede årsindkomst før skat</div>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Huslejeprocent af nettoindkomst</label>\n    <div class=\"calc-input-wrapper\">\n      <input type=\"number\" id=\"huslejeProcent\" class=\"calc-input\" value=\"30\" min=\"10\" max=\"50\" step=\"5\">\n      <span class=\"calc-input-suffix\">%</span>\n    </div>\n    <div class=\"calc-help\">Anbefalet: 25-30% af nettoindkomst. Maks. tilladt i Danmark er ofte 40%</div>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Andre månedlige faste udgifter</label>\n    <div class=\"calc-input-wrapper\">\n      <input type=\"number\" id=\"andreUdgifter\" class=\"calc-input\" placeholder=\"5000\" min=\"0\" step=\"500\">\n      <span class=\"calc-input-suffix\">kr</span>\n    </div>\n    <div class=\"calc-help\">Transport, forsikringer, lån, abonnementer mv.</div>\n  </div>\n\n  <div class=\"calc-group\">\n    <label class=\"calc-label\">Antal personer i husstanden</label>\n    <select id=\"antalPersoner\" class=\"calc-select\">\n      <option value=\"1\">1 person</option>\n      <option value=\"2\">2 personer</option>\n      <option value=\"3\">3 personer</option>\n      <option value=\"4\">4 personer</option>\n      <option value=\"5\">5+ personer</option>\n    </select>\n  </div>\n\n  <button id=\"beregn\" class=\"calc-button\">Beregn husleje</button>\n\n  <div id=\"resultat\" class=\"calc-result-container\" style=\"display:none;\">\n    <div class=\"calc-result-box\">\n      <div class=\"calc-result-label\">Du har råd til i husleje</div>\n      <div class=\"calc-result-value\" id=\"maxHusleje\"></div>\n      <div class=\"calc-result-subtitle\" id=\"resultStatus\"></div>\n    </div>\n\n    <div class=\"calc-breakdown\">\n      <h3 style=\"margin-top:0; color:#2c3e50;\">Beregningsgrundlag</h3>\n      \n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Månedlig bruttoindkomst</span>\n        <span class=\"calc-breakdown-value\" id=\"bruttoVis\"></span>\n      </div>\n      \n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">AM-bidrag (8%)</span>\n        <span class=\"calc-breakdown-value\" id=\"amBidrag\"></span>\n      </div>\n      \n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Estimeret skat</span>\n        <span class=\"calc-breakdown-value\" id=\"skat\"></span>\n      </div>\n      \n      <div class=\"calc-breakdown-item\" style=\"border-top: 2px solid #3498db; padding-top: 10px; margin-top: 10px; font-weight: 600;\">\n        <span class=\"calc-breakdown-label\">Månedlig nettoindkomst</span>\n        <span class=\"calc-breakdown-value\" id=\"netto\"></span>\n      </div>\n      \n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Andre faste udgifter</span>\n        <span class=\"calc-breakdown-value\" id=\"udgifterVis\"></span>\n      </div>\n      \n      <div class=\"calc-breakdown-item\">\n        <span class=\"calc-breakdown-label\">Husleje (<span id=\"procentVis\"></span>% af netto)</span>\n        <span class=\"calc-breakdown-value\" id=\"huslejeVis\"></span>\n      </div>\n      \n      <div class=\"calc-breakdown-item\" style=\"border-top: 2px solid #27ae60; padding-top: 10px; margin-top: 10px; font-weight: 600; color: #27ae60;\">\n        <span class=\"calc-breakdown-label\">Tilbage til forbrug</span>\n        <span class=\"calc-breakdown-value\" id=\"tilbage\"></span>\n      </div>\n    </div>\n\n    <div class=\"calc-result-box\" style=\"background-color: #f8f9fa; margin-top: 20px;\">\n      <h4 style=\"margin-top:0; color:#2c3e50;\">Anbefalinger</h4>\n      <div id=\"anbefalinger\" style=\"font-size: 14px; line-height: 1.6; color: #555;\"></div>\n    </div>\n  </div>\n\n  <div id=\"fejl\" class=\"calc-error\" style=\"display:none;\"></div>\n</div>",
    logic: "// Beregn husleje calculator\n\nfunction beregnSkat(aarligIndkomst) {\n  // Danske skattesatser 2024 (forenklet model)\n  const amBidrag = 0.08; // 8% AM-bidrag\n  const personfradrag = 49700; // Personfradrag 2024\n  \n  // Beregn grundlag efter AM-bidrag\n  const efterAM = aarligIndkomst * (1 - amBidrag);\n  \n  // Skattefrit beløb\n  const skattepligtigIndkomst = Math.max(0, efterAM - personfradrag);\n  \n  // Gennemsnitlig kommuneskat + kirkeskat + bundskat (ca. 37-40%)\n  let bundSkat = 0;\n  let topSkat = 0;\n  \n  const bundgrænse = 568900; // Topskattegrænse 2024\n  \n  if (skattepligtigIndkomst <= bundgrænse) {\n    bundSkat = skattepligtigIndkomst * 0.38; // Ca. 38% gennemsnitsskat\n  } else {\n    bundSkat = bundgrænse * 0.38;\n    topSkat = (skattepligtigIndkomst - bundgrænse) * 0.53; // 38% + 15% topskat\n  }\n  \n  const totalSkat = bundSkat + topSkat;\n  const amBidragKr = aarligIndkomst * amBidrag;\n  \n  return {\n    amBidrag: amBidragKr,\n    skat: totalSkat,\n    nettoAarlig: aarligIndkomst - amBidragKr - totalSkat\n  };\n}\n\nfunction formaterBeløb(beløb) {\n  return Math.round(beløb).toLocaleString('da-DK') + ' kr';\n}\n\nfunction beregnHusleje() {\n  // Hent værdier\n  const bruttoMaanedlig = parseFloat(document.getElementById('bruttoIndkomst').value) || 0;\n  const aarligIndkomst = parseFloat(document.getElementById('aarligIndkomst').value) || 0;\n  const huslejeProcent = parseFloat(document.getElementById('huslejeProcent').value) || 30;\n  const andreUdgifter = parseFloat(document.getElementById('andreUdgifter').value) || 0;\n  const antalPersoner = parseInt(document.getElementById('antalPersoner').value) || 1;\n  \n  const fejlDiv = document.getElementById('fejl');\n  const resultatDiv = document.getElementById('resultat');\n  \n  // Validering\n  if (bruttoMaanedlig <= 0 || aarligIndkomst <= 0) {\n    fejlDiv.textContent = 'Indtast venligst både månedlig og årlig bruttoindkomst';\n    fejlDiv.style.display = 'block';\n    resultatDiv.style.display = 'none';\n    return;\n  }\n  \n  if (huslejeProcent < 10 || huslejeProcent > 50) {\n    fejlDiv.textContent = 'Huslejeprocenten skal være mellem 10% og 50%';\n    fejlDiv.style.display = 'block';\n    resultatDiv.style.display = 'none';\n    return;\n  }\n  \n  // Skjul fejl\n  fejlDiv.style.display = 'none';\n  \n  // Beregn skat\n  const skatteBeregning = beregnSkat(aarligIndkomst);\n  const nettoMaanedlig = skatteBeregning.nettoAarlig / 12;\n  const amBidragMaanedlig = skatteBeregning.amBidrag / 12;\n  const skatMaanedlig = skatteBeregning.skat / 12;\n  \n  // Beregn max husleje\n  const maxHusleje = (nettoMaanedlig * huslejeProcent) / 100;\n  const tilbageEfterAlt = nettoMaanedlig - andreUdgifter - maxHusleje;\n  \n  // Anbefalinger baseret på antal personer\n  const minimumPrPerson = 3500; // Minimum pr. person til mad, tøj, fornøjelser mv.\n  const anbefaletRåderum = minimumPrPerson * antalPersoner;\n  \n  // Vis resultater\n  document.getElementById('maxHusleje').textContent = formaterBeløb(maxHusleje);\n  document.getElementById('bruttoVis').textContent = formaterBeløb(bruttoMaanedlig);\n  document.getElementById('amBidrag').textContent = '- ' + formaterBeløb(amBidragMaanedlig);\n  document.getElementById('skat').textContent = '- ' + formaterBeløb(skatMaanedlig);\n  document.getElementById('netto').textContent = formaterBeløb(nettoMaanedlig);\n  document.getElementById('udgifterVis').textContent = '- ' + formaterBeløb(andreUdgifter);\n  document.getElementById('huslejeVis').textContent = '- ' + formaterBeløb(maxHusleje);\n  document.getElementById('procentVis').textContent = huslejeProcent;\n  document.getElementById('tilbage').textContent = formaterBeløb(tilbageEfterAlt);\n  \n  // Status besked\n  const statusDiv = document.getElementById('resultStatus');\n  if (tilbageEfterAlt < anbefaletRåderum) {\n    statusDiv.textContent = '⚠️ Advarsel: Begrænset råderum tilbage';\n    statusDiv.style.color = '#e74c3c';\n  } else if (tilbageEfterAlt < anbefaletRåderum * 1.5) {\n    statusDiv.textContent = '✓ Acceptabelt råderum';\n    statusDiv.style.color = '#f39c12';\n  } else {\n    statusDiv.textContent = '✓ Godt råderum til daglige udgifter';\n    statusDiv.style.color = '#27ae60';\n  }\n  \n  // Anbefalinger\n  let anbefalinger = '<ul style=\"margin: 10px 0; padding-left: 20px;\">';\n  \n  if (huslejeProcent > 35) {\n    anbefalinger += '<li>Du bruger over 35% af din nettoindkomst på husleje. Det kan være økonomisk belastende på længere sigt.</li>';\n  }\n  \n  if (tilbageEfterAlt < anbefaletRåderum) {\n    anbefalinger += '<li>Med ' + antalPersoner + ' person(er) anbefales minimum ' + formaterBeløb(anbefaletRåderum) + ' til mad, tøj, transport og fritid.</li>';\n    anbefalinger += '<li>Overvej at sænke huslejebudgettet eller søge efter ekstra indtægtskilder.</li>';\n  }\n  \n  if (huslejeProcent <= 30 && tilbageEfterAlt >= anbefaletRåderum) {\n    anbefalinger += '<li>Du har en sund økonomi med god plads til opsparing og uforudsete udgifter.</li>';\n  }\n  \n  anbefalinger += '<li>Husk at inkludere aconto forbrug (varme, vand, el) i din huslejevurdering.</li>';\n  anbefalinger += '<li>Mange udlejere kræver at din indkomst er mindst 3 gange huslejen.</li>';\n  \n  if (maxHusleje > 10000) {\n    anbefalinger += '<li>I større byer som København kan huslejer være høje. Overvej muligheder i forstæder eller mindre byer.</li>';\n  }\n  \n  anbefalinger += '</ul>';\n  \n  document.getElementById('anbefalinger').innerHTML = anbefalinger;\n  \n  // Vis resultater\n  resultatDiv.style.display = 'block';\n  resultatDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });\n}\n\n// Event listeners\ndocument.getElementById('beregn').addEventListener('click', beregnHusleje);\n\n// Auto-beregn årlig indkomst når månedlig ændres\ndocument.getElementById('bruttoIndkomst').addEventListener('input', function() {\n  const maanedlig = parseFloat(this.value) || 0;\n  if (maanedlig > 0) {\n    document.getElementById('aarligIndkomst').value = Math.round(maanedlig * 12);\n  }\n});\n\n// Tillad Enter-tast til at beregne\ndocument.querySelectorAll('.calc-input').forEach(input => {\n  input.addEventListener('keypress', function(e) {\n    if (e.key === 'Enter') {\n      beregnHusleje();\n    }\n  });\n});",
    styles: ""
  },

    content: {
    howToUse: {
          "title": "Sådan beregner du din husleje",
          "description": "Find ud af, hvad du har råd til i husleje baseret på din indkomst.",
          "steps": [
                {
                      "step": 1,
                      "title": "Indtast din indkomst",
                      "description": "Skriv din månedlige nettoindkomst i feltet."
                },
                {
                      "step": 2,
                      "title": "Vælg huslejeprocent",
                      "description": "Vælg den procentdel af indkomst til husleje."
                },
                {
                      "step": 3,
                      "title": "Beregn husleje",
                      "description": "Klik på 'Beregn' for at se, hvad du kan betale."
                },
                {
                      "step": 4,
                      "title": "Evaluer resultatet",
                      "description": "Se dit månedlige huslejebudget i resultatfeltet."
                }
          ]
    },
    examples: [
          {
                "title": "Studerende med deltidsjob",
                "description": "En studerende arbejder deltid og vil finde en passende husleje.",
                "input": {
                      "nettoindkomst": "10.000 kr.",
                      "huslejeprocent": "30%"
                },
                "output": "3.000 kr.",
                "explanation": "Med en huslejeprocent på 30% kan den studerende betale 3.000 kr. i husleje."
          },
          {
                "title": "Par med fælles indkomst",
                "description": "Et par med en samlet månedlig indkomst ønsker at beregne deres huslejebudget.",
                "input": {
                      "nettoindkomst": "40.000 kr.",
                      "huslejeprocent": "25%"
                },
                "output": "10.000 kr.",
                "explanation": "Parret kan afsætte 10.000 kr. til husleje ved at bruge 25% af deres indkomst."
          },
          {
                "title": "Enlig forælder med fuldtidsjob",
                "description": "En enlig forælder med en fast månedlig indkomst vil finde en overkommelig husleje.",
                "input": {
                      "nettoindkomst": "25.000 kr.",
                      "huslejeprocent": "35%"
                },
                "output": "8.750 kr.",
                "explanation": "Ved at bruge 35% af indkomsten kan den enlige forælder betale 8.750 kr. i husleje."
          }
    ],
    faqs: [
          {
                "question": "Hvordan beregner jeg min husleje ud fra min indkomst?",
                "answer": "Indtast din nettoindkomst og vælg en huslejeprocent for at se, hvad du kan betale."
          },
          {
                "question": "Hvilken procentdel af min indkomst bør jeg bruge på husleje?",
                "answer": "25-30% af din indkomst er typisk anbefalet, men det afhænger af din økonomiske situation."
          },
          {
                "question": "Kan jeg bruge beregneren, hvis jeg har varierende indkomst?",
                "answer": "Ja, brug din gennemsnitlige månedlige indkomst for at få et realistisk budget."
          },
          {
                "question": "Er der andre udgifter jeg skal tage højde for udover husleje?",
                "answer": "Ja, husk at budgettere til forbrug, forsikringer, transport og opsparing."
          },
          {
                "question": "Hvordan sikrer jeg mig, at huslejeberegningen er korrekt?",
                "answer": "Sørg for at indtaste korrekte indkomsttal og vælg en realistisk huslejeprocent."
          }
    ],
    additionalInfo: {
          "title": "Forstå dit huslejebudget",
          "content": "At kende dit huslejebudget er essentielt for en sund økonomi. I Danmark anbefales det, at huslejen ikke overstiger 30% af indkomsten. Husk også at tage højde for omkostninger som depositum og forbrugsudgifter, når du planlægger dit budget."
    }
  },


  generatedAt: '2025-10-30T17:15:18.253Z',
  version: '1.0.0'
}
