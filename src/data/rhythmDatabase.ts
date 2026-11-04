import { RhythmData } from '../types/ekg';

export const RHYTHM_DATABASE: RhythmData[] = [
  // -------------------------------------------------------------
  // BASELINE: NORMAL SINUS RHYTHM
  // -------------------------------------------------------------
  {
    id: 'nsr',
    name: 'Normal Sinus Rhythm (NSR)',
    aka: 'Normal Cardiac Rhythm',
    category: 'sinus',
    heartRate: '60 - 100 beats/min',
    rateBpm: 75,
    regularity: 'Regular',
    pWave: 'Present, upright, uniform, 1 before every QRS',
    prInterval: '0.12 - 0.20 seconds (3 - 5 small boxes)',
    qrsDuration: '0.04 - 0.12 seconds (1 - 3 small boxes)',
    slideNumber: 7,
    tags: ['Normal', 'SA Node', 'Gold Standard'],
    medicalBSN: {
      definition: 'The benchmark cardiac rhythm originating exclusively from the Sinoatrial (SA) Node at an intrinsic rate of 60-100 bpm, depolarizing atria, passing through the AV node with physiological delay, and rapidly activating ventricles through the His-Purkinje system.',
      electrophysiology: 'SA node automaticity fires -> Bachmann bundle & internodal tracts conduct impulse to AV node -> 0.1s physiological delay (allowing atrial kick to fill ventricles) -> Bundle of His -> Left/Right bundle branches -> Purkinje fibers depolarize ventricular myocardium from endocardium to epicardium.',
      clinicalCauses: ['Normal physiology in a resting healthy adult', 'Adequate autonomic nervous system balance'],
      hemodynamicImpact: 'Optimal cardiac output. Ventricular filling time is sufficient, preserving stroke volume and coronary artery perfusion.',
      nursingPriorities: [
        'Document baseline rate, rhythm, and vital signs',
        'Verify lead placement if artifacts appear',
        'Use as standard template to compare all other rhythm abnormalities'
      ],
      aclsInterventions: ['No pharmacological intervention required', 'Maintain supportive care']
    },
    childMetaphor: {
      title: 'The Happy School Marching Band',
      story: 'Imagine a happy school marching band led by a friendly drum major (the SA Node). Every single time the drum major taps the baton (P wave), the entire band marches one perfect step forward (QRS complex) with an even, happy bounce. Nobody rushes, nobody trips, and every single step is identical!',
      takeaway: 'One drum tap for one steady step — never too fast, never too slow.'
    },
    clinicalMetaphor: {
      title: 'The Swiss Clockwork Metronome',
      simile: 'Like a hand-crafted Swiss mechanical watch clicking precisely 75 times a minute without losing or gaining a microsecond.',
      visualAnchor: 'P wave is the smooth hilltop, QRS is the tall church steeple, and T is the gentle resting meadow.'
    },
    mnemonics: [
      'P-Q-R-S-T: Perfect Quiet Rhythm Starts Today',
      'Box Rule: PR is 3-5 little boxes; QRS is 1-3 little boxes!'
    ],
    clinicalPearl: 'Never treat the monitor; always treat the patient. A perfect NSR on screen with no palpable pulse is Pulseless Electrical Activity (PEA)!',
    waveform: {
      type: 'nsr',
      pAmp: 18,
      pWidth: 16,
      prLength: 4,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  // -------------------------------------------------------------
  // SINUS RHYTHMS
  // -------------------------------------------------------------
  {
    id: 'sinus-bradycardia',
    name: 'Sinus Bradycardia',
    aka: 'Sinus Brady',
    category: 'sinus',
    heartRate: 'Less than 60 beats/min',
    rateBpm: 46,
    regularity: 'Regular',
    pWave: 'Present, upright, uniform, 1 before every QRS',
    prInterval: '0.12 - 0.20 seconds (Normal)',
    qrsDuration: '0.04 - 0.12 seconds (Normal)',
    slideNumber: 9,
    tags: ['Sinus', 'Slow', 'Atropine', 'Vagal'],
    medicalBSN: {
      definition: 'Sinus rhythm originating from the SA node at a frequency under 60 beats/min. All conduction intervals (PR, QRS) and morphological waveforms remain strictly normal, only the rate is delayed.',
      electrophysiology: 'Decreased automaticity of the SA node, frequently due to excessive parasympathetic (vagal) tone, SA nodal ischemia (Right Coronary Artery supply), hypothermia, or nodal-blocking pharmacotherapy.',
      clinicalCauses: [
        'High physical conditioning (marathon athletes/runners)',
        'Vagal stimulation (vomiting, straining/Valsalva, carotid massage)',
        'Medications: Beta-blockers, Calcium channel blockers, Digoxin',
        'Inferior wall myocardial infarction (RCA ischemia to SA node)',
        'Hypothyroidism, Hypothermia, Elevated intracranial pressure (Cushing triad)'
      ],
      hemodynamicImpact: 'Decreased Cardiac Output (CO = HR x Stroke Volume). When rate drops too low, compensatory stroke volume cannot maintain cerebral perfusion, precipitating hypotension, dizziness, and syncope.',
      nursingPriorities: [
        'Immediately assess for symptomatic hypoperfusion (Dizziness, Altered Mental Status, Hypotension, Diaphoresis, Chest pain)',
        'Check patient medications (hold scheduled beta-blockers/digoxin)',
        'Ensure patent IV access and prepare bedside transcutaneous pacer pads'
      ],
      aclsInterventions: [
        'Asymptomatic: Observe and monitor',
        'Symptomatic Bradycardia: First-line drug is Atropine 1 mg IV push every 3-5 min (maximum 3 mg)',
        'If Atropine ineffective: Dopamine infusion (5-20 mcg/kg/min) or Epinephrine infusion (2-10 mcg/min) or Transcutaneous Pacing (TCP)'
      ]
    },
    childMetaphor: {
      title: 'The Sleepy Turtle Conductor',
      story: 'The drum major had a huge bowl of warm soup and got super sleepy! He is still doing all the steps correctly in the right order, but he is taking long naps between every single baton tap. The band is marching fine, just walking in slow motion like a sleepy turtle in pajamas.',
      takeaway: 'Everything looks normal, it just takes forever between heartbeats!'
    },
    clinicalMetaphor: {
      title: 'The Idling Engine on Cold Morning',
      simile: 'Like a diesel truck idling on a frosty morning at low RPM — running smoothly without misfires, but barely spinning fast enough to warm the cab.',
      visualAnchor: 'Long stretches of empty pink baseline between identical tall steeples.'
    },
    mnemonics: [
      'BRADY = Below 60, Regular, All waves present, Done slow, Yes to Atropine if dizzy',
      'Atropine Pine Tree: Need 1mg fast to perk the sluggish pine tree up!'
    ],
    clinicalPearl: 'If the patient is asleep and HR is 48 bpm with warm pink skin, wake them up gently before paging the rapid response team! Conditioned athletes live here normally.',
    waveform: {
      type: 'sinus-brady',
      pAmp: 18,
      pWidth: 16,
      prLength: 4,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'sinus-tachycardia',
    name: 'Sinus Tachycardia',
    aka: 'Sinus Tachy',
    category: 'sinus',
    heartRate: 'Greater than 100 beats/min (usually 101 - 160 bpm)',
    rateBpm: 128,
    regularity: 'Regular',
    pWave: 'Present, upright, uniform (may merge with preceding T wave at high rates)',
    prInterval: '0.12 - 0.20 seconds (Normal)',
    qrsDuration: '0.04 - 0.12 seconds (Normal)',
    slideNumber: 10,
    tags: ['Sinus', 'Fast', 'Compensatory', 'Treat the Cause'],
    medicalBSN: {
      definition: 'Sinus rhythm generated by the SA node at a rate exceeding 100 beats/min in response to physiological demand, sympathetic stimulation, or pathological stress.',
      electrophysiology: 'Enhanced automaticity of SA nodal pacemaker cells driven by beta-1 adrenergic stimulation or vagal withdrawal. Conduction velocities through AV node and ventricles remain normal.',
      clinicalCauses: [
        'Physiological stress: Pain, Fever, Dehydration/Hypovolemia, Exercise, Anxiety',
        'Hypoxemia, Anemia (compensatory attempt to deliver oxygen to tissues)',
        'Sepsis / Shock (early compensatory tachycardia)',
        'Stimulants: Caffeine, Nicotine, Cocaine, Amphetamines, Albuterol',
        'Pulmonary embolism, Hyperthyroidism, Acute heart failure'
      ],
      hemodynamicImpact: 'Shortened diastolic filling time reduces ventricular end-diastolic volume (preload) and coronary artery perfusion time, potentially precipitating myocardial ischemia and decreased cardiac output.',
      nursingPriorities: [
        'Identify and treat the underlying ROOT CAUSE — never just "slow down" sinus tachy with meds without knowing why!',
        'Assess fluid status: Dry mucous membranes, skin turgor, low urine output (give IV fluids for hypovolemia)',
        'Assess pain score, temperature (give antipyretics), oxygen saturation (apply O2)'
      ],
      aclsInterventions: [
        'Treat the underlying etiology: IV crystalloids for dehydration, antipyretics for fever, analgesia for pain, blood products for hemorrhage',
        'Cardioversion is CONTRAINDICATED in sinus tachycardia!'
      ]
    },
    childMetaphor: {
      title: 'The Puppy Chasing a Squirrel',
      story: 'The drum major spotted a squirrel and drank a huge chocolate milkshake! He is tapping his baton as fast as he can, and all the band members are jogging together in double-time. Nobody fell down, but they are all breathing hard and sweating!',
      takeaway: 'Normal heart steps, but sprinted on hyperdrive because the body is excited or scared.'
    },
    clinicalMetaphor: {
      title: 'The Car Running in Low Gear on the Highway',
      simile: 'Like driving your car down the freeway at 70 mph while stuck in 2nd gear — the tachometer is redlining, burning oil and heating up fast.',
      visualAnchor: 'Crowded steeples marching close together where the T wave almost kisses the next P wave.'
    },
    mnemonics: [
      'TACHY: Temperature, Anxiety, Coffee/Cocaine, Hemorrhage/Hypovolemia, You must find the cause!',
      'Never shock Sinus Tachy — shock is for broken circuits, not a thirsty heart!'
    ],
    clinicalPearl: 'Sinus Tachycardia is a symptom, not a primary disease. If you give a beta blocker to a septic or hypovolemic patient in sinus tachy, you remove their only compensatory mechanism and cause vascular collapse!',
    waveform: {
      type: 'sinus-tachy',
      pAmp: 18,
      pWidth: 14,
      prLength: 3.5,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'sinus-arrhythmia',
    name: 'Sinus Arrhythmia',
    aka: 'Respiratory Sinus Arrhythmia',
    category: 'sinus',
    heartRate: 'Usually 60 - 100 beats/min (cycles between fast and slow)',
    rateBpm: 72,
    regularity: 'Irregular (shortens on inspiration, lengthens on expiration)',
    pWave: 'Present, upright, uniform, 1 before every QRS',
    prInterval: '0.12 - 0.20 seconds (Normal and constant)',
    qrsDuration: '0.04 - 0.12 seconds (Normal)',
    slideNumber: 11,
    tags: ['Sinus', 'Respiratory', 'Benign', 'Pediatric'],
    medicalBSN: {
      definition: 'A benign, normal physiological variant of sinus rhythm where the SA node firing rate varies cyclically with respiration: heart rate accelerates during inhalation and decelerates during exhalation.',
      electrophysiology: 'During inspiration, thoracic pressure drops, increasing venous return to right atrium and triggering the Bainbridge reflex while inhibiting vagal outflow (rate speeds up). During expiration, vagal tone surges back, slowing SA nodal discharge.',
      clinicalCauses: [
        'Normal autonomic tone in children, young adults, and endurance athletes',
        'Naturally decreases with advancing age and diabetic autonomic neuropathy',
        'Can rarely be non-respiratory (e.g., digoxin toxicity or inferior MI)'
      ],
      hemodynamicImpact: 'Hemodynamically insignificant; maintains adequate stroke volume and normal cardiac output.',
      nursingPriorities: [
        'Look at the patient’s chest while watching the monitor — verify rate fluctuations sync with breathing',
        'Reassure anxious new nurses or family members that this is a sign of a healthy, responsive vagus nerve!',
        'No intervention needed'
      ],
      aclsInterventions: ['None required — benign finding']
    },
    childMetaphor: {
      title: 'The Breathing Accordion',
      story: 'The drum major loves breathing fresh air! When he takes a big breath IN, his feet speed up: tap-tap-tap! When he lets his breath OUT, he relaxes and slows down: tap... tap... tap... It’s like an accordion squeezing and stretching to a gentle song.',
      takeaway: 'Breathe in -> speed up. Breathe out -> slow down. Completely safe and normal!'
    },
    clinicalMetaphor: {
      title: 'The Ocean Tide against the Shore',
      simile: 'Like gentle ocean waves lapping against the sand: rushing up quickly on the swell, then coasting slowly back out to sea.',
      visualAnchor: 'R-R intervals that smoothly accordion closer together, then gently widen apart in rhythmic wave cycles.'
    },
    mnemonics: [
      'INspire = INcrease rate; EXpire = EXit speed (slows down)',
      'SAFE: Sinus Arrhythmia Fits Everyone young & healthy'
    ],
    clinicalPearl: 'To prove Sinus Arrhythmia at the bedside, ask the patient to hold their breath for 5 seconds. The R-R intervals will immediately become perfectly regular!',
    waveform: {
      type: 'sinus-arrhythmia',
      pAmp: 18,
      pWidth: 16,
      prLength: 4,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'sinus-arrest',
    name: 'Sinus Arrest',
    aka: 'Sinus Pause / SA Node Exit Block',
    category: 'sinus',
    heartRate: 'Underlying rate variable; overall rate slowed by pauses',
    rateBpm: 50,
    regularity: 'Irregular due to sudden missing pauses',
    pWave: 'Normal when present; completely absent during the pause',
    prInterval: '0.12 - 0.20 seconds on conducted beats; none during pause',
    qrsDuration: '0.04 - 0.12 seconds on conducted beats; none during pause',
    slideNumber: 12,
    tags: ['Sinus', 'Pause', 'Sick Sinus', 'Pacemaker'],
    medicalBSN: {
      definition: 'A failure of the SA node to initiate an electrical impulse for one or more cycles, resulting in a sudden flatline pause with absent P-QRS-T complexes. The pause duration is NOT an exact mathematical multiple of the baseline P-P interval (differentiating it from SA exit block).',
      electrophysiology: 'SA node pacemaker cell quiescence due to fibrosis of nodal tissue, profound parasympathetic tone, ischemia to the nodal artery, or pharmacological suppression. A lower latent pacemaker (AV junction or ventricle) may fire an escape beat if pause is prolonged.',
      clinicalCauses: [
        'Sick Sinus Syndrome (Sinus Node Dysfunction in elderly)',
        'Acute inferior myocardial infarction (Right Coronary Artery occlusion)',
        'Medication toxicity: Digoxin, Beta-blockers, Non-dihydropyridine CCBs',
        'Extreme vagal episodes (coughing, straining, vomiting, suctioning)'
      ],
      hemodynamicImpact: 'Depends entirely on pause duration. Pauses > 3 seconds drop cerebral perfusion pressure dramatically, inducing presyncope, dizziness, or sudden Stokes-Adams syncope.',
      nursingPriorities: [
        'Note the exact duration of the pause using calipers (e.g. "3.4 second sinus arrest")',
        'Assess mental status and pulse during the pause',
        'Have atropine and transcutaneous pacing pads ready at bedside'
      ],
      aclsInterventions: [
        'If symptomatic: Atropine 1 mg IV push',
        'Temporary transcutaneous / transvenous pacing',
        'Permanent dual-chamber pacemaker implantation for recurrent Sick Sinus Syndrome'
      ]
    },
    childMetaphor: {
      title: 'The Drum Major Who Dropped His Baton',
      story: 'The drum major was marching along nicely, and then suddenly — WHOOPS! He dropped his baton into the grass! Everything stops dead silent for a few seconds while he looks down and picks it back up. Then he clears his throat and starts marching again.',
      takeaway: 'A sudden quiet pause where the heart completely skips a whole beat or two.'
    },
    clinicalMetaphor: {
      title: 'The Sudden Power Flicker in the House',
      simile: 'Like sitting in your living room when the electricity blinks out for 3 seconds: total darkness and silence, before the generator clicks back on.',
      visualAnchor: 'A sudden, eerie horizontal flatline across the pink paper where a beat should have been.'
    },
    mnemonics: [
      'ARREST = Absent Rhythm Resulting in Empty Silent Time',
      'Pause Rule: Measure with calipers — if it’s NOT an exact multiple, it’s an Arrest, not a Block!'
    ],
    clinicalPearl: 'Always check if an escape beat stepped in at the end of the pause. If an inverted P or wide QRS appears right as the pause ends, that is the AV junction or ventricles heroically saving the patient’s life!',
    waveform: {
      type: 'sinus-arrest',
      pAmp: 18,
      pWidth: 16,
      prLength: 4,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  // -------------------------------------------------------------
  // ATRIAL DYSRHYTHMIAS
  // -------------------------------------------------------------
  {
    id: 'premature-atrial-complex',
    name: 'Premature Atrial Complex (PAC)',
    aka: 'PAC / Atrial Premature Beat',
    category: 'atrial',
    heartRate: 'Depends on underlying rhythm (PACs add extra beats)',
    rateBpm: 78,
    regularity: 'Irregular due to early ectopic beats',
    pWave: 'Premature, abnormal shape (peaked, flattened, notched, or buried in preceding T wave)',
    prInterval: 'Usually 0.12 - 0.20s, may differ from underlying sinus PR',
    qrsDuration: '0.04 - 0.12 seconds (Normal narrow QRS)',
    slideNumber: 14,
    tags: ['Atrial', 'Early Beat', 'Caffeine', 'Non-compensatory Pause'],
    medicalBSN: {
      definition: 'A single ectopic cardiac impulse originating from an irritable atrial focus outside the SA node, firing earlier than the next expected sinus beat. Conducts through AV node and ventricles normally, resulting in a narrow QRS preceded by an abnormal P wave.',
      electrophysiology: 'Enhanced automaticity or triggered activity in atrial myocardial tissue. The premature P wave depolarizes atria and resets the SA node clock, typically resulting in an incomplete (non-compensatory) pause.',
      clinicalCauses: [
        'Adrenergic triggers: Emotional stress, fatigue, high caffeine, nicotine, alcohol',
        'Electrolyte imbalances: Hypokalemia, hypomagnesemia',
        'Atrial stretch: Congestive heart failure, pulmonary hypertension, COPD/hypoxia',
        'Early herald of impending Atrial Fibrillation or Atrial Flutter'
      ],
      hemodynamicImpact: 'Usually benign. Frequent PACs (e.g. bigeminy) can reduce stroke volume due to abbreviated diastolic filling, causing palpitations or "skipped beat" sensation.',
      nursingPriorities: [
        'Ask patient if they feel "fluttering" or "skipped beats" in their chest',
        'Check serum electrolytes (Potassium and Magnesium levels)',
        'Review recent stimulant intake (energy drinks, coffee, tobacco)'
      ],
      aclsInterventions: [
        'Usually no emergency medication needed',
        'Treat underlying cause: Rehydrate, replenish K+/Mg2+, eliminate caffeine/stress',
        'Beta-blockers if severely symptomatic and frequent'
      ]
    },
    childMetaphor: {
      title: 'The Eager Kid Who Cut the Lunch Line',
      story: 'Everyone was standing in a neat line for lunch. Suddenly, an energetic kid from the back of the room jumps ahead early shouting "ME FIRST!" Everyone behind him pauses for a second, surprised, before getting back in line.',
      takeaway: 'An early beat that jumps in before its turn, with a weird-looking P wave.'
    },
    clinicalMetaphor: {
      title: 'The Hiccup in the Conversation',
      simile: 'Like speaking smoothly and suddenly having a quick little hiccup: the sentence skips for a fraction of a second, then resumes normally.',
      visualAnchor: 'Look closely at the preceding T wave — if it looks pointy, notched, or "pregnant", the early P wave is hiding right on its back!'
    },
    mnemonics: [
      'PAC: Premature Atrial Cue = Peek At the T wave for the hidden P!',
      'Irritable Atria: Caffeine, Stress, and Low Magnesium make the atria twitchy.'
    ],
    clinicalPearl: 'If you see an unexpected pause without a QRS, look at the preceding T wave. If there is a hidden ectopic P wave that failed to conduct through the AV node, that is a Non-Conducted (Blocked) PAC — the most common cause of unexplained pauses!',
    waveform: {
      type: 'pac',
      pAmp: 18,
      pWidth: 16,
      prLength: 4,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'paroxysmal-atrial-tachycardia',
    name: 'Paroxysmal Atrial Tachycardia (PAT / PSVT)',
    aka: 'PSVT / Paroxysmal Supraventricular Tachycardia',
    category: 'atrial',
    heartRate: '150 - 250 beats/min (abrupt onset and termination)',
    rateBpm: 180,
    regularity: 'Regular during paroxysm',
    pWave: 'Abnormal morphology, frequently buried inside preceding T wave',
    prInterval: 'Difficult or impossible to measure due to rate and hidden P',
    qrsDuration: '0.04 - 0.12 seconds (Narrow complex unless aberrancy exists)',
    slideNumber: 15,
    tags: ['Atrial', 'Paroxysmal', 'Adenosine', 'Vagal'],
    medicalBSN: {
      definition: 'A tachyarrhythmia originating in atrial tissue or the AV junction that starts and stops suddenly ("paroxysm"), characterized by rapid, regular narrow-complex tachycardia between 150-250 bpm.',
      electrophysiology: 'Most commonly triggered by a PAC that initiates a micro-reentry circuit within the atria or AV nodal dual pathways (AVNRT). Rapid retrograde and antegrade conduction causes P waves to merge seamlessly with T waves.',
      clinicalCauses: [
        'Accessory pathways (Wolff-Parkinson-White syndrome), AV nodal reentry',
        'Mitral valve prolapse, rheumatic heart disease, coronary artery disease',
        'Physical exhaustion, extreme emotional stress, illicit stimulants, hyperthyroidism'
      ],
      hemodynamicImpact: 'Extreme rate drastically truncates diastole. Ventricles have virtually no time to fill, dropping cardiac output by 30-50%. Patients experience chest tightness, palpitations, presyncope, and acute pulmonary edema.',
      nursingPriorities: [
        'Place patient on continuous 12-lead ECG monitor immediately',
        'Verify hemodynamically stable vs unstable (blood pressure, mental status, chest pain)',
        'Establish large-bore IV (18G or 20G) in the antecubital fossa as close to the heart as possible for Adenosine!'
      ],
      aclsInterventions: [
        'Stable: 1) Vagal maneuvers (modified Valsalva maneuver with leg raise, carotid massage if no bruit)',
        'Stable Pharmacologic: Adenosine 6 mg rapid IV push over 1-2 seconds immediately followed by a 20 mL rapid saline flush and arm elevation. If no conversion in 1-2 min, give Adenosine 12 mg rapid IV push.',
        'Unstable (hypotension, acute altered mental status, signs of shock, ischemic chest discomfort): Immediate Synchronized Cardioversion (50-100 J biphasic)'
      ]
    },
    childMetaphor: {
      title: 'The Runaway Toy Racecar',
      story: 'Someone wound up a tiny toy racecar spring way too tight! It was sitting still on the table, and suddenly — VROOOOOOM! It shoots across the floor buzzing at lightspeed! Then, with one quick tap of your shoe, it stops instantly and sits quietly again.',
      takeaway: 'Starts like a light switch flipping ON, zooms at 180 bpm, and stops like a light switch flipping OFF.'
    },
    clinicalMetaphor: {
      title: 'The Electric Hair Dryer on High Speed',
      simile: 'Like clicking a high-powered hair dryer directly from OFF to MAXIMUM TURBO — a sudden scream of speed with zero ramp-up time.',
      visualAnchor: 'Picket-fence tall narrow towers where P and T waves melt into a single pointed peak.'
    },
    mnemonics: [
      'PSVT: Please Stop, Vagus or Ten-second Adenosine!',
      'Adenosine Rules: Fast push, fast flush, hold arm high, warn patient of the "impending doom" flatline feel for 3 seconds.'
    ],
    clinicalPearl: 'Always educate the patient BEFORE pushing Adenosine: "You are going to feel a hot flush and a brief heavy sensation in your chest for 5-10 seconds." Warn new nurses not to panic when the monitor shows a 3-second asystolic pause before sinus rhythm restarts!',
    waveform: {
      type: 'pat-psvt',
      pAmp: 12,
      pWidth: 10,
      prLength: 2.5,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'supraventricular-tachycardia',
    name: 'Supraventricular Tachycardia (SVT)',
    aka: 'Sustained Narrow Complex Tachycardia',
    category: 'atrial',
    heartRate: 'Greater than 150 beats/min (typically 150 - 220 bpm)',
    rateBpm: 195,
    regularity: 'Regular',
    pWave: 'Hidden or unidentifiable (submerged in preceding T waves)',
    prInterval: 'Unmeasurable (cannot distinguish P wave from T wave)',
    qrsDuration: '0.04 - 0.12 seconds (Narrow complex)',
    slideNumber: 16,
    tags: ['SVT', 'Narrow Complex', 'Synchronized Cardioversion', 'Adenosine'],
    medicalBSN: {
      definition: 'An umbrella clinical descriptor for any rapid, regular narrow-complex tachycardia originating above the bifurcation of the Bundle of His, where definitive P-wave morphology cannot be distinguished on the surface rhythm strip.',
      electrophysiology: 'Rapid repetitive electrical circuit operating within atrial tissue or AV node. Ventricular depolarization proceeds normally through the specialized His-Purkinje bundle, keeping the QRS narrow (<0.12s), while high rate obscures atrial repolarization/depolarization landmarks.',
      clinicalCauses: [
        'Atrioventricular Nodal Reentrant Tachycardia (AVNRT - ~60% of cases)',
        'Atrioventricular Reentrant Tachycardia (AVRT via accessory pathway - ~30%)',
        'Atrial Tachycardia, caffeine, theophylline, sympathomimetics, myocarditis'
      ],
      hemodynamicImpact: 'Severely impaired stroke volume. Myocardial oxygen demand skyrockets while coronary perfusion time plummets. Can precipitate myocardial infarction in patients with underlying coronary artery disease.',
      nursingPriorities: [
        'Assess hemodynamic stability IMMEDIATELY: Is patient pale, diaphoretic, hypotensive (SBP < 90), or complaining of crushing angina?',
        'Apply defibrillator pads in anterior-lateral or anterior-posterior positions',
        'Verify sync mode is ON if cardioversion is ordered!'
      ],
      aclsInterventions: [
        'Hemodynamically Stable: 1) Vagal maneuvers, 2) Adenosine 6 mg IV rapid push -> 12 mg if needed, 3) Diltiazem or Metoprolol IV',
        'Hemodynamically Unstable: Synchronized Cardioversion (initial 50-100 J). Must confirm "SYNC" flag marks each R wave to avoid R-on-T induced Ventricular Fibrillation!'
      ]
    },
    childMetaphor: {
      title: 'The Hummingbird Wings',
      story: 'Have you ever watched a hummingbird flap its wings? It beats so fast that your eyes can’t see each flap anymore — it just looks like a blurry little hum! That is what the top of the heart is doing in SVT.',
      takeaway: 'Super fast, super narrow, and the P waves are blurred out of sight.'
    },
    clinicalMetaphor: {
      title: 'The Sewing Machine on Maximum Pedal',
      simile: 'Like holding the pedal down on an industrial sewing machine — needles piercing fabric in rapid machine-gun succession without pause.',
      visualAnchor: 'A tight picket fence of narrow sharp needles with zero flat baseline between them.'
    },
    mnemonics: [
      'SVT: So Very Tachy! Narrow QRS means source is Above the ventricles!',
      'SYNC for SVT: Always push the SYNC button on the defib so you don’t deliver a shock on the T wave!'
    ],
    clinicalPearl: 'How do you tell Sinus Tachycardia from SVT? Sinus Tachycardia rarely exceeds 150 bpm at rest and has visible upright P waves. SVT is usually > 150 bpm and P waves are completely swallowed by the preceding T wave!',
    waveform: {
      type: 'svt',
      pAmp: 10,
      pWidth: 8,
      prLength: 2,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'atrial-flutter',
    name: 'Atrial Flutter',
    aka: 'A-Flutter / Sawtooth Rhythm',
    category: 'atrial',
    heartRate: 'Atrial rate 250 - 350 bpm; Ventricular rate depends on AV conduction ratio (usually 2:1 = 150 bpm, 3:1 = 100 bpm, 4:1 = 75 bpm)',
    rateBpm: 150,
    regularity: 'Regular if conduction ratio is fixed (e.g. 2:1); Irregular if variable block',
    pWave: 'No true P waves; characteristic uniform "Sawtooth" or "Picket-fence" F-waves (flutter waves)',
    prInterval: 'None measurable (no true P wave baseline exists)',
    qrsDuration: '0.04 - 0.12 seconds (Normal narrow QRS)',
    slideNumber: 17,
    tags: ['Atrial', 'Sawtooth', 'F-waves', 'Stroke Risk', 'Anticoagulation'],
    medicalBSN: {
      definition: 'A macro-reentrant supraventricular tachydysrhythmia characterized by a continuous rapid circuit circling the right atrium (typically around the tricuspid valve annulus) at ~300 bpm. The AV node acts as a protective gatekeeper, filtering impulses so only every 2nd, 3rd, or 4th wave reaches the ventricles.',
      electrophysiology: 'Cavo-tricuspid isthmus (CTI) dependent reentrant loop creating identical biphasic negative flutter waves in inferior leads (II, III, aVF) resembling saw blades.',
      clinicalCauses: [
        'Chronic Obstructive Pulmonary Disease (COPD) / Cor Pulmonale',
        'Valvular heart disease (especially mitral and tricuspid)',
        'Coronary artery disease, acute pulmonary embolism, cardiomyopathy',
        'Post-cardiac surgery (CABG, valve replacement)'
      ],
      hemodynamicImpact: 'Loss of coordinated atrial contraction ("atrial kick" drops cardiac output by 20-30%). High ventricular rates induce heart failure. Stagnant blood in the atrial appendages creates severe thromboembolism (stroke) risk.',
      nursingPriorities: [
        'Count the flutter waves between QRS complexes to identify the ratio (e.g., 2 flutter waves per 1 QRS = 2:1 conduction)',
        'Assess for signs of systemic embolization (sudden focal neurological deficit, cold painful extremity)',
        'Check anticoagulation status (INR, DOAC therapy) before cardioversion!'
      ],
      aclsInterventions: [
        'Rate Control: IV Diltiazem or Beta-blockers to slow AV conduction',
        'Rhythm Control / Cardioversion: Highly responsive to low-energy Synchronized Cardioversion (50 J biphasic)',
        'Definitive Cure: Catheter ablation of the cavotricuspid isthmus (CTI ablation >95% success rate)'
      ]
    },
    childMetaphor: {
      title: 'The Buzzing Saw Blade and the School Gatekeeper',
      story: 'Upstairs in the atrium, an electric buzzsaw is spinning around and around: buzz-buzz-buzz (sawtooth waves)! But the principal at the school gate (the AV node) stands firm and says: "Whoa there! I will only let every second student pass through to the playground!" So the playground stays organized while the saw buzzes upstairs.',
      takeaway: 'Looks like the sharp teeth of a carpenter’s saw blade between narrow steps.'
    },
    clinicalMetaphor: {
      title: 'The Carpenter’s Hand Saw',
      simile: 'Like taking a carpenter’s hand saw and pressing the sharp serrated teeth directly into the paper between each heartbeat.',
      visualAnchor: 'Sharp, rhythmic, identical triangular teeth marching along the baseline.'
    },
    mnemonics: [
      'FLUTTER = Fixed 300 bpm Atrium, Locked Sawteeth, Usually 2:1 block (150 bpm ventricles), Thrombus risk, Treat with Sync Cardioversion or Diltiazem!',
      'Sawtooth in the Water: Shark fins circling the heart!'
    ],
    clinicalPearl: 'A regular narrow-complex tachycardia at EXACTLY 150 bpm is Atrial Flutter with 2:1 block until proven otherwise! Turn the monitor voltage up or print a 12-lead strip to inspect inferior leads II, III, and aVF for the hidden sawtooth waves.',
    waveform: {
      type: 'a-flutter',
      pAmp: 14,
      pWidth: 12,
      sawtooth: true,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'atrial-fibrillation',
    name: 'Atrial Fibrillation (Afib)',
    aka: 'A-Fib / Irregularly Irregular',
    category: 'atrial',
    heartRate: 'Atrial rate > 350 - 600 bpm; Ventricular rate variable (Controlled: <100 bpm; Rapid Ventricular Response [RVR]: >100 bpm)',
    rateBpm: 135,
    regularity: 'Irregularly Irregular (no discernible pattern whatsoever)',
    pWave: 'No discrete P waves; chaotic, fibrillatory baseline waves (f-waves)',
    prInterval: 'None measurable (no P waves exist)',
    qrsDuration: '0.04 - 0.12 seconds (Normal narrow QRS)',
    slideNumber: 18,
    tags: ['Atrial', 'Irregularly Irregular', 'RVR', 'Clot Risk', 'Blood Thinners'],
    medicalBSN: {
      definition: 'The most prevalent sustained cardiac dysrhythmia, characterized by totally disorganized, chaotic atrial depolarization from hundreds of micro-reentrant wavelets, resulting in ineffective quivering of the atria and an "irregularly irregular" ventricular response.',
      electrophysiology: 'Multiple chaotic wavelets circulating simultaneously in the atria, primarily triggered by ectopic foci within the pulmonary veins. The AV node is bombarded with >400 impulses/min and conducts them randomly as its refractory period allows.',
      clinicalCauses: [
        'Hypertension, Coronary artery disease, Heart failure with atrial dilation',
        'Valvular heart disease (Mitral stenosis / regurgitation)',
        'Obstructive sleep apnea, Obesity, Chronic alcohol binge ("Holiday Heart Syndrome")',
        'Post-cardiothoracic surgery, Hyperthyroidism, Pulmonary embolism'
      ],
      hemodynamicImpact: 'Complete loss of atrial kick (20-30% loss of stroke volume). When combined with rapid ventricular response (RVR > 100), diastolic filling drops drastically, causing acute decompensated heart failure. Stasis in the left atrial appendage creates massive stroke risk.',
      nursingPriorities: [
        'Auscultate apical pulse for one full minute while palpating radial pulse — calculate "Pulse Deficit" (apical beats that fail to perfuse the wrist)!',
        'Assess whether rate is Controlled (<100 bpm) or RVR (>100 bpm)',
        'Check patient for Stroke signs (FAST: Facial droop, Arm weakness, Slurred speech, Time)',
        'Monitor anticoagulation therapy (Warfarin INR 2.0-3.0, Apixaban, Rivaroxaban)'
      ],
      aclsInterventions: [
        'Stable with RVR: Rate control first-line with IV Diltiazem (Cardizem) bolus (0.25 mg/kg over 2 min) + maintenance infusion, or IV Metoprolol',
        'Anticoagulation: If Afib > 48 hours, cardioversion requires prior transesophageal echocardiogram (TEE) to rule out left atrial clot, or 3-4 weeks therapeutic anticoagulation!',
        'Unstable (SBP < 90, altered LOC, angina, acute pulmonary edema): Immediate Synchronized Cardioversion (120-200 J biphasic)'
      ]
    },
    childMetaphor: {
      title: 'The Angry Shaking Jell-O Bowl',
      story: 'Instead of the top of the heart squeezing like a firm balloon, imagine a bowl of lime Jell-O sitting on a washing machine that is violently vibrating! The Jell-O jiggles frantically in a million directions, and marble drops through the drain hole totally at random whenever there’s an opening.',
      takeaway: 'Wiggly chaotic baseline with completely random, unpredictable heartbeat steps.'
    },
    clinicalMetaphor: {
      title: 'The Frantic Beehive Without a Queen',
      simile: 'Like a beehive where thousands of bees are buzzing in frantic disorganized panic with no queen directing them.',
      visualAnchor: 'A squiggly, jittery flatline with R-waves popping up like popcorn at totally random intervals.'
    },
    mnemonics: [
      'AFIB = All Fibrillating, Irregularly Irregular, Blood clots form, Initiate Rate control & Anticoagulation!',
      'Irregularly Irregular: If you tap your foot and can’t find ANY rhythm or beat pattern, it’s AFIB!'
    ],
    clinicalPearl: 'If a patient has been in Afib for more than 48 hours, you must NEVER convert them back to normal rhythm without a TEE or anticoagulation. Squeezing an atrium that has been quivering for days will launch a clot straight up the carotid artery into the brain!',
    waveform: {
      type: 'a-fib',
      fibrillatory: true,
      irregularRR: true,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  // -------------------------------------------------------------
  // ATRIO-VENTRICULAR (AV) HEART BLOCKS
  // -------------------------------------------------------------
  {
    id: 'first-degree-av-block',
    name: 'First-degree AV Block',
    aka: '1° AV Block / Prolonged PR',
    category: 'blocks',
    heartRate: 'Underlying sinus rate (usually normal 60-100 bpm, but can be bradycardic or tachycardic)',
    rateBpm: 68,
    regularity: 'Regular',
    pWave: 'Present, upright, uniform, 1 P wave before every QRS complex',
    prInterval: 'Consistently PROLONGED: Greater than 0.20 seconds (> 5 small boxes) and CONSTANT',
    qrsDuration: '0.04 - 0.12 seconds (Normal narrow QRS)',
    slideNumber: 25,
    tags: ['AV Block', 'PR > 0.20s', 'Constant', 'Benign', 'Poem Line 1'],
    medicalBSN: {
      definition: 'A delay in electrical conduction through the AV node or His-Purkinje system where every single atrial impulse eventually conducts through to the ventricles, but takes longer than normal. Defined by a prolonged PR interval > 0.20 seconds that is uniform and constant across every beat.',
      electrophysiology: 'Conduction slowing localized within the AV node (most common) or rarely in the intra-atrial pathways or His bundle. There are NO dropped beats; every P wave produces a QRS complex (1:1 conduction).',
      clinicalCauses: [
        'Normal physiological variation in athletes with high resting vagal tone',
        'AV-nodal blocking pharmacotherapy: Beta-blockers, CCBs, Digoxin, Amiodarone',
        'Inferior wall myocardial infarction (ischemia to AV nodal branch of RCA)',
        'Electrolyte imbalances (hyperkalemia), Rheumatic fever, Lyme disease'
      ],
      hemodynamicImpact: 'Generally produces zero hemodynamic compromise. Cardiac output remains intact because no beats are dropped and heart rate is preserved.',
      nursingPriorities: [
        'Measure PR interval with calipers across multiple leads — verify it is > 0.20s and uniform',
        'Check patient’s current medications (is a beta blocker being titrated up?)',
        'Monitor for progression to higher-degree AV blocks (Mobitz I or Mobitz II)'
      ],
      aclsInterventions: [
        'No emergency treatment or pacing required',
        'Review and adjust doses of AV-nodal blocking medications if PR > 0.30s'
      ]
    },
    childMetaphor: {
      title: 'The Polite Long-Distance Hallway Walk',
      story: 'Every time the teacher rings the bell (P wave), the student walks down the hallway to the classroom door (QRS). But this student walks very, very slowly and takes his sweet time! He NEVER misses class — he arrives for every single bell — he just takes an extra long stroll through the hall.',
      takeaway: 'Every bell leads to a class, but the hallway walk (PR interval) is extra long.'
    },
    clinicalMetaphor: {
      title: 'The Long-Distance Relationship',
      simile: 'Like two partners living in different cities: they talk every single evening without fail, but the distance between them is always long.',
      visualAnchor: 'A wide, obvious gap of pink paper between the P wave and the QRS that stays exactly the same width on every single beat.'
    },
    mnemonics: [
      'Heart Block Poem Line 1: "If the R is far from P, then you have a FIRST DEGREE!"',
      'PR > 0.20s = Bigger than 1 big box!'
    ],
    clinicalPearl: 'The easiest way to spot First-Degree AV Block at a glance: If the gap between the start of the P wave and the start of the QRS is wider than ONE LARGE BOX on the ECG paper, you have First-Degree AV Block!',
    waveform: {
      type: 'first-degree-block',
      pAmp: 18,
      pWidth: 16,
      prLength: 7, // prolonged > 5 boxes
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'second-degree-av-block-type-1',
    name: 'Second-degree AV Block, Type I (Mobitz I, Wenckebach)',
    aka: 'Mobitz I / Wenckebach / Mobitz Type 1',
    category: 'blocks',
    heartRate: 'Atrial rate normal (60-100); Ventricular rate slower due to dropped QRS complexes',
    rateBpm: 60,
    regularity: 'Irregular (repeating cyclical pattern: R-R progressively shortens until a beat is dropped)',
    pWave: 'Normal size and shape; more P waves than QRS complexes',
    prInterval: 'PROGRESSIVELY LENGTHENS with each successive beat until a QRS is completely dropped (missing)',
    qrsDuration: '0.04 - 0.12 seconds (Normal on conducted beats; absent on dropped beat)',
    slideNumber: 26,
    tags: ['AV Block', 'Wenckebach', 'Longer Longer Drop', 'Inferior MI', 'Poem Line 2'],
    medicalBSN: {
      definition: 'A progressive fatigue of the AV node where each successive atrial impulse encounters greater conduction delay (progressive PR prolongation) until an impulse is completely blocked, producing a solitary P wave without a QRS complex. The cycle then resets.',
      electrophysiology: 'Decremental conduction localized inside the AV node. The relative refractory period of AV nodal tissue increases progressively with each beat until an impulse arrives during the absolute refractory period and fails to conduct.',
      clinicalCauses: [
        'Acute inferior myocardial infarction (RCA ischemia to the AV node)',
        'Medication toxicity (Digoxin, Beta-blockers, Diltiazem, Verapamil)',
        'High vagal tone (athletes, sleep apnea)',
        'Myocarditis, acute rheumatic carditis'
      ],
      hemodynamicImpact: 'Usually benign and transient because the escape mechanism is reliable and the block is within the AV node itself. Symptomatic only if the ventricular rate drops excessively low.',
      nursingPriorities: [
        'March out the PR intervals: look for the classic "Short -> Longer -> Longest -> DROPPED QRS!" pattern',
        'Assess patient for symptomatic bradycardia (dizziness, diaphoresis, hypotension)',
        'Watch for progression toward complete heart block in acute MI patients'
      ],
      aclsInterventions: [
        'Asymptomatic: Observe, monitor, hold AV-blocking drugs',
        'Symptomatic: Atropine 1 mg IV push (Wenckebach responds well to atropine because the block is inside the AV node!)',
        'Temporary transcutaneous pacing if atropine fails and patient is hypoperfused'
      ]
    },
    childMetaphor: {
      title: 'The Tired Mailman',
      story: 'On Monday, the mailman drops the letter off on time. On Tuesday, he is tired and arrives 10 minutes late. On Wednesday, he is exhausted and arrives 30 minutes late. On Thursday, he is so tired that he takes a nap and completely skips delivery! On Friday, he feels refreshed and starts all over again.',
      takeaway: 'Longer... longer... longer... DROPPED! Then starts over.'
    },
    clinicalMetaphor: {
      title: 'The Stretchy Rubber Band that Snaps',
      simile: 'Like stretching an elastic rubber band further and further until — SNAP! — it breaks, and you pick up a fresh one.',
      visualAnchor: 'PR space stretching out like an accordion until an orphaned P wave sits alone with no QRS beside it.'
    },
    mnemonics: [
      'Heart Block Poem Line 2: "Longer, longer, longer, drop! Then you have a WENCKEBACH!"',
      'Wenckebach Warning: Going, going, GONE!'
    ],
    clinicalPearl: 'Wenckebach almost always occurs WITHIN the AV node itself, which means it usually responds beautifully to Atropine! Mobitz II, on the other hand, occurs below the AV node and will NOT respond to Atropine.',
    waveform: {
      type: 'second-degree-type-1',
      pAmp: 18,
      pWidth: 16,
      wenckebachCycle: true,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'second-degree-av-block-type-2',
    name: 'Second-degree AV Block, Type II (Mobitz II)',
    aka: 'Mobitz II / Infranodal Block',
    category: 'blocks',
    heartRate: 'Atrial rate normal (60-100); Ventricular rate slow (often 30-50 bpm depending on conduction ratio)',
    rateBpm: 45,
    regularity: 'Usually irregular (or regular if fixed 2:1 or 3:1 conduction ratio)',
    pWave: 'Normal, upright; more P waves than QRS complexes',
    prInterval: 'CONSTANT and UNCHANGING on all conducted beats, then suddenly a QRS is dropped without warning!',
    qrsDuration: '0.04 - 0.12s (normal) or often > 0.12s (wide due to bundle branch disease)',
    slideNumber: 27,
    tags: ['AV Block', 'Mobitz II', 'High Danger', 'Pacemaker', 'Poem Line 3'],
    medicalBSN: {
      definition: 'An intermittent failure of conduction located BELOW the AV node (in the Bundle of His or bilateral bundle branches), where PR intervals remain strictly constant on conducted beats, but one or more QRS complexes are abruptly dropped without preceding PR prolongation.',
      electrophysiology: 'All-or-none infranodal conduction block. Conduction fibers in the His-Purkinje system are diseased or infarcted; they conduct at normal velocity when able, but unpredictably fail to conduct, dropping ventricular activation.',
      clinicalCauses: [
        'Anterior wall myocardial infarction (LAD occlusion causing septal necrosis of bundle branches)',
        'Degenerative fibrosis of the cardiac conduction system (Lenègre or Lev disease)',
        'Cardiomyopathy, Lyme carditis, post-TAVR or valve surgery'
      ],
      hemodynamicImpact: 'HIGHLY UNSTABLE and DANGEROUS. Ventricular rate is severely depressed, stroke volume compromised, and has an extremely high propensity to suddenly degenerate into lethal complete Third-Degree AV Block or Asystole.',
      nursingPriorities: [
        'Treat this as an absolute cardiac emergency: notify physician immediately!',
        'Apply transcutaneous pacing pads to the patient’s chest and back right now!',
        'Prepare patient for emergent transvenous pacing and permanent pacemaker placement'
      ],
      aclsInterventions: [
        'Transcutaneous Pacing (TCP) is the primary immediate emergency intervention!',
        'ATROPINE IS GENERALLY INEFFECTIVE and may worsen the block by accelerating atrial rate against blocked infranodal bundles!',
        'Dopamine or Epinephrine infusion for inotropic/chronotropic support while awaiting pacer wire'
      ]
    },
    childMetaphor: {
      title: 'The Broken Trampoline',
      story: 'Two kids are jumping on a trampoline. One kid (P wave) jumps up high every single time. Most times the second kid (QRS) jumps right after him. But without any warning at all, the second kid completely vanishes through a trapdoor! He didn’t slow down or get tired — he just randomly disappeared!',
      takeaway: 'Normal distance every time, then BAM — a heartbeat drops with zero warning.'
    },
    clinicalMetaphor: {
      title: 'The Trapdoor on the Stage',
      simile: 'Like an actor walking across a stage at regular pace who suddenly plunges through an unexpected open trapdoor with no stumble beforehand.',
      visualAnchor: 'P waves marching out like soldiers, PR intervals look identical, but suddenly an orphan P wave has no QRS partner.'
    },
    mnemonics: [
      'Heart Block Poem Line 3: "If some Ps don’t get through, then you have MOBITZ II!"',
      'Mobitz II = Mobitz TWO needs a pacemaker TOO!'
    ],
    clinicalPearl: 'Never give Atropine blindly to Mobitz II! The block is below the AV node. Speeding up the SA node with atropine will bombard the broken bundle branches with more impulses, dropping even more ventricular beats and causing cardiac arrest!',
    waveform: {
      type: 'second-degree-type-2',
      pAmp: 18,
      pWidth: 16,
      mobitz2Drop: true,
      prLength: 4,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'third-degree-av-block',
    name: 'Third-degree AV Block (Complete Heart Block)',
    aka: 'Complete Heart Block / CHB / AV Dissociation',
    category: 'blocks',
    heartRate: 'Atrial rate 60-100 bpm; Ventricular escape rate 20-40 bpm (or 40-60 if junctional)',
    rateBpm: 32,
    regularity: 'Regular P-to-P intervals AND Regular R-to-R intervals, but NO RELATIONSHIP between them!',
    pWave: 'Normal morphology; marches out perfectly regular; some buried inside QRS or T waves',
    prInterval: 'Completely variable and unmeasurable — no relationship between P waves and QRS complexes',
    qrsDuration: 'Wide > 0.12s if ventricular escape focus; narrow 0.04-0.12s if junctional escape focus',
    slideNumber: 28,
    tags: ['AV Block', 'Complete Block', 'AV Dissociation', 'Code Threat', 'Poem Line 4'],
    medicalBSN: {
      definition: 'Complete absence of electrical conduction between atria and ventricles (complete atrioventricular dissociation). The atria beat independently under SA nodal control, while an independent junctional or ventricular pacemaker generates an escape rhythm to keep the ventricles beating.',
      electrophysiology: 'Total anatomic or functional transection of the conduction pathway at the AV node, Bundle of His, or bilateral bundle branches. Impulses from atria cannot penetrate the ventricles. The two chambers march to entirely separate drummers.',
      clinicalCauses: [
        'Extensive Acute Myocardial Infarction (Anterior MI with LAD occlusion or Inferior MI with RCA occlusion)',
        'Severe degenerative conduction system fibrosis (Lev’s or Lenègre’s disease)',
        'Severe hyperkalemia, severe digitalis or beta-blocker poisoning',
        'Post-aortic valve replacement surgery'
      ],
      hemodynamicImpact: 'Critical hemodynamic compromise. Ventricular rates of 20-40 bpm drop cardiac output drastically, causing severe hypotension, syncope (Stokes-Adams attacks), cardiogenic shock, and sudden cardiac death.',
      nursingPriorities: [
        'Grab the crash cart and bring it to the bedside immediately',
        'Attach transcutaneous pacing pads; set pacer to demand mode',
        'Do not leave the patient’s room — maintain continuous vital signs monitoring'
      ],
      aclsInterventions: [
        'Immediate Transcutaneous Pacing (TCP) for symptomatic hypoperfusion',
        'Dopamine infusion (5-20 mcg/kg/min) or Epinephrine infusion (2-10 mcg/min)',
        'Atropine is usually completely ineffective for infranodal complete heart block',
        'Emergent Transvenous Pacing wire placement -> Permanent Pacemaker implantation'
      ]
    },
    childMetaphor: {
      title: 'The Great Divorce',
      story: 'The upstairs neighbors (Atria) and downstairs neighbors (Ventricles) had a huge fight and got divorced! They refuse to talk to each other anymore. Upstairs plays his drum at 80 beats a minute. Downstairs plays his guitar at 30 beats a minute. Neither one listens to the other, but both keep their own steady beat.',
      takeaway: 'Upstairs and downstairs do their own thing. Total divorce!'
    },
    clinicalMetaphor: {
      title: 'The Soundproof Floor Between Two Bands',
      simile: 'Like two separate music bands playing in a two-story building with soundproof concrete between them: you can hear both, but they have zero tempo connection.',
      visualAnchor: 'P waves marching across the strip at their own pace, casually landing on slopes, peaks, and valleys of unrelated QRS complexes.'
    },
    mnemonics: [
      'Heart Block Poem Line 4: "If Ps and Qs don’t agree, then you have a THIRD DEGREE!"',
      'CHB: Complete Heart Block = Call Help Bro! Calipers prove Ps march regular & Qs march regular!'
    ],
    clinicalPearl: 'Use your calipers to prove Complete Heart Block! Place one caliper tip on a P wave and march out across the strip: every P-P interval is identical. Then place your calipers on an R wave and march out: every R-R is identical. That proves complete AV dissociation!',
    waveform: {
      type: 'third-degree-block',
      pAmp: 18,
      pWidth: 16,
      chbDissociation: true,
      qrsWidth: 4,
      qrsAmp: 90
    }
  },

  // -------------------------------------------------------------
  // VENTRICULAR DYSRHYTHMIAS
  // -------------------------------------------------------------
  {
    id: 'premature-ventricular-complex',
    name: 'Premature Ventricular Complex (PVC)',
    aka: 'PVC / Ventricular Premature Beat',
    category: 'ventricular',
    heartRate: 'Depends on underlying rhythm (PVCs interrupt normal cadence)',
    rateBpm: 74,
    regularity: 'Irregular due to early wide bizarre ectopic beat',
    pWave: 'Absent before the PVC (ventricles depolarize independently)',
    prInterval: 'None measurable for the PVC',
    qrsDuration: 'WIDE and BIZARRE: Greater than 0.12 seconds (> 3 small boxes); T wave deflected opposite QRS',
    slideNumber: 31,
    tags: ['Ventricular', 'PVC', 'Wide & Bizarre', 'Compensatory Pause', 'Electrolytes'],
    medicalBSN: {
      definition: 'An ectopic cardiac impulse arising directly from an irritable focus within the ventricular myocardium or Purkinje system, discharging prior to the next anticipated sinus beat. Conduction travels cell-to-cell through ventricular muscle rather than the specialized conduction highway, creating a wide, distorted QRS.',
      electrophysiology: 'Slow muscle-fiber conduction creates a prolonged depolarization vector (>0.12s) with discordant ST-T segment (T wave points in the opposite direction of the main QRS deflection). The SA node fires independently, leading to a full compensatory pause.',
      clinicalCauses: [
        'Electrolyte derangements: Hypokalemia, Hypomagnesemia (top nursing checks!)',
        'Acute myocardial ischemia / infarction, reperfusion',
        'Hypoxia, acidosis, elevated endogenous adrenaline / stress',
        'Stimulants: Caffeine, nicotine, cocaine, amphetamines',
        'Mechanical irritation: Central venous catheter or pulmonary artery line tickling the right ventricle'
      ],
      hemodynamicImpact: 'A single PVC is common and usually benign. Frequent PVCs (bigeminy = every other beat, trigeminy = every 3rd beat, couplets = 2 in a row, runs = 3+ in a row) impair cardiac output and can trigger lethal Ventricular Tachycardia via the "R-on-T" phenomenon.',
      nursingPriorities: [
        'Check serum Potassium (target 4.0 mEq/L in cardiac patients) and Magnesium (target 2.0 mg/dL)',
        'Check pulse during the PVC: Does the early beat produce a peripheral radial pulsation?',
        'Look for warning patterns: Couplets, multifocal PVCs (different shapes), or R-on-T!'
      ],
      aclsInterventions: [
        'Treat underlying etiology: Replace K+ and Mg2+, correct hypoxia with oxygen',
        'If symptomatic and frequent post-MI: IV Amiodarone or Lidocaine infusion',
        'Beta-blockers for chronic symptomatic PVCs'
      ]
    },
    childMetaphor: {
      title: 'The Big Clumsy Giant Stomping',
      story: 'Everyone in the dance line is stepping lightly in little dancing slippers. Suddenly, a big clumsy giant stomps in with huge heavy muddy boots! THUMP! He is twice as wide as everyone else and makes a giant mess, then stands still for a moment before the dancers resume.',
      takeaway: 'A big, wide, ugly heartbeat that stomps in early without asking.'
    },
    clinicalMetaphor: {
      title: 'The Monster Truck in the Compact Car Lane',
      simile: 'Like a giant monster truck with massive tires suddenly roaring into a lane of orderly compact electric cars.',
      visualAnchor: 'A wide, monstrous canyon or mountain (>3 small boxes) with an upside-down T wave that dwarfs the normal beats.'
    },
    mnemonics: [
      'PVC: Potent Ventricular Clumsiness = Wide, Bizarre, No P wave!',
      'Check the K+ and Mag: Low Potassium and Low Magnesium make the ventricles mad!'
    ],
    clinicalPearl: 'The R-on-T danger: If a PVC falls right on top of the vulnerable T-wave peak of the preceding beat, it can instantly tip the entire heart into Ventricular Fibrillation or Torsades de Pointes! Treat frequent PVCs proactively in post-MI patients.',
    waveform: {
      type: 'pvc',
      pAmp: 18,
      pWidth: 16,
      prLength: 4,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'ventricular-tachycardia',
    name: 'Ventricular Tachycardia (Vtach)',
    aka: 'V-Tach / VT / Monomorphic VT',
    category: 'ventricular',
    heartRate: '101 - 250 beats/min (typically 140 - 200 bpm)',
    rateBpm: 175,
    regularity: 'Usually regular',
    pWave: 'Usually absent or completely obscured by giant ventricular complexes (AV dissociation exists)',
    prInterval: 'None measurable',
    qrsDuration: 'WIDE and BIZARRE: Greater than 0.12 seconds (> 3 small boxes); uniform tombstones',
    slideNumber: 32,
    tags: ['Ventricular', 'V-Tach', 'Code Blue', 'Defibrillation', 'Amiodarone'],
    medicalBSN: {
      definition: 'A run of three or more consecutive PVCs discharging at a rate exceeding 100 bpm from an ectopic focus or reentrant circuit within the ventricles. Monomorphic VT features identical, uniform wide QRS complexes.',
      electrophysiology: 'Reentrant loop around myocardial scar tissue (e.g. post-infarction aneurysm) or heightened triggered automaticity. Rapid ventricular rates prevent diastolic ventricular filling and abolish atrial kick.',
      clinicalCauses: [
        'Coronary artery disease with prior myocardial infarction and scar formation',
        'Acute myocardial ischemia / acute STEMI',
        'Severe electrolyte derangements (critical hypokalemia, hypomagnesemia)',
        'Cardiomyopathy (dilated, hypertrophic), drug toxicities (antiarrhythmics, cocaine)'
      ],
      hemodynamicImpact: 'LETHAL CARDIAC EMERGENCY. Can present either WITH A PULSE (stable vs unstable) or PULSELESS (Code Blue cardiac arrest). Rapidly degenerates into Ventricular Fibrillation and death within minutes.',
      nursingPriorities: [
        'FIRST STEP: RUN TO THE PATIENT AND CHECK A CAROTID PULSE! Is the patient awake? Do they have a pulse?',
        'If NO PULSE -> Immediately yell "CODE BLUE!", begin high-quality chest compressions, call for the defibrillator!',
        'If PULSE IS PRESENT -> Check blood pressure and mentation. Apply pads, administer high-flow oxygen, establish IV access'
      ],
      aclsInterventions: [
        'PULSELESS V-TACH: SHOCKABLE! Defibrillate immediately (120-200 J biphasic), CPR 2 min, Epinephrine 1 mg IV Q3-5m, Amiodarone 300 mg IV push (second dose 150 mg)',
        'STABLE WITH PULSE: IV Amiodarone 150 mg infused over 10 minutes, or Procainamide/Sotalol infusion',
        'UNSTABLE WITH PULSE: Immediate Synchronized Cardioversion (100 J biphasic)'
      ]
    },
    childMetaphor: {
      title: 'The Row of Sharp Mountain Peaks',
      story: 'Imagine drawing a picture of giant, sharp jagged mountains across your paper without ever lifting your pencil: up, down, up, down, up, down! No clouds, no trees, no birds — just huge scary roller-coaster peaks over and over.',
      takeaway: 'Giant, wide, identical mountain waves zooming at lightning speed.'
    },
    clinicalMetaphor: {
      title: 'The Runaway Jackhammer',
      simile: 'Like an industrial pneumatic jackhammer vibrating violently against solid concrete at full throttle.',
      visualAnchor: 'A continuous, rhythmic wall of identical wide, rounded or sharp tombstones with zero baseline.'
    },
    mnemonics: [
      'V-TACH = Check a Pulse FIRST! No pulse = Shock! Pulse = Cardiovert or Amiodarone!',
      'Tombstone Waves: If you see tombstones, your patient might be headed for the cemetery unless you act!'
    ],
    clinicalPearl: 'The golden rule of nursing telemetry: Never shock a rhythm on the monitor before checking the patient! Loose leads brushing against a hairy chest or a patient vigorously brushing their teeth can create artifact that looks EXACTLY like V-Tach!',
    waveform: {
      type: 'vtach',
      qrsWidth: 5,
      qrsAmp: 95
    }
  },

  {
    id: 'torsades-de-pointes',
    name: 'Torsades de Pointes',
    aka: 'Torsades / Polymorphic VT / Twisting of the Points',
    category: 'ventricular',
    heartRate: '120 - 250 beats/min (irregularly fast)',
    rateBpm: 210,
    regularity: 'Irregular',
    pWave: 'None visible',
    prInterval: 'None measurable',
    qrsDuration: 'WIDE (> 0.12s); continuously twisting amplitude that waxes and wanes around isoelectric line',
    slideNumber: 33,
    tags: ['Ventricular', 'Torsades', 'Magnesium Sulfate', 'Prolonged QT'],
    medicalBSN: {
      definition: 'A specific lethal subtype of polymorphic ventricular tachycardia characterized by QRS complexes whose polarity and amplitude continuously twist around the isoelectric baseline in an undulating ribbon pattern. It is fundamentally triggered by a PROLONGED QT INTERVAL (QTc > 500 ms).',
      electrophysiology: 'Delayed ventricular repolarization (prolonged QT) produces Early Afterdepolarizations (EADs) during phase 2 or 3 of the action potential. When triggered activity hits an area of dispersion, it establishes a polymorphic wandering reentrant circuit.',
      clinicalCauses: [
        'Electrolyte depletion: SEVERE HYPOMAGNESEMIA and HYPOKALEMIA',
        'QT-Prolonging Medications: Macrolides (Azithromycin), Fluoroquinolones, Antipsychotics (Haloperidol), Antiarrhythmics (Amiodarone, Sotalol, Procainamide), Antiemetics (Ondansetron/Zofran), Methadone',
        'Congenital Long QT Syndromes (Romano-Ward, Jervell and Lange-Nielsen)',
        'Severe bradycardia or subarachnoid hemorrhage'
      ],
      hemodynamicImpact: 'Extreme hemodynamic collapse. Cardiac output falls to near zero during paroxysms. Frequently degenerates directly into Ventricular Fibrillation.',
      nursingPriorities: [
        'Check patient responsiveness and pulse immediately',
        'Shout for IV MAGNESIUM SULFATE STAT',
        'Audit the medication list for all QT-prolonging drugs and discontinue them immediately'
      ],
      aclsInterventions: [
        'FIRST-LINE DRUG: MAGNESIUM SULFATE 1 to 2 grams IV diluted in 10 mL D5W pushed over 1-2 minutes (even if serum magnesium level is reported normal!)',
        'Unstable with pulse / pulseless: Immediate Unsynchronized Defibrillation (the machine cannot sync to changing polymorphic peaks!)',
        'Overdrive pacing or Isoproterenol infusion to increase baseline heart rate and shorten QT interval'
      ]
    },
    childMetaphor: {
      title: 'The Twisting Gymnast Ribbon',
      story: 'Have you ever seen an Olympic gymnast twirling a long shiny ribbon on a stick? The ribbon swirls high up in the air, then swoops down low, twists around in spirals, gets narrow, and balloons out wide again in a giant spiral!',
      takeaway: 'Twisting peaks that get taller, then smaller, then flip upside-down like a ribbon.'
    },
    clinicalMetaphor: {
      title: 'The Twisting DNA Helix or Twisted Party Streamer',
      simile: 'Like holding both ends of a party streamer and twisting it into a repeating bow-tie corkscrew.',
      visualAnchor: 'Spindles of waves that swell large, pinch tiny in the middle, and flip polarity across the center line.'
    },
    mnemonics: [
      'TORSADES = Twisting of the Points -> Give MAGNESIUM!',
      'MAG for TORSADES: Mag cures the Bag of twisting snakes!'
    ],
    clinicalPearl: 'Never use Amiodarone for Torsades de Pointes! Amiodarone prolongs the QT interval and will make Torsades significantly worse or lethal. Give IV Magnesium Sulfate!',
    waveform: {
      type: 'torsades',
      torsadesWave: true,
      qrsWidth: 4,
      qrsAmp: 90
    }
  },

  {
    id: 'idioventricular-rhythm',
    name: 'Idioventricular Rhythm (Agonal Rhythm)',
    aka: 'IVR / Ventricular Escape / Agonal Rhythm (< 20 bpm)',
    category: 'ventricular',
    heartRate: '20 - 40 beats/min (Agonal Rhythm if < 20 beats/min)',
    rateBpm: 28,
    regularity: 'Usually regular (Agonal can be irregular and decaying)',
    pWave: 'None present (or independent sinus P waves failing to conduct)',
    prInterval: 'None',
    qrsDuration: 'Extremely WIDE and BIZARRE: Greater than 0.12s (often > 0.16s / > 4 small boxes)',
    slideNumber: 34,
    tags: ['Ventricular', 'Escape', 'Agonal', 'Dying Heart', 'Do Not Suppress'],
    medicalBSN: {
      definition: 'A slow ventricular escape rhythm originating from the Purkinje fibers at their intrinsic firing rate of 20-40 bpm (or < 20 bpm for Agonal Rhythm) when all higher cardiac pacemakers (SA node and AV junction) have failed or been blocked.',
      electrophysiology: 'The absolute last-ditch failsafe pacemaker of the human heart. Because it originates deep in the ventricular Purkinje network, impulse transmission is agonizingly slow through ventricular myocardium, producing massive, wide, sluggish QRS complexes.',
      clinicalCauses: [
        'End-stage dying heart / Terminal cardiac arrest (Agonal)',
        'Extensive anterior-septal myocardial infarction with cardiogenic shock',
        'Severe metabolic acidosis and hyperkalemia',
        'Post-resuscitation reperfusion or massive drug overdose'
      ],
      hemodynamicImpact: 'Critically inadequate cardiac output. Profound hypotension, absent peripheral pulses, loss of consciousness, and imminent progression to asystole.',
      nursingPriorities: [
        'NEVER ADMINISTER ANTIARRHYTHMIC DRUGS (Amiodarone, Lidocaine) — suppressing this rhythm terminates the patient’s final living pacemaker and causes instant asystole!',
        'Assess carotid pulse immediately: If pulseless, treat as PEA Cardiac Arrest!',
        'Call Code Blue, start chest compressions, prepare transcutaneous pacing'
      ],
      aclsInterventions: [
        'If Pulseless: Treat as PEA (CPR, Epinephrine 1 mg IV Q3-5m, search for reversible 5 H’s and 5 T’s)',
        'If Pulse Present: Transcutaneous Pacing (TCP) immediately; Atropine 1 mg IV (rarely effective for infranodal focus); Epinephrine or Dopamine infusions'
      ]
    },
    childMetaphor: {
      title: 'The Little Engine on Its Very Last Puff',
      story: 'The great steam train engine has run out of coal and water. All the main engines have shut down. But down in the wheels, one tiny rusty little gear is desperately pushing: chug... chug... chug... It is moving so slowly you can barely see it, trying with all its might to keep rolling.',
      takeaway: 'The heart’s very last emergency generator, clicking at 20-40 slow, wide steps.'
    },
    clinicalMetaphor: {
      title: 'The Final Flickering Ember of a Campfire',
      simile: 'Like the very last red ember in a dying campfire on a cold mountain night — barely glowing, on the verge of fading to gray ash.',
      visualAnchor: 'Sprawling, super-wide, sluggish sloped mounds separated by wide empty expanses.'
    },
    mnemonics: [
      'IVR: It’s Ventricles’ Remnant = 20-40 bpm; Agonal = Under 20 bpm!',
      'DO NOT SUPPRESS: If you give lidocaine or amiodarone, you turn off the last breath!'
    ],
    clinicalPearl: 'Agonal rhythm (<20 bpm) is colloquially called "the dying heart rhythm." When seen on telemetry during a code, do not pause compressions — pump the chest and aggressively search for H’s and T’s!',
    waveform: {
      type: 'idioventricular',
      qrsWidth: 6,
      qrsAmp: 70
    }
  },

  {
    id: 'ventricular-fibrillation',
    name: 'Ventricular Fibrillation (Vfib)',
    aka: 'V-Fib / VF / Coarse VF / Fine VF',
    category: 'ventricular',
    heartRate: 'None measurable (physiologically > 300-500 disorganized impulses/min)',
    rateBpm: 0,
    regularity: 'Totally chaotic and unorganized; no pattern or periodicity',
    pWave: 'None present',
    prInterval: 'None',
    qrsDuration: 'No discernible QRS complexes — only a chaotic, wavy, erratic line',
    slideNumber: 35,
    tags: ['Lethal', 'V-Fib', 'Defibrillate', 'Code Blue', 'CPR', 'Shockable'],
    medicalBSN: {
      definition: 'The most common initial lethal cardiac arrest rhythm, characterized by chaotic, completely disorganized ventricular electrical activity that produces zero coordinated myocardial contraction, zero stroke volume, and zero cardiac output. The ventricles are merely quivering like a bag of worms.',
      electrophysiology: 'Multiple wandering micro-reentrant wavelets fragmented across the ventricular myocardium with profound spatial and temporal dispersion of refractoriness. No synchronized ventricular depolarization occurs.',
      clinicalCauses: [
        'Acute Myocardial Infarction / Sudden plaque rupture (leading cause of sudden cardiac death)',
        'Untreated or degenerated Ventricular Tachycardia (R-on-T)',
        'Severe electrocution / Lightning strike',
        'Severe hypothermia, critical hyperkalemia/hypokalemia, profound hypoxia',
        'End-stage heart failure, drug overdoses'
      ],
      hemodynamicImpact: 'ZERO CARDIAC OUTPUT. Clinical death occurs within 4-6 seconds (syncope, loss of consciousness), followed by biological brain death within 4-6 minutes without CPR and defibrillation.',
      nursingPriorities: [
        'SHOUT "CODE BLUE! START CPR! BRING THE DEFIBRILLATOR!"',
        'Immediately begin high-quality chest compressions: 100-120/min, 2-2.4 inches deep, allow full chest recoil!',
        'Apply defibrillator pads immediately — DO NOT DELAY DEFIBRILLATION!'
      ],
      aclsInterventions: [
        'V-FIB IS A SHOCKABLE RHYTHM! DEFIBRILLATE IMMEDIATELY: 120-200 J biphasic (or 360 J monophasic). Resume CPR IMMEDIATELY for 2 minutes without pausing to check pulse!',
        'After 2nd shock: Epinephrine 1 mg IV push Q3-5 min',
        'After 3rd shock: Amiodarone 300 mg IV push (second dose 150 mg) or Lidocaine 1-1.5 mg/kg IV'
      ]
    },
    childMetaphor: {
      title: 'The Quivering Bag of Worms',
      story: 'Imagine holding a clear plastic bag full of squiggly earthworms. None of the worms are crawling in the same direction — they are all just wriggling, squirming, and jiggling in a chaotic mess! No water or blood can get pumped at all.',
      takeaway: 'A chaotic, squiggly scribble with no pulses and zero heartbeats.'
    },
    clinicalMetaphor: {
      title: 'Static on an Old Television Screen',
      simile: 'Like the snowy static on an old analog television when the antenna cable is unplugged: pure random chaotic snow.',
      visualAnchor: 'An erratic, jittery wave with no discernible P, QRS, or T anywhere in sight.'
    },
    mnemonics: [
      'VFIB = DEFIB! Every minute of delay decreases survival by 7-10%!',
      'V-Fib is Chaos: Coarse VF has big squiggles (easier to shock); Fine VF has tiny squiggles (needs CPR & Epi first to coarsen it up)!'
    ],
    clinicalPearl: 'Never stop chest compressions while the defibrillator is charging! Charge the machine while compressions are ongoing, clear the bed in 2 seconds, deliver the shock, and IMMEDIATELY place your hands back on the chest without checking the rhythm or pulse!',
    waveform: {
      type: 'vfib',
      fibrillatory: true,
      qrsAmp: 50
    }
  },

  {
    id: 'asystole',
    name: 'Asystole',
    aka: 'Flatline / Cardiac Standstill',
    category: 'ventricular',
    heartRate: 'None (0 beats/min)',
    rateBpm: 0,
    regularity: 'None',
    pWave: 'None (rarely "P-wave asystole" where solitary P waves fire with no QRS)',
    prInterval: 'None',
    qrsDuration: 'None — straight horizontal baseline with minor respiratory undulation',
    slideNumber: 36,
    tags: ['Lethal', 'Flatline', 'Non-shockable', 'CPR', 'Epinephrine', 'H and T'],
    medicalBSN: {
      definition: 'Complete absence of all cardiac electrical and mechanical activity (cardiac standstill). Manifests on the monitor as an isoelectric flatline, representing total cessation of myocardial depolarization.',
      electrophysiology: 'All pacemaker cells (SA node, AV junction, and Purkinje system) have completely exhausted intracellular ATP stores, membrane potentials have collapsed, and no spontaneous action potentials can generate.',
      clinicalCauses: [
        'Prolonged cardiac arrest from any primary etiology',
        'The Reversible Causes: 5 H’s (Hypovolemia, Hypoxia, Hydrogen ion/acidosis, Hypo/hyperkalemia, Hypothermia)',
        'The Reversible Causes: 5 T’s (Tension pneumothorax, Tamponade cardiac, Toxins, Thrombosis pulmonary, Thrombosis coronary)'
      ],
      hemodynamicImpact: 'ABSOLUTE CARDIAC DEATH. Zero cardiac output, zero cerebral perfusion.',
      nursingPriorities: [
        'CONFIRM ASYSTOLE IN TWO LEADS (rule out fine V-Fib or detached lead)!',
        'Check that telemetry cables are plugged in and gain/voltage is not dialed to zero',
        'DO NOT SHOCK ASYSTOLE! Shocking asystole delivers electrical current to dead, unpolarized cells and destroys any chance of spontaneous pacemaker recovery!'
      ],
      aclsInterventions: [
        'ASYSTOLE IS NON-SHOCKABLE! Immediate high-quality CPR is the cornerstone!',
        'Epinephrine 1 mg IV push as early as possible, repeated every 3-5 minutes',
        'Aggressively identify and treat reversible H’s and T’s (e.g. Needle decompression for tension pneumothorax, Calcium Gluconate & Bicarb for hyperkalemia, warm IV fluids for hypothermia)'
      ]
    },
    childMetaphor: {
      title: 'The Sleeping Battery',
      story: 'The toy heart’s battery has completely run out of power. The motor is totally still and quiet. You can’t just tap it — you have to pump it with your own hands (CPR) and put fresh energy back into the system (Epinephrine)!',
      takeaway: 'A quiet flatline. No shock! Push the chest and give medicine!'
    },
    clinicalMetaphor: {
      title: 'The Silent Flat Desert Highway',
      simile: 'Like looking out across the Bonneville Salt Flats: a flat, endless, undisturbed horizon stretching to infinity.',
      visualAnchor: 'A quiet, unbroken horizontal line across the pink grid.'
    },
    mnemonics: [
      'ASYSTOLE = ALWAYS check leads, STOP thinking about shocking, TREAT with CPR & Epinephrine!',
      'H’s and T’s: Hypovolemia, Hypoxia, Hydrogen ion, Hypo/Hyperkalemia, Hypothermia // Tension pneumo, Tamponade, Toxins, Thrombosis PE, Thrombosis MI'
    ],
    clinicalPearl: 'In movies, doctors shock asystole. In real hospital nursing, SHOCKING ASYSTOLE KILLS PATIENTS! Defibrillation resets a chaotic rhythm (VF/VT); it does nothing for an empty battery. Deliver CPR and Epinephrine!',
    waveform: {
      type: 'asystole'
    }
  },

  // -------------------------------------------------------------
  // ADDITIONAL CLINICAL TOPICS (FROM SLIDE 37)
  // -------------------------------------------------------------
  {
    id: 'pulseless-electrical-activity',
    name: 'Pulseless Electrical Activity (PEA)',
    aka: 'PEA / Electromechanical Dissociation',
    category: 'critical',
    heartRate: 'Can be any rate on monitor (often bradycardic or normal-looking rhythm)',
    rateBpm: 65,
    regularity: 'Can look organized and regular on the telemetry screen',
    pWave: 'May appear completely normal on monitor',
    prInterval: 'May appear normal',
    qrsDuration: 'May appear normal or wide',
    slideNumber: 37,
    tags: ['Critical', 'PEA', 'Non-shockable', 'Check Pulse', '5 Hs & 5 Ts'],
    medicalBSN: {
      definition: 'A clinical emergency characterized by the presence of an organized, discernible electrical rhythm on the cardiac monitor (other than VF, VT, or asystole) in a patient who has NO PALPABLE PULSE and no mechanical cardiac output.',
      electrophysiology: 'The electrical conduction pathways are depolarizing normally or semi-normally, but the cardiac muscle is mechanically incapable of contracting (due to profound hypovolemia, tension pneumothorax squeezing the heart, cardiac tamponade, massive pulmonary embolism, or metabolic collapse).',
      clinicalCauses: [
        'Hypovolemia (the #1 most common cause — empty tank cannot pump!)',
        'Hypoxia / Severe respiratory failure',
        'Tension pneumothorax (tracheal deviation, absent unilateral breath sounds)',
        'Cardiac Tamponade (Beck’s triad: muffled heart tones, JVD, hypotension)',
        'Massive Pulmonary Embolism (sudden collapse, deep S wave in Lead I, Q wave in Lead III, T wave inversion)'
      ],
      hemodynamicImpact: 'CARDIAC ARREST. Despite a pretty rhythm on the screen, blood flow to the brain and vital organs is ZERO.',
      nursingPriorities: [
        'ALWAYS CHECK THE PATIENT’S PULSE! "Treat the patient, not the monitor!"',
        'Begin chest compressions immediately once pulselessness is verified',
        'Quickly investigate and reverse the cause: Hang rapid IV fluid bolus, alert team for bedside ultrasound (POCUS)'
      ],
      aclsInterventions: [
        'PEA IS NON-SHOCKABLE! Do not deliver defibrillation!',
        'Continuous high-quality CPR + Epinephrine 1 mg IV every 3-5 minutes',
        'Targeted reversible therapies: Rapid IV crystalloid boluses for hypovolemia; Needle thoracostomy for tension pneumothorax; Pericardiocentesis for tamponade; Thrombolytics for massive PE'
      ]
    },
    childMetaphor: {
      title: 'The Ghost Car with an Empty Gas Tank',
      story: 'You turn the key in the toy car, the headlights turn on, the radio plays music, and the dashboard lights up bright! But the gas tank is totally empty and the engine belt is snapped. The lights work, but the wheels don’t move an inch.',
      takeaway: 'Electrical lights are on, but nobody is driving and the heart isn’t pumping.'
    },
    clinicalMetaphor: {
      title: 'The Lightbulb in an Empty Room',
      simile: 'Like leaving the living room lamp turned on while the entire house is completely abandoned and empty.',
      visualAnchor: 'An organized, deceptively calm rhythm on the monitor while the patient is unresponsive with no carotid pulse.'
    },
    mnemonics: [
      'PEA: Pulse Evaporated Altogether! Treat the Patient, Not the Line!',
      'PEA Protocol: Push Chest, Push Epi, Pour Fluids, Probe for H’s & T’s!'
    ],
    clinicalPearl: 'If a patient goes into cardiac arrest with a rhythm that looks like Normal Sinus Rhythm or Sinus Bradycardia, it is PEA. The two most rapidly reversible causes you can fix at the bedside as a nurse are HYPOVOLEMIA (slam 2 liters of warm normal saline) and TENSION PNEUMOTHORAX!',
    waveform: {
      type: 'pea',
      pAmp: 18,
      pWidth: 16,
      prLength: 4,
      qrsWidth: 2,
      qrsAmp: 85
    }
  },

  {
    id: 'paced-rhythm',
    name: 'Paced Rhythm (Atrial, Ventricular, Dual)',
    aka: 'Artificial Pacemaker Rhythm / Pacer Spikes',
    category: 'critical',
    heartRate: 'Programmed rate of the pacemaker (typically 60 - 80 bpm)',
    rateBpm: 70,
    regularity: 'Regular when pacing actively',
    pWave: 'If Atrial Paced: Sharp vertical pacer spike followed immediately by a P wave. If Ventricular Paced: P wave may be absent.',
    prInterval: 'If Dual chamber paced: Programmed AV delay between spikes',
    qrsDuration: 'Ventricular paced QRS is characteristically WIDE (> 0.12s) resembling a Left Bundle Branch Block (LBBB)',
    slideNumber: 37,
    tags: ['Paced', 'Pacemaker', 'Pacer Spike', 'Capture', 'Sensing'],
    medicalBSN: {
      definition: 'A cardiac rhythm produced by an implanted artificial electronic pacemaker delivering electrical stimuli to the myocardium, recognized on telemetry by thin, sharp, vertical deflection lines ("pacer spikes") followed by chamber depolarization ("capture").',
      electrophysiology: '1) Atrial pacing: Spike precedes a P wave (atrial capture). 2) Ventricular pacing: Spike precedes a wide, bizarre QRS (ventricular capture). 3) Dual-chamber (AV) pacing: Spike before P wave, followed by second spike before wide QRS.',
      clinicalCauses: [
        'Implanted permanent pacemaker (PPM) for Sick Sinus Syndrome or Third-Degree AV Block',
        'Temporary transcutaneous pacing (external pads) or epicardial wires post-cardiac surgery'
      ],
      hemodynamicImpact: 'Restores adequate cardiac output and chronotropic competence in patients with severe intrinsic conduction failure.',
      nursingPriorities: [
        'Confirm ELECTRICAL CAPTURE: Is every pacer spike followed immediately by a P wave or wide QRS?',
        'Confirm MECHANICAL CAPTURE: Palpate the radial pulse while watching the spikes — does every spike generate an actual physical pulse wave?',
        'Monitor for pacemaker malfunctions: Failure to Pace (no spike when rate drops below set limit), Failure to Capture (spike with no QRS), Failure to Sense (spike fires indiscriminately on top of patient’s own beats)'
      ],
      aclsInterventions: [
        'If failure to capture or sense: Check lead connections, inspect battery, reposition patient, place magnet over generator if runaway pacing occurs'
      ]
    },
    childMetaphor: {
      title: 'The Robot Helper in the Backpack',
      story: 'The heart has a tiny, friendly superhero robot living in a pocket under the collarbone! The robot watches carefully with a little stopwatch. Whenever the heart is too slow, the robot gives a gentle tap: "BEEP! Time to step!" and the heart marches happily right on time.',
      takeaway: 'Tiny sharp vertical lines (pacer spikes) that wake the heart up right before each step.'
    },
    clinicalMetaphor: {
      title: 'The Electric Fence Needle',
      simile: 'Like an electric fence needle ticking upright on the graph a millisecond before the gate opens.',
      visualAnchor: 'Razor-thin vertical needle spikes jutting straight up or down right before the wide wave.'
    },
    mnemonics: [
      'PACER SPIKE = Sharp vertical line before the wave. Atrial spike = before P; Ventricular spike = before wide QRS!',
      'Check the Capture: No wave after spike = Failure to Capture! Spike on T wave = Failure to Sense!'
    ],
    clinicalPearl: 'A ventricular paced QRS is ALWAYS wide (>0.12s) because the pacing wire sits in the right ventricular apex, causing muscle-to-muscle conduction across the septum. Do not confuse a normal ventricular paced rhythm with V-Tach or PVCs!',
    waveform: {
      type: 'paced-rhythm',
      pacerSpike: 'ventricular',
      qrsWidth: 4,
      qrsAmp: 90
    }
  },

  {
    id: 'st-elevation-mi',
    name: 'ST-Elevated MI (STEMI)',
    aka: 'STEMI / Acute Coronary Occlusion / Tombstoning',
    category: 'critical',
    heartRate: 'Variable (can be normal, tachycardic, or bradycardic depending on infarct location)',
    rateBpm: 88,
    regularity: 'Regular (unless complicated by dysrhythmias)',
    pWave: 'Present, upright',
    prInterval: '0.12 - 0.20 seconds',
    qrsDuration: '0.04 - 0.12 seconds; characterized by elevated ST segment merged into high T wave',
    slideNumber: 37,
    tags: ['Critical', 'STEMI', 'Cath Lab', 'Time is Muscle', 'ST Elevation'],
    medicalBSN: {
      definition: 'An acute, emergent transmural myocardial injury caused by acute total thrombotic occlusion of an epicardial coronary artery, defined on ECG by ST-segment elevation measured at the J-point exceeding 1 mm (0.1 mV) in limb leads or > 1.5 - 2 mm in precordial chest leads.',
      electrophysiology: 'Transmural ischemia causes severe intracellular ATP depletion, failure of the Na+/K+ ATPase pump, and leakage of intracellular potassium, generating a diastolic and systolic "current of injury" that displaces the ST segment above the isoelectric baseline.',
      clinicalCauses: [
        'Atherosclerotic plaque rupture with superimposed occlusive thrombosis in LAD, RCA, or Circumflex',
        'Coronary artery vasospasm (Prinzmetal angina), coronary dissection, cocaine-induced spasm'
      ],
      hemodynamicImpact: 'Acute loss of myocardial contractile function, cardiogenic shock, life-threatening ventricular arrhythmias (VT/VF), papillary muscle rupture, or acute heart failure. "TIME IS MUSCLE!"',
      nursingPriorities: [
        'ACTIVATE THE CARDIAC CATH LAB STAT ("Code STEMI" / Door-to-Balloon target < 90 minutes)!',
        'Obtain STAT 12-lead ECG within 10 minutes of arrival or chest pain onset',
        'Continuous bedside telemetry with defibrillator pads attached (high risk for sudden VFib)'
      ],
      aclsInterventions: [
        'MONA / THROMBOSIS Care: 1) Aspirin 324 mg chewable, 2) Nitroglycerin SL (contraindicated if SBP < 90, RV infarction, or PDE-5 inhibitor use), 3) Oxygen if SpO2 < 90%, 4) Morphine/Fentanyl for refractory pain',
        'P2Y12 inhibitor (Ticagrelor or Clopidogrel) + Heparin bolus',
        'Primary Percutaneous Coronary Intervention (PCI) in Cath Lab within 90 minutes'
      ]
    },
    childMetaphor: {
      title: 'The Closed Highway Ramp and the High Hill',
      story: 'A giant boulder rolled down and completely blocked the main highway where the fuel trucks drive! Up on the graph, the road doesn’t go flat anymore — it bulges up into a huge rounded hill that looks like a tombstone in the ground.',
      takeaway: 'The flat resting line is lifted high into the sky because the heart muscle is crying for oxygen.'
    },
    clinicalMetaphor: {
      title: 'The Fire Alarm in the Building',
      simile: 'Like sirens blaring and fire sprinklers drenching the ceiling — an emergency in real-time.',
      visualAnchor: 'The ST line does not return to baseline; it lifts straight up from the S wave like a firefighter’s ladder or a graveyard tombstone.'
    },
    mnemonics: [
      'STEMI: ST-Elevation Myocardial Infarction = Straight To the Cath Lab!',
      'Tombstone Rule: High convex ST elevation looks like a tombstone — Time is Muscle!'
    ],
    clinicalPearl: 'Measure ST elevation from the ISOELECTRIC BASELINE (the flat PR segment preceding the QRS). If the J-point (where the QRS ends and ST begins) is elevated > 1 mm above that baseline, you are looking at an acute evolving heart attack!',
    waveform: {
      type: 'stemi',
      stElevation: true,
      pAmp: 18,
      pWidth: 16,
      prLength: 4,
      qrsWidth: 2,
      qrsAmp: 85
    }
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Rhythms (22)',
  sinus: 'Sinus Rhythms',
  atrial: 'Atrial Dysrhythmias',
  blocks: 'AV Heart Blocks',
  ventricular: 'Ventricular Dysrhythmias',
  critical: 'Critical & Emergency Topics'
};

export interface RhythmVariantOption {
  seed: number;
  label: string;
  clinicalNote: string;
}

export const RHYTHM_VARIANTS: Record<string, RhythmVariantOption[]> = {
  'nsr': [
    { seed: 0, label: 'Standard Clinical Lead II', clinicalNote: 'Textbook NSR at 75 bpm. Smooth P wave, PR 0.16s, QRS 0.08s.' },
    { seed: 1, label: 'Athletic Resting NSR', clinicalNote: 'Conditioned runner at 62 bpm with crisp narrow complexes.' },
    { seed: 2, label: 'Post-Activity Normal Sinus', clinicalNote: 'Rate 90 bpm, rapid regular rhythm with steep R wave voltage.' },
    { seed: 3, label: 'Night Shift Telemetry Drift', clinicalNote: 'Rate 70 bpm with subtle respiratory baseline variation.' },
    { seed: 4, label: 'Geriatric Telemetry Baseline', clinicalNote: 'Rate 78 bpm, PR 0.18s, physiological voltage modulation.' }
  ],
  'sinus-bradycardia': [
    { seed: 0, label: 'Moderate Bradycardia (46 bpm)', clinicalNote: 'Typical post-beta blocker rate. PR 0.16s, QRS 0.08s.' },
    { seed: 1, label: 'Severe Symptomatic Brady (36 bpm)', clinicalNote: 'Critical low rate. SBP dropping, wide baseline between beats.' },
    { seed: 2, label: 'Borderline Bradycardia (54 bpm)', clinicalNote: 'Asymptomatic marathon runner at rest.' },
    { seed: 3, label: 'Vagal Episode Brady (40 bpm)', clinicalNote: 'Marked diastole with subtle respiratory wander.' },
    { seed: 4, label: 'Post-Inferior MI Brady (42 bpm)', clinicalNote: 'SA nodal ischemia following RCA occlusion.' }
  ],
  'sinus-tachycardia': [
    { seed: 0, label: 'Moderate Tachycardia (128 bpm)', clinicalNote: 'Post-op pain / fever response. Visible upright P waves.' },
    { seed: 1, label: 'Severe Compensatory (145 bpm)', clinicalNote: 'Acute hypovolemia. P wave partially merges with T wave.' },
    { seed: 2, label: 'Mild Sinus Tachy (110 bpm)', clinicalNote: 'Dehydration / anxiety baseline.' },
    { seed: 3, label: 'High Adrenergic Surge (150 bpm)', clinicalNote: 'Maximal resting sinus rate; P waves still upright in Lead II.' },
    { seed: 4, label: 'Infection / Sepsis Response (135 bpm)', clinicalNote: 'Continuous regular narrow-complex tachycardia.' }
  ],
  'sinus-arrhythmia': [
    { seed: 0, label: 'Phasic Respiratory Wave (60-88 bpm)', clinicalNote: 'Heart rate accelerates with inspiration, slows with expiration.' },
    { seed: 1, label: 'Pronounced Expiratory Slowing', clinicalNote: 'Deep vagal slowing down to 50 bpm on prolonged exhalation.' },
    { seed: 2, label: 'Youth / Pediatric Variant', clinicalNote: 'High amplitude rate cycling between 68 and 96 bpm.' },
    { seed: 3, label: 'Athlete Sinus Arrhythmia', clinicalNote: 'Wide R-R variance from 850ms to 1250ms at rest.' },
    { seed: 4, label: 'Gradual Cyclic Sway', clinicalNote: 'Smooth sinusoidal cycling of the sinus pacemaker.' }
  ],
  'sinus-arrest': [
    { seed: 0, label: '2.8-Second Sinus Pause (Beat 2)', clinicalNote: 'Sudden flatline pause > 2 seconds; resumes in sinus rhythm.' },
    { seed: 1, label: '3.6-Second Prolonged Arrest', clinicalNote: 'Sick Sinus Syndrome with profound asystolic pause.' },
    { seed: 2, label: 'Early Pause after Beat 1', clinicalNote: 'Abrupt failure of SA node to fire after single sinus beat.' },
    { seed: 3, label: '4.2-Second Critical Pause', clinicalNote: 'Near-syncope presentation with late escape rescue.' },
    { seed: 4, label: 'Episodic Sinus Arrest', clinicalNote: 'Repeated pauses measuring more than 3 R-to-R cycles.' }
  ],
  'premature-atrial-complex': [
    { seed: 0, label: 'Isolated Early PAC (Beat 3)', clinicalNote: 'Early beat with peaked P wave and non-compensatory pause.' },
    { seed: 1, label: 'Frequent PACs (Beats 2 & 5)', clinicalNote: 'Frequent ectopic atrial firings from caffeine / stress.' },
    { seed: 2, label: 'Atrial Bigeminy Pattern', clinicalNote: 'Every other beat is an early premature atrial complex.' },
    { seed: 3, label: 'Couplet PACs (Paired Beats)', clinicalNote: 'Two consecutive PACs firing back-to-back.' },
    { seed: 4, label: 'Blocked / Non-Conducted PAC', clinicalNote: 'Early P wave lands in AV refractoriness; no QRS follows!' }
  ],
  'paroxysmal-atrial-tachycardia': [
    { seed: 0, label: 'Sudden Onset Paroxysm (170 bpm)', clinicalNote: 'Sinus baseline abruptly triggers into rapid narrow tachycardia.' },
    { seed: 1, label: 'Continuous PAT (180 bpm)', clinicalNote: 'Sustained rapid ectopic atrial tachycardia.' },
    { seed: 2, label: 'Abrupt Termination Episode', clinicalNote: 'Rapid tachycardia suddenly breaks back into sinus bradycardia.' },
    { seed: 3, label: 'Rapid Burst PAT (195 bpm)', clinicalNote: 'High-frequency paroxysm with narrow steeple complexes.' },
    { seed: 4, label: 'Warm-Up / Cool-Down PAT', clinicalNote: 'Focal atrial tachycardia with subtle acceleration.' }
  ],
  'supraventricular-tachycardia': [
    { seed: 0, label: 'Classic SVT (195 bpm)', clinicalNote: 'Rapid, regular narrow complex. P waves buried in T waves.' },
    { seed: 1, label: 'High-Rate SVT (220 bpm)', clinicalNote: 'Extreme rate with picket fence appearance; severe stroke volume drop.' },
    { seed: 2, label: 'Moderate SVT (165 bpm)', clinicalNote: 'AVNRT reentrant loop, regular narrow steeples.' },
    { seed: 3, label: 'SVT with Mild ST Depression', clinicalNote: 'Rate-related myocardial strain during rapid paroxysm.' },
    { seed: 4, label: 'Rapid AVRT Variant (180 bpm)', clinicalNote: 'Accessory pathway narrow reentrant tachycardia.' }
  ],
  'atrial-flutter': [
    { seed: 0, label: 'Classic 2:1 Conduction (150 bpm)', clinicalNote: 'Atrial rate 300 bpm, ventricular rate 150 bpm. Standard presentation.' },
    { seed: 1, label: '3:1 Conduction (100 bpm)', clinicalNote: 'Three clear sawtooth F-waves between every narrow QRS.' },
    { seed: 2, label: '4:1 Conduction (75 bpm)', clinicalNote: 'Four distinct sawteeth per QRS. Controlled ventricular rate.' },
    { seed: 3, label: 'Variable Conduction (Irregular)', clinicalNote: 'Conduction alternates between 2:1, 3:1, and 4:1 block.' },
    { seed: 4, label: 'High-Voltage Sawtooth Lead II', clinicalNote: 'Prominent negative sawtooth flutter waves in inferior lead.' }
  ],
  'atrial-fibrillation': [
    { seed: 0, label: 'Controlled Afib (78 bpm)', clinicalNote: 'Irregularly irregular R-R with fine fibrillatory baseline.' },
    { seed: 1, label: 'Afib with RVR (140 bpm)', clinicalNote: 'Rapid Ventricular Response! Critical rate control needed.' },
    { seed: 2, label: 'Coarse Afib (Fibrillatory > 1mm)', clinicalNote: 'High-amplitude wavy baseline resembling fine flutter.' },
    { seed: 3, label: 'Fine Afib (Near Flatline)', clinicalNote: 'Low voltage fibrillatory baseline; easily mistaken for asystole.' },
    { seed: 4, label: 'Slow / Bradycardic Afib (52 bpm)', clinicalNote: 'Medication-induced (Digoxin/Beta-blocker) slow irregular Afib.' }
  ],
  'first-degree-av-block': [
    { seed: 0, label: 'Prolonged PR 0.24s (6 small boxes)', clinicalNote: 'PR interval > 0.20s and strictly constant on every beat.' },
    { seed: 1, label: 'Marked Prolongation 0.32s (8 boxes)', clinicalNote: 'Wide space between P and R; 1:1 conduction preserved.' },
    { seed: 2, label: 'Extreme Delay 0.40s (10 boxes)', clinicalNote: 'Full two large boxes between P start and QRS start!' },
    { seed: 3, label: 'Bradycardic 1st Degree (48 bpm)', clinicalNote: 'Slow sinus rate combined with 0.28s PR interval.' },
    { seed: 4, label: 'Post-Medication PR Lengthening', clinicalNote: 'Stable 0.26s constant PR delay post-diltiazem.' }
  ],
  'second-degree-av-block-type-1': [
    { seed: 0, label: 'Classic 4:3 Wenckebach Cycle', clinicalNote: 'PR progressively lengthens across 3 beats until 4th QRS drops!' },
    { seed: 1, label: 'Short 3:2 Cycle', clinicalNote: 'PR short -> PR long -> Dropped beat. Frequent drop pattern.' },
    { seed: 2, label: 'Long 5:4 Grouping', clinicalNote: 'Four conducted beats with progressive PR stretch before drop.' },
    { seed: 3, label: 'Inferior MI Post-Reperfusion', clinicalNote: 'Transient AV nodal fatigue with cyclical dropped complexes.' },
    { seed: 4, label: 'Atypical Wenckebach Variant', clinicalNote: 'Pronounced PR jump on the beat immediately preceding the drop.' }
  ],
  'second-degree-av-block-type-2': [
    { seed: 0, label: '3:2 Conduction Ratio', clinicalNote: 'Constant PR 0.16s, then sudden unannounced dropped QRS!' },
    { seed: 1, label: '2:1 Conduction Ratio (Fixed)', clinicalNote: 'P wave conducts, P wave drops, P wave conducts, constant PR.' },
    { seed: 2, label: '4:3 Conduction Ratio', clinicalNote: 'Three normal beats with constant PR, then abrupt failure to conduct.' },
    { seed: 3, label: 'Anterior STEMI Infranodal Block', clinicalNote: 'Dangerous high-grade block; prepare transcutaneous pacer.' },
    { seed: 4, label: 'Unannounced Mid-Strip Drop', clinicalNote: 'Regular sinus rhythm interrupted by sudden dropped beat.' }
  ],
  'third-degree-av-block': [
    { seed: 0, label: 'Junctional Escape (48 bpm, narrow)', clinicalNote: 'P waves marching at 85 bpm completely independent of QRS!' },
    { seed: 1, label: 'Ventricular Escape (32 bpm, wide)', clinicalNote: 'P waves at 95 bpm, wide slurred QRS escaping at 32 bpm.' },
    { seed: 2, label: 'Profound Bradycardic CHB (24 bpm)', clinicalNote: 'Severe syncope presentation; pacing mandatory.' },
    { seed: 3, label: 'Dissociated P Waves Landing in T', clinicalNote: 'P waves marching across and through T waves and ST segments.' },
    { seed: 4, label: 'Complete AV Dissociation (Wide)', clinicalNote: 'Zero coordination between atria (fast) and ventricles (slow).' }
  ],
  'premature-ventricular-complex': [
    { seed: 0, label: 'Isolated Unifocal PVC (Beat 3)', clinicalNote: 'Wide bizarre complex (>0.12s) with full compensatory pause.' },
    { seed: 1, label: 'Ventricular Bigeminy', clinicalNote: 'Every other beat is a wide, bizarre premature ventricular beat!' },
    { seed: 2, label: 'Ventricular Trigeminy', clinicalNote: 'Every third beat is a PVC. Two normal beats then one PVC.' },
    { seed: 3, label: 'Couplet PVCs (Paired)', clinicalNote: 'Two consecutive wide PVCs firing back-to-back; high warning!' },
    { seed: 4, label: 'Multifocal PVCs (Different Shapes)', clinicalNote: 'Multiple ectopic ventricular foci firing in different directions.' }
  ],
  'ventricular-tachycardia': [
    { seed: 0, label: 'Monomorphic VT (165 bpm)', clinicalNote: 'Regular, wide rounded mountain waves. Hemodynamic emergency!' },
    { seed: 1, label: 'Rapid Monomorphic VT (205 bpm)', clinicalNote: 'High-speed ventricular flutter appearance; pulse check required.' },
    { seed: 2, label: 'Slow / Tolerated VT (130 bpm)', clinicalNote: 'Wide QRS with notch on descending limb; prepare cardioversion.' },
    { seed: 3, label: 'Notched Asymmetrical VT (180 bpm)', clinicalNote: 'Discordant T-wave polarity, classic ventricular morphology.' },
    { seed: 4, label: 'Post-MI Monomorphic Run', clinicalNote: 'Sustained wide-complex tachycardia originating in scarred ventricle.' }
  ],
  'torsades-de-pointes': [
    { seed: 0, label: 'Classic Twisting Ribbon (220 bpm)', clinicalNote: 'Spindle-node amplitude modulation twisting around the isoelectric line.' },
    { seed: 1, label: 'Rapid Torsades (250 bpm)', clinicalNote: 'Fast polymorphic undulation; immediate IV Magnesium Sulfate.' },
    { seed: 2, label: 'Long-QT Initiated Burst', clinicalNote: 'Prolonged baseline QT suddenly launching into twisting spindle run.' },
    { seed: 3, label: 'Extreme Amplitude Spindle', clinicalNote: 'Large oscillating peaks transitioning to narrow waistline nodes.' },
    { seed: 4, label: 'Hypomagnesemic Torsades Episode', clinicalNote: 'Typical electrolyte-triggered polymorphic ventricular tachycardia.' }
  ],
  'idioventricular-rhythm': [
    { seed: 0, label: 'Classic IVR Escape (32 bpm)', clinicalNote: 'Slow, wide bizarre QRS (20-40 bpm). Purkinje failsafe pacemaker.' },
    { seed: 1, label: 'Accelerated IVR / AIVR (72 bpm)', clinicalNote: 'Reperfusion rhythm post-PCI (41-100 bpm). Do NOT suppress!' },
    { seed: 2, label: 'Terminal Agonal Rhythm (18 bpm)', clinicalNote: 'Dying heart rate < 20 bpm, broad slurred bizarre complexes.' },
    { seed: 3, label: 'Slow Ventricular Escape (26 bpm)', clinicalNote: 'Profound hypoperfusion, wide notched QRS with absent P waves.' },
    { seed: 4, label: 'Post-Arrest Idioventricular (38 bpm)', clinicalNote: 'ROSC recovery rhythm paced by ventricular Purkinje fibers.' }
  ],
  'ventricular-fibrillation': [
    { seed: 0, label: 'Coarse VFib (High Amplitude)', clinicalNote: 'Fresh ventricular fibrillation. Coarse chaotic scribble. SHOCK NOW!' },
    { seed: 1, label: 'Moderate Amplitude VFib', clinicalNote: 'Erratic disorganized waveforms with no pulse or cardiac output.' },
    { seed: 2, label: 'Fine VFib (Low Amplitude)', clinicalNote: 'Depleted ATP; fine twitching baseline easily mistaken for asystole.' },
    { seed: 3, label: 'Chaotic VFib Storm', clinicalNote: 'Continuous irregular high-frequency chaotic electrical fibrillations.' },
    { seed: 4, label: 'Deteriorating Coarse-to-Fine VFib', clinicalNote: 'Amplitude decays as myocardium starves of oxygen during arrest.' }
  ],
  'asystole': [
    { seed: 0, label: 'True Flatline (Ventricular Standstill)', clinicalNote: 'Isoelectric flatline with subtle analog thermal pen jitter.' },
    { seed: 1, label: 'P-Wave Asystole ("Lone P Waves")', clinicalNote: 'SA node still fires lonely P waves, but ventricles fail to respond.' },
    { seed: 2, label: 'Low-Voltage Baseline Sway', clinicalNote: 'Flatline with subtle respiratory sway. Confirm in two leads!' },
    { seed: 3, label: 'Terminal Code Blue Asystole', clinicalNote: 'Zero electrical activity. Continuous CPR + Epinephrine 1 mg.' },
    { seed: 4, label: 'Fine Drift Flatline Trace', clinicalNote: 'Total absence of ventricular depolarization or cardiac output.' }
  ],
  'pulseless-electrical-activity': [
    { seed: 0, label: 'Normal Sinus Appearance (PEA)', clinicalNote: 'Deceptive pretty rhythm on monitor; NO CAROTID PULSE! CPR STAT.' },
    { seed: 1, label: 'Bradycardic PEA (44 bpm)', clinicalNote: 'Profound hypovolemic arrest with slow organized electrical complexes.' },
    { seed: 2, label: 'Sinus Tachycardia PEA (115 bpm)', clinicalNote: 'Massive pulmonary embolism or tension pneumothorax arrest.' },
    { seed: 3, label: 'Wide-Complex PEA (50 bpm)', clinicalNote: 'Severe hyperkalemia or metabolic collapse in cardiac arrest.' },
    { seed: 4, label: 'Organized PEA (70 bpm)', clinicalNote: 'Non-shockable cardiac arrest. Search for 5 H\'s and 5 T\'s!' }
  ],
  'paced-rhythm': [
    { seed: 0, label: 'Ventricular Paced (70 bpm, wide)', clinicalNote: 'Sharp vertical pacer spike immediately preceding wide LBBB QRS.' },
    { seed: 1, label: 'Atrial Paced (72 bpm, narrow)', clinicalNote: 'Pacer spike precedes P wave, followed by normal narrow QRS.' },
    { seed: 2, label: 'Dual-Chamber AV Paced (75 bpm)', clinicalNote: 'Two spikes: Atrial spike before P, Ventricular spike before QRS.' },
    { seed: 3, label: 'Demand Pacing with Native Beats', clinicalNote: 'Pacemaker senses patient rhythm and only fires when needed.' },
    { seed: 4, label: 'Temporary Transcutaneous Paced', clinicalNote: 'External pacer pads pacing at set rate of 60 bpm with capture.' }
  ],
  'st-elevation-mi': [
    { seed: 0, label: 'Classic Tombstone STEMI (88 bpm)', clinicalNote: 'Severe convex ST elevation > 3mm directly into hyperacute T wave.' },
    { seed: 1, label: 'Acute Anterior STEMI (105 bpm)', clinicalNote: 'High J-point takeoff with tachycardia; activate Cath Lab STAT!' },
    { seed: 2, label: 'Inferior STEMI with Bradycardia (52 bpm)', clinicalNote: 'RCA occlusion causing inferior ST elevation + sinus brady.' },
    { seed: 3, label: 'Hyperacute T Wave Phase (76 bpm)', clinicalNote: 'Early evolving transmural injury with tall vaulted T waves.' },
    { seed: 4, label: 'Extensive Transmural STEMI', clinicalNote: 'Marked ST segment elevation > 5mm above isoelectric line.' }
  ]
};

export function getRhythmVariants(rhythmId: string): RhythmVariantOption[] {
  return RHYTHM_VARIANTS[rhythmId] || [
    { seed: 0, label: 'Standard Clinical Strip', clinicalNote: 'Primary diagnostic Lead II tracing.' },
    { seed: 1, label: 'Variation A · Telemetry Shift', clinicalNote: 'Alternative clinical rhythm presentation.' },
    { seed: 2, label: 'Variation B · Acute Monitor Run', clinicalNote: 'Dynamic rate & morphological presentation.' }
  ];
}

