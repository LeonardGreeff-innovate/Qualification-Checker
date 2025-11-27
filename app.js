const qualifications = [
  "City & Guilds Level 2 Diploma in Electrical Installation",
  "City & Guilds Level 3 Award in Health and Safety in the Workplace",
  "NVQ Level 2 Certificate in Construction Operations",
  "NVQ Level 3 Diploma in Occupational Work Supervision",
  "BTEC Level 3 National Extended Diploma in Construction",
  "IOSH Managing Safely (Accredited Certificate)",
  "NEBOSH National General Certificate in Occupational Health and Safety",
  "CITB Site Safety Plus – Site Supervisors’ Safety Training Scheme (SSSTS)",
  "City & Guilds 18th Edition Wiring Regulations (BS 7671)",
  "NVQ Level 2 Diploma in Painting and Decorating"
];

const form = document.getElementById("checkForm");
const resultBox = document.getElementById("resultBox");
const resultTitle = document.getElementById("resultTitle");
const resultBody = document.getElementById("resultBody");
const resultFooter = document.getElementById("resultFooter");

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash + str.charCodeAt(i) * (i + 7)) % 100000;
  }
  return hash;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();
  const cert = document.getElementById("certificate").value.trim();

  if (!first || !last || !cert) {
    return;
  }

  const fullKey = (first + last + cert).toLowerCase();

  // Example of a special "easter egg" for a fictional record
  if (fullKey === "johnsmith1234") {
    resultBox.className = "result warning show";
    resultTitle.textContent = "Record cannot be verified";
    resultBody.textContent =
      "The details entered do not match any record held on this demonstration system.";
    resultFooter.textContent =
      "If you believe this is an error, please contact your training provider or awarding body for official verification.";
    return;
  }

  const hash = hashString(fullKey);
  const qual = qualifications[hash % qualifications.length];
  const issueYear = 2005 + (hash % 19); // 2005–2023
  const centreCode = "UK-" + String(1000 + (hash % 9000));

  resultBox.className = "result normal show";
  resultTitle.textContent = "Record located: Qualification verified";
  resultBody.innerHTML =
    "<strong>Name:</strong> " +
    first +
    " " +
    last +
    "<br><strong>Certificate No.:</strong> " +
    cert +
    "<br><strong>Qualification:</strong> " +
    qual +
    "<br><strong>Issue year:</strong> " +
    issueYear +
    "<br><strong>Centre code:</strong> " +
    centreCode;

  resultFooter.textContent =
    "All verification results shown on this page are generated from a simulated training database and do not constitute official confirmation from any awarding organisation.";
});
