import type { GeneratedRoutine } from './routine-generator';

interface Lead {
  id: string;
  email: string;
  name: string | null;
  hairType: string;
}

// PDF generation using react-pdf
// This creates a comprehensive PDF routine guide

export async function generateRoutinePDF(
  lead: Lead,
  routine: GeneratedRoutine
): Promise<Buffer> {
  // Note: This is a simplified version
  // In production, you'd use @react-pdf/renderer to generate actual PDFs
  // For now, we'll create an HTML-based approach that can be converted to PDF

  const html = generatePDFHTML(lead, routine);

  // In production, you would:
  // 1. Use puppeteer to convert HTML to PDF, or
  // 2. Use @react-pdf/renderer to build PDF directly, or
  // 3. Use a service like PDFShift, DocRaptor, etc.

  // For this MVP, we'll return a placeholder
  // You can implement actual PDF generation based on your deployment environment

  return Buffer.from(html, 'utf-8');
}

function generatePDFHTML(lead: Lead, routine: GeneratedRoutine): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hair Care Routine - ${lead.name || 'Your'} ${lead.hairType} Hair</title>
  <style>
    @page {
      size: A4;
      margin: 40px;
    }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #333;
    }
    h1 {
      color: #8B0000;
      font-size: 24pt;
      margin-bottom: 10px;
      border-bottom: 3px solid #8B0000;
      padding-bottom: 10px;
    }
    h2 {
      color: #8B0000;
      font-size: 16pt;
      margin-top: 25px;
      margin-bottom: 10px;
    }
    h3 {
      color: #333;
      font-size: 13pt;
      margin-top: 15px;
      margin-bottom: 8px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .subtitle {
      color: #666;
      font-size: 10pt;
    }
    .challenge-box {
      background: #fff3cd;
      border-left: 4px solid #8B0000;
      padding: 15px;
      margin: 20px 0;
      page-break-inside: avoid;
    }
    .routine-step {
      margin: 10px 0;
      padding-left: 25px;
      position: relative;
    }
    .routine-step:before {
      content: "•";
      position: absolute;
      left: 5px;
      color: #8B0000;
      font-weight: bold;
      font-size: 14pt;
    }
    .tip {
      color: #666;
      font-size: 9pt;
      margin-left: 20px;
      font-style: italic;
    }
    .product {
      background: #f9f9f9;
      padding: 12px;
      margin: 10px 0;
      border-radius: 5px;
      page-break-inside: avoid;
    }
    .product-name {
      font-weight: bold;
      color: #8B0000;
    }
    .product-usage {
      font-size: 9pt;
      color: #666;
      margin-top: 5px;
    }
    .hack {
      margin: 8px 0;
      padding-left: 20px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #ddd;
      font-size: 9pt;
      color: #666;
      page-break-before: avoid;
    }
    .cta {
      background: linear-gradient(135deg, #8B0000 0%, #6B0000 100%);
      color: white;
      padding: 20px;
      margin: 30px 0;
      border-radius: 10px;
      text-align: center;
      page-break-inside: avoid;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <h1>Your Personalized Hair Care Routine</h1>
    <div class="subtitle">Created for: ${lead.name || 'You'}</div>
    <div class="subtitle">Profile: ${routine.profileId.replace(/_/g, ' ')}</div>
    <div class="subtitle">By Logan at Coug Cuts | Washington State University</div>
  </div>

  <!-- Challenge Section -->
  <div class="challenge-box">
    <h3 style="margin-top: 0; color: #8B0000;">Your Specific Challenge</h3>
    <p style="margin: 0;">${routine.challenge}</p>
  </div>

  <!-- Morning Routine -->
  <h2>Custom Morning Routine (${routine.estimatedTime.morning} minutes)</h2>
  ${routine.morningRoutine.map(step => `
    <div class="routine-step">
      ${step.step}
      ${step.tip ? `<div class="tip">💡 ${step.tip}</div>` : ''}
    </div>
  `).join('')}

  <!-- Wash Day Routine -->
  <h2 style="page-break-before: always;">Custom Wash Day Routine (${routine.estimatedTime.washDay} minutes)</h2>
  ${routine.washDayRoutine.map(step => `
    <div class="routine-step">
      ${step.step}
      ${step.tip ? `<div class="tip">💡 ${step.tip}</div>` : ''}
    </div>
  `).join('')}

  <!-- Products -->
  <h2 style="page-break-before: always;">Your Personalized Product List</h2>
  <p style="color: #666; margin-bottom: 15px;">
    Budget Tier: ${routine.monthlyCost < 40 ? 'Budget-Friendly' : routine.monthlyCost < 80 ? 'Mid-Range' : 'Premium'}
    (~$${routine.monthlyCost}/month)
  </p>
  ${routine.products.map(product => `
    <div class="product">
      <div class="product-name">
        ${product.category.toUpperCase()}: ${product.name} ($${product.price})
      </div>
      <div style="font-size: 9pt; color: #666; margin-top: 3px;">
        ${product.description}
      </div>
      <div class="product-usage">
        <strong>How to use:</strong> ${product.usage}
      </div>
    </div>
  `).join('')}

  <!-- Hacks & Tips -->
  <h2 style="page-break-before: always;">Your Hacks & Tips</h2>
  ${routine.hacks.map(hack => `
    <div class="hack">• ${hack}</div>
  `).join('')}

  <!-- WSU-Specific Tips -->
  <h2>WSU Campus Hacks</h2>
  ${routine.wsuTips.map(tip => `
    <div class="hack">• ${tip}</div>
  `).join('')}

  <!-- CTA -->
  <div class="cta">
    <h3 style="margin-top: 0; color: white;">Ready to level up your hair game even more?</h3>
    <p style="margin: 15px 0; color: rgba(255,255,255,0.9);">
      📅 Book a consultation at Coug Cuts: cougcuts.com/book<br>
      💇 Get a cut that works WITH your routine: $40/cut<br>
      📧 Questions? Email: logan@cougcuts.com<br>
      📱 Follow us: @cougcuts
    </p>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p style="text-align: center; margin-bottom: 10px;">
      <strong>Coug Cuts | Washington State University</strong>
    </p>
    <p style="text-align: center; font-size: 8pt; color: #999;">
      P.S. Screenshot this routine and show it at your appointment for a personalized product recommendation session!
    </p>
    <p style="text-align: center; margin-top: 20px; font-size: 8pt;">
      Generated on ${new Date().toLocaleDateString()} | Profile ID: ${routine.profileId}
    </p>
  </div>

</body>
</html>
  `;
}

// Upload PDF to storage (implement based on your storage solution)
export async function uploadPDF(
  leadId: string,
  pdfBuffer: Buffer
): Promise<string> {
  // In production, upload to:
  // - Cloudflare R2
  // - AWS S3
  // - Vercel Blob Storage
  // - Supabase Storage

  // For now, return a placeholder URL
  const filename = `routine_${leadId}_${Date.now()}.pdf`;
  const url = `https://storage.cougcuts.com/routines/${filename}`;

  console.log(`PDF would be uploaded: ${filename}`);

  return url;
}
