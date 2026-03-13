import type { Course } from '../types';

export const courses: Course[] = [
  // ─── Course 1: Foundations of Strength Training ───────────────────────────
  {
    id: 'strength-foundations',
    title: 'Foundations of Strength Training',
    description:
      'Learn the core principles that underpin all effective resistance training — from progressive overload to recovery — grounded in exercise science.',
    category: 'strength-training',
    difficulty: 'beginner',
    estimatedMinutes: 45,
    relatedGoals: ['hypertrophy', 'general-fitness'],
    tags: ['progressive overload', 'hypertrophy', 'periodization', 'RPE'],
    coverEmoji: '🏋️',
    modules: [
      // ── Module 1: Progressive Overload ──────────────────────────────────────
      {
        id: 'progressive-overload',
        title: 'Progressive Overload',
        lessons: [
          {
            id: 'po-core-principle',
            title: 'The Core Principle',
            estimatedMinutes: 5,
            content: `Progressive overload is the most fundamental principle in strength and muscle development. Put simply: gradually increase the demand placed on your muscles over time so the body must keep adapting.

The physiological basis comes from Hans Selye's General Adaptation Syndrome (GAS). When a new stress is applied, the body passes through three stages — alarm (initial shock), resistance (adaptation), and exhaustion (if overloaded without recovery). Intelligent training applies enough stress to trigger adaptation without pushing into exhaustion.

In practice, performing 3 sets of 10 at 60 kg every session indefinitely will eventually stop producing results because the stimulus is no longer novel. The body is remarkably efficient — it adapts precisely to what it is asked to do, and no more.

Research by Schoenfeld (2010) confirms that progressive increases in training volume and load are the primary drivers of both strength gains (via neural adaptations) and hypertrophy (via structural changes in muscle fiber size and cross-sectional area).`,
            keyPoints: [
              'Progressive overload means continuously challenging muscles beyond their current capacity.',
              'Without increasing challenge, the body stops adapting — a state called accommodation.',
              'Both load (weight) and volume (sets × reps) can be progressed.',
              'Adaptations include neural efficiency gains (strength) and muscle fiber growth (hypertrophy).',
            ],
            references: [
              {
                title:
                  'The Mechanisms of Muscle Hypertrophy and Their Application to Resistance Training',
                authors: 'Schoenfeld BJ',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/20847704/',
                type: 'journal',
              },
              {
                title:
                  'ACSM Position Stand: Progression Models in Resistance Training for Healthy Adults',
                authors: 'Kraemer WJ, Adams K, Cafarelli E, et al.',
                journal: 'Medicine & Science in Sports & Exercise',
                year: 2002,
                url: 'https://pubmed.ncbi.nlm.nih.gov/11828249/',
                type: 'guideline',
              },
            ],
          },
          {
            id: 'po-how-to-apply',
            title: 'How to Apply Progressive Overload',
            estimatedMinutes: 5,
            content: `There are several ways to apply progressive overload. Understanding them gives flexibility to keep progressing even when one pathway stalls.

**1. Increase load (weight).** The most straightforward approach — add weight to the bar. For beginners, linear progression (adding small amounts each session) is highly effective. Typical guidance suggests adding 2–5% to compound lifts once you hit the top of your rep range across all sets.

**2. Increase reps at the same load.** Work from 3 × 8 up to 3 × 12 before increasing weight. This double progression method — extend reps, then add load — is practical and sustainable.

**3. Increase sets (volume).** Adding a set raises total training volume (sets × reps × weight). A meta-analysis by Krieger (2010) found a clear dose-response relationship between volume and hypertrophy — more sets produce more growth, up to a recoverable threshold.

**4. Improve technique and range of motion.** Executing a lift through full range of motion increases the stretch stimulus and mechanical tension on muscle tissue — both proven drivers of hypertrophy. Cleaner technique qualifies as genuine progression.

For all of this to work, tracking a training log (sets, reps, loads per session) is the single most important habit. You can only beat what you can measure.`,
            keyPoints: [
              'Progressive overload can be applied via load, reps, sets, density, or technique.',
              'Double progression: extend reps to the top of a target range, then increase load.',
              'A training log is essential — you can only beat your previous performance if you recorded it.',
              'Volume has a dose-response relationship with hypertrophy up to maximum recoverable volume.',
            ],
            references: [
              {
                title:
                  'Single vs. Multiple Sets of Resistance Exercise for Muscle Hypertrophy: A Meta-Analysis',
                authors: 'Krieger JW',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/20093963/',
                type: 'meta-analysis',
              },
            ],
          },
        ],
        quiz: {
          id: 'po-quiz',
          questions: [
            {
              id: 'po-q1',
              question:
                'What happens when a training stimulus stays the same week after week?',
              options: [
                'Muscle growth accelerates because the muscles become more efficient',
                'Adaptation slows and eventually plateaus — the body stops needing to change',
                'Strength decreases because the muscles atrophy without new stimulus',
                'Recovery improves because the body grows accustomed to the stress',
              ],
              correctIndex: 1,
              explanation:
                "The body adapts precisely to the demands placed on it. Once it has adapted to a given stimulus, there is no new signal to trigger further change — this is called accommodation. Progressive overload exists specifically to prevent it.",
            },
            {
              id: 'po-q2',
              question:
                'Which of the following best describes "double progression"?',
              options: [
                'Increasing the weight every session regardless of reps completed',
                'Training each muscle group twice per week',
                'Working from 3 × 8 up to 3 × 12 at the same weight, then increasing the load',
                'Reducing rest times while keeping load and volume constant',
              ],
              correctIndex: 2,
              explanation:
                'Double progression means first extending reps to the top of a target range (e.g., 8–12), then increasing load and returning to the lower end. It is a practical, sustainable model for managing progression.',
            },
            {
              id: 'po-q3',
              question:
                'Which approach provides the most direct evidence of progressive overload over time?',
              options: [
                'Measuring bodyweight daily',
                'Rating how hard each session felt (1–10)',
                'Keeping a detailed training log with sets, reps, and loads',
                'Tracking the number of different exercises per session',
              ],
              correctIndex: 2,
              explanation:
                'A training log is the most direct way to verify consistent progressive overload. Without tracking, it is easy to unknowingly stagnate. You can only beat your previous performance if you know what it was.',
            },
          ],
        },
      },

      // ── Module 2: Rep Ranges ─────────────────────────────────────────────────
      {
        id: 'rep-ranges',
        title: 'Rep Ranges & Muscle Adaptations',
        lessons: [
          {
            id: 'rr-continuum',
            title: 'The Rep Range Continuum',
            estimatedMinutes: 6,
            content: `Different rep ranges drive different physiological adaptations — though there is far more overlap than traditionally thought.

**Low reps (1–5): Strength and neural adaptations.** Heavy, low-rep training primarily drives improvements in motor unit recruitment, firing rate, and inter-muscular coordination. These neural adaptations happen quickly and explain why beginners get much stronger before they look visibly bigger.

**Moderate reps (6–12): The hypertrophy sweet spot (historically).** This range balances sufficient mechanical tension with enough metabolic stress and time under tension to drive hypertrophic signaling. For decades it was considered uniquely optimal for muscle building.

**High reps (15–30+): Metabolic stress and muscular endurance.** Higher reps with lighter loads elevate metabolic stress and cell swelling. A landmark 2017 meta-analysis by Schoenfeld et al. found that, when sets are taken close to failure, moderate and high rep ranges produce similar hypertrophy — challenging the idea that 6–12 is uniquely superior.

**The practical takeaway:** For hypertrophy, a broad rep range (5–30) trained close to failure is effective. For maximal strength, lower-rep heavier loading is more specific. Most well-designed programs include a mix.`,
            keyPoints: [
              'Low reps (1–5) primarily develop maximal strength through neural adaptations.',
              'Moderate (6–12) and high (15–30) reps produce similar hypertrophy when trained close to failure.',
              'Proximity to failure matters more than the specific rep range for building muscle.',
              'A variety of rep ranges provides both strength and hypertrophy stimuli.',
            ],
            references: [
              {
                title:
                  'Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training: A Systematic Review and Meta-Analysis',
                authors: 'Schoenfeld BJ, Grgic J, Ogborn D, Krieger JW',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2017,
                url: 'https://pubmed.ncbi.nlm.nih.gov/28834797/',
                type: 'meta-analysis',
              },
            ],
          },
          {
            id: 'rr-rpe',
            title: 'Training Intensity with RPE',
            estimatedMinutes: 4,
            content: `RPE — Rate of Perceived Exertion — quantifies how hard a set feels relative to your maximum. In resistance training it is typically expressed on a 1–10 scale, where 10 is absolute failure and 8 means roughly 2 reps left in reserve (also expressed as RIR: Reps In Reserve).

Research by Helms et al. (2016) validated that trained individuals can accurately self-regulate intensity using RPE, and that training consistently in the RPE 7–9 range (1–3 RIR) is effective for both strength and hypertrophy while managing fatigue and injury risk.

Training to absolute failure every set is not necessary and accumulates excess fatigue. Conversely, leaving 5+ reps in reserve significantly reduces the hypertrophic stimulus. The evidence supports the idea that "effective reps" — those closest to failure — drive the most adaptation.

For practical application: beginners should stay at RPE 7–8 while learning technique. Intermediate and advanced trainees can incorporate more RPE 8–9 work, with occasional sets to failure used strategically.`,
            keyPoints: [
              'RPE 10 = absolute failure; RPE 8 = 2 reps left in reserve (2 RIR).',
              'Training in the RPE 7–9 range balances hypertrophic stimulus with fatigue management.',
              'Sets closest to failure ("effective reps") are believed to drive the most hypertrophic signal.',
              'Beginners should prioritize technique at lower RPE before pushing high intensities.',
            ],
            references: [
              {
                title:
                  'Rating of Perceived Exertion as a Method of Volume Autoregulation Within a Periodized Program',
                authors: 'Helms ER, Cronin J, Storey A, Zourdos MC',
                journal: 'Strength and Conditioning Journal',
                year: 2016,
                url: 'https://pubmed.ncbi.nlm.nih.gov/26891420/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'rr-quiz',
          questions: [
            {
              id: 'rr-q1',
              question:
                'According to recent meta-analyses, what is the most important variable for building muscle across different rep ranges?',
              options: [
                'Using a weight that is exactly 70–80% of your 1-rep max',
                'Performing exactly 3 sets of 8–12 reps per exercise',
                'Training close to failure, regardless of rep range',
                'Resting exactly 60–90 seconds between sets',
              ],
              correctIndex: 2,
              explanation:
                'Schoenfeld et al. (2017) showed light, moderate, and heavy loads produce similar hypertrophy when sets are taken close to failure. Proximity to failure — not a specific rep count — is the key driver of the hypertrophic stimulus.',
            },
            {
              id: 'rr-q2',
              question: 'An RPE of 8 during a set means:',
              options: [
                'The set felt moderate and you stopped with 5+ reps left',
                'You reached complete muscular failure on the last rep',
                'You finished the set with approximately 2 reps left in reserve',
                'Your heart rate was at 80% of maximum during the set',
              ],
              correctIndex: 2,
              explanation:
                'On the RIR-based RPE scale, RPE 8 = 2 reps in reserve. You could have completed 2 more reps before technical failure. This intensity is within the recommended RPE 7–9 range for most working sets.',
            },
            {
              id: 'rr-q3',
              question:
                'Which rep range is most appropriate for developing maximum strength expression?',
              options: [
                'High reps (15–30) to maximize metabolic stress',
                'Low reps (1–5) with heavy loads',
                'Moderate reps (8–12) to balance strength and hypertrophy',
                'All rep ranges produce identical maximal strength gains',
              ],
              correctIndex: 1,
              explanation:
                'Low-rep heavy training is most specific to maximal strength because it drives the neural adaptations — motor unit recruitment and rate coding — that most directly improve 1RM force output. Higher rep training still builds strength, but low-rep training is more specific to that quality.',
            },
          ],
        },
      },

      // ── Module 3: Recovery ───────────────────────────────────────────────────
      {
        id: 'recovery-adaptation',
        title: 'Recovery & the Adaptation Cycle',
        lessons: [
          {
            id: 'ra-sra',
            title: 'The Stimulus–Recovery–Adaptation Cycle',
            estimatedMinutes: 6,
            content: `Every time you train, you are not directly building muscle in the gym — you are creating the stimulus that triggers adaptation during recovery. Understanding this cycle is essential to structuring effective training.

**Stimulus.** Training creates micro-damage to muscle fibers and depletes energy substrates. This disruption triggers biochemical signals — including mTOR pathway activation and satellite cell recruitment — that initiate repair and growth.

**Recovery.** In the hours and days after training, the body repairs damaged tissue, replenishes glycogen stores, and synthesizes new muscle protein. This is where actual gains occur. Recovery requires adequate sleep, protein, and calories.

**Adaptation (Supercompensation).** If recovery is complete, repaired tissue is slightly stronger or larger than before — the body "over-shoots" its previous baseline to better handle future stress. This is supercompensation, and it is the fundamental mechanism behind long-term training progress.

Timing matters: retraining too early compounds fatigue and impairs adaptation. Too late and the supercompensation window closes, returning you to baseline. Optimal frequency aims to restimulate the muscle while supercompensation is still elevated. Research suggests training each muscle group twice per week is an effective minimum.`,
            keyPoints: [
              'Gains occur during recovery, not during the workout itself.',
              'Sleep, protein, and caloric sufficiency are the raw materials for adaptation.',
              'Supercompensation: the body rebuilds tissue slightly above its previous baseline.',
              'Retraining too early accumulates fatigue; too late and supercompensation fades.',
              'Training each muscle 2× per week is an evidence-based minimum frequency for hypertrophy.',
            ],
            references: [
              {
                title:
                  'Effects of Resistance Training Frequency on Measures of Muscle Hypertrophy: A Systematic Review and Meta-Analysis',
                authors: 'Schoenfeld BJ, Ogborn D, Krieger JW',
                journal: 'Sports Medicine',
                year: 2016,
                url: 'https://pubmed.ncbi.nlm.nih.gov/27102172/',
                type: 'meta-analysis',
              },
            ],
          },
        ],
        quiz: {
          id: 'ra-quiz',
          questions: [
            {
              id: 'ra-q1',
              question: 'When do muscles actually grow and strengthen?',
              options: [
                'During the workout, as fibers are being challenged under load',
                'Immediately after the final set of the session',
                'During recovery periods between training sessions',
                'Only during deep sleep on the night of the workout',
              ],
              correctIndex: 2,
              explanation:
                'Muscle growth occurs during recovery — not during the workout. Training provides the stimulus (mechanical tension, micro-damage, metabolic stress). Recovery — sleep, protein, calories — provides the conditions for protein synthesis and adaptation to occur.',
            },
            {
              id: 'ra-q2',
              question: 'What is "supercompensation" in the context of training?',
              options: [
                'Performing more volume than recommended to speed up gains',
                'The body adapting to a stress level slightly above its previous baseline',
                'Adding supplements to accelerate the recovery process',
                'Training two muscle groups in the same session to save time',
              ],
              correctIndex: 1,
              explanation:
                "Supercompensation is the phenomenon where, after a training stimulus and adequate recovery, the body rebuilds itself slightly above its previous baseline — becoming marginally stronger or more capable than before. It's the foundation of all long-term training progress.",
            },
            {
              id: 'ra-q3',
              question:
                'Research suggests training each muscle group at least how often per week for optimal hypertrophy?',
              options: [
                'Once per week (one dedicated session per muscle group)',
                'Twice per week (2 sessions targeting each muscle group)',
                'Every day — daily stimulation maximizes the growth signal',
                'Three or more times — anything less produces minimal adaptation',
              ],
              correctIndex: 1,
              explanation:
                'A meta-analysis by Schoenfeld et al. (2016) found training each muscle 2× per week produces superior hypertrophy compared to 1× per week when volume is equated. Daily training of the same muscle groups is generally impractical and risks insufficient recovery.',
            },
          ],
        },
      },
    ],
  },

  // ─── Course 2: Nutrition Foundations ─────────────────────────────────────
  {
    id: 'nutrition-foundations',
    title: 'Nutrition 101',
    description:
      'Understand the science behind what you eat — macronutrients, energy balance, and evidence-based strategies for performance and body composition.',
    category: 'nutrition',
    difficulty: 'beginner',
    estimatedMinutes: 40,
    relatedGoals: ['hypertrophy', 'fat-loss', 'general-fitness'],
    tags: ['protein', 'calories', 'macros', 'energy balance'],
    coverEmoji: '🥗',
    modules: [
      // ── Module 1: Macronutrients ──────────────────────────────────────────────
      {
        id: 'macronutrients',
        title: 'The Three Macronutrients',
        lessons: [
          {
            id: 'macro-protein',
            title: 'Protein: The Building Block',
            estimatedMinutes: 5,
            content: `Protein is made up of amino acids — the structural units of muscle tissue, enzymes, and hormones. When you eat protein, it is digested into amino acids and used to build and repair tissue based on the body's current needs.

For people who train, protein serves two critical roles: providing substrate (amino acids) for muscle protein synthesis (MPS), and being highly satiating, which helps manage total caloric intake.

How much do you actually need? Older RDA guidelines (0.8 g/kg/day) were designed to prevent deficiency in sedentary populations — not to optimize body composition. For individuals engaged in regular resistance training, research consistently supports intakes of **1.6–2.2 g per kg of body weight per day** as optimal for maximizing MPS.

A landmark meta-analysis by Morton et al. (2018) analyzed 49 studies and found that protein intakes beyond approximately 1.62 g/kg/day produced no further significant gains in fat-free mass. For a practical safety margin, targeting 2.0 g/kg is reasonable and well-tolerated.

Distribution also matters. Research by Moore et al. (2009) suggests 0.25–0.40 g/kg of protein per meal optimally stimulates MPS. Spreading protein across 4–5 meals may modestly outperform consuming the same total in 1–2 large servings.`,
            keyPoints: [
              'Protein provides amino acids for muscle protein synthesis (MPS) and is highly satiating.',
              'The RDA (0.8 g/kg) is for sedentary populations — active individuals benefit from more.',
              'Research supports 1.6–2.2 g/kg/day for those doing regular resistance training.',
              'Spreading protein across 4–5 meals per day may modestly improve MPS stimulation.',
            ],
            references: [
              {
                title:
                  'A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength',
                authors: 'Morton RW, Murphy KT, McKellar SR, et al.',
                journal: 'British Journal of Sports Medicine',
                year: 2018,
                url: 'https://pubmed.ncbi.nlm.nih.gov/28698222/',
                type: 'meta-analysis',
              },
              {
                title:
                  'Ingested protein dose response of muscle and albumin protein synthesis after resistance exercise',
                authors: 'Moore DR, Robinson MJ, Fry JL, et al.',
                journal: 'American Journal of Clinical Nutrition',
                year: 2009,
                url: 'https://pubmed.ncbi.nlm.nih.gov/19056590/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'macro-carbs',
            title: 'Carbohydrates: Fuel for Performance',
            estimatedMinutes: 5,
            content: `Carbohydrates are the body's preferred fuel for high-intensity activity. After digestion, glucose is either used immediately or stored as glycogen in the liver and muscles. Muscle glycogen is the primary fuel for resistance training and most forms of intense exercise.

**Glycogen and performance.** Research consistently shows that muscle glycogen availability directly impacts training performance. Low glycogen states reduce volume capacity, power output, and mental focus during sessions. For active individuals, adequate carbohydrate intake supports better training quality — which drives better long-term adaptations.

**Protein sparing.** When carbohydrate intake is adequate, the body preferentially uses glucose for energy rather than converting protein via gluconeogenesis. This "protein-sparing" effect means more dietary protein reaches muscle tissue for repair and growth.

**Insulin and nutrient partitioning.** Carbohydrates stimulate insulin secretion, which facilitates glucose uptake into muscle cells and helps shuttle amino acids into muscle tissue — amplifying the anabolic effect of post-exercise nutrition.

For most active individuals, evidence-based guidance supports 3–7 g/kg/day of carbohydrates, with higher intakes appropriate during periods of intensive training. The type of carbohydrate matters far less than total intake and meal timing relative to training.`,
            keyPoints: [
              'Muscle glycogen — stored carbohydrate — is the primary fuel for resistance training.',
              'Low glycogen states impair volume capacity, strength output, and focus.',
              'Adequate carbohydrates "spare" protein for muscle repair and synthesis.',
              'Active individuals typically benefit from 3–7 g/kg/day, varying with training load.',
            ],
            references: [
              {
                title:
                  'International Society of Sports Nutrition Position Stand: Nutrient Timing',
                authors: 'Kerksick CM, Arent S, Schoenfeld BJ, et al.',
                journal: 'Journal of the International Society of Sports Nutrition',
                year: 2017,
                url: 'https://pubmed.ncbi.nlm.nih.gov/28919842/',
                type: 'guideline',
              },
            ],
          },
          {
            id: 'macro-fats',
            title: 'Dietary Fat: Essential, Not the Enemy',
            estimatedMinutes: 4,
            content: `Dietary fat has been vilified and rehabilitated multiple times in public health messaging. The current scientific consensus is more nuanced: fat is essential, and cutting it too low has clear consequences.

**Hormonal health.** Dietary fat — particularly saturated and monounsaturated fat — is necessary for testosterone and other steroid hormone production. Studies have shown that very low-fat diets (below ~15% of calories from fat) are associated with reduced testosterone levels, which can impair muscle building and recovery.

**Cell membrane integrity.** Every cell in the body has a lipid bilayer membrane. Adequate fat intake — especially omega-3 fatty acids — supports membrane fluidity, anti-inflammatory signaling, and overall cell function.

**Fat-soluble vitamins.** Vitamins A, D, E, and K require dietary fat for absorption. Fat-deficient diets risk deficiency in these critical micronutrients.

For most active individuals, targeting **20–35% of total calories from fat** is well-supported, with an emphasis on minimally processed sources: olive oil, nuts, avocado, and fatty fish for omega-3s. Partially hydrogenated oils (trans fats) should be minimized given their clear cardiovascular risk.`,
            keyPoints: [
              'Fat is essential for hormone production, cell membrane health, and fat-soluble vitamin absorption.',
              'Very low-fat diets (<15% of calories) are associated with reduced testosterone in men.',
              'Omega-3 fatty acids (fatty fish, flaxseed) support anti-inflammatory signaling and recovery.',
              'Target 20–35% of total calories from fat, prioritizing whole-food sources.',
            ],
            references: [
              {
                title:
                  'Diet and serum sex hormones in healthy men',
                authors: 'Hamalainen E, Adlercreutz H, Puska P, Pietinen P',
                journal: 'Journal of Steroid Biochemistry',
                year: 1984,
                url: 'https://pubmed.ncbi.nlm.nih.gov/6538617/',
                type: 'journal',
              },
              {
                title: 'Dietary Guidelines for Americans 2020–2025',
                authors: 'U.S. Dept. of Agriculture and HHS',
                year: 2020,
                url: 'https://www.dietaryguidelines.gov/',
                type: 'guideline',
              },
            ],
          },
        ],
        quiz: {
          id: 'macro-quiz',
          questions: [
            {
              id: 'macro-q1',
              question:
                'What protein intake does research support for individuals doing regular resistance training?',
              options: [
                '0.8 g/kg/day — the standard dietary RDA',
                '1.6–2.2 g/kg/day — based on muscle protein synthesis research',
                '3.0–4.0 g/kg/day — more protein always produces more muscle',
                'Protein intake has no significant effect on muscle building',
              ],
              correctIndex: 1,
              explanation:
                'Morton et al. (2018) found that protein intakes of ~1.62 g/kg/day maximized fat-free mass gains from training. The standard RDA of 0.8 g/kg prevents deficiency in sedentary populations — it was not designed to optimize performance or body composition.',
            },
            {
              id: 'macro-q2',
              question:
                'Why are carbohydrates particularly important for resistance training performance?',
              options: [
                'They convert directly into protein in the body, supporting muscle repair',
                'Muscle glycogen (stored carbohydrate) is the primary fuel for high-intensity lifting',
                'Carbohydrates suppress cortisol, reducing muscle breakdown during training',
                'They reduce the body\'s need for dietary protein by providing nitrogen',
              ],
              correctIndex: 1,
              explanation:
                'Muscle glycogen is the predominant fuel for resistance training. Low glycogen impairs volume capacity, power output, and focus. Adequate carbohydrates support better training quality, which drives better long-term adaptations.',
            },
            {
              id: 'macro-q3',
              question:
                'Very low-fat diets (below ~15% of calories from fat) are associated with:',
              options: [
                'Improved muscle protein synthesis due to reduced fat oxidation',
                'Better cardiovascular health due to lower saturated fat intake',
                'Reduced testosterone levels, particularly in men',
                'No significant hormonal or performance effects',
              ],
              correctIndex: 2,
              explanation:
                'Dietary fat is required for steroid hormone synthesis including testosterone. Research has shown very low-fat diets are associated with reduced testosterone, which can impair muscle building, recovery, and energy levels.',
            },
          ],
        },
      },

      // ── Module 2: Energy Balance ──────────────────────────────────────────────
      {
        id: 'energy-balance',
        title: 'Energy Balance & Caloric Needs',
        lessons: [
          {
            id: 'eb-calories',
            title: 'The Law of Energy Balance',
            estimatedMinutes: 5,
            content: `Energy balance is the fundamental equation governing body composition: calories consumed versus calories expended. Despite endless debate over optimal macronutrient ratios and meal timing, all controlled research confirms that total energy balance is the primary determinant of weight gain or loss.

**Energy in.** Calories come from protein (4 kcal/g), carbohydrates (4 kcal/g), and fat (9 kcal/g). Alcohol provides 7 kcal/g but serves no nutritional role.

**Energy out — the four components of TDEE:**
**1. Basal Metabolic Rate (BMR)** — energy to sustain life at rest (~60–70% of TDEE).
**2. Thermic Effect of Food (TEF)** — energy to digest and metabolize food (~10%).
**3. Exercise Activity Thermogenesis (EAT)** — deliberate exercise (~15–30%).
**4. Non-Exercise Activity Thermogenesis (NEAT)** — all movement outside formal exercise (walking, fidgeting, posture). Highly variable between individuals — can differ by up to 2,000 kcal/day.

**Caloric surplus and deficit.** To gain muscle, a modest surplus (200–500 kcal above maintenance) provides energy for new tissue synthesis. To lose fat, a deficit is required. Note that metabolic adaptation occurs during prolonged restriction — BMR decreases and NEAT often drops unconsciously — which is why fat loss typically requires progressive adjustments over time.`,
            keyPoints: [
              'Total caloric balance is the primary determinant of weight gain or loss.',
              'TDEE = BMR + TEF + EAT + NEAT; NEAT is the most variable component.',
              'A modest surplus (200–500 kcal) supports muscle gain with minimal fat accumulation.',
              'A caloric deficit is required for fat loss; size of deficit affects rate and muscle retention.',
              'Metabolic adaptation (reduced BMR and NEAT) occurs during prolonged caloric restriction.',
            ],
            references: [
              {
                title: 'Adaptive thermogenesis in humans',
                authors: 'Rosenbaum M, Leibel RL',
                journal: 'International Journal of Obesity',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/20935667/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'eb-tdee',
            title: 'Estimating Your Caloric Needs',
            estimatedMinutes: 5,
            content: `Estimating your Total Daily Energy Expenditure (TDEE) is the starting point for any nutrition strategy. No formula is perfectly accurate — individual metabolic variation is real — but evidence-based equations provide a reliable starting point.

**Step 1: Calculate Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation** (most validated for most populations):
Men: BMR = (10 × kg) + (6.25 × cm) − (5 × age) + 5
Women: BMR = (10 × kg) + (6.25 × cm) − (5 × age) − 161

**Step 2: Apply an activity multiplier:**
Sedentary (desk job, no exercise): BMR × 1.2
Lightly active (exercise 1–3 days/week): BMR × 1.375
Moderately active (exercise 3–5 days/week): BMR × 1.55
Very active (hard training 6–7 days/week): BMR × 1.725

**Step 3: Set caloric target based on goal:**
Maintenance: TDEE
Lean bulking: TDEE + 200–300 kcal
Muscle building: TDEE + 300–500 kcal
Fat loss: TDEE − 300–500 kcal (aggressive: up to −750 kcal)

**Important:** These are estimates. Track your weekly average bodyweight (same conditions each morning) and adjust calories by 100–200 kcal every 1–2 weeks based on observed trends. Real-world data beats any equation.`,
            keyPoints: [
              'The Mifflin-St Jeor equation is the most validated BMR formula for most individuals.',
              'Multiply BMR by an activity factor (1.2–1.725) to estimate TDEE.',
              'Add 200–500 kcal for muscle gain; subtract 300–500 kcal for fat loss.',
              'Formulas are estimates — track weekly bodyweight trends and adjust every 2 weeks.',
            ],
            references: [
              {
                title:
                  'A new predictive equation for resting energy expenditure in healthy individuals',
                authors: 'Mifflin MD, St Jeor ST, Hill LA, et al.',
                journal: 'American Journal of Clinical Nutrition',
                year: 1990,
                url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'eb-quiz',
          questions: [
            {
              id: 'eb-q1',
              question:
                'Which component of TDEE is most variable between individuals?',
              options: [
                'Basal Metabolic Rate (BMR)',
                'Thermic Effect of Food (TEF)',
                'Exercise Activity Thermogenesis (EAT)',
                'Non-Exercise Activity Thermogenesis (NEAT)',
              ],
              correctIndex: 3,
              explanation:
                'NEAT — energy from all non-exercise movement like walking, fidgeting, and posture — varies by up to 2,000 kcal/day between individuals. It is a major reason why two people with similar BMRs and exercise habits can have very different caloric needs.',
            },
            {
              id: 'eb-q2',
              question:
                'For someone trying to build muscle with minimal fat gain, what caloric surplus is generally recommended?',
              options: [
                'As large as possible — more calories always means more muscle',
                'A modest surplus of 200–300 kcal above TDEE',
                '1,000–2,000 kcal — a large surplus accelerates the process',
                'No surplus is needed; training alone drives muscle growth',
              ],
              correctIndex: 1,
              explanation:
                "A modest 200–300 kcal surplus (a \"lean bulk\") provides sufficient substrate for muscle protein synthesis while minimizing fat accumulation. Larger surpluses beyond what muscle tissue can use are stored as fat — muscle growth has a physiological ceiling that excess calories can't bypass.",
            },
            {
              id: 'eb-q3',
              question:
                'Your TDEE estimate is 2,400 kcal, but you gain weight eating 2,200 kcal. What should you do?',
              options: [
                "Trust the formula — the weight gain must be muscle",
                'Eat significantly less to create a much larger deficit',
                'Accept the formula overestimated your TDEE and adjust your target downward',
                'Add more exercise to compensate for the formula error',
              ],
              correctIndex: 2,
              explanation:
                "Formulas are estimates — individual metabolic rates vary. When real-world bodyweight data contradicts the formula, the data wins. Adjust your target by 100–200 kcal every 1–2 weeks and re-observe. This empirical, iterative approach is more reliable than any equation.",
            },
          ],
        },
      },
    ],
  },

  // ─── Course 3: Mobility & Movement Quality ────────────────────────────────
  {
    id: 'mobility-foundations',
    title: 'Mobility & Movement Quality',
    description:
      'Build the joint mobility and movement quality that underpins pain-free, high-performance training. Evidence-based protocols for hip, thoracic, and ankle mobility.',
    category: 'mobility',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    relatedGoals: ['hypertrophy', 'general-fitness'],
    tags: ['mobility', 'flexibility', 'movement quality', 'injury prevention'],
    coverEmoji: '🤸',
    modules: [
      // ── Module 1: Hip Mobility ───────────────────────────────────────────────
      {
        id: 'hip-mobility',
        title: 'Hip Mobility for Strength Athletes',
        lessons: [
          {
            id: 'hm-why-it-matters',
            title: 'Why Hip Mobility Matters',
            estimatedMinutes: 5,
            content: `Hip mobility is one of the most overlooked limiting factors in the lower-body training of strength athletes. Poor hip mobility restricts squat depth, compromises deadlift mechanics, and forces compensations that can cause pain in the lower back, knees, and SI joint.

The hip is a ball-and-socket joint capable of flexion, extension, abduction, adduction, internal rotation, and external rotation. When any of these ranges are restricted, other joints must compensate. The most common pattern: limited hip flexion or internal rotation causes the lumbar spine to flex instead, placing the lower back in a compromised position under load.

**Hip impingement and the capsule**
Femoroacetabular impingement (FAI) is the most common structural cause of hip mobility restriction in lifters. In cam-type impingement, the femoral head is non-spherical and jams into the acetabulum at end-range flexion. In pincer impingement, the acetabulum over-covers the femoral head. Both create pain at the front of the hip during deep squat and may limit training range of motion.

Not all hip mobility restrictions are structural, however. Research by Moreside and McGill (2012) demonstrated that targeted mobility training improved hip rotation range of motion in athletes without surgery, suggesting many restrictions are driven by soft tissue and neural guarding rather than bone shape.

**The hip flexors**
The hip flexor complex — primarily the iliopsoas and rectus femoris — is chronically shortened in individuals who sit for long periods. A shortened iliopsoas creates an anterior pelvic tilt, which reduces the hip's functional range in extension and alters the mechanics of squatting and lunging patterns. Addressing hip flexor length is therefore a priority before loading these patterns heavily.`,
            keyPoints: [
              'Limited hip mobility forces compensatory movement at the lumbar spine, increasing injury risk under load.',
              'The hip is a multi-axial joint; restrictions in any plane can impair squatting, hinging, and lunging mechanics.',
              'Femoroacetabular impingement (FAI) is a structural cause of hip limitation, but soft tissue restrictions are more common and addressable.',
              'Shortened hip flexors from prolonged sitting create anterior pelvic tilt and restrict hip extension range.',
              'Targeted hip mobility work can improve range of motion and reduce compensatory lumbar stress.',
            ],
            references: [
              {
                title: 'Improving hip flexibility does not decrease lumbar spine motion during forward flexion',
                authors: 'Moreside JM, McGill SM',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21817864/',
                type: 'journal',
              },
              {
                title: 'Femoroacetabular impingement: a cause for osteoarthritis of the hip',
                authors: 'Ganz R, Parvizi J, Beck M, et al.',
                journal: 'Clinical Orthopaedics and Related Research',
                year: 2003,
                url: 'https://pubmed.ncbi.nlm.nih.gov/14612498/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'hm-drills',
            title: 'Hip Mobility Drills',
            estimatedMinutes: 5,
            content: `Consistently applying targeted drills before and between training sessions is the most practical way to improve hip mobility over time. The following four drills address the most common restrictions seen in strength athletes.

**1. World's Greatest Stretch (2–3 reps/side)**
Step one foot forward into a lunge, placing the same-side hand on the floor beside your foot. Drive the opposite elbow to the floor to open the hip, then rotate the arm toward the ceiling. Finish by pushing hips back into a hamstring stretch. This drill addresses hip flexor length, thoracic rotation, and hamstring flexibility in a single flowing movement — making it ideal as a warm-up.

**2. 90/90 Hip Stretch (60–90 seconds/side)**
Sit on the floor with both legs at 90° — one knee in front, one to the side. Sit tall through both hips and work to sink the rear hip toward the floor. This position simultaneously stretches the external rotators of the front hip and the internal rotators of the rear hip. Research by Thomas et al. (2018) confirmed that static stretching held for at least 60 seconds produces the most reliable acute improvements in range of motion.

**3. Hip Circles / CARs (5 reps/side)**
Stand on one leg and perform slow, controlled, full-range circles with the raised leg — this is a Controlled Articular Rotation (CAR), a concept from Functional Range Conditioning. CARs lubricate the joint capsule, reinforce range ownership, and serve as both a warm-up and assessment tool.

**4. Hip Flexor Kneeling Stretch with Glute Squeeze (30–60 s/side)**
In a half-kneeling position, squeeze the glute of the rear leg hard. This activates the hip extensors via reciprocal inhibition, causing the hip flexors to relax and allow greater stretch depth. The glute squeeze is the single most effective cue for this stretch — without it, most people fail to achieve real hip flexor length gain.`,
            keyPoints: [
              "The World's Greatest Stretch addresses hip flexors, thoracic rotation, and hamstring flexibility in one movement — excellent as a daily warm-up.",
              'The 90/90 stretch targets both external and internal hip rotators simultaneously; hold at least 60 seconds for measurable flexibility gains.',
              'Controlled Articular Rotations (CARs) train the nervous system to access the full available joint range under control.',
              'Squeezing the rear glute during a hip flexor stretch uses reciprocal inhibition to deepen the stretch passively.',
            ],
            references: [
              {
                title: 'The Acute Effects of Stretching on Muscle Stiffness and Viscoelasticity',
                authors: 'Thomas E, Bianco A, Paoli A, et al.',
                journal: 'Journal of Functional Morphology and Kinesiology',
                year: 2018,
                url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6163492/',
                type: 'review',
              },
            ],
          },
        ],
        quiz: {
          id: 'hm-quiz',
          questions: [
            {
              id: 'hm-q1',
              question: 'What is the most common compensatory pattern when hip flexion mobility is restricted during a squat?',
              options: [
                'The knees collapse inward (valgus)',
                'The lumbar spine flexes to compensate for the limited hip range',
                'The thoracic spine extends excessively',
                'The ankles pronate to add dorsiflexion range',
              ],
              correctIndex: 1,
              explanation:
                'When the hip cannot achieve adequate flexion range, the body borrows motion from the next available joint — the lumbar spine. This "buttwink" places the lower back in a flexed, potentially vulnerable position under compressive load.',
            },
            {
              id: 'hm-q2',
              question: 'What is the key cue that most effectively deepens a kneeling hip flexor stretch?',
              options: [
                'Leaning the torso forward',
                'Externally rotating the rear foot',
                'Squeezing the glute of the rear leg',
                'Tilting the pelvis anteriorly',
              ],
              correctIndex: 2,
              explanation:
                'Squeezing the rear glute activates the hip extensors, which via reciprocal inhibition causes the antagonist hip flexors to relax. This allows the hip to move into greater extension without forcing the stretch passively.',
            },
            {
              id: 'hm-q3',
              question: 'Which type of hip impingement involves a non-spherical femoral head jamming into the acetabulum at end-range flexion?',
              options: [
                'Pincer impingement',
                'Cam impingement',
                'Labral impingement',
                'Capsular impingement',
              ],
              correctIndex: 1,
              explanation:
                'Cam impingement involves an abnormal shape of the femoral head (non-spherical, often described as "egg-shaped") that jams against the rim of the acetabulum during hip flexion. Pincer impingement, by contrast, involves over-coverage by the acetabulum.',
            },
          ],
        },
      },

      // ── Module 2: Thoracic Mobility ──────────────────────────────────────────
      {
        id: 'thoracic-mobility',
        title: 'Thoracic Spine Mobilization',
        lessons: [
          {
            id: 'tm-importance',
            title: 'Why Thoracic Mobility Matters',
            estimatedMinutes: 5,
            content: `The thoracic spine — the twelve vertebrae between the cervical and lumbar segments — is the most commonly stiff region of the spine in individuals who train, work at a desk, or use smartphones. Yet it is often ignored in favour of hip and ankle mobility work. This is a significant oversight.

**Overhead pressing and shoulder health**
Effective overhead pressing requires the shoulder to achieve full elevation — typically around 180° of combined glenohumeral and scapulothoracic motion. When the thoracic spine is kyphotic (rounded) and immobile, the scapula cannot upwardly rotate adequately, reducing shoulder flexion range and increasing subacromial impingement risk. Research by Bullock et al. (2005) found that improving thoracic extension directly increased shoulder flexion range of motion, even without direct shoulder work.

**Posture and spinal load distribution**
An excessively kyphotic thoracic spine shifts the body's centre of mass forward, increasing load on the cervical spine, lumbar spine, and hip flexors. Improving t-spine extension restores a more neutral posture, distributes spinal load more evenly, and reduces the chronic tension that manifests as upper-back tightness.

**Injury prevention**
When the thoracic spine cannot rotate or extend, the lumbar spine is forced to compensate during rotational activities such as throwing, rowing, and cable rotations. The lumbar spine is designed for stability, not rotation — forcing rotation through it under load is a primary mechanism for lumbar disc injury. A mobile thoracic spine protects the segments below it.

The good news: the thoracic spine responds relatively quickly to targeted mobilisation. Even a single session of foam rolling and targeted extension work can produce immediate, measurable improvements in range of motion.`,
            keyPoints: [
              'A stiff thoracic spine reduces shoulder flexion range, increasing subacromial impingement risk during overhead pressing.',
              'Thoracic kyphosis shifts the centre of mass forward and increases load on the cervical and lumbar regions.',
              'The lumbar spine is designed for stability, not rotation — a stiff t-spine forces compensatory lumbar rotation under load.',
              'Thoracic mobility responds relatively quickly to targeted work and can improve within a single session.',
            ],
            references: [
              {
                title: 'The effect of a thoracic kyphosis correction on shoulder range of motion in young adults',
                authors: 'Bullock MP, Foster NE, Wright CC',
                journal: 'Manual Therapy',
                year: 2005,
                url: 'https://pubmed.ncbi.nlm.nih.gov/15905098/',
                type: 'journal',
              },
              {
                title: 'Shoulder impingement: biomechanical considerations in rehabilitation',
                authors: 'Ludewig PM, Braman JP',
                journal: 'Manual Therapy',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21167765/',
                type: 'review',
              },
            ],
          },
          {
            id: 'tm-protocol',
            title: 'Thoracic Mobilization Protocol',
            estimatedMinutes: 5,
            content: `The following four-step protocol delivers comprehensive thoracic mobilization and can be performed in 5–10 minutes before any upper-body or overhead session.

**1. Thoracic Foam Rolling — Extension (8–10 passes, 60 seconds)**
Lie across a foam roller placed perpendicular to your spine, at mid-back level. Support your head with your hands interlaced behind it. Gently extend over the roller, using gravity and your bodyweight to mobilize each thoracic segment. Move the roller up 1–2 vertebrae at a time, spending a few seconds at each level. This addresses tissue stiffness and creates a sustained extension stimulus along the full thoracic column.

**2. Cat-Cow (10 reps, slow tempo)**
On all fours, alternate between thoracic flexion (cat: round the upper back toward the ceiling) and thoracic extension (cow: let the chest drop and extend through the mid-back). This gentle, rhythmic movement warms the facet joints, mobilizes the spinal segments, and begins restoring the natural thoracic curve.

**3. Thoracic Rotation Stretch (8–10 reps/side)**
Lie on your side with hips and knees at 90°. Keep your lower arm on the floor and hips stacked. Rotate your top arm and shoulder toward the ceiling and then to the opposite side, following the movement with your eyes. Breathe out as you rotate. The key is to prevent any hip movement — this isolates rotation to the thoracic spine specifically.

**4. Open Book Stretch (8 reps/side)**
Similar setup to thoracic rotation, but with both arms extended forward at shoulder height. Keep the bottom arm flat on the floor as you rotate the top arm open like a book opening. At the end range, breathe out and allow gravity to further open the chest.

Performing this sequence 3–5 times per week for 4–6 weeks produces reliable, lasting improvements in thoracic mobility and is more effective than occasional longer sessions.`,
            keyPoints: [
              'Foam rolling in extension mobilizes thoracic facet joints and reduces tissue stiffness — effective immediately before training.',
              'Cat-cow gently mobilizes the full spinal column and warms the facet joints with low risk.',
              'Thoracic rotation in sidelying isolates t-spine rotation by locking the hips — the most common error is letting the hips rotate.',
              'Consistency (3–5 times/week) over 4–6 weeks produces lasting range improvements beyond what occasional sessions achieve.',
            ],
            references: [
              {
                title: 'Effects of foam rolling on range of motion and muscle recovery: a systematic review',
                authors: 'Cheatham SW, Kolber MJ, Cain M, Lee M',
                journal: 'International Journal of Sports Physical Therapy',
                year: 2015,
                url: 'https://pubmed.ncbi.nlm.nih.gov/26618062/',
                type: 'review',
              },
            ],
          },
        ],
        quiz: {
          id: 'tm-quiz',
          questions: [
            {
              id: 'tm-q1',
              question: 'How does thoracic kyphosis negatively affect overhead pressing?',
              options: [
                'It increases the load on the anterior deltoid',
                'It prevents scapular upward rotation, limiting shoulder flexion range',
                'It shortens the triceps, reducing lockout strength',
                'It compresses the brachial plexus, causing arm weakness',
              ],
              correctIndex: 1,
              explanation:
                'A kyphotic thoracic spine prevents the scapula from upwardly rotating adequately. Since scapular upward rotation contributes roughly 60° of total arm elevation, its restriction significantly limits how high the arm can reach — directly impeding overhead pressing range and increasing impingement risk.',
            },
            {
              id: 'tm-q2',
              question: 'Why is forcing rotation through the lumbar spine problematic during lifting?',
              options: [
                'The lumbar spine has no rotational range at all',
                'Rotation compresses the femoral nerve',
                'The lumbar spine is designed for stability, not rotation — forcing it can injure the discs',
                'Lumbar rotation reduces intra-abdominal pressure',
              ],
              correctIndex: 2,
              explanation:
                'The lumbar spine has very limited rotational range (approximately 5° per segment) and is architecturally built for stability and flexion/extension. Forced rotation under load stresses the annulus fibrosus of the lumbar discs, which is a primary mechanism of disc herniation.',
            },
            {
              id: 'tm-q3',
              question: 'In the thoracic rotation sidelying stretch, what is the most important technical point?',
              options: [
                'Keeping the knees fully extended',
                'Pressing the bottom arm into the floor and preventing hip rotation',
                'Pulling the top knee to the chest during the rotation',
                'Holding the stretch for exactly 10 seconds per rep',
              ],
              correctIndex: 1,
              explanation:
                'The entire purpose of the sidelying setup is to lock the hips via stacked positioning so that rotation occurs only at the thoracic spine. If the hips rotate, the movement is redirected to the lumbar spine — which defeats the goal of the exercise.',
            },
          ],
        },
      },

      // ── Module 3: Ankle Mobility ─────────────────────────────────────────────
      {
        id: 'ankle-mobility',
        title: 'Ankle Mobility for Better Squatting',
        lessons: [
          {
            id: 'am-assessment',
            title: 'Assessing Ankle Mobility',
            estimatedMinutes: 4,
            content: `Ankle dorsiflexion — the ability to bring the shin forward over the foot — is the single most commonly identified mobility limitation in athletes who struggle to achieve adequate squat depth. Insufficient dorsiflexion forces compensations: the heel rises, the torso leans excessively forward, or the knees collapse inward.

**The Wall Ankle Test (Knee-to-Wall Test)**
This is the gold-standard field assessment for ankle dorsiflexion. Stand facing a wall, place your foot 5 cm from the wall, and attempt to drive your knee forward to touch the wall while keeping the heel flat. If the heel lifts before the knee touches, move the foot closer and repeat. Record the maximum toe-to-wall distance at which the heel remains flat. Research by Bennell et al. (1998) found that less than 9–10 cm indicates restricted dorsiflexion that is likely to affect squat mechanics.

**Tissue restriction vs. joint restriction**
Not all ankle stiffness has the same cause, and the treatment differs accordingly:

- **Tissue restriction (gastrocnemius/soleus tightness):** The calf muscles cross the ankle posteriorly. If they are short or stiff, they pull the heel up and limit dorsiflexion range. This type improves with calf stretching and foam rolling.

- **Joint restriction (capsular/bony restriction):** The ankle joint capsule or bony architecture may limit the forward glide of the talus in the mortise joint. This type does not improve much with muscle stretching but responds well to joint mobilization (banded ankle distraction). Structural bony impingement at the front of the ankle may require physio assessment.

A simple differentiating test: if dorsiflexion range does not improve after 2 minutes of calf stretching, a joint component is likely present.`,
            keyPoints: [
              'Dorsiflexion restriction is the most common ankle limitation affecting squat depth, causing heel rise and forward lean.',
              'The wall ankle test (knee-to-wall) is the standard field assessment; less than 9 cm suggests functionally limiting restriction.',
              'Calf tissue tightness (gastrocnemius/soleus) is one cause — it responds to stretching and foam rolling.',
              'Joint capsule restriction is a second cause — it does not improve with stretching but responds to banded distraction mobilization.',
            ],
            references: [
              {
                title: 'The effect of ankle dorsiflexion range of motion on kinematics and kinetics during squatting',
                authors: 'Macrum E, Bell DR, Boling M, Lewek M, Padua D',
                journal: 'Journal of Sport Rehabilitation',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/22488556/',
                type: 'journal',
              },
              {
                title: 'Ankle and subtalar joint dorsiflexion range of motion in male ballet dancers',
                authors: 'Bennell KL, Talbot RC, Wajswelner H, et al.',
                journal: 'British Journal of Sports Medicine',
                year: 1998,
                url: 'https://pubmed.ncbi.nlm.nih.gov/9591834/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'am-drills',
            title: 'Ankle Mobility Drills',
            estimatedMinutes: 4,
            content: `Combining tissue-based and joint-based techniques produces the best results for ankle mobility, as most individuals have components of both restriction types.

**1. Calf Foam Rolling (90 seconds/side)**
Place the calf on a foam roller and roll slowly from just above the Achilles tendon to the back of the knee. Pause on tender spots for 5–10 seconds. Rotate the leg inward and outward to address the full width of the calf. This addresses gastrocnemius and soleus tissue stiffness — the most common limiting factor. For greater pressure, cross one leg over the other.

**2. Gastrocnemius Stretch — Straight Knee (30–60 seconds/side)**
Place the forefoot on an elevated surface (step or plate) with the heel on the floor. Keep the knee fully straight. Lean into the wall until a stretch is felt in the upper calf. The straight-knee position targets the gastrocnemius, which crosses the knee.

**3. Soleus Stretch — Bent Knee (30–60 seconds/side)**
Perform the same stretch but with a bent knee. The bent-knee position shortens the gastrocnemius across the knee joint, shifting the stretch to the soleus, which only crosses the ankle.

**4. Banded Ankle Distraction (2 × 10 reps/side)**
Anchor a resistance band to a fixed post at floor level. Loop the band around the ankle just above the joint. Step far enough away that the band pulls anteriorly on the ankle joint. Drive your knee forward over your toes while the band pulls the talus posteriorly — creating a distraction that mobilizes the joint capsule. This technique directly addresses joint-based restriction that stretching alone cannot fix.

**5. Elevated Heel Cue for Squatting**
As a short-term strategy while building ankle mobility, placing small weight plates (10–25 mm) under your heels when squatting reduces the dorsiflexion demand. This is not a crutch — it allows you to train at full depth and load while addressing mobility separately. Progressively reduce heel elevation as dorsiflexion range improves.`,
            keyPoints: [
              'Foam rolling the calf addresses tissue stiffness before stretching, improving the stretch effect.',
              'Straight-knee stretches target the gastrocnemius; bent-knee stretches target the deeper soleus.',
              'Banded ankle distraction mobilizes the joint capsule — essential when stretching alone fails to improve range.',
              'Elevated heels reduce dorsiflexion demand during squats, allowing full-depth training while mobility is being developed.',
            ],
            references: [
              {
                title: 'Joint mobilization versus stretching for the treatment of posterior ankle impingement: a randomized controlled trial',
                authors: 'Beumer A, Swierstra BA, Mulder PG',
                journal: 'Archives of Orthopaedic and Trauma Surgery',
                year: 2002,
                url: 'https://pubmed.ncbi.nlm.nih.gov/11995883/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'am-quiz',
          questions: [
            {
              id: 'am-q1',
              question: 'In the wall ankle test, what result suggests functionally limiting dorsiflexion restriction?',
              options: [
                'Knee touches the wall at 15 cm from the wall',
                'Knee touches the wall at 12 cm from the wall',
                'Heel rises before the knee touches at 9 cm from the wall',
                'Pain occurs at the front of the ankle at any distance',
              ],
              correctIndex: 2,
              explanation:
                'Research suggests that failing to achieve at least 9–10 cm in the wall ankle test (heel flat, knee touching the wall) indicates restriction that is likely to affect squat mechanics. Heel rise before this distance is the key failure criterion.',
            },
            {
              id: 'am-q2',
              question: 'Which stretch specifically targets the soleus rather than the gastrocnemius?',
              options: [
                'Straight-knee calf stretch on a step',
                'Bent-knee calf stretch',
                'Standing hip flexor stretch',
                'Seated toe-pull stretch',
              ],
              correctIndex: 1,
              explanation:
                'The gastrocnemius crosses both the ankle and the knee. Bending the knee shortens the gastrocnemius and takes it out of the stretch, shifting tension to the soleus, which only crosses the ankle. This distinction matters because both muscles are commonly tight in athletes.',
            },
            {
              id: 'am-q3',
              question: 'What does banded ankle distraction address that calf stretching alone cannot?',
              options: [
                'Peroneal muscle tightness on the lateral calf',
                'Anterior shin splint pain',
                'Joint capsule restriction limiting the talus glide',
                'Achilles tendon stiffness',
              ],
              correctIndex: 2,
              explanation:
                'Stretching addresses muscle and fascial tissue length. Banded distraction works on the ankle joint itself — the band creates a posterior force on the talus as you drive your knee forward, mobilizing the joint capsule. This is specifically effective when dorsiflexion does not improve after sustained stretching.',
            },
          ],
        },
      },
    ],
  },

  // ─── Course 4: Body Composition Fundamentals ─────────────────────────────
  {
    id: 'body-composition',
    title: 'Body Composition Fundamentals',
    description:
      'Understand the science of gaining muscle and losing fat — including the key principles of energy balance, hypertrophy, and effective body recomposition strategies.',
    category: 'nutrition',
    difficulty: 'beginner',
    estimatedMinutes: 40,
    relatedGoals: ['hypertrophy', 'fat-loss', 'general-fitness'],
    tags: ['body composition', 'fat loss', 'muscle gain', 'recomposition', 'TDEE'],
    coverEmoji: '⚖️',
    modules: [
      // ── Module 1: Energy Balance ─────────────────────────────────────────────
      {
        id: 'energy-systems',
        title: 'Energy Balance and TDEE',
        lessons: [
          {
            id: 'es-caloric-balance',
            title: 'Calories In vs. Calories Out',
            estimatedMinutes: 5,
            content: `At the foundation of every body composition change — whether gaining muscle, losing fat, or both — lies the principle of energy balance. While nutrition is complex, this single concept explains the direction of change in body mass.

**The energy balance equation**
Body mass changes when there is a persistent difference between energy consumed (calories in) and energy expended (calories out). A surplus drives weight gain; a deficit drives weight loss. This is not a theory — it is a physical law. The composition of that weight change (how much is muscle vs. fat) is influenced by training, protein intake, and hormonal context.

**Basal Metabolic Rate (BMR)**
BMR is the energy your body requires at rest to maintain basic physiological functions — heart rate, respiration, organ function, body temperature. It represents approximately 60–75% of total daily energy expenditure for most sedentary people. Common estimation equations (Mifflin-St Jeor, Harris-Benedict) use height, weight, age, and sex as inputs. The Mifflin-St Jeor equation is considered the most accurate for most populations (Frankenfield et al., 2005).

**Total Daily Energy Expenditure (TDEE)**
TDEE = BMR × activity multiplier. It includes:
- **Thermic Effect of Food (TEF):** Energy required to digest food (roughly 5–15% of calories consumed; protein has the highest TEF at ~25–30%).
- **Exercise Activity Thermogenesis (EAT):** Intentional exercise.
- **Non-Exercise Activity Thermogenesis (NEAT):** All movement outside structured exercise — walking, fidgeting, posture maintenance. NEAT is highly variable between individuals (200–1,000 kcal/day) and is a major reason TDEE estimates can miss by 300–500 kcal.

TDEE calculators are starting estimates, not facts. Your actual TDEE is revealed by tracking your food intake and bodyweight together over 2–3 weeks and observing the trend.`,
            keyPoints: [
              'Energy balance — calories in vs. calories out — determines the direction and magnitude of body weight change.',
              'BMR accounts for 60–75% of TDEE in sedentary individuals and is estimated from height, weight, age, and sex.',
              'TDEE includes BMR, thermic effect of food (TEF), exercise activity, and NEAT (non-exercise movement).',
              'NEAT is highly variable between individuals (200–1,000 kcal/day) and is why formula estimates often miss real TDEE.',
              'The only reliable way to determine your true TDEE is to track intake and bodyweight together over 2–3 weeks.',
            ],
            references: [
              {
                title: 'Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults',
                authors: 'Frankenfield D, Roth-Yousey L, Compher C',
                journal: 'Journal of the American Dietetic Association',
                year: 2005,
                url: 'https://pubmed.ncbi.nlm.nih.gov/15883556/',
                type: 'journal',
              },
              {
                title: 'Role of nonexercise activity thermogenesis in resistance to fat gain in humans',
                authors: 'Levine JA, Eberhardt NL, Jensen MD',
                journal: 'Science',
                year: 1999,
                url: 'https://pubmed.ncbi.nlm.nih.gov/9880251/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'es-applying-surplus-deficit',
            title: 'Applying Surpluses and Deficits',
            estimatedMinutes: 5,
            content: `Understanding energy balance is valuable only when translated into practical targets. The size and composition of a surplus or deficit has meaningful consequences for body composition outcomes.

**Lean Bulking (Caloric Surplus)**
A "lean bulk" involves a modest caloric surplus designed to support muscle growth while minimizing fat accumulation. The optimal surplus size depends on training experience:

- **Beginners:** 300–500 kcal above TDEE. Beginners are capable of relatively rapid muscle gain and can support this with a larger surplus.
- **Intermediate/Advanced:** 200–300 kcal above TDEE. More experienced trainees gain muscle more slowly — a larger surplus simply produces more fat storage without proportionally more muscle.

The goal is to provide slightly more substrate than the body needs for maintenance, giving muscle protein synthesis just enough surplus to maximize growth without unnecessary fat gain. Research by Hall et al. (2012) confirms that excess calories beyond what muscle can use are stored as fat — there is a physiological ceiling to muscle growth rate that extra calories cannot bypass.

**Cutting (Caloric Deficit)**
A moderate deficit of 300–500 kcal produces approximately 0.5–1.0 lb of fat loss per week, which is generally considered the upper limit for minimizing muscle loss. Aggressive deficits (>700 kcal) accelerate fat loss but substantially increase the risk of lean mass catabolism, particularly without adequate protein and resistance training.

**Calculating Starting Targets**
1. Estimate TDEE using a calculator (e.g., Mifflin-St Jeor × activity factor).
2. Add your surplus or subtract your deficit to set a daily calorie target.
3. Track weight daily and compute a weekly average. Compare week-over-week trends.
4. Adjust by 100–200 kcal every 1–2 weeks based on observed results.

The iterative, data-driven approach always outperforms rigid adherence to a formula.`,
            keyPoints: [
              'A lean bulk uses a 200–500 kcal surplus depending on training experience — larger surpluses only add fat beyond what muscle tissue can build.',
              'A moderate deficit of 300–500 kcal/day produces 0.5–1 lb/week fat loss with minimal muscle loss when protein is adequate.',
              'Deficits above 700 kcal significantly increase the risk of lean mass loss alongside fat.',
              'Calculate a starting target from TDEE, track bodyweight weekly averages, and adjust by 100–200 kcal based on observed results.',
            ],
            references: [
              {
                title: 'Quantification of the effect of energy imbalance on bodyweight',
                authors: 'Hall KD, Sacks G, Chandramohan D, et al.',
                journal: 'The Lancet',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21872751/',
                type: 'journal',
              },
              {
                title: 'Dietary protein and muscle mass: translating science to application and health benefit',
                authors: 'Stokes T, Hector AJ, Morton RW, et al.',
                journal: 'Nutrients',
                year: 2018,
                url: 'https://pubmed.ncbi.nlm.nih.gov/29477227/',
                type: 'review',
              },
            ],
          },
        ],
        quiz: {
          id: 'es-quiz',
          questions: [
            {
              id: 'es-q1',
              question: 'Which component of TDEE is the most variable between individuals and most often causes formula estimates to be inaccurate?',
              options: [
                'Basal Metabolic Rate (BMR)',
                'Thermic Effect of Food (TEF)',
                'Non-Exercise Activity Thermogenesis (NEAT)',
                'Exercise Activity Thermogenesis (EAT)',
              ],
              correctIndex: 2,
              explanation:
                'NEAT — the energy expended in all movement outside structured exercise — can range from 200 to over 1,000 kcal/day between individuals. This large variability is the main reason TDEE formulas often miss actual energy expenditure by 300–500 kcal.',
            },
            {
              id: 'es-q2',
              question: 'For an intermediate lifter, what is the recommended daily caloric surplus for a lean bulk?',
              options: [
                '500–700 kcal above TDEE',
                '200–300 kcal above TDEE',
                '100 kcal above TDEE',
                '1,000 kcal above TDEE',
              ],
              correctIndex: 1,
              explanation:
                'Intermediate lifters gain muscle more slowly than beginners — typically 0.5–1 lb/month. A 200–300 kcal surplus provides enough substrate to support this rate without generating significant excess fat storage. Larger surpluses simply add fat beyond what muscle tissue can absorb.',
            },
            {
              id: 'es-q3',
              question: 'What is the most reliable method for determining your actual TDEE?',
              options: [
                'Use a BMR formula multiplied by your activity level',
                'Measure resting heart rate over 7 days',
                'Track food intake and daily bodyweight together for 2–3 weeks and observe the trend',
                'Calculate the exact calories burned during exercise sessions',
              ],
              correctIndex: 2,
              explanation:
                'Formulas are population-level estimates with significant individual error. The most accurate method is empirical: track what you eat and monitor bodyweight trends. If weight is stable over 2–3 weeks at a known intake, that intake equals your TDEE.',
            },
          ],
        },
      },

      // ── Module 2: Muscle Hypertrophy ─────────────────────────────────────────
      {
        id: 'muscle-gain',
        title: 'Muscle Hypertrophy Principles',
        lessons: [
          {
            id: 'mg-mechanisms',
            title: 'The Three Mechanisms of Hypertrophy',
            estimatedMinutes: 5,
            content: `Muscle hypertrophy — an increase in muscle fiber cross-sectional area — is driven by three distinct but overlapping mechanisms. Understanding them helps explain why different training approaches (heavy compound lifts, moderate-rep isolation work, pump-focused training) all produce muscle growth, and how to combine them intelligently.

**1. Mechanical Tension**
Mechanical tension is the primary driver of hypertrophy and refers to the force generated within muscle fibers as they are stretched and contracted under load. High mechanical tension activates mechanosensors within the muscle cell membrane (integrins, titin), initiating signaling cascades — particularly the mTORC1 pathway — that upregulate muscle protein synthesis.

Research by Schoenfeld (2010) identified this as the dominant mechanism for strength-based training. Exercises performed through a full range of motion, especially under heavy load at long muscle lengths, produce the highest mechanical tension stimulus.

**2. Metabolic Stress**
Metabolic stress arises when muscle contractions restrict blood flow, causing a build-up of metabolites — lactate, hydrogen ions, inorganic phosphate — within the muscle. This "pump" is associated with anabolic hormonal responses, cell swelling, and reactive oxygen species signaling. Moderate-rep, short-rest training maximizes metabolic stress. While debated in the literature, it appears to contribute to hypertrophy independently of mechanical tension, particularly for muscle endurance adaptations.

**3. Muscle Damage**
Eccentric loading (the lowering phase of a lift) causes microtears in muscle fibers. The subsequent repair process, mediated by satellite cells, results in hypertrophy. However, excessive muscle damage (DOMS) extends recovery time without producing proportionally greater growth. A controlled eccentric phase (2–3 seconds) is sufficient — there is no benefit to extreme delayed-onset soreness.

**Muscle Protein Synthesis (MPS)**
All three mechanisms ultimately drive hypertrophy by elevating muscle protein synthesis rates above muscle protein breakdown rates. Dietary protein (specifically essential amino acids) provides the building blocks, while resistance training provides the signal. Both are required; neither alone is sufficient.`,
            keyPoints: [
              'Mechanical tension (force under load) is the primary driver of hypertrophy via mTORC1 signaling — prioritize full range of motion with progressive load.',
              'Metabolic stress (the "pump" from restricted blood flow) contributes to hypertrophy, particularly in moderate-rep, short-rest training.',
              'Muscle damage from eccentric loading stimulates repair and growth, but excessive DOMS is counterproductive — a controlled negative is sufficient.',
              'All three mechanisms work by increasing muscle protein synthesis above breakdown over time.',
            ],
            references: [
              {
                title: 'The Mechanisms of Muscle Hypertrophy and Their Application to Resistance Training',
                authors: 'Schoenfeld BJ',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/20847704/',
                type: 'journal',
              },
              {
                title: 'Science and Development of Muscle Hypertrophy',
                authors: 'Schoenfeld BJ',
                journal: 'Human Kinetics',
                year: 2016,
                url: 'https://us.humankinetics.com/products/science-and-development-of-muscle-hypertrophy',
                type: 'book',
              },
            ],
          },
          {
            id: 'mg-rate-of-gain',
            title: 'Realistic Rates of Muscle Gain',
            estimatedMinutes: 5,
            content: `One of the most important calibrations a trainee can make is understanding realistic muscle gain rates by experience level. Unrealistic expectations lead to either dirty bulking (excessive fat gain) or discouragement when monthly gains appear small.

**Rates of Muscle Gain by Experience Level**
Research and practitioner consensus suggest the following approximate monthly lean mass gain rates for natural (drug-free) trainees with appropriate training and nutrition:

| Level | Experience | Monthly gain |
|---|---|---|
| Beginner | 0–1 year | 1–2 lb (0.5–1 kg) |
| Intermediate | 1–3 years | 0.5–1 lb (0.25–0.5 kg) |
| Advanced | 3+ years | 0.25–0.5 lb (0.1–0.25 kg) |

These are guidelines, not guarantees. Genetic ceiling, training quality, sleep, and stress all modulate outcomes. The key insight is that muscle gain is a slow process for naturals — annual totals of 5–12 lb for beginners and 2–6 lb for intermediates represent genuinely excellent progress.

**Protein Requirements for Hypertrophy**
A comprehensive meta-analysis by Morton et al. (2018) found that protein intakes of **1.6–2.2 g/kg of bodyweight per day** maximize muscle protein synthesis in resistance-trained individuals. Intakes above ~2.2 g/kg do not produce additional hypertrophy in most contexts, though they may help preserve muscle during an aggressive deficit.

Protein distribution matters: consuming 0.4 g/kg per meal across 4–5 meals appears to optimize MPS stimulation compared to fewer, larger doses (Moore et al., 2009). In practice, aiming for 30–50 g of high-quality protein per meal is a reasonable heuristic for most individuals.

**Carbohydrates and Fats**
After protein targets are set, the remaining calories can be distributed between carbohydrate and fat according to preference. Both can support muscle gain when total calories and protein are adequate — there is no metabolic magic to either macronutrient ratio beyond its effect on energy balance and adherence.`,
            keyPoints: [
              'Beginners can expect 1–2 lb of lean mass gain per month; intermediates 0.5–1 lb; advanced trainees 0.25–0.5 lb.',
              'Annual progress of 5–12 lb (beginner) and 2–6 lb (intermediate) represents genuinely excellent natural gains.',
              'Optimal protein for hypertrophy is 1.6–2.2 g/kg/day based on meta-analysis evidence.',
              'Spreading protein across 4–5 meals (0.4 g/kg per meal) may modestly optimize muscle protein synthesis vs. fewer larger meals.',
            ],
            references: [
              {
                title: 'A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains',
                authors: 'Morton RW, Murphy KT, McKellar SR, et al.',
                journal: 'British Journal of Sports Medicine',
                year: 2018,
                url: 'https://pubmed.ncbi.nlm.nih.gov/28698222/',
                type: 'meta-analysis',
              },
              {
                title: 'Ingested protein dose response of muscle and albumin protein synthesis after resistance exercise',
                authors: 'Moore DR, Robinson MJ, Fry JL, et al.',
                journal: 'American Journal of Clinical Nutrition',
                year: 2009,
                url: 'https://pubmed.ncbi.nlm.nih.gov/19056590/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'mg-quiz',
          questions: [
            {
              id: 'mg-q1',
              question: 'Which mechanism of hypertrophy is considered the primary driver and operates through the mTORC1 signaling pathway?',
              options: [
                'Metabolic stress from blood flow restriction',
                'Muscle damage from eccentric loading',
                'Mechanical tension from force generated under load',
                'Hormonal response from high-rep training',
              ],
              correctIndex: 2,
              explanation:
                'Mechanical tension — the force generated within muscle fibers during loaded stretch and contraction — is the primary driver of hypertrophy. It activates mTORC1 signaling via mechanosensors, directly upregulating muscle protein synthesis. Full range of motion and progressive load maximize this stimulus.',
            },
            {
              id: 'mg-q2',
              question: 'What is the approximate monthly muscle gain expectation for a natural intermediate lifter with 1–3 years of training experience?',
              options: [
                '3–5 lb per month',
                '1–2 lb per month',
                '0.5–1 lb per month',
                '0.1–0.2 lb per month',
              ],
              correctIndex: 2,
              explanation:
                'Intermediate lifters (1–3 years) can expect roughly 0.5–1 lb of lean mass gain per month with appropriate training and nutrition. This amounts to 6–12 lb per year — significant progress that is easy to dismiss as "slow" without this calibration.',
            },
            {
              id: 'mg-q3',
              question: 'According to Morton et al. (2018), what daily protein intake maximizes muscle protein synthesis in resistance-trained individuals?',
              options: [
                '0.8 g/kg/day (the RDA)',
                '1.0–1.2 g/kg/day',
                '1.6–2.2 g/kg/day',
                '3.0–4.0 g/kg/day',
              ],
              correctIndex: 2,
              explanation:
                'The landmark Morton et al. (2018) meta-analysis of 49 studies found that protein intakes beyond ~1.62 g/kg/day did not significantly increase fat-free mass gains. Targeting 1.6–2.2 g/kg provides an optimal range with a safety margin, while intakes above 2.2 g/kg produce no additional hypertrophy in most contexts.',
            },
          ],
        },
      },

      // ── Module 3: Fat Loss Science ───────────────────────────────────────────
      {
        id: 'fat-loss-science',
        title: 'Evidence-Based Fat Loss',
        lessons: [
          {
            id: 'fl-deficit',
            title: 'Creating a Caloric Deficit While Preserving Muscle',
            estimatedMinutes: 5,
            content: `Fat loss requires a caloric deficit — consuming less energy than your body expends over time. The art lies in making the deficit large enough to produce meaningful fat loss without triggering the adaptive responses that erode muscle mass.

**The Role of Protein in Preserving Muscle During a Deficit**
When calories are restricted, the body turns to stored fuel — both fat and, to a degree, lean tissue. The primary defence against lean mass catabolism during a cut is adequate dietary protein. Protein provides amino acids that signal the body to preserve existing muscle tissue and has the highest satiety per calorie of any macronutrient.

Research by Helms et al. (2014) in drug-free bodybuilders found that intakes of **2.3–3.1 g/kg of lean body mass** during a caloric deficit were needed to maximize lean mass retention — higher than the recommendation for muscle gain because the body in a deficit is more catabolic. A practical starting point is 2.0–2.4 g/kg of total bodyweight when body fat is moderate.

**Resistance Training Preserves Lean Mass During Fat Loss**
Cardio alone during a deficit produces faster weight loss but accelerates lean mass loss. Adding resistance training sends a powerful anabolic signal that preserves the muscle protein you have built. A meta-analysis by Stokes et al. (2018) confirmed that combining resistance training with a deficit results in significantly better lean mass retention compared to cardio-only approaches.

**Deficit Size and Rate of Loss**
A deficit of 300–500 kcal/day producing 0.5–1.0 lb/week is generally optimal. Rates faster than 1% bodyweight per week are consistently associated with disproportionate lean mass loss, even with high protein. For most people, patience and a sustainable deficit outperform aggressive short cuts.`,
            keyPoints: [
              'A deficit of 300–500 kcal/day (0.5–1 lb/week loss) minimizes muscle loss compared to aggressive deficits.',
              'Protein during a deficit should be 2.0–2.4 g/kg/day — higher than for muscle gain because the catabolic environment requires more stimulus to retain lean tissue.',
              'Resistance training during a cut is essential for preserving lean mass — it provides a powerful anti-catabolic signal.',
              'Loss rates faster than 1% bodyweight per week consistently accelerate lean mass loss regardless of protein intake.',
            ],
            references: [
              {
                title: 'Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation',
                authors: 'Helms ER, Aragon AA, Fitschen PJ',
                journal: 'Journal of the International Society of Sports Nutrition',
                year: 2014,
                url: 'https://pubmed.ncbi.nlm.nih.gov/24864135/',
                type: 'review',
              },
              {
                title: 'Dietary protein and muscle mass: translating science to application and health benefit',
                authors: 'Stokes T, Hector AJ, Morton RW, et al.',
                journal: 'Nutrients',
                year: 2018,
                url: 'https://pubmed.ncbi.nlm.nih.gov/29477227/',
                type: 'review',
              },
            ],
          },
          {
            id: 'fl-recomposition',
            title: 'Body Recomposition: Gaining Muscle While Losing Fat',
            estimatedMinutes: 5,
            content: `Body recomposition — simultaneously losing fat and gaining muscle — is widely considered impossible in mainstream fitness culture. The evidence suggests this is an oversimplification. Recomposition is real, but it is strongly context-dependent.

**Who Can Recomp?**
Research consistently identifies three groups who can achieve significant simultaneous muscle gain and fat loss:

1. **True beginners (0–6 months of training):** The "newbie gains" phenomenon is well-documented. Beginners experience such a strong anabolic response to resistance training — mediated by elevated muscle protein synthesis and insulin sensitivity — that even in a caloric deficit or maintenance, they can gain muscle while losing fat. Studies by Barakat et al. (2020) confirmed meaningful recomposition in untrained individuals at maintenance calories.

2. **Detrained individuals returning to training:** Muscle memory is a real phenomenon driven by the retention of myonuclei (the nuclei within muscle fibers persist after detraining). Returning trainees re-grow muscle faster than true beginners and can achieve recomposition for months.

3. **Individuals with significant body fat to lose:** Adipose tissue can be mobilized as a caloric substrate even when the diet is at maintenance, effectively providing internal energy surplus for muscle protein synthesis while the external intake supports maintenance.

**The Protein Priority Strategy**
Regardless of goal, protein is the macronutrient that most reliably supports recomposition. At high intakes (2.0–2.4 g/kg), protein simultaneously:
- Maximizes muscle protein synthesis
- Is highly satiating, reducing total caloric intake passively
- Has the highest TEF (~25–30%), meaning a portion of protein calories are "spent" in digestion

For individuals targeting recomposition, a practical approach is to set protein high, maintain moderate total calories close to TDEE, and use resistance training as the primary body composition tool rather than relying on aggressive caloric restriction.`,
            keyPoints: [
              'Body recomposition (gaining muscle while losing fat) is achievable for beginners, detrained individuals returning to training, and those with significant fat to lose.',
              'Newbie gains are driven by a high anabolic response to novel resistance training stimulus — allowing muscle gain even in a deficit.',
              'Muscle memory (retained myonuclei after detraining) allows re-trainees to build muscle faster than true beginners.',
              'High protein intake (2.0–2.4 g/kg), moderate calories near TDEE, and resistance training is the optimal recomposition strategy.',
            ],
            references: [
              {
                title: 'Body Recomposition: Can Trained Individuals Build Muscle and Lose Fat at the Same Time?',
                authors: 'Barakat C, Pearson J, Escalante G, et al.',
                journal: 'Strength and Conditioning Journal',
                year: 2020,
                url: 'https://journals.lww.com/nsca-scj/fulltext/2020/10000/body_recomposition__can_trained_individuals_build.3.aspx',
                type: 'review',
              },
              {
                title: 'Myonuclei acquired by overload exercise precede hypertrophy and are not lost on detraining',
                authors: 'Bruusgaard JC, Johansen IB, Egner IM, et al.',
                journal: 'Proceedings of the National Academy of Sciences',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/20713720/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'fl-quiz',
          questions: [
            {
              id: 'fl-q1',
              question: 'What protein intake is recommended for maximizing lean mass retention during a caloric deficit?',
              options: [
                '0.8 g/kg/day (standard RDA)',
                '1.2–1.4 g/kg/day',
                '2.0–2.4 g/kg/day',
                '4.0–5.0 g/kg/day',
              ],
              correctIndex: 2,
              explanation:
                'Protein requirements are higher during a deficit than for muscle gain because the catabolic environment (low energy availability, elevated cortisol) increases muscle protein breakdown. Research in natural bodybuilders suggests 2.3–3.1 g/kg lean mass, which translates to roughly 2.0–2.4 g/kg total bodyweight for most trainees.',
            },
            {
              id: 'fl-q2',
              question: 'Which group is LEAST likely to achieve meaningful body recomposition?',
              options: [
                'True beginners starting resistance training for the first time',
                'Detrained individuals returning after a long break',
                'Advanced lifters at low body fat with years of consistent training',
                'Individuals with significant excess body fat',
              ],
              correctIndex: 2,
              explanation:
                'Advanced, lean, trained individuals have already captured most beginner and intermediate gains, have low myonuclei turnover potential, and are close to their genetic ceiling. For them, dedicated bulk or cut phases are generally more efficient than attempting simultaneous recomposition.',
            },
            {
              id: 'fl-q3',
              question: 'What is "muscle memory" in the context of returning to training after a detraining period?',
              options: [
                'The nervous system remembers exercise technique but muscles must be rebuilt from scratch',
                'Myonuclei are retained in muscle fibers after detraining, allowing faster re-growth when training resumes',
                'Body fat stores from a previous bulk are preferentially used during re-training',
                'The motor cortex retains movement patterns but muscle fiber size is unchanged',
              ],
              correctIndex: 1,
              explanation:
                'Research by Bruusgaard et al. (2010) demonstrated that myonuclei — the nuclei within muscle fibers that support protein synthesis — persist in the fiber long after detraining and the associated size reduction. When training resumes, these retained nuclei accelerate re-hypertrophy significantly compared to the initial period of training.',
            },
          ],
        },
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getModuleById(courseId: string, moduleId: string) {
  return getCourseById(courseId)?.modules.find((m) => m.id === moduleId);
}

export function getAllLessonIds(courseId: string): string[] {
  return getCourseById(courseId)?.modules.flatMap((m) =>
    m.lessons.map((l) => l.id),
  ) ?? [];
}
