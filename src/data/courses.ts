import type { Course } from '../types';

const detailedCourses: Course[] = [
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
];

// ─── Course Scaffolds (Sprint E will populate remaining content) ──────────────

const courseScaffolds: Course[] = [
  // ── Foundations (3 more — Sprint D) ───────────────────────────────────────
  {
    id: 'recovery-science',
    title: 'Recovery & Sleep Science',
    description: 'Understand how sleep, stress management, and active recovery drive adaptation and performance.',
    category: 'recovery',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    relatedGoals: ['hypertrophy', 'general-fitness'],
    tags: ['sleep', 'recovery', 'cortisol', 'HRV'],
    coverEmoji: '😴',
    modules: [
      // ── Module 1: Sleep & Adaptation ──────────────────────────────────────
      {
        id: 'sleep-adaptation',
        title: 'Sleep & Training Adaptation',
        lessons: [
          {
            id: 'rs-sleep-why',
            title: 'Why Sleep Is Non-Negotiable',
            estimatedMinutes: 5,
            content: `Sleep is the single most powerful recovery tool available — and it costs nothing. During slow-wave sleep (SWS), the pituitary gland releases the majority of the day's growth hormone, which drives muscle protein synthesis, tissue repair, and fat metabolism.

Research from the Stanford Sleep Research Center by Cheri Mah et al. (2011) found that extending sleep to 10 hours per night in basketball players produced measurable improvements in sprint times, shooting accuracy, and reaction time. Conversely, even one night of partial sleep deprivation (< 6 hours) impairs protein synthesis rates, elevates cortisol, and reduces testosterone — the hormonal environment for adaptation shifts sharply negative.

The NSCA recommends 7–9 hours for adults engaged in regular resistance training. Athletes and those in high-volume training phases may benefit from 9–10 hours. The practical rule: if you're setting an alarm, you may not be getting enough sleep.

**Slow-wave sleep and REM sleep both matter.** SWS dominates the first half of the night and drives physical repair. REM sleep — concentrated in the second half — consolidates motor learning and procedural memory (how to perform lifts correctly). Cutting a night short by 90 minutes significantly shortens REM duration.`,
            keyPoints: [
              'Growth hormone secretion peaks during slow-wave sleep — cutting sleep short blunts muscle repair.',
              'One night of < 6 hours raises cortisol, lowers testosterone, and impairs protein synthesis.',
              'REM sleep consolidates motor learning — critical for technique refinement.',
              'Target 7–9 hours; athletes in high-volume phases benefit from 9–10.',
            ],
            references: [
              {
                title: 'The Effects of Sleep Extension on the Athletic Performance of Collegiate Basketball Players',
                authors: 'Mah CD, Mah KE, Kezirian EJ, Dement WC',
                journal: 'Sleep',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21731144/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'rs-sleep-quality',
            title: 'Optimising Sleep Quality',
            estimatedMinutes: 5,
            content: `Sleep duration is necessary but not sufficient — quality (sleep architecture) matters too. Fragmented sleep with frequent awakenings reduces time in restorative SWS and REM regardless of total hours in bed.

**Temperature.** Core body temperature must drop ~1–1.5°C to initiate sleep. A bedroom temperature of 16–19°C (60–67°F) is optimal. A warm shower 1–2 hours before bed paradoxically accelerates sleep onset by causing rapid peripheral heat loss afterward.

**Light.** Blue-wavelength light (from screens, LED lighting) suppresses melatonin secretion — the signal that tells the body it's dark and time to sleep. Bright overhead lights in the evening delay circadian rhythm. Dimming lights and removing blue light exposure 60–90 minutes before bed significantly reduces sleep latency.

**Consistency.** The circadian rhythm operates on a 24-hour clock synchronized to light exposure. Consistent wake times — even on weekends — are the most effective anchor for circadian alignment. Variable sleep schedules (social jet lag) create the same cortisol dysregulation as crossing time zones.

**Caffeine.** Caffeine has a half-life of approximately 5–7 hours. A 200 mg dose at 2 pm still leaves ~100 mg active at 7 pm — enough to increase nighttime wakefulness and reduce SWS. Cutting off caffeine by early-mid afternoon protects sleep architecture.`,
            keyPoints: [
              'Bedroom temperature 16–19°C optimises sleep initiation by facilitating core cooling.',
              'Blue light before bed suppresses melatonin; dim lights 60–90 minutes before sleep.',
              'A consistent wake time is the strongest circadian anchor — including weekends.',
              'Caffeine cut-off in early afternoon protects slow-wave sleep.',
            ],
            references: [
              {
                title: 'Sleep and Human Aging',
                authors: 'Mander BA, Winer JR, Walker MP',
                journal: 'Neuron',
                year: 2017,
                url: 'https://pubmed.ncbi.nlm.nih.gov/28384471/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'sleep-quiz',
          questions: [
            {
              id: 'slq-1',
              question: 'When does the majority of daily growth hormone release occur?',
              options: [
                'During intense resistance training sets',
                'Immediately after eating a high-protein meal',
                'During slow-wave sleep (deep sleep) at night',
                'In the first 30 minutes after waking',
              ],
              correctIndex: 2,
              explanation: 'Growth hormone is primarily secreted in pulses during slow-wave sleep (SWS), especially in the first half of the night. This is why sleep is the key window for muscle repair and anabolic recovery.',
            },
            {
              id: 'slq-2',
              question: 'Which type of sleep is most important for motor learning and technique consolidation?',
              options: [
                'Slow-wave sleep (SWS)',
                'REM sleep',
                'Light sleep (stage 1–2)',
                'All stages contribute equally',
              ],
              correctIndex: 1,
              explanation: 'REM sleep — concentrated in the second half of the night — is when the brain consolidates procedural and motor memories. Cutting a night short typically reduces REM disproportionately, impairing technique learning.',
            },
            {
              id: 'slq-3',
              question: 'What is the optimal bedroom temperature range for sleep?',
              options: [
                '22–25°C (72–77°F) — warm and comfortable',
                '10–14°C (50–57°F) — cold room, warm duvet',
                '16–19°C (60–67°F) — cool environment',
                'Temperature has no meaningful effect on sleep quality',
              ],
              correctIndex: 2,
              explanation: 'Core body temperature must drop ~1°C to initiate sleep. A cool room of 16–19°C facilitates this drop. A room that is too warm impairs the transition into deep sleep and increases nighttime awakenings.',
            },
          ],
        },
      },

      // ── Module 2: Recovery Strategies ─────────────────────────────────────
      {
        id: 'recovery-strategies',
        title: 'Stress, Cortisol & Active Recovery',
        lessons: [
          {
            id: 'rs-cortisol',
            title: 'Stress, Cortisol & Training Adaptation',
            estimatedMinutes: 5,
            content: `Cortisol is often portrayed as a purely negative hormone — but this is an oversimplification. Acute cortisol spikes during training are normal and facilitate energy mobilisation, immune function, and alertness. The problem arises with chronically elevated cortisol, which actively opposes the anabolic environment needed for adaptation.

**The allostatic load.** The body does not distinguish between sources of stress. Work deadlines, relationship conflict, financial pressure, poor sleep, and training volume all draw from the same stress-response pool. An athlete managing high life stress should consider reducing training volume — not adding more.

**Cortisol and muscle protein balance.** Cortisol promotes proteolysis (muscle breakdown) and inhibits protein synthesis. Chronically elevated cortisol suppresses testosterone and growth hormone, directly impairing hypertrophy. Studies measuring salivary cortisol in athletes show that overreaching (excessive training volume without adequate recovery) produces sustained cortisol elevation lasting weeks.

**Practical management.** Deload weeks (a planned 40–50% reduction in volume every 4–8 weeks) allow systemic stress to resolve. Monitoring subjective markers — training motivation, morning mood, resting heart rate, and sleep quality — provides early warning of accumulation before it becomes overtraining syndrome.`,
            keyPoints: [
              'Acute cortisol spikes during training are normal; chronically high cortisol impairs adaptation.',
              'All stressors — physical and psychological — deplete the same systemic stress budget.',
              'Cortisol promotes muscle breakdown and suppresses testosterone and growth hormone.',
              'Deload weeks and subjective monitoring are the primary tools for managing allostatic load.',
            ],
            references: [
              {
                title: 'Neuroendocrine Responses and Adaptations to Strength and Power Training',
                authors: 'Kraemer WJ, Ratamess NA',
                journal: 'Sports Medicine',
                year: 2005,
                url: 'https://pubmed.ncbi.nlm.nih.gov/15831061/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'rs-active-recovery',
            title: 'Active Recovery: What Actually Works',
            estimatedMinutes: 5,
            content: `Active recovery refers to low-intensity movement performed on rest days or after hard training sessions. The evidence on active recovery is more nuanced than popular belief suggests — some methods have real benefit; others have little effect.

**What works:**
**Light aerobic movement** (walking, easy cycling, light swimming at < 60% max HR) increases blood flow, enhances metabolite clearance, and can reduce muscle soreness (DOMS) perception without adding meaningful training stress.

**Cold water immersion (CWI)** — ice baths or cold showers — reduces acute inflammation and DOMS perception. However, research by Roberts et al. (2015) found that regular CWI blunts hypertrophic signalling by suppressing satellite cell activity and mTOR pathway activation. Use sparingly if hypertrophy is the goal; more appropriate for competition phases where rapid recovery between sessions matters.

**Foam rolling / soft-tissue work** reduces perceived soreness and transiently improves range of motion through neurological mechanisms. The effect on actual tissue repair is negligible, but reduced perception of tightness may improve subsequent session quality.

**What doesn't work:** Passive rest alone is not "active recovery" and does not accelerate metabolite clearance. Sauna use post-exercise may feel restorative but the evidence for accelerating structural recovery is weak.`,
            keyPoints: [
              'Light aerobic movement on rest days enhances blood flow and reduces DOMS perception.',
              'Cold water immersion reduces soreness but may blunt hypertrophy if used chronically.',
              'Foam rolling reduces perceived tightness via neurological effects — not tissue repair.',
              'The best recovery strategy combines sleep, sufficient protein, and managed training stress.',
            ],
            references: [
              {
                title: 'Post-exercise cold water immersion attenuates acute anabolic signalling',
                authors: 'Roberts LA, Raastad T, Markworth JF, et al.',
                journal: 'Journal of Physiology',
                year: 2015,
                url: 'https://pubmed.ncbi.nlm.nih.gov/26174323/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'recovery-strat-quiz',
          questions: [
            {
              id: 'rsq-1',
              question: 'Regular cold water immersion may blunt muscle growth because it:',
              options: [
                'Reduces blood flow to muscles for up to 24 hours',
                'Suppresses satellite cell activity and mTOR signalling',
                'Lowers body temperature, reducing protein synthesis rates',
                'Cold immersion has no effect on hypertrophy',
              ],
              correctIndex: 1,
              explanation: 'Research by Roberts et al. (2015) found that post-exercise cold water immersion suppresses satellite cell activity and mTOR pathway activation — the cellular machinery driving muscle growth. It may benefit recovery speed in competition phases but is counterproductive for maximising hypertrophy.',
            },
            {
              id: 'rsq-2',
              question: 'Chronically elevated cortisol negatively affects muscle growth primarily by:',
              options: [
                'Reducing appetite, leading to insufficient protein intake',
                'Increasing heart rate, making training less efficient',
                'Promoting muscle breakdown and suppressing anabolic hormones',
                'Blocking glucose uptake in muscle cells',
              ],
              correctIndex: 2,
              explanation: 'Chronically elevated cortisol promotes proteolysis (muscle protein breakdown) and suppresses both testosterone and growth hormone secretion. This creates a sustained catabolic environment that directly opposes hypertrophic adaptation.',
            },
            {
              id: 'rsq-3',
              type: 'true-false',
              question: 'Performing light aerobic activity (walking, easy cycling) on rest days can reduce delayed onset muscle soreness (DOMS) without significantly adding to training stress.',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Light aerobic movement at under 60% max HR increases blood flow and promotes metabolite clearance, reducing the perception of DOMS — without the intensity needed to accumulate meaningful additional training stress.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'mobility-flexibility',
    title: 'Mobility & Flexibility',
    description: 'A systematic approach to joint mobility, tissue extensibility, and movement quality.',
    category: 'mobility',
    difficulty: 'beginner',
    estimatedMinutes: 40,
    relatedGoals: ['general-fitness'],
    tags: ['mobility', 'flexibility', 'range of motion', 'warmup'],
    coverEmoji: '🤸',
    modules: [
      // ── Module 1: Understanding Mobility ──────────────────────────────────
      {
        id: 'mobility-basics',
        title: 'Understanding Mobility',
        lessons: [
          {
            id: 'mob-vs-flex',
            title: "Mobility vs Flexibility — What's the Difference?",
            estimatedMinutes: 5,
            content: `Mobility and flexibility are often used interchangeably, but they describe distinct qualities with different training implications.

**Flexibility** is the passive range of motion of a muscle or joint — how far a limb can be moved when no muscular force is applied (e.g., a partner stretching your hamstring). Flexibility is a tissue property.

**Mobility** is the active, usable range of motion — the range through which you can move with control and strength. You can be flexible without being mobile: a hypermobile person who cannot control end-range positions is injury-prone precisely because they lack the strength to stabilise extreme positions.

The training goal is **mobile strength** — range of motion that is both available and under neuromuscular control. This is what translates to safer, more effective lifting.

**Why it matters for lifting.** Deep squat mobility allows a more upright torso and less spinal loading. Hip mobility affects hip hinge mechanics in the deadlift. Thoracic mobility determines how safely you can overhead press. Deficiencies in joint mobility create compensations upstream and downstream in the kinetic chain — the famous "joint-by-joint" model by Gray Cook and Mike Boyle describes how restricted joints force adjacent joints to become hypermobile, predisposing them to injury.`,
            keyPoints: [
              'Flexibility = passive range of motion. Mobility = active, controlled range of motion.',
              'Hypermobility without neuromuscular control increases injury risk.',
              'The goal is mobile strength — range of motion with control and stability.',
              'Mobility restrictions in one joint force compensations at adjacent joints.',
            ],
            references: [
              {
                title: 'Movement: Functional Movement Systems',
                authors: 'Cook G',
                journal: 'On Target Publications',
                year: 2010,
                url: 'https://functionalmovement.com/',
                type: 'guideline',
              },
            ],
          },
          {
            id: 'mob-principles',
            title: 'Principles of Mobility Training',
            estimatedMinutes: 5,
            content: `Effective mobility training follows a few core principles that distinguish it from simple static stretching.

**1. Progressive overload applies.** Like strength training, mobility adapts to progressive stimulus. Consistently working at the limit of your comfortable range — and gradually pushing that edge — is more effective than the same stretches performed at the same range indefinitely.

**2. Neurological vs structural change.** Most acute gains from stretching are neurological — the nervous system relaxes its protective tone. Sustained structural change (actual tissue lengthening) requires consistent practice over weeks to months. Stretching once a week produces minimal lasting change.

**3. End-range strengthening.** The most durable mobility gains come from strengthening muscles in their lengthened positions. This signals to the nervous system that the range is safe to access. Exercises like the Romanian deadlift (hamstrings under load at length) or the deep squat with heel elevation develop end-range strength.

**4. Frequency over duration.** 10 minutes of mobility work 5× per week produces more adaptation than 50 minutes once a week, because connective tissue responds to consistent stimulation rather than infrequent overload.

**5. Warm tissue is more extensible.** Mobility work is more effective after a general warm-up (5–10 minutes light aerobic activity) than cold. Dynamic stretching (controlled movement through range) is preferable to static stretching before a training session, as static stretching immediately before can transiently reduce force production.`,
            keyPoints: [
              'Progressive overload applies to mobility — gradually push range limits.',
              'Most acute stretch gains are neurological; structural change takes weeks of consistency.',
              'Strengthening muscles at end range produces the most durable mobility gains.',
              '10 min × 5 days beats 50 min × 1 day for connective tissue adaptation.',
            ],
            references: [
              {
                title: 'A Review of the Acute Effects of Static and Dynamic Stretching on Performance',
                authors: 'Behm DG, Chaouachi A',
                journal: 'European Journal of Applied Physiology',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21373870/',
                type: 'meta-analysis',
              },
            ],
          },
        ],
        quiz: {
          id: 'mob-basics-quiz',
          questions: [
            {
              id: 'mbq-1',
              question: 'Which best defines "mobility" in the context of movement training?',
              options: [
                'The maximum range of motion achievable when a partner assists the stretch',
                'Active range of motion with neuromuscular control and strength',
                'The total length of a muscle measured from origin to insertion',
                'The flexibility of tendons and ligaments around a joint',
              ],
              correctIndex: 1,
              explanation: 'Mobility is active, controllable range of motion — the range through which you can move under your own muscular control. Flexibility is the passive range when no active force is applied. Mobility = flexibility + control.',
            },
            {
              id: 'mbq-2',
              question: 'Why is static stretching immediately before lifting generally not recommended?',
              options: [
                'It raises core temperature too much, increasing injury risk',
                'It can transiently reduce force production in the stretched muscles',
                'Static stretching shortens muscle fibres before training',
                'It increases joint laxity permanently, reducing stability',
              ],
              correctIndex: 1,
              explanation: 'Research shows acute static stretching (especially > 30–60 seconds) can transiently reduce maximal force output by 5–8% in the stretched muscle. Dynamic warm-up and mobility drills are preferred pre-session; static stretching is better placed post-session or in a dedicated mobility block.',
            },
            {
              id: 'mbq-3',
              type: 'true-false',
              question: 'Performing 10 minutes of mobility work five days per week is generally more effective than 50 minutes once per week.',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Connective tissue (tendons, ligaments, fascia) responds better to frequent, consistent stimulation than infrequent overload. Regular short sessions maintain the adaptive signal throughout the week, producing greater long-term range of motion gains.',
            },
          ],
        },
      },

      // ── Module 2: Practical Mobility Work ─────────────────────────────────
      {
        id: 'mobility-practice',
        title: 'The Warm-Up Blueprint & Key Drills',
        lessons: [
          {
            id: 'mob-warmup',
            title: 'The Warm-Up Blueprint',
            estimatedMinutes: 5,
            content: `A well-structured warm-up does three things: raises tissue temperature, activates neuromuscular patterns specific to the session ahead, and addresses the mobility limitations most relevant to the day's training.

**Phase 1 — General warm-up (3–5 min).** Light cardio (row, bike, skip, brisk walk) to elevate heart rate, increase blood flow, and raise tissue temperature. Warm muscle is more extensible and neurons fire more efficiently. Never skip this phase.

**Phase 2 — Targeted mobility (5–8 min).** Address the joints that will be under load in the session. For a squat session: hip flexors (couch stretch or lunge with rotation), hip internal rotation (90/90 stretch), ankle dorsiflexion (wall ankle mobilisation). For pressing: thoracic extension, shoulder external rotation. Use dynamic movements rather than long static holds at this stage.

**Phase 3 — Activation (3–5 min).** Activate the muscles that tend to be inhibited — commonly glutes, scapular stabilisers, and core. Banded clamshells for hip abductors, face pulls for scapular retractors, dead bugs for core. This "turns on" the muscles before they are needed.

**Phase 4 — Specific warm-up sets.** Perform 2–3 progressively heavier sets of the main movement at reduced load (e.g., bar only, then 50%, then 70% before working sets). This rehearses the movement pattern and primes the CNS.

The total warm-up time is 15–20 minutes. Cutting corners on the warm-up is a false economy — it is where injury prevention happens.`,
            keyPoints: [
              'Phase 1: general aerobic warm-up to raise tissue temperature.',
              'Phase 2: targeted dynamic mobility for the joints being loaded.',
              'Phase 3: activation of inhibited muscles (glutes, scapular stabilisers, core).',
              'Phase 4: specific warm-up sets in the main movement.',
            ],
            references: [
              {
                title: 'The Effect of a Warm-Up on Physical Performance: A Systematic Review',
                authors: 'Fradkin AJ, Zazryn TR, Smoliga JM',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/20072040/',
                type: 'meta-analysis',
              },
            ],
          },
          {
            id: 'mob-key-drills',
            title: 'Key Mobility Drills for Lifters',
            estimatedMinutes: 5,
            content: `The following mobility areas are the most commonly limited in people who train with weights and the most impactful to address.

**Hip flexors.** Prolonged sitting shortens hip flexors (psoas, rectus femoris), pulling the pelvis into anterior tilt and limiting hip extension — essential for the deadlift lockout, sprint mechanics, and upright squat posture. The couch stretch (knee against wall, hip into extension) is one of the most effective tools. 2 × 60 seconds per side daily is a practical starting point.

**Ankle dorsiflexion.** Limited ankle ROM is the most common reason trainees cannot achieve a full-depth squat with heels flat. The talus must glide posteriorly to allow the shin to move forward. Wall ankle mobilisations (knee tracking over the 4th toe toward the wall) address this specific restriction. If a heel raise resolves the problem, ankle mobility is the limiting factor.

**Thoracic spine extension.** A stiff thoracic spine limits overhead pressing, causes excessive lumbar extension as compensation, and impairs scapular mechanics. Foam rolling thoracic extension over a roller (segmental extension across the roller, moving it up the spine) restores extension. Thoracic rotation — seated twists with arms across chest — improves rotation for unilateral pressing and rotational sports.

**Hip internal rotation.** Many lifters lack internal rotation, which forces the knees to cave inward during the squat (valgus collapse). The 90/90 stretch — sitting with both hips at 90° and alternating between internal and external rotation — is highly effective for developing hip rotational range.`,
            keyPoints: [
              'Hip flexor restriction causes anterior pelvic tilt, limiting hip extension and squat depth.',
              'Ankle dorsiflexion limits are the most common cause of limited squat depth with heels flat.',
              'Thoracic stiffness forces lumbar compensation during pressing and overhead movements.',
              'Hip internal rotation deficits contribute to knee valgus collapse during the squat.',
            ],
            references: [
              {
                title: 'Muscle imbalances and the importance of functional assessment in rehabilitation of athletes',
                authors: 'Page P',
                journal: 'International Journal of Sports Physical Therapy',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21655453/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'mob-practice-quiz',
          questions: [
            {
              id: 'mpq-1',
              question: 'If a lifter can achieve a full-depth squat with their heels raised on a plate, but not with heels flat, what is most likely the limiting factor?',
              options: [
                'Weak glutes and quadriceps',
                'Poor thoracic spine mobility',
                'Limited ankle dorsiflexion range of motion',
                'Tight hip flexors pulling the pelvis into anterior tilt',
              ],
              correctIndex: 2,
              explanation: 'Heel elevation compensates for limited ankle dorsiflexion by shifting the angle required at the ankle. When the problem resolves with a heel raise, ankle dorsiflexion is the primary restriction. Wall ankle mobilisations (knee to wall) address this directly.',
            },
            {
              id: 'mpq-2',
              question: 'What is the correct order of a well-structured training warm-up?',
              options: [
                'Activation → Specific warm-up sets → General cardio → Targeted mobility',
                'Targeted mobility → General cardio → Activation → Specific warm-up sets',
                'General cardio → Targeted mobility → Activation → Specific warm-up sets',
                'Specific warm-up sets → General cardio → Targeted mobility → Activation',
              ],
              correctIndex: 2,
              explanation: 'The correct sequence is: general cardio (raise tissue temperature) → targeted dynamic mobility (prepare specific joints) → activation (turn on inhibited muscles) → specific warm-up sets (rehearse the movement). Skipping the cardio phase means performing mobility work on cold tissue, which reduces effectiveness.',
            },
            {
              id: 'mpq-3',
              question: 'Thoracic spine stiffness most commonly causes problems during which movements?',
              options: [
                'Romanian deadlifts and leg press',
                'Barbell back squat and calf raises',
                'Overhead pressing and front squat',
                'Seated cable rows and lat pulldown',
              ],
              correctIndex: 2,
              explanation: 'Thoracic extension is required for safe overhead pressing (the ribcage must extend to allow the arms to reach vertical). In the front squat, a stiff thoracic spine prevents an upright torso position, causing the elbows to drop and the bar to shift forward. These movements require the most thoracic mobility.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'cardio-conditioning',
    title: 'Cardio & Conditioning',
    description: 'Heart rate zones, energy systems, and how to programme endurance work alongside strength training.',
    category: 'cardio',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    relatedGoals: ['fat-loss', 'general-fitness'],
    tags: ['cardio', 'VO2max', 'HIIT', 'zone 2'],
    coverEmoji: '🏃',
    modules: [
      // ── Module 1: Energy Systems & Heart Rate ──────────────────────────────
      {
        id: 'energy-systems',
        title: 'Energy Systems & Heart Rate Zones',
        lessons: [
          {
            id: 'cc-energy-systems',
            title: 'The Three Energy Systems',
            estimatedMinutes: 5,
            content: `All physical activity is fuelled by ATP (adenosine triphosphate) — the universal energy currency of cells. The body has three overlapping systems to regenerate ATP from food, each dominant at different durations and intensities.

**1. Phosphocreatine (PCr) system — 0 to 10 seconds.** The fastest system; uses stored creatine phosphate to regenerate ATP without oxygen. Powers maximal-effort sprints, Olympic lifts, and throws. Depletes rapidly — a 100m sprint nearly exhausts PCr stores. Replenished fully within 3–5 minutes of rest.

**2. Glycolytic system — 10 seconds to ~2 minutes.** Breaks down glucose (from blood or stored glycogen) to produce ATP without oxygen (anaerobic glycolysis). Also produces lactate — not the cause of the "burn" (that is hydrogen ions), but a useful energy substrate. Dominant during 400m runs, short HIIT intervals, and sets of 10–20 reps close to failure.

**3. Oxidative (aerobic) system — 2 minutes and beyond.** Uses oxygen to completely oxidise carbohydrates and fats. Highly efficient — can produce far more ATP per substrate molecule than the other systems. Dominant during moderate to low-intensity efforts sustained beyond 2 minutes: jogging, cycling, longer swimming. Fat oxidation increases as intensity drops and duration extends.

The systems are not switches — they overlap continuously. A 10-second sprint still uses the oxidative system (just to a small degree). What changes is the proportion. Training specific systems increases the capacity and efficiency of each pathway.`,
            keyPoints: [
              'PCr system (0–10s): maximal efforts; replenishes in 3–5 min.',
              'Glycolytic system (10s–2min): moderate-to-high intensity; produces lactate.',
              'Aerobic system (2min+): burns fat and carbs with oxygen; dominant at sustained moderate effort.',
              'All three systems operate simultaneously — intensity determines which predominates.',
            ],
            references: [
              {
                title: 'Exercise Physiology: Nutrition, Energy, and Human Performance',
                authors: 'McArdle WD, Katch FI, Katch VL',
                journal: 'Lippincott Williams & Wilkins',
                year: 2015,
                url: 'https://www.ncbi.nlm.nih.gov/nlmcatalog/101241016',
                type: 'guideline',
              },
            ],
          },
          {
            id: 'cc-hr-zones',
            title: 'Heart Rate Zones Explained',
            estimatedMinutes: 5,
            content: `Heart rate zones are a practical framework for quantifying training intensity. They roughly map to the energy systems being used and the physiological adaptations being targeted.

**Zone 1 (50–60% HRmax): Very light.** Recovery and movement. Fat oxidation is high. Minimal cardiovascular stress. Suitable for active recovery days.

**Zone 2 (60–70% HRmax): Aerobic base / fat burning.** The training zone most associated with mitochondrial biogenesis — growth of new mitochondria in muscle cells. Sustained Zone 2 work (20–90 min sessions) is the primary driver of aerobic capacity and fat-burning efficiency. Conversational pace — you can speak in full sentences. Elite endurance athletes spend ~80% of their volume here.

**Zone 3 (70–80% HRmax): Aerobic threshold.** The "moderate" intensity zone — harder than a comfortable pace but not a full effort. Cardiorespiratory stress increases. Less effective at producing aerobic adaptations per unit of fatigue than Zone 2 (hence why many coaches advise against spending too much time here).

**Zone 4 (80–90% HRmax): Lactate threshold.** Just above the point where lactate clearance can keep pace with production. Sustainable for 20–60 minutes. Interval sessions targeting VO2max often operate here.

**Zone 5 (90–100% HRmax): VO2max / maximal.** Short intervals (30s–4min). Dramatically improves maximal oxygen uptake. Very taxing — requires significant recovery. Use sparingly.

**Estimating max HR:** 220 − age is a rough population estimate. A more accurate method: 208 − (0.7 × age) (Tanaka formula).`,
            keyPoints: [
              'Zone 2 (60–70% HRmax) drives mitochondrial growth and fat-burning efficiency.',
              'Elite endurance athletes spend ~80% of volume in Zone 2.',
              'Zone 3 ("moderate") produces high fatigue relative to aerobic adaptation — often a zone to avoid lingering in.',
              'Zones 4–5 target VO2max and lactate threshold — high benefit but high recovery cost.',
            ],
            references: [
              {
                title: 'Age-predicted maximal heart rate revisited',
                authors: 'Tanaka H, Monahan KD, Seals DR',
                journal: 'Journal of the American College of Cardiology',
                year: 2001,
                url: 'https://pubmed.ncbi.nlm.nih.gov/11153730/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'energy-systems-quiz',
          questions: [
            {
              id: 'esq-1',
              question: 'Which energy system is the primary fuel source for a 10-second maximal sprint?',
              options: [
                'Aerobic (oxidative) system',
                'Glycolytic system',
                'Phosphocreatine (PCr) system',
                'All three systems contribute equally',
              ],
              correctIndex: 2,
              explanation: 'The PCr (phosphocreatine) system regenerates ATP without oxygen at the fastest rate — making it dominant for maximal efforts lasting under 10 seconds such as sprints, jumps, and Olympic lifts. It fully replenishes within 3–5 minutes of rest.',
            },
            {
              id: 'esq-2',
              question: 'Zone 2 training (60–70% HRmax) is particularly valuable because it:',
              options: [
                'Maximises calorie burn per unit of time versus other zones',
                'Primarily drives mitochondrial biogenesis and fat oxidation efficiency',
                'Develops maximal oxygen uptake (VO2max) faster than any other zone',
                'Is the only zone that uses fat as a fuel source',
              ],
              correctIndex: 1,
              explanation: 'Zone 2 is the primary driver of mitochondrial biogenesis — the growth of new mitochondria in muscle cells. More mitochondria increases aerobic capacity and the rate of fat oxidation. Elite endurance athletes spend approximately 80% of training volume in Zone 2 for this reason.',
            },
            {
              id: 'esq-3',
              question: 'After a maximal sprint, how long does the PCr system require to fully replenish its energy stores?',
              options: [
                '30–60 seconds',
                '1–2 minutes',
                '3–5 minutes',
                '10–15 minutes',
              ],
              correctIndex: 2,
              explanation: 'Phosphocreatine stores fully replenish within approximately 3–5 minutes of rest after a maximal sprint. This is why Olympic lifting and sprint training programs prescribe 3–5 minute rest periods between sets — shorter rests mean incomplete PCr recovery and reduced performance on subsequent sets.',
            },
          ],
        },
      },

      // ── Module 2: Programming Cardio ───────────────────────────────────────
      {
        id: 'cardio-programming',
        title: 'Programming Cardio with Strength Training',
        lessons: [
          {
            id: 'cc-zone2',
            title: 'Zone 2 Training: The Aerobic Base',
            estimatedMinutes: 5,
            content: `Zone 2 training has undergone a renaissance in both elite sport and general fitness communities — and the science supports the enthusiasm.

**Mitochondrial adaptations.** Zone 2 work is the most potent stimulus for mitochondrial biogenesis (the synthesis of new mitochondria). Mitochondria are the cellular organelles that perform aerobic energy production. More mitochondria means greater aerobic capacity, faster fat oxidation, and improved lactate clearance — benefits that translate to both endurance and strength training recovery.

**Practical implementation.** Zone 2 is a conversational pace. A rough test: you should be able to speak in complete sentences (unlike Zone 3 where you can manage only a few words). For most people, this corresponds to light jogging, cycling, or rowing at 60–70% of max HR, or using the Maffetone Method: 180 − age as a rough upper HR limit.

**Duration and frequency.** Research suggests meaningful adaptations accumulate at around 150–180 minutes of Zone 2 per week. This can be split into 3–4 sessions of 40–60 minutes. For strength-focused athletes, even 2 × 30-minute Zone 2 sessions per week produces measurable aerobic improvement.

**Interference effect.** Concern exists that concurrent aerobic and strength training attenuates hypertrophy gains. Research by Wilson et al. (2012) found this effect is real but modest when cardio is kept to Zone 2 intensity and sessions are separated from strength training by several hours (or scheduled on different days). High-intensity cardio (HIIT) produces a larger interference effect.`,
            keyPoints: [
              'Zone 2 drives mitochondrial biogenesis — the primary adaptation for aerobic capacity.',
              'Target 150–180 minutes per week of Zone 2 for meaningful aerobic adaptation.',
              'Conversational pace (full sentences) is the practical Zone 2 test.',
              'Concurrent training interference is minimised with low-intensity cardio and session separation.',
            ],
            references: [
              {
                title: 'Concurrent Training: A Meta-Analysis Examining Interference of Aerobic and Resistance Exercises',
                authors: 'Wilson JM, Marin PJ, Rhea MR, et al.',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/22002517/',
                type: 'meta-analysis',
              },
            ],
          },
          {
            id: 'cc-hiit',
            title: 'HIIT and High-Intensity Conditioning',
            estimatedMinutes: 5,
            content: `High-Intensity Interval Training (HIIT) alternates short bursts of near-maximal effort with periods of rest or light activity. It is time-efficient and produces significant cardiovascular and metabolic adaptations — but it comes with a higher recovery cost.

**How HIIT works.** By repeatedly pushing into Zone 4–5, HIIT drives adaptations at the upper end of the aerobic system: increased VO2max (maximal oxygen uptake), improved stroke volume, enhanced lactate threshold. The "EPOC" effect (excess post-exercise oxygen consumption) also means calorie expenditure stays elevated for hours after a session.

**Common HIIT formats:**
- **Tabata (Izumi Tabata, 1996):** 20 seconds at ~170% VO2max, 10 seconds rest, × 8 rounds (4 minutes). Produces VO2max improvements comparable to much longer aerobic sessions.
- **30/90 intervals:** 30 seconds hard (Zone 5), 90 seconds easy (Zone 1–2), repeated 6–10 times.
- **4×4 intervals:** 4 minutes at 85–95% HRmax, 3 minutes easy, × 4 rounds. The most studied HIIT protocol for VO2max.

**Programming considerations.** HIIT is taxing on the CNS and musculoskeletal system. For strength athletes, 1–2 HIIT sessions per week is typically sufficient, with sessions scheduled on non-lower-body strength days to minimise interference and injury risk. More is not better — exceeding 2 high-intensity sessions per week for strength-focused athletes increases injury risk and may impair recovery.`,
            keyPoints: [
              'HIIT improves VO2max, lactate threshold, and metabolic efficiency time-efficiently.',
              'The Tabata protocol (4 minutes total) produces VO2max gains comparable to much longer sessions.',
              '1–2 HIIT sessions per week is sufficient for strength athletes — more risks interference.',
              'Schedule HIIT away from leg-dominant strength sessions to minimise interference.',
            ],
            references: [
              {
                title: 'Effects of Moderate-Intensity Endurance and High-Intensity Intermittent Training on Anaerobic Capacity and VO2max',
                authors: 'Tabata I, Nishimura K, Kouzaki M, et al.',
                journal: 'Medicine & Science in Sports & Exercise',
                year: 1996,
                url: 'https://pubmed.ncbi.nlm.nih.gov/8897392/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'cardio-prog-quiz',
          questions: [
            {
              id: 'cpq-1',
              question: 'For a strength-focused athlete, how many HIIT sessions per week is generally recommended?',
              options: [
                '0 — HIIT always impairs strength gains',
                '1–2 sessions, scheduled away from heavy leg days',
                '3–4 sessions to maximise cardiovascular adaptations',
                '5+ sessions — more HIIT always produces more aerobic improvement',
              ],
              correctIndex: 1,
              explanation: '1–2 HIIT sessions per week is the evidence-based recommendation for strength athletes. This provides meaningful aerobic adaptation without excessive CNS and musculoskeletal stress. Scheduling HIIT away from heavy leg days minimises the interference effect on lower-body hypertrophy and recovery.',
            },
            {
              id: 'cpq-2',
              question: 'What does the "interference effect" in concurrent training refer to?',
              options: [
                'The way strength training impairs endurance performance',
                'How aerobic training can attenuate strength and hypertrophy gains',
                'The scheduling conflict between morning and evening training sessions',
                'The negative effect of fatigue on motivation',
              ],
              correctIndex: 1,
              explanation: 'The interference effect describes how concurrent aerobic training can attenuate (reduce) strength and hypertrophy adaptations. It is most pronounced with high-intensity cardio, large cardio volumes, and sessions immediately before strength work. It is minimised with Zone 2 cardio, lower volumes, and session separation.',
            },
            {
              id: 'cpq-3',
              type: 'true-false',
              question: 'The original Tabata protocol consists of just 4 minutes of total work (8 rounds of 20 seconds on, 10 seconds off).',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. The original Tabata protocol by Dr. Izumi Tabata (1996) is 8 rounds of 20 seconds at ~170% VO2max followed by 10 seconds of rest — totalling 4 minutes. The study found it produced VO2max improvements comparable to much longer moderate-intensity training sessions, making it one of the most studied time-efficient interval protocols.',
            },
          ],
        },
      },
    ],
  },

  // ── Nutrition (4) ──────────────────────────────────────────────────────────
  {
    id: 'protein-mastery',
    title: 'Protein for Athletes',
    description: 'Protein synthesis, leucine threshold, timing, and practical targets for muscle retention and growth.',
    category: 'nutrition',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    relatedGoals: ['hypertrophy'],
    tags: ['protein', 'leucine', 'mps', 'muscle building'],
    coverEmoji: '🥩',
    modules: [
      {
        id: 'protein-fundamentals',
        title: 'Protein Fundamentals',
        lessons: [
          {
            id: 'protein-synthesis-basics',
            title: 'How Muscle Protein Synthesis Works',
            estimatedMinutes: 5,
            content: `Muscle growth ultimately comes down to the balance between two competing processes: muscle protein synthesis (MPS) and muscle protein breakdown (MPB). When MPS exceeds MPB over time, net protein accretion occurs and muscle tissue grows.

Both processes are happening continuously, even at rest. Resistance training powerfully stimulates MPS — particularly in the 24–48 hours after a session — while dietary protein provides the amino acid substrate needed to build new contractile proteins.

**The mTORC1 Pathway** sits at the heart of this process. mTOR (mechanistic target of rapamycin) complex 1 acts as a master regulator of protein synthesis. Resistance exercise activates mTORC1 through mechanical tension on muscle fibers, while the amino acid leucine provides a nutrient signal that independently activates the same pathway. This dual stimulation — mechanical and nutritional — is why combining training with adequate protein is far more effective than either alone.

Without sufficient dietary protein, the building blocks for MPS are unavailable regardless of how hard you train. Conversely, protein alone without the training stimulus produces minimal long-term gains in muscle mass. The two signals are synergistic.`,
            keyPoints: [
              'MPS must exceed MPB for net muscle gain — both processes occur continuously.',
              'Resistance training is the primary mechanical stimulus for elevating MPS.',
              'Dietary protein provides essential amino acids as building blocks for new muscle proteins.',
              'Leucine is the key anabolic trigger that activates the mTORC1 signaling pathway.',
            ],
            references: [
              {
                title: 'Protein Considerations for Optimising Skeletal Muscle Mass in Healthy Young and Older Adults',
                authors: 'Witard OC, Wardle SL, Macnaughton LS, Hodgson AB, Tipton KD',
                journal: 'Nutrients',
                year: 2016,
                url: 'https://pubmed.ncbi.nlm.nih.gov/26791349/',
                type: 'journal',
              },
              {
                title: 'Dietary Protein for Athletes: From Requirements to Optimum Adaptation',
                authors: 'Phillips SM, Van Loon LJC',
                journal: 'Journal of Sports Sciences',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21660839/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'leucine-threshold',
            title: 'The Leucine Threshold',
            estimatedMinutes: 5,
            content: `Not all amino acids are equal when it comes to stimulating muscle protein synthesis. Leucine, a branched-chain amino acid (BCAA), acts as the primary anabolic trigger — it directly activates mTORC1 even in the absence of resistance exercise, making it uniquely important among the essential amino acids (EAAs).

Research by Norton and Layman established the concept of the leucine threshold: approximately 2–3 grams of leucine per meal is required to maximally stimulate MPS. Below this threshold, MPS is not fully activated. Above it, additional leucine provides diminishing returns. This is why the leucine content of a protein source matters as much as total protein quantity.

**EAAs vs total protein**: Only the essential amino acids — those the body cannot synthesize — drive MPS. Non-essential amino acids can be manufactured endogenously and do not contribute additional anabolic stimulus. Whole food protein sources (meat, eggs, dairy) naturally provide adequate leucine per serving because of their EAA profiles. Plant sources tend to be lower in leucine, which is why slightly higher quantities of plant protein may be needed.

Distributing protein across 3–5 meals per day, each containing sufficient leucine, appears to be the optimal strategy for maximizing total daily MPS compared to the same daily intake consumed in 1–2 large meals.`,
            keyPoints: [
              'Approximately 2–3g of leucine per meal is required to maximally activate MPS via mTORC1.',
              'Whole food protein sources generally deliver adequate leucine per serving.',
              'Only the essential amino acids (EAAs) drive MPS — non-EAAs provide no additional stimulus.',
              'Spreading protein across 3–5 daily meals optimizes total MPS compared to fewer larger meals.',
            ],
            references: [
              {
                title: 'Leucine Regulates Translation Initiation of Protein Synthesis in Skeletal Muscle after Exercise',
                authors: 'Norton LE, Layman DK',
                journal: 'Journal of Nutrition',
                year: 2006,
                url: 'https://pubmed.ncbi.nlm.nih.gov/16365077/',
                type: 'journal',
              },
              {
                title: 'Supplementation of a Suboptimal Protein Dose with Leucine or Essential Amino Acids',
                authors: 'Churchward-Venne TA, Burd NA, Mitchell CJ, et al.',
                journal: 'Journal of Physiology',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/22393272/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'protein-fundamentals-quiz',
          questions: [
            {
              id: 'pf-q1',
              question: 'What is the primary intracellular signaling pathway activated by leucine to stimulate MPS?',
              type: 'multiple-choice',
              options: ['AMPK pathway', 'mTORC1 pathway', 'PI3K-Akt cascade only', 'MAPK signaling'],
              correctIndex: 1,
              explanation: 'Leucine directly activates mTORC1 (mechanistic target of rapamycin complex 1), which acts as the master regulator of muscle protein synthesis. This is distinct from AMPK, which is generally a catabolic energy-sensing pathway.',
            },
            {
              id: 'pf-q2',
              question: 'Consuming more than 40g of protein in a single meal results in no additional muscle protein synthesis compared to 20g.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 1,
              explanation: 'This is false. While there is a ceiling to the acute MPS response, larger protein doses are digested and absorbed more slowly, providing amino acids over a longer window. The "muscle can only use 20–30g" claim oversimplifies the physiology.',
            },
            {
              id: 'pf-q3',
              question: 'Approximately how much leucine per meal is considered the threshold to maximally stimulate MPS?',
              type: 'multiple-choice',
              options: ['0.5–1g', '1–1.5g', '2–3g', '5–6g'],
              correctIndex: 2,
              explanation: 'Research by Norton and Layman identified approximately 2–3g of leucine per meal as the threshold required to fully activate the mTORC1 pathway and maximize the acute MPS response. Most protein-rich whole-food servings of ~25–40g protein meet this threshold.',
            },
          ],
        },
      },
      {
        id: 'practical-protein-targets',
        title: 'Practical Protein Targets',
        lessons: [
          {
            id: 'daily-protein-targets',
            title: 'Daily Protein Targets for Athletes',
            estimatedMinutes: 5,
            content: `Determining optimal daily protein intake requires considering training status, goals, and energy availability. Decades of research have converged on clear evidence-based recommendations.

For muscle gain, a meta-analysis by Morton et al. (2018) synthesizing 49 studies and 1,800 participants found that protein intakes beyond approximately 1.62 g/kg/day produced no additional hypertrophic benefit in resistance-trained individuals. However, accounting for individual variability, the practical target is typically 1.6–2.2 g/kg/day to ensure the upper confidence interval is covered.

**During caloric deficit (cutting)**, protein requirements are actually higher — 2.3–3.1 g/kg lean body mass — to protect muscle tissue from being oxidized for energy. This is because dietary protein competes with endogenous muscle protein for energy provision when calories are restricted.

**Protein quality** matters alongside quantity. The PDCAAS (protein digestibility-corrected amino acid score) and newer DIAAS (digestible indispensable amino acid score) rank protein sources based on their EAA profile and digestibility. Animal proteins (whey, eggs, meat, dairy) score highest. Plant proteins can be combined to achieve complete EAA profiles, but quantities typically need to be 20–30% higher to match the effect of animal proteins gram-for-gram.`,
            keyPoints: [
              '1.6–2.2 g/kg/day is the evidence-based protein target for muscle gain in resistance-trained athletes.',
              'Protein needs increase to 2.3–3.1 g/kg lean mass during caloric deficit phases.',
              'Protein quality (DIAAS/PDCAAS) reflects the EAA profile and digestibility of a source.',
              'Plant proteins generally need to be consumed in greater quantities to match animal protein EAA delivery.',
            ],
            references: [
              {
                title: 'A Systematic Review, Meta-Analysis and Meta-Regression of the Effect of Protein Supplementation on Resistance Training-Induced Gains in Muscle Mass and Strength in Healthy Adults',
                authors: 'Morton RW, Murphy KT, McKellar SR, et al.',
                journal: 'British Journal of Sports Medicine',
                year: 2018,
                url: 'https://pubmed.ncbi.nlm.nih.gov/28698222/',
                type: 'meta-analysis',
              },
              {
                title: 'Optimal Protein Intake to Maximise Muscle Protein Synthesis: Examinations of Optimal Meal Protein Doses',
                authors: 'Stokes T, Hector AJ, Morton RW, et al.',
                journal: 'Nutrients',
                year: 2018,
                url: 'https://pubmed.ncbi.nlm.nih.gov/29497353/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'protein-sources-timing',
            title: 'Protein Sources & Timing',
            estimatedMinutes: 5,
            content: `The source and timing of protein ingestion can meaningfully influence the anabolic response, though overall daily intake remains the primary determinant of long-term outcomes.

**Whey protein** is a fast-digesting dairy-derived protein with a high leucine content (~10–11% leucine by mass), making it highly effective for acutely stimulating MPS. **Casein** is a slow-digesting micellar protein that forms a gel in the stomach, releasing amino acids steadily over 5–7 hours. **Plant proteins** (soy, pea, rice) are generally lower in leucine and one or more EAAs, requiring higher doses or blending to match the anabolic response of whey.

**Pre-sleep protein**: A landmark study by Res et al. (2012) demonstrated that 40g of casein consumed before sleep significantly elevated overnight MPS and improved whole-body protein balance compared to placebo. This has been replicated and suggests that the overnight fasting period — typically 7–9 hours — represents an underutilized opportunity to support muscle recovery and growth.

**Timing relative to workouts**: While the "anabolic window" concept has been overstated, protein consumed within ~2 hours of training does appear to slightly enhance the MPS response. For most practical purposes, ensuring adequate protein in meals surrounding training is sufficient.`,
            keyPoints: [
              'Whey protein has the highest leucine content and fastest absorption, making it ideal post-workout.',
              'Casein provides a sustained amino acid release over hours — ideal before an overnight fast.',
              'Pre-sleep protein (~40g casein) meaningfully stimulates overnight muscle protein synthesis.',
              'Overall daily protein intake is the primary driver of long-term adaptations, not timing alone.',
            ],
            references: [
              {
                title: 'Protein Ingestion before Sleep Improves Postexercise Overnight Recovery',
                authors: 'Res PT, Groen B, Pennings B, et al.',
                journal: 'Medicine & Science in Sports & Exercise',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/22330017/',
                type: 'journal',
              },
              {
                title: 'Nutrient Timing Revisited: Is There a Post-Exercise Anabolic Window?',
                authors: 'Schoenfeld BJ, Aragon AA, Krieger JW',
                journal: 'Journal of the International Society of Sports Nutrition',
                year: 2013,
                url: 'https://pubmed.ncbi.nlm.nih.gov/23360586/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'protein-targets-quiz',
          questions: [
            {
              id: 'pt-q1',
              question: 'What is the evidence-based daily protein intake recommendation for maximizing muscle gain in resistance-trained athletes?',
              type: 'multiple-choice',
              options: ['0.8 g/kg', '1.0–1.2 g/kg', '1.6–2.2 g/kg', '3.5–4.0 g/kg'],
              correctIndex: 2,
              explanation: 'Morton et al. (2018) meta-analysis of 49 studies found that protein intakes beyond ~1.62 g/kg/day produced no additional hypertrophic benefit. A practical range of 1.6–2.2 g/kg/day accounts for individual variability.',
            },
            {
              id: 'pt-q2',
              question: 'Pre-sleep protein ingestion (~40g casein) has been shown to stimulate overnight muscle protein synthesis.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Res et al. (2012) demonstrated that 40g casein before sleep significantly elevated overnight MPS and whole-body protein balance, making the overnight period an important opportunity for protein-supported recovery.',
            },
            {
              id: 'pt-q3',
              question: 'Which protein source has the fastest digestion and absorption rate?',
              type: 'multiple-choice',
              options: ['Casein', 'Soy protein', 'Whey protein', 'Egg albumin'],
              correctIndex: 2,
              explanation: 'Whey protein is a rapidly digested protein that causes a fast, high spike in plasma amino acids. Casein is slow-digesting (5–7 hours). This makes whey particularly effective for the post-exercise period.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'cutting-bulking',
    title: 'Cutting & Bulking',
    description: 'Evidence-based strategies for caloric deficit phases and caloric surplus phases.',
    category: 'nutrition',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    relatedGoals: ['fat-loss', 'hypertrophy'],
    tags: ['deficit', 'surplus', 'body composition', 'recomp'],
    coverEmoji: '⚖️',
    modules: [
      {
        id: 'caloric-deficit-strategies',
        title: 'Caloric Deficit Strategies',
        lessons: [
          {
            id: 'deficit-fundamentals',
            title: 'Engineering a Caloric Deficit',
            estimatedMinutes: 5,
            content: `Weight loss occurs when energy expenditure consistently exceeds energy intake — the fundamental law of energy balance. But the size and structure of that deficit meaningfully affects body composition outcomes, not just the number on the scale.

A moderate deficit of 250–500 kcal per day relative to total daily energy expenditure (TDEE) is the most evidence-supported approach for losing fat while preserving muscle tissue. This typically produces a rate of weight loss of approximately 0.5–1% of body weight per week, which is the recommended ceiling for minimizing lean mass loss.

**Calculating TDEE**: The most practical approach combines an estimated basal metabolic rate (BMR) — using formulas like Mifflin-St Jeor — with an activity multiplier. However, TDEE calculators are estimates with meaningful error margins. Body weight tracking over 2–3 weeks is the only reliable real-world calibration method.

**Aggressive deficits** (>750–1000 kcal/day) accelerate fat loss but disproportionately increase muscle catabolism, hormonal suppression (leptin, thyroid, testosterone), and psychological fatigue. Helms et al. (2014) showed that natural competitors who lost weight more slowly preserved significantly more lean mass than faster losers.`,
            keyPoints: [
              'A moderate deficit of 250–500 kcal/day balances fat loss speed with muscle preservation.',
              'Target weight loss of 0.5–1% of body weight per week to minimize lean mass loss.',
              'TDEE calculators are starting estimates — adjust based on real-world body weight changes.',
              'Aggressive deficits accelerate fat loss but compromise muscle retention and hormonal health.',
            ],
            references: [
              {
                title: 'Evidence-Based Recommendations for Natural Bodybuilding Contest Preparation',
                authors: 'Helms ER, Aragon AA, Fitschen PJ',
                journal: 'Journal of the International Society of Sports Nutrition',
                year: 2014,
                url: 'https://pubmed.ncbi.nlm.nih.gov/24864135/',
                type: 'journal',
              },
              {
                title: 'Quantification of the Effect of Energy Imbalance on Bodyweight',
                authors: 'Hall KD, Sacks G, Chandramohan D, et al.',
                journal: 'The Lancet',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21872749/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'preserving-muscle-cut',
            title: 'Preserving Muscle During a Cut',
            estimatedMinutes: 6,
            content: `The goal of a cutting phase is not simply weight loss — it is fat loss with maximal lean mass retention. These are meaningfully different objectives that require specific strategies beyond just eating less.

**High protein intake** is the most evidence-supported tool for muscle preservation during a deficit. In calorie-restricted states, protein intakes of 2.3–3.1 g/kg lean body mass per day have been shown to significantly reduce lean mass loss compared to lower intakes. The higher needs reflect the increased oxidation of amino acids for energy during a deficit.

**Maintaining resistance training** is equally critical. Muscle tissue is metabolically expensive — the body will preferentially reduce it if there is no signal that it is needed. Continuing to train with adequate intensity and reasonable volume sends that signal. Research shows that simply reducing calories without maintaining strength training leads to substantially greater lean mass losses.

**Refeeds and diet breaks**: Periodic strategic increases in calories (particularly carbohydrates) help restore leptin and thyroid hormones, which fall progressively during sustained deficits. A structured diet break of 1–2 weeks at maintenance every 6–8 weeks of dieting appears to improve long-term adherence and body composition outcomes.`,
            keyPoints: [
              'Protein intake of 2.3–3.1 g/kg lean mass per day is recommended during a caloric deficit to preserve muscle.',
              'Maintaining resistance training intensity is critical — it signals that muscle tissue must be retained.',
              'Sleep quality and quantity meaningfully affect muscle preservation during a cut.',
              'Periodic refeeds or diet breaks help restore suppressed metabolic hormones during prolonged deficits.',
            ],
            references: [
              {
                title: 'Differential Effects of Resistance Training on Metabolic Health Indicators in Men with Different Training Backgrounds',
                authors: 'Barakat C, Pearson J, Escalante G, et al.',
                journal: 'Strength & Conditioning Journal',
                year: 2020,
                url: 'https://pubmed.ncbi.nlm.nih.gov/32887199/',
                type: 'journal',
              },
              {
                title: 'Evidence-Based Recommendations for Natural Bodybuilding Contest Preparation',
                authors: 'Helms ER, Aragon AA, Fitschen PJ',
                journal: 'Journal of the International Society of Sports Nutrition',
                year: 2014,
                url: 'https://pubmed.ncbi.nlm.nih.gov/24864135/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'cutting-quiz',
          questions: [
            {
              id: 'cut-q1',
              question: 'What is the recommended weekly rate of weight loss to minimize muscle loss during a cutting phase?',
              type: 'multiple-choice',
              options: ['2–3% of body weight', '0.5–1% of body weight', '0.1% of body weight', '1.5–2% of body weight'],
              correctIndex: 1,
              explanation: 'Losing 0.5–1% of body weight per week balances meaningful fat loss with muscle preservation. Faster rates are associated with greater lean mass loss and hormonal disruption.',
            },
            {
              id: 'cut-q2',
              question: 'During a caloric deficit, protein requirements are higher than during a maintenance or surplus phase.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. During a caloric deficit, amino acids are increasingly oxidized for energy, raising the dietary protein requirements needed to provide sufficient substrate for muscle protein synthesis and maintenance.',
            },
            {
              id: 'cut-q3',
              question: 'Which of the following best preserves lean mass during a cut?',
              type: 'multiple-choice',
              options: ['Very low calorie diet (VLCD)', 'Eliminating all carbohydrates', 'Maintaining resistance training and high protein intake', 'Increasing cardio volume only'],
              correctIndex: 2,
              explanation: 'The combination of maintained resistance training and high protein intake provides both the mechanical stimulus to retain muscle and the amino acid substrate needed for muscle protein synthesis.',
            },
          ],
        },
      },
      {
        id: 'surplus-recomposition',
        title: 'Caloric Surplus & Body Recomposition',
        lessons: [
          {
            id: 'surplus-strategies',
            title: 'The Art of the Lean Bulk',
            estimatedMinutes: 5,
            content: `Gaining muscle requires a sustained anabolic environment — and for most people, that means consuming calories in excess of total energy expenditure. But surplus size is a critical variable that determines how much of the weight gained is muscle versus fat.

A modest surplus of 200–400 kcal per day above maintenance provides enough energy to support muscle protein synthesis and glycogen replenishment without rapidly accumulating body fat. This "lean bulk" approach accepts a slower rate of muscle gain in exchange for better body composition throughout the gaining phase.

**Realistic muscle gain rates**: Natural, intermediate-level trainees can expect to gain approximately 0.5–1 kg of muscle per month under optimal conditions. Beginners may gain slightly faster; advanced trainees significantly slower. Understanding this rate prevents the common mistake of eating far more than muscle growth requires, attributing excess fat gain to "muscle."

**Dirty bulk vs lean bulk**: Aggressive eating produces faster initial scale weight gain, but research shows the additional weight is primarily adipose tissue, not extra muscle. The body cannot synthesize muscle protein faster than its biological ceiling allows, regardless of how many calories are provided above that threshold. Garthe et al. (2013) found that athletes on a modest surplus gained comparable muscle to those on aggressive surpluses while accumulating significantly less fat.`,
            keyPoints: [
              'A surplus of 200–400 kcal/day above maintenance optimizes the lean muscle gain to fat gain ratio.',
              'Natural intermediate trainees gain approximately 0.5–1 kg of muscle per month under ideal conditions.',
              'The body has a ceiling for MPS rate — surplus calories beyond what muscle growth requires become fat.',
              'Dirty bulking produces faster scale weight gain but similar muscle gain with significantly more fat.',
            ],
            references: [
              {
                title: 'Dietary Protein for Athletes: From Requirements to Optimum Adaptation',
                authors: 'Phillips SM, Van Loon LJC',
                journal: 'Journal of Sports Sciences',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21660839/',
                type: 'journal',
              },
              {
                title: 'Effect of Two Different Weight-Loss Rates on Body Composition and Strength and Power-Related Performance in Elite Athletes',
                authors: 'Garthe I, Raastad T, Refsnes PE, Sundgot-Borgen J',
                journal: 'International Journal of Sport Nutrition and Exercise Metabolism',
                year: 2013,
                url: 'https://pubmed.ncbi.nlm.nih.gov/23679146/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'body-recomposition',
            title: 'Body Recomposition: Myth or Reality?',
            estimatedMinutes: 5,
            content: `Body recomposition — simultaneously losing fat and gaining muscle — is physiologically possible, though it occurs under more limited conditions than popular fitness culture suggests.

The primary constraint is that muscle gain and fat loss have opposing energetic requirements. Muscle gain favors a caloric surplus; fat loss requires a deficit. The question is whether there are conditions under which both can occur concurrently.

**Who can recomp effectively**: Research suggests body recomposition is most accessible for: (1) **beginners** — whose muscle gain response to training is so strong it overcomes the anabolic inhibition of a moderate deficit; (2) **detrained individuals** re-entering training — who can regain muscle rapidly via satellite cell mechanisms and myonuclear retention; (3) **individuals with higher body fat** — who have greater endogenous energy availability to fuel MPS even in a small deficit.

**Advanced trainees** with already low body fat and years of training experience are near their genetic muscle ceiling, making recomposition extremely slow and metabolically difficult. For this population, dedicated bulk and cut phases are generally more efficient.

Barakat et al. (2020) published a comprehensive review confirming recomposition is achievable under the right conditions, but emphasizing that the magnitude of concurrent changes is smaller than what could be achieved by dedicated phases.`,
            keyPoints: [
              'Body recomposition is possible but occurs best in beginners, detrained individuals, and those with higher body fat.',
              'Advanced, lean trainees are near their muscle ceiling — dedicated bulk and cut phases are more efficient.',
              'Calorie cycling (slight surplus on training days, slight deficit on rest days) is a practical recomposition strategy.',
              'The magnitude of recomposition changes is smaller than dedicated bulking or cutting phases.',
            ],
            references: [
              {
                title: 'Body Recomposition: Can Trained Individuals Build Muscle and Lose Fat at the Same Time?',
                authors: 'Barakat C, Pearson J, Escalante G, et al.',
                journal: 'Strength & Conditioning Journal',
                year: 2020,
                url: 'https://pubmed.ncbi.nlm.nih.gov/32887199/',
                type: 'journal',
              },
              {
                title: 'Concurrent Training: A Meta-Analysis Examining Interference of Aerobic and Resistance Exercises',
                authors: 'Deldicque L',
                journal: 'Frontiers in Physiology',
                year: 2017,
                url: 'https://pubmed.ncbi.nlm.nih.gov/28878683/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'bulking-quiz',
          questions: [
            {
              id: 'bulk-q1',
              question: 'For a lean bulk, what is the recommended daily caloric surplus above maintenance?',
              type: 'multiple-choice',
              options: ['1000–1500 kcal', '500–750 kcal', '200–400 kcal', '50–100 kcal'],
              correctIndex: 2,
              explanation: 'A modest surplus of 200–400 kcal/day is sufficient to support muscle protein synthesis without rapidly accumulating body fat. The body cannot convert surplus calories into muscle faster than its biological synthesis ceiling allows.',
            },
            {
              id: 'bulk-q2',
              question: 'Body recomposition (simultaneously gaining muscle and losing fat) is impossible for trained individuals.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 1,
              explanation: 'False. Body recomposition is possible, though more limited in well-trained, lean athletes. Beginners, detrained individuals, and those with higher body fat percentages can achieve meaningful simultaneous fat loss and muscle gain.',
            },
            {
              id: 'bulk-q3',
              question: 'What is a realistic rate of muscle gain per month for a natural, intermediate lifter on a lean bulk?',
              type: 'multiple-choice',
              options: ['3–5 kg', '0.5–1 kg', '0.1–0.2 kg', '2–3 kg'],
              correctIndex: 1,
              explanation: 'Natural intermediate trainees can expect approximately 0.5–1 kg of actual muscle gain per month under optimal conditions. Faster scale weight gains typically reflect fat, water, and glycogen rather than new contractile tissue.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'peri-workout-nutrition',
    title: 'Pre & Post Workout Nutrition',
    description: 'What to eat around training sessions to maximise energy, recovery, and muscle protein synthesis.',
    category: 'nutrition',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    relatedGoals: ['hypertrophy', 'general-fitness'],
    tags: ['pre-workout', 'post-workout', 'carbs', 'creatine'],
    coverEmoji: '🍌',
    modules: [
      {
        id: 'pre-workout-nutrition',
        title: 'Pre-Workout Nutrition',
        lessons: [
          {
            id: 'pre-workout-fuel',
            title: 'Fueling Before Training',
            estimatedMinutes: 5,
            content: `What you eat before training sets the foundation for performance. The primary goal of pre-workout nutrition is to ensure adequate substrate availability — particularly muscle glycogen for carbohydrate-dependent activities and amino acid availability for muscle protein synthesis.

**Carbohydrates** are the predominant fuel for resistance training and moderate-to-high intensity exercise. Muscle glycogen — the storage form of carbohydrate — directly powers ATP resynthesis during intense efforts. Beginning a session with depleted glycogen stores compromises performance, particularly in later sets and sessions requiring sustained power output.

**Timing**: A pre-workout meal containing mixed macronutrients (carbohydrates + protein) consumed 1–3 hours before training is the evidence-supported optimal window. Closer to training (within 30–60 minutes), smaller, easily digested options are preferable to avoid gastrointestinal discomfort. The further from training, the larger a meal can be.

**Protein before training** contributes to the amino acid pool available during and after exercise. Aragon and Schoenfeld (2013) noted that protein consumed before training stimulates MPS acutely, particularly if the next meal will be delayed. For early morning trainees, a light pre-workout protein source (shake, eggs) is recommended.

**Practical considerations**: For typical 60–90 minute resistance sessions, pre-workout nutrition matters most when training in a fasted state or more than 4–5 hours after the previous meal.`,
            keyPoints: [
              'Carbohydrates fuel glycogen-dependent training — depleted glycogen impairs performance in later sets.',
              'A mixed meal 1–3 hours before training is the optimal pre-workout nutrition window.',
              'Protein before training contributes amino acids for MPS and is particularly important for fasted morning trainees.',
              'Within 30–60 minutes of training, smaller and easily digestible options are preferred.',
            ],
            references: [
              {
                title: 'Nutrient Timing Revisited: Is There a Post-Exercise Anabolic Window?',
                authors: 'Aragon AA, Schoenfeld BJ',
                journal: 'Journal of the International Society of Sports Nutrition',
                year: 2013,
                url: 'https://pubmed.ncbi.nlm.nih.gov/23360586/',
                type: 'journal',
              },
              {
                title: 'Carbohydrates for Training and Competition',
                authors: 'Burke LM, Hawley JA, Wong SH, Jeukendrup AE',
                journal: 'Journal of Sports Sciences',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21660838/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'ergogenic-aids',
            title: 'Evidence-Based Ergogenic Aids',
            estimatedMinutes: 5,
            content: `The sports supplement industry generates billions annually, yet the vast majority of products have minimal or no evidence supporting their efficacy. A small number of supplements, however, have robust research backing their performance benefits.

**Creatine monohydrate** is the most extensively researched ergogenic supplement in exercise science. It works by increasing phosphocreatine stores in muscle, enabling faster ATP regeneration during short, intense efforts. Meta-analyses consistently show 5–15% improvements in strength and power output. A daily dose of 3–5g maintains elevated muscle creatine stores; a loading phase (20g/day for 5–7 days) achieves saturation faster but is not required. Kreider et al. (2017) International Society of Sports Nutrition position stand confirms it is safe and effective for all populations.

**Caffeine** enhances performance through adenosine receptor antagonism, increasing alertness, reducing perception of effort, and enhancing calcium release in muscle. The evidence-based dose is 3–6 mg/kg body weight consumed 30–60 minutes before exercise. Habitual users develop tolerance; cycling caffeine can restore sensitivity. Higher doses increase side effects (anxiety, GI distress) without proportionate benefit.

**Beta-alanine** buffers intramuscular acidosis (via increased carnosine) and may benefit performance in efforts lasting 60–240 seconds. The characteristic tingling (paraesthesia) is harmless. Citrulline malate, sodium bicarbonate, and beetroot juice (nitrates) have emerging evidence but weaker effect sizes for strength training specifically.`,
            keyPoints: [
              'Creatine monohydrate (3–5g/day) is the most evidence-based ergogenic supplement for strength and power.',
              'Caffeine at 3–6 mg/kg body weight enhances performance through adenosine receptor antagonism.',
              'Beta-alanine supports performance in 60–240 second efforts by increasing muscle carnosine buffering capacity.',
              'The majority of sports supplements lack sufficient evidence to justify their cost — prioritize the fundamentals.',
            ],
            references: [
              {
                title: 'International Society of Sports Nutrition Position Stand: Safety and Efficacy of Creatine Supplementation in Exercise, Sport, and Medicine',
                authors: 'Kreider RB, Kalman DS, Antonio J, et al.',
                journal: 'Journal of the International Society of Sports Nutrition',
                year: 2017,
                url: 'https://pubmed.ncbi.nlm.nih.gov/28615996/',
                type: 'guideline',
              },
              {
                title: 'Caffeine and Exercise Performance: An Updated Meta-Analysis',
                authors: 'Grgic J, Grgic I, Pickering C, et al.',
                journal: 'British Journal of Sports Medicine',
                year: 2020,
                url: 'https://pubmed.ncbi.nlm.nih.gov/30926628/',
                type: 'meta-analysis',
              },
            ],
          },
        ],
        quiz: {
          id: 'pre-workout-quiz',
          questions: [
            {
              id: 'pw-q1',
              question: 'What is the evidence-based effective dose of caffeine for enhancing exercise performance?',
              type: 'multiple-choice',
              options: ['0.5–1 mg/kg', '3–6 mg/kg', '8–10 mg/kg', '15–20 mg/kg'],
              correctIndex: 1,
              explanation: 'The evidence-based dose of caffeine for performance enhancement is 3–6 mg/kg body weight, taken 30–60 minutes before exercise. Higher doses do not produce proportionately greater benefits and increase adverse effects.',
            },
            {
              id: 'pw-q2',
              question: 'Creatine monohydrate is the most extensively researched and supported ergogenic supplement for strength and power.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Creatine monohydrate has the most robust evidence base of any ergogenic supplement, with hundreds of studies and multiple meta-analyses demonstrating 5–15% improvements in strength and power output.',
            },
            {
              id: 'pw-q3',
              question: 'What is the optimal timing for a pre-workout meal containing carbohydrates and protein?',
              type: 'multiple-choice',
              options: ['30 minutes before training', '1–3 hours before training', '4–5 hours before training', 'Immediately before training'],
              correctIndex: 1,
              explanation: 'A mixed meal 1–3 hours before training provides time for digestion while ensuring substrates are available. Immediately before training risks GI discomfort; 4–5 hours may leave energy availability suboptimal.',
            },
          ],
        },
      },
      {
        id: 'post-workout-nutrition',
        title: 'Post-Workout Nutrition',
        lessons: [
          {
            id: 'post-workout-window',
            title: 'The Anabolic Window',
            estimatedMinutes: 5,
            content: `The concept of the "anabolic window" — a brief post-workout period during which nutrition is critically important — has been one of the most discussed and debated topics in sports nutrition. Modern research has significantly revised the original claims.

Early research suggesting that muscle protein synthesis only responds to protein intake within 30–45 minutes of exercise was based on studies with specific designs that do not generalize well to real-world training. A landmark meta-analysis by Schoenfeld et al. (2013) found that when total daily protein intake was equated, the timing effect was minimal. The window is much longer than originally thought — approximately 2 hours post-training.

**Why the window is wider than feared**: Resistance training itself elevates MPS for 24–48 hours post-exercise. The acute post-workout spike in MPS sensitivity does not vanish after 30 minutes. Moreover, if you consumed protein within 2–3 hours before training (via a pre-workout meal), those amino acids are still circulating and provide substrate for post-exercise MPS.

**Practical guidance**: Consume 20–40g of quality protein (sufficient leucine) within approximately 2 hours of completing training. For the majority of trainees who eat meals before and after training as part of a normal schedule, this occurs naturally. The more critical scenario is training fasted or more than 5–6 hours after the last meal.

**Carbohydrate post-workout** primarily serves to replenish muscle glycogen, which is important for recovery and subsequent training sessions, particularly if multiple sessions occur within 24 hours.`,
            keyPoints: [
              'The "anabolic window" extends to approximately 2 hours post-workout, not 30–45 minutes as originally claimed.',
              'A pre-workout meal within 2–3 hours of training effectively covers post-workout protein timing.',
              'The most important variable is total daily protein intake, not precise timing alone.',
              'Post-workout carbohydrates primarily replenish muscle glycogen for recovery and subsequent training.',
            ],
            references: [
              {
                title: 'The Effect of Protein Timing on Muscle Strength and Hypertrophy: A Meta-Analysis',
                authors: 'Schoenfeld BJ, Aragon AA, Krieger JW',
                journal: 'Journal of the International Society of Sports Nutrition',
                year: 2013,
                url: 'https://pubmed.ncbi.nlm.nih.gov/24299050/',
                type: 'meta-analysis',
              },
              {
                title: 'Nutrient Timing Revisited: Is There a Post-Exercise Anabolic Window?',
                authors: 'Aragon AA, Schoenfeld BJ',
                journal: 'Journal of the International Society of Sports Nutrition',
                year: 2013,
                url: 'https://pubmed.ncbi.nlm.nih.gov/23360586/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'intra-workout-hydration',
            title: 'Hydration & Intra-Workout Nutrition',
            estimatedMinutes: 4,
            content: `Hydration is one of the most underappreciated performance variables. Even modest dehydration meaningfully impairs both strength and endurance performance.

Research consistently demonstrates that body mass loss of approximately 2% through sweat — roughly 1.4 kg for a 70 kg individual — reduces aerobic capacity by 10–20% and impairs cognitive function, strength output, and reaction time. The effect scales with greater dehydration levels.

**Electrolytes**: Sweat contains not just water but sodium, chloride, potassium, and small amounts of other minerals. For sessions lasting under 60–90 minutes in moderate conditions, plain water is sufficient. Longer or more intense sessions in hot environments warrant electrolyte replacement — sodium in particular, which is the primary electrolyte lost in sweat. Sports drinks or electrolyte tablets serve this purpose.

**Intra-workout nutrition** is relevant primarily for sessions exceeding 60–90 minutes or when training has been performed fasted. For shorter sessions, no intra-workout nutrition is necessary. For prolonged training, small amounts of easily digested carbohydrates (20–40g/hour) or EAA-containing supplements can maintain performance and blunt muscle protein breakdown.

**Practical hydration strategy**: Begin sessions well-hydrated (pale yellow urine). Drink to thirst during sessions. Monitor post-workout body weight — for every kg lost, consume approximately 1.5 L of fluid to fully rehydrate.`,
            keyPoints: [
              'A 2% body mass loss through sweat meaningfully impairs strength, endurance, and cognitive performance.',
              'Electrolytes (particularly sodium) are needed during prolonged or intense sessions in heat.',
              'Intra-workout nutrition is only necessary for sessions exceeding 60–90 minutes or fasted training.',
              'Monitor urine color and post-workout body weight as practical hydration indicators.',
            ],
            references: [
              {
                title: 'American College of Sports Medicine Position Stand: Exercise and Fluid Replacement',
                authors: 'Casa DJ, Armstrong LE, Hillman SK, et al.',
                journal: 'Medicine & Science in Sports & Exercise',
                year: 2000,
                url: 'https://pubmed.ncbi.nlm.nih.gov/10694128/',
                type: 'guideline',
              },
            ],
          },
        ],
        quiz: {
          id: 'post-workout-quiz',
          questions: [
            {
              id: 'pow-q1',
              question: "The 'anabolic window' post-workout is now understood to be approximately how long?",
              type: 'multiple-choice',
              options: ['15–30 minutes only', 'Up to ~2 hours', 'Exactly 60 minutes', '6–8 hours'],
              correctIndex: 1,
              explanation: 'Modern research, including the Schoenfeld et al. (2013) meta-analysis, indicates that the post-workout anabolic window extends approximately 2 hours. If you consumed protein within 2–3 hours before training, you are likely already covered.',
            },
            {
              id: 'pow-q2',
              question: 'A 2% reduction in body mass through sweat loss can meaningfully impair strength and endurance performance.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Consistent research shows that a 2% body mass loss through dehydration reduces aerobic capacity by 10–20% and impairs strength output and cognitive function, making hydration a critical performance variable.',
            },
            {
              id: 'pow-q3',
              question: 'What is the primary role of carbohydrates consumed post-workout?',
              type: 'multiple-choice',
              options: ['Stimulating muscle protein synthesis directly', 'Replenishing muscle glycogen stores', 'Reducing cortisol levels', 'Increasing testosterone production'],
              correctIndex: 1,
              explanation: 'Post-workout carbohydrates primarily replenish muscle glycogen that was depleted during training. This is critical for recovery and performance in subsequent sessions, particularly when training multiple times per day or in close succession.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'micronutrients-athletes',
    title: 'Micronutrients for Athletes',
    description: 'Vitamins, minerals, and electrolytes that matter most for training performance and recovery.',
    category: 'nutrition',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    relatedGoals: ['general-fitness'],
    tags: ['vitamins', 'electrolytes', 'iron', 'vitamin D'],
    coverEmoji: '🥦',
    modules: [
      {
        id: 'key-vitamins-minerals',
        title: 'Key Vitamins & Minerals',
        lessons: [
          {
            id: 'vitamin-d-iron',
            title: 'Vitamin D & Iron for Athletes',
            estimatedMinutes: 5,
            content: `Two micronutrients stand out for their high prevalence of deficiency in athletic populations and their meaningful impact on performance: vitamin D and iron.

**Vitamin D** is synthesized in the skin through UV-B radiation exposure and acts more like a hormone than a traditional vitamin. It regulates calcium absorption, bone remodeling, immune function, and muscle protein synthesis. Vitamin D receptors are present in skeletal muscle, and deficiency has been associated with reduced muscle strength, increased injury risk, and impaired recovery. Deficiency is widespread, particularly among indoor athletes, those in northern latitudes, and individuals with darker skin pigmentation. Supplementation of 1,000–4,000 IU per day is commonly recommended to maintain serum 25-OH-D levels above 40 ng/mL, though individualization based on blood testing is ideal.

**Iron** is a component of hemoglobin and myoglobin — the oxygen-carrying proteins in blood and muscle respectively. Iron deficiency impairs oxygen delivery to working muscles, reducing aerobic capacity and increasing perceived effort. Female endurance athletes are particularly vulnerable due to menstrual losses, GI microbleeds from high-volume running, and often inadequate dietary intake. Iron deficiency without anemia (depleted ferritin but normal hemoglobin) still impairs performance and warrants attention. Heme iron from animal sources (red meat, liver) has substantially higher bioavailability than non-heme iron from plants.`,
            keyPoints: [
              'Vitamin D deficiency is highly prevalent in athletes and associated with reduced strength and increased injury risk.',
              '1,000–4,000 IU/day of vitamin D3 is commonly recommended; blood testing allows individualization.',
              'Iron is essential for oxygen transport; deficiency impairs aerobic capacity and increases perceived effort.',
              'Female endurance athletes face the greatest iron deficiency risk due to menstrual losses and high training volumes.',
            ],
            references: [
              {
                title: 'Vitamin D and Athletic Performance: The Potential Role of Muscle',
                authors: 'Larson-Meyer DE, Willis KS',
                journal: 'International Journal of Sport Nutrition and Exercise Metabolism',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/20601742/',
                type: 'journal',
              },
              {
                title: 'Iron Deficiency and Supplementation in the Athlete',
                authors: 'Peeling P, Castell LM, Derave W, et al.',
                journal: 'International Journal of Sport Nutrition and Exercise Metabolism',
                year: 2018,
                url: 'https://pubmed.ncbi.nlm.nih.gov/29498929/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'magnesium-zinc',
            title: 'Magnesium, Zinc & B Vitamins',
            estimatedMinutes: 5,
            content: `Several other micronutrients deserve attention for their roles in training performance and recovery, particularly given that athletes often have higher requirements due to losses through sweat and increased metabolic demand.

**Magnesium** is involved in over 300 enzymatic reactions, including ATP synthesis, protein synthesis, muscle contraction, and DNA repair. It also plays a role in sleep quality — low magnesium is associated with reduced slow-wave sleep depth. Athletes commonly have sub-optimal magnesium status due to sweat losses and inadequate dietary intake. Dietary sources include leafy greens, nuts, seeds, and dark chocolate. A supplemental dose of 200–400 mg elemental magnesium before sleep has shown benefits for sleep quality and muscle cramp reduction.

**Zinc** is essential for testosterone synthesis, immune function, wound healing, and DNA synthesis. Intense exercise increases zinc losses through sweat and urine. Deficiency can suppress immune function and, in males, reduce testosterone production. Meat, shellfish (especially oysters), and seeds are the richest dietary sources.

**B vitamins** — particularly B1 (thiamine), B2 (riboflavin), B3 (niacin), B6, B9 (folate), and B12 — are critical for energy metabolism pathways (glycolysis, the Krebs cycle, the electron transport chain). Athletes have higher absolute requirements due to greater energy throughput, but deficiencies are uncommon with adequate food intake. Vegans and vegetarians should pay particular attention to B12, which is found almost exclusively in animal products.`,
            keyPoints: [
              'Magnesium is involved in 300+ enzymatic reactions and supports sleep quality, muscle function, and ATP synthesis.',
              'Zinc deficiency can impair testosterone production and immune function in male athletes.',
              'B vitamins are essential for energy metabolism — vegans need to supplement B12 from animal-exclusive sources.',
              'A food-first approach covers most micronutrient needs; targeted supplementation addresses specific deficiencies.',
            ],
            references: [
              {
                title: 'Magnesium and the Athlete',
                authors: 'Nielsen FH, Lukaski HC',
                journal: 'Current Sports Medicine Reports',
                year: 2006,
                url: 'https://pubmed.ncbi.nlm.nih.gov/16944667/',
                type: 'journal',
              },
              {
                title: 'Vitamins and Minerals for Energy, Fatigue and Cognition: A Narrative Review of the Biochemical and Clinical Evidence',
                authors: 'Tardy AL, Pouteau E, Marquez D, Yilmaz C, Scholey A',
                journal: 'Nutrients',
                year: 2020,
                url: 'https://pubmed.ncbi.nlm.nih.gov/32079300/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'vitamins-quiz',
          questions: [
            {
              id: 'vit-q1',
              question: 'Which vitamin is synthesized in the skin through UV-B radiation and is commonly deficient in athletes?',
              type: 'multiple-choice',
              options: ['Vitamin C', 'Vitamin B12', 'Vitamin D', 'Vitamin K'],
              correctIndex: 2,
              explanation: 'Vitamin D is produced in the skin via UV-B radiation. It is widely deficient in athletes, particularly those training indoors, living at higher latitudes, or with darker skin, and deficiency is linked to reduced muscle strength and immune function.',
            },
            {
              id: 'vit-q2',
              question: 'Female endurance athletes are at greater risk of iron deficiency than the general population.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Female endurance athletes face compounded iron loss risks: menstrual iron losses, gastrointestinal microbleeds from high-volume running, foot-strike hemolysis, and often insufficient dietary heme iron intake.',
            },
            {
              id: 'vit-q3',
              question: 'Magnesium is involved in approximately how many enzymatic reactions in the body?',
              type: 'multiple-choice',
              options: ['50', '100', '300+', '600+'],
              correctIndex: 2,
              explanation: 'Magnesium serves as a cofactor in over 300 enzymatic reactions, including those involved in ATP synthesis, protein synthesis, muscle contraction, and DNA replication — making it one of the most functionally important minerals for athletes.',
            },
          ],
        },
      },
      {
        id: 'electrolytes-antioxidants',
        title: 'Electrolytes & Antioxidants',
        lessons: [
          {
            id: 'electrolytes-performance',
            title: 'Electrolytes & Performance',
            estimatedMinutes: 5,
            content: `Electrolytes are minerals that carry an electrical charge and play fundamental roles in fluid balance, nerve transmission, and muscle contraction. For athletes, maintaining electrolyte homeostasis is a dynamic challenge, particularly during prolonged exercise in heat.

**Sodium** is the primary extracellular electrolyte and the major driver of fluid balance. It is the electrolyte lost in greatest quantity through sweat (typically 500–1500 mg per liter of sweat, highly individual). Sodium replacement during and after prolonged exercise restores osmolarity and stimulates thirst — both necessary for complete rehydration. Sports drinks typically contain 400–700 mg of sodium per liter.

**Potassium, calcium, and magnesium** are also lost in sweat and play roles in muscle contraction and nerve function. The muscle cramp debate remains unresolved, but electrolyte imbalances — particularly in prolonged, hot conditions — are associated with increased cramping frequency.

**Hyponatremia risk**: Paradoxically, overdrinking plain water during prolonged endurance events can dilute blood sodium levels (hyponatremia), causing nausea, confusion, and in severe cases, life-threatening cerebral edema. Athletes exercising for more than 90 minutes should use electrolyte-containing drinks rather than plain water as their primary hydration source.

**Sports drinks vs food**: For most gym-based training sessions, food and plain water adequately meet electrolyte needs. Sports drinks are primarily justified for prolonged (>90 min), continuous, high-sweat activities.`,
            keyPoints: [
              'Sodium is the primary electrolyte lost in sweat and is essential for fluid balance restoration.',
              'Hyponatremia from overdrinking plain water is a genuine risk in prolonged endurance events.',
              'Sports drinks are justified for prolonged (>90 min) high-sweat activities; plain water suffices for most gym sessions.',
              'Electrolyte imbalances are associated with increased muscle cramping during prolonged exercise in heat.',
            ],
            references: [
              {
                title: 'Water and Electrolyte Turnover During Exercise',
                authors: 'Shirreffs SM, Sawka MN',
                journal: 'Journal of Sports Sciences',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21813812/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'antioxidants-recovery',
            title: 'Antioxidants: Friend or Foe?',
            estimatedMinutes: 5,
            content: `The relationship between antioxidants and exercise adaptation is more nuanced than the supplement industry typically portrays. The emerging understanding challenges the assumption that more antioxidants are always better.

**Reactive oxygen species (ROS)** are produced as a byproduct of aerobic metabolism and elevated during intense exercise. For decades, they were viewed solely as damaging. However, ROS are now recognized as important signaling molecules that trigger adaptive responses to training — including mitochondrial biogenesis, antioxidant enzyme upregulation, and muscle protein synthesis pathways.

**The antioxidant paradox**: High-dose supplementation of antioxidants — particularly vitamins C and E at doses well above dietary equivalents — can blunt these adaptive ROS signals. Multiple studies, including Paulsen et al. (2014), have shown that vitamin C and E supplementation attenuates some training adaptations in endurance and strength athletes by interfering with redox-sensitive signaling pathways.

**Practical implication**: The evidence does not support megadose antioxidant supplementation for athletes pursuing performance adaptations. However, food-based antioxidants from colorful fruits and vegetables (at normal dietary amounts) do not appear to cause the same blunting effect and continue to provide health benefits. The distinction is between pharmacological doses of isolated antioxidants versus dietary food matrix antioxidants.`,
            keyPoints: [
              'ROS are signaling molecules necessary for triggering many training adaptations — not purely damaging.',
              'High-dose vitamin C and E supplementation has been shown to blunt training adaptations in some studies.',
              'Food-based antioxidants at dietary amounts do not appear to impair adaptations — only isolated megadoses.',
              'The evidence favors a food-first approach for antioxidants rather than high-dose isolated supplements.',
            ],
            references: [
              {
                title: 'Vitamin C and E Supplementation Blunts Increases in Total Lean Body Mass in Elderly Men After Strength Training',
                authors: 'Paulsen G, Cumming KT, Holden G, et al.',
                journal: 'Scandinavian Journal of Medicine & Science in Sports',
                year: 2014,
                url: 'https://pubmed.ncbi.nlm.nih.gov/24341722/',
                type: 'journal',
              },
              {
                title: 'Mitohormesis: Promoting Health and Lifespan by Increased Levels of Reactive Oxygen Species (ROS)',
                authors: 'Merry TL, Ristow M',
                journal: 'Dose-Response',
                year: 2016,
                url: 'https://pubmed.ncbi.nlm.nih.gov/27069449/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'electrolytes-quiz',
          questions: [
            {
              id: 'elec-q1',
              question: 'What is the primary electrolyte lost in sweat and most important for fluid balance?',
              type: 'multiple-choice',
              options: ['Potassium', 'Calcium', 'Sodium', 'Magnesium'],
              correctIndex: 2,
              explanation: 'Sodium is the primary extracellular electrolyte and is lost in the greatest quantities through sweat. It drives fluid balance, stimulates thirst, and is essential for complete rehydration after exercise.',
            },
            {
              id: 'elec-q2',
              question: 'High-dose antioxidant supplementation (e.g., vitamins C and E) has been shown to blunt training adaptations in some studies.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Research including Paulsen et al. (2014) has demonstrated that pharmacological doses of vitamins C and E can blunt training adaptations by interfering with the redox-sensitive signaling pathways that ROS activate after exercise.',
            },
            {
              id: 'elec-q3',
              question: 'Hyponatremia (low blood sodium) in athletes is most commonly caused by:',
              type: 'multiple-choice',
              options: ['Excessive sodium intake', 'Over-hydrating with plain water during prolonged exercise', 'Insufficient carbohydrate intake', 'Dehydration from sweating'],
              correctIndex: 1,
              explanation: 'Exercise-associated hyponatremia is primarily caused by over-hydrating with plain water during prolonged events, which dilutes blood sodium. This is paradoxically more dangerous than mild dehydration and can lead to cerebral edema.',
            },
          ],
        },
      },
    ],
  },

  // ── Science (4) ────────────────────────────────────────────────────────────
  {
    id: 'muscle-hypertrophy-science',
    title: 'Mechanisms of Muscle Growth',
    description: 'The cellular biology of hypertrophy: mechanical tension, metabolic stress, and muscle damage.',
    category: 'strength-training',
    difficulty: 'advanced',
    estimatedMinutes: 50,
    relatedGoals: ['hypertrophy'],
    tags: ['hypertrophy', 'mTOR', 'satellite cells', 'myofibrillar'],
    coverEmoji: '🔬',
    modules: [
      {
        id: 'three-mechanisms',
        title: 'The Three Mechanisms of Hypertrophy',
        lessons: [
          {
            id: 'mechanical-tension',
            title: 'Mechanical Tension: The Primary Driver',
            estimatedMinutes: 6,
            content: `Skeletal muscle hypertrophy — the increase in muscle fiber cross-sectional area — is driven by a complex interplay of mechanical, metabolic, and hormonal signals. Brad Schoenfeld's influential 2010 review synthesized the evidence into three primary mechanisms: mechanical tension, metabolic stress, and muscle damage.

**Mechanical tension** is widely considered the dominant hypertrophic stimulus. When a muscle contracts against a load, mechanical forces are transmitted through the contractile apparatus — particularly the giant protein titin, which spans the sarcomere and acts as a molecular spring. Titin deformation under stretch and load is thought to be a key mechanosensing mechanism that activates mTORC1 and downstream anabolic signaling.

The importance of training with sufficient load and through a full range of motion (ROM) stems directly from this mechanism. Full ROM exercises subject the muscle to greater peak mechanical tension at long muscle lengths, which appears to be particularly potent for hypertrophy. A 2023 meta-analysis (Maeo et al.) found that exercises emphasizing the stretched position produced approximately twice the hypertrophy of exercises emphasizing the shortened position.

**mTORC1 activation** by mechanical stimulation occurs through multiple pathways including phospholipase D, PI3K-Akt, and focal adhesion kinase (FAK). This activation upregulates translational machinery and initiates protein synthesis independent of hormonal signals — which explains why local muscle loading produces local hypertrophy even when systemic hormones are controlled.`,
            keyPoints: [
              'Mechanical tension is the primary driver of muscle hypertrophy — the force applied to and within the muscle.',
              'Titin, the sarcomeric "spring" protein, is central to mechanosensing and mTORC1 activation.',
              'Full range of motion training, particularly emphasizing the stretched position, maximizes mechanical tension.',
              'mTORC1 activation by mechanical loading initiates protein synthesis independent of hormonal signaling.',
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
                title: 'Mechanical Signals as Anabolic Agents in Bone',
                authors: 'Wackerhage H, Schoenfeld BJ, Hamilton DL, Lehti M, Hulmi JJ',
                journal: 'Nature Reviews Rheumatology',
                year: 2019,
                url: 'https://pubmed.ncbi.nlm.nih.gov/30733616/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'metabolic-stress-muscle-damage',
            title: 'Metabolic Stress & Muscle Damage',
            estimatedMinutes: 5,
            content: `Beyond mechanical tension, two additional mechanisms are proposed to contribute to hypertrophic adaptation: metabolic stress and muscle damage. Their relative contributions and underlying mechanisms remain subjects of active research and debate.

**Metabolic stress** is the accumulation of metabolic byproducts — lactate, hydrogen ions, inorganic phosphate, reactive oxygen species — that occurs with high-repetition, moderate-load training and restricted blood flow. The resulting cell swelling (fluid influx into the cell), hypoxia, and hormonal responses (local IGF-1, growth hormone) are hypothesized to signal for growth. This is the physiological basis of the "pump" and blood flow restriction (BFR) training. However, recent research questions whether metabolic stress independently drives hypertrophy or is merely correlated with sufficient mechanical loading.

**Muscle damage** occurs primarily from eccentric (lengthening) contractions, which produce ultrastructural disruption of sarcomeres and connective tissue. The resulting inflammatory response recruits satellite cells and stimulates muscle remodeling. Damas et al. (2018) demonstrated that the hypertrophic response of early training correlates strongly with muscle damage, but as the repeated bout effect reduces damage in trained individuals, the damage contribution to hypertrophy appears to diminish while mechanical tension maintains its role.

**Current consensus**: Mechanical tension is the indispensable primary driver. Metabolic stress and muscle damage may provide complementary signals, particularly in certain training contexts. Training should not be designed primarily to maximize damage or pain (DOMS) — these are not reliable indicators of hypertrophic stimulus.`,
            keyPoints: [
              'Metabolic stress (lactate, ROS, cell swelling) contributes to hypertrophic signaling but is not the primary driver.',
              'Muscle damage from eccentric loading stimulates satellite cell activation and remodeling.',
              'The repeated bout effect reduces muscle damage over time — trained muscles show less damage for the same stimulus.',
              'DOMS (soreness) is not a reliable indicator of hypertrophic stimulus — avoid designing training to maximize soreness.',
            ],
            references: [
              {
                title: 'Hypertrophy-Type Resistance Training and Mechanisms of Muscle Growth',
                authors: 'Schoenfeld BJ',
                journal: 'Strength & Conditioning Journal',
                year: 2013,
                url: 'https://pubmed.ncbi.nlm.nih.gov/23604030/',
                type: 'journal',
              },
              {
                title: 'Resistance Training-Induced Changes in Integrated Myofibrillar Protein Synthesis Are Related to Hypertrophy Only After Attenuation of Muscle Damage',
                authors: 'Damas F, Phillips SM, Libardi CA, et al.',
                journal: 'Journal of Physiology',
                year: 2016,
                url: 'https://pubmed.ncbi.nlm.nih.gov/27219125/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'hypertrophy-mechanisms-quiz',
          questions: [
            {
              id: 'hm-q1',
              question: "According to Schoenfeld's model, which is considered the PRIMARY driver of muscle hypertrophy?",
              type: 'multiple-choice',
              options: ['Metabolic stress (pump)', 'Mechanical tension', 'Muscle damage (DOMS)', 'Hormonal response'],
              correctIndex: 1,
              explanation: 'Mechanical tension — the force applied to and within muscle fibers during contraction — is considered the primary and indispensable driver of hypertrophy. It directly activates mTORC1 through mechanosensing proteins like titin and FAK.',
            },
            {
              id: 'hm-q2',
              question: 'Full range of motion exercises produce greater hypertrophy than partial range of motion for equivalent load.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Full ROM, and particularly exercises that emphasize the stretched position, expose muscles to greater mechanical tension. Meta-analysis data suggests exercises emphasizing the stretched position may produce approximately twice the hypertrophy of shortened-position exercises.',
            },
            {
              id: 'hm-q3',
              question: 'Which protein acts as a molecular spring within the sarcomere and may be involved in tension sensing?',
              type: 'multiple-choice',
              options: ['Actin', 'Myosin', 'Titin', 'Troponin'],
              correctIndex: 2,
              explanation: 'Titin is the largest known protein and spans from the Z-disc to the M-line in the sarcomere, acting as a molecular spring. It is a primary mechanosensor — its deformation under load is thought to activate downstream hypertrophic signaling pathways.',
            },
          ],
        },
      },
      {
        id: 'satellite-cells-fiber-types',
        title: 'Satellite Cells & Fiber Types',
        lessons: [
          {
            id: 'satellite-cells',
            title: 'Satellite Cells & Myonuclei',
            estimatedMinutes: 5,
            content: `Muscle fibers are post-mitotic cells — they cannot divide to produce more fibers. Yet they can grow substantially in size. This is possible through the incorporation of additional nuclei, provided by specialized muscle stem cells called satellite cells.

**Satellite cells** reside between the sarcolemma and basal lamina of muscle fibers in a quiescent state. Following the mechanical and metabolic stresses of exercise, they are activated, proliferate, and either fuse with existing fibers (donating nuclei and expanding the myonuclear domain) or fuse together to form new myotubes (a minor contributor to adult hypertrophy in humans).

**The myonuclear domain theory** proposes that each nucleus can only support a finite cytoplasmic volume. As a fiber grows, additional nuclei are needed to manage the increased volume of contractile proteins. Satellite cell donation of nuclei enables this expansion. Snijders et al. (2015) demonstrated that older adults with more satellite cells per fiber show greater hypertrophic response to training, confirming the functional link.

**Muscle memory and myonuclear retention**: Perhaps the most intriguing aspect of myonuclear biology is that nuclei acquired through training appear to be retained even during prolonged periods of muscle atrophy. Bruusgaard et al. (2010) demonstrated in animal models that myonuclei persist through detraining. When training resumes, these retained nuclei accelerate the regrowth of muscle tissue — providing a mechanistic explanation for the commonly observed phenomenon of faster regrowth in previously trained individuals.`,
            keyPoints: [
              'Satellite cells are muscle stem cells that donate nuclei to growing muscle fibers to support hypertrophy.',
              'The myonuclear domain theory: each nucleus supports a finite volume — growth requires additional nuclei.',
              'Satellite cell number predicts hypertrophic response — more satellite cells enable greater growth.',
              'Myonuclei are retained during detraining, partially explaining the muscle memory phenomenon.',
            ],
            references: [
              {
                title: 'Satellite Cell Responsiveness to Resistance Exercise Training Is Attenuated in Master Athletes',
                authors: 'Snijders T, Wall BT, Dirks ML, et al.',
                journal: 'International Journal of Sports Physiology and Performance',
                year: 2015,
                url: 'https://pubmed.ncbi.nlm.nih.gov/25989220/',
                type: 'journal',
              },
              {
                title: 'Myonuclei Acquired by Overload Exercise Precede Hypertrophy and Are Not Lost on Detraining',
                authors: 'Bruusgaard JC, Johansen IB, Egner IM, Rana ZA, Gundersen K',
                journal: 'Proceedings of the National Academy of Sciences',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/20713720/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'fiber-types-hypertrophy',
            title: 'Muscle Fiber Types & Hypertrophy',
            estimatedMinutes: 5,
            content: `Human skeletal muscle is composed of a spectrum of fiber types that differ in metabolic properties, contraction speed, and hypertrophic potential. Understanding this impacts training design for different goals.

**Type I fibers** (slow-twitch, oxidative) are fatigue-resistant, rely primarily on aerobic metabolism, and are the first recruited according to Henneman's Size Principle. They have smaller absolute cross-sectional area and are historically considered less responsive to hypertrophic training.

**Type II fibers** (fast-twitch) encompass Type IIa (fast oxidative-glycolytic — highly adaptable) and Type IIx (fast glycolytic — the most powerful but also most fatigable). Type II fibers are recruited for higher-intensity efforts and have greater absolute hypertrophic potential — they can grow to larger absolute sizes than Type I fibers.

**Both fiber types respond to hypertrophy training**: Contrary to older beliefs, both Type I and Type II fibers hypertrophy meaningfully with resistance training. Lighter loads taken close to failure stimulate Type I fiber hypertrophy effectively. Heavier loads recruit Type II fibers more selectively. A meta-analysis by Schoenfeld et al. found no significant difference in hypertrophy across a wide rep range (6–30 reps) when effort was equated.

**Fiber type distribution** is largely genetically determined, with modest plasticity through training. Athletes with a higher proportion of Type II fibers have greater potential for strength and power sports, while endurance athletes typically have higher Type I proportions.`,
            keyPoints: [
              'Type II fibers have greater absolute hypertrophic growth potential than Type I fibers.',
              'Both Type I and Type II fibers respond to hypertrophy training — rep range matters less than effort and volume.',
              'Fiber type distribution is largely genetically determined with only modest training-induced plasticity.',
              'Heavy loading preferentially recruits Type II fibers; lighter loads taken to failure also effectively train both types.',
            ],
            references: [
              {
                title: 'The Role of Skeletal Muscle Fiber Type in Resistance Training',
                authors: 'Fry AC',
                journal: 'Sports Medicine',
                year: 2004,
                url: 'https://pubmed.ncbi.nlm.nih.gov/15335244/',
                type: 'journal',
              },
              {
                title: 'The Mechanisms of Muscle Hypertrophy and Their Application to Resistance Training',
                authors: 'Schoenfeld BJ',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/20847704/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'satellite-cells-quiz',
          questions: [
            {
              id: 'sc-q1',
              question: 'Satellite cells play what primary role in skeletal muscle hypertrophy?',
              type: 'multiple-choice',
              options: ['Generating ATP for muscle contractions', 'Donating myonuclei to growing muscle fibers', 'Transmitting nerve signals to muscle', 'Storing glycogen'],
              correctIndex: 1,
              explanation: 'Satellite cells are muscle stem cells that, when activated by exercise-induced stress, proliferate and fuse with muscle fibers, donating nuclei. These additional nuclei are necessary to support the increased protein synthesis demands of growing muscle fibers.',
            },
            {
              id: 'sc-q2',
              question: "The 'muscle memory' phenomenon is partly explained by the retention of myonuclei even after muscle atrophy.",
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Research by Bruusgaard et al. (2010) demonstrated that myonuclei acquired through overload training persist through detraining and atrophy. When training resumes, these retained nuclei enable faster regrowth of previously trained muscle.',
            },
            {
              id: 'sc-q3',
              question: 'Which muscle fiber type has the greatest absolute hypertrophic growth potential?',
              type: 'multiple-choice',
              options: ['Type I (slow-twitch) only', 'Type II (fast-twitch)', 'Both fiber types grow equally', 'Neither — only pennation angle changes'],
              correctIndex: 1,
              explanation: 'Type II (fast-twitch) fibers have greater absolute hypertrophic growth potential and can reach larger maximum cross-sectional areas than Type I fibers. However, both fiber types respond to resistance training and contribute to overall hypertrophy.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'hormones-performance',
    title: 'Hormones & Performance',
    description: 'Testosterone, growth hormone, cortisol, and insulin — how they respond to training and nutrition.',
    category: 'strength-training',
    difficulty: 'advanced',
    estimatedMinutes: 45,
    relatedGoals: ['hypertrophy', 'general-fitness'],
    tags: ['testosterone', 'cortisol', 'hormones', 'endocrine'],
    coverEmoji: '⚗️',
    modules: [
      {
        id: 'anabolic-hormones',
        title: 'Anabolic Hormones',
        lessons: [
          {
            id: 'testosterone-gh',
            title: 'Testosterone & Growth Hormone',
            estimatedMinutes: 6,
            content: `Anabolic hormones are chemical messengers that promote tissue building — particularly muscle protein synthesis and satellite cell activation. Two of the most important for athletes are testosterone and growth hormone (GH).

**Testosterone** is the primary male sex hormone produced predominantly in the Leydig cells of the testes (and in smaller amounts by the adrenal glands and ovaries in females). It circulates both free (~2–3%) and bound to proteins (SHBG and albumin). Only free and loosely bound testosterone is biologically active. Testosterone binds to androgen receptors in muscle cells, initiating gene transcription that upregulates muscle protein synthesis, increases satellite cell activation and proliferation, and reduces muscle protein breakdown. It also stimulates IGF-1 production locally in muscle.

**Acute hormonal responses to resistance training**: Heavy compound exercises (squats, deadlifts) and protocols with short rest periods produce acute testosterone spikes. Kraemer and Ratamess (2005) demonstrated that these acute spikes, while transient, may contribute to the anabolic environment surrounding training. However, the magnitude and duration of these spikes is modest — chronic adaptations to training are more relevant than single-session hormonal peaks.

**Growth hormone** is secreted in pulsatile bursts from the anterior pituitary, with the largest pulse occurring during slow-wave sleep. GH exerts direct lipolytic (fat-mobilizing) effects and stimulates the liver and peripheral tissues to produce IGF-1, which mediates many of GH's growth-promoting effects. GH also has direct effects on satellite cell activation. High-volume, metabolically demanding training protocols (rest periods <60 seconds) produce the greatest acute GH responses.`,
            keyPoints: [
              'Testosterone binds androgen receptors to upregulate MPS, activate satellite cells, and reduce muscle breakdown.',
              'Only free and albumin-bound testosterone is biologically active — SHBG-bound is inactive.',
              'Heavy compound resistance training produces acute testosterone spikes, though chronic adaptations are more important.',
              'GH is released primarily during slow-wave sleep and stimulates IGF-1 production and lipolysis.',
            ],
            references: [
              {
                title: 'Hormonal Responses and Adaptations to Resistance Exercise and Training',
                authors: 'Kraemer WJ, Ratamess NA',
                journal: 'Sports Medicine',
                year: 2005,
                url: 'https://pubmed.ncbi.nlm.nih.gov/15831061/',
                type: 'journal',
              },
              {
                title: 'Testosterone Physiology in Resistance Exercise and Training',
                authors: 'Vingren JL, Kraemer WJ, Ratamess NA, et al.',
                journal: 'Sports Medicine',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21058750/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'igf1-insulin',
            title: 'IGF-1 & Insulin: Anabolic Signals',
            estimatedMinutes: 5,
            content: `Insulin-like growth factor 1 (IGF-1) and insulin are two additional anabolic signals that play important complementary roles in muscle metabolism and body composition.

**IGF-1** is produced primarily in the liver in response to GH stimulation, as well as locally in muscle tissue (mechano-growth factor, MGF, is a locally spliced IGF-1 isoform). Systemic IGF-1 mediates many of GH's anabolic effects — it activates the PI3K-Akt-mTOR pathway to stimulate protein synthesis and inhibits the FoxO transcription factors that would otherwise activate protein degradation pathways. Local IGF-1 production in response to mechanical loading may be more important than systemic IGF-1 for exercise-induced hypertrophy.

**Insulin** is often characterized as purely anabolic, but its primary role in muscle metabolism is anti-catabolic rather than directly anabolic. Insulin strongly suppresses muscle protein breakdown (MPB) by inhibiting the ubiquitin-proteasome pathway. Its direct stimulation of MPS, while present, is modest at physiological insulin concentrations compared to the effect of amino acids. Critically, insulin also facilitates nutrient uptake — glucose and amino acids are transported into cells more efficiently in the presence of insulin, amplifying the anabolic effect of post-workout carbohydrate and protein co-ingestion.

**Insulin and body composition**: Chronically elevated insulin (from excess carbohydrate and caloric intake) promotes fat storage through lipogenesis and inhibits fat oxidation. Optimizing insulin sensitivity through training, appropriate carbohydrate timing, and maintaining healthy body composition supports favorable body composition outcomes.`,
            keyPoints: [
              'IGF-1 activates PI3K-Akt-mTOR to stimulate MPS and inhibits protein degradation pathways.',
              'Local IGF-1 production in muscle (MGF) in response to mechanical loading is particularly important for hypertrophy.',
              "Insulin's primary role in muscle is anti-catabolic — it powerfully inhibits muscle protein breakdown.",
              'Insulin improves nutrient uptake, amplifying the anabolic response to post-workout carbohydrate and protein.',
            ],
            references: [
              {
                title: 'IGF-I and Its Binding Proteins: Role in Growth Regulation',
                authors: 'Clemmons DR',
                journal: 'Annals of the New York Academy of Sciences',
                year: 2009,
                url: 'https://pubmed.ncbi.nlm.nih.gov/19278176/',
                type: 'journal',
              },
              {
                title: 'Resistance Exercise Biology: Manipulation of Resistance Exercise Programme Variables Determines the Responses of Cellular and Molecular Signalling Pathways',
                authors: 'Spiering BA, Kraemer WJ, Anderson JM, et al.',
                journal: 'Sports Medicine',
                year: 2008,
                url: 'https://pubmed.ncbi.nlm.nih.gov/18563955/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'anabolic-hormones-quiz',
          questions: [
            {
              id: 'ah-q1',
              question: "Testosterone's anabolic effects on muscle are mediated primarily through:",
              type: 'multiple-choice',
              options: ['Directly causing muscle contraction', 'Binding to androgen receptors and upregulating MPS and satellite cell activity', 'Stimulating pancreatic insulin secretion', 'Reducing cortisol levels'],
              correctIndex: 1,
              explanation: 'Testosterone binds to androgen receptors within muscle cells, initiating gene transcription that upregulates muscle protein synthesis, promotes satellite cell activation and proliferation, and reduces muscle protein breakdown rates.',
            },
            {
              id: 'ah-q2',
              question: 'Growth hormone is released primarily during slow-wave (deep) sleep, making sleep quality critical for hormonal recovery.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. The largest GH pulse of the day occurs during slow-wave (stage 3 NREM) sleep, typically in the first 1–2 hours of sleep. Disrupted sleep architecture reduces total nightly GH secretion, impairing recovery and body composition.',
            },
            {
              id: 'ah-q3',
              question: "Insulin's primary role in muscle metabolism is best described as:",
              type: 'multiple-choice',
              options: ['Directly stimulating muscle protein synthesis', 'Anti-catabolic — reducing muscle protein breakdown', 'Increasing testosterone levels', 'Elevating growth hormone pulses'],
              correctIndex: 1,
              explanation: "Insulin's most potent role in muscle metabolism is anti-catabolic — it strongly inhibits the ubiquitin-proteasome protein degradation pathway, reducing muscle protein breakdown. Its direct stimulation of MPS is modest at physiological concentrations.",
            },
          ],
        },
      },
      {
        id: 'cortisol-optimization',
        title: 'Cortisol & Hormonal Optimization',
        lessons: [
          {
            id: 'cortisol-training',
            title: 'Cortisol: Friend and Foe',
            estimatedMinutes: 5,
            content: `Cortisol is a glucocorticoid hormone produced by the adrenal cortex in response to physical and psychological stress. It has a dual nature in the context of training — acutely necessary and beneficial, chronically harmful.

**Cortisol's acute role**: During exercise, cortisol mobilizes energy by stimulating gluconeogenesis (glucose production from non-carbohydrate sources, including amino acids), lipolysis (fat breakdown), and glycogen breakdown. This ensures fuel availability for working muscles and is an essential adaptive response. Without cortisol's acute rise, intense training could not be sustained.

**Chronic elevation is problematic**: Sustained cortisol elevation — from excessive training volume, inadequate recovery, poor sleep, or high psychological stress — becomes catabolic. Chronic cortisol promotes muscle protein catabolism by activating the ubiquitin-proteasome pathway, suppresses testosterone and GH secretion, impairs immune function, disrupts sleep architecture, and promotes central fat accumulation.

**Training volume and cortisol**: The relationship between training volume and cortisol follows a dose-response pattern. As weekly training volume increases, both the anabolic and catabolic signals intensify. Overreaching — pushing beyond the body's recovery capacity — produces a profile of chronically elevated cortisol, suppressed anabolic hormones, and declining performance. The diagnosis of overtraining syndrome involves a constellation of symptoms including mood disturbance, persistent fatigue, and hormonal dysregulation.

**HPA axis adaptation**: Well-trained athletes show attenuated cortisol responses to a given exercise load — the HPA axis calibrates to the training stimulus over time, which is one marker of a trained state.`,
            keyPoints: [
              'Acute cortisol rise during exercise mobilizes energy and is a necessary adaptive response.',
              'Chronic cortisol elevation promotes muscle catabolism, suppresses anabolic hormones, and impairs recovery.',
              'Excessive training volume without adequate recovery can produce chronic cortisol elevation.',
              'Overtraining syndrome is characterized by chronically elevated cortisol and suppressed anabolic hormone levels.',
            ],
            references: [
              {
                title: 'Overtraining Effects on Immunity and Performance in Athletes',
                authors: 'Skoluda N, Dettenborn L, Stalder T, Kirschbaum C',
                journal: 'Psychoneuroendocrinology',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21955698/',
                type: 'journal',
              },
              {
                title: 'Exercise and Cortisol — Friend or Foe?',
                authors: 'Duclos M, Tabarin A',
                journal: 'Annales d\'Endocrinologie',
                year: 2016,
                url: 'https://pubmed.ncbi.nlm.nih.gov/26922573/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'optimizing-hormones-naturally',
            title: 'Optimizing Hormones Naturally',
            estimatedMinutes: 5,
            content: `While pharmacological hormone manipulation is beyond the scope of natural training, several lifestyle factors have robust evidence for meaningfully affecting endogenous hormone levels — particularly testosterone, GH, and cortisol.

**Sleep is the most powerful natural hormonal intervention**. Leproult and Van Cauter (2011) demonstrated in a controlled study that restricting sleep to 5 hours per night for just one week reduced testosterone levels in young healthy men by 10–15%. Walker's research has further quantified that chronic short sleep produces hormonal profiles resembling those of someone 10+ years older. The mechanism involves disrupted GH pulse secretion and altered LH signaling from the pituitary.

**Dietary fat intake**: Cholesterol is the precursor for all steroid hormones, including testosterone. Low-fat diets (particularly those restricting fat below 15–20% of calories) have been associated with reduced testosterone levels in multiple studies. Hamalainen et al. (1984) showed that shifting from a high-fat to low-fat diet reduced testosterone. This is not an argument for unlimited saturated fat consumption, but for maintaining adequate total fat intake (≥20–25% of calories) including sources of monounsaturated fat (olive oil, avocado, nuts).

**Stress management** reduces cortisol chronically, creating a more favorable anabolic-to-catabolic ratio. **Avoiding overtraining** through appropriate volume management and deloads prevents HPA axis dysregulation. **Maintaining healthy body fat** (particularly avoiding very low body fat) supports hormonal function — extreme leanness suppresses reproductive hormones in both sexes.`,
            keyPoints: [
              'Restricting sleep to 5 hours for one week reduces testosterone by 10–15% in healthy young men.',
              'Adequate dietary fat (≥20–25% of calories) is necessary to support steroid hormone synthesis from cholesterol.',
              'Chronic stress management through lifestyle practices reduces cortisol and improves anabolic-to-catabolic balance.',
              'Avoiding excessive training volume and maintaining adequate body fat supports endocrine function.',
            ],
            references: [
              {
                title: 'Effect of 1 Week of Sleep Restriction on Testosterone Levels in Young Healthy Men',
                authors: 'Leproult R, Van Cauter E',
                journal: 'JAMA',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21632481/',
                type: 'journal',
              },
              {
                title: 'Diet and Serum Sex Hormone-Binding Globulin: Effect on Testosterone, Estradiol and Other Hormones',
                authors: 'Hamalainen E, Adlercreutz H, Puska P, Pietinen P',
                journal: 'Journal of Steroid Biochemistry',
                year: 1984,
                url: 'https://pubmed.ncbi.nlm.nih.gov/6538617/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'cortisol-quiz',
          questions: [
            {
              id: 'cort-q1',
              question: 'Chronic elevation of cortisol is detrimental to muscle because it:',
              type: 'multiple-choice',
              options: ['Blocks testosterone receptors permanently', 'Promotes protein catabolism and opposes anabolic signaling', 'Reduces growth hormone production to zero', 'Causes direct muscle fiber death'],
              correctIndex: 1,
              explanation: 'Chronic cortisol elevation activates the ubiquitin-proteasome protein degradation pathway, increasing muscle protein breakdown. It also suppresses testosterone and GH secretion, creating an unfavorable anabolic-to-catabolic hormonal environment.',
            },
            {
              id: 'cort-q2',
              question: 'Restricting sleep to 5 hours per night for one week can reduce testosterone levels by approximately 10–15%.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Leproult and Van Cauter (2011) demonstrated this significant testosterone reduction in young healthy men with just one week of sleep restriction, highlighting sleep as the most powerful lifestyle lever for hormonal optimization.',
            },
            {
              id: 'cort-q3',
              question: 'Which dietary macronutrient is the precursor for steroid hormone synthesis, including testosterone?',
              type: 'multiple-choice',
              options: ['Protein', 'Carbohydrate', 'Dietary fat (cholesterol)', 'Fiber'],
              correctIndex: 2,
              explanation: 'Cholesterol, found in dietary fat sources, is the molecular precursor for all steroid hormones including testosterone, estrogen, cortisol, and DHEA. Very low fat diets have been associated with reduced testosterone levels.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'periodization-science',
    title: 'Periodization Theory',
    description: 'Linear, undulating, block, and conjugate periodization models — when and how to use each.',
    category: 'strength-training',
    difficulty: 'advanced',
    estimatedMinutes: 55,
    relatedGoals: ['hypertrophy'],
    tags: ['periodization', 'programming', 'block', 'DUP'],
    coverEmoji: '📊',
    modules: [
      {
        id: 'periodization-models',
        title: 'Periodization Models',
        lessons: [
          {
            id: 'linear-periodization',
            title: 'Linear & Block Periodization',
            estimatedMinutes: 6,
            content: `Periodization is the systematic manipulation of training variables over time to optimize performance and adaptation while managing fatigue. It emerged from Soviet sports science in the mid-20th century and remains the foundational framework for long-term athletic programming.

**Traditional linear periodization (LP)** — also called classical or sequential periodization — progresses through phases of decreasing volume and increasing intensity over a macro-cycle (typically 12–16 weeks). Early phases emphasize high volume, moderate intensity (hypertrophy); later phases shift to lower volume, high intensity (strength, power). The original model by Matveyev provided the theoretical basis that most strength and conditioning programs still follow.

**Block periodization**, developed by Vladimir Issurin, addresses limitations of LP for advanced athletes who cannot accommodate large simultaneous training loads across multiple qualities. Blocks (typically 2–6 weeks each) concentrate on developing one or two qualities per block: accumulation (volume, work capacity), transmutation (intensity, sport-specific), and realization (peaking, competition-specific). This concentration approach allows deeper adaptation within each block by reducing interference between competing qualities.

**Advantages and limitations**: LP is simple and effective for beginners to intermediate athletes, producing steady progress through orderly progression. For advanced athletes, the rate of adaptation slows, and LP's limited variety becomes a constraint. Block periodization is generally favored for competitive athletes who need to peak for specific events, as it allows more precise management of adaptation and fatigue.`,
            keyPoints: [
              'Linear periodization systematically decreases volume and increases intensity over a training macro-cycle.',
              'Block periodization concentrates training into accumulation, transmutation, and realization phases.',
              'LP is most appropriate for beginners to intermediate athletes; block periodization suits advanced competitors.',
              'Both models share the goal of optimizing adaptation while managing accumulated fatigue.',
            ],
            references: [
              {
                title: 'Block Periodization: Breakthrough in Sports Training',
                authors: 'Issurin VB',
                journal: 'Journal of Sports Medicine and Physical Fitness',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/20199122/',
                type: 'journal',
              },
              {
                title: 'Strength Training Variables: Implementation and Modification',
                authors: 'Painter KB, Haff GG, Ramsey MW, et al.',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/22328502/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'undulating-periodization',
            title: 'Daily & Weekly Undulating Periodization',
            estimatedMinutes: 5,
            content: `Undulating periodization diverges from the step-wise progression of linear models by varying training stimuli within shorter time frames — either weekly (WUP) or daily (DUP). This approach was developed in part to address the monotony and accommodation issues that emerge with sustained linear progression.

**Daily undulating periodization (DUP)** varies the training focus, rep range, and loading scheme between training sessions within the same week. For example, Monday might be strength-focused (3–5 reps, ~85% 1RM), Wednesday hypertrophy-focused (8–12 reps, ~70% 1RM), and Friday power-focused (4–6 reps, 60% 1RM, explosive tempo). This variation provides a diverse stimulus across all sessions, potentially reducing accommodation.

**Research comparison with LP**: Zourdos et al. (2016) compared DUP to LP in powerlifters over 8 weeks. Both produced significant strength improvements, but DUP produced slightly superior squat strength gains. A broader comparison by Rhea et al. (2002) found that DUP produced superior strength gains compared to LP over the same period in college athletes. The evidence consistently shows DUP as at least equivalent to, and often slightly superior to, LP.

**Practical application**: DUP is highly flexible — it can be implemented within a 3-day or 4-day training week and allows variation without requiring complete program redesign. It also aligns with the natural variation in readiness and motivation that athletes experience from day to day. A potential limitation is complexity: tracking multiple loading schemes simultaneously requires more careful programming and monitoring.`,
            keyPoints: [
              'DUP varies training focus (strength/hypertrophy/power) between sessions within the same week.',
              'Research shows DUP produces similar or slightly superior strength and hypertrophy outcomes compared to LP.',
              'DUP reduces accommodation by providing varied stimuli and aligns with day-to-day readiness variation.',
              'DUP requires more careful programming to track multiple loading schemes simultaneously.',
            ],
            references: [
              {
                title: 'Comparison of Daily Undulating Periodization to an Undulating Periodization Model',
                authors: 'Zourdos MC, Jo E, Khamoui AV, et al.',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2016,
                url: 'https://pubmed.ncbi.nlm.nih.gov/26826785/',
                type: 'journal',
              },
              {
                title: 'A Comparison of Linear and Daily Undulating Periodized Programs with Equated Volume and Intensity for Strength',
                authors: 'Rhea MR, Ball SD, Phillips WT, Burkett LN',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2002,
                url: 'https://pubmed.ncbi.nlm.nih.gov/12173958/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'periodization-models-quiz',
          questions: [
            {
              id: 'pm-q1',
              question: "In block periodization, the 'realization' (or 'peaking') block primarily focuses on:",
              type: 'multiple-choice',
              options: ['High volume, low intensity work', 'Moderate volume and moderate intensity', 'Low volume, high intensity and competition preparation', 'Deload and active recovery'],
              correctIndex: 2,
              explanation: "The realization block is the final, peaking block in block periodization. It features low volume and high intensity to allow fatigue dissipation while maintaining fitness, producing the performance 'supercompensation' needed for competition.",
            },
            {
              id: 'pm-q2',
              question: 'Daily Undulating Periodization (DUP) involves varying the rep range and training focus within the same week.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. DUP varies the training focus, rep range, and loading between sessions within the same training week (e.g., Monday: strength 3–5 reps; Wednesday: hypertrophy 8–12 reps; Friday: power 4–6 reps explosive).',
            },
            {
              id: 'pm-q3',
              question: 'Compared to linear periodization, daily undulating periodization (DUP) in research tends to produce:',
              type: 'multiple-choice',
              options: ['Significantly worse strength outcomes', 'Similar or slightly superior strength and hypertrophy outcomes', 'Dramatically superior results at all times', 'Only superior endurance outcomes'],
              correctIndex: 1,
              explanation: 'Research including Rhea et al. (2002) and Zourdos et al. (2016) shows DUP produces similar or slightly superior strength outcomes compared to LP when volume and intensity are equated, without dramatic differences.',
            },
          ],
        },
      },
      {
        id: 'fatigue-deloads',
        title: 'Programming Fatigue & Deloads',
        lessons: [
          {
            id: 'fatigue-management',
            title: 'Fatigue Management & Fitness-Fatigue Model',
            estimatedMinutes: 5,
            content: `One of the most important concepts in periodization theory is the fitness-fatigue model — a framework that explains why performance does not always match current fitness levels and why strategic recovery is essential for peak performance.

**Banister's impulse-response model** (Banister et al., 1975) proposed that a training bout produces two simultaneous effects: a positive fitness effect (force enhancement, structural adaptations) and a negative fatigue effect (neural fatigue, glycogen depletion, tissue microtrauma). Both effects decay over time, but fatigue decays faster than fitness. Therefore, if fatigue can be dissipated while fitness is maintained, performance rises above baseline — a state called supercompensation.

**The SRA curve (Stimulus → Recovery → Adaptation)** describes this process at the individual session level. After a training stimulus, performance initially drops (recovery phase), then rises above baseline (adaptation/supercompensation), and eventually returns to baseline if no further stimulus is applied. Optimal training timing aims to apply the next session at or near the adaptation peak.

**Accumulated fatigue**: Over weeks of progressive training, residual fatigue from each session accumulates. This is the intended mechanism of progressive overload phases — fitness builds substantially, but fatigue masks performance gains. When a deload is implemented, fatigue dissipates, and the accumulated fitness adaptations are revealed as a performance peak. This is the foundation of peaking strategies for competition.`,
            keyPoints: [
              "Training produces both a fitness effect and a fatigue effect — current performance = fitness minus fatigue.",
              'Fatigue decays faster than fitness, so reducing training load reveals accumulated fitness adaptations.',
              'The SRA curve describes the stimulus-recovery-adaptation cycle at the session level.',
              'Accumulated fatigue from progressive training is intentional — it masks gains that deloads reveal.',
            ],
            references: [
              {
                title: 'Systems Approach to Understanding Training Effects on Performance',
                authors: 'Banister EW, Calvert TW, Savage MV, Bach T',
                journal: 'Journal of Human Movement Studies',
                year: 1975,
                url: 'https://pubmed.ncbi.nlm.nih.gov/1201430/',
                type: 'journal',
              },
              {
                title: 'Periodization Breakthrough: The Ultimate Training System',
                authors: 'Zatsiorsky VM, Kraemer WJ',
                journal: 'Sports Training',
                year: 2006,
                url: 'https://pubmed.ncbi.nlm.nih.gov/16095544/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'deload-strategies',
            title: 'Deloads, Tapers & Peak Performance',
            estimatedMinutes: 5,
            content: `Deloading — strategically reducing training load to allow fatigue dissipation and supercompensation — is an essential component of any long-term training plan. The question is not whether to deload, but when and how.

**Types of deloads**: (1) **Volume reduction** (most common): Maintain load intensity (weights) but reduce total sets by 40–60%. This preserves neural adaptations and maintains exercise technique while reducing accumulated metabolic and muscular fatigue. (2) **Load reduction**: Reduce weight used while maintaining volume — useful when technique refinement is the focus. (3) **Active rest/complete rest**: All structured training is suspended; light movement only. Appropriate when significant overreaching has occurred or injury is present.

**Deload frequency**: For intermediate to advanced athletes, a structured deload every 4–8 weeks of hard training is generally appropriate. The optimal frequency is highly individual, depending on training volume, intensity, life stress, age, and sleep quality. Some athletes auto-regulate deloads based on performance feedback and readiness monitoring (HRV, sleep quality, subjective fatigue ratings).

**Tapering for competition** is an extended, structured deload designed to peak performance for a specific event. Bosquet et al. (2007) meta-analysis found that reducing training volume by 41–60% over 2 weeks while maintaining intensity produced the optimal competition performance. Reducing intensity too aggressively during a taper causes fitness loss — volume is reduced, not intensity.

**Pritchard et al. (2015)** found that regardless of whether volume was reduced by 33% or 67% over a 2-week taper, strength performance was preserved, confirming that even conservative deloads are sufficient to dissipate fatigue without fitness loss.`,
            keyPoints: [
              'Volume-reduction deloads (40–60% volume drop) maintain intensity to preserve strength while dissipating fatigue.',
              'Deload every 4–8 weeks for intermediate/advanced athletes; frequency is highly individual.',
              'Competition taper: reduce volume 40–60% over 2 weeks while maintaining intensity for peak performance.',
              'Reducing intensity during a taper causes fitness loss — only volume should be reduced.',
            ],
            references: [
              {
                title: 'Effects of Tapering on Performance: A Meta-Analysis',
                authors: 'Pritchard HJ, Tod DA, Barnes MJ, Keogh JW, McGuigan MR',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2015,
                url: 'https://pubmed.ncbi.nlm.nih.gov/25790697/',
                type: 'meta-analysis',
              },
              {
                title: 'Monitoring Training Load to Understand Fatigue in Athletes',
                authors: 'Bosquet L, Montpetit J, Arvisais D, Mujika I',
                journal: 'Medicine & Science in Sports & Exercise',
                year: 2007,
                url: 'https://pubmed.ncbi.nlm.nih.gov/17596786/',
                type: 'meta-analysis',
              },
            ],
          },
        ],
        quiz: {
          id: 'fatigue-deload-quiz',
          questions: [
            {
              id: 'fd-q1',
              question: 'The fitness-fatigue model suggests that current performance is the result of:',
              type: 'multiple-choice',
              options: ['Fitness gains alone', 'Fitness gains minus accumulated fatigue', 'Total training volume in the past month', 'Sleep quality and nutrition only'],
              correctIndex: 1,
              explanation: "Banister's fitness-fatigue model proposes that performance = fitness effect minus fatigue effect. Both are produced by training, but fatigue decays faster. Reducing load dissipates fatigue, revealing the underlying fitness adaptations.",
            },
            {
              id: 'fd-q2',
              question: 'A deload typically involves reducing training volume by 40–60% while maintaining load intensity to preserve strength adaptations.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. The most evidence-supported deload approach reduces training volume (sets) by 40–60% while maintaining exercise loads. This dissipates metabolic and muscular fatigue while preserving neural strength adaptations.',
            },
            {
              id: 'fd-q3',
              question: 'The SRA (Stimulus-Recovery-Adaptation) curve suggests that the next training bout should ideally occur at which point?',
              type: 'multiple-choice',
              options: ['During the recovery dip (before adaptation)', 'At the adaptation/supercompensation peak', 'Immediately after the previous session', 'After adaptation has fully faded'],
              correctIndex: 1,
              explanation: 'The SRA model suggests that optimal training frequency times the next session at the adaptation (supercompensation) peak — after recovery is complete and the positive fitness adaptation above baseline is present. Too early is counterproductive; too late loses the supercompensation.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'nervous-system-training',
    title: 'Neuromuscular Adaptations',
    description: 'How the nervous system adapts to training, motor unit recruitment, and neural efficiency gains.',
    category: 'strength-training',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    relatedGoals: ['hypertrophy'],
    tags: ['neuromuscular', 'motor units', 'RFD', 'neural adaptations'],
    coverEmoji: '⚡',
    modules: [
      {
        id: 'motor-unit-recruitment',
        title: 'Motor Unit Recruitment',
        lessons: [
          {
            id: 'motor-units-hennemans',
            title: "Motor Units & Henneman's Size Principle",
            estimatedMinutes: 5,
            content: `Muscle force production is not a binary on/off event — it is precisely regulated through the coordinated recruitment of motor units, the fundamental organizational unit of the neuromuscular system.

A **motor unit** consists of a single alpha motor neuron and all the muscle fibers it innervates. The size of a motor unit (number of fibers) and the type of muscle fibers it innervates vary dramatically, from small units with a handful of slow-twitch fibers to large units innervating hundreds of fast-twitch fibers.

**Henneman's Size Principle** (1957), confirmed across decades of research, states that motor units are recruited in an orderly sequence from smallest (low threshold, slow-twitch) to largest (high threshold, fast-twitch). This occurs because smaller motor neurons have higher input resistance and thus reach firing threshold with less synaptic input. As force demands increase, progressively larger motor units are recruited.

**Training implications**: To recruit and stress the high-threshold, fast-twitch motor units responsible for maximum strength and hypertrophy, you must train with either (1) heavy loads that demand high force output from the outset, or (2) lighter loads taken close to muscular failure, where fatigue of lower-threshold units forces the recruitment of higher-threshold units to maintain force output. The research supports both approaches as effective — proximity to failure appears to be the key variable for engaging all available motor units.`,
            keyPoints: [
              'A motor unit is a motor neuron and all the muscle fibers it innervates.',
              "Henneman's Size Principle: motor units are recruited smallest-to-largest as force demands increase.",
              'High-threshold fast-twitch motor units are recruited with heavy loads OR lighter loads taken near failure.',
              'Training near muscular failure forces recruitment of all available motor units regardless of load.',
            ],
            references: [
              {
                title: 'Functional Role of Motor Unit in Motoneuron Pool During Voluntary Contraction',
                authors: 'Duchateau J, Semmler JG, Enoka RM',
                journal: 'Journal of Applied Physiology',
                year: 2006,
                url: 'https://pubmed.ncbi.nlm.nih.gov/16873398/',
                type: 'journal',
              },
              {
                title: 'Functional Significance of Cell Size in Spinal Motoneurons',
                authors: 'Henneman E',
                journal: 'Journal of Neurophysiology',
                year: 1957,
                url: 'https://pubmed.ncbi.nlm.nih.gov/13469893/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'rate-coding-synchronization',
            title: 'Rate Coding & Motor Unit Synchronization',
            estimatedMinutes: 5,
            content: `Beyond motor unit recruitment, two additional neural mechanisms contribute to force production: rate coding and motor unit synchronization.

**Rate coding** refers to the regulation of muscle force through changes in motor neuron firing frequency. Once a motor unit is recruited, its force output can be further increased by increasing its firing rate — from initial "unfused" tetanus (suboptimal, jerky contractions) to "fused" tetanus (smooth, maximum force). For maximum voluntary contraction, both full recruitment and maximum firing rate are required simultaneously.

**Motor unit synchronization** occurs when multiple motor units fire at the same time. While some synchronization exists naturally, training increases the tendency for motor units to fire simultaneously, which may contribute to the rapid force development (rate of force development) seen in trained athletes. Evidence from Carroll et al. (2001) suggests synchronization increases with strength training, particularly for high-force tasks.

**Neural adaptations in beginners**: Much of the strength gained in the first 8–12 weeks of training occurs without significant muscle hypertrophy — this is the classic "neural phase" of adaptation. During this period, the nervous system learns to recruit more motor units simultaneously, increase their firing rates, and improve inter-muscular coordination (agonist activation, antagonist inhibition). This explains why beginners can dramatically increase strength without visible muscle size changes. These neural gains eventually plateau, and continued strength progress beyond that point requires structural hypertrophy.`,
            keyPoints: [
              'Rate coding: increasing motor neuron firing frequency increases force output from already-recruited motor units.',
              'Motor unit synchronization — firing simultaneously — contributes to rapid force development.',
              'Neural adaptations (recruitment, rate coding, synchronization) drive most strength gains in the first 8–12 weeks.',
              'Beyond the neural phase, continued strength gains require structural muscle hypertrophy.',
            ],
            references: [
              {
                title: 'Motor Unit Firing Rate During Maximal Voluntary Contractions',
                authors: 'Sale DG',
                journal: 'Exercise and Sport Sciences Reviews',
                year: 1988,
                url: 'https://pubmed.ncbi.nlm.nih.gov/3292263/',
                type: 'journal',
              },
              {
                title: 'Motor Unit Synchronization in Human Muscles',
                authors: 'Carroll TJ, Barry B, Riek S, Carson RG',
                journal: 'Experimental Brain Research',
                year: 2001,
                url: 'https://pubmed.ncbi.nlm.nih.gov/11565177/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'motor-units-quiz',
          questions: [
            {
              id: 'mu-q1',
              question: "Henneman's Size Principle states that motor units are recruited in order of:",
              type: 'multiple-choice',
              options: ['Random activation', 'Size from smallest to largest (low-threshold first)', 'Size from largest to smallest (high-threshold first)', 'Speed of contraction only'],
              correctIndex: 1,
              explanation: "Henneman's Size Principle describes orderly recruitment from smallest (low-threshold, slow-twitch) to largest (high-threshold, fast-twitch) motor units as force demands increase. This is determined by motor neuron size and input resistance.",
            },
            {
              id: 'mu-q2',
              question: 'Much of the early strength gain in beginner trainees is neural rather than structural (hypertrophic).',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. In the first 8–12 weeks of training, most strength gains come from neural adaptations: improved motor unit recruitment, increased firing rates, better inter-muscular coordination, and reduced neural inhibition — without significant muscle size increases.',
            },
            {
              id: 'mu-q3',
              question: 'To recruit high-threshold motor units (which innervate fast-twitch fibers), you should:',
              type: 'multiple-choice',
              options: ['Use only light loads for many reps', 'Never train near muscular failure', 'Train with heavy loads or lighter loads taken close to failure', 'Only perform isometric contractions'],
              correctIndex: 2,
              explanation: 'High-threshold motor units can be recruited by either using heavy loads (which require immediate high-threshold recruitment) or by using lighter loads taken close to muscular failure (where fatigue of lower-threshold units forces high-threshold recruitment).',
            },
          ],
        },
      },
      {
        id: 'neural-adaptations',
        title: 'Neural Adaptations to Training',
        lessons: [
          {
            id: 'rfd-explosive-training',
            title: 'Rate of Force Development & Explosive Training',
            estimatedMinutes: 5,
            content: `In most athletic contexts, the limiting factor for performance is not maximum force capacity but how quickly that force can be developed. Rate of Force Development (RFD) — the slope of the force-time curve — determines performance in high-speed athletic actions.

**Why RFD matters for sport**: Most sport-specific actions (sprinting ground contacts, jumps, throwing, change of direction) occur in 50–250 milliseconds. Maximum isometric force typically requires 300–500 ms to reach its peak. This means an athlete who cannot develop high forces rapidly will underperform regardless of their maximum strength capacity. RFD in the early phase (0–100 ms) is almost entirely neural in nature — it reflects motor unit synchronization, firing rates, and corticospinal tract drive.

**Plyometric and ballistic training** specifically target RFD through the combination of high-velocity movements and stretch-shortening cycle loading. Aagaard et al. (2002) demonstrated that 14 weeks of heavy resistance training significantly increased RFD alongside maximal strength, with changes in rapid motor unit discharge patterns (increased doublet discharges — very high-frequency bursts at movement onset) providing the neural mechanism.

**Velocity specificity**: Neural adaptations to training are somewhat velocity-specific — training at high velocities improves performance primarily at and near those velocities. This is the rationale for including explosive training alongside heavier strength work: maximum strength provides the force ceiling, while explosive training and plyometrics develop the neural mechanisms to express that force rapidly.`,
            keyPoints: [
              'RFD (rate of force development) determines performance in athletic actions occurring in <300 milliseconds.',
              'Early-phase RFD (0–100 ms) is primarily neural — driven by motor unit synchronization and firing rates.',
              'Plyometric and ballistic training specifically develop RFD through high-velocity stretch-shortening cycles.',
              'Neural adaptations to training are velocity-specific — train at relevant speeds for sport-specific RFD gains.',
            ],
            references: [
              {
                title: 'Neural Inhibition during Maximal Eccentric and Concentric Quadriceps Contraction',
                authors: 'Aagaard P, Simonsen EB, Andersen JL, Magnusson P, Dyhre-Poulsen P',
                journal: 'Journal of Applied Physiology',
                year: 2002,
                url: 'https://pubmed.ncbi.nlm.nih.gov/12165751/',
                type: 'journal',
              },
              {
                title: 'Neuromuscular Factors Associated with Decline in Long-Distance Running Performance in Master Athletes',
                authors: 'Maffiuletti NA, Aagaard P, Blazevich AJ, et al.',
                journal: 'Medicine & Science in Sports & Exercise',
                year: 2016,
                url: 'https://pubmed.ncbi.nlm.nih.gov/26439784/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'inhibition-disinhibition',
            title: 'Neural Inhibition & Strength Potential',
            estimatedMinutes: 5,
            content: `The nervous system maintains several inhibitory mechanisms that limit maximum force output as a protective strategy. Understanding and progressively reducing these inhibitions is a meaningful pathway to expressing greater strength.

**Autogenic inhibition via the Golgi Tendon Organ (GTO)**: The GTO is a mechanoreceptor located at the musculotendinous junction that senses tension. When tension becomes excessive, GTO firing activates Ib inhibitory interneurons, reflexively inhibiting the agonist muscle (autogenic inhibition) to prevent tendon rupture. In trained individuals, chronic high-tension exposure appears to raise the threshold at which GTO inhibition is triggered — a form of neural disinhibition that allows greater force expression.

**Reciprocal inhibition**: When an agonist contracts, the antagonist is reflexively inhibited (via Ia inhibitory interneurons) to allow smooth, efficient movement. However, excessive co-contraction of antagonists wastes force. Training improves the timing and magnitude of reciprocal inhibition, reducing this energy-wasting co-contraction and increasing net force output.

**Psyching up and emotional arousal**: Research demonstrates that elevated arousal states (loud music, motivational cues, competitive settings) can transiently increase maximal force output by 5–12% compared to neutral states. This appears to work through increased corticospinal drive and reduced inhibitory tone, effectively letting athletes briefly access more of their theoretical maximum force capacity.

**The stretch-shortening cycle (SSC)**: In movements involving an eccentric-concentric coupling (squats, jumps, throwing), the pre-stretch of the eccentric phase stores elastic energy in tendons and enhances neural activation via the stretch reflex, increasing total force output above what pure concentric activation could produce.`,
            keyPoints: [
              'Golgi tendon organs reflexively inhibit muscles at high tensions — training progressively raises this threshold.',
              'Improved reciprocal inhibition through training reduces antagonist co-contraction and increases net force.',
              'Arousal and psyching up can transiently increase maximum force by 5–12% via increased corticospinal drive.',
              'The stretch-shortening cycle enhances force through elastic energy storage and stretch reflex activation.',
            ],
            references: [
              {
                title: 'Training-Induced Adaptations in the Central Nervous System',
                authors: 'Aagaard P',
                journal: 'Journal of Sports Sciences',
                year: 2003,
                url: 'https://pubmed.ncbi.nlm.nih.gov/12703763/',
                type: 'journal',
              },
              {
                title: 'The Use of Instability to Train the Core Musculature',
                authors: 'Behm DG, Anderson KG',
                journal: 'Applied Physiology, Nutrition, and Metabolism',
                year: 2006,
                url: 'https://pubmed.ncbi.nlm.nih.gov/16847449/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'neural-adaptations-quiz',
          questions: [
            {
              id: 'na-q1',
              question: 'The Golgi tendon organ (GTO) contributes to muscle force limitation through:',
              type: 'multiple-choice',
              options: ['Activating additional motor units', 'Autogenic inhibition — reflexively reducing muscle activation at high tensions', 'Releasing calcium into the sarcoplasm', 'Stimulating satellite cell proliferation'],
              correctIndex: 1,
              explanation: 'The GTO detects high musculotendinous tension and triggers autogenic inhibition via Ib inhibitory interneurons, reflexively reducing agonist muscle activation. Training progressively raises the tension threshold required to trigger this protective inhibition.',
            },
            {
              id: 'na-q2',
              question: 'Rate of Force Development (RFD) is particularly important for sport performance because most athletic actions occur in under 300 milliseconds.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Most sport-specific actions — sprinting ground contacts, jumps, throws — occur in 50–250 ms. Since maximum force takes 300–500 ms to develop, how quickly force rises (RFD) is often more performance-limiting than maximum force capacity.',
            },
            {
              id: 'na-q3',
              question: 'The stretch-shortening cycle (SSC) enhances force output by:',
              type: 'multiple-choice',
              options: ['Purely chemical energy storage', 'Elastic energy storage in tendons/connective tissue plus enhanced neural activation', 'Increasing pennation angle', 'Recruiting only slow-twitch fibers'],
              correctIndex: 1,
              explanation: 'The SSC enhances force output through two mechanisms: (1) elastic energy stored in tendons and connective tissue during the eccentric phase is released in the concentric phase, and (2) the muscle spindle stretch reflex increases neural activation and motor unit recruitment.',
            },
          ],
        },
      },
    ],
  },

  // ── Technique (4) ──────────────────────────────────────────────────────────
  {
    id: 'squat-mastery',
    title: 'Squat Mastery',
    description: 'Bar path, depth, stance, and cuing for high-bar, low-bar, and front squat variations.',
    category: 'strength-training',
    difficulty: 'intermediate',
    estimatedMinutes: 50,
    relatedGoals: ['hypertrophy'],
    tags: ['squat', 'technique', 'form', 'depth'],
    coverEmoji: '🏋️',
    modules: [
      {
        id: 'squat-mechanics',
        title: 'Squat Mechanics',
        lessons: [
          {
            id: 'squat-setup-stance',
            title: 'Setup, Stance & Bar Position',
            estimatedMinutes: 5,
            content: `The squat is one of the most mechanically complex compound movements, and its execution is profoundly influenced by individual anatomy. Understanding the key setup variables allows you to optimize the squat for your specific structure.

**Bar position** fundamentally alters the squat's mechanics. A high-bar position (bar resting on the upper trapezius, just below C7) requires a more upright torso and places greater demand on the quadriceps. A low-bar position (bar resting on the posterior deltoids, approximately 3–4 cm below high-bar) shifts the center of mass rearward, requiring greater forward torso lean, which increases hip extensor (glute and hamstring) contribution. Low-bar typically allows greater loads for powerlifting-oriented athletes; high-bar is more natural for weightlifting and produces greater quad emphasis.

**Stance width and foot angle** are highly individual and determined primarily by hip anatomy — specifically the depth of the acetabulum and the angle of femoral neck anteversion. Experimenting within a range of hip-width to slightly wider than hip-width stance, with toes turned out 15–45 degrees, allows each individual to find the stance that produces the most upright torso and deepest comfortable depth for their anatomy.

**Bracing**: Effective bracing creates intra-abdominal pressure (IAP) that stabilizes the lumbar spine. The technique involves taking a deep breath into the belly (360-degree expansion), bracing the abdomen outward as if about to take a punch (Valsalva maneuver), and maintaining this brace throughout the set. Research confirms that IAP significantly reduces compressive and shear forces on lumbar vertebrae during loaded squats.

**Bar path**: Regardless of bar position or stance, the bar should travel in a straight vertical line over the mid-foot throughout the movement.`,
            keyPoints: [
              'High-bar squat promotes upright torso and quad emphasis; low-bar promotes forward lean and hip extensor loading.',
              'Stance width and foot angle are largely determined by individual hip anatomy — experimentation is necessary.',
              'IAP created by the Valsalva brace significantly reduces lumbar spine loading during the squat.',
              'The bar path should be vertical over the mid-foot throughout the entire movement.',
            ],
            references: [
              {
                title: 'Knee Biomechanics of the Dynamic Squat Exercise',
                authors: 'Escamilla RF',
                journal: 'Medicine & Science in Sports & Exercise',
                year: 2001,
                url: 'https://pubmed.ncbi.nlm.nih.gov/11740298/',
                type: 'journal',
              },
              {
                title: 'A Comparison of Muscular Activities in the Back Squat and Deadlift',
                authors: 'Wretenberg P, Feng Y, Arborelius UP',
                journal: 'Medicine & Science in Sports & Exercise',
                year: 1996,
                url: 'https://pubmed.ncbi.nlm.nih.gov/8776226/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'squat-depth-knees',
            title: 'Squat Depth & Knee Tracking',
            estimatedMinutes: 5,
            content: `Two of the most debated squat technique topics are depth requirements and knee behavior during the descent. Evidence-based analysis provides clarity on both.

**Squat depth and muscle activation**: Research by Hartmann et al. (2013) comparing partial, parallel, and deep squats found that deep squats (below parallel) produced significantly greater activation of the glutes and quadriceps. Full depth also increases the peak stretch under load — which, as discussed in hypertrophy science, is particularly potent for muscle growth. The concern that deep squats damage knees is not supported by evidence in healthy knees with good technique; in fact, properly executed deep squats may improve knee joint health through improved cartilage nutrition and collagen remodeling.

**Knee valgus (cave)**: Inward knee collapse during the squat is a common technical fault associated with weak hip abductors and external rotators, limited ankle dorsiflexion, and sometimes tibial torsion. It reduces mechanical efficiency and can increase patellofemoral stress. Correction cues include "knees out" or "screw your feet into the floor." Programming targeted hip abductor/external rotator accessory work (clamshells, band walks, hip thrusts) addresses the underlying weakness.

**The "knees over toes" myth**: The longstanding advice to never allow the knees to travel forward over the toes is not supported by research. While excessive forward knee travel does increase patellofemoral compression forces, restricting knee travel forward typically shifts shear forces to the hip and lower back. Lorenzetti et al. (2018) confirmed that some degree of forward knee travel (anatomically determined) is normal and not harmful in healthy individuals.`,
            keyPoints: [
              'Deep squats (below parallel) produce greater glute and quad activation than partial range squats.',
              'Properly executed deep squats do not damage healthy knees — evidence supports their safety and long-term joint health.',
              'Knee valgus is caused by weak hip abductors/external rotators and/or limited dorsiflexion.',
              "The 'knees never past toes' rule is a myth — moderate forward knee travel is anatomically normal and safe.",
            ],
            references: [
              {
                title: 'Is Deep Squat Performance Related to Muscular Strength, Flexibility, and Joint Kinematics?',
                authors: 'Hartmann H, Wirth K, Klusemann M',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2013,
                url: 'https://pubmed.ncbi.nlm.nih.gov/23821469/',
                type: 'journal',
              },
              {
                title: 'The Effect of Squatting Shoes on Pelvis and Knee Kinematics During the Back Squat',
                authors: 'Lorenzetti S, Ostermann M, Zeidler F, et al.',
                journal: 'BMC Sports Science, Medicine and Rehabilitation',
                year: 2018,
                url: 'https://pubmed.ncbi.nlm.nih.gov/29560256/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'squat-mechanics-quiz',
          questions: [
            {
              id: 'sm-q1',
              question: 'The bar path during a correctly executed squat should travel:',
              type: 'multiple-choice',
              options: ['Backward toward the heels', 'Slightly forward following torso angle', 'Vertically over the mid-foot', 'Forward toward the toes'],
              correctIndex: 2,
              explanation: 'Regardless of bar position (high-bar or low-bar) or stance, the bar should travel in a straight vertical line over the mid-foot throughout the squat. Any deviation from this path indicates a mechanical inefficiency.',
            },
            {
              id: 'sm-q2',
              question: 'A low-bar squat position allows for greater forward torso lean compared to a high-bar squat.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. The low-bar position moves the load rearward, requiring greater forward torso lean to maintain balance over the mid-foot. This shifts more work to the hip extensors (glutes and hamstrings) compared to the more upright high-bar position.',
            },
            {
              id: 'sm-q3',
              question: 'Knee valgus (cave) during the squat is most commonly associated with:',
              type: 'multiple-choice',
              options: ['Excessive quad strength', 'Weak hip abductors and external rotators', 'Insufficient dorsiflexion only', 'Too wide a stance'],
              correctIndex: 1,
              explanation: 'Knee valgus is primarily caused by weakness in the hip abductors and external rotators (gluteus medius, piriformis, deep hip external rotators), which fail to keep the femur properly externally rotated and abducted during the squat.',
            },
          ],
        },
      },
      {
        id: 'squat-errors-variations',
        title: 'Common Errors & Variations',
        lessons: [
          {
            id: 'squat-errors',
            title: 'Diagnosing & Correcting Common Errors',
            estimatedMinutes: 5,
            content: `Understanding why squat errors occur — not just that they occur — is the key to efficient correction. Most squat faults trace back to a small number of mobility limitations, strength deficits, or cueing issues.

**Butt wink (posterior pelvic tilt at depth)**: At the bottom of the squat, many lifters exhibit lumbar flexion — the pelvis tucks under and the lower back rounds. This is caused by (1) limited hip flexion range of motion (hip socket anatomy), (2) insufficient hamstring length, or (3) excessive squat depth beyond the individual's anatomical limit. Solutions include adjusting stance width (wider often allows deeper depth with less wink due to hip anatomy), reducing depth to just below parallel where neutral spine is maintained, and improving hip mobility through targeted soft tissue work and dynamic warm-up drills.

**Excessive forward lean**: A torso that falls too far forward (beyond what the chosen bar position requires) typically indicates quad weakness or ankle dorsiflexion restriction. If ankles are limited, the heels rise or the knees cannot travel forward sufficiently, forcing the torso to compensate. Elevating the heels (squat shoes or plates) is an immediate technical fix; ankle mobility work addresses the root cause.

**Rising onto toes**: Indicates ankle dorsiflexion restriction. The same interventions as excessive lean apply.

**Asymmetry (one side lower, one hip shifting)**: Often indicates a hip mobility asymmetry or a leg length difference. Filming from the back and front simultaneously helps diagnose. Unilateral accessory work (Bulgarian split squats, single-leg RDLs) addresses asymmetric strength deficits.`,
            keyPoints: [
              'Butt wink is caused by hip anatomy limitations or excessive depth — adjust stance or depth before mobility work.',
              'Excessive forward lean typically indicates quad weakness or ankle dorsiflexion restriction.',
              'Elevating heels compensates for ankle restriction; ankle mobility work addresses the cause.',
              'Squat asymmetry often reflects hip mobility differences — film from front and back to diagnose.',
            ],
            references: [
              {
                title: 'Knee Biomechanics of the Dynamic Squat Exercise',
                authors: 'Escamilla RF',
                journal: 'Medicine & Science in Sports & Exercise',
                year: 2001,
                url: 'https://pubmed.ncbi.nlm.nih.gov/11740298/',
                type: 'journal',
              },
              {
                title: 'Biomechanical Implications of Skeletal Muscle Hypertrophy and Atrophy',
                authors: 'Myer GD, Kushner AM, Brent JL, et al.',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2014,
                url: 'https://pubmed.ncbi.nlm.nih.gov/24427280/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'squat-variations',
            title: 'Squat Variations & Their Applications',
            estimatedMinutes: 5,
            content: `Each squat variation has distinct mechanical properties that make it appropriate for different training goals, populations, and situations.

**Front squat**: The barbell is held in the front rack position (crossed arms or clean grip), which places the load anteriorly and requires a significantly more upright torso than any back squat variation. This dramatically increases quadriceps demand while reducing the load on the lower back. Front squats are excellent for athletic development, Olympic weightlifting, and lifters who struggle with the mobility demands of a low-bar back squat. The limiting factor is often front rack mobility rather than leg strength.

**Goblet squat**: Holding a dumbbell or kettlebell at the chest counterbalances the lifter forward and naturally cues the upright torso position. It is the most beginner-friendly squat variation for teaching the foundational pattern, making it ideal for introducing new lifters to squat mechanics before loading with a barbell.

**Pause squat**: A brief 2–3 second pause at the bottom eliminates the stretch-shortening cycle contribution, forcing the lifter to rely on pure concentric strength from the most mechanically disadvantaged position. Excellent for building bottom-end strength, identifying weaknesses, and reinforcing depth.

**Box squat**: Sitting back onto a box at or slightly below parallel emphasizes the hip hinge component and posterior chain (glutes/hamstrings) more than a standard squat. Useful for powerlifters seeking to reinforce hip-dominant squatting patterns.

**Bulgarian split squat (BSS)**: An unilateral variation with the rear foot elevated that provides substantial individual limb loading, significant hip flexor stretch in the rear leg, and core stability demand. It produces high quad and glute activation per leg and is a valuable supplement to bilateral squatting.`,
            keyPoints: [
              'Front squats require maximum thoracic extension and produce the greatest quadriceps emphasis of barbell squat variations.',
              'Goblet squats are the most beginner-friendly squat variation for learning proper mechanics.',
              'Pause squats eliminate SSC contribution, building bottom-end concentric strength.',
              'Bulgarian split squats provide high unilateral loading and are valuable for addressing strength asymmetries.',
            ],
            references: [
              {
                title: 'A Biomechanical Comparison of Back and Front Squats in Healthy Trained Individuals',
                authors: 'Gullett JC, Tillman MD, Gutierrez GM, Chow JW',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2009,
                url: 'https://pubmed.ncbi.nlm.nih.gov/19098942/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'squat-errors-quiz',
          questions: [
            {
              id: 'se-q1',
              question: 'Butt wink (posterior pelvic tilt at the bottom of a squat) is primarily caused by:',
              type: 'multiple-choice',
              options: ['Excessive load on the bar', 'Limited hip flexion mobility or hamstring flexibility', 'Poor ankle strength', 'Wide grip on the bar'],
              correctIndex: 1,
              explanation: 'Butt wink occurs when the lumbar spine flexes at the bottom of the squat. It is primarily caused by limited hip flexion ROM (hip socket anatomy) or insufficient hamstring flexibility, preventing a neutral pelvis at deep squat depth.',
            },
            {
              id: 'se-q2',
              question: 'The front squat produces greater quadriceps activation and requires a more upright torso compared to the back squat.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: "True. The front rack bar position places the load anteriorly, requiring a near-vertical torso to maintain balance. This shifts the moment arm significantly toward the knee extensors, making the front squat the most quad-dominant barbell squat variation.",
            },
            {
              id: 'se-q3',
              question: 'Which squat variation is generally considered most beginner-friendly for teaching squat mechanics?',
              type: 'multiple-choice',
              options: ['Olympic high-bar back squat', 'Low-bar powerlifting squat', 'Goblet squat', 'Pause squat with heavy load'],
              correctIndex: 2,
              explanation: 'The goblet squat, with a dumbbell or kettlebell held at the chest, naturally counterbalances the lifter forward and promotes an upright torso. It is the most accessible and self-correcting squat variation for teaching foundational mechanics to beginners.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'deadlift-mastery',
    title: 'Deadlift Mastery',
    description: 'Conventional, sumo, and Romanian deadlift technique, setup, and bracing cues.',
    category: 'strength-training',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    relatedGoals: ['hypertrophy'],
    tags: ['deadlift', 'hinge', 'technique', 'bracing'],
    coverEmoji: '🏗️',
    modules: [
      {
        id: 'conventional-deadlift',
        title: 'Conventional Deadlift',
        lessons: [
          {
            id: 'deadlift-setup',
            title: 'Conventional Deadlift Setup',
            estimatedMinutes: 5,
            content: `The deadlift is one of the most mechanically demanding and rewarding exercises in strength training — a true full-body lift that challenges every major posterior chain muscle alongside the legs, core, and grip. Setup is the foundation of a safe and efficient pull.

**Bar position over mid-foot**: Stand with feet hip-width apart, toes slightly out. Look down — the bar should be approximately 1 inch (2–3 cm) from your shins, positioned over the mid-foot (not over the toes, not against the shins). This is the gravitational sweet spot: the most mechanically efficient bar path is a vertical line, and that vertical line runs through the mid-foot. Moving the bar forward forces a compensatory body adjustment that inefficiently lengthens the moment arm.

**Hip hinge to the bar**: With the bar over the mid-foot, hinge at the hips to reach down — not squat down — to grip the bar. The distinction matters: you are setting up for a hip hinge movement, not a squat. When you grip the bar without moving it, your shins should be nearly vertical and the bar should now be touching or nearly touching your shins.

**Lat engagement**: Before initiating the pull, engage the lats by attempting to "put your shoulder blades in your back pockets" or "protect your armpits." This lat activation pulls the bar close to the body, preventing it from swinging forward during the pull (a major mechanical inefficiency and injury risk), and creates thoracic rigidity that supports the braced spine.

**Neutral spine and bracing**: The back must be braced in a neutral (not rounded, not hyperextended) position. Take a big breath, brace 360 degrees, and maintain this throughout.`,
            keyPoints: [
              'Bar should be positioned over the mid-foot (~1 inch from shins) before setting up.',
              'Hip hinge to grip the bar — not a squat — keeping shins nearly vertical.',
              'Lat engagement ("protect your armpits") keeps the bar path vertical and tight to the body.',
              'Neutral spine with full brace throughout — neither rounded nor hyperextended.',
            ],
            references: [
              {
                title: 'Biomechanical Analysis of the Deadlift during the 1999 Special Olympics World Games',
                authors: 'Escamilla RF, Francisco AC, Kayes AV, et al.',
                journal: 'Medicine & Science in Sports & Exercise',
                year: 2002,
                url: 'https://pubmed.ncbi.nlm.nih.gov/11932579/',
                type: 'journal',
              },
              {
                title: 'Lumbar Spine Loads during Rehabilitation Exercises',
                authors: 'McGill SM',
                journal: 'Spine',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/12151841/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'deadlift-pull-lockout',
            title: 'The Pull, Hinge & Lockout',
            estimatedMinutes: 5,
            content: `Once the setup is established, initiating and completing the deadlift requires understanding the movement pattern and common errors that derail the pull.

**Leg drive vs "pulling" with the back**: The deadlift initiation should feel like pushing the floor away with your legs (leg press against the floor), not pulling with the back as a primary mover. While the spinal erectors work isometrically to maintain position, the primary force generators are the hip extensors (glutes) and knee extensors (quads) in the initial phase of the pull. Thinking of it as "leg drive" keeps the hips down initially and prevents a premature hip rise that would turn the movement into a stiff-leg deadlift.

**Hip hinge pattern**: As the bar passes the knees, the movement transitions into the primary hip extension phase — the hips drive forward toward the bar as the glutes and hamstrings fire to bring the torso upright. This hip hinge is the defining movement of the conventional deadlift.

**Bar-body contact**: The bar should maintain contact (or near-contact) with the legs throughout the pull. "Dragging" the bar up the shins and thighs slightly is normal and correct. Allowing the bar to swing forward lengthens the moment arm dramatically and increases lumbar stress.

**Lockout**: At the top, stand tall with hips fully extended, knees locked, and shoulders pulled back. Avoid hyperextending the lower back, leaning back excessively, or squeezing glutes so aggressively that the pelvis rotates anteriorly — all of which place unnecessary stress on the lumbar spine at the top.`,
            keyPoints: [
              'Initiate with leg drive (push the floor away) rather than pulling with the back as the primary movement.',
              'The hip hinge drives the torso upright as the bar passes the knees — glutes and hamstrings primary.',
              'Bar stays in contact with the legs throughout the pull to minimize the hip moment arm.',
              'Lockout: full hip extension, neutral spine — avoid lumbar hyperextension at the top.',
            ],
            references: [
              {
                title: 'Spine Loading during Various Lifting Speeds',
                authors: 'Cholewicki J, McGill SM, Norman RW',
                journal: 'Medicine & Science in Sports & Exercise',
                year: 1991,
                url: 'https://pubmed.ncbi.nlm.nih.gov/1909897/',
                type: 'journal',
              },
              {
                title: 'Evaluating the Accuracy of Using Predicted Hip Locations to Estimate Hip Joint Forces',
                authors: 'Vigotsky AD, Harper EN, Ryan DR, Contreras B',
                journal: 'PeerJ',
                year: 2015,
                url: 'https://pubmed.ncbi.nlm.nih.gov/26020001/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'conventional-deadlift-quiz',
          questions: [
            {
              id: 'cdl-q1',
              question: 'At the start of a conventional deadlift, where should the bar be positioned relative to the foot?',
              type: 'multiple-choice',
              options: ['Over the toes', 'Over the mid-foot (about 1 inch from shin)', 'At the heel', 'As far forward as comfortable'],
              correctIndex: 1,
              explanation: 'The bar should be positioned approximately 1 inch (2–3 cm) from the shins, over the mid-foot. This is the gravitational sweet spot that allows a perfectly vertical bar path — the most mechanically efficient path — throughout the pull.',
            },
            {
              id: 'cdl-q2',
              question: "Engaging the lats by 'protecting your armpits' helps prevent the bar from swinging away from the body during the pull.",
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Lat activation creates rigidity in the shoulder girdle and pulls the bar into the body, preventing the bar from drifting forward during the pull. A forward bar swing dramatically increases the moment arm and spinal loading.',
            },
            {
              id: 'cdl-q3',
              question: 'The deadlift is best described mechanically as a:',
              type: 'multiple-choice',
              options: ['Knee-dominant squat pattern', 'Horizontal push pattern', 'Hip-hinge movement', 'Vertical push pattern'],
              correctIndex: 2,
              explanation: 'The deadlift is primarily a hip-hinge movement — the defining action is hip extension driving the torso from forward lean to upright. While the legs contribute in the initial pull, the movement pattern is fundamentally hip-dominant rather than knee-dominant.',
            },
          ],
        },
      },
      {
        id: 'sumo-rdl-variations',
        title: 'Sumo & RDL Variations',
        lessons: [
          {
            id: 'sumo-deadlift',
            title: 'The Sumo Deadlift',
            estimatedMinutes: 5,
            content: `The sumo deadlift is a wide-stance variation where the feet are placed significantly wider than hip width, often close to the collars, with toes pointed out at approximately 45–60 degrees. The hands grip the bar inside (or just inside) the legs, allowing for a narrower grip position.

**Mechanical differences from conventional**: The wider stance and more vertical torso in the sumo deadlift produce a shorter range of motion (approximately 25–35% shorter bar path for most individuals, depending on body proportions). The more vertical torso reduces the moment arm at the hip and places less demand on the spinal erectors, but significantly increases the demand on the hip abductors (gluteus medius, tensor fascia latae) and adductors, which must resist the wide stance throughout the pull. The quads also play a larger role in sumo due to the more vertical shin angle.

**Hip anatomy suitability**: The sumo stance is better suited for individuals with deeper acetabular sockets (which naturally accommodate wider stance without hip impingement) and externally rotated femoral necks. Forcing a sumo stance on anatomy that is not built for it produces internal impingement of the hip and poor technique. The choice of conventional vs sumo should ultimately be anatomy-driven, not preference-driven.

**Technique cues**: "Spread the floor" (external rotation force on feet against the ground) drives the knees outward and activates hip abductors. "Chest up" maintains torso upright. "Sit into the hips" during setup achieves the low hip start position needed for sumo efficiency.`,
            keyPoints: [
              'Sumo deadlift has a shorter range of motion and less spinal erector demand than conventional.',
              'Sumo requires significantly greater hip abductor, adductor, and quad activation.',
              'Hip anatomy (socket depth, femoral version) largely determines whether sumo or conventional is optimal.',
              '"Spread the floor" cue activates hip abductors and keeps knees tracking over toes in sumo.',
            ],
            references: [
              {
                title: 'A Comparative Electromyographical Analysis of the Muscle Activity during Sumo and Conventional Style Deadlifts',
                authors: 'Escamilla RF, Francisco AC, Fleisig GS, et al.',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2000,
                url: 'https://pubmed.ncbi.nlm.nih.gov/11049019/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'rdl-hinge-pattern',
            title: 'Romanian Deadlift & Hip Hinge Mastery',
            estimatedMinutes: 5,
            content: `The Romanian Deadlift (RDL) is a hip hinge exercise that provides a powerful hamstring training stimulus and serves as an excellent foundational drill for teaching the hip hinge pattern — the core movement of both conventional and sumo deadlifts.

**Mechanics**: Unlike the conventional deadlift, the RDL starts from a standing position with the bar held in front of the thighs. The movement involves hinging at the hips — pushing the hips rearward while maintaining a neutral spine — and lowering the bar along the front of the legs toward the floor. The key distinction is that the bar does not touch the floor in an RDL; depth is controlled entirely by hamstring flexibility and the ability to maintain a neutral lumbar spine.

**Hamstring loading**: The RDL is primarily an eccentric-dominant hamstring exercise. As the torso lowers, the hamstrings lengthen under load, which places significant mechanical tension in their stretched position — particularly valuable given the emerging evidence that eccentric and stretched-position loading is especially potent for hypertrophy. McAllister et al. (2014) confirmed that the RDL produced significantly greater hamstring EMG activation than the leg curl due to this combination of hip extension moment and knee flexion position.

**Teaching the hinge**: Beginners often struggle to dissociate hip hinging from squatting. A useful drill is the wall hip hinge: stand 15 cm from a wall and push the hips backward until they touch, keeping the knees slightly bent and back flat. This teaches the hinge pattern without loading.

**Depth guidelines**: Lower to the point where the back begins to round or the pelvis tilts posteriorly — this is your end range. For many people this is around shin level; with good hamstring flexibility, the bar may approach the floor.`,
            keyPoints: [
              'RDL is a hip hinge exercise emphasizing eccentric hamstring loading through the stretched position.',
              'Bar does not touch the floor — depth is controlled by hamstring flexibility and neutral spine maintenance.',
              'Provides substantially greater hamstring activation than leg curls due to combined hip and knee loading.',
              'Wall hip hinge drill teaches the hinge pattern to beginners before loading.',
            ],
            references: [
              {
                title: 'Muscle Activation during Various Hamstring Exercises',
                authors: 'McAllister MJ, Hammond KG, Schilling BK, et al.',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2014,
                url: 'https://pubmed.ncbi.nlm.nih.gov/24736773/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'deadlift-variations-quiz',
          questions: [
            {
              id: 'dv-q1',
              question: 'Compared to the conventional deadlift, the sumo deadlift typically involves:',
              type: 'multiple-choice',
              options: ['Longer range of motion and less hip abductor involvement', 'Shorter range of motion and greater hip abductor and adductor engagement', 'More forward torso lean', 'Less quad activation'],
              correctIndex: 1,
              explanation: "The sumo deadlift's wider stance produces a shorter bar path (shorter ROM) and a more vertical torso. It demands significantly greater hip abductor and adductor activation to maintain the wide stance, and places more quad demand than conventional.",
            },
            {
              id: 'dv-q2',
              question: 'The Romanian Deadlift (RDL) primarily targets the hamstrings through an eccentric-dominant loading pattern.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. The RDL emphasizes the hamstrings in their lengthened, stretched position during the eccentric (lowering) phase. This eccentric-dominant loading in the stretched position provides a potent stimulus for hamstring hypertrophy and strength.',
            },
            {
              id: 'dv-q3',
              question: 'In the RDL, how far should the bar travel down?',
              type: 'multiple-choice',
              options: ['Until it touches the floor like a conventional deadlift', 'As far as your hamstring flexibility allows while maintaining a neutral spine', 'Always stopping at knee height', 'Only to hip height'],
              correctIndex: 1,
              explanation: 'The RDL bar should descend as far as hamstring flexibility allows while maintaining a neutral lumbar spine. The onset of posterior pelvic tilt or lumbar rounding marks the end range. This varies widely between individuals.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'bench-press-mastery',
    title: 'Bench Press Mastery',
    description: 'Grip width, arch, leg drive, and scapular retraction for a safe and strong bench press.',
    category: 'strength-training',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    relatedGoals: ['hypertrophy'],
    tags: ['bench press', 'chest', 'technique', 'shoulder safety'],
    coverEmoji: '🛋️',
    modules: [
      {
        id: 'bench-press-setup',
        title: 'Bench Press Setup',
        lessons: [
          {
            id: 'bench-setup-grip',
            title: 'Setup, Grip Width & Arch',
            estimatedMinutes: 5,
            content: `A technically sound bench press setup creates a stable platform for force production and is critical for both performance and shoulder health. Small changes in setup can meaningfully alter muscle activation, range of motion, and joint stress.

**Grip width** determines which muscles are most heavily loaded. A wider grip (index finger near the ring marks on most barbells) shortens the range of motion and increases pectoral activation — the moment arm at the shoulder is longer, making the pecs work harder. A narrower grip (hands shoulder-width apart) increases the range of motion and shifts more work to the triceps. Most people train with a grip width approximately 1.5× shoulder width as a primary pressing position, with variations used for targeted emphasis.

**Arch**: A moderate arch — achieved by retracting and depressing the scapulae and creating thoracic extension — is beneficial and is not the extreme arch seen in powerlifting competition. Scapular retraction pulls the glenohumeral joint into a more stable, posteriorly positioned state that reduces anterior capsule stress and the risk of shoulder impingement. Depressing the scapulae prevents them from winging during the press. The resulting arch is a byproduct of proper scapular positioning, not a goal in itself.

**Wrist position**: Wrists should be as straight as possible — not "cocked back" — with the bar resting directly over the forearm bones. A bent wrist at heavy loads can cause wrist pain and reduces force transfer efficiency. Use a closed grip (thumb wrapped around) for safety.`,
            keyPoints: [
              'Wider grip increases pectoral activation and shortens ROM; narrower grip increases tricep demand.',
              'Scapular retraction and depression creates a stable pressing platform and protects the shoulder joint.',
              'A moderate arch is a byproduct of proper scapular positioning — not an extreme maneuver.',
              'Keep wrists as straight as possible with bar over the forearm bones; use a closed (thumbs wrapped) grip.',
            ],
            references: [
              {
                title: 'Influence of Grip Width and Forearm Pronation/Supination on Upper-Body Myoelectric Activity during the Flat Bench Press',
                authors: 'Lehman GJ',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2005,
                url: 'https://pubmed.ncbi.nlm.nih.gov/16195034/',
                type: 'journal',
              },
              {
                title: 'A Comparison of Exercises for Chest/Shoulder Injury Risk in Resistance Training',
                authors: 'Barnett C, Kippers V, Turner P',
                journal: 'Journal of Strength and Conditioning Research',
                year: 1995,
                url: 'https://pubmed.ncbi.nlm.nih.gov/7874050/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'bench-leg-drive-touch',
            title: 'Leg Drive, Bar Path & Touch Point',
            estimatedMinutes: 5,
            content: `The bench press is a full-body exercise when performed correctly — not simply an upper body push. Three additional technique elements complete the picture: leg drive, bar path, and touch point.

**Leg drive**: Pressing the feet into the floor activates the lower body musculature and creates a rigid, stable base through the entire kinetic chain. Importantly, leg drive does not mean lifting the hips off the bench — the hips must maintain contact. Rather, the legs create isometric force into the floor that transmits through the body into the bench, stiffening the entire system and allowing the upper body to express maximum force without energy leaking through a wobbly torso.

**Bar path**: The barbell does not travel in a perfectly straight vertical path during the bench press — it follows a slight arc. The bar should touch lower on the chest (described below) and finish above the upper chest/shoulder line at lockout. This arc follows the natural movement of the shoulder joint and is more mechanically efficient than forcing a completely vertical path.

**Touch point**: The bar should touch the lower sternum / lower pectoral region, not the clavicle or upper chest. A touch point too high internally rotates the shoulders and increases anterior capsule stress. The exact touch point varies with individual anatomy and grip width — generally, the forearms should be perpendicular (or close to it) to the floor when the bar touches.

**Elbow angle**: The elbows should form approximately a 45–75 degree angle with the torso, not fully flared (90 degrees, which maximizes anterior shoulder stress) nor fully tucked (0 degrees, which reduces pectoral activation).`,
            keyPoints: [
              'Leg drive creates full-body rigidity — press feet into floor isometrically without lifting the hips.',
              'The bar follows a slight arc during the bench press, not a purely vertical path.',
              'Touch the lower sternum/lower pec region — too high increases shoulder impingement risk.',
              'Elbow angle of ~45–75 degrees from torso balances pectoral activation and shoulder joint safety.',
            ],
            references: [
              {
                title: 'The Influence of Grip Width and Forearm Supination on Upper Body Muscle Activation during the Flat Bench Press',
                authors: 'Clemons JM, Aaron C',
                journal: 'Journal of Strength and Conditioning Research',
                year: 1997,
                url: 'https://pubmed.ncbi.nlm.nih.gov/9232565/',
                type: 'journal',
              },
              {
                title: 'Effects of Grip Width on Muscle Strength and Activation in the Bench Press',
                authors: 'Gomo O, Van den Tillaar R',
                journal: 'International Journal of Sports Physiology and Performance',
                year: 2016,
                url: 'https://pubmed.ncbi.nlm.nih.gov/25892654/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'bench-setup-quiz',
          questions: [
            {
              id: 'bs-q1',
              question: 'Scapular retraction and depression during the bench press primarily serves to:',
              type: 'multiple-choice',
              options: ['Increase the range of motion', 'Create a stable platform and protect the shoulder joint', 'Maximize pectoralis stretch', 'Allow a wider grip'],
              correctIndex: 1,
              explanation: 'Scapular retraction and depression positions the glenohumeral joint in a posteriorly stable position, reducing anterior capsule stress and the risk of shoulder impingement during the press. It also creates a rigid pressing platform.',
            },
            {
              id: 'bs-q2',
              question: 'A wider grip on the bench press increases pectoralis major activation compared to a narrow grip.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. A wider grip positions the hands further from the shoulder, creating a longer moment arm at the shoulder joint and placing greater demand on the pectoralis major. Narrow grips shift more work to the triceps.',
            },
            {
              id: 'bs-q3',
              question: 'The ideal elbow angle relative to the torso during the bench press is approximately:',
              type: 'multiple-choice',
              options: ['0–15 degrees (elbows tucked fully)', '45–75 degrees', '90 degrees (elbows fully flared)', '30 degrees only'],
              correctIndex: 1,
              explanation: 'An elbow angle of approximately 45–75 degrees from the torso balances pectoral activation with shoulder joint health. Fully flared elbows (90 degrees) maximize anterior shoulder stress; fully tucked elbows minimize pectoral contribution.',
            },
          ],
        },
      },
      {
        id: 'bench-errors-variations',
        title: 'Errors & Variations',
        lessons: [
          {
            id: 'bench-errors',
            title: 'Common Bench Press Errors',
            estimatedMinutes: 5,
            content: `Bench press technical errors are among the most common causes of training-related shoulder and wrist injuries. Understanding the mechanism behind each error enables more effective correction.

**Elbow flare (>90 degrees from torso)**: Fully flaring the elbows horizontally creates a 90-degree abduction of the shoulder, which is the joint position most associated with anterior shoulder impingement and pectoralis major tendon stress. Many lifters flare their elbows in an attempt to feel more chest activation, but this is unnecessary if grip width and touch point are properly set. The correction is to think "elbows at 45–75 degrees" and ensure the bar touches low on the chest.

**Bouncing the bar off the chest**: This uses the sternum as a spring, reducing pectoral recruitment in the bottom-range stretch and creating rib cage bruising risk. More importantly, it bypasses the most mechanically disadvantaged position — exactly where strength gains are most valuable. A controlled touch (1-second pause) eliminates bouncing.

**Wrist pain from bent wrists**: The bar should rest in the palm over the forearm bones, not in the fingers with wrists cocked back. Bent wrists at load create significant wrist extensor stress. Film from the side and use wrist wraps as a temporary solution while correcting the position.

**Butt coming off the bench**: Often a symptom of using too much weight or trying to force a range of motion that the shoulder does not have. Reduces the range of motion and shifts load to the lower back. Reduce load and address shoulder mobility before reloading.`,
            keyPoints: [
              'Elbow flare > 90 degrees is the primary cause of bench press shoulder injuries — keep elbows 45–75 degrees.',
              'Controlled bar touch eliminates bouncing, which bypasses the most valuable portion of the range of motion.',
              'Bent wrists at load cause pain — bar should rest over the forearm bones in the palm.',
              'Butt lifting off the bench compromises ROM and shifts stress to the lower back — reduce load first.',
            ],
            references: [
              {
                title: 'Influence of Grip Width and Forearm Pronation/Supination on Upper-Body Myoelectric Activity during the Flat Bench Press',
                authors: 'Lehman GJ',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2005,
                url: 'https://pubmed.ncbi.nlm.nih.gov/16195034/',
                type: 'journal',
              },
              {
                title: 'A Comparison of Grip Width on Muscle Activity and Performance in the Bench Press',
                authors: 'Green CM, Comfort P',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2007,
                url: 'https://pubmed.ncbi.nlm.nih.gov/17991683/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'bench-variations',
            title: 'Bench Variations for Development',
            estimatedMinutes: 5,
            content: `Each bench press variation provides a distinct training stimulus that can be used to address weak points, emphasize specific muscles, or manage shoulder health.

**Incline bench press (30–45 degrees)**: Shifting the angle of the bench upward moves the loading emphasis toward the clavicular head of the pectoralis major (upper chest) and anterior deltoid. Lauver et al. (2016) demonstrated that incline angles of 30–45 degrees produced greater upper pec activation than flat pressing. The incline position also reduces the anterior capsule stress that flat pressing at wide grips can create in susceptible shoulders.

**Dumbbell bench press**: Using dumbbells allows greater range of motion in both the eccentric (bottom) and concentric (top) phases compared to a barbell. The independent nature of dumbbells also allows each arm to find its natural movement pattern, which is often more shoulder-friendly than the fixed barbell path. Dumbbell pressing is particularly useful for higher-rep hypertrophy work and for lifters with asymmetrical strength or mobility restrictions.

**Close-grip bench press (hands ~shoulder width)**: Shifting the grip inward transfers more work to the triceps while maintaining significant pectoral involvement. An excellent supplemental press for building tricep mass and lockout strength, which is often a limiting factor in the conventional bench press.

**Pause bench press**: A 1–3 second pause at the chest eliminates the stretch-shortening cycle contribution, builds bottom-end concentric strength (often the sticking point), and reinforces proper touch-point mechanics. The pause also teaches patience under the bar — a key mental skill for heavy pressing.

**Floor press**: Lying on the floor limits the range of motion and eliminates the eccentric bottom position entirely, focusing on the mid and upper range of the press. Useful when shoulder pain restricts full ROM pressing.`,
            keyPoints: [
              'Incline bench (30–45 degrees) increases upper pectoralis and anterior deltoid activation.',
              'Dumbbell bench allows greater ROM and is more shoulder-friendly due to independent arm movement.',
              'Close-grip bench emphasizes triceps and builds lockout strength that transfers to the conventional bench press.',
              'Pause bench eliminates SSC, builds bottom-end strength, and enforces proper touch-point discipline.',
            ],
            references: [
              {
                title: 'Influence of Body Position on Muscle Recruitment during the Bench Press Exercise',
                authors: 'Lauver JD, Cayot TE, Scheuermann BW',
                journal: 'European Journal of Sport Science',
                year: 2016,
                url: 'https://pubmed.ncbi.nlm.nih.gov/25655106/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'bench-errors-quiz',
          questions: [
            {
              id: 'be-q1',
              question: 'Excessive elbow flare (>90 degrees from torso) during the bench press increases the risk of:',
              type: 'multiple-choice',
              options: ['Tricep strain', 'Wrist fracture', 'Anterior shoulder impingement and pectoral tear', 'Lower back injury'],
              correctIndex: 2,
              explanation: 'Fully flaring the elbows to 90 degrees from the torso places the shoulder in maximum abduction — the position most associated with anterior shoulder impingement, supraspinatus tendinopathy, and pectoralis major tendon injury.',
            },
            {
              id: 'be-q2',
              question: 'The incline bench press places greater emphasis on the upper pectoralis major and anterior deltoid compared to the flat bench press.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Lauver et al. (2016) and other research confirm that incline bench press angles of 30–45 degrees significantly increase activation of the clavicular (upper) pectoralis major head and anterior deltoid compared to flat pressing.',
            },
            {
              id: 'be-q3',
              question: 'The pause bench press is beneficial for strength development because it:',
              type: 'multiple-choice',
              options: ['Reduces the range of motion', 'Eliminates the stretch-shortening cycle contribution and builds true bottom-end strength', 'Allows heavier loads to be used', 'Reduces shoulder joint stress'],
              correctIndex: 1,
              explanation: 'The pause bench eliminates the elastic energy contribution of the SSC (the "bounce" from the chest), forcing the lifter to generate concentric force from a dead stop at the bottom. This targets the sticking point and builds genuine bottom-end strength.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'overhead-press-mastery',
    title: 'Overhead Press Mastery',
    description: 'Strict press and push press technique — shoulder health, wrist position, and core bracing.',
    category: 'strength-training',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    relatedGoals: ['hypertrophy'],
    tags: ['overhead press', 'shoulders', 'technique', 'push'],
    coverEmoji: '🙌',
    modules: [
      {
        id: 'strict-press-technique',
        title: 'Strict Press Technique',
        lessons: [
          {
            id: 'ohp-setup-path',
            title: 'Bar Path, Grip & Core Bracing',
            estimatedMinutes: 5,
            content: `The overhead press is one of the most mechanically demanding compound movements due to the requirement for simultaneous shoulder mobility, core stability, and full-body tension. Technical precision is especially important for long-term shoulder health.

**Grip width** for the barbell overhead press should be just outside shoulder width — typically with the index finger just outside the shoulder or with elbows directly below the bar in the starting position. This allows the forearms to be near vertical in the front rack/starting position, which is the most mechanically efficient pressing angle.

**Bar position at setup**: The bar should rest in the palm close to the base of the fingers (not the crease), and the wrists should be as straight as tolerable. The bar rests on the anterior deltoids with elbows slightly in front of the bar, not directly below or behind it. This slight forward elbow position creates the optimal pressing line.

**Bar path**: The most important feature of an efficient overhead press bar path is that the bar travels around the face, not straight up. From the starting position, the bar moves slightly backward as it ascends past the face, then travels vertically overhead. At lockout, the bar should be directly overhead — over the ears and mid-scapula when viewed from the side. This requires the head and upper torso to move through the "window" created between the arms as the bar passes the face.

**Core and glute bracing**: Maximum IAP (360-degree brace) and glute engagement are essential to prevent the lumbar spine from hyperextending under the load — a common compensation when the bar is pressed forward of the ideal overhead position. A slight posterior pelvic tilt (tucked glutes) helps prevent excessive lumbar extension.`,
            keyPoints: [
              'Grip just outside shoulder width with near-vertical forearms in the starting position.',
              'Bar path goes around the face (backward then vertical), not straight up — ending over ears at lockout.',
              'The head and upper torso must "move through the window" between the arms as the bar passes the face.',
              'Full IAP brace and glute engagement prevents lumbar hyperextension under the overhead load.',
            ],
            references: [
              {
                title: 'Muscle Activity and 1RM Strength of the Bench Press Exercise with Different Stability Conditions',
                authors: 'Saeterbakken AH, Fimland MS',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2013,
                url: 'https://pubmed.ncbi.nlm.nih.gov/23302764/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'ohp-shoulder-health',
            title: 'Shoulder Health & Common Restrictions',
            estimatedMinutes: 5,
            content: `The overhead press requires a combination of shoulder mobility, thoracic extension, and lat flexibility that many lifters lack, particularly those who sit at desks or train with heavy chest pressing volume without adequate mobility work.

**Thoracic extension**: The ability to extend the thoracic spine is critical for achieving a vertical bar position overhead without compensatory lumbar hyperextension. Restricted thoracic mobility forces the lower back to hyperextend to achieve the overhead position — the source of the characteristic "rib flare" and lower back pain seen with overhead pressing in hypomobile individuals. Thoracic extension exercises (foam roller extensions, cat-cow, quadruped thoracic rotation) form an important warm-up component.

**Lat tightness**: The lats internally rotate and extend the shoulder — which means tight lats directly limit shoulder flexion overhead. This is the most common cause of excessive lumbar arch during the overhead press. A tight lat prevents the shoulder from achieving full flexion, and the lower back compensates by extending instead. Lat stretching (overhead band stretch, doorway lat stretch) should be a pre-pressing priority for those with this restriction.

**Rotator cuff as stabilizer**: The rotator cuff (supraspinatus, infraspinatus, teres minor, subscapularis) functions primarily as a dynamic shoulder stabilizer during the overhead press, centering the humeral head in the glenoid throughout the movement. Adequate rotator cuff strength and endurance is essential for safe heavy pressing. Shoulder impingement symptoms during pressing often reflect rotator cuff fatigue or weakness rather than anatomical impingement, and may respond to targeted external rotation and scaption exercises.`,
            keyPoints: [
              'Restricted thoracic extension forces compensatory lumbar hyperextension during overhead pressing.',
              'Lat tightness limits shoulder flexion overhead — the most common cause of excessive lower back arch during OHP.',
              'The rotator cuff stabilizes the humeral head — adequate strength prevents impingement symptoms during pressing.',
              'Thoracic extension drills and lat stretching should be standard overhead pressing warm-up components.',
            ],
            references: [
              {
                title: 'Shoulder Injuries in the Overhead Athlete',
                authors: 'Kolber MJ, Hanney WJ',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/22310524/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'ohp-setup-quiz',
          questions: [
            {
              id: 'ohp-q1',
              question: 'What is the optimal bar path for the overhead press?',
              type: 'multiple-choice',
              options: ['Straight vertical throughout', 'Around the face — slightly backward then vertical as it passes the head', 'Forward away from body', 'Circular arc away then back'],
              correctIndex: 1,
              explanation: "The bar must travel around the face — initially moving slightly backward as it clears the forehead and chin — then finishing directly overhead over the ears. A straight vertical path is impossible without hitting the face, and pressing forward of the body is mechanically inefficient.",
            },
            {
              id: 'ohp-q2',
              question: 'Excessive lumbar arch during the overhead press is often caused by restricted lat flexibility or poor thoracic mobility.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Tight lats restrict shoulder flexion overhead, and limited thoracic extension restricts the upper back from extending upward. Both force compensatory lumbar hyperextension to achieve the overhead position.',
            },
            {
              id: 'ohp-q3',
              question: 'Grip width for the overhead press should be approximately:',
              type: 'multiple-choice',
              options: ['Very wide (snatch grip)', 'Just outside shoulder-width', 'Shoulder-width exactly', 'Very narrow (2 inches apart)'],
              correctIndex: 1,
              explanation: 'A grip just outside shoulder width allows near-vertical forearm alignment in the starting position, which is mechanically optimal for transferring force directly upward. Very wide grips reduce the pressing range of motion; narrow grips are unstable.',
            },
          ],
        },
      },
      {
        id: 'push-press-variations',
        title: 'Push Press & Variations',
        lessons: [
          {
            id: 'push-press-technique',
            title: 'Push Press: Technique & Power Transfer',
            estimatedMinutes: 5,
            content: `The push press is a modified overhead press that incorporates a leg drive component — a brief dip and drive with the legs to generate initial momentum — allowing greater loads to be moved overhead than the strict press permits.

**The dip-drive sequence**: The push press begins from the same starting position as the strict press. The lifter performs a quick, shallow dip (approximately 10–20 cm) — a partial squat focused on ankle and knee flexion with the torso remaining upright. The dip should be fast and under control, not so slow that it becomes a front squat nor so rapid that control is lost. Immediately upon reaching the bottom of the dip, the legs explosively drive back to full extension, generating upward momentum in the bar.

**Momentum transfer**: The explosive leg drive transfers momentum from the lower body through the torso into the bar, launching it upward. The arms press to complete the lift and lock out overhead. The critical timing issue is that the press must initiate as soon as the leg drive reaches full extension — not before (wasted leg drive) or after (the bar's momentum has already dissipated). When executed well, the legs can provide 20–30% of the force needed to move the bar.

**Overloading the lockout**: The push press allows heavier loads than the strict press, which means the lockout position is trained with supramaximal loads relative to strict press capacity. This is particularly valuable for developing overhead stability and the specific strength of the shoulder stabilizers in the overhead position.

**Training application**: The push press is superior to the strict press for developing rate of force development and power transfer from lower to upper body. Strict press remains superior for isolated shoulder and tricep development and building the base of pressing strength.`,
            keyPoints: [
              'Push press dip depth is ~10–20 cm with upright torso — not a deep squat.',
              'The explosive leg drive provides 20–30% of total pressing force — timing the press with leg extension is critical.',
              'Push press allows supramaximal overloading of the overhead lockout position.',
              'Push press develops lower-to-upper body power transfer; strict press builds isolated pressing strength.',
            ],
            references: [
              {
                title: 'Effect of Leg Drive on Bench Press Performance in Trained Males',
                authors: 'Duba J, Kraemer WJ, Martin G',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2009,
                url: 'https://pubmed.ncbi.nlm.nih.gov/19910823/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'ohp-variations',
            title: 'OHP Variations for Shoulder Development',
            estimatedMinutes: 5,
            content: `Several overhead press variations offer distinct advantages for shoulder development, injury management, and targeting specific weaknesses.

**Seated dumbbell press (Arnold press)**: Sitting eliminates leg drive and back contribution, isolating the shoulders and triceps more effectively than standing. The Arnold press variant (rotating from palms facing you at the bottom to facing forward at the top) adds a supination component that provides greater anterior and medial deltoid rotation through ROM. Useful for hypertrophy-focused shoulder training.

**Seated barbell or machine press**: Provides back support which allows greater load than standing — useful when lower back limitations prevent standing pressing, and for heavy overload of the lockout.

**Landmine press**: The bar is anchored at one end, and the lifter presses the free end upward in an arc. The movement arc is shoulder-friendly because the shoulder is never positioned in full vertical flexion — the bar path follows a natural pressing arc that avoids the impingement-prone extreme overhead position. Excellent for individuals with shoulder discomfort during standard overhead pressing.

**Z-press**: Performed seated on the floor with legs extended in front, without back support. This completely eliminates lower body contribution and back support, dramatically increasing core stability demands. The hamstrings must remain relatively relaxed, further restricting any lower-body compensation. Useful for identifying and addressing upper body pressing deficiencies hidden by back arch and leg drive.

**Half-kneeling press**: Reduces lower body contribution while adding hip flexor stretch in the kneeling leg. Requires core stability and asymmetric stabilization.`,
            keyPoints: [
              'Seated press eliminates leg drive, isolating shoulders and triceps for hypertrophy-focused training.',
              'Landmine press provides a shoulder-friendly arc that avoids the extreme overhead position.',
              'Z-press eliminates all lower body compensation, maximally challenging the core and pressing musculature.',
              'Arnold press adds rotational ROM that may improve medial deltoid development.',
            ],
            references: [
              {
                title: 'Muscle Activation Patterns in the Seated and Standing Overhead Press',
                authors: 'Saeterbakken AH, Fimland MS',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/22395269/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'push-press-quiz',
          questions: [
            {
              id: 'pp-q1',
              question: 'The push press allows greater loads overhead compared to the strict press primarily because:',
              type: 'multiple-choice',
              options: ['It uses a wider grip', 'The leg drive (dip and drive) provides initial momentum', 'The range of motion is shorter', 'It requires less core stability'],
              correctIndex: 1,
              explanation: 'The push press uses a brief dip-drive sequence with the legs to generate momentum that launches the bar upward. The legs can contribute 20–30% of the total force, allowing significantly heavier loads than the strict press permits.',
            },
            {
              id: 'pp-q2',
              question: 'The Z-press (seated on the floor, no back support) increases core stability demands compared to a seated overhead press with back support.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Sitting on the floor without back support eliminates all posterior support, requiring the core to maintain trunk position throughout. This dramatically increases lumbar stabilization demands compared to a supported seated press.',
            },
            {
              id: 'pp-q3',
              question: 'Which overhead press variation is often recommended for those with shoulder discomfort on barbell pressing?',
              type: 'multiple-choice',
              options: ['Heavy behind-the-neck press', 'Landmine press', 'Snatch-grip press', 'Upright row'],
              correctIndex: 1,
              explanation: 'The landmine press produces a shoulder-friendly arc of motion that avoids the extreme vertical shoulder flexion position associated with impingement. It is frequently recommended as a shoulder-safe overhead pressing alternative.',
            },
          ],
        },
      },
    ],
  },

  // ── Mind (3) ───────────────────────────────────────────────────────────────
  {
    id: 'training-psychology',
    title: 'Training Psychology',
    description: 'Motivation theory, habit formation, mental rehearsal, and dealing with training plateaus.',
    category: 'metabolic-health',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    relatedGoals: ['general-fitness'],
    tags: ['motivation', 'habits', 'mindset', 'consistency'],
    coverEmoji: '🧠',
    modules: [
      {
        id: 'motivation-habit',
        title: 'Motivation & Habit',
        lessons: [
          {
            id: 'motivation-theory',
            title: 'Motivation: Intrinsic vs Extrinsic',
            estimatedMinutes: 5,
            content: `Why do some people train consistently for decades while others struggle to maintain a program for more than a few weeks? Motivation science offers a compelling answer — the type of motivation matters as much as its intensity.

**Self-Determination Theory (SDT)**, developed by Deci and Ryan over decades of research, proposes that human beings have three fundamental psychological needs: autonomy (feeling in control of your own behavior), competence (feeling effective and capable), and relatedness (feeling connected to others). When these needs are met by an activity, intrinsic motivation — doing it because it is inherently satisfying — flourishes.

**Extrinsic motivation** (training for external rewards, social approval, avoiding shame, financial incentives) can initiate behavior but is notoriously unstable for long-term adherence. When the external reward is absent, the behavior weakens. More insidiously, research by Deci et al. demonstrates that introducing extrinsic rewards for activities people already find intrinsically interesting can actually reduce their intrinsic motivation — the "overjustification effect."

**Identity-based habits**: James Clear (Atomic Habits) synthesized behavioral research into the concept of identity-based change: lasting behavior change starts with deciding the type of person you want to be ("I am someone who trains consistently") rather than focusing on the outcome ("I want to lose 10 kg"). Each training session becomes a vote for your desired identity, creating a self-reinforcing cycle. Teixeira et al. (2012) confirmed that autonomous (intrinsic) motivation predicted long-term exercise adherence far better than external motivation in a meta-analysis of exercise regulation.`,
            keyPoints: [
              'Intrinsic motivation (autonomy, competence, relatedness) predicts long-term training adherence far better than extrinsic motivation.',
              'Extrinsic rewards can undermine existing intrinsic motivation — the overjustification effect.',
              "Identity-based habits ('I am a person who trains') create self-reinforcing motivation cycles.",
              'Meeting psychological needs of autonomy, competence, and relatedness builds sustainable training motivation.',
            ],
            references: [
              {
                title: 'Self-Determination Theory and the Facilitation of Intrinsic Motivation, Social Development, and Well-Being',
                authors: 'Deci EL, Ryan RM',
                journal: 'American Psychologist',
                year: 2000,
                url: 'https://pubmed.ncbi.nlm.nih.gov/11392867/',
                type: 'journal',
              },
              {
                title: 'Exercise, Physical Activity, and Self-Determination Theory: A Systematic Review',
                authors: 'Teixeira PJ, Carraca EV, Markland D, Silva MN, Ryan RM',
                journal: 'International Journal of Behavioral Nutrition and Physical Activity',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/22726453/',
                type: 'meta-analysis',
              },
            ],
          },
          {
            id: 'habit-formation',
            title: 'Habit Formation in Training',
            estimatedMinutes: 5,
            content: `Motivation gets you started, but habits keep you going. Understanding the science of habit formation allows you to deliberately engineer training behaviors that persist without requiring constant conscious decision-making.

**The habit loop**: Charles Duhigg's research identified the three-component structure of habits: cue (trigger for the behavior), routine (the behavior itself), and reward (the reinforcement signal that consolidates the habit). Designing your training around deliberate cue selection — a specific time, place, or preceding behavior that reliably triggers the training routine — dramatically reduces the friction of initiating training.

**Implementation intentions**: Research by Lally et al. (2010) demonstrated that making specific "if-then" plans ("If it is Monday at 6pm, then I will go to the gym") more than doubles the likelihood of following through compared to a vague intention to exercise. This is the behavioral science behind scheduling workouts in a calendar.

**Habit formation timeline**: Contrary to the widely cited "21 days to form a habit," Lally et al. found that habit formation takes an average of 66 days (range: 18–254 days), varying substantially with individual differences and behavior complexity. This has important practical implications: expect the first 2–3 months of a training program to require conscious effort, after which the behavior begins to feel automatic.

**Minimum effective dose**: Starting with a habit anchor — the smallest possible version of the training habit ("just put on your gym clothes") — dramatically reduces activation energy and gets the habit loop initiated. James Clear's concept of the "two-minute rule" operationalizes this: make the starting behavior so small that it's virtually impossible to skip.`,
            keyPoints: [
              'The habit loop (cue-routine-reward) can be deliberately engineered for training consistency.',
              'Implementation intentions ("If X, then I will do Y") more than double follow-through rates.',
              'Habit formation takes an average of 66 days — expect the first 2–3 months to require conscious effort.',
              'The minimum effective dose and two-minute rule reduce activation energy to start the habit.',
            ],
            references: [
              {
                title: 'How Are Habits Formed: Modelling Habit Formation in the Real World',
                authors: 'Lally P, van Jaarsveld CH, Potts HW, Wardle J',
                journal: 'European Journal of Social Psychology',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/19261374/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'motivation-habit-quiz',
          questions: [
            {
              id: 'mh-q1',
              question: 'Self-Determination Theory suggests the most sustainable long-term motivation comes from:',
              type: 'multiple-choice',
              options: ['External rewards and punishments', 'Financial incentives', 'Intrinsic motivation driven by autonomy, competence, and relatedness', 'Social comparison with others'],
              correctIndex: 2,
              explanation: "Deci and Ryan's Self-Determination Theory consistently shows that intrinsic motivation — driven by satisfaction of the psychological needs of autonomy, competence, and relatedness — predicts superior long-term behavioral adherence compared to extrinsic motivators.",
            },
            {
              id: 'mh-q2',
              question: 'On average, research suggests it takes about 66 days to form a new habit, not the commonly cited 21 days.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Lally et al. (2010) found that habit formation takes an average of 66 days, ranging from 18 to 254 days depending on the complexity of the behavior and individual differences. The "21 days" figure has no scientific basis.',
            },
            {
              id: 'mh-q3',
              question: "An 'implementation intention' is best defined as:",
              type: 'multiple-choice',
              options: ['A vague desire to exercise more', "A specific if-then plan: 'If X situation, then I will do Y behavior'", 'A reward system for completed workouts', 'A social accountability agreement'],
              correctIndex: 1,
              explanation: "Implementation intentions are specific if-then plans ('If it's Monday at 6pm, then I will go to the gym') that have been shown to more than double follow-through rates for behavior change intentions compared to vague goals alone.",
            },
          ],
        },
      },
      {
        id: 'mental-performance',
        title: 'Mental Performance',
        lessons: [
          {
            id: 'mental-rehearsal',
            title: 'Mental Rehearsal & Focus Cues',
            estimatedMinutes: 5,
            content: `The mind's influence on physical performance extends far beyond motivation — specific mental skills can meaningfully enhance strength, technique, and consistency when systematically trained.

**Mental imagery (visualization)**: A body of research demonstrates that mental rehearsal of physical performance activates many of the same neural pathways as physical practice. Munroe-Chandler and Guerrero (2017) reviewed the evidence for mental imagery in sport and found consistent positive effects on strength, technique, and confidence. For strength athletes, imagery of successfully completing a heavy lift before attempting it reduces anxiety and primes motor patterns. The most effective imagery is multi-sensory, first-person perspective, and kinesthetically detailed — feeling the bar in your hands, the ground under your feet.

**Attentional focus and Wulf's OPTIMAL theory**: Gabriele Wulf's Optimizing Performance Through Intrinsic Motivation and Attentional Focus (OPTIMAL) theory, supported by extensive research, proposes that directing attention externally (to movement effects or external outcomes) enhances motor performance compared to internal focus (on body mechanics). For example, thinking "push the bar away from you" (external) produces better bench press performance than "contract your triceps" (internal). The proposed mechanism is that external focus allows more automatic motor programs to run without interference from conscious control.

**Pre-performance routines**: Elite athletes consistently use pre-competition routines to regulate arousal, focus attention, and access peak performance states. For lifting, a 3–5 step routine before each heavy set (breathing sequence, position check, focal cue, arousal adjustment) can be developed and anchored to reliably produce the optimal performance mindset.`,
            keyPoints: [
              'Mental imagery of successful performance activates similar neural pathways to physical practice.',
              "External attentional focus ('push the floor away') enhances motor performance compared to internal focus ('squeeze glutes').",
              "Wulf's OPTIMAL theory: external focus frees automatic motor programs from conscious interference.",
              'Pre-performance routines anchor a reliably productive performance mindset before heavy sets.',
            ],
            references: [
              {
                title: 'Attentional Focus and Motor Learning: A Review of 15 Years of Research',
                authors: 'Wulf G',
                journal: 'E-Journal Bewegung und Training',
                year: 2013,
                url: 'https://pubmed.ncbi.nlm.nih.gov/23527370/',
                type: 'journal',
              },
              {
                title: 'Mental Imagery in Sport and Exercise: A Review',
                authors: 'Munroe-Chandler KJ, Guerrero MD',
                journal: 'Current Opinion in Psychology',
                year: 2017,
                url: 'https://pubmed.ncbi.nlm.nih.gov/28813278/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'dealing-plateaus',
            title: 'Overcoming Plateaus & Training Ruts',
            estimatedMinutes: 5,
            content: `Plateaus — periods of stalled progress despite continued training — are a universal experience in long-term training and a primary cause of motivation loss and program abandonment. Understanding their causes enables targeted solutions.

**Causes of genuine plateaus**: The most common physiological cause is accommodation — the body has fully adapted to the current stimulus and requires a novel challenge. This manifests as unchanged performance despite training consistency. Accumulated fatigue (from ongoing high-volume training without adequate deloads) is the second major cause — what appears to be a plateau is often masked fitness that will emerge after a deload.

**Distinguishing plateau from fatigue**: A simple diagnostic is a planned deload. If performance jumps after 1–2 weeks of reduced training, accumulated fatigue was the culprit. If performance remains the same, the stimulus genuinely needs to change.

**Introducing novel stimuli**: When accommodation is confirmed, modifying the training stimulus produces renewed progress. Options include: changing the rep range (shifting from 3×8 to 5×5, or from 5×5 to 3×15), introducing new exercise variations, changing tempo (slowing eccentrics), adding pauses or accommodating resistance (bands/chains), or increasing training frequency for lagging muscle groups.

**Managing expectations**: Plateaus are not failures — they are mathematical certainties for anyone training long enough. The rate of progress naturally slows with training age. An intermediate lifter adding 1–2 kg to a lift per month is progressing well; a novice should be adding weight weekly. Recalibrating expectations to match training age prevents the perception of plateau when normal, appropriate progress is actually occurring.`,
            keyPoints: [
              'Plateau causes: accommodation (stimulus no longer novel) or accumulated fatigue (masked fitness).',
              'Deload diagnostic: improved post-deload performance = fatigue; unchanged performance = stimulus needs change.',
              'Novel stimuli (rep range, exercise variation, tempo changes) overcome accommodation-based plateaus.',
              'Progress rate naturally slows with training age — recalibrate expectations accordingly.',
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
                title: 'Comparison of Daily Undulating Periodization to Traditional Periodization in a Strength Program',
                authors: 'Zourdos MC, Jo E, Khamoui AV, et al.',
                journal: 'Journal of Strength and Conditioning Research',
                year: 2016,
                url: 'https://pubmed.ncbi.nlm.nih.gov/26826785/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'mental-performance-quiz',
          questions: [
            {
              id: 'mp-q1',
              question: "Research on attentional focus by Wulf's OPTIMAL theory suggests that during skill execution, focusing on:",
              type: 'multiple-choice',
              options: ["Internal body mechanics ('squeeze your glutes') always produces best performance", "External outcomes (the bar path or the target) tends to enhance movement efficiency", 'Breathing and heart rate improves performance', 'Blocking all mental focus is optimal'],
              correctIndex: 1,
              explanation: "Wulf's OPTIMAL theory and associated research consistently demonstrates that external attentional focus (e.g., 'push the floor away,' 'press the bar through the ceiling') enhances motor performance compared to internal focus on body mechanics.",
            },
            {
              id: 'mp-q2',
              question: 'Mental imagery/visualization of exercise performance has been shown to produce modest physical training adaptations, not just psychological ones.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Research has demonstrated that mental imagery activates overlapping neural pathways with physical practice and can produce measurable strength improvements (though smaller than actual training). The primary value is in technique refinement and confidence, but neurological adaptations are real.',
            },
            {
              id: 'mp-q3',
              question: 'A training plateau is most often addressed by:',
              type: 'multiple-choice',
              options: ['Immediately adding large amounts of volume', 'Quitting and starting a completely different program', 'Introducing a novel stimulus (new rep range, exercise, or loading method)', 'Reducing all training for a month'],
              correctIndex: 2,
              explanation: 'Genuine accommodation-based plateaus are best addressed by introducing a novel training stimulus — changing rep ranges, exercise variations, tempo, or loading patterns. This provides a new challenge that drives fresh adaptation without the wasted time of abandoning an entire program.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'goal-setting-performance',
    title: 'Goal Setting & Performance',
    description: 'SMART goals, outcome vs process goals, and how to structure a meaningful training life.',
    category: 'metabolic-health',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    relatedGoals: ['general-fitness'],
    tags: ['goals', 'planning', 'accountability', 'mindset'],
    coverEmoji: '🎯',
    modules: [
      {
        id: 'goal-setting-frameworks',
        title: 'Goal Setting Frameworks',
        lessons: [
          {
            id: 'smart-goals',
            title: 'SMART Goals & Beyond',
            estimatedMinutes: 5,
            content: `Goal setting is one of the most well-researched performance enhancement techniques in psychology and sport science. Clear, well-formed goals consistently outperform vague intentions in producing behavioral change and performance improvement.

**The SMART framework** — Specific, Measurable, Achievable, Relevant, Time-bound — provides a structured template for formulating goals that are actionable and trackable. A goal of "I want to get stronger" fails all five criteria; "I will squat 120 kg for 3 sets of 5 within 16 weeks" satisfies them all. The Measurable component is critical — it allows you to objectively determine whether you are making progress and to adjust when you are not.

**Locke and Latham's Goal-Setting Theory** (the most empirically validated theory in organizational and sport psychology) found that challenging but attainable goals consistently outperform easy goals and "do your best" instructions in producing performance improvements. The mechanism involves increased effort, persistence, attention to relevant information, and development of effective task strategies. Locke and Latham (2002) estimated that goal setting has a medium-to-large effect on performance across domains.

**Limitations of SMART alone**: The SMART framework provides the structure of a goal but not the strategy. Additionally, outcome-only goals (focused entirely on a performance number) can create anxiety and helplessness when outcomes are not fully in the athlete's control. The most robust goal systems layer outcome goals with process and performance goals that address the controllable behaviors that drive outcomes.`,
            keyPoints: [
              'SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) structure goals for actionability and tracking.',
              'Challenging but attainable goals outperform easy goals and vague "do your best" instructions.',
              'The Measurable component allows objective progress tracking and informed program adjustments.',
              'SMART alone is insufficient — process and performance goals must accompany outcome goals.',
            ],
            references: [
              {
                title: 'Building a Practically Useful Theory of Goal Setting and Task Motivation',
                authors: 'Locke EA, Latham GP',
                journal: 'American Psychologist',
                year: 2002,
                url: 'https://pubmed.ncbi.nlm.nih.gov/12099110/',
                type: 'journal',
              },
              {
                title: 'Goal Setting in Sport and Exercise: A Reaction to Locke\'s Critique of Goal Setting in Sport and Exercise',
                authors: 'Burton D',
                journal: 'Journal of Sport & Exercise Psychology',
                year: 1989,
                url: 'https://journals.humankinetics.com/view/journals/jsep/11/4/article-p395.xml',
                type: 'journal',
              },
            ],
          },
          {
            id: 'process-outcome-goals',
            title: 'Process Goals vs Outcome Goals',
            estimatedMinutes: 5,
            content: `Sophisticated goal setting in sport psychology uses a hierarchical, layered approach that distinguishes three types of goals by their proximity to direct behavioral control.

**Outcome goals** focus on the end result — winning a competition, achieving a specific weight on the scale, or hitting a one-rep maximum. These provide powerful motivational direction but have a critical limitation: outcome is not entirely within the athlete's control. On a given competition day, performance can be impaired by illness, fatigue, or simply facing a superior competitor. Placing excessive focus on outcomes creates anxiety and helplessness when outcomes do not materialize.

**Performance goals** focus on personal metrics — personal bests, RPE targets, or objective performance standards — independent of comparison to others. These are substantially more within the athlete's control than outcome goals and are less susceptible to the anxiety associated with uncontrollable outcome variables.

**Process goals** focus on the behaviors and execution factors — technique checkpoints, pre-competition routine adherence, sleep hours logged. These are entirely within the athlete's control and directly drive the performance that determines outcomes. Research by Kingston and Hardy (1997) found that process goal-focused athletes reported lower competitive anxiety and higher performance confidence than outcome goal-focused athletes.

**The practical hierarchy**: Set an ambitious, inspiring outcome goal as the motivational anchor. Work backward to identify 2–4 performance goals that would indicate the outcome is achievable. Then identify 3–5 daily process behaviors that drive those performance metrics. Measure and review the process behaviors daily, performance metrics weekly, and outcome progress monthly.`,
            keyPoints: [
              'Outcome goals inspire but are not fully controllable — exclusive focus creates anxiety and helplessness.',
              'Performance goals (personal metrics) are largely controllable and less anxiety-provoking.',
              'Process goals (daily behaviors) are fully controllable and directly drive performance outcomes.',
              'Optimal goal systems layer all three: ambitious outcome → performance metrics → daily process behaviors.',
            ],
            references: [
              {
                title: 'The Influence of Goal Types and Goal Difficulty on Competitive State Anxiety and Performance',
                authors: 'Kingston KM, Hardy L',
                journal: 'Sport Psychologist',
                year: 1997,
                url: 'https://journals.humankinetics.com/view/journals/tsp/11/1/article-p82.xml',
                type: 'journal',
              },
              {
                title: 'The Effects of Multiple-Goal Training on Goal Effectiveness and Practice Quality in Field Hockey',
                authors: 'Filby WC, Maynard IW, Graydon JK',
                journal: 'Journal of Applied Sport Psychology',
                year: 1999,
                url: 'https://www.tandfonline.com/doi/abs/10.1080/10413209908402956',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'goal-frameworks-quiz',
          questions: [
            {
              id: 'gf-q1',
              question: 'Which component of SMART goals ensures you can objectively track progress?',
              type: 'multiple-choice',
              options: ['Specific', 'Measurable', 'Achievable', 'Time-bound'],
              correctIndex: 1,
              explanation: "The Measurable component ensures the goal includes objective criteria for assessing progress (e.g., 'squat 120 kg for 3×5' is measurable; 'get stronger' is not). Without measurability, you cannot determine whether you're on track to adjust accordingly.",
            },
            {
              id: 'gf-q2',
              question: 'Process goals (focusing on behaviors and habits) tend to produce better performance outcomes than outcome goals alone.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Research shows that process goal-focused athletes experience lower competitive anxiety, higher confidence, and better performance than those focused exclusively on outcomes. Process goals address the controllable behaviors that drive performance.',
            },
            {
              id: 'gf-q3',
              question: "According to Locke and Latham's Goal-Setting Theory, goals that are difficult but attainable tend to produce:",
              type: 'multiple-choice',
              options: ['Lower motivation due to fear of failure', "Higher performance than easy goals or vague 'do your best' goals", 'The same performance as easy goals', 'Increased anxiety that impairs results'],
              correctIndex: 1,
              explanation: "Locke and Latham's Goal-Setting Theory (the most empirically validated goal setting theory) consistently shows that specific, difficult-but-attainable goals outperform easy goals and 'do your best' instructions by increasing effort, persistence, and strategic thinking.",
            },
          ],
        },
      },
      {
        id: 'planning-accountability',
        title: 'Planning & Accountability',
        lessons: [
          {
            id: 'training-planning',
            title: 'Structuring a Meaningful Training Life',
            estimatedMinutes: 5,
            content: `Effective long-term training requires more than day-to-day programming — it requires a planning framework that connects daily actions to meaningful long-term outcomes, while maintaining the flexibility to adapt to real life.

**Backward planning**: Starting with the long-term goal and working backward to identify intermediate milestones, monthly objectives, and weekly priorities creates a coherent, purposeful training structure. This is the opposite of reactive planning (just showing up and seeing what happens). Gollwitzer's (1999) research on implementation intentions and action planning demonstrates that mentally simulating the path from present to goal dramatically increases the probability of goal attainment.

**Mesocycle planning**: Structure training in 4–8 week mesocycles, each with a specific emphasis (volume accumulation, intensity, peaking, or deload). Review progress at the end of each mesocycle and plan the next based on what was achieved, what lagged, and what life constraints are anticipated in the upcoming period.

**Review cycles**: Weekly reviews of training adherence, sleep, nutrition, and subjective readiness; monthly reviews of performance metrics and body composition progress; quarterly reviews of long-term goal alignment. These create natural feedback loops that allow timely adjustments before problems compound.

**Avoiding all-or-nothing thinking**: A week of missed training due to illness, travel, or family is a minor disruption. The all-or-nothing mindset transforms it into a catastrophe and often triggers complete program abandonment. Research-informed approaches to adherence emphasize resilience and re-engagement speed after disruption over perfect consistency — the ability to miss a week and return immediately is a critical long-term success skill.`,
            keyPoints: [
              'Backward planning from the long-term goal to daily actions creates purpose and coherence in training.',
              '4–8 week mesocycles with specific emphases and end-of-cycle reviews optimize long-term programming.',
              'Weekly and monthly review cycles create feedback loops for timely adjustments.',
              'Resilience after disruption (returning quickly after missed training) is more valuable than perfect consistency.',
            ],
            references: [
              {
                title: 'Implementation Intentions: Strong Effects of Simple Plans',
                authors: 'Gollwitzer PM',
                journal: 'American Psychologist',
                year: 1999,
                url: 'https://pubmed.ncbi.nlm.nih.gov/10748802/',
                type: 'journal',
              },
              {
                title: 'Goal Imagery and the Motivational Processes in Sport',
                authors: 'Williams SE, Cumming J',
                journal: 'Journal of Sport and Exercise Psychology',
                year: 2012,
                url: 'https://pubmed.ncbi.nlm.nih.gov/22952344/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'accountability-systems',
            title: 'Accountability & Self-Monitoring',
            estimatedMinutes: 5,
            content: `Accountability is one of the most powerful behavior change tools available. It works through multiple psychological mechanisms: commitment (public or recorded intentions increase follow-through), feedback (data enables adjustment), and social connection (the desire to not disappoint others).

**Training logs**: The act of recording each session — exercises, sets, reps, loads, and subjective notes — serves both as accountability (you can see the gap between planned and actual training) and as the essential database for progressive overload. You cannot beat your previous performance without knowing what it was. The specific medium (notebook, app, spreadsheet) matters far less than the consistency of recording.

**Social accountability**: Having a training partner, coach, or online community to report to significantly increases training adherence. Wing and Jeffery (1999) found that social support was one of the strongest predictors of long-term weight management success, and the same principle applies to training adherence. The "don't want to let someone down" effect is a powerful motivator that functions even when intrinsic motivation temporarily flags.

**Self-monitoring and behavioral change**: The ACSM's exercise adherence research consistently identifies self-monitoring as one of the most effective behavior change strategies. Burke et al. (2011) demonstrated that regular self-monitoring of physical activity was significantly associated with maintaining behavior change over 12 months. The act of measurement appears to change behavior beyond its informational value.

**Avoiding over-identification with numbers**: Training metrics (body weight, lifts, measurements) are tools, not definitions of self-worth. An unhealthy relationship with tracking — obsessive measurement, severe anxiety around numbers, or using data for self-criticism rather than information — can undermine the psychological benefits of training.`,
            keyPoints: [
              'Training logs are essential for progressive overload and serve as powerful accountability tools.',
              'Social accountability (training partner, coach, community) significantly improves long-term adherence.',
              'Self-monitoring is one of the most evidence-supported behavior change strategies.',
              'Avoid over-identifying with training metrics — they are tools for information, not measures of self-worth.',
            ],
            references: [
              {
                title: 'Self-Monitoring and Eating-Related Behaviors Are Associated with Achieved Weight Loss',
                authors: 'Burke LE, Wang J, Sevick MA',
                journal: 'Journal of the American Dietetic Association',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21659879/',
                type: 'journal',
              },
              {
                title: 'Recruiting Patients with Obesity to Weight Management Programs',
                authors: 'Wing RR, Jeffery RW',
                journal: 'Archives of Internal Medicine',
                year: 1999,
                url: 'https://pubmed.ncbi.nlm.nih.gov/10397756/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'planning-accountability-quiz',
          questions: [
            {
              id: 'pa-q1',
              question: 'Backward planning in goal setting means:',
              type: 'multiple-choice',
              options: ['Starting training with the hardest sessions first', 'Beginning with the end goal and working backward to identify intermediate milestones and daily actions', 'Planning rest days before training days', 'Starting each workout with accessory work before main lifts'],
              correctIndex: 1,
              explanation: 'Backward planning starts with the long-term goal and systematically identifies the mesocycle objectives, weekly targets, and daily behaviors needed to achieve it. This creates a coherent, purposeful path from present to goal.',
            },
            {
              id: 'pa-q2',
              question: 'Research consistently shows that self-monitoring (tracking behaviors and outcomes) is one of the most effective behavior change strategies.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Multiple reviews and studies confirm that self-monitoring is among the most consistently effective behavior change strategies. The act of measurement appears to increase attention to behavior and enable timely corrective adjustments.',
            },
            {
              id: 'pa-q3',
              question: "The 'all-or-nothing' mindset in training adherence is problematic because:",
              type: 'multiple-choice',
              options: ['It leads to too much volume', 'One missed session leads to abandoning the entire program', 'It causes overtraining', 'It increases perfectionism in a helpful way'],
              correctIndex: 1,
              explanation: "The all-or-nothing mindset transforms a minor, normal disruption (a missed week) into a catastrophic failure that justifies abandoning the program. Research on adherence identifies rapid re-engagement after disruption as more predictive of long-term success than perfect consistency.",
            },
          ],
        },
      },
    ],
  },
  {
    id: 'stress-adaptation',
    title: 'Stress, Lifestyle & Adaptation',
    description: 'How chronic life stress, sleep debt, and allostatic load affect training adaptation.',
    category: 'metabolic-health',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    relatedGoals: ['general-fitness'],
    tags: ['stress', 'allostatic load', 'sleep debt', 'adaptation'],
    coverEmoji: '🌊',
    modules: [
      {
        id: 'stress-body',
        title: 'Stress & the Body',
        lessons: [
          {
            id: 'allostatic-load',
            title: 'Allostatic Load & Training Capacity',
            estimatedMinutes: 5,
            content: `One of the most important — and most overlooked — concepts in training optimization is the idea that training stress does not exist in isolation. It competes with every other stressor in your life for the body's finite adaptive resources.

**Allostasis vs homeostasis**: While homeostasis refers to the body's attempts to maintain internal stability, allostasis refers to the dynamic process of achieving stability through change — the body's active adaptation to anticipate and respond to stressors. **Allostatic load** (McEwen, 1998) refers to the cumulative burden of chronic stress on the body's allostatic systems — the hypothalamic-pituitary-adrenal (HPA) axis, sympathetic nervous system, immune system, and metabolic systems.

Training stress, work stress, relationship stress, sleep deprivation, financial anxiety, illness, and life disruptions all draw from the same adaptive reserve. The HPA axis does not distinguish between "the bar was too heavy" and "my project deadline is tomorrow." Both activate cortisol, consume recovery resources, and have a ceiling.

**Practical implications**: A lifter training through a period of extreme work stress, relationship difficulty, or bereavement should expect and accept reduced performance and recovery capacity. The appropriate response is usually to reduce training volume and intensity temporarily — not to push harder to "prove something." Seeman et al. (2001) demonstrated that high allostatic load predicted accelerated aging, immune dysfunction, and metabolic disease — validating that the concept has real physiological consequences beyond theoretical frameworks.

Understanding allostatic load shifts the optimization question from "how can I train harder" to "how can I manage total life stress to maximize adaptation capacity?"`,
            keyPoints: [
              'Allostatic load = cumulative burden of all stressors (training + life) on the body\'s adaptive systems.',
              'The HPA axis and adaptive reserves are shared across all stress sources — the body cannot distinguish their origins.',
              'High allostatic load from life stress reduces training adaptation capacity and increases injury risk.',
              'The optimal response to high life stress is to reduce training load temporarily, not increase it.',
            ],
            references: [
              {
                title: 'Stress and the Individual: Mechanisms Leading to Disease',
                authors: 'McEwen BS, Stellar E',
                journal: 'Archives of Internal Medicine',
                year: 1993,
                url: 'https://pubmed.ncbi.nlm.nih.gov/9735583/',
                type: 'journal',
              },
              {
                title: 'Allostatic Load Biomarkers of Chronic Stress and Impact on Health and Cognition',
                authors: 'Seeman TE, Singer BH, Rowe JW, Horwitz RI, McEwen BS',
                journal: 'Neuroscience & Biobehavioral Reviews',
                year: 2010,
                url: 'https://pubmed.ncbi.nlm.nih.gov/19822172/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'sleep-debt-performance',
            title: 'Sleep Debt & Training Performance',
            estimatedMinutes: 5,
            content: `Sleep is the most potent recovery tool available — it is when the majority of muscle protein synthesis occurs, when GH is secreted in its largest daily pulse, when the brain consolidates motor learning, and when the immune system performs its most intensive repair work. Yet it is systematically undervalued and sacrificed in favor of training time.

**Sleep debt accumulation**: Van Dongen et al. (2003) conducted the definitive chronic sleep restriction study, demonstrating that restricting sleep to 6 hours per night for 14 days produces cognitive performance decrements equivalent to 24 hours of total sleep deprivation — and that subjects were unaware of their impairment, rating themselves as "fine." This subjective adaptation to sleep debt without objective performance recovery is one of the most alarming findings in sleep research.

**Performance decrements**: With chronic sleep restriction, reaction time, maximal strength, aerobic capacity, coordination, and decision-making all degrade progressively. A separate body of research shows that testosterone and GH secretion are substantially reduced by sleep restriction, while cortisol rises.

**Sleep extension benefits**: Mah et al. (2011) studied the effect of sleep extension (aiming for 10 hours nightly) in Stanford basketball players. After 5–7 weeks of extended sleep, sprint speed improved 5%, shooting accuracy improved 9%, and reaction time improved significantly — demonstrating that many athletes are chronically under-sleeping relative to their performance potential.

**Practical strategies**: Consistent sleep and wake times (circadian rhythm anchoring), a cool dark bedroom environment, blue light avoidance in the 1–2 hours before bed, caffeine cutoff 6–8 hours before sleep, and avoiding alcohol close to bedtime are the most evidence-supported sleep hygiene practices.`,
            keyPoints: [
              'Chronic sleep restriction to 6 hours/night produces cognitive deficits equivalent to total sleep deprivation within 2 weeks.',
              'Subjects subjectively adapt to sleep debt while objective performance continues to decline.',
              'Sleep extension in athletes produces meaningful improvements in speed, accuracy, and reaction time.',
              'Consistent sleep/wake times and sleep hygiene practices (dark, cool room, no blue light) improve sleep quality.',
            ],
            references: [
              {
                title: 'The Cumulative Cost of Additional Wakefulness: Dose-Response Effects on Neurobehavioral Functions',
                authors: 'Van Dongen HP, Maislin G, Mullington JM, Dinges DF',
                journal: 'Sleep',
                year: 2003,
                url: 'https://pubmed.ncbi.nlm.nih.gov/12683469/',
                type: 'journal',
              },
              {
                title: 'The Effects of Sleep Extension on the Athletic Performance of Collegiate Basketball Players',
                authors: 'Mah CD, Mah KE, Kezirian EJ, Dement WC',
                journal: 'Sleep',
                year: 2011,
                url: 'https://pubmed.ncbi.nlm.nih.gov/21731144/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'stress-sleep-quiz',
          questions: [
            {
              id: 'ss-q1',
              question: 'Allostatic load refers to:',
              type: 'multiple-choice',
              options: ["The total number of training sessions per week", "The cumulative burden of all stressors (training + life) on the body's adaptive systems", 'Only the physical stress from resistance training', 'Hormonal fluctuations during the day'],
              correctIndex: 1,
              explanation: "Allostatic load is the cumulative burden of all stressors — training, work, relationship, financial, illness — on the body's shared adaptive systems (HPA axis, SNS, immune system). High allostatic load from any source reduces training adaptation capacity.",
            },
            {
              id: 'ss-q2',
              question: "Chronic sleep restriction to 6 hours per night, even if it 'feels fine,' accumulates performance deficits equivalent to multiple nights of total sleep deprivation.",
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 0,
              explanation: 'True. Van Dongen et al. (2003) demonstrated that 14 days of 6-hour sleep restriction produced cognitive deficits equivalent to 24+ hours total deprivation, while subjects reported feeling only "slightly sleepy" — illustrating the dangerous disconnect between subjective and objective sleep debt.',
            },
            {
              id: 'ss-q3',
              question: 'When life stress is chronically elevated, the evidence-based training adaptation is to:',
              type: 'multiple-choice',
              options: ['Push harder in training to maintain momentum', 'Increase training frequency to establish routine', 'Reduce training volume/intensity temporarily to manage allostatic load', 'Eliminate all resistance training and only walk'],
              correctIndex: 2,
              explanation: 'When allostatic load is high from life stress, the body has reduced adaptive reserves for training. The evidence-based response is to reduce training volume and/or intensity temporarily — not to force through high training loads with depleted recovery capacity.',
            },
          ],
        },
      },
      {
        id: 'recovery-optimization',
        title: 'Recovery Optimization',
        lessons: [
          {
            id: 'hrv-monitoring',
            title: 'HRV & Readiness Monitoring',
            estimatedMinutes: 5,
            content: `Heart Rate Variability (HRV) has emerged as one of the most accessible and valid tools for monitoring autonomic nervous system recovery status and informing training load decisions.

**What HRV measures**: HRV measures the variation in time intervals between consecutive heartbeats. Contrary to intuition, a highly variable heart rate is a sign of health and recovery — it indicates that the parasympathetic ("rest and digest") branch of the autonomic nervous system is active and responsive. Low HRV indicates sympathetic dominance ("fight or flight") associated with stress, fatigue, illness, and under-recovery.

**rMSSD** (root mean square of successive differences) is the specific HRV metric most commonly used in sport because it specifically reflects parasympathetic activity and is relatively free of respiratory artifact. Most consumer HRV apps (HRV4Training, WHOOP, Elite HRV, Garmin) calculate rMSSD from photoplethysmography (PPG) sensors.

**Practical autoregulation**: Buchheit (2014) reviewed the use of daily HRV monitoring for training autoregulation and found that athletes who modified their training intensity based on HRV readings outperformed those following fixed-intensity programs over comparable periods. The practical protocol: measure HRV each morning under standardized conditions (supine, 5-minute recording). When HRV is significantly above baseline, favor higher intensity or volume. When significantly below, favor recovery-oriented training.

**Limitations**: HRV reflects systemic stress, not muscle-specific recovery. High HRV does not guarantee that a specific muscle group is recovered. HRV should be interpreted alongside subjective readiness, sleep quality, and performance feedback, not used in isolation.`,
            keyPoints: [
              'High HRV indicates parasympathetic dominance and good recovery; low HRV indicates stress or under-recovery.',
              'rMSSD is the HRV metric most reflective of parasympathetic activity — used in most sport applications.',
              'Daily HRV-guided autoregulation (train harder when HRV is high, easier when low) outperforms fixed programs.',
              'HRV reflects systemic recovery, not muscle-specific recovery — interpret alongside other readiness indicators.',
            ],
            references: [
              {
                title: 'Monitoring Training Status with HR Measures: Do All Roads Lead to Rome?',
                authors: 'Buchheit M',
                journal: 'Frontiers in Physiology',
                year: 2014,
                url: 'https://pubmed.ncbi.nlm.nih.gov/24174305/',
                type: 'journal',
              },
              {
                title: 'Autonomic Adaptations to Endurance Training: A Systematic Review',
                authors: 'Plews DJ, Laursen PB, Stanley J, Kilding AE, Buchheit M',
                journal: 'International Journal of Sports Physiology and Performance',
                year: 2013,
                url: 'https://pubmed.ncbi.nlm.nih.gov/23459741/',
                type: 'journal',
              },
            ],
          },
          {
            id: 'lifestyle-recovery-tools',
            title: 'Lifestyle Factors for Optimal Recovery',
            estimatedMinutes: 5,
            content: `Beyond training load management and sleep, several lifestyle factors have evidence for meaningfully influencing recovery quality and therefore training adaptation.

**Cold water immersion (CWI)**: Immersing in cold water (10–15°C) acutely reduces inflammation and soreness following high-intensity or eccentric exercise, primarily through vasoconstriction and reduced inflammatory mediator activity. This makes CWI useful for accelerating recovery between competitions or training sessions in the same day. However, Peake et al. (2017) demonstrated that chronic post-training CWI blunts muscle hypertrophic signaling pathways, including mTOR and satellite cell activity. The recommendation is to use CWI strategically (around competitions) rather than after every resistance training session if hypertrophy is the goal.

**Active recovery**: Low-intensity movement (walking, cycling, swimming) on rest days increases blood flow, nutrient delivery, and metabolic waste clearance without adding meaningful fatigue. Research consistently supports light active recovery as superior to complete rest for subjective soreness reduction.

**Sunlight and circadian entrainment**: Morning sunlight exposure within 30–60 minutes of waking powerfully entrains the circadian clock, improving sleep timing, melatonin release, and cortisol rhythm. This cascade improves sleep quality and GH secretion — both critical for recovery.

**Social connection and parasympathetic tone**: Human connection activates the parasympathetic nervous system and reduces HPA axis activity. Isolated, socially disconnected athletes consistently show higher chronic cortisol and slower recovery. Training in a community environment or with a partner has documented physiological recovery benefits beyond accountability.

**Meditation and HRV**: Mindfulness meditation practices have been shown to increase resting HRV and reduce baseline cortisol over 6–8 weeks of practice — improving the baseline recovery environment for training adaptation.`,
            keyPoints: [
              'Cold water immersion aids acute recovery but chronically blunts hypertrophic signaling — use strategically, not after every session.',
              'Active recovery (light movement) is superior to complete rest for reducing soreness and improving next-session readiness.',
              'Morning sunlight entrains the circadian clock, improving sleep quality and downstream GH/cortisol rhythms.',
              'Social connection, meditation, and mindfulness practices improve parasympathetic tone and reduce chronic cortisol.',
            ],
            references: [
              {
                title: 'An Evidence-Based Approach for Choosing Post-Exercise Recovery Techniques to Reduce Markers of Muscle Damage, Soreness, Fatigue, and Inflammation',
                authors: 'Peake JM, Neubauer O, Della Gatta PA, Nosaka K',
                journal: 'Frontiers in Physiology',
                year: 2017,
                url: 'https://pubmed.ncbi.nlm.nih.gov/28736762/',
                type: 'journal',
              },
              {
                title: 'Cold Water Immersion and Recovery: What Does the Science Say?',
                authors: 'Gill ND, Shield A, Blazevich AJ, Zhou S, Weatherby RP',
                journal: 'Journal of Science and Medicine in Sport',
                year: 2006,
                url: 'https://pubmed.ncbi.nlm.nih.gov/16616661/',
                type: 'journal',
              },
            ],
          },
        ],
        quiz: {
          id: 'recovery-tools-quiz',
          questions: [
            {
              id: 'rt-q1',
              question: 'HRV (Heart Rate Variability) is a useful recovery monitoring tool because it reflects:',
              type: 'multiple-choice',
              options: ['Muscle glycogen levels', 'Autonomic nervous system balance and readiness to handle training stress', 'Blood lactate concentration', 'Testosterone-to-cortisol ratio directly'],
              correctIndex: 1,
              explanation: 'HRV reflects the balance between sympathetic and parasympathetic autonomic nervous system activity. High HRV indicates parasympathetic (recovery) dominance and readiness for training stress; low HRV suggests sympathetic dominance from stress, fatigue, or illness.',
            },
            {
              id: 'rt-q2',
              question: 'Regular cold water immersion (ice baths) after every resistance training session is recommended to maximize hypertrophy outcomes.',
              type: 'true-false',
              options: ['True', 'False'],
              correctIndex: 1,
              explanation: 'False. While CWI reduces acute soreness, Peake et al. (2017) and other research demonstrate that chronic post-training CWI blunts mTOR signaling and satellite cell activity — the key pathways for muscle hypertrophy. Reserve CWI for competition recovery, not routine hypertrophy sessions.',
            },
            {
              id: 'rt-q3',
              question: 'Practical strategies to improve sleep for athletes include all of the following EXCEPT:',
              type: 'multiple-choice',
              options: ['Consistent sleep and wake times', 'Cool, dark bedroom environment', 'Blue light exposure in the hour before bed', 'Avoiding caffeine in the 6–8 hours before sleep'],
              correctIndex: 2,
              explanation: 'Blue light exposure in the hour before bed suppresses melatonin secretion and delays sleep onset — it is harmful to sleep quality, not helpful. All other options listed are evidence-supported sleep hygiene practices that improve sleep quality.',
            },
          ],
        },
      },
    ],
  },
];

export const courses: Course[] = [...detailedCourses, ...courseScaffolds];

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
