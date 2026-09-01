/*
# Add half-day and full-day library memberships

1. Purpose
- Add `Half Day` and `Full Day` as valid library membership types.
- Keep all existing monthly, quarterly, and yearly memberships working.

2. Modified Tables
- `library_students`
  - Expand the `membership_type` check constraint to allow `half_day` and `full_day`.
  - No rows, columns, or existing membership values are deleted or changed.

3. Security
- No RLS policies or permissions are changed.
- Existing library access rules remain in place.

4. Important Notes
- The stored values are `half_day` and `full_day`; the interface displays them as `Half Day` and `Full Day`.
- Existing records remain valid and unaffected.
*/

ALTER TABLE public.library_students
  DROP CONSTRAINT IF EXISTS library_students_membership_type_check;

ALTER TABLE public.library_students
  ADD CONSTRAINT library_students_membership_type_check
  CHECK (membership_type IN ('monthly', 'quarterly', 'yearly', 'half_day', 'full_day'));