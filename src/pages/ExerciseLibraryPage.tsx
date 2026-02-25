import { useState, useMemo } from 'react';
import type { MuscleGroup } from '../types';
import { AppShell } from '../components/layout/AppShell';
import { TopBar } from '../components/layout/TopBar';
import { SearchBar } from '../components/exercise-library/SearchBar';
import { MuscleGroupFilter } from '../components/exercise-library/MuscleGroupFilter';
import { ExerciseCard } from '../components/exercise-library/ExerciseCard';
import { EmptyState } from '../components/ui/EmptyState';
import { exercises } from '../data/exercises';
import { BookOpen } from 'lucide-react';

export function ExerciseLibraryPage() {
  const [query, setQuery] = useState('');
  const [muscle, setMuscle] = useState<MuscleGroup | null>(null);

  const filtered = useMemo(() => {
    return exercises.filter((ex) => {
      const matchesQuery =
        !query ||
        ex.name.toLowerCase().includes(query.toLowerCase()) ||
        ex.primaryMuscles.some((m) =>
          m.toLowerCase().includes(query.toLowerCase()),
        ) ||
        ex.equipment.some((e) =>
          e.toLowerCase().includes(query.toLowerCase()),
        );
      const matchesMuscle =
        !muscle ||
        ex.primaryMuscles.includes(muscle) ||
        ex.secondaryMuscles.includes(muscle);
      return matchesQuery && matchesMuscle;
    });
  }, [query, muscle]);

  return (
    <AppShell>
      <TopBar title="Exercise Library" />
      <div className="px-4 pb-6 mt-2 space-y-3">
        <SearchBar value={query} onChange={setQuery} />
        <MuscleGroupFilter selected={muscle} onChange={setMuscle} />

        <p className="text-xs text-slate-400">{filtered.length} exercises</p>

        {filtered.length > 0 ? (
          <div className="space-y-2">
            {filtered.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookOpen size={40} />}
            title="No exercises found"
            description="Try a different search term or muscle group filter."
          />
        )}
      </div>
    </AppShell>
  );
}
