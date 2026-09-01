/*
# Add inactive status for library students

1. Purpose
- Allow an administrator to activate or deactivate a library student without deleting the student's record.

2. Modified Tables
- `library_students`
  - Expand the `status` check constraint to allow `inactive`.
  - Existing `active`, `expired`, and `suspended` records remain unchanged.

3. Security
- No RLS policies or permissions are changed.

4. Important Notes
- Deactivating a student stores `inactive` in the database.
- Activating a student stores `active` in the database.
- Inactive students remain visible in the student list and can be reactivated later.
*/

ALTER TABLE public.library_students
  DROP CONSTRAINT IF EXISTS library_students_status_check;

ALTER TABLE public.library_students
  ADD CONSTRAINT library_students_status_check
  CHECK (status IN ('active', 'inactive', 'expired', 'suspended'));