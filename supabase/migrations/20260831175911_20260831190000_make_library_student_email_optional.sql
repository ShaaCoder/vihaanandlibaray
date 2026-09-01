/*
# Make library student email optional

1. Purpose
- Allow library students to be created and updated without an email address.
- Preserve email uniqueness for students who do provide an address.

2. Modified Tables
- `library_students`
  - Change `email` from required to optional.
  - Existing email values remain unchanged.
  - Multiple students may have no email because PostgreSQL unique constraints allow multiple NULL values.

3. Security
- No RLS policies or permissions are changed.

4. Important Notes
- The application stores an empty email field as NULL.
- If an email is entered, the browser continues to validate its email format.
*/

ALTER TABLE public.library_students
  ALTER COLUMN email DROP NOT NULL;