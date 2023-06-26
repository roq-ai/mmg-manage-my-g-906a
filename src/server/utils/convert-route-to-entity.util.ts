const mapping: Record<string, string> = {
  renamedclasses: 'Renamedclass',
  'class-registrations': 'class_registration',
  equipment: 'equipment',
  exercises: 'exercise',
  gyms: 'gym',
  memberships: 'membership',
  users: 'user',
  'workout-plans': 'workout_plan',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
