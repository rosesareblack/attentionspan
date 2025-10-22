import { signal } from '@angular/core';
import { ResearchFolder } from '../../models';

// FIX: Provide valid mock data for the research library.
export const DATA: ResearchFolder[] = [
  {
    id: 'folder-5',
    type: 'folder',
    title: 'Development Strategy',
    isOpen: signal(true),
    children: [
      {
        id: 'file-5-1',
        type: 'file',
        title: 'Mobile Optimization Plan',
        content: `
          <h1 class="text-2xl font-bold mb-4">🎯 GEMINI APP BUILDER PLAN: ADHD SITE MOBILE OPTIMIZATION</h1>

          <h2 class="text-xl font-semibold mt-6 mb-3">📱 MOBILE-FIRST DESIGN FOUNDATION</h2>
          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Core Mobile-First Principles</strong></h3>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Start with 320px mobile design</strong>, then scale up to tablet (768px) and desktop (1024px+)</li>
            <li><strong>Progressive advancement</strong>: Core features first, enhance for larger screens</li>
            <li><strong>Thumb-friendly navigation</strong>: 44×44px minimum touch targets with 10px padding</li>
            <li><strong>Single-column layout</strong> as default, multi-column only when space permits</li>
          </ul>

          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>ADHD-Specific Mobile Optimizations</strong></h3>
          <pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-md text-sm my-4"><code>Key Features:
✅ Clean, minimalist layouts with clear visual hierarchy
✅ Consistent button placement across all pages
✅ Large, contrasting CTA buttons (same style/location)
✅ Minimal animations and no auto-playing media
✅ Simple language with consistent terminology
✅ Distraction-free reading modes</code></pre>

          <h2 class="text-xl font-semibold mt-6 mb-3">🏗️ GEMINI APP BUILDER IMPLEMENTATION STEPS</h2>
          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Phase 1: Foundation Setup</strong></h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Create mobile breakpoint first</strong> (320px)</li>
            <li><strong>Set up fluid grid system</strong> using CSS Grid/Flexbox</li>
            <li><strong>Implement responsive typography</strong> using <code>clamp()</code>:
              <pre class="bg-slate-100 dark:bg-slate-800 p-2 rounded-md text-sm my-2"><code>font-size: clamp(1rem, 2.5vw, 1.5rem);</code></pre>
            </li>
            <li><strong>Configure touch-friendly navigation</strong> with hamburger menu</li>
          </ol>

          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Phase 2: ADHD-Friendly Content Structure</strong></h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Card-based layout system</strong> for easy content organization</li>
            <li><strong>Progressive disclosure</strong> for hiding non-critical content</li>
            <li><strong>Clear visual hierarchy</strong> with consistent heading sizes</li>
            <li><strong>Bullet points and short paragraphs</strong> (max 75 characters per line)</li>
          </ol>

          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Phase 3: Doctor Communication Features</strong></h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>"Doc Talk" card system</strong> with pre-formatted questions</li>
            <li><strong>Quick symptom tracker</strong> with visual pain/symptom scales</li>
            <li><strong>Medication reminder interface</strong> with large, colorful buttons</li>
            <li><strong>Export/print functionality</strong> for appointment summaries</li>
          </ol>

          <h2 class="text-xl font-semibold mt-6 mb-3">📋 ADHD MYTHBUSTING CONTENT ORGANIZATION</h2>
          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Mobile-Optimized Content Structure</strong></h3>
          <pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-md text-sm my-4"><code>📱 Homepage (Mobile First):
├── Quick Access Buttons (Large, colorful)
│   ├── "Today's Symptoms"
│   ├── "Medication Tracker" 
│   ├── "Questions for Doctor"
│   └── "ADHD Facts"
├── Mythbusting Cards (Swipeable)
└── Emergency Contact Button</code></pre>

          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Desktop Enhancement</strong></h3>
          <pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-md text-sm my-4"><code>💻 Desktop View:
├── Sidebar Navigation
├── Multi-column Mythbusting Grid
├── Detailed Statistics Dashboard
└── Expanded Doctor Communication Tools</code></pre>

          <h2 class="text-xl font-semibold mt-6 mb-3">🎨 DESIGN SPECIFICATIONS</h2>
          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Color & Contrast</strong></h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>High contrast ratios (minimum 4.5:1 for text)</li>
            <li>Avoid red/green combinations for accessibility</li>
          </ul>

          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Typography</strong></h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Base font: 16px minimum on mobile</li>
            <li>Line height: 1.4-1.6x font size</li>
            <li>Sans-serif fonts for better readability</li>
            <li>Maximum 75 characters per line</li>
          </ul>

          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Interactive Elements</strong></h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Primary buttons: 48×48px minimum</li>
            <li>10px spacing between clickable elements</li>
            <li>Clear focus states for keyboard navigation</li>
            <li>Consistent button labeling across all pages</li>
          </ul>

          <h2 class="text-xl font-semibold mt-6 mb-3">🔧 GEMINI-SPECIFIC IMPLEMENTATIONS</h2>
          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Responsive Breakpoints</strong></h3>
          <pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-md text-sm my-4"><code>/* Mobile First Approach */
/* Base: 320px - 767px (Mobile) */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large Desktop */ }</code></pre>

          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Performance Optimizations</strong></h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Image optimization</strong>: Compress images, use responsive images</li>
            <li><strong>SVG icons</strong> for scalability</li>
            <li><strong>Lazy loading</strong> for content below fold</li>
            <li><strong>CDN integration</strong> for faster loading</li>
          </ol>

          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Accessibility Features</strong></h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Screen reader support</strong> with proper ARIA labels</li>
            <li><strong>Keyboard navigation</strong> throughout</li>
            <li><strong>High contrast mode</strong> option</li>
            <li><strong>Text size adjustment</strong> controls</li>
            <li><strong>Distraction-free reading mode</strong></li>
          </ol>

          <h2 class="text-xl font-semibold mt-6 mb-3">📊 DOCTOR COMMUNICATION TOOLS</h2>
          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>"Doc Talk" Card System</strong></h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Pre-formatted question cards</li>
            <li>Symptom intensity scales (1-10)</li>
            <li>Medication effectiveness tracker</li>
            <li>Side effect reporting forms</li>
          </ul>

          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Data Export Features</strong></h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>PDF generation for appointment summaries</li>
            <li>Email integration for sending reports</li>
            <li>Print-optimized layouts</li>
            <li>Secure data sharing options</li>
          </ul>

          <h2 class="text-xl font-semibold mt-6 mb-3">🧪 TESTING CHECKLIST</h2>
          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>Mobile Testing</strong></h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>[ ] Test on iOS and Android devices</li>
            <li>[ ] Verify touch target sizes</li>
            <li>[ ] Check loading speeds on 3G/4G</li>
            <li>[ ] Test with screen readers</li>
            <li>[ ] Verify keyboard navigation</li>
          </ul>

          <h3 class="text-lg font-semibold mt-4 mb-2"><strong>ADHD-Specific Testing</strong></h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>[ ] Minimize cognitive load</li>
            <li>[ ] Test distraction-free modes</li>
            <li>[ ] Verify consistent navigation</li>
            <li>[ ] Check information chunking</li>
            <li>[ ] Test emergency contact accessibility</li>
          </ul>

          <h2 class="text-xl font-semibold mt-6 mb-3">🚀 LAUNCH STRATEGY</h2>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Beta test</strong> with ADHD community members</li>
            <li><strong>A/B test</strong> different layouts for engagement</li>
            <li><strong>Gather feedback</strong> from doctors on communication tools</li>
            <li><strong>Iterate</strong> based on user testing results</li>
            <li><strong>Monitor</strong> mobile vs desktop usage patterns</li>
          </ol>
        `
      }
    ]
  },
  {
    id: 'folder-1',
    type: 'folder',
    title: 'Understanding ADHD',
    isOpen: signal(false),
    children: [
      {
        id: 'file-1-1',
        type: 'file',
        title: 'What is ADHD?',
        content: `
          <p class="mb-4">ADHD is a neurodevelopmental disorder that affects both children and adults. It is characterized by persistent patterns of inattention, hyperactivity, and impulsivity that are more frequent and severe than is typically observed in individuals at a comparable level of development.</p>
          <h3 class="text-xl font-semibold mb-2">Key Symptoms:</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Inattention:</strong> Difficulty sustaining attention, making careless mistakes, not seeming to listen, failing to finish tasks, difficulty with organization, and being easily distracted.</li>
            <li><strong>Hyperactivity-Impulsivity:</strong> Fidgeting, inability to stay seated, excessive running or climbing, talking excessively, interrupting others, and difficulty waiting for one's turn.</li>
          </ul>
        `
      },
      {
        id: 'file-1-2',
        type: 'file',
        title: 'Types of ADHD',
        content: `
          <p class="mb-4">ADHD is categorized into three primary types, or presentations:</p>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Predominantly Inattentive Presentation:</strong> Individuals have significant problems with inattention but exhibit less hyperactivity or impulsivity. They may be seen as "daydreamers."</li>
            <li><strong>Predominantly Hyperactive-Impulsive Presentation:</strong> Individuals show more symptoms of hyperactivity and impulsivity than inattention.</li>
            <li><strong>Combined Presentation:</strong> This is the most common type, where individuals have significant symptoms of both inattention and hyperactivity-impulsivity.</li>
          </ol>
        `
      },
      {
        id: 'file-1-3',
        type: 'file',
        title: 'Causes of ADHD',
        content: `
            <p class="mb-4">While the exact causes of ADHD are not fully understood, research suggests that a combination of factors plays a role. It is primarily considered a brain-based, biological disorder.</p>
            <h3 class="text-xl font-semibold mb-2">Key Factors:</h3>
            <ul class="list-disc pl-6 space-y-2">
                <li><strong>Genetics:</strong> ADHD has a strong genetic component and often runs in families.</li>
                <li><strong>Brain Structure and Function:</strong> Studies have shown differences in the brain structure and neurotransmitter systems (especially those involving dopamine and norepinephrine) of individuals with ADHD.</li>
                <li><strong>Environmental Factors:</strong> Certain factors, such as premature birth, low birth weight, and exposure to environmental toxins during pregnancy or at a young age, may increase the risk.</li>
            </ul>
            <p class="mt-4 italic">It is important to note that ADHD is not caused by poor parenting, lack of discipline, or too much screen time, although these factors can influence the severity of symptoms.</p>
        `
      }
    ]
  },
  {
    id: 'folder-4',
    type: 'folder',
    title: 'Lisdexamfetamine (Vyvanse) Analysis',
    isOpen: signal(false),
    children: [
      {
        id: 'file-4-1',
        type: 'file',
        title: 'Lisdexamfetamine Abuse Liability',
        content: `
          <h3>I. Executive Overview of Regulatory Scheduling and HAP Framework</h3>
          <h4>A. Legal and Scientific Mandates for Abuse Liability Assessment</h4>
          <p>The classification of central nervous system (CNS) stimulants under the Controlled Substances Act (CSA) is predicated on a tripartite assessment: the existence of a currently accepted medical use, the relative potential for abuse, and the likelihood of causing dependence. Lisdexamfetamine (LDX), the prodrug of D-amphetamine, is classified as a Schedule II (CII) substance, signifying a high potential for abuse which may lead to severe dependence.</p>
          <p>The FDA’s assessment prioritizes the intrinsic capacity of the drug to elicit reinforcing effects under conditions of misuse, which is why LDX remains in Schedule II despite its abuse-deterrent features.</p>

          <h4>B. Core Metrics and Pharmacokinetic (PK) Drivers of Abuse Potential</h4>
          <p>Human Abuse Potential (HAP) studies measure a drug's ability to act as a positive reinforcer. Key clinical measures include subjective effects like "drug liking." The primary driver is the rapidity and magnitude of the drug's entry into the CNS, known as the Velocity Hypothesis. Regulatory scrutiny focuses on PK parameters like peak plasma concentration (C<sub>max</sub>) and time to maximum concentration (T<sub>max</sub>).</p>

          <h3>II. Pharmacological Challenge to LDX’s Attenuated Abuse Liability Claims</h3>
          <h4>A. The Prodrug Mechanism and Routes of Administration Deterrence</h4>
          <p>LDX is a prodrug where L-lysine is conjugated to D-amphetamine. This bond must be cleaved by enzymes in red blood cells to become active. This design successfully deters abuse via non-oral routes like intravenous (IV) injection or intranasal insufflation, as these methods do not result in a faster onset or higher peak concentration than oral administration.</p>

          <h4>B. The Critical Contradiction in Oral Pharmacokinetics and Pharmacodynamics</h4>
          <p>While LDX has a slower absorption profile (delayed T<sub>max</sub>) compared to immediate-release (IR) D-amphetamine, studies show no significant differences in maximal plasma concentrations (C<sub>max</sub>) or total exposure (AUC) at equimolar doses. Consequently, peak ratings of abuse-related subjective effects like "drug liking" and "drug high" were equivalent for both LDX and D-amphetamine, suggesting that the ultimate abuse potential for oral ingestion is similar once a critical concentration is reached.</p>

          <div class="overflow-x-auto my-6">
            <table class="w-full text-sm border dark:border-slate-700">
              <caption class="font-bold text-left p-2">Table 1: Pharmacokinetic and Pharmacodynamic Comparison of LDX (100 mg) vs. D-Amphetamine (40 mg)</caption>
              <thead class="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th class="p-2 text-left font-semibold border-b dark:border-slate-700">Parameter</th>
                  <th class="p-2 text-left font-semibold border-b dark:border-slate-700">LDX (100 mg, Oral)</th>
                  <th class="p-2 text-left font-semibold border-b dark:border-slate-700">D-Amphetamine (40 mg, Oral)</th>
                  <th class="p-2 text-left font-semibold border-b dark:border-slate-700">Implication for Abuse Potential</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-slate-700"><td class="p-2">Time to Peak Concentration (T<sub>max</sub>)</td><td class="p-2">Delayed (Later by ≈1.1 hours)</td><td class="p-2">Earlier</td><td class="p-2">Attenuates immediate 'rush' but not peak feeling</td></tr>
                <tr class="border-b dark:border-slate-700"><td class="p-2">Maximal Concentration (C<sub>max</sub>)</td><td class="p-2">Equivalent Peak Levels</td><td class="p-2">Equivalent Peak Levels</td><td class="p-2">Abuse potential tied to peak concentration, not just T<sub>max</sub></td></tr>
                <tr><td class="p-2">Peak Drug Liking/High Rating</td><td class="p-2">Equivalent Peak Ratings</td><td class="p-2">Equivalent Peak Ratings</td><td class="p-2">PD is tied to C<sub>max</sub>; delayed onset does not mitigate maximal subjective effect</td></tr>
              </tbody>
            </table>
          </div>

          <h3>III. Analysis of Human Abuse Potential (HAP) Study Findings and Dose Dependency</h3>
          <p>HAP studies use experienced stimulant abusers to assess maximum theoretical abuse liability. At therapeutic-equivalent doses (LDX 100 mg vs. D-amphetamine 40 mg), LDX showed attenuated abuse liability. However, at supratherapeutic doses (LDX 150 mg), the abuse-related liking scores were statistically similar to D-amphetamine 40 mg. This confirms the protective mechanism of LDX is dose-dependent and can be overcome by oral dose escalation, justifying its Schedule II classification.</p>
        `
      },
      {
        id: 'file-4-2',
        type: 'file',
        title: 'LDX Dosing & Trial Generalizability',
        content: `
          <h3>1. The 70 mg Maximum Recommended Dosage (MRD) Ceiling</h3>
          <p>The 70 mg daily ceiling for Lisdexamfetamine (LDX) is primarily a regulatory and safety measure, not necessarily a point of optimal therapeutic efficacy. Data from adult ADHD trials indicate that clinical benefits often plateau at the 50 mg dose, with the 70 mg dose offering little additional improvement for many while increasing the risk profile. The ceiling exists because safety and efficacy have not been systematically studied above this level.</p>
          
          <h4>Pharmacokinetic (PK) Variability</h4>
          <p>The fixed-dosing schedule (not weight-based) may not provide uniform therapeutic reliability. After a 70 mg dose, weight-normalized d-amphetamine exposure (AUC and C<sub>max</sub>) was found to be 22% and 12% lower, respectively, in adult females compared to males. This suggests potential for functional under-dosing in some female patients.</p>

          <h4>Safety Endpoints</h4>
          <p>The 70 mg limit is defined by toxicity endpoints. Exceeding this dose significantly increases the risk of severe psychiatric events (psychosis, mania) and cardiovascular problems. It also markedly elevates abuse potential. The maximum dose is unreliable in patients with renal impairment, requiring mandatory dose reductions.</p>

          <h3>2. Assessment of Population Generalizability in Trials</h3>
          <p>The generalizability of trial findings is compromised because a "full range of people" was not observed. Pivotal trials for Binge Eating Disorder (BED) and ADHD imposed stringent exclusion criteria.</p>

          <h4>Demographic Homogeneity</h4>
          <p>The BED trial population was overwhelmingly white, female, and obese, severely limiting the extrapolation of findings to other demographics, such as adult males or non-obese individuals.</p>

          <h4>Exclusion of Comorbidities</h4>
          <p>Trials rigorously excluded patients with common comorbidities, including lifetime histories of psychosis, mania, severe psychiatric disorders, cardiovascular vulnerabilities, or any history of stimulant abuse. This creates an "idealized patient" cohort, limiting the predictive reliability of trial data when applied to complex patients seen in routine clinical practice.</p>
          
          <div class="overflow-x-auto my-6">
            <table class="w-full text-sm border dark:border-slate-700">
               <caption class="font-bold text-left p-2">Table 2: Demographic Scope and Restrictions in Pivotal Lisdexamfetamine Trials</caption>
              <thead class="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th class="p-2 text-left font-semibold border-b dark:border-slate-700">Indication</th>
                  <th class="p-2 text-left font-semibold border-b dark:border-slate-700">Age Range Covered</th>
                  <th class="p-2 text-left font-semibold border-b dark:border-slate-700">Key Exclusionary Criteria</th>
                  <th class="p-2 text-left font-semibold border-b dark:border-slate-700">Generalizability Limitation</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-slate-700"><td class="p-2">ADHD (All Ages)</td><td class="p-2">Children (6-12), Adolescents (13-17), Adults</td><td class="p-2">History of severe psychiatric/CV disease, Substance abuse</td><td class="p-2">Underrepresentation of complex, comorbid patients.</td></tr>
                <tr class="border-b dark:border-slate-700"><td class="p-2">Binge Eating Disorder (BED)</td><td class="p-2">Adults (18-55 years)</td><td class="p-2">Required BMI ≥ 18 and ≤45; Exclusion of AN/BN, Psychosis, CVD, ADHD.</td><td class="p-2">Highly restricted cohort; results not reliably extrapolated to non-obese, male, or non-white populations.</td></tr>
                <tr><td class="p-2">Renal Impairment</td><td class="p-2">Adults (implied)</td><td class="p-2">Severe GFR impairment or ESRD</td><td class="p-2">Dosing (30/50 mg max) confirms 70 mg is unreliable in physiologically compromised individuals.</td></tr>
              </tbody>
            </table>
          </div>
        `
      },
       {
        id: 'file-4-3',
        type: 'file',
        title: 'Vyvanse Coverage Appeals Precedent',
        content: `
          <h3>1. Foundational Overview: The Regulatory Framework</h3>
          <p>The Affordable Care Act (ACA) guarantees consumers the right to an external appeal of an insurer's denial to an Independent Review Organization (IRO), whose decision is legally binding. For psychopharmacological denials, IROs determine "medical necessity" based on prevailing medical standards and credible scientific evidence.</p>
          <p>For Medicare Part D, coverage for a drug is mandated if prescribed for a “medically-accepted indication,” which includes FDA-approved uses or uses supported by citation in specified compendia (e.g., AHFS-DI, DRUGDEX). This sets a powerful precedent for off-label use appeals nationwide.</p>

          <h3>2. High-Stakes Clinical Denial Arguments</h3>
          <h4>Justifying Off-Label Dosing (>70 mg/Day)</h4>
          <p>While New York IROs have accepted off-label doses like 80-90 mg/day based on demonstrated long-term benefit, other jurisdictions are warier. Administrative actions, such as from the California Medical Board, have cited prescribing excessive quantities (e.g., 140 mg/day) as a deviation from the standard of care. This suggests a legal-clinical threshold where marginal off-label doses may be acceptable with strong justification, but extreme doses are professionally risky.</p>
          
          <h4>Formulary Exceptions Based on Unique Prodrug Mechanism</h4>
          <p>A powerful strategy to bypass step therapy (requiring failure of cheaper generics) is to argue that Vyvanse's unique prodrug mechanism makes it pharmacologically non-equivalent to generic alternatives. The prodrug's slow, consistent conversion to d-amphetamine offers a more predictable effect and reduced abuse potential, which can be argued as a clinical necessity for certain patients, thus justifying a formulary exception.</p>

          <h3>3. Strategic Considerations in Co-morbidity Cases</h3>
          <p>Appeals are strengthened when a patient has co-morbid diagnoses. Lisdexamfetamine is the only medication FDA-approved for moderate to severe Binge Eating Disorder (BED) in adults. If an insurer denies Vyvanse for ADHD, an appeal can pivot to the on-label BED indication (if the patient is diagnosed), substantially increasing the payer's burden of proof for the denial.</p>
          
          <h3>4. Non-New York Precedent Summary</h3>
          <p>Analysis of actions outside of New York provides insight into appeal strategies:</p>
          <ul>
            <li><strong>Federal Judicial Precedent (11th Circuit):</strong> Confirms a mandate for Medicare Part D to cover off-label uses supported by recognized compendia, creating a strong legal defense for such prescriptions.</li>
            <li><strong>State Scrutiny (Texas):</strong> A major Medicaid fraud settlement involving Vyvanse suggests payers in Texas are likely to enforce very strict utilization management, requiring rigorous documentation for appeals.</li>
            <li><strong>State-Specific Limits (Massachusetts):</strong> MassHealth enforces specific quantity and supply limits for stimulants, meaning appeals in this state must often focus on justifying exceptions to these codified rules.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 'folder-2',
    type: 'folder',
    title: 'Management Strategies',
    isOpen: signal(false),
    children: [
      {
        id: 'file-2-1',
        type: 'file',
        title: 'Behavioral Therapy',
        content: `
          <p class="mb-4">Behavioral therapy is a cornerstone of ADHD treatment. It focuses on teaching strategies to manage symptoms. Key components include:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Cognitive Behavioral Therapy (CBT):</strong> Helps change negative thought patterns and develop coping mechanisms for challenges with executive functions like planning and emotional regulation.</li>
            <li><strong>Parent Training:</strong> Equips parents with tools to encourage positive behavior and manage challenging ones using positive reinforcement and structured routines.</li>
            <li><strong>Social Skills Training:</strong> Teaches individuals how to interact more effectively with peers, understand social cues, and build healthier relationships.</li>
          </ul>
        `
      },
      {
        id: 'file-2-2',
        type: 'file',
        title: 'Medication',
        content: `
          <p class="mb-4">Medication can be highly effective in managing core ADHD symptoms by helping to balance brain chemistry. The two main types are:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Stimulants:</strong> (e.g., methylphenidate, amphetamines) These are the most commonly prescribed medications and work by increasing levels of certain neurotransmitters (dopamine and norepinephrine) in the brain.</li>
            <li><strong>Non-Stimulants:</strong> (e.g., atomoxetine, guanfacine) These are used when stimulants are not effective or cause problematic side effects. They work differently than stimulants but can also improve attention and reduce impulsivity.</li>
          </ul>
          <p class="mt-4 italic">It's crucial to work with a qualified healthcare professional to determine the right medication, dosage, and treatment plan.</p>
        `
      }
    ]
  },
  {
    id: 'folder-3',
    type: 'folder',
    title: 'ADHD in Adults',
    isOpen: signal(false),
    children: [
        {
            id: 'file-3-1',
            type: 'file',
            title: 'Symptoms in Adults',
            content: `
                <p class="mb-4">ADHD symptoms can manifest differently in adults than in children. Hyperactivity often becomes less overt and may present as a feeling of internal restlessness.</p>
                <h3 class="text-xl font-semibold mb-2">Common Adult Symptoms:</h3>
                <ul class="list-disc pl-6 space-y-2">
                    <li><strong>Difficulty with executive functions:</strong> Chronic procrastination, trouble starting and finishing projects, and poor time management.</li>
                    <li><strong>Disorganization:</strong> Cluttered living/work spaces, frequently losing items, and difficulty keeping track of appointments.</li>
                    <li><strong>Emotional Dysregulation:</strong> Impulsivity, low frustration tolerance, frequent mood swings, and difficulty managing stress.</li>
                    <li><strong>Relationship and Career Challenges:</strong> Problems with maintaining relationships, frequent job changes, and underachievement at work.</li>
                </ul>
            `
        }
    ]
  }
];