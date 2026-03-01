import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

// ─── CORS helper ─────────────────────────────────────────────────────────────

// No CORS — this endpoint is admin-only, never called from the browser

// ─── Inline exercise data (mirrors src/data/exercises.ts) ────────────────────

interface ExerciseData {
  id: string;
  name: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string[];
  pattern?: string;
  category: string;
  instructions: string[];
  tips: string[];
}

const EXERCISES: ExerciseData[] = [
  { id: 'barbell-bench-press', name: 'Barbell Bench Press', category: 'strength', primaryMuscles: ['chest'], secondaryMuscles: ['triceps', 'shoulders'], equipment: ['barbell'], pattern: 'push-horizontal', instructions: ['Lie flat on a bench with your eyes under the bar.', 'Grip the bar slightly wider than shoulder-width.', 'Unrack and lower the bar to your mid-chest, keeping elbows at ~75°.', 'Press explosively back to the start, locking out at the top.'], tips: ['Keep your shoulder blades retracted and depressed throughout.', 'Drive your feet into the floor for leg drive.'] },
  { id: 'dumbbell-bench-press', name: 'Dumbbell Bench Press', category: 'strength', primaryMuscles: ['chest'], secondaryMuscles: ['triceps', 'shoulders'], equipment: ['dumbbell'], pattern: 'push-horizontal', instructions: ['Sit on a flat bench with dumbbells resting on your thighs.', 'Lie back, pressing the dumbbells to full extension above your chest.', 'Lower with control, elbows at ~75°, until you feel a stretch in your chest.', 'Press back up to full extension.'], tips: ['Greater range of motion than barbell press.', 'Keep your wrists neutral, not bent.'] },
  { id: 'incline-dumbbell-press', name: 'Incline Dumbbell Press', category: 'strength', primaryMuscles: ['chest'], secondaryMuscles: ['triceps', 'shoulders'], equipment: ['dumbbell'], pattern: 'push-horizontal', instructions: ['Set bench to 30–45° incline.', 'Hold dumbbells at shoulder level, palms forward.', 'Press up and slightly inward until arms are extended.', 'Lower with control to the start.'], tips: ['Targets the upper chest. Avoid going above 45° or it becomes mainly a shoulder exercise.'] },
  { id: 'cable-chest-fly', name: 'Cable Chest Fly', category: 'strength', primaryMuscles: ['chest'], secondaryMuscles: ['shoulders'], equipment: ['cable'], pattern: 'push-horizontal', instructions: ['Set cables at chest height on both sides.', 'Stand in the center, one foot forward for balance.', 'With a slight elbow bend, bring both handles together in front of your chest.', 'Slowly return to the start, feeling a stretch across your chest.'], tips: ['Constant tension throughout the movement. Squeeze hard at the peak contraction.'] },
  { id: 'push-up', name: 'Push-Up', category: 'strength', primaryMuscles: ['chest'], secondaryMuscles: ['triceps', 'shoulders', 'core'], equipment: ['bodyweight'], pattern: 'push-horizontal', instructions: ['Start in a high plank, hands shoulder-width apart.', 'Lower your chest to the floor, keeping your body rigid.', 'Push back up to the start.'], tips: ['Keep your core tight and hips in line with your shoulders throughout.'] },
  { id: 'barbell-row', name: 'Barbell Row', category: 'strength', primaryMuscles: ['back'], secondaryMuscles: ['biceps', 'shoulders'], equipment: ['barbell'], pattern: 'pull-horizontal', instructions: ['Hinge at the hips until your torso is roughly parallel to the floor.', 'Grip the bar just outside shoulder-width.', 'Pull the bar to your lower chest/upper abdomen, driving your elbows back.', 'Lower with control to the start.'], tips: ['Keep your lower back neutral. Do not round.', 'Lead with your elbows, not your hands.'] },
  { id: 'dumbbell-row', name: 'Dumbbell Row', category: 'strength', primaryMuscles: ['back'], secondaryMuscles: ['biceps'], equipment: ['dumbbell'], pattern: 'pull-horizontal', instructions: ['Place one knee and hand on a bench for support.', 'Hold a dumbbell in the opposite hand, arm hanging down.', 'Pull the dumbbell up to your hip, driving your elbow toward the ceiling.', 'Lower slowly to the start.'], tips: ['Think "elbow to the sky", not "hand to hip".'] },
  { id: 'lat-pulldown', name: 'Lat Pulldown', category: 'strength', primaryMuscles: ['back'], secondaryMuscles: ['biceps'], equipment: ['cable', 'machine'], pattern: 'pull-vertical', instructions: ['Sit at a lat pulldown machine, pad securing your thighs.', 'Grip the bar wider than shoulder-width.', 'Pull the bar down to your upper chest, driving your elbows down and back.', 'Control the bar back up to full arm extension.'], tips: ['Lean back slightly at the bottom. Avoid excessive swinging.'] },
  { id: 'pull-up', name: 'Pull-Up', category: 'strength', primaryMuscles: ['back'], secondaryMuscles: ['biceps', 'core'], equipment: ['bodyweight'], pattern: 'pull-vertical', instructions: ['Hang from a bar with an overhand grip, slightly wider than shoulder-width.', 'Pull your chest toward the bar, driving your elbows down and back.', 'Pause at the top, then lower with control.'], tips: ['Avoid kipping (swinging). Slow negatives build strength fast.'] },
  { id: 'seated-cable-row', name: 'Seated Cable Row', category: 'strength', primaryMuscles: ['back'], secondaryMuscles: ['biceps'], equipment: ['cable'], pattern: 'pull-horizontal', instructions: ['Sit at a cable row station, feet on the platform, knees slightly bent.', 'Grip the handle and sit tall with a neutral spine.', 'Pull the handle to your lower abdomen, driving your elbows back.', 'Reach forward to full extension with control.'], tips: ['Do not round your back at the start. Stay upright throughout.'] },
  { id: 'face-pull', name: 'Face Pull', category: 'strength', primaryMuscles: ['shoulders'], secondaryMuscles: ['back'], equipment: ['cable'], pattern: 'pull-horizontal', instructions: ['Set a cable to head height with a rope attachment.', 'Grip the rope with both hands, pull toward your face, separating the ends.', 'External rotate at the top so your forearms are vertical.', 'Return slowly to the start.'], tips: ['Essential for shoulder health. Use light weight and high reps.'] },
  { id: 'overhead-press', name: 'Overhead Press', category: 'strength', primaryMuscles: ['shoulders'], secondaryMuscles: ['triceps', 'core'], equipment: ['barbell'], pattern: 'push-vertical', instructions: ['Stand with a barbell at shoulder height, gripping just outside shoulder-width.', 'Press the bar straight up overhead until arms are locked out.', 'Lower with control to the starting position.'], tips: ['Squeeze your glutes to protect your lower back. Keep your core braced.'] },
  { id: 'dumbbell-lateral-raise', name: 'Dumbbell Lateral Raise', category: 'strength', primaryMuscles: ['shoulders'], secondaryMuscles: [], equipment: ['dumbbell'], pattern: 'isolation', instructions: ['Stand holding dumbbells at your sides.', 'Raise both arms out to the sides until parallel to the floor.', 'Pause briefly at the top, then lower slowly.'], tips: ['Lead with your elbows, not your hands. Use lighter weight than you think.'] },
  { id: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', category: 'strength', primaryMuscles: ['shoulders'], secondaryMuscles: ['triceps'], equipment: ['dumbbell'], pattern: 'push-vertical', instructions: ['Sit or stand holding dumbbells at shoulder height, palms forward.', 'Press up until arms are fully extended.', 'Lower back to shoulder height with control.'], tips: ['Slightly angle the dumbbells inward at the top for a natural arc.'] },
  { id: 'barbell-curl', name: 'Barbell Curl', category: 'strength', primaryMuscles: ['biceps'], secondaryMuscles: [], equipment: ['barbell'], pattern: 'isolation', instructions: ['Stand holding a barbell with an underhand grip, hands shoulder-width.', 'Curl the bar up toward your shoulders, keeping your elbows pinned to your sides.', 'Squeeze your biceps at the top, then lower slowly.'], tips: ['Avoid swinging your torso. Control the negative.'] },
  { id: 'hammer-curl', name: 'Hammer Curl', category: 'strength', primaryMuscles: ['biceps'], secondaryMuscles: [], equipment: ['dumbbell'], pattern: 'isolation', instructions: ['Stand with dumbbells at your sides, palms facing in (neutral grip).', 'Curl both dumbbells up toward your shoulders simultaneously.', 'Lower with control.'], tips: ['Hits the brachialis and brachioradialis as well as the biceps.'] },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', category: 'strength', primaryMuscles: ['triceps'], secondaryMuscles: [], equipment: ['cable'], pattern: 'isolation', instructions: ['Stand at a high cable with a bar or rope attachment.', 'Grip attachment with elbows bent at your sides.', 'Push down until your arms are fully extended.', 'Slowly return to the start.'], tips: ['Keep your elbows tucked and stationary throughout the movement.'] },
  { id: 'skull-crusher', name: 'Skull Crusher', category: 'strength', primaryMuscles: ['triceps'], secondaryMuscles: [], equipment: ['barbell'], pattern: 'isolation', instructions: ['Lie on a bench holding a barbell above your chest with straight arms.', 'Lower the bar toward your forehead by bending only at the elbows.', 'Extend back to the top without moving your upper arms.'], tips: ['Keep your upper arms vertical. Go slow on the way down.'] },
  { id: 'overhead-tricep-extension', name: 'Overhead Tricep Extension', category: 'strength', primaryMuscles: ['triceps'], secondaryMuscles: [], equipment: ['dumbbell', 'cable'], pattern: 'isolation', instructions: ['Hold one dumbbell with both hands above your head, arms fully extended.', 'Lower the dumbbell behind your head by bending your elbows.', 'Extend back to the top.'], tips: ['Full overhead position maximally stretches the long head of the tricep.'] },
  { id: 'barbell-back-squat', name: 'Barbell Back Squat', category: 'strength', primaryMuscles: ['quads'], secondaryMuscles: ['glutes', 'hamstrings', 'core'], equipment: ['barbell'], pattern: 'squat', instructions: ['Set the barbell on your upper traps, grip just outside shoulder-width.', 'Unrack and step back, feet shoulder-width apart, toes slightly out.', 'Squat down until your thighs are at least parallel to the floor.', 'Drive up through your heels back to standing.'], tips: ['Keep your chest up and knees tracking over your toes.', 'Brace your core before descending.'] },
  { id: 'goblet-squat', name: 'Goblet Squat', category: 'strength', primaryMuscles: ['quads'], secondaryMuscles: ['glutes', 'core'], equipment: ['dumbbell', 'kettlebell'], pattern: 'squat', instructions: ['Hold a dumbbell or kettlebell vertically at your chest.', 'Stand with feet slightly wider than shoulder-width, toes out.', 'Squat down between your knees until your thighs are parallel.', 'Drive back up to standing.'], tips: ['Great for beginners to learn squat mechanics. Keep your chest tall throughout.'] },
  { id: 'leg-press', name: 'Leg Press', category: 'strength', primaryMuscles: ['quads'], secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['machine'], pattern: 'squat', instructions: ['Sit in the leg press machine, feet shoulder-width on the platform.', 'Release the safety and lower the platform until knees reach 90°.', 'Press back up to full extension without locking out hard.'], tips: ['Higher foot placement emphasizes glutes/hamstrings; lower placement emphasizes quads.'] },
  { id: 'leg-extension', name: 'Leg Extension', category: 'strength', primaryMuscles: ['quads'], secondaryMuscles: [], equipment: ['machine'], pattern: 'isolation', instructions: ['Sit in the machine with your shins behind the pad.', 'Extend your legs to full extension, squeezing your quads hard at the top.', 'Lower with control.'], tips: ['Isolation exercise. Use as a finisher after compound movements.'] },
  { id: 'walking-lunge', name: 'Walking Lunge', category: 'strength', primaryMuscles: ['quads'], secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['bodyweight', 'dumbbell'], pattern: 'squat', instructions: ['Stand tall with dumbbells at your sides (optional).', 'Step forward with one leg and lower your back knee toward the floor.', 'Drive off your front foot to step through into the next lunge.'], tips: ['Keep your front knee over your ankle, not your toes.'] },
  { id: 'bulgarian-split-squat', name: 'Bulgarian Split Squat', category: 'strength', primaryMuscles: ['quads'], secondaryMuscles: ['glutes', 'hamstrings'], equipment: ['dumbbell', 'barbell', 'bodyweight'], pattern: 'squat', instructions: ['Stand a few feet in front of a bench, rest your rear foot on the bench.', 'Lower your back knee toward the floor until your front thigh is parallel.', 'Drive back up through your front heel.'], tips: ['One of the best single-leg exercises. Expect quad soreness!'] },
  { id: 'romanian-deadlift', name: 'Romanian Deadlift', category: 'strength', primaryMuscles: ['hamstrings'], secondaryMuscles: ['glutes', 'back'], equipment: ['barbell', 'dumbbell'], pattern: 'hinge', instructions: ['Stand holding a barbell at hip level, feet shoulder-width apart.', 'Hinge at the hips, pushing them back as you lower the bar down your legs.', 'Lower until you feel a strong hamstring stretch (just below the knee for most).', 'Drive your hips forward to return to standing.'], tips: ['Keep the bar in contact with your legs throughout. Maintain a neutral spine.'] },
  { id: 'deadlift', name: 'Deadlift', category: 'strength', primaryMuscles: ['back'], secondaryMuscles: ['hamstrings', 'glutes', 'quads', 'core'], equipment: ['barbell'], pattern: 'hinge', instructions: ['Stand with feet hip-width, bar over mid-foot.', 'Hinge down, grip just outside your legs.', 'Brace your core, chest up, and pull the bar up along your legs.', 'Lock out at the top by squeezing your glutes.'], tips: ['Think "push the floor away" not "pull the bar up". Keep your lats engaged.'] },
  { id: 'hip-thrust', name: 'Barbell Hip Thrust', category: 'strength', primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings'], equipment: ['barbell'], pattern: 'hinge', instructions: ['Sit on the floor with your upper back against a bench, barbell over your hips.', 'Plant your feet flat, shoulder-width apart.', 'Drive your hips up until your body forms a straight line from knees to shoulders.', 'Squeeze your glutes hard at the top, then lower.'], tips: ['The best glute isolation exercise. Use a barbell pad for comfort.'] },
  { id: 'glute-bridge', name: 'Glute Bridge', category: 'strength', primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings', 'core'], equipment: ['bodyweight', 'dumbbell'], pattern: 'hinge', instructions: ['Lie on your back with knees bent, feet flat on the floor.', 'Drive your hips up by squeezing your glutes.', 'Pause at the top, then lower.'], tips: ['Beginner-friendly version of hip thrust. Can add a dumbbell on hips for resistance.'] },
  { id: 'leg-curl', name: 'Leg Curl (Machine)', category: 'strength', primaryMuscles: ['hamstrings'], secondaryMuscles: [], equipment: ['machine'], pattern: 'isolation', instructions: ['Lie face-down on the leg curl machine, pad resting on your lower legs.', 'Curl your heels toward your glutes.', 'Pause at peak contraction, then lower slowly.'], tips: ['Plantar flex your feet (toes pointed) to maximize hamstring activation.'] },
  { id: 'standing-calf-raise', name: 'Standing Calf Raise', category: 'strength', primaryMuscles: ['calves'], secondaryMuscles: [], equipment: ['machine', 'bodyweight', 'dumbbell'], pattern: 'isolation', instructions: ['Stand with the balls of your feet on an elevated surface (or flat floor).', 'Rise up onto your toes as high as possible.', 'Pause at the top, then lower fully for a calf stretch at the bottom.'], tips: ['Full range of motion is key — go all the way up and all the way down.'] },
  { id: 'plank', name: 'Plank', category: 'strength', primaryMuscles: ['core'], secondaryMuscles: ['shoulders'], equipment: ['bodyweight'], pattern: 'isolation', instructions: ['Get into a push-up position but rest on your forearms.', 'Keep your body in a straight line from head to heels.', 'Hold for the target duration, breathing steadily.'], tips: ['Do not let your hips sag or rise. Think "long body".'] },
  { id: 'hanging-leg-raise', name: 'Hanging Leg Raise', category: 'strength', primaryMuscles: ['core'], secondaryMuscles: [], equipment: ['bodyweight'], pattern: 'isolation', instructions: ['Hang from a pull-up bar with an overhand grip.', 'Keeping legs straight (or knees bent for easier), raise your legs to hip height or above.', 'Lower slowly, do not swing.'], tips: ['Posterior pelvic tilt at the top for full ab activation.'] },
  { id: 'ab-wheel-rollout', name: 'Ab Wheel Rollout', category: 'strength', primaryMuscles: ['core'], secondaryMuscles: ['shoulders', 'back'], equipment: ['bodyweight'], pattern: 'isolation', instructions: ['Kneel on the floor holding an ab wheel with both hands.', 'Roll forward until your body is nearly parallel to the floor.', 'Pull back using your core (not arms) to return to start.'], tips: ['One of the most demanding core exercises. Start with small range of motion.'] },
  { id: 'kettlebell-swing', name: 'Kettlebell Swing', category: 'cardio', primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings', 'core', 'shoulders'], equipment: ['kettlebell'], pattern: 'hinge', instructions: ['Stand with feet shoulder-width apart, kettlebell on the floor in front.', 'Hinge at the hips, grip the kettlebell, and hike it back between your legs.', 'Drive your hips forward explosively, swinging the kettlebell to shoulder height.', 'Let it swing back and repeat.'], tips: ['It is a hip hinge, not a squat. Power comes from your hips, not your arms.'] },
  { id: 'box-jump', name: 'Box Jump', category: 'cardio', primaryMuscles: ['quads'], secondaryMuscles: ['glutes', 'calves'], equipment: ['bodyweight'], pattern: 'squat', instructions: ['Stand in front of a sturdy box or platform.', 'Swing your arms and bend your knees, then jump onto the box.', 'Land softly with both feet flat, knees slightly bent.', 'Step down carefully and reset.'], tips: ['Start with a lower box and build up. Step down, do not jump down.'] },
  { id: 'mountain-climbers', name: 'Mountain Climbers', category: 'cardio', primaryMuscles: ['core'], secondaryMuscles: ['quads', 'shoulders'], equipment: ['bodyweight'], pattern: 'cardio', instructions: ['Start in a high plank position.', 'Drive one knee toward your chest, then switch legs in a running motion.', 'Keep your hips level and core tight throughout.'], tips: ['Speed it up for a cardio challenge; slow it down for core work.'] },
];

// ─── Inline lesson + course data (mirrors src/data/courses.ts) ───────────────

interface LessonData {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  estimatedMinutes: number;
  courseId: string;
  category: string;
  difficulty: string;
  relatedGoals: string[];
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  relatedGoals: string[];
  tags: string[];
}

const COURSES: CourseData[] = [
  { id: 'strength-foundations', title: 'Foundations of Strength Training', description: 'Learn the core principles that underpin all effective resistance training — from progressive overload to recovery — grounded in exercise science.', category: 'strength-training', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'general-fitness'], tags: ['progressive overload', 'hypertrophy', 'periodization', 'RPE'] },
  { id: 'nutrition-foundations', title: 'Nutrition 101', description: 'Understand the science behind what you eat — macronutrients, energy balance, and evidence-based strategies for performance and body composition.', category: 'nutrition', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'fat-loss', 'general-fitness'], tags: ['protein', 'calories', 'macros', 'energy balance'] },
];

const LESSONS: LessonData[] = [
  // strength-foundations
  { id: 'po-core-principle', title: 'The Core Principle', estimatedMinutes: 5, courseId: 'strength-foundations', category: 'strength-training', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'general-fitness'], keyPoints: ['Progressive overload means continuously challenging muscles beyond their current capacity.', 'Without increasing challenge, the body stops adapting — a state called accommodation.', 'Both load (weight) and volume (sets × reps) can be progressed.', 'Adaptations include neural efficiency gains (strength) and muscle fiber growth (hypertrophy).'], content: 'Progressive overload is the most fundamental principle in strength and muscle development. Put simply: gradually increase the demand placed on your muscles over time so the body must keep adapting. The physiological basis comes from Hans Selye\'s General Adaptation Syndrome (GAS). When a new stress is applied, the body passes through three stages — alarm (initial shock), resistance (adaptation), and exhaustion (if overloaded without recovery). Intelligent training applies enough stress to trigger adaptation without pushing into exhaustion. In practice, performing 3 sets of 10 at 60 kg every session indefinitely will eventually stop producing results because the stimulus is no longer novel. Research by Schoenfeld (2010) confirms that progressive increases in training volume and load are the primary drivers of both strength gains (via neural adaptations) and hypertrophy (via structural changes in muscle fiber size and cross-sectional area).' },
  { id: 'po-how-to-apply', title: 'How to Apply Progressive Overload', estimatedMinutes: 5, courseId: 'strength-foundations', category: 'strength-training', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'general-fitness'], keyPoints: ['Progressive overload can be applied via load, reps, sets, density, or technique.', 'Double progression: extend reps to the top of a target range, then increase load.', 'A training log is essential — you can only beat your previous performance if you recorded it.', 'Volume has a dose-response relationship with hypertrophy up to maximum recoverable volume.'], content: 'There are several ways to apply progressive overload. Understanding them gives flexibility to keep progressing even when one pathway stalls. Increase load (weight): add weight to the bar. For beginners, linear progression is highly effective. Increase reps at the same load: work from 3×8 up to 3×12 before increasing weight. This double progression method is practical and sustainable. Increase sets (volume): adding a set raises total training volume. A meta-analysis by Krieger (2010) found a clear dose-response relationship between volume and hypertrophy. Improve technique and range of motion: executing a lift through full range increases the stretch stimulus and mechanical tension on muscle tissue. For all of this to work, tracking a training log is the single most important habit.' },
  { id: 'rr-continuum', title: 'The Rep Range Continuum', estimatedMinutes: 6, courseId: 'strength-foundations', category: 'strength-training', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'general-fitness'], keyPoints: ['Low reps (1–5) primarily develop maximal strength through neural adaptations.', 'Moderate (6–12) and high (15–30) reps produce similar hypertrophy when trained close to failure.', 'Proximity to failure matters more than the specific rep range for building muscle.', 'A variety of rep ranges provides both strength and hypertrophy stimuli.'], content: 'Different rep ranges drive different physiological adaptations — though there is far more overlap than traditionally thought. Low reps (1–5): Strength and neural adaptations. Heavy, low-rep training primarily drives improvements in motor unit recruitment, firing rate, and inter-muscular coordination. Moderate reps (6–12): The hypertrophy sweet spot. This range balances sufficient mechanical tension with enough metabolic stress and time under tension to drive hypertrophic signaling. High reps (15–30+): Metabolic stress and muscular endurance. A landmark 2017 meta-analysis by Schoenfeld et al. found that, when sets are taken close to failure, moderate and high rep ranges produce similar hypertrophy. For hypertrophy, a broad rep range (5–30) trained close to failure is effective.' },
  { id: 'rr-rpe', title: 'Training Intensity with RPE', estimatedMinutes: 4, courseId: 'strength-foundations', category: 'strength-training', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'general-fitness'], keyPoints: ['RPE 10 = absolute failure; RPE 8 = 2 reps left in reserve (2 RIR).', 'Training in the RPE 7–9 range balances hypertrophic stimulus with fatigue management.', 'Sets closest to failure ("effective reps") are believed to drive the most hypertrophic signal.', 'Beginners should prioritize technique at lower RPE before pushing high intensities.'], content: 'RPE — Rate of Perceived Exertion — quantifies how hard a set feels relative to your maximum. In resistance training it is typically expressed on a 1–10 scale, where 10 is absolute failure and 8 means roughly 2 reps left in reserve (RIR: Reps In Reserve). Research by Helms et al. (2016) validated that trained individuals can accurately self-regulate intensity using RPE, and that training consistently in the RPE 7–9 range is effective for both strength and hypertrophy while managing fatigue and injury risk. Training to absolute failure every set is not necessary and accumulates excess fatigue. The evidence supports the idea that "effective reps" — those closest to failure — drive the most adaptation.' },
  { id: 'ra-sra', title: 'The Stimulus–Recovery–Adaptation Cycle', estimatedMinutes: 6, courseId: 'strength-foundations', category: 'strength-training', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'general-fitness'], keyPoints: ['Gains occur during recovery, not during the workout itself.', 'Sleep, protein, and caloric sufficiency are the raw materials for adaptation.', 'Supercompensation: the body rebuilds tissue slightly above its previous baseline.', 'Retraining too early accumulates fatigue; too late and supercompensation fades.', 'Training each muscle 2× per week is an evidence-based minimum frequency for hypertrophy.'], content: 'Every time you train, you are not directly building muscle in the gym — you are creating the stimulus that triggers adaptation during recovery. Stimulus: Training creates micro-damage to muscle fibers and depletes energy substrates. This disruption triggers biochemical signals including mTOR pathway activation and satellite cell recruitment. Recovery: In the hours and days after training, the body repairs damaged tissue, replenishes glycogen stores, and synthesizes new muscle protein. This is where actual gains occur. Recovery requires adequate sleep, protein, and calories. Adaptation (Supercompensation): If recovery is complete, repaired tissue is slightly stronger or larger than before. Research suggests training each muscle group twice per week is an effective minimum.' },
  // nutrition-foundations
  { id: 'macro-protein', title: 'Protein: The Building Block', estimatedMinutes: 5, courseId: 'nutrition-foundations', category: 'nutrition', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'fat-loss', 'general-fitness'], keyPoints: ['Protein provides amino acids for muscle protein synthesis (MPS) and is highly satiating.', 'The RDA (0.8 g/kg) is for sedentary populations — active individuals benefit from more.', 'Research supports 1.6–2.2 g/kg/day for those doing regular resistance training.', 'Spreading protein across 4–5 meals per day may modestly improve MPS stimulation.'], content: 'Protein is made up of amino acids — the structural units of muscle tissue, enzymes, and hormones. When you eat protein, it is digested into amino acids and used to build and repair tissue based on the body\'s current needs. For people who train, protein serves two critical roles: providing substrate (amino acids) for muscle protein synthesis (MPS), and being highly satiating, which helps manage total caloric intake. For individuals engaged in regular resistance training, research consistently supports intakes of 1.6–2.2 g per kg of body weight per day as optimal for maximizing MPS. A landmark meta-analysis by Morton et al. (2018) analyzed 49 studies and found that protein intakes beyond approximately 1.62 g/kg/day produced no further significant gains in fat-free mass.' },
  { id: 'macro-carbs', title: 'Carbohydrates: Fuel for Performance', estimatedMinutes: 5, courseId: 'nutrition-foundations', category: 'nutrition', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'fat-loss', 'general-fitness'], keyPoints: ['Muscle glycogen — stored carbohydrate — is the primary fuel for resistance training.', 'Low glycogen states impair volume capacity, strength output, and focus.', 'Adequate carbohydrates "spare" protein for muscle repair and synthesis.', 'Active individuals typically benefit from 3–7 g/kg/day, varying with training load.'], content: 'Carbohydrates are the body\'s preferred fuel for high-intensity activity. After digestion, glucose is either used immediately or stored as glycogen in the liver and muscles. Muscle glycogen is the primary fuel for resistance training and most forms of intense exercise. Research consistently shows that muscle glycogen availability directly impacts training performance. Low glycogen states reduce volume capacity, power output, and mental focus during sessions. The "protein-sparing" effect means more dietary protein reaches muscle tissue for repair and growth. Carbohydrates stimulate insulin secretion, which facilitates glucose uptake into muscle cells and helps shuttle amino acids into muscle tissue. Evidence-based guidance supports 3–7 g/kg/day of carbohydrates for most active individuals.' },
  { id: 'macro-fats', title: 'Dietary Fat: Essential, Not the Enemy', estimatedMinutes: 4, courseId: 'nutrition-foundations', category: 'nutrition', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'fat-loss', 'general-fitness'], keyPoints: ['Fat is essential for hormone production, cell membrane health, and fat-soluble vitamin absorption.', 'Very low-fat diets (<15% of calories) are associated with reduced testosterone in men.', 'Omega-3 fatty acids (fatty fish, flaxseed) support anti-inflammatory signaling and recovery.', 'Target 20–35% of total calories from fat, prioritizing whole-food sources.'], content: 'Dietary fat has been vilified and rehabilitated multiple times. The current scientific consensus is more nuanced: fat is essential, and cutting it too low has clear consequences. Hormonal health: Dietary fat is necessary for testosterone and other steroid hormone production. Studies have shown that very low-fat diets (below ~15% of calories from fat) are associated with reduced testosterone levels. Cell membrane integrity: Adequate fat intake — especially omega-3 fatty acids — supports membrane fluidity and anti-inflammatory signaling. Fat-soluble vitamins: Vitamins A, D, E, and K require dietary fat for absorption. For most active individuals, targeting 20–35% of total calories from fat is well-supported, with an emphasis on olive oil, nuts, avocado, and fatty fish for omega-3s.' },
  { id: 'eb-calories', title: 'The Law of Energy Balance', estimatedMinutes: 5, courseId: 'nutrition-foundations', category: 'nutrition', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'fat-loss', 'general-fitness'], keyPoints: ['Total caloric balance is the primary determinant of weight gain or loss.', 'TDEE = BMR + TEF + EAT + NEAT; NEAT is the most variable component.', 'A modest surplus (200–500 kcal) supports muscle gain with minimal fat accumulation.', 'A caloric deficit is required for fat loss; size of deficit affects rate and muscle retention.', 'Metabolic adaptation (reduced BMR and NEAT) occurs during prolonged caloric restriction.'], content: 'Energy balance is the fundamental equation governing body composition: calories consumed versus calories expended. All controlled research confirms that total energy balance is the primary determinant of weight gain or loss. Energy in: Calories come from protein (4 kcal/g), carbohydrates (4 kcal/g), and fat (9 kcal/g). TDEE components: Basal Metabolic Rate (BMR) — energy to sustain life at rest (~60–70% of TDEE). Thermic Effect of Food (TEF) — energy to digest and metabolize food (~10%). Exercise Activity Thermogenesis (EAT) — deliberate exercise. Non-Exercise Activity Thermogenesis (NEAT) — all movement outside formal exercise. To gain muscle, a modest surplus (200–500 kcal above maintenance) provides energy for new tissue synthesis. Metabolic adaptation occurs during prolonged restriction.' },
  { id: 'eb-tdee', title: 'Estimating Your Caloric Needs', estimatedMinutes: 5, courseId: 'nutrition-foundations', category: 'nutrition', difficulty: 'beginner', relatedGoals: ['hypertrophy', 'fat-loss', 'general-fitness'], keyPoints: ['The Mifflin-St Jeor equation is the most validated BMR formula for most individuals.', 'Multiply BMR by an activity factor (1.2–1.725) to estimate TDEE.', 'Add 200–500 kcal for muscle gain; subtract 300–500 kcal for fat loss.', 'Formulas are estimates — track weekly bodyweight trends and adjust every 2 weeks.'], content: 'Estimating your Total Daily Energy Expenditure (TDEE) is the starting point for any nutrition strategy. The Mifflin-St Jeor equation is most validated: Men: BMR = (10 × kg) + (6.25 × cm) − (5 × age) + 5; Women: BMR = (10 × kg) + (6.25 × cm) − (5 × age) − 161. Apply an activity multiplier: Sedentary: BMR × 1.2, Lightly active: BMR × 1.375, Moderately active: BMR × 1.55, Very active: BMR × 1.725. Set caloric target based on goal: Maintenance: TDEE, Lean bulking: TDEE + 200–300 kcal, Muscle building: TDEE + 300–500 kcal, Fat loss: TDEE − 300–500 kcal. These are estimates — track your weekly average bodyweight and adjust calories by 100–200 kcal every 1–2 weeks based on observed trends.' },
];

// ─── Build embedding texts ────────────────────────────────────────────────────

function exerciseEmbedText(e: ExerciseData): string {
  return [
    `${e.name}.`,
    `Primary muscles: ${e.primaryMuscles.join(', ')}.`,
    e.secondaryMuscles.length ? `Secondary muscles: ${e.secondaryMuscles.join(', ')}.` : '',
    e.pattern ? `Movement pattern: ${e.pattern}.` : '',
    `Category: ${e.category}.`,
    `Equipment: ${e.equipment.join(', ')}.`,
    e.instructions.join(' '),
    e.tips.join(' '),
  ].filter(Boolean).join(' ');
}

function lessonEmbedText(l: LessonData): string {
  return [
    `${l.title}.`,
    `Key points: ${l.keyPoints.join('; ')}.`,
    l.content.slice(0, 600),
  ].join(' ');
}

function courseEmbedText(c: CourseData): string {
  return [
    `${c.title}.`,
    c.description,
    `Tags: ${c.tags.join(', ')}.`,
    `Category: ${c.category}.`,
  ].join(' ');
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Secret must be passed as a header, never in the request body (body appears in logs)
  const adminKey = req.headers['x-admin-key'];
  if (!adminKey || adminKey !== process.env.SEED_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!openaiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
  if (!supabaseUrl || !supabaseServiceKey) return res.status(500).json({ error: 'Supabase env vars not configured' });

  const openai = new OpenAI({ apiKey: openaiKey });
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const errors: string[] = [];

  try {
    // ── Batch 1: Embed all exercises ──────────────────────────────────────────
    const exerciseTexts = EXERCISES.map(exerciseEmbedText);
    const exerciseEmbedRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: exerciseTexts,
    });

    const exerciseRows = EXERCISES.map((e, i) => ({
      id: e.id,
      embedding: exerciseEmbedRes.data[i].embedding,
      metadata: {
        name: e.name,
        primaryMuscles: e.primaryMuscles,
        secondaryMuscles: e.secondaryMuscles,
        pattern: e.pattern ?? null,
        category: e.category,
        equipment: e.equipment,
      },
    }));

    const { error: exErr } = await supabase
      .from('exercise_embeddings')
      .upsert(exerciseRows, { onConflict: 'id' });
    if (exErr) errors.push(`exercise_embeddings upsert: ${exErr.message}`);

    // ── Batch 2: Embed all lessons + courses ──────────────────────────────────
    const lessonTexts = LESSONS.map(lessonEmbedText);
    const courseTexts = COURSES.map(courseEmbedText);
    const allContentTexts = [...lessonTexts, ...courseTexts];

    const contentEmbedRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: allContentTexts,
    });

    const lessonRows = LESSONS.map((l, i) => ({
      id: l.id,
      type: 'lesson',
      embedding: contentEmbedRes.data[i].embedding,
      metadata: {
        title: l.title,
        courseId: l.courseId,
        category: l.category,
        difficulty: l.difficulty,
        relatedGoals: l.relatedGoals,
        estimatedMinutes: l.estimatedMinutes,
      },
    }));

    const courseRows = COURSES.map((c, i) => ({
      id: c.id,
      type: 'course',
      embedding: contentEmbedRes.data[LESSONS.length + i].embedding,
      metadata: {
        title: c.title,
        category: c.category,
        difficulty: c.difficulty,
        relatedGoals: c.relatedGoals,
        tags: c.tags,
      },
    }));

    const { error: contentErr } = await supabase
      .from('content_embeddings')
      .upsert([...lessonRows, ...courseRows], { onConflict: 'id' });
    if (contentErr) errors.push(`content_embeddings upsert: ${contentErr.message}`);

    return res.status(200).json({
      seeded: {
        exercises: exerciseRows.length,
        lessons: lessonRows.length,
        courses: courseRows.length,
      },
      errors,
    });
  } catch (err: unknown) {
    console.error('[/api/seed-embeddings]', err);
    const msg = err instanceof Error ? err.message : 'Seeding failed';
    return res.status(500).json({ error: msg });
  }
}
