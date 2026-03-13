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

// ─── Course Scaffolds (Sprint D–E will populate full content) ─────────────────

const courseScaffolds: Course[] = [
  // ── Foundations (3 more — Sprint D will add full lessons) ──────────────────
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
    modules: [],
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
