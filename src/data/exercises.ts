import type { Exercise } from '../types';

export const exercises: Exercise[] = [
  // ── CHEST ──────────────────────────────────────────────────────────────────
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    category: 'strength',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: ['barbell'],
    instructions: [
      'Lie flat on a bench with your eyes under the bar.',
      'Grip the bar slightly wider than shoulder-width.',
      'Unrack and lower the bar to your mid-chest, keeping elbows at ~75°.',
      'Press explosively back to the start, locking out at the top.',
    ],
    tips: ['Keep your shoulder blades retracted and depressed throughout.', 'Drive your feet into the floor for leg drive.'],
    pattern: 'push-horizontal',
  },
  {
    id: 'dumbbell-bench-press',
    name: 'Dumbbell Bench Press',
    category: 'strength',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: ['dumbbell'],
    instructions: [
      'Sit on a flat bench with dumbbells resting on your thighs.',
      'Lie back, pressing the dumbbells to full extension above your chest.',
      'Lower with control, elbows at ~75°, until you feel a stretch in your chest.',
      'Press back up to full extension.',
    ],
    tips: ['Greater range of motion than barbell press.', 'Keep your wrists neutral, not bent.'],
    pattern: 'push-horizontal',
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'strength',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: ['dumbbell'],
    instructions: [
      'Set bench to 30–45° incline.',
      'Hold dumbbells at shoulder level, palms forward.',
      'Press up and slightly inward until arms are extended.',
      'Lower with control to the start.',
    ],
    tips: ['Targets the upper chest. Avoid going above 45° or it becomes mainly a shoulder exercise.'],
    pattern: 'push-horizontal',
  },
  {
    id: 'cable-chest-fly',
    name: 'Cable Chest Fly',
    category: 'strength',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders'],
    equipment: ['cable'],
    instructions: [
      'Set cables at chest height on both sides.',
      'Stand in the center, one foot forward for balance.',
      'With a slight elbow bend, bring both handles together in front of your chest.',
      'Slowly return to the start, feeling a stretch across your chest.',
    ],
    tips: ['Constant tension throughout the movement. Squeeze hard at the peak contraction.'],
    pattern: 'push-horizontal',
  },
  {
    id: 'push-up',
    name: 'Push-Up',
    category: 'strength',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders', 'core'],
    equipment: ['bodyweight'],
    instructions: [
      'Start in a high plank, hands shoulder-width apart.',
      'Lower your chest to the floor, keeping your body rigid.',
      'Push back up to the start.',
    ],
    tips: ['Keep your core tight and hips in line with your shoulders throughout.'],
    pattern: 'push-horizontal',
  },

  // ── BACK ───────────────────────────────────────────────────────────────────
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    category: 'strength',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: ['barbell'],
    instructions: [
      'Hinge at the hips until your torso is roughly parallel to the floor.',
      'Grip the bar just outside shoulder-width.',
      'Pull the bar to your lower chest/upper abdomen, driving your elbows back.',
      'Lower with control to the start.',
    ],
    tips: ['Keep your lower back neutral. Do not round.', 'Lead with your elbows, not your hands.'],
    pattern: 'pull-horizontal',
  },
  {
    id: 'dumbbell-row',
    name: 'Dumbbell Row',
    category: 'strength',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    equipment: ['dumbbell'],
    instructions: [
      'Place one knee and hand on a bench for support.',
      'Hold a dumbbell in the opposite hand, arm hanging down.',
      'Pull the dumbbell up to your hip, driving your elbow toward the ceiling.',
      'Lower slowly to the start.',
    ],
    tips: ['Think "elbow to the sky", not "hand to hip".'],
    pattern: 'pull-horizontal',
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'strength',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    equipment: ['cable', 'machine'],
    instructions: [
      'Sit at a lat pulldown machine, pad securing your thighs.',
      'Grip the bar wider than shoulder-width.',
      'Pull the bar down to your upper chest, driving your elbows down and back.',
      'Control the bar back up to full arm extension.',
    ],
    tips: ['Lean back slightly at the bottom. Avoid excessive swinging.'],
    pattern: 'pull-vertical',
  },
  {
    id: 'pull-up',
    name: 'Pull-Up',
    category: 'strength',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps', 'core'],
    equipment: ['bodyweight'],
    instructions: [
      'Hang from a bar with an overhand grip, slightly wider than shoulder-width.',
      'Pull your chest toward the bar, driving your elbows down and back.',
      'Pause at the top, then lower with control.',
    ],
    tips: ['Avoid kipping (swinging). Slow negatives build strength fast.'],
    pattern: 'pull-vertical',
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    category: 'strength',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    equipment: ['cable'],
    instructions: [
      'Sit at a cable row station, feet on the platform, knees slightly bent.',
      'Grip the handle and sit tall with a neutral spine.',
      'Pull the handle to your lower abdomen, driving your elbows back.',
      'Reach forward to full extension with control.',
    ],
    tips: ['Do not round your back at the start. Stay upright throughout.'],
    pattern: 'pull-horizontal',
  },
  {
    id: 'face-pull',
    name: 'Face Pull',
    category: 'strength',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['back'],
    equipment: ['cable'],
    instructions: [
      'Set a cable to head height with a rope attachment.',
      'Grip the rope with both hands, pull toward your face, separating the ends.',
      'External rotate at the top so your forearms are vertical.',
      'Return slowly to the start.',
    ],
    tips: ['Essential for shoulder health. Use light weight and high reps.'],
    pattern: 'pull-horizontal',
  },

  // ── SHOULDERS ──────────────────────────────────────────────────────────────
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'strength',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'core'],
    equipment: ['barbell'],
    instructions: [
      'Stand with a barbell at shoulder height, gripping just outside shoulder-width.',
      'Press the bar straight up overhead until arms are locked out.',
      'Lower with control to the starting position.',
    ],
    tips: ['Squeeze your glutes to protect your lower back. Keep your core braced.'],
    pattern: 'push-vertical',
  },
  {
    id: 'dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    category: 'strength',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: [],
    equipment: ['dumbbell'],
    instructions: [
      'Stand holding dumbbells at your sides.',
      'Raise both arms out to the sides until parallel to the floor.',
      'Pause briefly at the top, then lower slowly.',
    ],
    tips: ['Lead with your elbows, not your hands. Use lighter weight than you think.'],
    pattern: 'isolation',
  },
  {
    id: 'dumbbell-shoulder-press',
    name: 'Dumbbell Shoulder Press',
    category: 'strength',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps'],
    equipment: ['dumbbell'],
    instructions: [
      'Sit or stand holding dumbbells at shoulder height, palms forward.',
      'Press up until arms are fully extended.',
      'Lower back to shoulder height with control.',
    ],
    tips: ['Slightly angle the dumbbells inward at the top for a natural arc.'],
    pattern: 'push-vertical',
  },

  // ── ARMS ───────────────────────────────────────────────────────────────────
  {
    id: 'barbell-curl',
    name: 'Barbell Curl',
    category: 'strength',
    primaryMuscles: ['biceps'],
    secondaryMuscles: [],
    equipment: ['barbell'],
    instructions: [
      'Stand holding a barbell with an underhand grip, hands shoulder-width.',
      'Curl the bar up toward your shoulders, keeping your elbows pinned to your sides.',
      'Squeeze your biceps at the top, then lower slowly.',
    ],
    tips: ['Avoid swinging your torso. Control the negative.'],
    pattern: 'isolation',
  },
  {
    id: 'hammer-curl',
    name: 'Hammer Curl',
    category: 'strength',
    primaryMuscles: ['biceps'],
    secondaryMuscles: [],
    equipment: ['dumbbell'],
    instructions: [
      'Stand with dumbbells at your sides, palms facing in (neutral grip).',
      'Curl both dumbbells up toward your shoulders simultaneously.',
      'Lower with control.',
    ],
    tips: ['Hits the brachialis and brachioradialis as well as the biceps.'],
    pattern: 'isolation',
  },
  {
    id: 'tricep-pushdown',
    name: 'Tricep Pushdown',
    category: 'strength',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    equipment: ['cable'],
    instructions: [
      'Stand at a high cable with a bar or rope attachment.',
      'Grip attachment with elbows bent at your sides.',
      'Push down until your arms are fully extended.',
      'Slowly return to the start.',
    ],
    tips: ['Keep your elbows tucked and stationary throughout the movement.'],
    pattern: 'isolation',
  },
  {
    id: 'skull-crusher',
    name: 'Skull Crusher',
    category: 'strength',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    equipment: ['barbell'],
    instructions: [
      'Lie on a bench holding a barbell above your chest with straight arms.',
      'Lower the bar toward your forehead by bending only at the elbows.',
      'Extend back to the top without moving your upper arms.',
    ],
    tips: ['Keep your upper arms vertical. Go slow on the way down.'],
    pattern: 'isolation',
  },
  {
    id: 'overhead-tricep-extension',
    name: 'Overhead Tricep Extension',
    category: 'strength',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    equipment: ['dumbbell', 'cable'],
    instructions: [
      'Hold one dumbbell with both hands above your head, arms fully extended.',
      'Lower the dumbbell behind your head by bending your elbows.',
      'Extend back to the top.',
    ],
    tips: ['Full overhead position maximally stretches the long head of the tricep.'],
    pattern: 'isolation',
  },

  // ── QUADS / LEGS ───────────────────────────────────────────────────────────
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    category: 'strength',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes', 'hamstrings', 'core'],
    equipment: ['barbell'],
    instructions: [
      'Set the barbell on your upper traps, grip just outside shoulder-width.',
      'Unrack and step back, feet shoulder-width apart, toes slightly out.',
      'Squat down until your thighs are at least parallel to the floor.',
      'Drive up through your heels back to standing.',
    ],
    tips: ['Keep your chest up and knees tracking over your toes.', 'Brace your core before descending.'],
    pattern: 'squat',
  },
  {
    id: 'goblet-squat',
    name: 'Goblet Squat',
    category: 'strength',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes', 'core'],
    equipment: ['dumbbell', 'kettlebell'],
    instructions: [
      'Hold a dumbbell or kettlebell vertically at your chest.',
      'Stand with feet slightly wider than shoulder-width, toes out.',
      'Squat down between your knees until your thighs are parallel.',
      'Drive back up to standing.',
    ],
    tips: ['Great for beginners to learn squat mechanics. Keep your chest tall throughout.'],
    pattern: 'squat',
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'strength',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: ['machine'],
    instructions: [
      'Sit in the leg press machine, feet shoulder-width on the platform.',
      'Release the safety and lower the platform until knees reach 90°.',
      'Press back up to full extension without locking out hard.',
    ],
    tips: ['Higher foot placement emphasizes glutes/hamstrings; lower placement emphasizes quads.'],
    pattern: 'squat',
  },
  {
    id: 'leg-extension',
    name: 'Leg Extension',
    category: 'strength',
    primaryMuscles: ['quads'],
    secondaryMuscles: [],
    equipment: ['machine'],
    instructions: [
      'Sit in the machine with your shins behind the pad.',
      'Extend your legs to full extension, squeezing your quads hard at the top.',
      'Lower with control.',
    ],
    tips: ['Isolation exercise. Use as a finisher after compound movements.'],
    pattern: 'isolation',
  },
  {
    id: 'walking-lunge',
    name: 'Walking Lunge',
    category: 'strength',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: ['bodyweight', 'dumbbell'],
    instructions: [
      'Stand tall with dumbbells at your sides (optional).',
      'Step forward with one leg and lower your back knee toward the floor.',
      'Drive off your front foot to step through into the next lunge.',
    ],
    tips: ['Keep your front knee over your ankle, not your toes.'],
    pattern: 'squat',
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    category: 'strength',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: ['dumbbell', 'barbell', 'bodyweight'],
    instructions: [
      'Stand a few feet in front of a bench, rest your rear foot on the bench.',
      'Lower your back knee toward the floor until your front thigh is parallel.',
      'Drive back up through your front heel.',
    ],
    tips: ['One of the best single-leg exercises. Expect quad soreness!'],
    pattern: 'squat',
  },

  // ── HAMSTRINGS / GLUTES ────────────────────────────────────────────────────
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'strength',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['glutes', 'back'],
    equipment: ['barbell', 'dumbbell'],
    instructions: [
      'Stand holding a barbell at hip level, feet shoulder-width apart.',
      'Hinge at the hips, pushing them back as you lower the bar down your legs.',
      'Lower until you feel a strong hamstring stretch (just below the knee for most).',
      'Drive your hips forward to return to standing.',
    ],
    tips: ['Keep the bar in contact with your legs throughout. Maintain a neutral spine.'],
    pattern: 'hinge',
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'strength',
    primaryMuscles: ['back'],
    secondaryMuscles: ['hamstrings', 'glutes', 'quads', 'core'],
    equipment: ['barbell'],
    instructions: [
      'Stand with feet hip-width, bar over mid-foot.',
      'Hinge down, grip just outside your legs.',
      'Brace your core, chest up, and pull the bar up along your legs.',
      'Lock out at the top by squeezing your glutes.',
    ],
    tips: ['Think "push the floor away" not "pull the bar up". Keep your lats engaged.'],
    pattern: 'hinge',
  },
  {
    id: 'hip-thrust',
    name: 'Barbell Hip Thrust',
    category: 'strength',
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings'],
    equipment: ['barbell'],
    instructions: [
      'Sit on the floor with your upper back against a bench, barbell over your hips.',
      'Plant your feet flat, shoulder-width apart.',
      'Drive your hips up until your body forms a straight line from knees to shoulders.',
      'Squeeze your glutes hard at the top, then lower.',
    ],
    tips: ['The best glute isolation exercise. Use a barbell pad for comfort.'],
    pattern: 'hinge',
  },
  {
    id: 'glute-bridge',
    name: 'Glute Bridge',
    category: 'strength',
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings', 'core'],
    equipment: ['bodyweight', 'dumbbell'],
    instructions: [
      'Lie on your back with knees bent, feet flat on the floor.',
      'Drive your hips up by squeezing your glutes.',
      'Pause at the top, then lower.',
    ],
    tips: ['Beginner-friendly version of hip thrust. Can add a dumbbell on hips for resistance.'],
    pattern: 'hinge',
  },
  {
    id: 'leg-curl',
    name: 'Leg Curl (Machine)',
    category: 'strength',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: [],
    equipment: ['machine'],
    instructions: [
      'Lie face-down on the leg curl machine, pad resting on your lower legs.',
      'Curl your heels toward your glutes.',
      'Pause at peak contraction, then lower slowly.',
    ],
    tips: ['Plantar flex your feet (toes pointed) to maximize hamstring activation.'],
    pattern: 'isolation',
  },

  // ── CALVES & CORE ──────────────────────────────────────────────────────────
  {
    id: 'standing-calf-raise',
    name: 'Standing Calf Raise',
    category: 'strength',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    equipment: ['machine', 'bodyweight', 'dumbbell'],
    instructions: [
      'Stand with the balls of your feet on an elevated surface (or flat floor).',
      'Rise up onto your toes as high as possible.',
      'Pause at the top, then lower fully for a calf stretch at the bottom.',
    ],
    tips: ['Full range of motion is key — go all the way up and all the way down.'],
    pattern: 'isolation',
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'strength',
    primaryMuscles: ['core'],
    secondaryMuscles: ['shoulders'],
    equipment: ['bodyweight'],
    instructions: [
      'Get into a push-up position but rest on your forearms.',
      'Keep your body in a straight line from head to heels.',
      'Hold for the target duration, breathing steadily.',
    ],
    tips: ['Do not let your hips sag or rise. Think "long body".'],
    pattern: 'isolation',
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg Raise',
    category: 'strength',
    primaryMuscles: ['core'],
    secondaryMuscles: [],
    equipment: ['bodyweight'],
    instructions: [
      'Hang from a pull-up bar with an overhand grip.',
      'Keeping legs straight (or knees bent for easier), raise your legs to hip height or above.',
      'Lower slowly, do not swing.',
    ],
    tips: ['Posterior pelvic tilt at the top for full ab activation.'],
    pattern: 'isolation',
  },
  {
    id: 'ab-wheel-rollout',
    name: 'Ab Wheel Rollout',
    category: 'strength',
    primaryMuscles: ['core'],
    secondaryMuscles: ['shoulders', 'back'],
    equipment: ['bodyweight'],
    instructions: [
      'Kneel on the floor holding an ab wheel with both hands.',
      'Roll forward until your body is nearly parallel to the floor.',
      'Pull back using your core (not arms) to return to start.',
    ],
    tips: ['One of the most demanding core exercises. Start with small range of motion.'],
    pattern: 'isolation',
  },

  // ── CARDIO ─────────────────────────────────────────────────────────────────
  {
    id: 'kettlebell-swing',
    name: 'Kettlebell Swing',
    category: 'cardio',
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings', 'core', 'shoulders'],
    equipment: ['kettlebell'],
    instructions: [
      'Stand with feet shoulder-width apart, kettlebell on the floor in front.',
      'Hinge at the hips, grip the kettlebell, and hike it back between your legs.',
      'Drive your hips forward explosively, swinging the kettlebell to shoulder height.',
      'Let it swing back and repeat.',
    ],
    tips: ['It is a hip hinge, not a squat. Power comes from your hips, not your arms.'],
    pattern: 'hinge',
  },
  {
    id: 'box-jump',
    name: 'Box Jump',
    category: 'cardio',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes', 'calves'],
    equipment: ['bodyweight'],
    instructions: [
      'Stand in front of a sturdy box or platform.',
      'Swing your arms and bend your knees, then jump onto the box.',
      'Land softly with both feet flat, knees slightly bent.',
      'Step down carefully and reset.',
    ],
    tips: ['Start with a lower box and build up. Step down, do not jump down.'],
    pattern: 'squat',
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'cardio',
    primaryMuscles: ['core'],
    secondaryMuscles: ['quads', 'shoulders'],
    equipment: ['bodyweight'],
    instructions: [
      'Start in a high plank position.',
      'Drive one knee toward your chest, then switch legs in a running motion.',
      'Keep your hips level and core tight throughout.',
    ],
    tips: ['Speed it up for a cardio challenge; slow it down for core work.'],
    pattern: 'cardio',
  },

  // ── NEW EXERCISES ───────────────────────────────────────────────────────────
  {
    id: 'dips',
    name: 'Dips',
    category: 'strength',
    primaryMuscles: ['triceps'],
    secondaryMuscles: ['chest', 'shoulders'],
    equipment: ['bodyweight'],
    instructions: [
      'Grip parallel bars and lock your arms out at the top, body straight.',
      'Lower yourself by bending your elbows, leaning slightly forward to emphasise the chest.',
      'Descend until your upper arms are at least parallel to the floor.',
      'Press back up to full elbow extension.',
    ],
    tips: [
      'Lean forward more to shift emphasis to the chest; stay more upright to hit triceps.',
      'Keep elbows tracking back, not flaring wide, to protect the shoulder joint.',
      'Add weight with a dip belt once bodyweight becomes too easy.',
    ],
    pattern: 'push-horizontal',
  },
  {
    id: 'incline-barbell-press',
    name: 'Incline Barbell Press',
    category: 'strength',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: ['barbell'],
    instructions: [
      'Set the bench to 30–45° incline. Lie back with eyes under the bar.',
      'Grip the bar slightly wider than shoulder-width.',
      'Unrack and lower the bar to your upper chest with controlled tempo.',
      'Press explosively back to full extension.',
    ],
    tips: [
      'A 30° angle targets the upper chest best; beyond 45° shifts too much load onto the shoulders.',
      'Keep your shoulder blades pinched together throughout the set.',
      'Control the eccentric (lowering) for maximum upper chest development.',
    ],
    pattern: 'push-horizontal',
  },
  {
    id: 'rear-delt-fly',
    name: 'Rear Delt Fly',
    category: 'strength',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['back'],
    equipment: ['dumbbell'],
    instructions: [
      'Hinge at the hips until your torso is nearly parallel to the floor.',
      'Hold dumbbells hanging below your chest, palms facing each other.',
      'With a slight bend in the elbows, raise the dumbbells out to the sides.',
      'Squeeze your rear delts and upper back at the top, then lower with control.',
    ],
    tips: [
      'Use light weight — this is an isolation movement, not a strength exercise.',
      'Think about leading with your elbows and pinkies, not your hands.',
      'Avoid shrugging your traps; keep your neck long throughout.',
      'Critical for shoulder health and posture — include it every upper-body session.',
    ],
    pattern: 'pull-horizontal',
  },
  {
    id: 'arnold-press',
    name: 'Arnold Press',
    category: 'strength',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps'],
    equipment: ['dumbbell'],
    instructions: [
      'Sit with dumbbells at shoulder height, palms facing you (as if finishing a curl).',
      'As you press up, rotate your palms away from you.',
      'Finish with palms facing forward at the top, arms fully extended.',
      'Reverse the motion to return to the start.',
    ],
    tips: [
      'The rotation recruits all three heads of the deltoid across a larger arc of motion than a standard press.',
      'Move smoothly through the rotation — do not jerk or rush.',
      'Slightly lighter weight than standard dumbbell shoulder press is normal.',
    ],
    pattern: 'push-vertical',
  },
  {
    id: 'step-up',
    name: 'Step-Up',
    category: 'strength',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: ['dumbbell'],
    instructions: [
      'Stand in front of a bench or box holding dumbbells at your sides.',
      'Step one foot onto the box and drive through that heel to stand up fully.',
      'Bring the trailing foot up to stand on the box, then step back down with control.',
      'Complete all reps on one side before switching.',
    ],
    tips: [
      'Drive through the heel of the working leg — do not push off the trailing foot.',
      'Box height should allow your working knee to be at roughly 90° at the bottom.',
      'This is a highly knee-friendly single-leg exercise excellent for building strength imbalances.',
      'Pause at the top for 1 second to maximise glute activation.',
    ],
    pattern: 'squat',
  },
  {
    id: 'nordic-hamstring-curl',
    name: 'Nordic Hamstring Curl',
    category: 'strength',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['glutes', 'core'],
    equipment: ['bodyweight'],
    instructions: [
      'Kneel on a mat with your ankles secured under a barbell, heavy dumbbell, or by a partner.',
      'With your body straight from knee to head, slowly lower yourself toward the floor.',
      'Resist the descent using your hamstrings for as long as possible.',
      'Place hands down to catch yourself, then use your hands to push back to the start.',
    ],
    tips: [
      'This is one of the most effective exercises for hamstring strength and injury prevention.',
      'Start with just 3-5 reps — it is extremely demanding and causes significant delayed-onset soreness.',
      'Progress by slowing the descent (aim for 5 seconds down) and reducing hand assistance over time.',
      'Keep hips extended throughout — avoid piking at the hips.',
    ],
    pattern: 'hinge',
  },
  {
    id: 'cable-crunch',
    name: 'Cable Crunch',
    category: 'strength',
    primaryMuscles: ['core'],
    secondaryMuscles: [],
    equipment: ['cable'],
    instructions: [
      'Attach a rope to a high cable pulley. Kneel facing the machine.',
      'Hold the rope ends beside your ears, elbows pointing forward.',
      'Crunch your rib cage down toward your pelvis, rounding your spine.',
      'Squeeze your abs hard at the bottom, then return with control.',
    ],
    tips: [
      'Unlike sit-ups, you can progressively load this movement — add weight each week.',
      'The movement is a spinal flexion, not a hip flexion — do not bow forward at the hips.',
      'Keep constant tension on the cable throughout — do not let the stack rest at the top.',
      'A slow 3-second descent (eccentric) doubles the time under tension.',
    ],
    pattern: 'isolation',
  },
  {
    id: 't-bar-row',
    name: 'T-Bar Row',
    category: 'strength',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: ['barbell'],
    instructions: [
      'Load one end of a barbell and wedge the other end into a corner or landmine attachment.',
      'Stand over the bar, hinge until your torso is 45° to the floor.',
      'Grip the bar (use a V-handle or hands together) and row toward your lower chest.',
      'Squeeze your lats at the top, then lower with control.',
    ],
    tips: [
      'T-bar rows develop thickness in the mid-back that horizontal cable rows cannot replicate.',
      'Keep your lower back neutral and brace your core throughout — do not round under load.',
      'Drive your elbows back, not up, to maximise lat engagement over trap involvement.',
      'A controlled 2-second negative builds more muscle than letting the weight drop.',
    ],
    pattern: 'pull-horizontal',
  },

  // ── MOBILITY / FLEXIBILITY ─────────────────────────────────────────────────
  {
    id: 'hip-flexor-stretch',
    name: 'Hip Flexor Stretch',
    category: 'mobility',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes'],
    equipment: ['bodyweight'],
    instructions: [
      'Kneel on one knee with the other foot flat on the floor in front, forming a 90° angle at both knees.',
      'Keep your torso upright and squeeze the glute of the rear leg.',
      'Shift your hips forward gently until you feel a stretch in the front of the rear hip.',
      'Hold for 30–60 seconds, then switch sides.',
    ],
    tips: [
      'Squeezing the rear glute deepens the stretch via reciprocal inhibition — it is the single most effective cue.',
      'Avoid arching your lower back; keep the pelvis neutral throughout.',
    ],
  },
  {
    id: 'worlds-greatest-stretch',
    name: "World's Greatest Stretch",
    category: 'mobility',
    primaryMuscles: ['core'],
    secondaryMuscles: ['glutes', 'quads'],
    equipment: ['bodyweight'],
    instructions: [
      'Start in a push-up position, then step your right foot to the outside of your right hand.',
      'Drop your right elbow to the floor (or as close as possible) and hold for a breath.',
      'Rotate your right arm toward the ceiling, following it with your eyes, then return.',
      'Push your hips back into a hamstring stretch, then return to push-up position.',
      'Repeat on the left side; continue alternating for the desired reps.',
    ],
    tips: [
      'Move slowly and deliberately through each position — the value is in the transition, not just the endpoints.',
      'This is an ideal warm-up drill before lower-body sessions; 3–5 reps each side suffices.',
    ],
  },
  {
    id: 'thoracic-rotation',
    name: 'Thoracic Rotation Stretch',
    category: 'mobility',
    primaryMuscles: ['back'],
    secondaryMuscles: ['shoulders'],
    equipment: ['bodyweight'],
    instructions: [
      'Lie on your side with hips and knees at 90°, arms extended forward at shoulder height.',
      'Keep your hips stacked and your lower arm pressing into the floor for stability.',
      'Slowly rotate your top arm and shoulder toward the ceiling and then to the opposite side.',
      'Follow the movement with your eyes and breathe out as you rotate.',
      'Hold at end range for 2–3 seconds, then return. Perform 8–10 reps per side.',
    ],
    tips: [
      'Keep your knees together throughout — letting them separate shifts movement to the lumbar spine instead of the thoracic.',
      'If rotation is limited, place a pillow between your knees to lock hips and isolate the t-spine.',
    ],
  },
  {
    id: 'ankle-circles',
    name: 'Ankle Mobility Drill',
    category: 'mobility',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    equipment: ['bodyweight'],
    instructions: [
      'Sit or stand and lift one foot slightly off the floor.',
      'Slowly draw large circles with your toes, moving through the full available range of the ankle joint.',
      'Perform 10 circles clockwise, then 10 counter-clockwise.',
      'Switch feet and repeat.',
    ],
    tips: [
      'Combine with a banded ankle distraction for greater range if used as a pre-squat warm-up.',
      'Focus on maximising dorsiflexion range — pulling the toes toward the shin — as this direction limits squat depth most often.',
    ],
  },

  // ── CORE STABILITY ─────────────────────────────────────────────────────────
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    category: 'strength',
    primaryMuscles: ['core'],
    secondaryMuscles: [],
    equipment: ['bodyweight'],
    instructions: [
      'Lie on your back with arms pointing straight at the ceiling and knees bent at 90° above your hips.',
      'Press your lower back firmly into the floor and brace your core — maintain this throughout.',
      'Slowly lower your right arm overhead and extend your left leg toward the floor simultaneously.',
      'Stop just before your lower back loses contact with the floor, then return to start.',
      'Alternate sides for the desired reps.',
    ],
    tips: [
      'The goal is spinal stability under limb movement — slow, controlled reps are far more valuable than fast ones.',
      'Exhale as you lower the arm and leg; this facilitates deeper core engagement via diaphragmatic bracing.',
    ],
  },
  {
    id: 'bird-dog',
    name: 'Bird Dog',
    category: 'strength',
    primaryMuscles: ['core'],
    secondaryMuscles: ['glutes'],
    equipment: ['bodyweight'],
    instructions: [
      'Start on all fours with wrists under shoulders and knees under hips.',
      'Brace your core and keep a neutral spine — avoid any rotation or lateral tilt.',
      'Simultaneously extend your right arm forward and left leg back until both are parallel to the floor.',
      'Hold for 2–3 seconds, then return with control. Alternate sides.',
    ],
    tips: [
      'Imagine balancing a glass of water on your lower back — this cue prevents the most common error of hip rotation.',
      'Stuart McGill lists this as one of the "Big Three" core stability exercises due to its low spinal compression and high stabiliser activation.',
    ],
  },
  {
    id: 'pallof-press',
    name: 'Pallof Press',
    category: 'strength',
    primaryMuscles: ['core'],
    secondaryMuscles: ['shoulders'],
    equipment: ['cable'],
    instructions: [
      'Attach a D-handle to a cable set at chest height. Stand perpendicular to the cable with feet shoulder-width apart.',
      'Hold the handle at your chest with both hands; the cable will pull you toward the machine.',
      'Brace your core hard, then press the handle straight out in front of your chest to full arm extension.',
      'Hold for 1–2 seconds resisting the rotational pull, then return to chest.',
      'Complete all reps, then switch sides.',
    ],
    tips: [
      'The Pallof press is an anti-rotation exercise — the challenge is resisting movement, not creating it.',
      'Start light; even moderate weight is challenging when the core is the only thing keeping you from rotating.',
    ],
  },
  {
    id: 'copenhagen-plank',
    name: 'Copenhagen Plank',
    category: 'strength',
    primaryMuscles: ['core'],
    secondaryMuscles: ['glutes'],
    equipment: ['bodyweight'],
    instructions: [
      'Position yourself in a side-plank with the top foot resting on a bench or box at knee to hip height.',
      'Lift your hips so your body forms a straight line from head to toe, supported by the top foot and bottom forearm.',
      'The bottom leg hangs free — squeeze your inner thigh to lift it toward the top leg.',
      'Hold for the prescribed duration, then switch sides.',
    ],
    tips: [
      'This is one of the most effective exercises for the hip adductors and has strong evidence for groin injury prevention in athletes.',
      'Elevating the foot higher increases difficulty; beginners can place the knee (not foot) on the bench for less demand.',
    ],
  },
  {
    id: 'hollow-body-hold',
    name: 'Hollow Body Hold',
    category: 'strength',
    primaryMuscles: ['core'],
    secondaryMuscles: [],
    equipment: ['bodyweight'],
    instructions: [
      'Lie flat on your back and press your lower back firmly into the floor.',
      'Raise your shoulders slightly off the floor and extend your arms overhead.',
      'Lift your legs to roughly 45° (or lower as strength improves) while maintaining the lower back contact.',
      'Hold the position, breathing steadily, for the prescribed duration.',
    ],
    tips: [
      'The lower back must stay in contact with the floor — if it lifts, raise the legs higher until you can control it.',
      'Progress by lowering the legs toward the floor over weeks as anterior core strength improves.',
    ],
  },

  // ── UPPER BODY ─────────────────────────────────────────────────────────────
  {
    id: 'chest-supported-row',
    name: 'Chest-Supported Dumbbell Row',
    category: 'strength',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    equipment: ['dumbbell'],
    instructions: [
      'Set a bench to a 30–45° incline. Lie prone (face down) against the pad with a dumbbell in each hand.',
      'Let the dumbbells hang at full arm extension, palms facing each other.',
      'Row both dumbbells up toward your hips, driving your elbows back and squeezing your shoulder blades together.',
      'Lower with control to the starting position.',
    ],
    tips: [
      'The chest support eliminates lower-back involvement, allowing you to fully focus on lat and rhomboid contraction.',
      'Keep your chin tucked and neck neutral — do not crane your head up to look forward.',
    ],
    pattern: 'pull-horizontal',
  },
  {
    id: 'meadows-row',
    name: 'Meadows Row',
    category: 'strength',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    equipment: ['barbell'],
    instructions: [
      'Load one end of a barbell and stand perpendicular to it, straddling the loaded end.',
      'Hinge at the hips with a neutral spine, grip the end of the bar with the outside hand using an overhand grip.',
      'Row the bar up toward your hip, driving the elbow high and back.',
      'Lower with control, allowing a full stretch at the bottom.',
    ],
    tips: [
      'The landmine angle creates a unique strength curve that stresses the back through a longer range of motion than standard rows.',
      'Use a wrist strap to eliminate grip as the limiting factor and focus entirely on the lat.',
    ],
    pattern: 'pull-horizontal',
  },
  {
    id: 'incline-dumbbell-curl',
    name: 'Incline Dumbbell Curl',
    category: 'strength',
    primaryMuscles: ['biceps'],
    secondaryMuscles: [],
    equipment: ['dumbbell'],
    instructions: [
      'Set a bench to a 45–60° incline. Sit back against the pad with a dumbbell in each hand, arms hanging vertically.',
      'Keep your upper arms stationary and curl both dumbbells upward, supinating the forearms at the top.',
      'Squeeze at peak contraction, then lower slowly back to full extension.',
    ],
    tips: [
      'The inclined position places the biceps under stretch at the bottom — the long head is loaded more heavily than in standing curls.',
      'Avoid swinging; the value of this exercise comes entirely from the stretched starting position.',
    ],
    pattern: 'isolation',
  },
  {
    id: 'reverse-curl',
    name: 'Reverse Curl',
    category: 'strength',
    primaryMuscles: ['biceps'],
    secondaryMuscles: [],
    equipment: ['barbell'],
    instructions: [
      'Stand holding a barbell with an overhand (pronated) grip, hands shoulder-width apart.',
      'Keep your upper arms stationary at your sides.',
      'Curl the bar up toward your shoulders while maintaining the overhand grip.',
      'Lower with control to full extension.',
    ],
    tips: [
      'The overhand grip shifts emphasis to the brachialis and brachioradialis (forearm), which are undertrained in standard curls.',
      'Use a lighter load than a standard curl — the pronated grip reduces mechanical advantage significantly.',
    ],
    pattern: 'isolation',
  },
  {
    id: 'dumbbell-tricep-kickback',
    name: 'Dumbbell Tricep Kickback',
    category: 'strength',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    equipment: ['dumbbell'],
    instructions: [
      'Hinge forward at the hips with a neutral back, bracing your core.',
      'Hold a dumbbell in one hand with your upper arm parallel to the floor and elbow at 90°.',
      'Extend your forearm back until your arm is fully straight, squeezing the tricep at the top.',
      'Slowly return to the bent-elbow start position. Complete all reps, then switch arms.',
    ],
    tips: [
      'Keep your upper arm perfectly parallel to the floor — letting it drop reduces tricep activation significantly.',
      'Use a moderate load with a full lockout and slow eccentric; the short muscle length at peak contraction is where the tricep works hardest.',
    ],
    pattern: 'isolation',
  },
  {
    id: 'cable-lateral-raise',
    name: 'Cable Lateral Raise',
    category: 'strength',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: [],
    equipment: ['cable'],
    instructions: [
      'Set a cable to the lowest position. Stand side-on to the cable stack and grip the handle with the far hand, crossing it in front of your body.',
      'With a slight bend in the elbow, raise your arm out to the side until it is parallel to the floor.',
      'Hold briefly at the top, then lower with control.',
      'Complete all reps, then switch sides.',
    ],
    tips: [
      'The cable provides constant tension throughout the full range of motion, unlike dumbbells which lose tension at the bottom.',
      'Lean slightly away from the cable stack to further increase the stretch on the lateral deltoid.',
    ],
    pattern: 'isolation',
  },
  {
    id: 'wide-grip-pull-up',
    name: 'Wide-Grip Pull-Up',
    category: 'strength',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps'],
    equipment: ['bodyweight'],
    instructions: [
      'Grip the pull-up bar wider than shoulder-width with an overhand (pronated) grip.',
      'Hang at full arm extension, then depress and retract your shoulder blades.',
      'Pull yourself up until your chin clears the bar, driving your elbows down and back.',
      'Lower with control to full extension.',
    ],
    tips: [
      "A wider grip shortens the lat's range of motion but increases width stimulus; combine with close-grip variations for complete development.",
      'Avoid kipping — controlled reps with a full hang and a 2-second negative build more lat mass.',
    ],
    pattern: 'pull-vertical',
  },

  // ── LOWER BODY ─────────────────────────────────────────────────────────────
  {
    id: 'single-leg-rdl',
    name: 'Single-Leg Romanian Deadlift',
    category: 'strength',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['glutes'],
    equipment: ['dumbbell'],
    instructions: [
      'Stand on one leg holding a dumbbell in the opposite hand (contralateral loading).',
      'Hinge at the hip, sending the free leg back and lowering the dumbbell toward the floor.',
      'Keep a neutral spine and your standing knee softly bent throughout.',
      'Drive through the standing heel to return to upright, squeezing the glute at the top.',
    ],
    tips: [
      'Think "hip hinge" not "forward lean" — the movement initiates at the hip, not the lower back.',
      'If balance is the limiting factor, use ipsilateral loading (same-side hand) or lightly touch a wall for stability while maintaining the movement pattern.',
    ],
    pattern: 'hinge',
  },
  {
    id: 'front-squat',
    name: 'Front Squat',
    category: 'strength',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes', 'core'],
    equipment: ['barbell'],
    instructions: [
      'Set the barbell in the front rack position: bar resting on the front deltoids with elbows high, upper arms parallel to the floor.',
      'Stand with feet shoulder-width apart and toes turned out slightly.',
      'Brace your core and squat down, keeping your torso as upright as possible.',
      'Drive through your full foot to return to standing.',
    ],
    tips: [
      'The front rack demands thoracic extension and wrist flexibility — work on both if the position is uncomfortable.',
      'The upright torso shifts stress to the quads far more than a back squat, making it the preferred squat variation for quad development.',
    ],
    pattern: 'squat',
  },
  {
    id: 'hack-squat',
    name: 'Hack Squat',
    category: 'strength',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes'],
    equipment: ['machine'],
    instructions: [
      'Position yourself in the hack squat machine with your back flat against the pad and feet shoulder-width on the platform.',
      'Release the safety handles, then lower by bending at the knees and hips until your thighs are at least parallel.',
      'Drive through your feet to press back to the start.',
      'Re-engage the safety handles before unloading.',
    ],
    tips: [
      'Placing your feet lower on the platform increases quad emphasis; placing them higher involves more glutes and hamstrings.',
      'The machine constrains the movement path, making it a good option when lower back fatigue limits free-weight squatting.',
    ],
    pattern: 'squat',
  },
  {
    id: 'sissy-squat',
    name: 'Sissy Squat',
    category: 'strength',
    primaryMuscles: ['quads'],
    secondaryMuscles: [],
    equipment: ['bodyweight'],
    instructions: [
      'Stand with feet hip-width apart; optionally hold a fixed object lightly for balance.',
      'Rise onto your toes and simultaneously lean back and bend your knees, dropping toward the floor.',
      'Keep your hips extended (body in a straight line from knee to shoulder) throughout the descent.',
      'Drive back up by extending the knees, returning to the start position.',
    ],
    tips: [
      'This is one of the few exercises that heavily loads the rectus femoris in a lengthened position — a key driver of quad hypertrophy.',
      'Start with a shallow range of motion and progress depth gradually; the knee joint stress is significant for untrained individuals.',
    ],
    pattern: 'squat',
  },
  {
    id: 'donkey-calf-raise',
    name: 'Donkey Calf Raise',
    category: 'strength',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    equipment: ['bodyweight'],
    instructions: [
      'Hinge at the hips and hold a surface at hip height for support, so your torso is roughly parallel to the floor.',
      'Place the balls of your feet on the edge of a step or plate with heels free to drop.',
      'Lower your heels as far as possible to achieve a full gastrocnemius stretch.',
      'Drive through the balls of your feet to raise your heels as high as possible. Repeat.',
    ],
    tips: [
      'The bent-hip position keeps the gastrocnemius fully stretched throughout, producing a greater training stimulus than standing calf raises.',
      'Use a slow, controlled tempo — 2 seconds down, 1-second pause at the bottom stretch, 2 seconds up.',
    ],
    pattern: 'isolation',
  },
  {
    id: 'seated-calf-raise',
    name: 'Seated Calf Raise',
    category: 'strength',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    equipment: ['machine'],
    instructions: [
      'Sit in a seated calf raise machine with the pads resting on your lower thighs just above the knees.',
      'Place the balls of your feet on the footrest with your heels hanging off the edge.',
      'Release the safety lever, then lower your heels to achieve a full stretch.',
      'Press up onto the balls of your feet as high as possible, then lower with control.',
    ],
    tips: [
      'The seated position (knees at 90°) shortens the gastrocnemius, shifting focus predominantly to the soleus — important for complete calf development.',
      'The soleus responds well to higher rep ranges (15–25) and moderate load; do not simply pile on weight.',
    ],
    pattern: 'isolation',
  },
  {
    id: 'lateral-band-walk',
    name: 'Lateral Band Walk',
    category: 'strength',
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['quads'],
    equipment: ['resistance-band'],
    instructions: [
      'Place a resistance band around your ankles or just above your knees.',
      'Stand with feet hip-width apart, push your hips back slightly into an athletic stance.',
      'Step laterally with one foot, then follow with the other, maintaining constant tension in the band.',
      'Keep your toes pointing forward and avoid letting your feet come together fully between steps.',
      'Complete reps in one direction, then return.',
    ],
    tips: [
      'Position the band above the knees for more glute med activation; below the knees increases the moment arm and difficulty.',
      'Keep a slight forward lean from the hips throughout — this increases glute medius activation over TFL.',
    ],
    pattern: 'isolation',
  },

  // ── CARDIO / CONDITIONING ──────────────────────────────────────────────────
  {
    id: 'farmers-carry',
    name: "Farmer's Carry",
    category: 'strength',
    primaryMuscles: ['core'],
    secondaryMuscles: ['shoulders', 'back'],
    equipment: ['dumbbell'],
    instructions: [
      'Pick up a heavy dumbbell (or kettlebell) in each hand using a neutral grip.',
      'Stand tall: shoulders packed down and back, core braced, chin tucked.',
      'Walk for the prescribed distance or time, maintaining upright posture throughout.',
      'To finish, hinge at the hips and lower the weights to the floor with control.',
    ],
    tips: [
      'Use a load that challenges your grip and core — if you are not fighting to stay upright, go heavier.',
      "Farmer's carries build grip strength, core stability, and loaded walking capacity that carry over to nearly every other lift.",
    ],
    pattern: 'carry',
  },
  {
    id: 'sled-push',
    name: 'Sled Push',
    category: 'cardio',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes', 'shoulders'],
    equipment: ['bodyweight'],
    instructions: [
      'Load the sled to the desired weight. Grip the upright handles with both hands.',
      'Lean forward at roughly 45° and drive your feet into the ground.',
      'Push the sled by driving alternating knees forward in powerful, short strides.',
      'Maintain a rigid trunk and keep your head neutral.',
    ],
    tips: [
      'The sled is low-skill and has no eccentric component, making it excellent for conditioning without excessive muscle soreness.',
      'Heavier loads at slower speed build strength-endurance; lighter loads pushed fast develop conditioning and power.',
    ],
    pattern: 'cardio',
  },
  {
    id: 'battle-ropes',
    name: 'Battle Ropes',
    category: 'cardio',
    primaryMuscles: ['cardio'],
    secondaryMuscles: ['shoulders', 'core'],
    equipment: ['bodyweight'],
    instructions: [
      'Anchor a thick rope around a fixed post. Hold one end in each hand.',
      'Stand with feet shoulder-width apart, knees slightly bent and core braced.',
      'Alternate raising and lowering each arm rapidly to create continuous waves in the rope.',
      'Continue for the prescribed interval (typically 20–40 seconds), then rest.',
    ],
    tips: [
      'Vary the wave pattern — alternating waves, simultaneous slams, circles — to challenge different aspects of shoulder and core endurance.',
      'Drive power from the legs and hips, not just the arms, for maximum intensity and caloric expenditure.',
    ],
    pattern: 'cardio',
  },
  {
    id: 'assault-bike',
    name: 'Assault Bike',
    category: 'cardio',
    primaryMuscles: ['cardio'],
    secondaryMuscles: [],
    equipment: ['cardio-machine'],
    instructions: [
      'Adjust the seat height so there is a slight bend in the knee at full pedal extension.',
      'Grip the moving handles and begin pedalling, simultaneously pushing and pulling the handles.',
      'Drive power through both the legs and arms together for maximum output.',
      'Maintain a consistent cadence or use interval protocols (e.g., 20 s on / 40 s off).',
    ],
    tips: [
      'The assault bike is total-body and has no motor assist — power output drops directly proportional to how hard you work, making it brutally honest.',
      'For intervals, target a sustainable pace for work periods rather than sprinting so hard you collapse; consistency over the set beats one heroic first bout.',
    ],
    pattern: 'cardio',
  },
];

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((e) => e.id === id);
}

// ─── YouTube Demo IDs ─────────────────────────────────────────────────────────
// Curated technique tutorial videos from Jeff Nippard, Alan Thrall, Athlean-X
const EXERCISE_YOUTUBE_IDS: Record<string, string> = {
  'barbell-bench-press':       'vcBig73ojpE', // Jeff Nippard — bench press technique
  'dumbbell-bench-press':      'vthMCtgVtFw', // Athlean-X — bench press checklist
  'incline-dumbbell-press':    'LwHoNk-sjgs', // Jeff Nippard — push workout
  'cable-chest-fly':           'NsEbXsTwas8', // Jeff Nippard — chest exercises ranked
  'push-up':                   'AhdtowFDKT0', // Athlean-X — perfect push-up
  'barbell-row':               'axoeDmW0oAY', // Jeff Nippard — rowing technique
  'dumbbell-row':              'spKGN0XzErU', // Jeff Nippard — pull day
  'lat-pulldown':              'WQasM7Jh9dQ', // Athlean-X — lat exercises
  'pull-up':                   'Hdc7Mw6BIEE', // Jeff Nippard — pull-up for wide back
  'seated-cable-row':          'IOl42YpK_Es', // Athlean-X — pull workout
  'face-pull':                 'eIq5CB9JfKE', // Athlean-X — face pulls
  'overhead-press':            '_RlRDWO2jfg', // Jeff Nippard — overhead press
  'dumbbell-lateral-raise':    'v_ZkxWzYnMc', // Jeff Nippard — side delts
  'dumbbell-shoulder-press':   'SgyUoY0IZ7A', // Jeff Nippard — shoulder tier list
  'barbell-curl':              'i1YgFZB6alI', // Jeff Nippard — biceps
  'hammer-curl':               'spKGN0XzErU', // Jeff Nippard — pull day (includes hammer curls)
  'tricep-pushdown':           '8Nkfuhxsl-0', // Athlean-X — tricep workout
  'skull-crusher':             'popGXI-qs98', // Jeff Nippard — triceps
  'overhead-tricep-extension': 'G9uZ7fxgBjY', // Athlean-X — triceps
  'barbell-back-squat':        'bs_Ej32IYgo', // Alan Thrall — squat technique
  'goblet-squat':              'RjexvOAsVtI', // Athlean-X — perfect leg workout
  'leg-press':                 'H6mRkx1x77k', // Jeff Nippard — leg day
  'leg-extension':             'sDMAPXzvjAo', // Athlean-X — leg workout
  'walking-lunge':             'H6mRkx1x77k', // Jeff Nippard — leg day
  'bulgarian-split-squat':     'sDMAPXzvjAo', // Athlean-X — leg workout
  'romanian-deadlift':         '_oyxCn2iSjU', // Jeff Nippard — RDL technique
  'deadlift':                  'VL5Ab0T07e4', // Jeff Nippard — conventional deadlift
  'hip-thrust':                'xDmFkJxPzeM', // Jeff Nippard — hip thrust
  'glute-bridge':              '1jp2uhfO8M0', // Athlean-X — glute bridge
  'leg-curl':                  '0a_fVS2s4Ho', // Jeff Nippard — hamstring training
  'standing-calf-raise':       'RjexvOAsVtI', // Athlean-X — leg workout
  'plank':                     '1G0y8D5rFDc', // Jeff Nippard — core training
  'hanging-leg-raise':         'Pr1ieGZ5atk', // Athlean-X — hanging leg raise
  'ab-wheel-rollout':          'Xx_RyuA4DzU', // Athlean-X — ab wheel
  'kettlebell-swing':          '9LIAhxQHmak', // Caroline Girvan — kettlebell workout
  'box-jump':                  'JDnttfZ0c1s', // Athlean-X — bodyweight exercises
  'mountain-climbers':         'pIbAhBxwcxo', // Athlean-X — essential exercises
  'dips':                      'yN6Q1UI_xkE', // Jeff Nippard — dips
  'incline-barbell-press':     'jPLdzuHckI8', // Buff Dudes — incline barbell press
  'rear-delt-fly':             'qfc70k40318', // Jeff Nippard — rear delts
  'arnold-press':              'tZafawk3arc', // Athlean-X — shoulder exercises
  'step-up':                   'RjexvOAsVtI', // Athlean-X — leg workout
  'nordic-hamstring-curl':     '0a_fVS2s4Ho', // Jeff Nippard — hamstring training
  'cable-crunch':              '1G0y8D5rFDc', // Jeff Nippard — core training
  't-bar-row':                 'BPXjwGiKOmo', // Athlean-X — back workout
};

export function getExerciseYouTubeId(id: string): string | undefined {
  return EXERCISE_YOUTUBE_IDS[id];
}
